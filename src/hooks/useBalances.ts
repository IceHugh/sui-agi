import { useSuiClientQuery, useSuiClient } from '@mysten/dapp-kit';
import useAssetStore from '@/stores/useAssetStore';
import { useEffect } from 'react';
import { SUI_COIN_TYPE } from "@/constants";

export function useBalances(address?: string) {
  const {
    setBalances,
    setBalancesLoading,
    setBalancesError,
  } = useAssetStore();
  const client = useSuiClient();
  const { data, isPending, isError, error } = useSuiClientQuery('getAllBalances', { owner: address || '' }, { enabled: !!address, gcTime: 10000, refetchInterval: 10000 });

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
        // 排序：SUI_COIN_TYPE 第一个，其余按 meta.name 排序
        balancesWithMeta.sort((a, b) => {
          if (a.coinType === SUI_COIN_TYPE) return -1;
          if (b.coinType === SUI_COIN_TYPE) return 1;
          const nameA = a.meta?.name || '';
          const nameB = b.meta?.name || '';
          return nameA.localeCompare(nameB, 'zh-Hans-CN', { sensitivity: 'base' });
        });
        if (!cancelled) setBalances(balancesWithMeta);
      } catch (e) {
        if (!cancelled) setBalancesError('元信息批量查询失败');
      }
    }
    fetchMetasAndSet();
    return () => { cancelled = true; };
  }, [data, isPending, isError, error, setBalances, setBalancesLoading, setBalancesError, client]);

}
