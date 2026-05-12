import { ReactNode } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Search } from "lucide-react";
import { DashboardShell } from "@/components/dashboard-shell";
import { toast } from "sonner";

export function AdminListLayout({
  title,
  description,
  addLabel,
  onAdd,
  children,
}: {
  title: string;
  description: string;
  addLabel: string;
  onAdd?: () => void;
  children: ReactNode;
}) {
  return (
    <DashboardShell>
      <div className="space-y-4">
        <Card className="p-5 border-border/60 bg-gradient-to-br from-card to-muted/30">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <h2 className="text-lg font-semibold tracking-tight">{title}</h2>
              <p className="text-sm text-muted-foreground">{description}</p>
            </div>
            <Button
              className="bg-gradient-primary"
              onClick={() => (onAdd ? onAdd() : toast.success(`${addLabel} form opened`))}
            >
              <Plus className="h-4 w-4 mr-1" />{addLabel}
            </Button>
          </div>
        </Card>

        <Card className="border-border/60">
          <div className="flex items-center gap-3 p-4 border-b">
            <div className="relative ml-auto w-64">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input placeholder="Search…" className="pl-9 h-9" />
            </div>
          </div>
          {children}
        </Card>
      </div>
    </DashboardShell>
  );
}

