export const LOAN_RATES = {
  personal: { label: "Personal Loan", rate: 12.5 },
  education: { label: "Education Loan", rate: 9.5 },
  home: { label: "Home Loan", rate: 8.5 },
  vehicle: { label: "Vehicle Loan", rate: 10.25 },
} as const;

export type LoanType = keyof typeof LOAN_RATES;

export function calculateEmi(principal: number, annualRate: number, months: number) {
  if (!Number.isFinite(principal) || !Number.isFinite(annualRate) || !Number.isFinite(months) || principal <= 0 || annualRate < 0 || months <= 0) return 0;
  if (annualRate === 0) return principal / months;
  const monthlyRate = annualRate / 1200;
  const factor = (1 + monthlyRate) ** months;
  return (principal * monthlyRate * factor) / (factor - 1);
}

export function formatCurrency(value: number) {
  return new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(value);
}

export function analyzeCredit(score: number) {
  if (score < 580) return { category: "Poor", risk: "High risk", tone: "danger", explanation: "This range may make borrowing harder or more expensive.", tips: ["Pay every bill by its due date", "Reduce card balances below 30% of limits", "Review your credit report for errors"] };
  if (score < 670) return { category: "Fair", risk: "Moderate–high risk", tone: "warning", explanation: "Some lenders may consider this range, but terms can be less favorable.", tips: ["Build a longer record of on-time payments", "Avoid several credit applications together", "Lower revolving credit balances"] };
  if (score < 740) return { category: "Good", risk: "Moderate risk", tone: "info", explanation: "This range generally reflects responsible credit management.", tips: ["Keep utilization low", "Maintain older accounts responsibly", "Check your report periodically"] };
  if (score < 800) return { category: "Very Good", risk: "Low risk", tone: "success", explanation: "This range often supports access to competitive borrowing terms.", tips: ["Continue paying on time", "Use credit sparingly", "Avoid unnecessary new accounts"] };
  return { category: "Excellent", risk: "Very low risk", tone: "success", explanation: "This range indicates a strong history of managing credit obligations.", tips: ["Protect your payment record", "Monitor for identity fraud", "Borrow only when it supports your goals"] };
}

export type LoanInput = {
  age: number;
  income: number;
  employment: string;
  existingEmi: number;
  creditScore: number;
  amount: number;
  months: number;
  loanType: LoanType;
};

export function assessLoan(input: LoanInput) {
  const rate = LOAN_RATES[input.loanType].rate;
  const emi = calculateEmi(input.amount, rate, input.months);
  const total = emi * input.months;
  const foir = ((input.existingEmi + emi) / input.income) * 100;
  let score = 100;
  const reasons: string[] = [];
  const suggestions: string[] = [];

  if (input.creditScore < 580) { score -= 38; reasons.push("Credit score is in the high-risk range."); suggestions.push("Build a consistent on-time payment history before applying."); }
  else if (input.creditScore < 670) { score -= 22; reasons.push("Credit score is below the generally preferred range."); suggestions.push("Lower credit utilization and review your credit report."); }
  else if (input.creditScore < 740) { score -= 9; reasons.push("Credit score is good but has room to strengthen."); }
  else reasons.push("Strong credit score supports the estimate.");

  if (foir > 65) { score -= 40; reasons.push("Combined monthly obligations are above 65% of income."); suggestions.push("Reduce the loan amount or existing monthly obligations."); }
  else if (foir > 50) { score -= 24; reasons.push("Combined monthly obligations exceed 50% of income."); suggestions.push("Choose a longer tenure or smaller requested amount."); }
  else if (foir > 40) { score -= 10; reasons.push("Debt burden is manageable but close to the demo threshold."); }
  else reasons.push("Estimated debt burden is within the demo comfort range.");

  const annualIncome = input.income * 12;
  if (input.amount > annualIncome * 8 && input.loanType !== "home") { score -= 20; reasons.push("Requested amount is high relative to annual income."); suggestions.push("Consider a smaller amount or a co-applicant."); }
  if (input.employment === "self-employed") { score -= 4; reasons.push("Income stability may require additional documentation."); }
  if (input.age > 58 && input.months > 84) { score -= 10; reasons.push("The selected tenure extends well beyond typical working years."); suggestions.push("Consider a shorter tenure if affordable."); }

  score = Math.max(5, Math.min(96, Math.round(score)));
  const status = score >= 75 ? "Eligible" : score >= 50 ? "Possibly Eligible" : "Not Eligible";
  const risk = score >= 75 ? "Low" : score >= 50 ? "Moderate" : "High";
  if (!suggestions.length) suggestions.push("Maintain on-time payments and avoid new debt before applying.");
  return { rate, emi, total, interest: total - input.amount, foir, score, status, risk, reasons, suggestions, credit: analyzeCredit(input.creditScore) };
}