import { useSuiClientQuery } from '@mysten/dapp-kit';
import useAssetStore from '@/stores/useAssetStore';
import { useEffect } from 'react';

export function useValidatorsApy() {
  const {
    setValidatorsApy,
    setValidatorsApyLoading,
    setValidatorsApyError,
  } = useAssetStore();
  const { data, isPending, isError, error } = useSuiClientQuery('getValidatorsApy', {}, { gcTime: 10000 });

  useEffect(() => {
    setValidatorsApyLoading(isPending);
    setValidatorsApyError(isError ? error?.message || '查询失败' : null);
    setValidatorsApy( data ? data.apys : []);
  }, [data, isPending, isError, error, setValidatorsApy, setValidatorsApyLoading, setValidatorsApyError]);
}
