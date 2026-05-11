import { createFileRoute } from "@tanstack/react-router";
import { DashboardShell } from "@/components/dashboard-shell";
import { StatCard } from "@/components/stat-card";
import { StatusBadge } from "@/components/status-badge";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Users, UserCheck, UserMinus, Wrench, Shield, Briefcase, MoreHorizontal, Plus, Search } from "lucide-react";

export const Route = createFileRoute("/users")({
  head: () => ({
    meta: [
      { title: "Users — AquaMonitor" },
      { name: "description", content: "User and role management for AquaMonitor." },
    ],
  }),
  component: UsersPage,
});

const users = [
  { name: "Rohit Joshi", email: "rohit@gov.in", phone: "+91 98…1188", role: "Officer", desg: "District Officer", state: "Karnataka", district: "Dharwad", status: "online" as const, last: "2 min ago" },
  { name: "Anita Verma", email: "anita@gov.in", phone: "+91 99…4422", role: "Technician", desg: "Field Tech", state: "Maharashtra", district: "Pune", status: "offline" as const, last: "3 h ago" },
  { name: "Suresh V.", email: "suresh@gov.in", phone: "+91 90…7711", role: "Operator", desg: "Pump Operator", state: "Gujarat", district: "Surat", status: "online" as const, last: "12 min ago" },
  { name: "Priya N.", email: "priya@gov.in", phone: "+91 91…9090", role: "Admin", desg: "State Admin", state: "Karnataka", district: "Belgaum", status: "online" as const, last: "just now" },
];

function UsersPage() {
  return (
    <DashboardShell>
      <div className="space-y-6">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          <StatCard label="Total Users" value={482} icon={Users} tone="primary" />
          <StatCard label="Active" value={418} icon={UserCheck} tone="success" />
          <StatCard label="Inactive" value={64} icon={UserMinus} tone="warning" />
          <StatCard label="Technicians" value={148} icon={Wrench} tone="accent" />
          <StatCard label="Admins" value={22} icon={Shield} tone="info" />
          <StatCard label="Officers" value={94} icon={Briefcase} tone="primary" />
        </div>

        <Card className="border-border/60">
          <div className="flex flex-wrap items-center gap-3 p-4 border-b">
            <h3 className="text-sm font-semibold">All users</h3>
            <div className="relative ml-auto w-64">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input placeholder="Search users…" className="pl-9 h-9" />
            </div>
            <Button className="bg-gradient-primary"><Plus className="h-4 w-4 mr-1" />Add user</Button>
          </div>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader className="bg-muted/40">
                <TableRow>
                  <TableHead>User</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Designation</TableHead>
                  <TableHead>District</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Last login</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {users.map((u) => (
                  <TableRow key={u.email} className="hover:bg-muted/40">
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar className="h-8 w-8 ring-2 ring-primary/20">
                          <AvatarFallback className="bg-gradient-primary text-primary-foreground text-xs">
                            {u.name.split(" ").map(p => p[0]).join("").slice(0,2)}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium leading-tight">{u.name}</p>
                          <p className="text-xs text-muted-foreground">{u.phone}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="text-muted-foreground">{u.email}</TableCell>
                    <TableCell>{u.role}</TableCell>
                    <TableCell className="text-muted-foreground">{u.desg}</TableCell>
                    <TableCell className="text-muted-foreground">{u.district}</TableCell>
                    <TableCell><StatusBadge status={u.status} /></TableCell>
                    <TableCell className="text-xs text-muted-foreground">{u.last}</TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon"><MoreHorizontal className="h-4 w-4" /></Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>View profile</DropdownMenuItem>
                          <DropdownMenuItem>Edit user</DropdownMenuItem>
                          <DropdownMenuItem>Reset password</DropdownMenuItem>
                          <DropdownMenuItem>Assign role</DropdownMenuItem>
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
