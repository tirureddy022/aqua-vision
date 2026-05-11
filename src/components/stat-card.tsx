import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import type { LucideIcon } from "lucide-react";

interface StatCardProps {
  label: string;
  value: number;
  icon: LucideIcon;
  tone?: "primary" | "accent" | "success" | "warning" | "destructive" | "info";
  delta?: string;
  suffix?: string;
}

const toneStyles: Record<NonNullable<StatCardProps["tone"]>, string> = {
  primary: "from-primary/15 to-primary/0 text-primary",
  accent: "from-accent/20 to-accent/0 text-accent",
  success: "from-success/20 to-success/0 text-success",
  warning: "from-warning/20 to-warning/0 text-warning",
  destructive: "from-destructive/15 to-destructive/0 text-destructive",
  info: "from-info/20 to-info/0 text-info",
};

function useCounter(target: number, duration = 900) {
  const [v, setV] = useState(0);
  useEffect(() => {
    const start = performance.now();
    let raf = 0;
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / duration);
      const eased = 1 - Math.pow(1 - p, 3);
      setV(Math.round(target * eased));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, duration]);
  return v;
}

export function StatCard({ label, value, icon: Icon, tone = "primary", delta, suffix }: StatCardProps) {
  const n = useCounter(value);
  return (
    <Card className="group relative overflow-hidden border-border/60 p-5 hover-lift">
      <div
        className={cn(
          "pointer-events-none absolute inset-0 bg-gradient-to-br opacity-60",
          toneStyles[tone],
        )}
      />
      <div className="relative flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
            {label}
          </p>
          <p className="mt-2 text-3xl font-semibold tabular-nums tracking-tight">
            {n.toLocaleString()}
            {suffix && <span className="ml-1 text-base font-normal text-muted-foreground">{suffix}</span>}
          </p>
          {delta && (
            <p className="mt-1 text-xs text-muted-foreground">
              <span className="text-success font-medium">{delta}</span> vs yesterday
            </p>
          )}
        </div>
        <div
          className={cn(
            "flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-card shadow-soft ring-1 ring-border/60 group-hover:scale-110 transition-transform",
            toneStyles[tone].split(" ").pop(),
          )}
        >
          <Icon className="h-5 w-5" />
        </div>
      </div>
    </Card>
  );
}
