import { createFileRoute } from "@tanstack/react-router";
import { DashboardShell } from "@/components/dashboard-shell";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { FileText, FileSpreadsheet, Printer, TrendingUp, TrendingDown } from "lucide-react";
import { ResponsiveContainer, LineChart, Line, AreaChart, Area, Tooltip, XAxis, YAxis } from "recharts";

export const Route = createFileRoute("/reports")({
  head: () => ({
    meta: [
      { title: "Reports — AquaMonitor" },
      { name: "description", content: "Summary, water monitoring and power utilization reports." },
    ],
  }),
  component: ReportsPage,
});

const trend = Array.from({ length: 14 }, (_, i) => ({
  d: `D${i + 1}`,
  curr: 60 + Math.round(Math.sin(i) * 10 + i),
  prev: 55 + Math.round(Math.cos(i) * 8 + i * 0.5),
}));

function ReportsPage() {
  return (
    <DashboardShell>
      <Tabs defaultValue="summary" className="space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <TabsList>
            <TabsTrigger value="summary">Summary</TabsTrigger>
            <TabsTrigger value="water">Water monitoring</TabsTrigger>
            <TabsTrigger value="power">Power utilization</TabsTrigger>
          </TabsList>
          <div className="flex gap-2">
            <Button variant="outline" size="sm"><FileText className="h-4 w-4 mr-1" />PDF</Button>
            <Button variant="outline" size="sm"><FileSpreadsheet className="h-4 w-4 mr-1" />Excel</Button>
            <Button variant="outline" size="sm"><Printer className="h-4 w-4 mr-1" />Print</Button>
          </div>
        </div>

        <Card className="p-4 grid grid-cols-1 sm:grid-cols-4 gap-3 border-border/60">
          <div className="space-y-1.5"><Label className="text-xs">State</Label>
            <Select><SelectTrigger><SelectValue placeholder="All states" /></SelectTrigger>
              <SelectContent><SelectItem value="ka">Karnataka</SelectItem></SelectContent>
            </Select>
          </div>
          <div className="space-y-1.5"><Label className="text-xs">District</Label>
            <Select><SelectTrigger><SelectValue placeholder="All districts" /></SelectTrigger>
              <SelectContent><SelectItem value="d">Dharwad</SelectItem></SelectContent>
            </Select>
          </div>
          <div className="space-y-1.5"><Label className="text-xs">From</Label><Input type="date" /></div>
          <div className="space-y-1.5"><Label className="text-xs">To</Label><Input type="date" /></div>
        </Card>

        <TabsContent value="summary">
          <Card className="border-border/60">
            <Table>
              <TableHeader className="bg-muted/40">
                <TableRow>
                  <TableHead>Scheme</TableHead>
                  <TableHead>Motor ON</TableHead>
                  <TableHead>Motor OFF</TableHead>
                  <TableHead>Power ON</TableHead>
                  <TableHead>Power OFF</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {[1,2,3,4,5,6].map(i => (
                  <TableRow key={i} className="hover:bg-muted/40">
                    <TableCell className="font-medium">Scheme #{1000+i}</TableCell>
                    <TableCell>{420 + i * 12}</TableCell>
                    <TableCell>{120 - i * 4}</TableCell>
                    <TableCell>{460 + i * 8}</TableCell>
                    <TableCell>{80 + i * 2}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Card>
        </TabsContent>

        <TabsContent value="water">
          <Card className="border-border/60 p-5 space-y-4">
            {[1,2].map((i) => (
              <details key={i} className="rounded-xl border bg-muted/20 p-4 group" open={i===1}>
                <summary className="cursor-pointer text-sm font-medium flex items-center justify-between">
                  <span>Hubli Urban Supply — {new Date().toLocaleDateString()}</span>
                  <span className="text-xs text-muted-foreground">Total 88.2 kL</span>
                </summary>
                <div className="mt-4 grid md:grid-cols-3 gap-3">
                  {["Shift 1","Shift 2","Shift 3"].map((s, idx) => (
                    <div key={s} className="rounded-lg border bg-card p-3 text-sm">
                      <p className="font-medium">{s}</p>
                      <p className="text-xs text-muted-foreground mt-1">Power 06:00 → 13:5{idx} • {410 + idx*8} min</p>
                      <p className="text-xs text-muted-foreground">Motor 06:10 → 13:4{idx} • {365 + idx*6} min</p>
                      <p className="mt-2 text-base font-semibold">{(28.4 + idx).toFixed(1)} kL</p>
                    </div>
                  ))}
                </div>
              </details>
            ))}
          </Card>
        </TabsContent>

        <TabsContent value="power">
          <div className="grid lg:grid-cols-2 gap-4">
            <Card className="p-5 border-border/60">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-sm font-semibold">Today vs yesterday — volume (kL)</h3>
                <span className="flex items-center gap-1 text-success text-xs"><TrendingUp className="h-3 w-3" />+8.4%</span>
              </div>
              <div className="h-56">
                <ResponsiveContainer>
                  <AreaChart data={trend}>
                    <defs>
                      <linearGradient id="cur" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="var(--primary)" stopOpacity={0.5} />
                        <stop offset="100%" stopColor="var(--primary)" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <XAxis dataKey="d" tick={{ fontSize: 10 }} stroke="var(--muted-foreground)" />
                    <YAxis tick={{ fontSize: 10 }} stroke="var(--muted-foreground)" />
                    <Tooltip contentStyle={{ background: "var(--popover)", border: "1px solid var(--border)", borderRadius: 12, fontSize: 12 }} />
                    <Area dataKey="curr" stroke="var(--primary)" fill="url(#cur)" strokeWidth={2} />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </Card>
            <Card className="p-5 border-border/60">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-sm font-semibold">Power vs motor runtime (min)</h3>
                <span className="flex items-center gap-1 text-destructive text-xs"><TrendingDown className="h-3 w-3" />-2.1%</span>
              </div>
              <div className="h-56">
                <ResponsiveContainer>
                  <LineChart data={trend}>
                    <XAxis dataKey="d" tick={{ fontSize: 10 }} stroke="var(--muted-foreground)" />
                    <YAxis tick={{ fontSize: 10 }} stroke="var(--muted-foreground)" />
                    <Tooltip contentStyle={{ background: "var(--popover)", border: "1px solid var(--border)", borderRadius: 12, fontSize: 12 }} />
                    <Line dataKey="curr" stroke="var(--primary)" strokeWidth={2} dot={false} />
                    <Line dataKey="prev" stroke="var(--accent)" strokeWidth={2} dot={false} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </DashboardShell>
  );
}
