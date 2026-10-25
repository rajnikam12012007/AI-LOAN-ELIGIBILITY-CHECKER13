# AI Loan Eligibility Checker

An educational BFSI/fintech capstone that helps users explore loan readiness, credit score ranges, EMI costs, and general financial guidance. It is not a bank, lender, credit bureau, or financial adviser.

## Objective

Make common borrowing concepts easier to understand through transparent demo rules, standard financial formulas, clear result explanations, and practical next steps.

## Features

- **Loan Eligibility Checker:** validates age, income, employment, existing EMI, score, amount, tenure, and loan type; estimates EMI, FOIR, interest, repayment, risk, and an educational eligibility score.
- **Credit Score Analyzer:** explains scores from 300–900 using Poor, Fair, Good, Very Good, and Excellent categories.
- **EMI Calculator:** uses the standard reducing-balance EMI formula and visualizes principal versus total interest.
- **Financial Tips:** provides clearly labeled, curated educational guidance when no live AI service is configured.
- Responsive navigation, mobile menu, form errors, loading states, reset actions, animated results, and reduced-motion support.

## Technology

- React 19 and TypeScript
- TanStack Start and TanStack Router
- Tailwind CSS 4
- Lucide icons
- HTML5 form controls and browser storage

## Project structure

```text
src/
  components/        Shared application shell and controls
  lib/finance.ts     EMI, credit, and eligibility demo logic
  routes/            Home and four dedicated tool pages
  styles.css         Semantic design tokens and global styles
```

## Run locally

```sh
bun install
bun run dev
```

Open `http://localhost:8080`.

## Build for production

```sh
bun run build
```

Deploy the generated application to any platform compatible with TanStack Start. Do not commit `.env` files or private credentials.

## Calculation notes

EMI uses:

```text
EMI = P × r × (1+r)^n ÷ ((1+r)^n − 1)
```

`P` is principal, `r` is the monthly interest rate, and `n` is the number of monthly payments. FOIR is `(existing EMI + estimated new EMI) ÷ monthly income × 100`.

Eligibility uses an intentionally transparent educational score based on credit range, FOIR, requested amount relative to income, employment type, age, and tenure. Demo annual rates are 12.5% personal, 9.5% education, 8.5% home, and 10.25% vehicle. These are illustrative assumptions, not current lender rates or policies.

## Optional AI integration

The current Financial Tips page uses curated fallback guidance and labels it as a demo response. To add Claude later:

1. Store `ANTHROPIC_API_KEY` only as a private deployment secret.
2. Create a server-side function that validates the question and calls Anthropic.
3. Instruct the model to provide general educational guidance only, with no approval guarantees or personalized investment instructions.
4. Keep the current fallback for missing credentials, timeouts, and API failures.
5. Never send the key to browser code.

## Optional Google Sheets integration

The eligibility page can save up to five demo records in the user's browser. Cloud sheet sync is deliberately shown as unconfigured.

To add Sheets later, use a secure server-side endpoint with service-account credentials stored as private deployment secrets. Send only the minimum fields: timestamp, loan type, income, existing EMI, score, amount, tenure, estimated EMI, result, and risk. Never place service-account JSON in frontend code. A sync failure must remain non-blocking.

## Testing checklist

- Navigate through every desktop and mobile menu link.
- Submit valid and invalid values in all three calculators.
- Confirm reset controls restore defaults.
- Verify the eligibility result, EMI formula, chart, and credit categories.
- Ask a financial question and verify loading, fallback guidance, and disclaimer.
- Test desktop, tablet, and mobile widths for overflow and readable controls.

## Limitations and future work

This project does not retrieve bureau data, make lending decisions, quote live rates, or provide personalized advice. Future versions could add authenticated accounts, secure record storage, live AI through a protected server function, approved credit-bureau connectivity, more loan products, and institution-specific models.

## Conclusion

The project demonstrates a complete educational finance workflow: users can explore affordability, interpret credit health, plan repayments, and receive safe general guidance. Its main benefit is transparency; its results remain estimates and should never replace a lender's assessment or professional advice.

## Educational disclaimer

All outputs are educational estimates. They are not bank approvals, loan offers, credit reports, or financial advice.

## Project Documentation

Click below to view the complete project documentation.

[View Project Documentation] https://drive.google.com/file/d/1ga0TXQKVZFHzBAXY7G25_z--tiYbNtaY/view?usp=sharing
