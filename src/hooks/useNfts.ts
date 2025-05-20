import { useSuiClientInfiniteQuery } from '@mysten/dapp-kit';
import { useEffect } from 'react';
import useAssetStore from '@/stores/useAssetStore';

export function useNfts(address?: string) {
  const {
    setNfts,
    setNftsLoading,
    setNftsError,
  } = useAssetStore();
  const {
    data: nftData,
    isPending,
    isError,
    error,
    fetchNextPage,
    hasNextPage,
  } = useSuiClientInfiniteQuery(
    'getOwnedObjects',
    { owner: address || '', options: { showDisplay: true, showType: true } },
    { enabled: !!address, gcTime: 10000 }
  );

  useEffect(() => {
    if (hasNextPage) fetchNextPage();
  }, [hasNextPage, fetchNextPage]);

  useEffect(() => {
    setNftsLoading(isPending);
    setNftsError(isError ? error?.message || 'NFT查询失败' : null);
    let nftsArr: any[] = [];
    if (nftData && Array.isArray(nftData.pages)) {
      nftsArr = nftData.pages
        .map(page => page.data)
        .flat()
        .filter((obj: any) => {
          const type = obj?.data?.type ?? '';
          if (
            type.includes('blob::Blob') ||
            type.includes('suins_registration::SuinsRegistration')
          ) return false;
          return obj?.data?.display?.data?.image_url;
        });
    }
    setNfts(Array.isArray(nftsArr) ? nftsArr : nftsArr ? [nftsArr] : []);
  }, [nftData, isPending, isError, error, setNfts, setNftsLoading, setNftsError]);
}
