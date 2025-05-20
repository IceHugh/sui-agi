import { useBalances } from '@/hooks/useBalances';
import { useStakes } from '@/hooks/useStakes';
import { useValidatorsApy } from '@/hooks/useValidatorsApy';
import { useNfts } from '@/hooks/useNfts';
import { useLatestSuiSystemState } from '@/hooks/useLatestSuiSystemState';

/**
 * 聚合查询钱包资产、NFT、质押、验证者APY、系统状态
 * @param address 钱包地址
 */
export function useWalletAssets(address?: string) {
  useBalances(address);
  useStakes(address);
  useValidatorsApy();
  useNfts(address);
  useLatestSuiSystemState();
}
