import { Card } from "@/components/ui/card";
import React, { useEffect, useMemo, useState } from "react";
import { useSuiClient, useCurrentAccount, useSignAndExecuteTransaction, } from '@mysten/dapp-kit';
import { toast } from "sonner"

import { SUI_COIN_TYPE } from "@/constants";
import { buildSuiStakeTx } from "@/lib/sui/stake";
import { UiButton } from "@/components/common/button/UiButton";
import { LoadingCard } from "@/components/card/LoadingCard";
import { ErrorCard } from "@/components/card/ErrorCard";
import useAssetStore from "@/stores/useAssetStore";
import { formatAddress } from "@mysten/sui/utils";
import { gernerateTxPrompt } from "@/prompts";

interface StackTxCardProps {
  amount: number;
  validatorAddress: string;
  status: "complete" | "executing" | "inProgress";
  onConfirm: (data: any) => void;
  onCancel: (error?: any) => void;
}

export const StackSuiTxCard: React.FC<StackTxCardProps> = ({ amount, validatorAddress, status, onConfirm, onCancel }) => {
  const { mutate: signAndExecuteTransaction } = useSignAndExecuteTransaction();
  const currentAccount = useCurrentAccount();
  const client = useSuiClient();
  const [isLoading, setIsLoading] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [txResult, setTxResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const { validatorsApy, suiSystemState, balances } = useAssetStore();


  const suiCoin = useMemo(() => balances.find((b: any) => b.coinType === SUI_COIN_TYPE), [balances]);
  // 校验逻辑
  useEffect(() => {
    setShowConfirm(false);
    setTxResult(null);
    setError(null);
    if (!currentAccount?.address) {
      setError('Wallet not connected');
      return;
    }
    if (!amount || amount <= 0) {
      setError('Please enter the correct staking amount');
      return;
    }
    if (!validatorAddress) {
      setError('Please enter the correct validator address');
      return;
    }
    setShowConfirm(true);
  }, [amount, validatorAddress, currentAccount]);
  const validator = useMemo(() => suiSystemState?.activeValidators.find((v: any) => v.suiAddress === validatorAddress), [suiSystemState, validatorAddress]);

  const apy = useMemo(() => {
    const found = validatorsApy.find((v: any) => v.address === validatorAddress);
    return found ? (found.apy * 100).toFixed(3) + '%' : '--';
  }, [validatorsApy, validatorAddress]);


  // 确认质押
  const handleConfirm = async () => {
    if (!currentAccount?.address) return;
    setIsLoading(true);
    setTxResult(null);
    try {
      const txb = await buildSuiStakeTx({
        suiCoin,
        sender: currentAccount.address,
        amount,
        validator: validator?.suiAddress,
      });
      signAndExecuteTransaction({
        transaction: txb,
        chain: 'sui:testnet',
      }, {
        onSuccess: (result) => {
          const { digest } = result;
          onConfirm(gernerateTxPrompt(digest));
          setIsLoading(false);
        },
        onError: (error: any) => {
          toast.error(error.message || 'Staking failed');
          setIsLoading(false);
        }
      });
    } catch (e: any) {
      toast.error(e.message || 'Failed to generate staking transaction');
      setIsLoading(false);
    }
  };

  // 取消操作
  const handleCancel = () => {
    setShowConfirm(false);
    onCancel('User canceled staking');
  };


  return (
    <Card className="p-3">
      <div className="flex items-center gap-3 mb-4">
        <img src={validator.imageUrl || "/sui-logo.svg"} alt="validator" className="w-10 h-10 rounded-full bg-neutral-800" />
        <div className="flex flex-col">
          <span className="font-bold text-lg break-all">{validator.name}</span>
          <span className="text-xs text-gray-500">APY: <span className="text-blue-600 dark:text-blue-300 font-bold">{apy}</span></span>
        </div>
      </div>
      <div className="mb-2">Staked amount: <span className="font-bold">{amount} SUI</span></div>
      {(status === "executing" || status === "inProgress") && showConfirm && (
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
      )}
    </Card>
  );
};
