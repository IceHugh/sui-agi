import { useSuiClientQuery } from '@mysten/dapp-kit';
import useAssetStore from '@/stores/useAssetStore';
import { useEffect } from 'react';

export function useLatestSuiSystemState() {
  const {
    setSuiSystemState,
    setSuiSystemStateLoading,
    setSuiSystemStateError,
  } = useAssetStore();
  const { data, isPending, isError, error } = useSuiClientQuery('getLatestSuiSystemState', {}, { gcTime: 10000 });

  useEffect(() => {
    setSuiSystemStateLoading(isPending);
    setSuiSystemStateError(isError ? error?.message || '查询失败' : null);
    setSuiSystemState(data);
  }, [data, isPending, isError, error, setSuiSystemState, setSuiSystemStateLoading, setSuiSystemStateError]);
}
