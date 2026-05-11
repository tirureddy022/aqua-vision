import { Link, useRouterState } from "@tanstack/react-router";
import {
  LayoutDashboard,
  Activity,
  Bell,
  FileBarChart2,
  Map,
  Cpu,
  Users,
  ShieldCheck,
  LogOut,
  Droplets,
  ChevronDown,
  MapPinned,
  Building2,
  UserPlus,
  Wrench,
  HardDrive,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  useSidebar,
} from "@/components/ui/sidebar";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { useState } from "react";

const main = [
  { title: "Dashboard", url: "/", icon: LayoutDashboard },
  { title: "Status Dashboard", url: "/status", icon: Activity },
  { title: "Alerts Dashboard", url: "/alerts", icon: Bell },
  { title: "Reports", url: "/reports", icon: FileBarChart2 },
  { title: "Maps", url: "/maps", icon: Map },
  { title: "Devices", url: "/devices", icon: Cpu },
  { title: "Users", url: "/users", icon: Users },
];

const adminSub = [
  { title: "State", url: "/admin/state", icon: MapPinned },
  { title: "District", url: "/admin/district", icon: Building2 },
  { title: "Signup", url: "/admin/signup", icon: UserPlus },
  { title: "Device Registration", url: "/admin/devices", icon: HardDrive },
  { title: "Technician", url: "/admin/technician", icon: Wrench },
];

export function AppSidebar() {
  const { state } = useSidebar();
  const collapsed = state === "collapsed";
  const path = useRouterState({ select: (r) => r.location.pathname });
  const isActive = (p: string) => (p === "/" ? path === "/" : path.startsWith(p));
  const adminOpenDefault = path.startsWith("/admin");
  const [adminOpen, setAdminOpen] = useState(adminOpenDefault);

  return (
    <Sidebar collapsible="icon" className="border-r">
      <SidebarHeader className="border-b">
        <div className="flex items-center gap-3 px-2 py-3">
          <div className="relative flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-gradient-primary shadow-glow">
            <Droplets className="h-5 w-5 text-primary-foreground" />
          </div>
          {!collapsed && (
            <div className="flex flex-col leading-tight">
              <span className="text-sm font-semibold">AquaMonitor</span>
              <span className="text-[10px] uppercase tracking-wider text-muted-foreground">
                Gov. Water Schemes
              </span>
            </div>
          )}
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Overview</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {main.map((item) => {
                const active = isActive(item.url);
                return (
                  <SidebarMenuItem key={item.url}>
                    <SidebarMenuButton asChild isActive={active} tooltip={item.title}>
                      <Link to={item.url} className="group relative">
                        {active && (
                          <span className="absolute -left-2 top-1/2 h-5 w-1 -translate-y-1/2 rounded-r-full bg-primary" />
                        )}
                        <item.icon className="h-4 w-4" />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>Administration</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <Collapsible open={adminOpen} onOpenChange={setAdminOpen}>
                <SidebarMenuItem>
                  <CollapsibleTrigger asChild>
                    <SidebarMenuButton
                      isActive={path.startsWith("/admin")}
                      tooltip="Admin"
                      className="justify-between"
                    >
                      <span className="flex items-center gap-2">
                        <ShieldCheck className="h-4 w-4" />
                        <span>Admin</span>
                      </span>
                      <ChevronDown
                        className={`h-4 w-4 transition-transform ${adminOpen ? "rotate-180" : ""}`}
                      />
                    </SidebarMenuButton>
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <SidebarMenuSub>
                      {adminSub.map((s) => (
                        <SidebarMenuSubItem key={s.url}>
                          <SidebarMenuSubButton asChild isActive={path === s.url}>
                            <Link to={s.url}>
                              <s.icon className="h-3.5 w-3.5" />
                              <span>{s.title}</span>
                            </Link>
                          </SidebarMenuSubButton>
                        </SidebarMenuSubItem>
                      ))}
                    </SidebarMenuSub>
                  </CollapsibleContent>
                </SidebarMenuItem>
              </Collapsible>

              <SidebarMenuItem>
                <SidebarMenuButton asChild tooltip="Logout">
                  <Link to="/login">
                    <LogOut className="h-4 w-4" />
                    <span>Logout</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
