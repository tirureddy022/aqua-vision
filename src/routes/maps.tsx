import { createFileRoute } from "@tanstack/react-router";
import { DashboardShell } from "@/components/dashboard-shell";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, Maximize2 } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/maps")({
  head: () => ({
    meta: [
      { title: "Map — AquaMonitor" },
      { name: "description", content: "Geo view of every device across the water monitoring network." },
    ],
  }),
  component: MapsPage,
});

const filters = [
  { key: "all", label: "All", color: "bg-primary" },
  { key: "online", label: "Online", color: "bg-success" },
  { key: "offline", label: "Offline", color: "bg-destructive" },
  { key: "idle", label: "Not in use", color: "bg-warning" },
  { key: "power-on", label: "Power ON", color: "bg-success" },
  { key: "power-off", label: "Power OFF", color: "bg-warning" },
  { key: "motor-on", label: "Motor ON", color: "bg-info" },
  { key: "motor-off", label: "Motor OFF", color: "bg-muted-foreground" },
] as const;

const markers = Array.from({ length: 28 }, (_, i) => ({
  id: i,
  x: 10 + (i * 37) % 80,
  y: 10 + (i * 53) % 75,
  state: ["Karnataka","Maharashtra","Gujarat"][i % 3],
  district: ["Dharwad","Pune","Surat"][i % 3],
  status: ["online","offline","idle","power-on","motor-on"][i % 5] as any,
}));

function MapsPage() {
  const [active, setActive] = useState<string>("all");

  const colorFor = (s: string) =>
    s === "offline" ? "bg-destructive" :
    s === "idle" || s === "power-off" ? "bg-warning" :
    s === "motor-on" ? "bg-info" :
    "bg-success";

  return (
    <DashboardShell>
      <div className="space-y-4">
        <Card className="p-3 border-border/60 flex flex-wrap items-center gap-2">
          <div className="relative flex-1 min-w-[180px]">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input placeholder="Search location, device, scheme…" className="pl-9 h-9" />
          </div>
          {filters.map((f) => (
            <Button
              key={f.key}
              variant={active === f.key ? "default" : "outline"}
              size="sm"
              onClick={() => setActive(f.key)}
              className={cn("gap-2", active === f.key && "bg-gradient-primary text-primary-foreground")}
            >
              <span className={cn("h-1.5 w-1.5 rounded-full", f.color)} />
              {f.label}
            </Button>
          ))}
          <Button variant="outline" size="icon"><Maximize2 className="h-4 w-4" /></Button>
        </Card>

        <Card className="relative overflow-hidden border-border/60 h-[560px]">
          {/* Stylised map */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,color-mix(in_oklab,var(--primary)_18%,transparent),transparent_45%),radial-gradient(circle_at_70%_60%,color-mix(in_oklab,var(--accent)_18%,transparent),transparent_50%)]" />
          <svg className="absolute inset-0 h-full w-full opacity-30" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="0.5" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>

          {markers
            .filter((m) => active === "all" || m.status === active || (active === "online" && m.status !== "offline"))
            .map((m) => (
              <div
                key={m.id}
                className="absolute -translate-x-1/2 -translate-y-1/2 group"
                style={{ left: `${m.x}%`, top: `${m.y}%` }}
              >
                <span className={cn("relative flex h-3 w-3", )}>
                  <span className={cn("absolute inline-flex h-full w-full animate-ping rounded-full opacity-60", colorFor(m.status))} />
                  <span className={cn("relative inline-flex h-3 w-3 rounded-full ring-2 ring-background", colorFor(m.status))} />
                </span>
                <div className="absolute left-4 top-0 opacity-0 group-hover:opacity-100 transition rounded-lg border bg-popover px-2 py-1 text-[11px] shadow-card whitespace-nowrap">
                  Device #{m.id} • {m.district}, {m.state}
                </div>
              </div>
            ))}

          <div className="absolute bottom-4 left-4 rounded-xl border bg-card/80 backdrop-blur p-3 text-xs space-y-1.5 shadow-soft">
            <p className="font-semibold mb-1">Legend</p>
            {[
              { c: "bg-success", l: "Online" },
              { c: "bg-destructive", l: "Offline" },
              { c: "bg-warning", l: "Power OFF / Idle" },
              { c: "bg-info", l: "Motor ON" },
            ].map((x) => (
              <div key={x.l} className="flex items-center gap-2">
                <span className={cn("h-2 w-2 rounded-full", x.c)} /> {x.l}
              </div>
            ))}
          </div>

          <Badge className="absolute top-4 right-4 bg-card text-foreground border">
            {markers.length} devices shown
          </Badge>
        </Card>
      </div>
    </DashboardShell>
  );
}
