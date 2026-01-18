import { RefreshCw, Settings, Sun, Moon } from "lucide-react";
import { Button } from "@/components/ui/button";

interface HeaderProps {
  onRefresh: () => void;
  onOpenSettings: () => void;
  isLoading: boolean;
  userName?: string;
  theme: "light" | "dark" | "system";
  onToggleTheme: () => void;
}

export function Header({ onRefresh, onOpenSettings, isLoading, userName, theme, onToggleTheme }: HeaderProps) {
  const now = new Date();
  const hour = now.getHours();
  
  const greeting = hour < 12 ? "Good morning" : hour < 18 ? "Good afternoon" : "Good evening";
  
  const timeString = now.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
  const dateString = now.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  });

  const isDark = theme === "dark";

  return (
    <header className="flex items-center justify-between mb-8">
      <div>
        <h1 className="font-display font-bold text-2xl md:text-3xl text-foreground">
          {greeting}{userName ? `, ${userName}` : ""}! 👋
        </h1>
        <p className="text-muted-foreground text-sm mt-1">
          {dateString} • {timeString}
        </p>
      </div>
      
      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          size="icon"
          onClick={onToggleTheme}
          className="rounded-full relative overflow-hidden"
        >
          <Sun className={`h-4 w-4 absolute transition-all duration-300 ${isDark ? "rotate-90 scale-0 opacity-0" : "rotate-0 scale-100 opacity-100"}`} />
          <Moon className={`h-4 w-4 transition-all duration-300 ${isDark ? "rotate-0 scale-100 opacity-100" : "-rotate-90 scale-0 opacity-0"}`} />
        </Button>
        <Button
          variant="outline"
          size="icon"
          onClick={onOpenSettings}
          className="rounded-full"
        >
          <Settings className="h-4 w-4" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          onClick={onRefresh}
          disabled={isLoading}
          className="rounded-full"
        >
          <RefreshCw className={`h-4 w-4 ${isLoading ? "animate-spin" : ""}`} />
        </Button>
      </div>
    </header>
  );
}
