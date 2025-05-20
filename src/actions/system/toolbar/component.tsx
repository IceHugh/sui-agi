import { Button } from '@/components/ui/button';
import React from 'react';
import { useCopilotChat } from '@copilotkit/react-core';
import { Role, TextMessage } from "@copilotkit/runtime-client-gql"

export function CopilotToolbar() {

  const { appendMessage, isLoading } = useCopilotChat();

  const actions = [
    {
      label: 'Balance',
      onClick: () => {
        appendMessage(new TextMessage({
          role: Role.User,
          content: 'Show my balance',
        }));
      },
    },
    {
      label: 'NFT',
      onClick: () => {
        appendMessage(new TextMessage({
          role: Role.User,
          content: 'Show my NFTs',
        }));
      },
    },
    {
      label: 'Stake',
      onClick: () => {
        appendMessage(new TextMessage({
          role: Role.User,
          content: 'Stake my Sui',
        }));
      },
    },
    {
      label: 'Unstake',
      onClick: () => {
        appendMessage(new TextMessage({
          role: Role.User,
          content: 'Unstake my Sui',
        }));
      },
    },
    {
      label: 'My Staked Sui',
      onClick: () => {
        appendMessage(new TextMessage({
          role: Role.User,
          content: 'Show my staked Sui',
        }));
      },
    },
    {
      label: 'Sui System Staked List',
      onClick: () => {
        appendMessage(new TextMessage({
          role: Role.User,
          content: 'Show the Sui system staked list',
        }));
      },
    },
    {
      label: 'Sui news',
      onClick: () => {
        appendMessage(new TextMessage({
          role: Role.User,
          content: 'Show me the latest Sui news',
        }));
      },
    },
    {
      label: 'My Address',
      onClick: () => {
        appendMessage(new TextMessage({
          role: Role.User,
          content: 'Show my address',
        }));
      },
    },
    {
      label: 'Disconnect',
      onClick: () => {
        appendMessage(new TextMessage({
          role: Role.User,
          content: 'Disconnect',
        }));
      },
    }
  ];

  return (
    <div className="overflow-hidden mb-2">
      <div className="flex gap-2 overflow-x-auto  px-4 py-2">
        {actions.map((btn) => (
          <Button
            key={btn.label}
            variant="outline"
            size="sm"
            onClick={btn.onClick}
            className="whitespace-nowrap"
          >
            {btn.label}
          </Button>
        ))}
      </div>
    </div>
  );
}
