import { ConnectModal, useCurrentAccount, useDisconnectWallet, useSignPersonalMessage } from '@mysten/dapp-kit';
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from '@/components/ui/dropdown-menu';
import { formatAddress } from '@mysten/sui/utils';
// import { useCopilotContext } from '@copilotkit/react-core';
import { toast } from 'sonner';
import { useSignatureStore } from '@/stores/useSignatureStore';

export function ConnectButton() {
  const currentAccount = useCurrentAccount();
  const [open, setOpen] = useState(false);
  const { mutate: disconnect } = useDisconnectWallet();
  const { mutateAsync: signPersonalMessage } = useSignPersonalMessage();
  // const { copilotApiConfig } = useCopilotContext();

  // === 新增：全局签名存储 ===
  const { getSignature, setSignature, loadFromStorage, isLoaded } = useSignatureStore();
  useEffect(() => {
    loadFromStorage();
  }, []);

  useEffect(() => {
    if (!isLoaded || !currentAccount?.address) return;
    // 优先从 store 获取 signature
    const signature = getSignature(currentAccount.address);
    if (signature) {
      return;
    }
    // 没有 signature 时才发起签名
    const sign = async () => {
      const message = new TextEncoder().encode('sui-agi');
      try {
        const { signature } = await signPersonalMessage({ message });
        setSignature(currentAccount.address, signature);
      } catch (e) {
        disconnect();
        toast.error(e instanceof Error ? e.message : '签名失败，部分功能不可用');
      }
    };
    sign();
  }, [isLoaded, currentAccount, signPersonalMessage]);

  if (!currentAccount) {
    return (
      <ConnectModal
        trigger={
          <Button onClick={() => setOpen(true)} variant="default">
            Connect
          </Button>
        }
        open={open}
        onOpenChange={setOpen}
      />
    );
  }

  // 已连接，显示下拉菜单
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">
          {formatAddress(currentAccount.address)}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem
          onClick={() => {
            disconnect();
            setOpen(false);
          }}
          className="text-red-500 focus:text-red-600"
        >
          Disconnect
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
