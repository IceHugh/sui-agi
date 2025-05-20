'use client';
import { Toaster } from '@/components/ui/sonner';
import { ThemeProvider } from 'next-themes';
import { I18Provider } from './I18Provider';
import { QueryProvider } from './QueryProvider';
import { SuiProvider } from './SuiProvider';
export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <QueryProvider>
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        <SuiProvider>
          <I18Provider>
              <Toaster position="top-center" />
              {children}
          </I18Provider>
        </SuiProvider>
      </ThemeProvider>
    </QueryProvider>
  );
}
