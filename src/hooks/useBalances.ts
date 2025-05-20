import { useSuiClientQuery, useSuiClient } from '@mysten/dapp-kit';
import useAssetStore from '@/stores/useAssetStore';
import { useEffect } from 'react';

export function useBalances(address?: string) {
  const {
    setBalances,
    setBalancesLoading,
    setBalancesError,
  } = useAssetStore();
  const client = useSuiClient();
  const { data, isPending, isError, error } = useSuiClientQuery('getAllBalances', { owner: address || '' }, { enabled: !!address, gcTime: 10000 });

  useEffect(() => {
    let cancelled = false;
    async function fetchMetasAndSet() {
      setBalancesLoading(isPending);
      setBalancesError(isError ? error?.message || '查询失败' : null);
      if (!data || !Array.isArray(data)) {
        setBalances([]);
        return;
      }
      try {
        const metas = await Promise.all(
          data.map((item) =>
            client.getCoinMetadata({ coinType: item.coinType })
              .then((meta) => meta)
              .catch(() => null)
          )
        );
        const balancesWithMeta = data.map((item, idx) => ({ ...item, meta: metas[idx] }));
        if (!cancelled) setBalances(balancesWithMeta);
      } catch (e) {
        if (!cancelled) setBalancesError('元信息批量查询失败');
      }
    }
    fetchMetasAndSet();
    return () => { cancelled = true; };
  }, [data, isPending, isError, error, setBalances, setBalancesLoading, setBalancesError, client]);

}
