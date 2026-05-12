import { createFileRoute } from "@tanstack/react-router";
import { AdminListLayout } from "@/components/admin-list-layout";
import { StatusBadge } from "@/components/status-badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Pencil, Trash2 } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/admin/district")({
  head: () => ({ meta: [{ title: "District management — AquaMonitor" }] }),
  component: DistrictPage,
});

const rows = [
  { d: "Dharwad", s: "Karnataka", dev: 48, t: 14, status: "online" as const },
  { d: "Belgaum", s: "Karnataka", dev: 62, t: 18, status: "online" as const },
  { d: "Pune", s: "Maharashtra", dev: 95, t: 24, status: "online" as const },
  { d: "Surat", s: "Gujarat", dev: 70, t: 16, status: "offline" as const },
];

function DistrictPage() {
  return (
    <AdminListLayout title="District management" description="Map districts to states and manage staff." addLabel="Add district">
      <div className="overflow-x-auto">
        <Table>
          <TableHeader className="bg-muted/40">
            <TableRow>
              <TableHead>District</TableHead>
              <TableHead>State</TableHead>
              <TableHead>Devices</TableHead>
              <TableHead>Technicians</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {rows.map((r) => (
              <TableRow key={r.d} className="hover:bg-muted/40">
                <TableCell className="font-medium">{r.d}</TableCell>
                <TableCell className="text-muted-foreground">{r.s}</TableCell>
                <TableCell>{r.dev}</TableCell>
                <TableCell>{r.t}</TableCell>
                <TableCell><StatusBadge status={r.status} /></TableCell>
                <TableCell className="text-right space-x-1">
                  <Button variant="ghost" size="icon" onClick={() => toast(`Edit ${r.d}`)}><Pencil className="h-4 w-4" /></Button>
                  <Button variant="ghost" size="icon" onClick={() => toast.error(`${r.d} removed`)}><Trash2 className="h-4 w-4 text-destructive" /></Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </AdminListLayout>
  );
}
