import { SuiNetworkSwitcher } from "@/components/common/SuiNetworkSwitcher";
import { ThemeSwitcher } from "@/components/common/ThemeSwitcher";
import { ConnectButton } from "@/components/wallet/ConnectButton";
import Link from "next/link";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

export default function Header() {
  return <nav className="h-14 sticky top-0 z-50 bg-background/80 backdrop-blur-sm px-4">
    <div className="h-full container mx-auto flex justify-between items-center gap-2">
      <div className="flex items-center gap-2">
        <Link href="/" className="mr-2 flex items-center" aria-label="首页">
          <Avatar className="h-10 w-10">
            <AvatarImage src="/logo.jpg" alt="Logo" />
            <AvatarFallback>Sui Agi</AvatarFallback>
          </Avatar>
        </Link>
        <span className="inline-block rounded-full bg-yellow-200 text-yellow-800 text-xs font-bold px-3 py-1 mr-2 shadow-sm select-none">Beta</span>
      </div>
      <div className="flex items-center gap-2">
        <ConnectButton />
        <SuiNetworkSwitcher />
        <ThemeSwitcher />
      </div>
    </div>
  </nav>;
}
