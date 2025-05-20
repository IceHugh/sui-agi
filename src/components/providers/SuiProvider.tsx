import { useEffect } from 'react';
import { SuiClientProvider, WalletProvider, } from '@mysten/dapp-kit';
import '@mysten/dapp-kit/dist/index.css';
import { darkTheme, lightTheme } from '@/config/sui-theme';
import { networkConfig } from '@/config/sui';

export function SuiProvider({ children }: { children: React.ReactNode }) {
  return (
    <SuiClientProvider networks={networkConfig} defaultNetwork="testnet">
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
