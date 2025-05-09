'use client';

import Dock from '@/layouts/Dock';
import { Calendar, CheckSquare, Clock, HomeIcon, Settings } from 'lucide-react';
import { usePathname } from 'next/navigation';
import Header from './Header';
interface MainLayoutProps {
  children: React.ReactNode;
}

export default function MainLayout({ children }: MainLayoutProps) {
  const pathname = usePathname();

  const navigationItems = [
    {
      icon: <HomeIcon className="h-5 w-5 sm:h-6 sm:w-6" />,
      label: '首页',
      href: '/',
      isActive: pathname === '/',
    },
    {
      icon: <CheckSquare className="h-5 w-5 sm:h-6 sm:w-6" />,
      label: '待办事项',
      href: '/todo',
      isActive: pathname === '/todo',
    },
    {
      icon: <Clock className="h-5 w-5 sm:h-6 sm:w-6" />,
      label: '番茄钟',
      href: '/pomodoro',
      isActive: pathname === '/pomodoro',
    },
    {
      icon: <Calendar className="h-5 w-5 sm:h-6 sm:w-6" />,
      label: '日历',
      href: '/calendar',
      isActive: pathname === '/calendar',
    },
    {
      icon: <CheckSquare className="h-5 w-5 sm:h-6 sm:w-6" />,
      label: '习惯',
      href: '/habits',
      isActive: pathname === '/habits',
    },

    {
      icon: <Settings className="h-5 w-5 sm:h-6 sm:w-6" />,
      label: '设置',
      href: '/settings',
      isActive: pathname === '/settings',
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="pb-20 sm:pb-24">
        <div className="container mx-auto px-3 py-2 sm:p-6">{children}</div>
      </main>

      <Dock items={navigationItems} />
    </div>
  );
}
