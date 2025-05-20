'use client';
import { useSignatureStore } from '@/stores/useSignatureStore';
import { CopilotKit } from '@copilotkit/react-core';
import '@copilotkit/react-ui/styles.css';
import { useCurrentAccount } from '@mysten/dapp-kit';

export default function AgiLayout({ children }: { children: React.ReactNode }) {
	const currentAccount = useCurrentAccount();
	const signature = useSignatureStore((state) =>
		currentAccount?.address
			? state.signatures[currentAccount.address]
			: undefined,
	);
	const isLoaded = useSignatureStore((state) => state.isLoaded);

	if (!currentAccount?.address) {
		// 未连接钱包，显示英文提示文案
		return (
			<div className='flex items-center justify-center h-screen text-lg text-gray-500'>
				Please connect your wallet to use this feature
			</div>
		);
	}
	if (!isLoaded || !signature) {
		return <div>Loading...</div>;
	}
	return (
		<CopilotKit
			runtimeUrl='/api/copilotkit'
			agent='suiWalletAgent'
			headers={{
				address: currentAccount?.address,
				signature: signature,
			}}
		>
			{children}
		</CopilotKit>
	);
}
