import { Card } from "@/components/ui/card";
import useAssetStore from "@/stores/useAssetStore";
import { formatAddress } from "@mysten/sui/utils";
import React, { useState } from "react";
import { StakeValidatorCard } from "./StakeValidatorCard";
import { useCopilotChat } from '@copilotkit/react-core';
import { Role, TextMessage } from "@copilotkit/runtime-client-gql"
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

/**
 * 所有可质押验证者列表卡片组件
 * 展示所有可参与质押的验证者，用户可点击质押
 */
const SORT_OPTIONS = [
  { value: "apy", label: "APY" },
  { value: "stakingAmount", label: "Total Staked" },
  { value: "votingPower", label: "Voting Power" },
];

export const StacksListCard: React.FC = () => {
  const {
    validatorsApy,
    validatorsApyLoading,
    validatorsApyError,
    suiSystemState,
  } = useAssetStore();
  const { appendMessage } = useCopilotChat();
  const [stakeInput, setStakeInput] = useState<{ [address: string]: boolean }>({});
  const [sortBy, setSortBy] = useState("apy");

  if (validatorsApyLoading) return <div>Loading...</div>;
  if (validatorsApyError) return <div>APY Error: {validatorsApyError}</div>;
  if (!suiSystemState || !suiSystemState.activeValidators) return <div>No available validators</div>;

  // 查找APY
  const getApyByValidator = (validatorAddress: string) => {
    const found = validatorsApy.find((v: any) => v.address === validatorAddress);
    return found ? (found.apy * 100).toFixed(3) + "%" : "--";
  };

  // 质押操作（弹窗输入数量，后续可接链上逻辑）
  const handleStake = (validatorAddress: string) => {
    setStakeInput((prev) => ({ ...prev, [validatorAddress]: true }));
  };

  const handleConfirm = (validator: any, amount?: string) => {
    if (amount && !isNaN(Number(amount))) {
      appendMessage(new TextMessage({
        role: Role.User,
        content: `You will stake ${amount} SUI to validator ${validator.suiAddress} (${formatAddress(validator.suiAddress)})`,
      }));
    }
  };

  const handleCancel = (validatorAddress: string) => {
  };

  // 排序函数
  const getSortedValidators = () => {
    if (!suiSystemState?.activeValidators) return [];
    const validators = [...suiSystemState.activeValidators];
    if (sortBy === "apy") {
      return validators.sort((a, b) => {
        const apyA = Number(validatorsApy.find((v: any) => v.address === a.suiAddress)?.apy ?? 0);
        const apyB = Number(validatorsApy.find((v: any) => v.address === b.suiAddress)?.apy ?? 0);
        return apyB - apyA;
      });
    } else if (sortBy === "stakingAmount") {
      return validators.sort((a, b) => Number(b.stakingPoolSuiBalance) - Number(a.stakingPoolSuiBalance));
    } else if (sortBy === "votingPower") {
      return validators.sort((a, b) => Number(b.votingPower) - Number(a.votingPower));
    }
    return validators;
  };

  return (
    <Card className=" p-4">
      <div className="mb-4 flex items-center gap-2 sticky top-0 z-10  pb-2">
        <span className="text-sm text-gray-500">Sort by:</span>
        <Select value={sortBy} onValueChange={setSortBy}>
          <SelectTrigger size="sm" className="w-32">
            <SelectValue placeholder="Select sort" />
          </SelectTrigger>
          <SelectContent>
            {SORT_OPTIONS.map(opt => (
              <SelectItem key={opt.value} value={opt.value}>
                {opt.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="max-h-[400px] overflow-y-auto">
        <div className="space-y-4">
          {suiSystemState.activeValidators.length === 0 && (
            <div className="text-center text-gray-400 py-8">No validators available for staking</div>
          )}
          {getSortedValidators().map((validator: any) => (
            <StakeValidatorCard
              key={validator.suiAddress}
              validator={validator}
              apy={getApyByValidator(validator.suiAddress)}
              isStakeInput={!!stakeInput[validator.suiAddress]}
              onConfirm={handleConfirm}
              onCancel={handleCancel}
            />
          ))}
        </div>
      </div>
    </Card>
  );
};
