import { SuiNetworkSwitcher } from "@/components/common/SuiNetworkSwitcher";
import { ThemeSwitcher } from "@/components/common/ThemeSwitcher";
import { ConnectButton } from "@/components/wallet/ConnectButton";
export default function Header() {
  return <nav className="h-14 sticky top-0 z-50 bg-background/80 backdrop-blur-sm px-4">
    <div className="h-full container mx-auto flex justify-end items-center gap-2">
      <div className="flex items-center gap-2">
        <ConnectButton />
        <SuiNetworkSwitcher />
        <ThemeSwitcher />
      </div>
    </div>
  </nav>;
}
