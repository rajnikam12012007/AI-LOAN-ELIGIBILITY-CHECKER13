import { createFileRoute } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { AlertCircle, CheckCircle2, RotateCcw, ShieldCheck, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { EducationNotice, PageIntro } from "@/components/AppShell";
import { assessLoan, formatCurrency, LOAN_RATES, type LoanInput, type LoanType } from "@/lib/finance";

export const Route = createFileRoute("/loan")({ head: () => ({ meta: [
  { title: "Loan Eligibility Checker — Educational Estimate" }, { name: "description", content: "Estimate loan readiness using income, debt burden, credit score and transparent demo rules." },
  { property: "og:title", content: "Educational Loan Eligibility Checker" }, { property: "og:description", content: "Explore an estimated eligibility score, EMI, FOIR and improvement suggestions." }, { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" },
] }), component: LoanPage });

const defaults: LoanInput = { age: 30, income: 75000, employment: "salaried", existingEmi: 8000, creditScore: 735, amount: 1200000, months: 60, loanType: "personal" };

function LoanPage() {
  const [form, setForm] = useState(defaults); const [result, setResult] = useState<ReturnType<typeof assessLoan> | null>(null); const [error, setError] = useState(""); const [saved, setSaved] = useState(false);
  const update = (key: keyof LoanInput, value: string | number) => { setForm((old) => ({...old, [key]: value})); setResult(null); setSaved(false); };
  const validate = () => {
    if (form.age < 18 || form.age > 70) return "Age must be between 18 and 70.";
    if (form.income < 10000 || form.income > 10000000) return "Monthly income must be between ₹10,000 and ₹1 crore.";
    if (form.existingEmi < 0 || form.existingEmi > form.income * 2) return "Existing EMI must be zero or a realistic positive amount.";
    if (form.creditScore < 300 || form.creditScore > 900) return "Credit score must be between 300 and 900.";
    if (form.amount < 10000 || form.amount > 100000000) return "Loan amount must be between ₹10,000 and ₹10 crore.";
    if (form.months < 6 || form.months > 360) return "Tenure must be between 6 and 360 months.";
    return "";
  };
  const submit = (e: FormEvent) => { e.preventDefault(); const message = validate(); setError(message); if (!message) { setResult(assessLoan(form)); setTimeout(() => document.getElementById("loan-result")?.scrollIntoView({ behavior: "smooth", block: "center" }), 20); } };
  const save = () => { if (!result) return; const record = { timestamp: new Date().toISOString(), loanType: form.loanType, monthlyIncome: form.income, existingEMI: form.existingEmi, creditScore: form.creditScore, loanAmount: form.amount, tenure: form.months, estimatedEMI: Math.round(result.emi), eligibilityResult: result.status, riskCategory: result.risk }; try { const existing = JSON.parse(localStorage.getItem("loan-demo-records") || "[]") as unknown[]; localStorage.setItem("loan-demo-records", JSON.stringify([record, ...existing].slice(0, 5))); setSaved(true); } catch { setSaved(false); } };
  return <main className="section-pad px-4 sm:px-6 lg:px-8"><div className="mx-auto max-w-7xl"><PageIntro eyebrow="Loan readiness" title="Check the numbers behind your application." description="Use the form to create an educational estimate based on affordability, debt burden and credit health."/><div className="mt-12 grid items-start gap-6 lg:grid-cols-[1fr_.9fr]">
    <form onSubmit={submit} className="glass-card rounded-lg p-5 sm:p-8"><div className="grid gap-5 sm:grid-cols-2">
      <Field label="Age"><input className="field" type="number" min="18" max="70" value={form.age} onChange={(e)=>update("age",Number(e.target.value))}/></Field>
      <Field label="Monthly income (₹)"><input className="field" type="number" min="10000" max="10000000" value={form.income} onChange={(e)=>update("income",Number(e.target.value))}/></Field>
      <Field label="Employment type"><select className="field" value={form.employment} onChange={(e)=>update("employment",e.target.value)}><option value="salaried">Salaried</option><option value="self-employed">Self-employed</option><option value="professional">Professional</option></select></Field>
      <Field label="Existing monthly EMI (₹)"><input className="field" type="number" min="0" value={form.existingEmi} onChange={(e)=>update("existingEmi",Number(e.target.value))}/></Field>
      <Field label="Credit score"><input className="field" type="number" min="300" max="900" value={form.creditScore} onChange={(e)=>update("creditScore",Number(e.target.value))}/></Field>
      <Field label="Requested amount (₹)"><input className="field" type="number" min="10000" max="100000000" value={form.amount} onChange={(e)=>update("amount",Number(e.target.value))}/></Field>
      <Field label="Loan tenure (months)"><input className="field" type="number" min="6" max="360" value={form.months} onChange={(e)=>update("months",Number(e.target.value))}/></Field>
      <Field label="Loan type"><select className="field" value={form.loanType} onChange={(e)=>update("loanType",e.target.value as LoanType)}>{Object.entries(LOAN_RATES).map(([key,value])=><option key={key} value={key}>{value.label} · {value.rate}% demo rate</option>)}</select></Field>
    </div>{error && <p className="mt-5 flex items-center gap-2 rounded-md bg-destructive/10 p-3 text-sm text-destructive"><AlertCircle className="size-4"/>{error}</p>}<div className="mt-7 flex flex-wrap gap-3"><Button type="submit" className="flex-1">Check eligibility <TrendingUp className="size-4"/></Button><Button variant="secondary" onClick={() => {setForm(defaults);setResult(null);setError("");setSaved(false)}}><RotateCcw className="size-4"/> Reset</Button></div></form>
    <section id="loan-result" className="glass-card rounded-lg p-5 sm:p-8" aria-live="polite">{result ? <div className="animate-fade-in"><div className="flex items-start justify-between gap-4"><div><p className="font-mono text-xs text-primary">ESTIMATED RESULT</p><h2 className="mt-2 font-display text-3xl font-bold">{result.status}</h2><p className="mt-1 text-sm text-muted-foreground">{result.risk} risk · {result.credit.category} credit range</p></div><div className="text-right"><strong className="font-display text-4xl text-primary">{result.score}%</strong><span className="block text-xs text-muted-foreground">eligibility score</span></div></div><div className="mt-6 h-2 overflow-hidden rounded-full bg-secondary"><div className="h-full rounded-full bg-primary transition-all duration-700" style={{width:`${result.score}%`}}/></div><div className="mt-7 grid grid-cols-2 gap-3">{[["Estimated EMI",formatCurrency(result.emi)],["FOIR",`${result.foir.toFixed(1)}%`],["Est. interest",formatCurrency(result.interest)],["Total repayment",formatCurrency(result.total)]].map(([label,value])=><div key={label} className="rounded-md bg-secondary p-3"><span className="text-xs text-muted-foreground">{label}</span><strong className="mt-1 block text-sm">{value}</strong></div>)}</div><ResultList title="Factors in this result" items={result.reasons}/><ResultList title="Ways to improve" items={result.suggestions}/><Button variant="secondary" className="mt-6 w-full" onClick={save}><ShieldCheck className="size-4"/>{saved ? "Saved in this browser" : "Save demo result"}</Button><p className="mt-3 text-center text-xs text-muted-foreground">Cloud sheet sync is not configured; saving locally does not block your result.</p></div> : <div className="flex min-h-[480px] flex-col items-center justify-center text-center"><span className="grid size-16 place-items-center rounded-full bg-primary/10 text-primary"><TrendingUp/></span><h2 className="mt-5 font-display text-xl font-bold">Your estimate will appear here</h2><p className="mt-2 max-w-sm text-sm leading-6 text-muted-foreground">Complete every field and check eligibility to see the score, repayment estimate, reasons and suggestions.</p></div>}</section>
  </div><div className="mt-6"><EducationNotice/></div></div></main>;
}

function Field({label,children}:{label:string;children:React.ReactNode}) { return <label className="block"><span className="mb-2 block text-sm font-semibold">{label}</span>{children}</label>; }
function ResultList({title,items}:{title:string;items:string[]}) { return <div className="mt-6"><h3 className="text-sm font-semibold">{title}</h3><ul className="mt-3 space-y-2">{items.map((item)=><li key={item} className="flex gap-2 text-xs leading-5 text-muted-foreground"><CheckCircle2 className="mt-0.5 size-4 shrink-0 text-success"/>{item}</li>)}</ul></div>; }