import { create } from 'zustand';
import { useBalances } from '@/hooks/useBalances';
import { useStakes } from '@/hooks/useStakes';
import { useValidatorsApy } from '@/hooks/useValidatorsApy';
import { useNfts } from '@/hooks/useNfts';

export type AssetStore = {
  // 钱包资产
  balances: any[];
  balancesLoading: boolean;
  balancesError: string | null;
  setBalances: (data: any[]) => void;
  setBalancesLoading: (loading: boolean) => void;
  setBalancesError: (err: string | null) => void;

  // NFT
  nfts: any[];
  nftsLoading: boolean;
  nftsError: string | null;
  setNfts: (data: any[]) => void;
  setNftsLoading: (loading: boolean) => void;
  setNftsError: (err: string | null) => void;

  // 质押
  stakes: any[];
  stakesLoading: boolean;
  stakesError: string | null;
  setStakes: (data: any[]) => void;
  setStakesLoading: (loading: boolean) => void;
  setStakesError: (err: string | null) => void;

  // 验证者APY
  validatorsApy: any[];
  validatorsApyLoading: boolean;
  validatorsApyError: string | null;
  setValidatorsApy: (data: any[]) => void;
  setValidatorsApyLoading: (loading: boolean) => void;
  setValidatorsApyError: (err: string | null) => void;

  // 新增 system state
  suiSystemState: any;
  suiSystemStateLoading: boolean;
  suiSystemStateError: string | null;
  setSuiSystemState: (data: any) => void;
  setSuiSystemStateLoading: (loading: boolean) => void;
  setSuiSystemStateError: (err: string | null) => void;
};

const useAssetStore = create<AssetStore>((set) => ({
  // 钱包资产
  balances: [],
  balancesLoading: false,
  balancesError: null,
  setBalances: (data) => set({ balances: data }),
  setBalancesLoading: (loading) => set({ balancesLoading: loading }),
  setBalancesError: (err) => set({ balancesError: err }),

  // NFT
  nfts: [],
  nftsLoading: false,
  nftsError: null,
  setNfts: (data) => set({ nfts: data }),
  setNftsLoading: (loading) => set({ nftsLoading: loading }),
  setNftsError: (err) => set({ nftsError: err }),

  // 质押
  stakes: [],
  stakesLoading: false,
  stakesError: null,
  setStakes: (data) => set({ stakes: data }),
  setStakesLoading: (loading) => set({ stakesLoading: loading }),
  setStakesError: (err) => set({ stakesError: err }),

  // 验证者APY
  validatorsApy: [],
  validatorsApyLoading: false,
  validatorsApyError: null,
  setValidatorsApy: (data) => set({ validatorsApy: data }),
  setValidatorsApyLoading: (loading) => set({ validatorsApyLoading: loading }),
  setValidatorsApyError: (err) => set({ validatorsApyError: err }),

  // 新增 system state
  suiSystemState: null,
  suiSystemStateLoading: false,
  suiSystemStateError: null,
  setSuiSystemState: (data) => set({ suiSystemState: data }),
  setSuiSystemStateLoading: (loading) => set({ suiSystemStateLoading: loading }),
  setSuiSystemStateError: (err) => set({ suiSystemStateError: err }),
}));

export default useAssetStore;
