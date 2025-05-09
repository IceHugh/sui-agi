'use client';

import { cn } from '@/lib/utils';
import { AnimatePresence, motion } from 'framer-motion';
import Link from 'next/link';
import { useState } from 'react';

interface DockItemProps {
  icon: React.ReactNode;
  label: string;
  href?: string;
  onClick?: () => void;
  isActive?: boolean;
}

const DockItem = ({ icon, label, href, onClick, isActive }: DockItemProps) => {
  const [isHovered, setIsHovered] = useState(false);

  const content = (
    <motion.div
      className={cn(
        'p-1.5 sm:p-2 rounded-lg sm:rounded-xl bg-background/80 backdrop-blur-sm border shadow-lg',
        isActive && 'border-primary/50 bg-muted',
        href ? 'cursor-pointer' : onClick ? 'cursor-pointer' : 'cursor-default',
      )}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: 'spring', stiffness: 400, damping: 17 }}
    >
      {icon}
    </motion.div>
  );

  const wrapper = (
    <motion.div
      className="relative flex flex-col items-center touch-none"
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      onClick={!href ? onClick : undefined}
    >
      {content}
      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            className="absolute -top-6 sm:-top-8 px-1.5 py-0.5 sm:px-2 sm:py-1 text-[10px] sm:text-xs rounded-md bg-popover shadow-md whitespace-nowrap"
          >
            {label}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );

  if (href) {
    return <Link href={href}>{wrapper}</Link>;
  }

  return wrapper;
};

interface DockProps {
  items: Array<DockItemProps>;
}

export default function Dock({ items }: DockProps) {
  return (
    <motion.div
      className={cn(
        'fixed bottom-2 sm:bottom-4 left-1/2 -translate-x-1/2',
        'flex items-center gap-1.5 sm:gap-3 p-1.5 sm:p-3 rounded-xl sm:rounded-2xl',
        'bg-background/80 backdrop-blur-sm border shadow-lg',
        'z-50', // 确保 Dock 始终在顶层
        'touch-none', // 防止移动端触摸穿透
      )}
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      transition={{ type: 'spring', stiffness: 200, damping: 20 }}
    >
      {items.map((item) => (
        <DockItem key={item.label} {...item} />
      ))}
    </motion.div>
  );
}
