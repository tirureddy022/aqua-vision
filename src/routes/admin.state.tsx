import { createFileRoute } from "@tanstack/react-router";
import { AdminListLayout } from "@/components/admin-list-layout";
import { StatusBadge } from "@/components/status-badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Pencil, Trash2 } from "lucide-react";

export const Route = createFileRoute("/admin/state")({
  head: () => ({ meta: [{ title: "State management — AquaMonitor" }] }),
  component: StatePage,
});

const states = [
  { name: "Karnataka", code: "KA", d: 30, dv: 412, status: "online" as const },
  { name: "Maharashtra", code: "MH", d: 36, dv: 388, status: "online" as const },
  { name: "Gujarat", code: "GJ", d: 33, dv: 220, status: "online" as const },
  { name: "Rajasthan", code: "RJ", d: 33, dv: 128, status: "offline" as const },
  { name: "Madhya Pradesh", code: "MP", d: 52, dv: 100, status: "online" as const },
];

function StatePage() {
  return (
    <AdminListLayout title="State management" description="Add, edit and audit states." addLabel="Add state">
      <div className="overflow-x-auto">
        <Table>
          <TableHeader className="bg-muted/40">
            <TableRow>
              <TableHead>State</TableHead>
              <TableHead>Code</TableHead>
              <TableHead>Districts</TableHead>
              <TableHead>Devices</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {states.map((s) => (
              <TableRow key={s.code} className="hover:bg-muted/40">
                <TableCell className="font-medium">{s.name}</TableCell>
                <TableCell className="font-mono text-xs">{s.code}</TableCell>
                <TableCell>{s.d}</TableCell>
                <TableCell>{s.dv}</TableCell>
                <TableCell><StatusBadge status={s.status} /></TableCell>
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
