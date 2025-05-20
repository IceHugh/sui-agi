import { Card } from "@/components/ui/card";
import { CoinCard } from "@/components/card/CoinCard";
import useAssetStore from "@/stores/useAssetStore";

/**
 * 钱包资产卡片组件
 * 所有资产平铺展示，无总资产和主币突出
 */
export const BalanceCard: React.FC = () => {
  const { balances, balancesLoading, balancesError } = useAssetStore();
  console.log(balances);
  if (balancesLoading) return <div>Loading...</div>;
  if (balancesError) return <div>Error: {balancesError}</div>;

  return (
    <Card className="p-3">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {(!balances || balances.length === 0) && (
          <div className="text-center text-gray-400 py-8 col-span-2">No assets</div>
        )}
        {balances &&
          balances.map((balance: any) => (
            <CoinCard
              key={balance.coinType}
              coinType={balance.coinType}
              balance={balance.totalBalance}
              meta={balance.meta}
            />
          ))}
      </div>
    </Card>
  );
};
