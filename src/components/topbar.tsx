import { useEffect, useState } from "react";
import { useRouterState, Link } from "@tanstack/react-router";
import { Bell, Search, Sun, Moon, ChevronRight, Droplets } from "lucide-react";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useTheme } from "@/lib/theme";

const titles: Record<string, string> = {
  "/": "Dashboard",
  "/status": "Status Dashboard",
  "/alerts": "Alerts",
  "/reports": "Reports",
  "/maps": "Map View",
  "/devices": "Devices",
  "/users": "Users",
  "/admin": "Admin",
};

export function Topbar() {
  const { theme, toggle } = useTheme();
  const path = useRouterState({ select: (r) => r.location.pathname });
  const [now, setNow] = useState(new Date());
  useEffect(() => {
    const i = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(i);
  }, []);

  const crumbs = path.split("/").filter(Boolean);
  const pageTitle = titles[path] ?? titles[`/${crumbs[0] ?? ""}`] ?? "Overview";

  return (
    <header className="sticky top-0 z-30 border-b bg-background/70 backdrop-blur-xl">
      <div className="flex h-16 items-center gap-3 px-4 md:px-6">
        <SidebarTrigger className="md:hidden" />
        <div className="hidden md:flex items-center gap-2 min-w-0">
          <SidebarTrigger />
          <div className="ml-2 flex items-center gap-2 text-sm text-muted-foreground">
            <Link to="/" className="flex items-center gap-1.5 hover:text-foreground">
              <Droplets className="h-3.5 w-3.5" />
              <span>AquaMonitor</span>
            </Link>
            {crumbs.map((c, i) => (
              <span key={i} className="flex items-center gap-2">
                <ChevronRight className="h-3 w-3" />
                <span className="capitalize text-foreground">{c.replace(/-/g, " ")}</span>
              </span>
            ))}
          </div>
        </div>

        <div className="ml-auto flex items-center gap-2 md:gap-3">
          <div className="relative hidden md:block">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search schemes, devices…"
              className="w-64 pl-9 bg-muted/40 border-border/60"
            />
          </div>

          <div className="hidden lg:flex flex-col items-end text-right leading-tight">
            <span className="text-xs font-medium tabular-nums">
              {now.toLocaleTimeString()}
            </span>
            <span className="text-[10px] text-muted-foreground">
              {now.toLocaleDateString(undefined, {
                weekday: "short",
                day: "numeric",
                month: "short",
                year: "numeric",
              })}
            </span>
          </div>

          <Button
            variant="ghost"
            size="icon"
            onClick={toggle}
            aria-label="Toggle theme"
            className="rounded-full"
          >
            {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="relative rounded-full">
                <Bell className="h-4 w-4" />
                <span className="absolute right-2 top-2 flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-destructive opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-destructive" />
                </span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-80">
              <DropdownMenuLabel className="flex items-center justify-between">
                Notifications <Badge variant="secondary">3 new</Badge>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              {[
                { t: "Pump #A-204 offline", d: "Dharwad • 2m ago", tone: "destructive" },
                { t: "Motor restarted", d: "Belgaum • 14m ago", tone: "success" },
                { t: "Low pressure warning", d: "Hubli • 1h ago", tone: "warning" },
              ].map((n, i) => (
                <DropdownMenuItem key={i} className="flex flex-col items-start gap-0.5 py-2">
                  <span className="text-sm font-medium">{n.t}</span>
                  <span className="text-xs text-muted-foreground">{n.d}</span>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="flex items-center gap-2 rounded-full pl-1 pr-3 py-1 hover:bg-muted transition-colors">
                <Avatar className="h-8 w-8 ring-2 ring-primary/30">
                  <AvatarFallback className="bg-gradient-primary text-primary-foreground text-xs font-semibold">
                    RJ
                  </AvatarFallback>
                </Avatar>
                <div className="hidden md:flex flex-col items-start leading-tight">
                  <span className="text-xs font-semibold">R. Joshi</span>
                  <span className="text-[10px] text-muted-foreground">District Officer</span>
                </div>
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>My account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Profile</DropdownMenuItem>
              <DropdownMenuItem>Settings</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link to="/login">Logout</Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      <div className="px-4 md:px-6 pb-3 md:pb-4">
        <h1 className="text-xl md:text-2xl font-semibold tracking-tight">{pageTitle}</h1>
      </div>
    </header>
  );
}
