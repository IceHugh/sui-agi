import { Button } from '@/components/ui/button'; // 假设 shadcn 的 Button 组件路径
import { Icon } from '@iconify-icon/react';
import type React from 'react';

interface LoadingButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading?: boolean;
  variant?: 'default' | 'secondary';
}

export function UiButton({
  isLoading = false,
  variant = 'default',
  children,
  ...props
}: LoadingButtonProps) {
  return (
    <Button {...props} disabled={isLoading || props.disabled} variant={variant}>
      {isLoading ? (
        <Icon icon="mdi:loading" className="size-3 animate-spin" />
      ) : (
        children
      )}
    </Button>
  );
}
