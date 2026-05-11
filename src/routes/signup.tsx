import { createFileRoute, Link } from "@tanstack/react-router";
import { Droplets, User, Mail, Phone, ArrowRight, MapPin, Briefcase } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export const Route = createFileRoute("/signup")({
  head: () => ({
    meta: [
      { title: "Request access — AquaMonitor" },
      { name: "description", content: "Register as an official to access the AquaMonitor console." },
    ],
  }),
  component: SignupPage,
});

function Field({ icon: Icon, ...props }: any) {
  return (
    <div className="space-y-1.5">
      <Label htmlFor={props.id}>{props.label}</Label>
      <div className="relative">
        <Icon className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input className="pl-9 h-11" {...props} />
      </div>
    </div>
  );
}

function SignupPage() {
  return (
    <main className="min-h-screen bg-background grid lg:grid-cols-[1fr_2fr]">
      <aside className="relative hidden lg:flex flex-col justify-between p-10 bg-gradient-hero text-white overflow-hidden">
        <div className="flex items-center gap-3">
          <div className="h-11 w-11 rounded-2xl bg-white/15 flex items-center justify-center backdrop-blur">
            <Droplets className="h-6 w-6" />
          </div>
          <div>
            <p className="font-semibold">AquaMonitor</p>
            <p className="text-[11px] text-white/70">Government Water Schemes</p>
          </div>
        </div>
        <div className="space-y-4 max-w-sm">
          <h1 className="text-3xl font-semibold leading-tight">Join the national water monitoring network.</h1>
          <p className="text-white/80 text-sm">
            Officers, technicians and operators — request access to your district's live console.
          </p>
        </div>
        <p className="text-xs text-white/60">All requests are reviewed by your state administrator.</p>
      </aside>

      <section className="flex items-center justify-center p-6 md:p-10">
        <div className="w-full max-w-2xl">
          <div className="mb-6">
            <h2 className="text-2xl font-semibold tracking-tight">Create your account</h2>
            <p className="text-sm text-muted-foreground mt-1">Fill in your details. An admin will approve your request.</p>
          </div>

          <form
            onSubmit={(e) => { e.preventDefault(); window.location.href = "/login"; }}
            className="rounded-2xl border bg-card p-6 md:p-8 shadow-card space-y-5"
          >
            <div className="grid md:grid-cols-2 gap-4">
              <Field id="name" label="Full name" icon={User} placeholder="Rohit Joshi" required />
              <Field id="email" label="Official email" icon={Mail} type="email" placeholder="name@gov.in" required />
              <Field id="phone" label="Phone" icon={Phone} type="tel" placeholder="+91 98 …" required />
              <Field id="designation" label="Designation" icon={Briefcase} placeholder="District Officer" />
            </div>

            <div className="grid md:grid-cols-3 gap-4">
              <div className="space-y-1.5">
                <Label>Role</Label>
                <Select>
                  <SelectTrigger className="h-11"><SelectValue placeholder="Select role" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="officer">Officer</SelectItem>
                    <SelectItem value="technician">Technician</SelectItem>
                    <SelectItem value="operator">Operator</SelectItem>
                    <SelectItem value="admin">Admin</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-1.5">
                <Label>State</Label>
                <Select>
                  <SelectTrigger className="h-11"><SelectValue placeholder="Select state" /></SelectTrigger>
                  <SelectContent>
                    {["Karnataka","Maharashtra","Gujarat","Rajasthan","Madhya Pradesh"].map(s => (
                      <SelectItem key={s} value={s}>{s}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-1.5">
                <Label>District</Label>
                <Select>
                  <SelectTrigger className="h-11"><SelectValue placeholder="Select district" /></SelectTrigger>
                  <SelectContent>
                    {["Dharwad","Belgaum","Mysore","Pune","Nashik"].map(s => (
                      <SelectItem key={s} value={s}>{s}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="flex items-center justify-between gap-3 pt-2 flex-wrap">
              <p className="text-xs text-muted-foreground flex items-center gap-1.5">
                <MapPin className="h-3.5 w-3.5" />
                Your request will be routed to the State Admin.
              </p>
              <Button type="submit" className="h-11 px-6 bg-gradient-primary group">
                Submit request <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </Button>
            </div>

            <p className="text-center text-sm text-muted-foreground">
              Already have access?{" "}
              <Link to="/login" className="text-primary font-medium hover:underline">Sign in</Link>
            </p>
          </form>
        </div>
      </section>
    </main>
  );
}
