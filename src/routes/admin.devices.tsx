import { createFileRoute } from "@tanstack/react-router";
import { AdminListLayout } from "@/components/admin-list-layout";
import { StatusBadge } from "@/components/status-badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Pencil, Trash2, MapPin } from "lucide-react";

export const Route = createFileRoute("/admin/devices")({
  head: () => ({ meta: [{ title: "Device registration — AquaMonitor" }] }),
  component: DeviceRegistration,
});

const rows = Array.from({ length: 8 }, (_, i) => ({
  id: `AQ-${1100 + i}`,
  name: `Pump Controller #${i + 1}`,
  scheme: ["Hubli Urban", "Pune Cantonment", "Surat Coastal"][i % 3],
  state: ["Karnataka", "Maharashtra", "Gujarat"][i % 3],
  district: ["Dharwad", "Pune", "Surat"][i % 3],
  reg: i % 2 === 0 ? "online" as const : "idle" as const,
}));

function DeviceRegistration() {
  return (
    <AdminListLayout title="Device registration" description="Register and validate new IoT devices." addLabel="Register device">
      <div className="overflow-x-auto">
        <Table>
          <TableHeader className="bg-muted/40">
            <TableRow>
              <TableHead>Device ID</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Scheme</TableHead>
              <TableHead>District</TableHead>
              <TableHead>Location</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {rows.map((r) => (
              <TableRow key={r.id} className="hover:bg-muted/40">
                <TableCell className="font-mono text-xs">{r.id}</TableCell>
                <TableCell className="font-medium">{r.name}</TableCell>
                <TableCell className="text-muted-foreground">{r.scheme}</TableCell>
                <TableCell className="text-muted-foreground">{r.district}, {r.state}</TableCell>
                <TableCell className="text-xs text-muted-foreground flex items-center gap-1"><MapPin className="h-3 w-3" />15.3°N • 75.1°E</TableCell>
                <TableCell><StatusBadge status={r.reg} /></TableCell>
                <TableCell className="text-right space-x-1">
                  <Button variant="ghost" size="icon"><Pencil className="h-4 w-4" /></Button>
                  <Button variant="ghost" size="icon"><Trash2 className="h-4 w-4 text-destructive" /></Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </AdminListLayout>
  );
}
