import { Link, useRouterState } from "@tanstack/react-router";
import { BrainCircuit, Calculator, ChevronRight, CreditCard, Landmark, Menu, ShieldCheck, X } from "lucide-react";
import { useState, type ReactNode } from "react";
import { buttonStyles } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const links = [
  { to: "/" as const, label: "Home" },
  { to: "/loan" as const, label: "Loan Eligibility" },
  { to: "/credit" as const, label: "Credit Analyzer" },
  { to: "/emi" as const, label: "EMI Calculator" },
  { to: "/tips" as const, label: "AI Financial Tips" },
];

export function AppShell({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const path = useRouterState({ select: (state) => state.location.pathname });
  return (
    <div className="min-h-screen overflow-x-hidden bg-background text-foreground">
      <header className="sticky top-0 z-50 border-b border-border/70 bg-background/85 backdrop-blur-xl">
        <div className="mx-auto flex h-18 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <Link to="/" className="flex items-center gap-3" onClick={() => setOpen(false)}>
            <span className="grid size-10 place-items-center rounded-md bg-primary text-primary-foreground shadow-glow"><Landmark className="size-5" /></span>
            <span className="leading-tight"><strong className="block font-display text-sm">AI Loan Eligibility</strong><span className="text-xs text-muted-foreground">Educational finance lab</span></span>
          </Link>
          <nav className="hidden items-center gap-1 lg:flex" aria-label="Main navigation">
            {links.map((link) => <Link key={link.to} to={link.to} className={cn("rounded-md px-3 py-2 text-sm font-medium transition", path === link.to ? "bg-accent text-foreground" : "text-muted-foreground hover:text-foreground")}>{link.label}</Link>)}
          </nav>
          <Link to="/loan" className={cn(buttonStyles("primary"), "hidden lg:inline-flex")}>Get started <ChevronRight className="size-4" /></Link>
          <button className="grid size-11 place-items-center rounded-md border border-border bg-secondary lg:hidden" onClick={() => setOpen(!open)} aria-label={open ? "Close menu" : "Open menu"} aria-expanded={open}>{open ? <X /> : <Menu />}</button>
        </div>
        {open && <nav className="animate-fade-in border-t border-border bg-background p-4 lg:hidden" aria-label="Mobile navigation">{links.map((link) => <Link key={link.to} to={link.to} onClick={() => setOpen(false)} className={cn("block rounded-md px-4 py-3 text-sm font-medium", path === link.to ? "bg-accent text-foreground" : "text-muted-foreground")}>{link.label}</Link>)}</nav>}
      </header>
      {children}
      <footer className="border-t border-border bg-surface-deep">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 py-10 sm:px-6 md:grid-cols-[1fr_auto] lg:px-8">
          <div><div className="flex items-center gap-2 font-display font-bold"><ShieldCheck className="size-5 text-primary" />AI Loan Eligibility Checker</div><p className="mt-3 max-w-xl text-sm leading-6 text-muted-foreground">A capstone learning project for exploring loan affordability, credit health and repayment planning. It is not a lender or financial adviser.</p></div>
          <div className="flex flex-wrap gap-x-6 gap-y-3 text-sm text-muted-foreground">{links.slice(1).map((link) => <Link key={link.to} to={link.to} className="hover:text-primary">{link.label}</Link>)}</div>
        </div>
        <div className="border-t border-border px-4 py-4 text-center text-xs text-muted-foreground">Educational estimates only — not a bank approval or financial advice.</div>
      </footer>
    </div>
  );
}

export const featureIcons = { loan: Landmark, credit: CreditCard, emi: Calculator, tips: BrainCircuit };

export function PageIntro({ eyebrow, title, description }: { eyebrow: string; title: string; description: string }) {
  return <div className="mx-auto max-w-3xl text-center animate-fade-in"><p className="mb-3 font-mono text-xs font-semibold uppercase text-primary">{eyebrow}</p><h1 className="font-display text-4xl font-bold leading-tight sm:text-5xl">{title}</h1><p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg">{description}</p></div>;
}

export function EducationNotice() {
  return <div className="flex gap-3 rounded-md border border-warning/25 bg-warning/8 p-4 text-sm text-warning-foreground"><ShieldCheck className="mt-0.5 size-5 shrink-0 text-warning" /><p><strong>Educational estimate only.</strong> Results use transparent demo rules and do not represent a bank approval, offer, or financial advice.</p></div>;
}