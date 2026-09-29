# AI Loan Eligibility Checker

## Goal
Build the complete educational fintech application described in the uploaded brief, using the existing React project and a dark glassmorphism visual system with restrained motion.

## Pages and navigation
- Create a responsive shared header, mobile menu, educational notice, and footer.
- Add dedicated pages for Home, Loan Eligibility, Credit Analyzer, EMI Calculator, and AI Financial Tips.
- Ensure every navigation link and call-to-action leads to a working page.

## Working tools
- **Loan Eligibility:** validated inputs, transparent demo scoring, FOIR and EMI calculations, result classification, progress display, reasons, suggestions, reset, and non-blocking record-save status.
- **Credit Analyzer:** validate scores from 300–900 and return category, risk, explanation, and practical improvement guidance.
- **EMI Calculator:** calculate monthly EMI, total interest, and total repayment using the standard reducing-balance formula, plus a visual principal/interest breakdown.
- **AI Financial Tips:** accept questions and return clearly labeled educational guidance from a safe local fallback; show a configuration status instead of pretending the fallback is live AI.

## Visual direction
- Deep charcoal fintech canvas, translucent graphite surfaces, cyan/teal primary accents, amber highlights, and high-contrast typography.
- Use semantic design tokens throughout, compact rounded cards, line icons, animated progress/results, subtle entrance motion, and reduced-motion support.
- Adapt layouts and controls across desktop, tablet, and mobile without horizontal overflow.

## Technical details
- Use TanStack Router route files and React/TypeScript while preserving the requested HTML/CSS/JavaScript frontend behavior.
- Keep financial logic in reusable typed utilities and prevent invalid, negative, NaN, or extreme values from reaching results.
- Store only recent demo analyses in browser storage; Google Sheets remains an optional, non-blocking integration status because no secure credentials are configured.
- Add complete route metadata and update README with setup, calculations, limitations, optional integration guidance, deployment, and conclusion.
- Validate the main flows in the running preview at desktop and mobile sizes, and confirm there are no build or console errors.
