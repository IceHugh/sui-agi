import { create } from 'zustand';

export type SuiNetwork = 'mainnet' | 'testnet';

const LOCAL_STORAGE_KEY = 'sui-network';

const DEFAULT_NETWORK = 'testnet';
function getInitialNetwork(): SuiNetwork {
  if (typeof window !== 'undefined') {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (saved === 'mainnet' || saved === 'testnet') return saved;
  }
  return DEFAULT_NETWORK;
}

interface SuiNetworkState {
  network: SuiNetwork;
  setNetwork: (network: SuiNetwork) => void;
}

export const useSuiNetworkStore = create<SuiNetworkState>((set) => ({
  network: typeof window !== 'undefined' ? getInitialNetwork() : DEFAULT_NETWORK,
  setNetwork: (network) => {
    set({ network });
    if (typeof window !== 'undefined') {
      localStorage.setItem(LOCAL_STORAGE_KEY, network);
    }
  },
}));

export const useSuiNetwork = () => useSuiNetworkStore((state) => state.network);
