export const salaryCalculator = {
  id: "salary-calculator",
  name: "Salary Calculator",
  slug: "salary-calculator",
  category: "Calculator",
  description: "Calculate your take-home pay after Rwanda PAYE (Pay As You Earn) tax, RSSB contributions, and other statutory deductions based on RRA rates.",
  icon: "CalculateIcon",
  inputs: [
    { id: "gross-salary", label: "Monthly Gross Salary (RWF)", type: "number", placeholder: "e.g., 1000000", required: true, min: 1, step: 10000 },
    { id: "allowances", label: "Total Monthly Allowances (RWF)", type: "number", placeholder: "e.g., 200000", required: false, min: 0, step: 10000 },
    { id: "pay-frequency", label: "Pay Frequency", type: "select", required: true, options: [
      { value: "monthly", label: "Monthly" },
      { value: "biweekly", label: "Bi-Weekly" },
      { value: "weekly", label: "Weekly" },
    ]},
    { id: "rssb-employee", label: "RSSB Employee Contribution (%)", type: "number", placeholder: "3", required: true, min: 0, max: 100, step: 0.5 },
    { id: "other-deductions", label: "Other Deductions (RWF)", type: "number", placeholder: "e.g., 50000", required: false, min: 0, step: 1000 },
  ],
  outputs: [
    { id: "gross-pay", label: "Gross Pay", type: "number", format: "RWF currency" },
    { id: "taxable-income", label: "Taxable Income", type: "number", format: "RWF currency" },
    { id: "paye-tax", label: "PAYE Tax Deducted", type: "number", format: "RWF currency" },
    { id: "rssb-deduction", label: "RSSB Contribution", type: "number", format: "RWF currency" },
    { id: "total-deductions", label: "Total Deductions", type: "number", format: "RWF currency" },
    { id: "net-pay", label: "Net Take-Home Pay", type: "number", format: "RWF currency" },
    { id: "effective-tax-rate", label: "Effective Tax Rate", type: "number", format: "percentage" },
    { id: "annual-net", label: "Annual Net Pay", type: "number", format: "RWF currency" },
    { id: "deduction-breakdown", label: "Deduction Breakdown", type: "table", format: "table" },
  ],
  rraTaxBrackets: [
    { min: 0, max: 300000, rate: 0, description: "0-300,000 RWF" },
    { min: 300001, max: 1000000, rate: 20, description: "300,001 - 1,000,000 RWF" },
    { min: 1000001, max: Infinity, rate: 30, description: "Above 1,000,000 RWF" },
  ],
  rssbRates: { employee: 3, employer: 5, description: "RSSB contributions as percentage of gross salary" },
  logicDescription: "Gross pay is the sum of salary and allowances. Taxable income is gross pay minus RSSB employee contribution (3% of gross). PAYE tax is calculated progressively using RRA brackets: 0% on first 300,000 RWF, 20% on 300,001-1,000,000 RWF, and 30% on amount exceeding 1,000,000 RWF. RSSB employee contribution is 3% of gross. Total deductions = PAYE tax + RSSB contribution + other deductions. Net pay = gross pay - total deductions.",
  tips: [
    "RSSB contributions are tax-deductible, reducing your taxable income",
    "Employers also contribute 5% of your gross salary to RSSB on top of your pay",
    "Housing and transport allowances are fully taxable as part of gross income",
    "Annual bonus is taxed separately at the applicable marginal rate",
    "Keep track of your RSSB contributions for pension and social security benefits",
  ],
  relatedTools: ["tax-calculator", "salary-comparison", "cost-of-living-calculator"],
  metaTitle: "Rwanda Salary Calculator | Take-Home Pay After Tax | Imyanya.rw",
  metaDescription: "Calculate your Rwanda take-home pay after PAYE tax and RSSB deductions. Free salary calculator using current RRA tax brackets and rates.",
};

export default salaryCalculator;
