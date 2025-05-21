import { useEffect } from 'react';
import { SuiClientProvider, WalletProvider, } from '@mysten/dapp-kit';
import '@mysten/dapp-kit/dist/index.css';
import { darkTheme, lightTheme } from '@/config/sui-theme';
import { network, networkConfig } from '@/config/sui';
import { useSuiNetwork } from '@/stores/sui-network';

export function SuiProvider({ children }: { children: React.ReactNode }) {
  const network = useSuiNetwork();
  return (
    <SuiClientProvider networks={networkConfig} network={network}>
      <WalletProvider autoConnect theme={[
        {
          variables: lightTheme,
        },
        {
          selector: '.dark',
          variables: darkTheme,
        },
      ]}>
        {children}
      </WalletProvider>
    </SuiClientProvider>
  );
}
