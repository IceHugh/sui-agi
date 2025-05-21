import { Button } from '@/components/ui/button';
import { Icon } from '@iconify-icon/react';
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
import { useSuiNetworkStore, useSuiNetwork } from '@/stores/sui-network';

const networks = [
  { code: 'mainnet', name: 'Mainnet' },
  { code: 'testnet', name: 'Testnet' },
] as const;

export const SuiNetworkSwitcher = () => {
  const [isPending, startTransition] = useTransition();
  const network = useSuiNetwork();
  const setNetwork = useSuiNetworkStore((state) => state.setNetwork);

  const handleChange = (value: 'mainnet' | 'testnet') => {
    startTransition(() => {
      setNetwork(value);
    });
  };

  const networkName = networks.find((n) => n.code === network)?.name || '';

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={isPending ? 'ghost' : 'outline'}
          size="default"
          aria-label="Switch Sui Network"
          className="flex items-center gap-2"
        >
          <Icon icon="tabler:network" className="size-4" />
          <span className="font-medium">{networkName}</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-32 p-0">
        <Command>
          <CommandList>
            <CommandGroup>
              {networks.map((net) => (
                <CommandItem
                  key={net.code}
                  value={net.code}
                  onSelect={() => handleChange(net.code)}
                  disabled={isPending}
                  className="cursor-pointer justify-between"
                >
                  <span>{net.name}</span>
                  {network === net.code && (
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
