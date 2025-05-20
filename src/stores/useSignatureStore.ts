import { create } from 'zustand';

// address-signature 映射类型
export type AddressSignatures = Record<string, string>;

interface SignatureStore {
  signatures: AddressSignatures;
  isLoaded: boolean;
  setSignature: (address: string, signature: string) => void;
  getSignature: (address: string) => string | undefined;
  loadFromStorage: () => void;
  setIsLoaded: (loaded: boolean) => void;
}

const STORAGE_KEY = 'addressSignatures';

export const useSignatureStore = create<SignatureStore>((set, get) => ({
  signatures: {},
  isLoaded: false,
  setSignature: (address, signature) => {
    const newSignatures = { ...get().signatures, [address]: signature };
    set({ signatures: newSignatures });
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(newSignatures));
  },
  getSignature: (address) => {
    return get().signatures[address];
  },
  loadFromStorage: () => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) {
        set({ signatures: JSON.parse(raw) });
      }
    } catch (e) {
      // ignore
    } finally {
      set({ isLoaded: true });
    }
  },
  setIsLoaded: (loaded) => set({ isLoaded: loaded }),
}));
