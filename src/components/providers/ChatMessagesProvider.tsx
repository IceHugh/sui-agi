import React, { createContext, useContext, useState, useMemo } from "react";
import { clientConfig } from "@/mastra";
import { DisplayMessage } from "@/types";
import { MastraClient } from "@mastra/client-js";
import { useCurrentAccount } from "@mysten/dapp-kit";
import { toolActionMap, toolActions } from "@/config/chat";

interface ToolResultWithContent {
  content?: ({ type?: string; text?: string } | unknown)[];
  isError?: boolean;
}

interface ToolResultContentItem {
  type?: string;
  text?: string;
  toolName?: string;
  toolCallId?: string;
  result?: ToolResultWithContent | unknown;
}
interface StructuredMessage {
  id: string;
  role: "user" | "assistant" | "tool";
  content?: (ToolResultContentItem | { type?: string; text?: string } | string)[];
}
const userActionRequired = ['transfer_token'];

const ChatMessagesContext = createContext<any>(null);

export function ChatMessagesProvider({ children }: { children: React.ReactNode }) {
  const currentAccount = useCurrentAccount();
  const mastra = useMemo(() => new MastraClient({
    baseUrl: clientConfig.baseUrl,
    headers: { "address": currentAccount?.address || "" },
  }), [currentAccount?.address]);

  const [disabled, setDisabled] = useState(false);
  const [messages, setMessages] = useState<DisplayMessage[]>([]);
  const [isStreaming, setIsStreaming] = useState(false);
  const appendMessage = (message: DisplayMessage) => {
    setMessages(prev => [...prev, message]);
  };
  const updateMessage = (message: DisplayMessage) => {
    setMessages(prev => prev.map(m => m.id === message.id ? message : m));
  };
  const removeMessage = (messageId: string) => {
    setMessages(prev => prev.filter(m => m.id !== messageId));
  };
  const sendMessage = async (messageContent: string) => {
    setMessages(prev => [
      ...prev,
      { id: `user-${Date.now()}`, role: "user", type: "text", content: messageContent },
      { id: "loading-message", role: "assistant", type: "text", content: "正在思考..." }
    ]);
    setIsStreaming(true);
    try {
      const agent = mastra.getAgent("suiWalletAgent");
      const response = await agent.generate({
        messages: [{ role: "user", content: messageContent }],
      });
      const agentResponsesToAdd: DisplayMessage[] = [];
      let foundValidToolResult = false;
      const structuredMessages = response?.response?.messages as StructuredMessage[] | undefined;
      const text = response.text || '';
      const isSuccess = text.startsWith('=== success ===');
      const isFailed = text.startsWith('=== failed ===');
      if (isSuccess) {
        if (Array.isArray(structuredMessages)) {
          const lastToolMsg = [...structuredMessages].reverse().find(msg => msg.role === "tool");
          if (lastToolMsg && Array.isArray(lastToolMsg.content)) {
            for (const contentItem of lastToolMsg.content as ToolResultContentItem[]) {
              if (
                typeof contentItem === 'object' && contentItem !== null &&
                contentItem.type === "tool-result" &&
                typeof contentItem.result === 'object' && contentItem.result !== null
              ) {
                const result = contentItem.result as ToolResultWithContent;
                if (
                  Array.isArray(result.content) &&
                  result.content.length > 0 &&
                  typeof result.content[0] === 'object' && result.content[0] !== null &&
                  (result.content[0] as { type?: string }).type === "text" &&
                  typeof (result.content[0] as { text?: string }).text === "string" && !result.isError
                ) {
                  const toolResultContent = result.content[0] as { type: string; text: string };
                  const toolName = contentItem.toolName;
                  try {
                    const parsedJson = JSON.parse(toolResultContent.text);
                    const action = parsedJson?.action as keyof typeof toolActionMap;
                    if (!toolActions.includes(action) && !toolActionMap[action]?.show) {
                      continue;
                    }
                    foundValidToolResult = true;
                    const isUserActionRequired = toolActionMap[action]?.requireConfirm;
                    const _msg: any = {
                      id: lastToolMsg.id,
                      role: "tool",
                      type: "json_tool_result",
                      data: parsedJson,
                      action: parsedJson?.action,
                      toolName: toolName,
                    };
                    if (isUserActionRequired) {
                      _msg.actionResult = { status: 'pending', data: undefined };
                      setDisabled(true);
                    }
                    agentResponsesToAdd.push(_msg);
                  } catch (e) {
                    console.warn("Failed to parse tool result JSON:", toolResultContent.text, e);
                  }
                }
              }
            }
          }
        }
      }
      setMessages(prev => prev.filter(m => m.id !== "loading-message"));
      if (isSuccess && foundValidToolResult) {
        setMessages(prev => [...prev, ...agentResponsesToAdd]);
      } else {
        let cleanText = text;
        if (isSuccess) {
          cleanText = text.replace(/^=== success ===/, '').trim();
        } else if (isFailed) {
          cleanText = text.replace(/^=== failed ===/, '').trim();
        }
        const lastMessage = response.response?.messages?.[response.response.messages.length - 1];
        setMessages(prev => [
          ...prev,
          { id: lastMessage?.id || `asst-${Date.now()}`, role: "assistant", type: "text", content: cleanText },
        ]);
      }
    } catch (error) {
      console.error("Error sending message:", error);
      setMessages(prev => prev.filter(m => m.id !== "loading-message"));
      setMessages(prev => [...prev, { id: `asst-${Date.now()}`, role: "assistant", type: "text", content: "An error occurred while sending the message." }]);
    } finally {
      setIsStreaming(false);
    }
  };

  return (
    <ChatMessagesContext.Provider value={{
      messages,
      isStreaming,
      sendMessage,
      appendMessage,
      updateMessage,
      removeMessage,
      disabled,
      setDisabled,
    }}>
      {children}
    </ChatMessagesContext.Provider>
  );
}

export function useChatMessagesContext() {
  const ctx = useContext(ChatMessagesContext);
  if (!ctx) throw new Error("useChatMessagesContext must be used within ChatMessagesProvider");
  return ctx;
}
