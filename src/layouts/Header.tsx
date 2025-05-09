import { LanguageSwitcher } from "@/components/common/LanguageSwitcher";
import { ThemeSwitcher } from "@/components/common/ThemeSwitcher";
export default function Header() {
  return <nav className="h-14 sticky top-0 z-50 bg-background/80 backdrop-blur-sm border-b">
    <div className="h-full container mx-auto flex justify-end items-center gap-2">
      <div className="flex items-center gap-2">
        <ThemeSwitcher />
        <LanguageSwitcher />
      </div>
    </div>
  </nav>;
}
