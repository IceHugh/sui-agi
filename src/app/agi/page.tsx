'use client';

import { useCopilotActions } from '@/actions';
import { useCopilotChat, useCopilotContext } from '@copilotkit/react-core';
import { CopilotChat } from '@copilotkit/react-ui';

import { CopilotToolbar } from '@/actions/system/toolbar/component';
import { InsertCopilotPortal } from '@/components/InsertCopilotPortal';
import { useWalletAssets } from '@/hooks/useWalletAssets';
import { useCurrentAccount, useCurrentWallet } from '@mysten/dapp-kit';
import { useEffect } from 'react';

export default function Agi() {
	const { reset } = useCopilotChat();
	const { connectionStatus } = useCurrentWallet();
	const currentAccount = useCurrentAccount();
	const { setThreadId } = useCopilotContext();
	const disabled = connectionStatus === 'disconnected';

	useEffect(() => {
		if (connectionStatus === 'disconnected') {
			reset();
		}
	}, [connectionStatus, reset]);

	useEffect(() => {
		if (currentAccount?.address) {
			setThreadId(currentAccount.address + new Date().getTime().toString());
		}
	}, [currentAccount?.address, setThreadId]);

	useWalletAssets(currentAccount?.address);
	useCopilotActions();
	return (
		<div className='h-full flex flex-col'>
			<CopilotChat
				className={`h-full rounded-2xl ${disabled ? 'pointer-events-none' : ''}`}
				labels={{ initial: "Hi, I'm an Sui wallet agent. Want to chat?" }}
			></CopilotChat>
			<InsertCopilotPortal
				targetSelector='.copilotKitInputContainer'
				portalId='copilot-toolbar'
			>
				<CopilotToolbar />
			</InsertCopilotPortal>
		</div>
	);
}
