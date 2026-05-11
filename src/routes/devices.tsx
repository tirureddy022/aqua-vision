import { createFileRoute } from "@tanstack/react-router";
import { DashboardShell } from "@/components/dashboard-shell";
import { StatCard } from "@/components/stat-card";
import { StatusBadge } from "@/components/status-badge";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Cpu, Wifi, WifiOff, Power, PowerOff, MoreHorizontal, Plus, Search, CircleDot } from "lucide-react";

export const Route = createFileRoute("/devices")({
  head: () => ({
    meta: [
      { title: "Devices — AquaMonitor" },
      { name: "description", content: "Manage IoT devices across the water network." },
    ],
  }),
  component: DevicesPage,
});

const devices = Array.from({ length: 10 }, (_, i) => ({
  id: `AQ-${1000 + i}`,
  name: `Pump Controller #${i + 1}`,
  scheme: ["Hubli Urban", "Belgaum Phase II", "Pune Cantonment"][i % 3],
  state: ["Karnataka", "Maharashtra", "Gujarat"][i % 3],
  district: ["Dharwad", "Pune", "Surat"][i % 3],
  status: (["online", "offline", "idle"] as const)[i % 3],
  power: (["on", "off"] as const)[i % 2],
  motor: (["on", "off"] as const)[(i + 1) % 2],
  sync: `${i + 1} min ago`,
}));

function DevicesPage() {
  return (
    <DashboardShell>
      <div className="space-y-6">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          <StatCard label="Total" value={1248} icon={Cpu} tone="primary" />
          <StatCard label="Online" value={1190} icon={Wifi} tone="success" />
          <StatCard label="Offline" value={58} icon={WifiOff} tone="destructive" />
          <StatCard label="Not in use" value={24} icon={CircleDot} tone="warning" />
          <StatCard label="Power ON" value={1132} icon={Power} tone="success" />
          <StatCard label="Power OFF" value={116} icon={PowerOff} tone="destructive" />
        </div>

        <Card className="border-border/60">
          <div className="flex flex-wrap items-center gap-3 p-4 border-b">
            <h3 className="text-sm font-semibold">Device inventory</h3>
            <div className="relative ml-auto w-64">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input placeholder="Search devices…" className="pl-9 h-9" />
            </div>
            <Button className="bg-gradient-primary"><Plus className="h-4 w-4 mr-1" />Add device</Button>
          </div>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader className="bg-muted/40">
                <TableRow>
                  <TableHead className="w-10"><Checkbox /></TableHead>
                  <TableHead>Device ID</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Scheme</TableHead>
                  <TableHead>District</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Power</TableHead>
                  <TableHead>Motor</TableHead>
                  <TableHead>Last sync</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {devices.map((d) => (
                  <TableRow key={d.id} className="hover:bg-muted/40">
                    <TableCell><Checkbox /></TableCell>
                    <TableCell className="font-mono text-xs">{d.id}</TableCell>
                    <TableCell className="font-medium">{d.name}</TableCell>
                    <TableCell className="text-muted-foreground">{d.scheme}</TableCell>
                    <TableCell className="text-muted-foreground">{d.district}</TableCell>
                    <TableCell><StatusBadge status={d.status} /></TableCell>
                    <TableCell><StatusBadge status={d.power} /></TableCell>
                    <TableCell><StatusBadge status={d.motor} /></TableCell>
                    <TableCell className="text-xs text-muted-foreground">{d.sync}</TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon"><MoreHorizontal className="h-4 w-4" /></Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>View details</DropdownMenuItem>
                          <DropdownMenuItem>Edit device</DropdownMenuItem>
                          <DropdownMenuItem>Assign technician</DropdownMenuItem>
                          <DropdownMenuItem>Map location</DropdownMenuItem>
                          <DropdownMenuItem>History</DropdownMenuItem>
                          <DropdownMenuItem className="text-destructive">Deactivate</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
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
