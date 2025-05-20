import { useDisconnectWallet } from "@mysten/dapp-kit";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export function DisconnectWalletConfirmDialog({ onConfirm, onCancel }: { onConfirm: () => void; onCancel: () => void }) {
  const { mutate: disconnect } = useDisconnectWallet();
  const [open, setOpen] = useState(true);

  const handleConfirm = () => {
    disconnect();
    setOpen(false);
    onConfirm();
  };

  const handleCancel = () => {
    setOpen(false);
    onCancel();
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Confirm disconnect wallet?</DialogTitle>
        </DialogHeader>
        <DialogFooter>
          <Button variant="secondary" onClick={handleCancel}>Cancel</Button>
          <Button variant="destructive" onClick={handleConfirm}>Confirm disconnect</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
