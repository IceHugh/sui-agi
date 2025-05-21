import { Card } from "@/components/ui/card";
import useAssetStore from "@/stores/useAssetStore";
import { formatAddress } from "@mysten/sui/utils";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useCopilotChat } from '@copilotkit/react-core';
import { Role, TextMessage } from "@copilotkit/runtime-client-gql"
import { MIST_PER_SUI } from "@/constants";

/**
 * 钱包资产卡片组件
 * 所有资产平铺展示，无总资产和主币突出
 */
export const MyStacksListCard: React.FC = () => {
  const { appendMessage } = useCopilotChat();
  const { stakes, stakesLoading, stakesError, validatorsApy, validatorsApyLoading, validatorsApyError, suiSystemState } = useAssetStore();

  if (stakesLoading || validatorsApyLoading) return <div>Loading...</div>;
  if (stakesError) return <div>Staking error: {stakesError}</div>;
  if (validatorsApyError) return <div>APY error: {validatorsApyError}</div>;

  // 查找APY
  const getApyByValidator = (validatorAddress: string) => {
    const found = validatorsApy.find((v: any) => v.address === validatorAddress);
    return found ? (found.apy * 100).toFixed(3) + '%' : '--';
  };

  // 通过 validatorAddress 查找 name 和 icon
  const getValidatorMeta = (validatorAddress: string) => {
    const validators = suiSystemState?.activeValidators || [];
    const found = validators.find((v: any) => v.suiAddress === validatorAddress);
    return {
      name: found?.name || formatAddress(validatorAddress),
      icon: found?.imageUrl || '/assets/validator-default.png',
    };
  };

  const onUnstake = (name: string, stakedSuiId: string) => {
    appendMessage(new TextMessage({
      role: Role.User,
      content: `You will unstake from validator ${name}, the staked SUI ID is ${stakedSuiId}`,
    }));
  };

  return (
    <Card className="p-3">
      <div className="space-y-4">
        {(!stakes || stakes.length === 0) && (
          <div className="flex flex-col items-center gap-4 py-8 text-gray-400">
            <div>No stakes</div>
            <Button
              variant="secondary"
              onClick={() => {
                appendMessage(new TextMessage({
                  role: Role.User,
                  content: "Show the Sui system staked list",
                }));
              }}
            >
              Fetch all staking records
            </Button>
          </div>
        )}
        {stakes && stakes.map((item: any) => (
          item.stakes.map((stake: any) => {
            const meta = getValidatorMeta(item.validatorAddress);
            return (
              <div key={stake.stakedSuiId} className="bg-neutral-900/80 border border-neutral-700 rounded-xl p-4 flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Avatar className="w-8 h-8">
                      <AvatarImage src={meta.icon} alt="validator" className="bg-neutral-800" />
                      <AvatarFallback>VA</AvatarFallback>
                    </Avatar>
                    <span className="font-bold text-lg break-all">{meta.name}</span>
                  </div>
                  <Button variant="secondary" className="px-4 py-1 rounded-lg border border-neutral-700" onClick={() => {
                    onUnstake(meta.name, stake.stakedSuiId);
                  }}>Unstake</Button>
                </div>
                <div className="flex justify-between mt-2 text-sm text-gray-400">
                  <div>
                    <div className="text-xs">Staked</div>
                    <div className="text-white font-bold text-base">
                      {(Number(stake.principal) / MIST_PER_SUI).toLocaleString()} <span className="text-xs">SUI</span>
                    </div>
                  </div>
                  <div>
                    <div className="text-xs">APY</div>
                    <div className="text-white font-bold text-base">{getApyByValidator(item.validatorAddress)}</div>
                  </div>
                  <div>
                    <div className="text-xs">Epoch</div>
                    <div className="text-white font-bold text-base">{stake.stakeActiveEpoch}</div>
                  </div>
                </div>
              </div>
            );
          })
        ))}
      </div>
    </Card>
  );
};
