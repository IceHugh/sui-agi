import { Card } from "@/components/ui/card";
import { IconButton } from "@/components/common/button/IconButton";
import { useCurrentAccount } from "@mysten/dapp-kit";
import { QRCodeSVG } from "qrcode.react";
import React from "react";
import { formatAddress } from "@mysten/sui/utils";
import { useCopyToClipboard } from "react-use";

export const AddressCard: React.FC = () => {
  const currentAccount = useCurrentAccount();
  const address = currentAccount?.address || "";
  const [state, copyToClipboard] = useCopyToClipboard();

  const handleCopy = () => {
    if (!address) return;
    copyToClipboard(address);
  };

  const isCopied = state.value === address && !state.error;

  if (!address) return null;

  return (
    <Card className="w-80 mx-auto p-4 flex flex-col items-center gap-4">
      <div className="flex items-center gap-2 w-full justify-center">
        <span className="truncate text-base font-mono" title={address}>{formatAddress(address)}</span>
        <IconButton
          icon={isCopied ? "lucide:check" : "lucide:copy"}
          label={isCopied ? "已复制" : "复制地址"}
          variant="outline"
          size="icon"
          onClick={handleCopy}
        />
      </div>
      <div className="flex flex-col items-center gap-2">
        <QRCodeSVG value={address} size={144} bgColor="#fff" fgColor="#000" />
        <span className="text-xs text-muted-foreground">scan to receive</span>
      </div>
    </Card>
  );
};
