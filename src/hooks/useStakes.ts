import { useSuiClientQuery } from '@mysten/dapp-kit';
import useAssetStore from '@/stores/useAssetStore';
import { useEffect } from 'react';

export function useStakes(address?: string) {
  const {
    setStakes,
    setStakesLoading,
    setStakesError,
  } = useAssetStore();
  const { data, isPending, isError, error, refetch } = useSuiClientQuery('getStakes', { owner: address || '' }, { enabled: !!address, gcTime: 10000, refetchInterval: 10000 });

  useEffect(() => {
    setStakesLoading(isPending);
    setStakesError(isError ? error?.message || '查询失败' : null);
    console.log(data);
    setStakes(data ? data : []);
  }, [data, isPending, isError, error, setStakes, setStakesLoading, setStakesError]);
  return { refetch };
}
