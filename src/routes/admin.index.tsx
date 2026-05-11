import { createFileRoute, Link } from "@tanstack/react-router";
import { DashboardShell } from "@/components/dashboard-shell";
import { StatCard } from "@/components/stat-card";
import { Card } from "@/components/ui/card";
import { MapPinned, Building2, Users, Cpu, Wrench, BellRing, Activity, ShieldCheck } from "lucide-react";

export const Route = createFileRoute("/admin/")({
  head: () => ({
    meta: [
      { title: "Admin — AquaMonitor" },
      { name: "description", content: "Administration centre for AquaMonitor." },
    ],
  }),
  component: AdminHome,
});

function AdminHome() {
  const submodules = [
    { url: "/admin/state", label: "State management", icon: MapPinned, desc: "Add or edit states" },
    { url: "/admin/district", label: "District management", icon: Building2, desc: "Map districts to states" },
    { url: "/admin/signup", label: "Signup requests", icon: Users, desc: "Approve new officials" },
    { url: "/admin/devices", label: "Device registration", icon: Cpu, desc: "Register and validate devices" },
    { url: "/admin/technician", label: "Technician management", icon: Wrench, desc: "Assign field staff" },
  ];

  return (
    <DashboardShell>
      <div className="space-y-6">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
          <StatCard label="States" value={28} icon={MapPinned} tone="primary" />
          <StatCard label="Districts" value={742} icon={Building2} tone="info" />
          <StatCard label="Users" value={482} icon={Users} tone="accent" />
          <StatCard label="Devices" value={1248} icon={Cpu} tone="success" />
          <StatCard label="Technicians" value={148} icon={Wrench} tone="warning" />
          <StatCard label="Alerts" value={20} icon={BellRing} tone="destructive" />
          <StatCard label="System" value={99} suffix="%" icon={Activity} tone="success" />
        </div>

        <div>
          <div className="flex items-center gap-2 mb-3">
            <ShieldCheck className="h-4 w-4 text-primary" />
            <h2 className="text-sm font-semibold">Admin modules</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {submodules.map((m) => (
              <Link key={m.url} to={m.url}>
                <Card className="p-5 border-border/60 hover-lift group">
                  <div className="flex items-center justify-between">
                    <div className="h-11 w-11 rounded-xl bg-gradient-primary text-primary-foreground flex items-center justify-center shadow-glow">
                      <m.icon className="h-5 w-5" />
                    </div>
                    <span className="text-xs text-muted-foreground group-hover:text-primary transition">Open →</span>
                  </div>
                  <h3 className="mt-4 font-semibold">{m.label}</h3>
                  <p className="text-xs text-muted-foreground mt-1">{m.desc}</p>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </DashboardShell>
  );
}
