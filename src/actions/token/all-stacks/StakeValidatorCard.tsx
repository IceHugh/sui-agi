import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { formatAddress } from "@mysten/sui/utils";

export interface StakeValidatorCardProps {
  validator: any;
  apy: string;
  status: "complete" | "executing" | "inProgress";
  isStakeInput: boolean;
  onConfirm: (validator: any, amount?: string) => void;
  onCancel: (address: string) => void;
}

export const StakeValidatorCard: React.FC<Omit<StakeValidatorCardProps, 'amount' | 'onAmountChange'>> = ({
  validator,
  apy,
  status,
  onConfirm,
  onCancel,
}) => {
  const stakingAmount = Number(validator.stakingPoolSuiBalance) / 1_000_000_000;
  const [amount, setAmount] = React.useState("");
  const [isStake, setIsStake] = React.useState(false);
  const handleStake = () => {
    setIsStake(true);
  };
  return (
    <div className="bg-neutral-900/80 border border-neutral-700 rounded-xl p-4 flex flex-col gap-2">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <img src={validator.imageUrl || "/sui-logo.svg"} alt="validator" className="w-8 h-8 rounded-full bg-neutral-800" />
          <span className="font-bold text-lg break-all">{validator.name || formatAddress(validator.suiAddress)}</span>
        </div>
        {!isStake ? (
          <Button
            onClick={handleStake}
            variant="default"
            size="sm"
            disabled={status === "executing" || status === "inProgress"}
            className="px-4 py-1"
          >
            Stake
          </Button>
        ) : (
          <div className="flex gap-2 items-center">
            <Input
              type="number"
              min="0"
              placeholder="Enter amount"
              className="w-32"
              size={20}
              value={amount}
              onChange={e => setAmount(e.target.value)}
            />
            <Button
              onClick={() => { onConfirm(validator, amount); setAmount(""); setIsStake(false); }}
              variant="default"
              size="sm"
              className="bg-green-600 hover:bg-green-700"
            >
              Confirm
            </Button>
            <Button
              onClick={() => { onCancel(validator.suiAddress); setAmount(""); setIsStake(false); }}
              variant="secondary"
              size="sm"
              className="bg-gray-400 hover:bg-gray-500 text-white"
            >
              Cancel
            </Button>
          </div>
        )}
      </div>
      <div className="flex justify-between mt-2 text-sm text-gray-400">
        <div>
          <div className="text-xs">APY</div>
          <div className="text-white font-bold text-base">{apy}</div>
        </div>
        <div>
          <div className="text-xs">Validator Address</div>
          <div className="text-white font-mono text-xs">{formatAddress(validator.suiAddress)}</div>
        </div>
        <div>
          <div className="text-xs">Total Staked</div>
          <div className="text-white font-mono text-xs">{stakingAmount.toLocaleString()} SUI</div>
        </div>
        <div>
          <div className="text-xs">Voting Power</div>
          <div className="text-white font-mono text-xs">{validator.votingPower}</div>
        </div>
      </div>
    </div>
  );
};
