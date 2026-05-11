import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const map = {
  online: { label: "Online", cls: "bg-success/15 text-success border-success/30" },
  offline: { label: "Offline", cls: "bg-destructive/15 text-destructive border-destructive/30" },
  on: { label: "ON", cls: "bg-success/15 text-success border-success/30" },
  off: { label: "OFF", cls: "bg-muted text-muted-foreground border-border" },
  idle: { label: "Not in use", cls: "bg-warning/15 text-warning border-warning/40" },
  warning: { label: "Warning", cls: "bg-warning/15 text-warning border-warning/40" },
  critical: { label: "Critical", cls: "bg-destructive/15 text-destructive border-destructive/30" },
  normal: { label: "Normal", cls: "bg-success/15 text-success border-success/30" },
} as const;

export function StatusBadge({ status }: { status: keyof typeof map }) {
  const s = map[status];
  return (
    <Badge variant="outline" className={cn("gap-1.5 font-medium", s.cls)}>
      <span className="relative flex h-1.5 w-1.5">
        <span className="absolute inline-flex h-full w-full rounded-full bg-current opacity-50 animate-ping" />
        <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-current" />
      </span>
      {s.label}
    </Badge>
  );
}
