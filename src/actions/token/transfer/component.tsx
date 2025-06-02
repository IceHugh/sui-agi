import { Card } from "@/components/ui/card";
import React, { useEffect, useState } from "react";
import { isValidSuiAddress, formatAddress } from "@mysten/sui/utils";
import { LoadingCard } from "@/components/card/LoadingCard";
import { ErrorCard } from "@/components/card/ErrorCard";
import { useSuiClient, useSuiClientQuery, useCurrentAccount, useSignAndExecuteTransaction } from '@mysten/dapp-kit';
import { BalanceChangeCard } from "@/components/card/BalanceChangeCard";
import { ReceiverCard } from "@/components/card/ReceiverCard";
import { Button } from "@/components/ui/button";
import { buildSuiBatchTransferTx } from "@/lib/sui/transfer";
import { toast } from "sonner"

import { gernerateTxPrompt } from "@/prompts";
import { UiButton } from "@/components/common/button/UiButton";
import useAssetStore from "@/stores/useAssetStore";
import { useSuiNetwork } from "@/stores/sui-network";

interface TransferCardProps {
  status: "complete" | "executing" | "inProgress"
  amount: number;
  toAddresses: string[];
  coinType: string;
  onConfirm: (data: any) => void;
  onCancel: (error?: any) => void;
}
export const TransferTokenCard: React.FC<TransferCardProps> = ({ amount, toAddresses, coinType, onConfirm, onCancel, status }) => {
  console.log(amount);
  const { mutate: signAndExecuteTransaction } = useSignAndExecuteTransaction();

  const currentAccount = useCurrentAccount();
  const [isLoading, setIsLoading] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [txResult, setTxResult] = useState<string | null>(null);
  const client = useSuiClient();
  const network = useSuiNetwork();
  // 使用全局资产 store
  const { balances, balancesLoading, balancesError } = useAssetStore();

  // 处理资产筛选和校验
  let asset: any = null;
  if (balances && Array.isArray(balances)) {
    asset = balances.find((b: any) => b.coinType === coinType);
  }

  // 批量校验地址
  const addressErrors = toAddresses.map(addr => {
    if (!isValidSuiAddress(addr)) {
      return '地址格式错误';
    }
    return null;
  });
  const hasAddressError = addressErrors.some(Boolean);

  // 计算总转账金额（最小单位）
  let totalAmount = amount * toAddresses.length;
  let totalAmountInMinUnit = 0;
  if (asset) {
    totalAmountInMinUnit = totalAmount * Math.pow(10, asset.decimals || 0);
  }

  // 校验逻辑
  useEffect(() => {
    setShowConfirm(false);
    setTxResult(null);
    if (!currentAccount?.address) return;
    if (balancesLoading || balancesError) return;
    if (!balances || !Array.isArray(balances)) {
      toast.error('No assets found');
      return;
    }
    if (!asset) {
      toast.error('No assets of this type are held');
      return;
    }
    if (!toAddresses || !Array.isArray(toAddresses) || toAddresses.length === 0) {
      toast.error('Please enter the recipient address');
      return;
    }
    if (hasAddressError) {
      setShowConfirm(false);
      return;
    }
    const balanceNum = Number(asset.totalBalance); // Minimum unit
    if (isNaN(balanceNum) || balanceNum < totalAmountInMinUnit) {
      toast.error('Insufficient balance');
      return;
    }
    setShowConfirm(true);
  }, [balances, asset, toAddresses, amount, coinType, balancesLoading, balancesError, currentAccount, hasAddressError, totalAmountInMinUnit]);

  // 确认转账（生成批量转账 txb，交由插件钱包签名）
  const handleConfirm = async () => {
    if (!currentAccount?.address) return;
    setIsLoading(true);
    setTxResult(null);
    try {
      const txb = await buildSuiBatchTransferTx({
        client,
        sender: currentAccount.address,
        coinType: asset.coinType,
        toAddresses,
        amount,
      });
      signAndExecuteTransaction({
        transaction: txb,
        chain: `sui:${network}`,
      },
        {
          onSuccess: (result) => {
            const { digest } = result;
            onConfirm(gernerateTxPrompt(digest, network));
            setIsLoading(false);
          },
          onError: (error: any) => {
            onCancel(error);
            toast.error(error.message || '交易失败');
            setIsLoading(false);
          }
        }
      );
    } catch (e: any) {
      toast.error(e.message || '生成交易失败');
      setIsLoading(false);
    }
  };

  // 取消操作
  const handleCancel = () => {
    setShowConfirm(false);
    onCancel();
  };

  return (
    <Card className="p-4">
      <div className="">
        <div className="text-lg font-bold mb-2">转账信息</div>
        {asset ? (
          <>
            {/* 余额变化卡片 */}
            <BalanceChangeCard
              coinType={asset.coinType}
              before={asset.totalBalance}
              change={-totalAmountInMinUnit}
              meta={asset.meta}
            />
          </>
        ) : <div className="text-gray-400">No assets of this type are held</div>}
      </div>
      {asset && toAddresses.length > 0 && (
        <div className="">
          <div className="">
            <div className="font-medium mb-1">Recipient list:</div>
            <div className="flex flex-col gap-2">
              {toAddresses.map((addr, idx) => (
                <div key={addr}>
                  {addressErrors[idx] ? (
                    <div className="text-xs text-red-500 font-bold">
                      {formatAddress(addr)} <span className="ml-2">({addressErrors[idx]})</span>
                    </div>
                  ) : (
                    <ReceiverCard
                      address={addr}
                      amount={amount}
                      coinType={asset.coinType}
                      meta={asset.meta}
                    />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}{
        (status === "executing" || status === "inProgress") && (
          <div className="flex gap-3 justify-end">
            <UiButton
              isLoading={isLoading}
              onClick={handleConfirm}
              disabled={isLoading}
            >
              Confirm
            </UiButton>
            <UiButton
              variant="secondary"
              onClick={handleCancel}
              disabled={isLoading}
            >
              Cancel
            </UiButton>
          </div>
        )
      }

    </Card>
  );
};
