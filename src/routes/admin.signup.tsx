import { createFileRoute } from "@tanstack/react-router";
import { AdminListLayout } from "@/components/admin-list-layout";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Check, X, Eye } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

export const Route = createFileRoute("/admin/signup")({
  head: () => ({ meta: [{ title: "Signup requests — AquaMonitor" }] }),
  component: SignupAdmin,
});

const rows = [
  { name: "Rakesh Patil", email: "rakesh@gov.in", phone: "+91 98…0011", role: "Technician", state: "Karnataka", district: "Dharwad", status: "Pending", date: "May 9" },
  { name: "Asha Pawar", email: "asha@gov.in", phone: "+91 99…7733", role: "Officer", state: "Maharashtra", district: "Pune", status: "Pending", date: "May 10" },
  { name: "Vikram Shah", email: "vikram@gov.in", phone: "+91 90…1122", role: "Operator", state: "Gujarat", district: "Surat", status: "Approved", date: "May 8" },
];

function SignupAdmin() {
  return (
    <AdminListLayout title="Signup requests" description="Approve or reject new access requests." addLabel="Invite user">
      <div className="overflow-x-auto">
        <Table>
          <TableHeader className="bg-muted/40">
            <TableRow>
              <TableHead>Applicant</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>District</TableHead>
              <TableHead>Requested</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {rows.map((r) => (
              <TableRow key={r.email} className="hover:bg-muted/40">
                <TableCell>
                  <p className="font-medium">{r.name}</p>
                  <p className="text-xs text-muted-foreground">{r.email} • {r.phone}</p>
                </TableCell>
                <TableCell>{r.role}</TableCell>
                <TableCell className="text-muted-foreground">{r.district}, {r.state}</TableCell>
                <TableCell className="text-muted-foreground">{r.date}</TableCell>
                <TableCell>
                  <Badge variant={r.status === "Approved" ? "default" : "secondary"} className={r.status === "Approved" ? "bg-success text-success-foreground" : ""}>
                    {r.status}
                  </Badge>
                </TableCell>
                <TableCell className="text-right space-x-1">
                  <Button variant="ghost" size="icon" onClick={() => toast(`View ${r.name}'s request`)}><Eye className="h-4 w-4" /></Button>
                  <Button variant="ghost" size="icon" onClick={() => toast.success(`${r.name} approved`)}><Check className="h-4 w-4 text-success" /></Button>
                  <Button variant="ghost" size="icon" onClick={() => toast.error(`${r.name} rejected`)}><X className="h-4 w-4 text-destructive" /></Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </AdminListLayout>
  );
}
