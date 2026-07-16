export const taxCalculator = {
  id: "tax-calculator",
  name: "Rwanda PAYE Tax Calculator",
  slug: "tax-calculator",
  category: "Calculator",
  description: "Calculate your Rwanda PAYE (Pay As You Earn) income tax using current RRA tax brackets. Includes RSSB deductions, withholding tax, and annual tax projections.",
  icon: "ReceiptIcon",
  inputs: [
    { id: "monthly-gross", label: "Monthly Gross Salary (RWF)", type: "number", placeholder: "e.g., 1000000", required: true, min: 0, step: 10000 },
    { id: "monthly-allowances", label: "Taxable Allowances (RWF/month)", type: "number", placeholder: "e.g., 200000", required: false, min: 0, step: 10000 },
    { id: "rssb-rate", label: "RSSB Employee Contribution (%)", type: "number", placeholder: "3", required: true, min: 0, max: 100, step: 0.5 },
    { id: "tax-year", label: "Tax Year", type: "select", required: true, options: [
      { value: "2025-2026", label: "2025/2026" },
      { value: "2026-2027", label: "2026/2027" },
    ]},
    { id: "filing-status", label: "Filing Status", type: "select", required: true, options: [
      { value: "single", label: "Single" },
      { value: "married", label: "Married (joint filing)" },
    ]},
  ],
  outputs: [
    { id: "gross-monthly", label: "Gross Monthly Income", type: "number", format: "RWF currency" },
    { id: "rssb-deduction", label: "RSSB Monthly Deduction", type: "number", format: "RWF currency" },
    { id: "taxable-income-monthly", label: "Monthly Taxable Income", type: "number", format: "RWF currency" },
    { id: "paye-monthly", label: "Monthly PAYE Tax", type: "number", format: "RWF currency" },
    { id: "net-monthly", label: "Monthly Net Income", type: "number", format: "RWF currency" },
    { id: "annual-gross", label: "Annual Gross Income", type: "number", format: "RWF currency" },
    { id: "annual-paye", label: "Annual PAYE Tax", type: "number", format: "RWF currency" },
    { id: "annual-rssb", label: "Annual RSSB Contributions", type: "number", format: "RWF currency" },
    { id: "effective-tax-rate", label: "Effective Tax Rate", type: "number", format: "percentage" },
    { id: "tax-breakdown", label: "Tax Breakdown by Bracket", type: "table", format: "table" },
    { id: "take-home-percentage", label: "Take-Home Percentage", type: "number", format: "percentage" },
  ],
  taxBrackets: [
    { bracket: 1, min: 0, max: 300000, rate: 0, baseTax: 0, description: "0 - 300,000 RWF at 0%" },
    { bracket: 2, min: 300001, max: 1000000, rate: 20, baseTax: 0, description: "300,001 - 1,000,000 RWF at 20%" },
    { bracket: 3, min: 1000001, max: Infinity, rate: 30, baseTax: 140000, description: "Above 1,000,000 RWF at 30%" },
  ],
  rssbDetails: {
    employeeRate: 3,
    employerRate: 5,
    ceiling: 0,
    description: "RSSB contribution is 3% of gross salary from employee, 5% from employer. No ceiling on contributions for PAYE purposes.",
  },
  taxYearDates: {
    "2025-2026": { start: "2025-07-01", end: "2026-06-30", note: "Current tax year" },
    "2026-2027": { start: "2026-07-01", end: "2027-06-30", note: "Next tax year" },
  },
  logicDescription: "Taxable income = gross monthly income minus RSSB employee contribution (3%). PAYE tax is calculated progressively per RRA brackets: 0% on first 300,000 RWF, 20% on income between 300,001 and 1,000,000 RWF, and 30% on income above 1,000,000 RWF. Net income = gross income minus PAYE tax minus RSSB contribution. Annual figures are monthly figures multiplied by 12.",
  tips: [
    "RSSB contributions are deducted before tax calculation, reducing your taxable income",
    "The effective tax rate is your total tax divided by gross income - it is lower than your marginal rate",
    "Housing and transport allowances are fully taxable as part of gross income",
    "If you have multiple employers, each should deduct PAYE separately - you may need to file a consolidated return",
    "RRA requires annual tax returns for certain taxpayers - check if you need to file",
    "Employer RSSB contribution (5%) is separate and does not affect your take-home pay",
    "Tax brackets are reviewed periodically by RRA - check for updates each tax year",
  ],
  relatedTools: ["salary-calculator", "salary-comparison", "cost-of-living-calculator"],
  metaTitle: "Rwanda PAYE Tax Calculator | RRA Income Tax Calculator 2025/2026 | Imyanya.rw",
  metaDescription: "Calculate your Rwanda PAYE income tax using current RRA tax brackets. Free tax calculator with RSSB deductions, effective tax rate, and annual projections.",
};

export default taxCalculator;
