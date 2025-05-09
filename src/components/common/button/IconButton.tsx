import { Button } from '@/components/ui/button';
import { Icon } from '@iconify-icon/react';
import Link from 'next/link';
import React from 'react';

interface IconButtonProps {
  icon: string;
  label?: string;
  variant?: 'default' | 'outline' | 'ghost' | 'link';
  size?: 'default' | 'sm' | 'lg' | 'icon';
  link?: string;
  onClick?: () => void;
}

export const IconButton = ({
  icon,
  label = '',
  variant = 'outline',
  size = 'icon',
  link = '',
  onClick,
  ...props
}: IconButtonProps) => {
  const ButtonContent = () => (
    <>
      <Icon icon={icon} className="size-4" />
      {label && <span className="sr-only">{label}</span>}
    </>
  );

  if (link) {
    return (
      <Button asChild variant={variant} size={size} {...props}>
        <Link href={link} aria-label={label || 'icon button'}>
          <ButtonContent />
        </Link>
      </Button>
    );
  }

  return (
    <Button
      variant={variant}
      size={size}
      aria-label={label || 'icon button'}
      onClick={onClick}
      {...props}
    >
      <ButtonContent />
    </Button>
  );
};
