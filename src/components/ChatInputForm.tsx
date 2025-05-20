"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { useChatMessages } from "@/hooks/useChatMessages";
// 定义表单校验规则
const formSchema = z.object({
  message: z.string().min(1, { message: "请输入内容" }),
});

type FormValues = z.infer<typeof formSchema>;

interface ChatInputFormProps {
  onSubmit: (values: FormValues) => Promise<void>;
  isStreaming: boolean;
}

export function ChatInputForm({ onSubmit }: ChatInputFormProps) {
  const { disabled, isStreaming } = useChatMessages();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: { message: "" },
  });

  const handleFormSubmit = async (values: FormValues) => {
    await onSubmit(values);
    form.reset();
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleFormSubmit)} // 使用包装后的提交函数
        className="space-y-4"
      >
        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <div className="relative">
                  <Textarea
                    placeholder="请输入你的消息..."
                    className="min-h-24 pr-24 resize-none"
                    autoFocus
                    disabled={isStreaming || disabled}
                    {...field}
                  />
                  <Button
                    type="submit"
                    disabled={isStreaming || !form.watch("message")?.trim() || disabled}
                    className="absolute bottom-2 right-2 px-4 py-1 h-auto min-h-0"
                    tabIndex={-1}
                  >
                    {isStreaming ? "发送中..." : "发送"}
                  </Button>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
}
