'use client';

import Header from "./Header";

interface MainLayoutProps {
  children: React.ReactNode;
}

export default function MainLayout({ children }: MainLayoutProps) {
  return (

      <main className="overflow-hidden flex flex-col h-full">
        <Header />
        <div className="flex-1 overflow-hidden">
          <div className="h-full mx-auto container pb-2">{children}</div>
        </div>
      </main>
  );
}
