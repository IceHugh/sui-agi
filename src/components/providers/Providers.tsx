'use client';
import { Toaster } from '@/components/ui/sonner';
import { ThemeProvider } from 'next-themes';
import { TrpcProvider } from './TrpcProvider';
import { I18Provider } from './I18Provider';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <TrpcProvider>
      <I18Provider>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
      >
        <Toaster position="top-center" />
          {children}
        </ThemeProvider>
      </I18Provider>
    </TrpcProvider>
  );
}
