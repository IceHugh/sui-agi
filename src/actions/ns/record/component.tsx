import { Card } from "@/components/ui/card";
import useAssetStore from "@/stores/useAssetStore";

/**
 * 钱包NFT卡片组件
 * 所有NFT平铺展示
 */
export const NftListCard: React.FC = () => {
  const { nfts, nftsLoading, nftsError } = useAssetStore();

  if (nftsLoading) return <div>Loading...</div>;
  if (nftsError) return <div>Error: {nftsError}</div>;

  return (
    <Card className=" p-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 max-h-[500px] overflow-y-auto">
        {(!nfts || nfts.length === 0) && (
          <div className="text-center text-gray-400 py-8 col-span-2">No NFT assets</div>
        )}
        {nfts &&
          nfts.map((nft: any) => (
            <div
              key={nft.data.objectId}
              className="rounded-xl bg-neutral-900/80 border border-neutral-700 shadow-lg p-2 flex flex-col items-center transition-transform hover:scale-105 hover:shadow-2xl max-h-48 overflow-hidden"
            >
              <div className="w-20 h-20 bg-neutral-800 rounded-lg flex items-center justify-center overflow-hidden mb-2">
                <img
                  src={nft.data.display.data.image_url}
                  alt={nft.data.display.data.name || 'NFT'}
                  className="object-cover w-full h-full"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = "/sui-logo.svg";
                  }}
                />
              </div>
              <div className="font-bold text-sm text-white mb-1 text-center">
                {nft.data.display.data.name}
              </div>
              <div className="text-xs text-neutral-400 text-center">
                {nft.data.display.data.description || 'No Description'}
              </div>
            </div>
          ))}
      </div>
    </Card>
  );
};
