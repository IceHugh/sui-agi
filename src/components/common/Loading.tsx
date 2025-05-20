import React from 'react';
import styles from './Loading.module.css'; // 导入 CSS Modules
import { cn } from '@/lib/utils'; // 引入 cn 工具函数

interface LoadingProps extends React.HTMLAttributes<HTMLSpanElement> {
  // 可以添加其他 props，例如 size, color 等
}

export const Loading: React.FC<LoadingProps> = ({ className, ...props }) => {
  return (
    <span
      className={cn(styles.loader, className)}
      role="status" // 增加可访问性
      aria-live="polite" // 增加可访问性
      aria-label="Loading" // 增加可访问性
      {...props}
    >
      <span className="sr-only">Loading...</span>
    </span>
  );
};
