import { useTranslation } from 'react-i18next';
import { IconButton } from '@/components/common/button/IconButton';
import {
  Command,
  CommandGroup,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';

import { CheckIcon } from 'lucide-react';
import { useTransition } from 'react';

const locales = [
  { code: 'en', name: 'English' },
  { code: 'zh', name: '中文' },
] as const;

export const LanguageSwitcher = () => {
  const [isPending, startTransition] = useTransition();
  const { i18n } = useTranslation();
  const handleChange = (value: 'en' | 'zh') => {
    const locale = value;
    startTransition(() => {
      i18n.changeLanguage(locale);
    });
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <IconButton
          icon="prime:language"
          variant={isPending ? 'ghost' : 'outline'}
          label="Switch language"
        />
      </PopoverTrigger>
      <PopoverContent className="w-28 p-0">
        <Command>
          <CommandList>
            <CommandGroup>
              {locales.map((lang) => (
                <CommandItem
                  key={lang.code}
                  value={lang.code}
                  onSelect={() => handleChange(lang.code as 'en' | 'zh')}
                  disabled={isPending}
                  className="cursor-pointer justify-between"
                >
                  <span>{lang.name}</span>
                  {i18n.language === lang.code && (
                    <CheckIcon className="mr-2 h-4 w-4" />
                  )}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};
