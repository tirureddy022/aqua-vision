import { createFileRoute } from "@tanstack/react-router";
import { AdminListLayout } from "@/components/admin-list-layout";
import { StatusBadge } from "@/components/status-badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Pencil, Trash2 } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/admin/technician")({
  head: () => ({ meta: [{ title: "Technician management — AquaMonitor" }] }),
  component: TechAdmin,
});

const rows = [
  { name: "Anita Verma", phone: "+91 99…4422", district: "Pune", dev: 14, status: "online" as const },
  { name: "Karan Mehta", phone: "+91 91…8723", district: "Surat", dev: 9, status: "offline" as const },
  { name: "Pooja Rao", phone: "+91 98…1908", district: "Dharwad", dev: 12, status: "online" as const },
  { name: "Sahil Khan", phone: "+91 90…6611", district: "Belgaum", dev: 7, status: "idle" as const },
];

function TechAdmin() {
  return (
    <AdminListLayout title="Technician management" description="Assign technicians to districts and devices." addLabel="Add technician">
      <div className="overflow-x-auto">
        <Table>
          <TableHeader className="bg-muted/40">
            <TableRow>
              <TableHead>Technician</TableHead>
              <TableHead>District</TableHead>
              <TableHead>Devices</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {rows.map((r) => (
              <TableRow key={r.name} className="hover:bg-muted/40">
                <TableCell>
                  <div className="flex items-center gap-3">
                    <Avatar className="h-8 w-8 ring-2 ring-accent/30">
                      <AvatarFallback className="bg-gradient-primary text-primary-foreground text-xs">
                        {r.name.split(" ").map(p => p[0]).join("").slice(0,2)}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium leading-tight">{r.name}</p>
                      <p className="text-xs text-muted-foreground">{r.phone}</p>
                    </div>
                  </div>
                </TableCell>
                <TableCell className="text-muted-foreground">{r.district}</TableCell>
                <TableCell>{r.dev}</TableCell>
                <TableCell><StatusBadge status={r.status} /></TableCell>
                <TableCell className="text-right space-x-1">
                  <Button variant="ghost" size="icon" onClick={() => toast(`Edit ${r.name}`)}><Pencil className="h-4 w-4" /></Button>
                  <Button variant="ghost" size="icon" onClick={() => toast.error(`${r.name} removed`)}><Trash2 className="h-4 w-4 text-destructive" /></Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </AdminListLayout>
  );
}
