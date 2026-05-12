import { createFileRoute } from "@tanstack/react-router";
import { DashboardShell } from "@/components/dashboard-shell";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, Maximize2, RefreshCw } from "lucide-react";
import { useEffect, useMemo, useState, lazy, Suspense } from "react";
import { cn } from "@/lib/utils";
import { useTheme } from "@/lib/theme";
import { toast } from "sonner";

const LeafletMap = lazy(() => import("@/components/leaflet-map"));

export const Route = createFileRoute("/maps")({
  head: () => ({
    meta: [
      { title: "Map — AquaMonitor" },
      { name: "description", content: "Geo view of every device across the water monitoring network." },
    ],
  }),
  component: MapsPage,
});

type Status =
  | "online"
  | "offline"
  | "idle"
  | "power-on"
  | "power-off"
  | "motor-on"
  | "motor-off";

// Seeded device list across India
const baseDevices = Array.from({ length: 60 }, (_, i) => {
  const cities = [
    { city: "Dharwad", state: "Karnataka", lat: 15.4589, lng: 75.0078 },
    { city: "Belgaum", state: "Karnataka", lat: 15.8497, lng: 74.4977 },
    { city: "Pune", state: "Maharashtra", lat: 18.5204, lng: 73.8567 },
    { city: "Nashik", state: "Maharashtra", lat: 19.9975, lng: 73.7898 },
    { city: "Surat", state: "Gujarat", lat: 21.1702, lng: 72.8311 },
    { city: "Ahmedabad", state: "Gujarat", lat: 23.0225, lng: 72.5714 },
    { city: "Jaipur", state: "Rajasthan", lat: 26.9124, lng: 75.7873 },
    { city: "Jodhpur", state: "Rajasthan", lat: 26.2389, lng: 73.0243 },
    { city: "Indore", state: "Madhya Pradesh", lat: 22.7196, lng: 75.8577 },
    { city: "Bhopal", state: "Madhya Pradesh", lat: 23.2599, lng: 77.4126 },
    { city: "Lucknow", state: "Uttar Pradesh", lat: 26.8467, lng: 80.9462 },
    { city: "Patna", state: "Bihar", lat: 25.5941, lng: 85.1376 },
  ];
  const c = cities[i % cities.length];
  // Slight jitter
  const j = (n: number) => (((i * 9301 + 49297) % 233280) / 233280 - 0.5) * 0.6 + n;
  const statusPool: Status[] = [
    "online", "online", "online", "online",
    "offline", "idle",
    "power-on", "power-on", "power-off",
    "motor-on", "motor-on", "motor-off",
  ];
  const status = statusPool[i % statusPool.length];
  return {
    id: 1000 + i,
    lat: j(c.lat),
    lng: j(c.lng) + ((i % 5) - 2) * 0.15,
    state: c.state,
    district: c.city,
    status,
  };
});

const palette: Record<Status, string> = {
  "online": "#10b981",
  "offline": "#ef4444",
  "idle": "#f59e0b",
  "power-on": "#10b981",
  "power-off": "#f59e0b",
  "motor-on": "#3b82f6",
  "motor-off": "#94a3b8",
};

function matches(d: typeof baseDevices[number], key: string) {
  if (key === "all") return true;
  if (key === "online") return d.status === "online" || d.status === "power-on" || d.status === "motor-on";
  return d.status === key;
}

function MapsPage() {
  const [active, setActive] = useState<string>("all");
  const [query, setQuery] = useState("");
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const filteredByQuery = useMemo(
    () =>
      baseDevices.filter(
        (d) =>
          !query ||
          d.district.toLowerCase().includes(query.toLowerCase()) ||
          d.state.toLowerCase().includes(query.toLowerCase()) ||
          String(d.id).includes(query),
      ),
    [query],
  );

  const counts = useMemo(() => {
    const c: Record<string, number> = { all: filteredByQuery.length };
    (["online","offline","idle","power-on","power-off","motor-on","motor-off"] as Status[]).forEach((k) => {
      c[k] = filteredByQuery.filter((d) => matches(d, k)).length;
    });
    return c;
  }, [filteredByQuery]);

  const visible = filteredByQuery.filter((d) => matches(d, active));

  const filters: { key: string; label: string; color: string }[] = [
    { key: "all", label: "All", color: "bg-primary" },
    { key: "online", label: "Online", color: "bg-success" },
    { key: "offline", label: "Offline", color: "bg-destructive" },
    { key: "idle", label: "Not in use", color: "bg-warning" },
    { key: "power-on", label: "Power ON", color: "bg-success" },
    { key: "power-off", label: "Power OFF", color: "bg-warning" },
    { key: "motor-on", label: "Motor ON", color: "bg-info" },
    { key: "motor-off", label: "Motor OFF", color: "bg-muted-foreground" },
  ];

  const markers = visible.map((d) => ({
    id: d.id,
    lat: d.lat,
    lng: d.lng,
    label: `Device #${d.id}`,
    sublabel: `${d.district}, ${d.state} • ${d.status}`,
    color: palette[d.status as Status],
  }));

  return (
    <DashboardShell>
      <div className="space-y-4">
        <Card className="p-3 border-border/60 flex flex-wrap items-center gap-2">
          <div className="relative flex-1 min-w-[180px]">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search location, device, scheme…"
              className="pl-9 h-9"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
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
              <Badge
                variant="secondary"
                className={cn(
                  "ml-1 h-5 px-1.5 text-[10px] tabular-nums",
                  active === f.key && "bg-white/20 text-white",
                )}
              >
                {counts[f.key] ?? 0}
              </Badge>
            </Button>
          ))}
          <Button
            variant="outline"
            size="icon"
            onClick={() => toast.success("Map refreshed")}
            aria-label="Refresh"
          >
            <RefreshCw className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={() => {
              const el = document.getElementById("aqua-map");
              if (el?.requestFullscreen) el.requestFullscreen();
            }}
            aria-label="Fullscreen"
          >
            <Maximize2 className="h-4 w-4" />
          </Button>
        </Card>

        <Card id="aqua-map" className="relative overflow-hidden border-border/60 h-[560px]">
          {mounted ? (
            <Suspense fallback={<div className="absolute inset-0 grid place-items-center text-sm text-muted-foreground">Loading map…</div>}>
              <LeafletMap markers={markers} dark={theme === "dark"} />
            </Suspense>
          ) : (
            <div className="absolute inset-0 grid place-items-center text-sm text-muted-foreground">Loading map…</div>
          )}

          <div className="pointer-events-none absolute bottom-4 left-4 z-[500] rounded-xl border bg-card/90 backdrop-blur p-3 text-xs space-y-1.5 shadow-soft">
            <p className="font-semibold mb-1">Legend</p>
            {[
              { c: "bg-success", l: "Online / Power ON" },
              { c: "bg-destructive", l: "Offline" },
              { c: "bg-warning", l: "Power OFF / Idle" },
              { c: "bg-info", l: "Motor ON" },
            ].map((x) => (
              <div key={x.l} className="flex items-center gap-2">
                <span className={cn("h-2 w-2 rounded-full", x.c)} /> {x.l}
              </div>
            ))}
          </div>

          <Badge className="absolute top-4 right-4 z-[500] bg-card text-foreground border">
            {visible.length} devices shown
          </Badge>
        </Card>
      </div>
    </DashboardShell>
  );
}
