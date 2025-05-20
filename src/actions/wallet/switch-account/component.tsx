import { useAccounts, useSwitchAccount } from "@mysten/dapp-kit";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export function SwitchAccountConfirmDialog({
  onConfirm,
  onCancel,
}: {
  onConfirm: () => void;
  onCancel: () => void;
}) {
  const { mutate: switchAccount } = useSwitchAccount();
  const accounts = useAccounts();
  const [open, setOpen] = useState(true);
  const [isSwitching, setIsSwitching] = useState<string | null>(null);

  const handleSwitch = (account: typeof accounts[number]) => {
    setIsSwitching(account.address);
    switchAccount(
      { account },
      {
        onSuccess: () => {
          setOpen(false);
          onConfirm();
        },
        onSettled: () => setIsSwitching(null),
      }
    );
  };

  const handleCancel = () => {
    setOpen(false);
    onCancel();
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Please select the account to switch</DialogTitle>
        </DialogHeader>
        <ul className="list-disc pl-5 space-y-2">
          {accounts.map((account) => (
            <li key={account.address} className="flex items-center gap-2 break-all">
              <span className="flex-1">{account.address}</span>
              <Button
                onClick={() => handleSwitch(account)}
                disabled={isSwitching === account.address}
              >
                {isSwitching === account.address ? "Switching..." : "Switch"}
              </Button>
            </li>
          ))}
        </ul>
        <DialogFooter>
          <Button variant="secondary" onClick={handleCancel}>Cancel</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
