import { Card } from "@/components/ui/card";
import React, { useMemo, useState } from "react";
import { useCurrentAccount, useSignAndExecuteTransaction, } from '@mysten/dapp-kit';
import { toast } from "sonner"

import { createUnstakeTransaction } from "@/lib/sui/stake";
import { UiButton } from "@/components/common/button/UiButton";
import { MIST_PER_SUI } from "@/constants";
import useAssetStore from "@/stores/useAssetStore";
import { gernerateTxPrompt } from "@/prompts";
import { useSuiNetwork } from "@/stores/sui-network";

interface StackTxCardProps {
  stakedSuiId: string;
  status: "complete" | "executing" | "inProgress";
  onConfirm: (data: any) => void;
  onCancel: (error?: any) => void;
}

export const UnStackSuiTxCard: React.FC<StackTxCardProps> = ({ stakedSuiId, status, onConfirm, onCancel }) => {
  const { mutate: signAndExecuteTransaction } = useSignAndExecuteTransaction();
  const currentAccount = useCurrentAccount();
  const [isLoading, setIsLoading] = useState(false);
  const { suiSystemState,  stakes } = useAssetStore();
  const network = useSuiNetwork();
  const stakePool = useMemo(() => stakes.find((s: any) => s.stakes.find((s: any) => s.stakedSuiId === stakedSuiId)), [stakes, stakedSuiId]);
  const stake = useMemo(() => stakePool?.stakes.find((s: any) => s.stakedSuiId === stakedSuiId), [stakePool, stakedSuiId]);
  const validator = useMemo(() => suiSystemState?.activeValidators.find((v: any) => v.suiAddress === stakePool.validatorAddress), [suiSystemState, stakePool]);
  // 确认质押
  const handleConfirm = async () => {
    if (!currentAccount?.address) return;
    setIsLoading(true);
    try {
      const txb = await createUnstakeTransaction({
        stakedSuiId,
      });
      signAndExecuteTransaction({
        transaction: txb,
        chain: `sui:${network}`,
      }, {
        onSuccess: (result) => {
          const { digest } = result;
          onConfirm(gernerateTxPrompt(digest, network));
          setIsLoading(false);
        },
        onError: (error: any) => {
          toast.error(error.message || 'Unstaking failed');
          setIsLoading(false);
        }
      });
    } catch (e: any) {
      toast.error(e.message || 'Failed to generate unstaking transaction');
      setIsLoading(false);
    }
  };

  // 取消操作
  const handleCancel = () => {
    onCancel('User canceled unstack operation');
  };


  return (
    <Card className="p-3">
      <div className="flex items-center gap-3 mb-4">
        <img src={validator.imageUrl || "/sui-logo.svg"} alt="validator" className="w-10 h-10 rounded-full bg-neutral-800" />
        <div className="flex flex-col">
          <span className="font-bold text-lg break-all">{validator.name}</span>
        </div>
      </div>
      <div className="mb-2">Staked amount: <span className="font-bold">{(Number(stake.principal) / MIST_PER_SUI).toLocaleString()} SUI</span></div>
      {(status === "executing" || status === "inProgress")  && (
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
