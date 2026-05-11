import { createFileRoute } from "@tanstack/react-router";
import { DashboardShell } from "@/components/dashboard-shell";
import { StatCard } from "@/components/stat-card";
import { StatusBadge } from "@/components/status-badge";
import { Card } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { AlertTriangle, AlertOctagon, ShieldCheck, BellRing } from "lucide-react";

export const Route = createFileRoute("/alerts")({
  head: () => ({
    meta: [
      { title: "Alerts — AquaMonitor" },
      { name: "description", content: "Real-time alerts across the water schemes monitoring network." },
    ],
  }),
  component: AlertsPage,
});

const alerts = [
  { device: "Pump A-204", state: "Karnataka", district: "Dharwad", type: "Power loss", time: "2 min ago", severity: "critical" as const },
  { device: "Motor M-71", state: "Maharashtra", district: "Pune", type: "Overheat", time: "14 min ago", severity: "warning" as const },
  { device: "Pump B-019", state: "Gujarat", district: "Surat", type: "Low pressure", time: "32 min ago", severity: "warning" as const },
  { device: "Motor M-12", state: "Rajasthan", district: "Jaipur", type: "Communication lost", time: "1 h ago", severity: "critical" as const },
  { device: "Sensor S-91", state: "Karnataka", district: "Belgaum", type: "Calibration drift", time: "2 h ago", severity: "normal" as const },
];

function AlertsPage() {
  return (
    <DashboardShell>
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <StatCard label="Critical" value={6} icon={AlertOctagon} tone="destructive" />
          <StatCard label="Warning" value={14} icon={AlertTriangle} tone="warning" />
          <StatCard label="Normal" value={208} icon={ShieldCheck} tone="success" />
        </div>

        <Card className="border-border/60">
          <div className="p-4 border-b flex items-center gap-2">
            <BellRing className="h-4 w-4 text-primary" />
            <h3 className="text-sm font-semibold">Recent alerts</h3>
            <span className="ml-2 text-xs text-muted-foreground">live • last 24 h</span>
          </div>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader className="bg-muted/40">
                <TableRow>
                  <TableHead>Device</TableHead>
                  <TableHead>State</TableHead>
                  <TableHead>District</TableHead>
                  <TableHead>Alert</TableHead>
                  <TableHead>Time</TableHead>
                  <TableHead>Severity</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {alerts.map((a) => (
                  <TableRow key={a.device} className="hover:bg-muted/40">
                    <TableCell className="font-medium">{a.device}</TableCell>
                    <TableCell className="text-muted-foreground">{a.state}</TableCell>
                    <TableCell className="text-muted-foreground">{a.district}</TableCell>
                    <TableCell>{a.type}</TableCell>
                    <TableCell className="text-muted-foreground">{a.time}</TableCell>
                    <TableCell><StatusBadge status={a.severity} /></TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </Card>
      </div>
    </DashboardShell>
  );
}
