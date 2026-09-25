import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, BarChart3, BrainCircuit, Calculator, CheckCircle2, CreditCard, Landmark, LockKeyhole, Sparkles } from "lucide-react";
import { buttonStyles } from "@/components/ui/button";
import { EducationNotice } from "@/components/AppShell";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/")({
  head: () => ({ meta: [
    { title: "AI Loan Eligibility Checker — Educational Finance Tools" },
    { name: "description", content: "Explore loan eligibility, credit health, EMI planning and educational financial guidance in one interactive toolkit." },
    { property: "og:title", content: "AI Loan Eligibility Checker" },
    { property: "og:description", content: "Four interactive educational finance tools for smarter borrowing decisions." },
    { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" },
  ] }), component: HomePage,
});

const features = [
  { to: "/loan" as const, icon: Landmark, number: "01", title: "Loan Eligibility", text: "Estimate affordability using income, existing obligations, credit score and requested terms." },
  { to: "/credit" as const, icon: CreditCard, number: "02", title: "Credit Analyzer", text: "Understand a score range, its general risk indication and practical improvement steps." },
  { to: "/emi" as const, icon: Calculator, number: "03", title: "EMI Calculator", text: "Plan repayments with the standard reducing-balance EMI formula and a clear cost breakdown." },
  { to: "/tips" as const, icon: BrainCircuit, number: "04", title: "Financial Tips", text: "Ask a money question and receive structured, educational guidance with safe boundaries." },
];

function HomePage() {
  return <main>
    <section className="relative min-h-[calc(100vh-4.5rem)] px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto grid max-w-7xl items-center gap-14 lg:grid-cols-[1.05fr_.95fr]">
        <div className="animate-fade-in">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/25 bg-primary/8 px-3 py-1.5 font-mono text-xs text-primary"><Sparkles className="size-3.5" />FOUR TOOLS · ONE CLEARER DECISION</div>
          <h1 className="max-w-4xl font-display text-5xl font-extrabold leading-[1.08] sm:text-6xl lg:text-7xl">Understand your loan readiness <span className="text-primary">before you apply.</span></h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-muted-foreground">Explore transparent demo calculations for eligibility, credit health and monthly repayments—built to help you learn, compare and plan.</p>
          <div className="mt-9 flex flex-wrap gap-3"><Link to="/loan" className={buttonStyles("primary")}>Check eligibility <ArrowRight className="size-4" /></Link><Link to="/emi" className={buttonStyles("secondary")}>Calculate EMI</Link></div>
          <div className="mt-9 max-w-2xl"><EducationNotice /></div>
        </div>
        <div className="relative animate-fade-in [animation-delay:120ms]">
          <div className="glass-card rounded-lg p-5 sm:p-7">
            <div className="flex items-center justify-between border-b border-border pb-5"><div><p className="font-mono text-xs text-muted-foreground">DEMO READINESS</p><p className="mt-1 font-display text-xl font-bold">Financial snapshot</p></div><span className="grid size-11 place-items-center rounded-md bg-primary/10 text-primary"><BarChart3 /></span></div>
            <div className="py-8 text-center"><div className="mx-auto grid size-44 place-items-center rounded-full border-[12px] border-primary/15 border-t-primary border-r-primary"><div><strong className="font-display text-5xl">78</strong><span className="text-muted-foreground">/100</span><p className="mt-1 text-xs text-primary">READY TO EXPLORE</p></div></div></div>
            <div className="grid grid-cols-3 gap-2">{[["FOIR","36%"],["Credit","742"],["Est. EMI","₹24.8K"]].map(([label,value]) => <div key={label} className="rounded-md bg-secondary p-3 text-center"><p className="text-xs text-muted-foreground">{label}</p><strong className="mt-1 block text-sm">{value}</strong></div>)}</div>
            <p className="mt-4 text-center text-xs text-muted-foreground">Illustrative data, not a real credit decision.</p>
          </div>
        </div>
      </div>
    </section>
    <section className="section-pad border-y border-border bg-surface-deep/65 px-4 sm:px-6 lg:px-8"><div className="mx-auto max-w-7xl"><p className="font-mono text-xs font-semibold uppercase text-primary">Explore the toolkit</p><div className="mt-4 flex flex-col justify-between gap-4 md:flex-row md:items-end"><h2 className="max-w-2xl font-display text-3xl font-bold sm:text-4xl">Four practical tools.<br/>No confusing fine print.</h2><p className="max-w-md text-sm leading-6 text-muted-foreground">Each result explains the demo logic behind it so you can understand which factors have the greatest impact.</p></div><div className="mt-10 grid gap-4 md:grid-cols-2">{features.map(({to,icon:Icon,number,title,text}) => <Link to={to} key={to} className="group glass-card rounded-lg p-6 transition duration-300 hover:-translate-y-1 hover:border-primary/40"><div className="flex items-start justify-between"><span className="grid size-11 place-items-center rounded-md bg-primary/10 text-primary"><Icon className="size-5" /></span><span className="font-mono text-xs text-muted-foreground">{number}</span></div><h3 className="mt-6 font-display text-xl font-bold">{title}</h3><p className="mt-2 max-w-lg text-sm leading-6 text-muted-foreground">{text}</p><span className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-primary">Open tool <ArrowRight className="size-4 transition group-hover:translate-x-1" /></span></Link>)}</div></div></section>
    <section className="section-pad px-4 sm:px-6 lg:px-8"><div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-2"><div><p className="font-mono text-xs font-semibold uppercase text-primary">How it works</p><h2 className="mt-4 font-display text-3xl font-bold sm:text-4xl">A clearer path from numbers to insight.</h2></div><div className="space-y-7">{[["01","Enter your details","Use realistic sample values. Your calculations stay in this browser."],["02","Review transparent logic","See EMI, debt burden and the exact factors influencing the estimate."],["03","Improve your position","Turn the result into practical next steps before approaching a lender."]].map(([num,title,text]) => <div className="flex gap-5" key={num}><span className="font-mono text-sm text-primary">{num}</span><div><h3 className="font-semibold">{title}</h3><p className="mt-1 text-sm leading-6 text-muted-foreground">{text}</p></div></div>)}</div></div><div className="mx-auto mt-14 grid max-w-7xl gap-4 sm:grid-cols-3">{[[LockKeyhole,"No sensitive data","Tools work locally"],[CheckCircle2,"Transparent","Demo rules explained"],[Sparkles,"Four tools","One learning toolkit"]].map(([Icon,title,text]) => {const I=Icon as typeof LockKeyhole; return <div className="flex items-center gap-4 border-t border-border pt-5" key={String(title)}><I className="size-5 text-primary"/><div><strong className="block text-sm">{String(title)}</strong><span className="text-xs text-muted-foreground">{String(text)}</span></div></div>})}</div></section>
  </main>;
}