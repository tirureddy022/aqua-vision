import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Droplets, Mail, Lock, Eye, EyeOff, ArrowRight, ShieldCheck, Activity, Gauge } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [
      { title: "Sign in — AquaMonitor" },
      { name: "description", content: "Sign in to the AquaMonitor water schemes monitoring console." },
    ],
  }),
  component: LoginPage,
});

function LoginPage() {
  const [show, setShow] = useState(false);
  return (
    <main className="min-h-screen grid lg:grid-cols-2 bg-background">
      {/* Left — animated water hero */}
      <section className="relative hidden lg:flex flex-col justify-between p-10 overflow-hidden bg-gradient-hero text-white">
        <div className="absolute inset-0 opacity-40" style={{
          backgroundImage:
            "radial-gradient(circle at 20% 30%, rgba(255,255,255,.35), transparent 45%), radial-gradient(circle at 80% 70%, rgba(255,255,255,.25), transparent 50%)",
        }} />
        {/* Animated waves */}
        <svg className="absolute bottom-0 left-0 w-[200%] h-64 animate-wave opacity-50" viewBox="0 0 1200 200" preserveAspectRatio="none">
          <path d="M0,100 C300,160 600,40 900,100 C1050,130 1150,80 1200,100 L1200,200 L0,200 Z" fill="rgba(255,255,255,0.15)" />
        </svg>
        <svg className="absolute bottom-0 left-0 w-[200%] h-72 animate-wave opacity-30" style={{ animationDelay: "-2s" }} viewBox="0 0 1200 200" preserveAspectRatio="none">
          <path d="M0,120 C200,80 500,180 800,120 C1000,80 1100,140 1200,110 L1200,200 L0,200 Z" fill="rgba(255,255,255,0.2)" />
        </svg>

        <div className="relative flex items-center gap-3">
          <div className="h-11 w-11 rounded-2xl bg-white/15 backdrop-blur flex items-center justify-center">
            <Droplets className="h-6 w-6" />
          </div>
          <div>
            <p className="text-sm font-semibold tracking-tight">AquaMonitor</p>
            <p className="text-[11px] text-white/70">Government Water Schemes Console</p>
          </div>
        </div>

        <div className="relative space-y-6 max-w-md">
          <h1 className="text-4xl font-semibold leading-tight">
            Real-time visibility for every drop of water.
          </h1>
          <p className="text-white/80">
            Monitor pumps, schemes, motors and alerts across thousands of devices —
            from a single, secure dashboard.
          </p>
          <div className="grid grid-cols-3 gap-3 pt-2">
            {[
              { icon: Activity, label: "Live telemetry" },
              { icon: Gauge, label: "SCADA-grade" },
              { icon: ShieldCheck, label: "Gov compliant" },
            ].map((f) => (
              <div key={f.label} className="rounded-xl bg-white/10 backdrop-blur p-3 border border-white/15">
                <f.icon className="h-4 w-4 mb-2" />
                <p className="text-xs font-medium">{f.label}</p>
              </div>
            ))}
          </div>
        </div>

        <p className="relative text-xs text-white/60">© AquaMonitor 2026 • Secure connection</p>
      </section>

      {/* Right — login form */}
      <section className="flex items-center justify-center p-6 md:p-10">
        <div className="w-full max-w-md">
          <div className="lg:hidden mb-6 flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-gradient-primary flex items-center justify-center">
              <Droplets className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="font-semibold">AquaMonitor</span>
          </div>

          <div className="glass rounded-2xl p-6 md:p-8 shadow-card animate-scale-in">
            <h2 className="text-2xl font-semibold tracking-tight">Welcome back</h2>
            <p className="mt-1 text-sm text-muted-foreground">Sign in to your monitoring console.</p>

            <form
              className="mt-6 space-y-4"
              onSubmit={(e) => {
                e.preventDefault();
                window.location.href = "/";
              }}
            >
              <div className="space-y-1.5">
                <Label htmlFor="email">Email</Label>
                <div className="relative">
                  <Mail className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input id="email" type="email" placeholder="officer@gov.in" className="pl-9 h-11" required />
                </div>
              </div>

              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password">Password</Label>
                  <a href="#" className="text-xs text-primary hover:underline">Forgot password?</a>
                </div>
                <div className="relative">
                  <Lock className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    id="password"
                    type={show ? "text" : "password"}
                    placeholder="••••••••"
                    className="pl-9 pr-10 h-11"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShow((s) => !s)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                    aria-label="Toggle password visibility"
                  >
                    {show ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              <label className="flex items-center gap-2 text-sm text-muted-foreground">
                <Checkbox id="remember" /> <span>Keep me signed in for 30 days</span>
              </label>

              <Button type="submit" className="w-full h-11 bg-gradient-primary hover:opacity-95 shadow-glow group">
                Sign in
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </Button>
            </form>

            <p className="mt-6 text-center text-sm text-muted-foreground">
              New official?{" "}
              <Link to="/signup" className="text-primary font-medium hover:underline">
                Request access
              </Link>
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
