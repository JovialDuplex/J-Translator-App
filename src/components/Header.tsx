import { Moon, Sun, Languages } from "lucide-react";
import { useTheme } from "@/hooks/useTheme";
import { Switch } from "@/components/ui/switch";

export function Header() {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="w-full py-4 px-6 flex items-center justify-between border-b border-border bg-card/50 backdrop-blur-sm">
      <div className="flex items-center gap-3">
        <Languages className={"text-primary font-bold text-2xl "} /> <span className={"text-primary font-bold text-2xl"}> J-Translator </span>
        {/* <img src={logo} alt="Kandy Shopping" className="h-12 w-auto" /> */}
      </div>

      <div className="flex items-center gap-3">
        <Sun className="h-4 w-4 text-muted-foreground" />
        <Switch
          checked={theme === "dark"}
          onCheckedChange={toggleTheme}
          className="data-[state=checked]:bg-primary"
        />
        <Moon className="h-4 w-4 text-muted-foreground" />
      </div>
    </header>
  );
}
