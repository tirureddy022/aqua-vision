import { createFileRoute } from "@tanstack/react-router";
import { DashboardShell } from "@/components/dashboard-shell";
import { StatCard } from "@/components/stat-card";
import { DonutChart } from "@/components/donut-chart";
import { StatusBadge } from "@/components/status-badge";
import {
  Cpu,
  Workflow,
  PlayCircle,
  Wifi,
  WifiOff,
  PowerOff,
  Power,
  Zap,
  ZapOff,
  CircleDot,
} from "lucide-react";
import { Card } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Dashboard — AquaMonitor" },
      {
        name: "description",
        content: "Live overview of water schemes, devices, motor and power status.",
      },
    ],
  }),
  component: DashboardPage,
});

const rows = [
  { scheme: "Hubli Urban Supply", state: "Karnataka", district: "Dharwad", power: "on", motor: "on" },
  { scheme: "Belgaum Phase II", state: "Karnataka", district: "Belgaum", power: "on", motor: "off" },
  { scheme: "Mysore North Network", state: "Karnataka", district: "Mysore", power: "off", motor: "off" },
  { scheme: "Pune Cantonment", state: "Maharashtra", district: "Pune", power: "on", motor: "on" },
  { scheme: "Nashik Trunk Main", state: "Maharashtra", district: "Nashik", power: "on", motor: "on" },
  { scheme: "Indore Sector 4", state: "Madhya Pradesh", district: "Indore", power: "off", motor: "off" },
  { scheme: "Jaipur Pink City", state: "Rajasthan", district: "Jaipur", power: "on", motor: "off" },
  { scheme: "Surat Coastal", state: "Gujarat", district: "Surat", power: "on", motor: "on" },
] as const;

function DashboardPage() {
  return (
    <DashboardShell>
      <div className="space-y-6 animate-slide-up">
        {/* Hero strip */}
        <div className="relative overflow-hidden rounded-2xl bg-gradient-hero p-6 md:p-8 text-white shadow-card">
          <div className="absolute inset-0 opacity-30 mix-blend-overlay" style={{
            backgroundImage:
              "radial-gradient(circle at 20% 20%, rgba(255,255,255,.35), transparent 40%), radial-gradient(circle at 80% 80%, rgba(255,255,255,.2), transparent 40%)",
          }} />
          <div className="relative flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-white/70">Live network</p>
              <h2 className="mt-1 text-2xl md:text-3xl font-semibold">Good afternoon, Officer Joshi</h2>
              <p className="mt-1 text-sm text-white/80">
                12 schemes online across 4 states. 2 alerts need your attention.
              </p>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right">
                <p className="text-3xl font-semibold tabular-nums">99.2%</p>
                <p className="text-xs text-white/70">network uptime</p>
              </div>
              <div className="h-12 w-12 rounded-2xl bg-white/15 backdrop-blur flex items-center justify-center">
                <CircleDot className="h-6 w-6" />
              </div>
            </div>
          </div>
        </div>

        {/* Stat cards */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          <StatCard label="Total Devices" value={1248} icon={Cpu} tone="primary" delta="+12" />
          <StatCard label="Total Schemes" value={342} icon={Workflow} tone="info" delta="+3" />
          <StatCard label="Running" value={287} icon={PlayCircle} tone="success" delta="+5" />
          <StatCard label="Online" value={1190} icon={Wifi} tone="success" />
          <StatCard label="Offline" value={58} icon={WifiOff} tone="destructive" />
          <StatCard label="Not In Use" value={24} icon={CircleDot} tone="warning" />
          <StatCard label="Power ON" value={1132} icon={Power} tone="success" />
          <StatCard label="Power OFF" value={116} icon={PowerOff} tone="destructive" />
          <StatCard label="Motor ON" value={874} icon={Zap} tone="accent" />
          <StatCard label="Motor OFF" value={374} icon={ZapOff} tone="warning" />
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <DonutChart
            title="Power ON vs OFF"
            data={[
              { name: "Power ON", value: 1132 },
              { name: "Power OFF", value: 116 },
            ]}
            colors={["var(--success)", "var(--destructive)"]}
          />
          <DonutChart
            title="Online vs Offline"
            data={[
              { name: "Online", value: 1190 },
              { name: "Offline", value: 58 },
            ]}
            colors={["var(--primary)", "var(--muted-foreground)"]}
          />
          <DonutChart
            title="Motor ON vs OFF"
            data={[
              { name: "Motor ON", value: 874 },
              { name: "Motor OFF", value: 374 },
            ]}
            colors={["var(--accent)", "var(--warning)"]}
          />
        </div>

        {/* Table */}
        <Card className="border-border/60">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between p-4 border-b">
            <div>
              <h3 className="text-sm font-semibold">Live scheme status</h3>
              <p className="text-xs text-muted-foreground">Updated a few seconds ago</p>
            </div>
            <div className="relative w-full sm:w-64">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input placeholder="Search schemes…" className="pl-9 h-9" />
            </div>
          </div>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader className="bg-muted/40 sticky top-0">
                <TableRow>
                  <TableHead>Scheme Name</TableHead>
                  <TableHead>State</TableHead>
                  <TableHead>District</TableHead>
                  <TableHead>Power</TableHead>
                  <TableHead>Motor</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {rows.map((r) => (
                  <TableRow key={r.scheme} className="hover:bg-muted/40 transition-colors">
                    <TableCell className="font-medium">{r.scheme}</TableCell>
                    <TableCell className="text-muted-foreground">{r.state}</TableCell>
                    <TableCell className="text-muted-foreground">{r.district}</TableCell>
                    <TableCell><StatusBadge status={r.power} /></TableCell>
                    <TableCell><StatusBadge status={r.motor} /></TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          <div className="flex items-center justify-between p-3 text-xs text-muted-foreground border-t">
            <span>Showing 8 of 342 schemes</span>
            <div className="flex items-center gap-2">
              <button onClick={() => {}} className="rounded-md border px-2 py-1 hover:bg-muted">Prev</button>
              <button className="rounded-md border bg-primary px-2 py-1 text-primary-foreground">1</button>
              <button className="rounded-md border px-2 py-1 hover:bg-muted">2</button>
              <button className="rounded-md border px-2 py-1 hover:bg-muted">3</button>
              <button className="rounded-md border px-2 py-1 hover:bg-muted">Next</button>
            </div>
          </div>
        </Card>
      </div>
    </DashboardShell>
  );
}
