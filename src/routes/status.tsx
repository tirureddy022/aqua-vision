import { createFileRoute } from "@tanstack/react-router";
import { DashboardShell } from "@/components/dashboard-shell";
import { StatCard } from "@/components/stat-card";
import { StatusBadge } from "@/components/status-badge";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogDescription,
} from "@/components/ui/dialog";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Cpu, Power, PowerOff, Zap, ZapOff, MoreHorizontal, Filter, RefreshCw, Search, Droplet, Clock, Gauge } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export const Route = createFileRoute("/status")({
  head: () => ({
    meta: [
      { title: "Status Dashboard — AquaMonitor" },
      { name: "description", content: "Operational status of devices, motors and power across schemes." },
    ],
  }),
  component: StatusPage,
});

const mockRows = [
  { scheme: "Hubli Urban Supply", state: "Karnataka", district: "Dharwad", power: "on", motor: "on" },
  { scheme: "Belgaum Phase II", state: "Karnataka", district: "Belgaum", power: "on", motor: "off" },
  { scheme: "Mysore North Network", state: "Karnataka", district: "Mysore", power: "off", motor: "off" },
  { scheme: "Pune Cantonment", state: "Maharashtra", district: "Pune", power: "on", motor: "on" },
  { scheme: "Nashik Trunk Main", state: "Maharashtra", district: "Nashik", power: "on", motor: "on" },
  { scheme: "Indore Sector 4", state: "Madhya Pradesh", district: "Indore", power: "off", motor: "off" },
] as const;

function StatusPage() {
  const today = new Date().toLocaleDateString();
  const [filter, setFilter] = useState<"all" | "on" | "off">("all");
  const filtered = mockRows.filter((r) =>
    filter === "all" ? true : filter === "on" ? r.power === "on" : r.power === "off"
  );

  return (
    <DashboardShell>
      <div className="space-y-6">
        {/* Filters */}
        <Card className="p-4 md:p-5 border-border/60">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 items-end">
            <div className="space-y-1.5">
              <Label className="text-xs">State</Label>
              <Select><SelectTrigger><SelectValue placeholder="All states" /></SelectTrigger>
                <SelectContent>{["Karnataka","Maharashtra","Gujarat","Rajasthan"].map(s=>(
                  <SelectItem key={s} value={s}>{s}</SelectItem>))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1.5">
              <Label className="text-xs">District</Label>
              <Select><SelectTrigger><SelectValue placeholder="All districts" /></SelectTrigger>
                <SelectContent>{["Dharwad","Belgaum","Pune"].map(s=>(
                  <SelectItem key={s} value={s}>{s}</SelectItem>))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1.5">
              <Label className="text-xs">Status</Label>
              <Select><SelectTrigger><SelectValue placeholder="All" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="online">Online</SelectItem>
                  <SelectItem value="offline">Offline</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1.5">
              <Label className="text-xs">Current date</Label>
              <Input readOnly value={today} />
            </div>
            <div className="flex gap-2">
              <Button className="bg-gradient-primary flex-1" onClick={() => toast.success("Data fetched", { description: "Latest scheme telemetry loaded." })}><Filter className="h-4 w-4 mr-1" />Get data</Button>
              <Button variant="outline" size="icon" onClick={() => toast("Refreshing…")}><RefreshCw className="h-4 w-4" /></Button>
            </div>
          </div>
        </Card>

        {/* Filter cards */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          <button onClick={() => setFilter("all")}><StatCard label="Total Devices" value={1248} icon={Cpu} tone="primary" /></button>
          <button onClick={() => setFilter("on")}><StatCard label="Power ON" value={1132} icon={Power} tone="success" /></button>
          <button onClick={() => setFilter("off")}><StatCard label="Power OFF" value={116} icon={PowerOff} tone="destructive" /></button>
          <button onClick={() => setFilter("on")}><StatCard label="Motor ON" value={874} icon={Zap} tone="accent" /></button>
          <button onClick={() => setFilter("off")}><StatCard label="Motor OFF" value={374} icon={ZapOff} tone="warning" /></button>
        </div>

        {/* Table */}
        <Card className="border-border/60">
          <div className="flex items-center justify-between p-4 border-b">
            <h3 className="text-sm font-semibold">Schemes status ({filtered.length})</h3>
            <div className="relative w-64">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input placeholder="Search…" className="pl-9 h-9" />
            </div>
          </div>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader className="bg-muted/40">
                <TableRow>
                  <TableHead>Scheme</TableHead>
                  <TableHead>State</TableHead>
                  <TableHead>District</TableHead>
                  <TableHead>Power</TableHead>
                  <TableHead>Motor</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.map((r) => (
                  <TableRow key={r.scheme} className="hover:bg-muted/40">
                    <TableCell className="font-medium">{r.scheme}</TableCell>
                    <TableCell className="text-muted-foreground">{r.state}</TableCell>
                    <TableCell className="text-muted-foreground">{r.district}</TableCell>
                    <TableCell><StatusBadge status={r.power} /></TableCell>
                    <TableCell><StatusBadge status={r.motor} /></TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon"><MoreHorizontal className="h-4 w-4" /></Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <ViewItem scheme={r.scheme} />
                          <OperatorItem scheme={r.scheme} />
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

function ViewItem({ scheme }: { scheme: string }) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <DropdownMenuItem onSelect={(e) => e.preventDefault()}>View shifts</DropdownMenuItem>
      </DialogTrigger>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>{scheme} — daily shift report</DialogTitle>
          <DialogDescription>Three shift breakdown for {new Date().toLocaleDateString()}.</DialogDescription>
        </DialogHeader>
        <div className="grid md:grid-cols-3 gap-4 mt-2">
          {["Shift 1 (06–14)", "Shift 2 (14–22)", "Shift 3 (22–06)"].map((label, i) => (
            <Card key={label} className="p-4 space-y-3 border-border/60">
              <div className="flex items-center justify-between">
                <p className="text-sm font-semibold">{label}</p>
                <span className="text-[10px] uppercase tracking-wider text-muted-foreground">Shift {i+1}</span>
              </div>
              <div className="space-y-2 text-sm">
                <Row icon={Power} label="Power" value={`06:0${i} → 13:5${i}`} sub={`${410 + i * 12} min`} />
                <Row icon={Zap} label="Motor" value={`06:1${i} → 13:4${i}`} sub={`${365 + i * 10} min`} />
                <Row icon={Droplet} label="Volume" value={`${(28.4 + i).toFixed(1)} kL`} sub="pumped" />
              </div>
            </Card>
          ))}
        </div>
        <div className="rounded-xl bg-muted/40 p-4 mt-2 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Gauge className="h-5 w-5 text-primary" />
            <div>
              <p className="text-xs text-muted-foreground">Total daily volume</p>
              <p className="text-xl font-semibold">88.2 kL</p>
            </div>
          </div>
          <Clock className="h-4 w-4 text-muted-foreground" />
        </div>
      </DialogContent>
    </Dialog>
  );
}

function Row({ icon: Icon, label, value, sub }: any) {
  return (
    <div className="flex items-center justify-between text-sm">
      <span className="flex items-center gap-2 text-muted-foreground"><Icon className="h-3.5 w-3.5" />{label}</span>
      <span className="text-right">
        <span className="font-medium">{value}</span>
        <span className="block text-[11px] text-muted-foreground">{sub}</span>
      </span>
    </div>
  );
}

function OperatorItem({ scheme }: { scheme: string }) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <DropdownMenuItem onSelect={(e) => e.preventDefault()}>Operator details</DropdownMenuItem>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Operator on duty</DialogTitle>
          <DialogDescription>{scheme}</DialogDescription>
        </DialogHeader>
        <div className="flex items-center gap-4 p-3 rounded-xl bg-muted/40">
          <div className="h-14 w-14 rounded-full bg-gradient-primary flex items-center justify-center text-primary-foreground font-semibold">
            SV
          </div>
          <div className="flex-1">
            <p className="font-semibold">Suresh Vernekar</p>
            <p className="text-xs text-muted-foreground">Device #A-204 • Dharwad</p>
          </div>
          <StatusBadge status="online" />
        </div>
        <div className="grid grid-cols-2 gap-3 text-sm">
          <div className="rounded-lg border p-3">
            <p className="text-xs text-muted-foreground">Phone</p>
            <p className="font-medium">+91 98 4500 1188</p>
          </div>
          <div className="rounded-lg border p-3">
            <p className="text-xs text-muted-foreground">Shift</p>
            <p className="font-medium">Shift 2 • 14:00 – 22:00</p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
