import { IconButton } from '@/components/common/button/IconButton';
import React from 'react';
import { useTheme } from "next-themes"

export const ThemeSwitcher = () => {
  const { theme, setTheme } = useTheme()

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    // document.documentElement.classList.toggle('dark', newTheme === 'dark');
  };

  const icon =
    theme === 'light'
      ? 'solar:moon-stars-line-duotone'
      : 'solar:sun-2-line-duotone';

  return <IconButton icon={icon} label="Toggle Theme" onClick={toggleTheme} />;
};
