export const leaveEntitlementCalculator = {
  id: "leave-entitlement-calculator",
  name: "Leave Entitlement Calculator",
  slug: "leave-entitlement-calculator",
  category: "Calculator",
  description: "Calculate your statutory and contractual leave entitlements under Rwanda Labour Law, including annual leave, sick leave, maternity/paternity leave, and public holidays.",
  icon: "BeachAccessIcon",
  inputs: [
    { id: "employment-duration-months", label: "Months Worked", type: "number", placeholder: "e.g., 12", required: true, min: 1, max: 600, step: 1 },
    { id: "work-days-per-week", label: "Working Days Per Week", type: "select", required: true, options: [
      { value: 5, label: "5 days (Mon-Fri)" },
      { value: 6, label: "6 days (Mon-Sat)" },
    ]},
    { id: "contract-type", label: "Contract Type", type: "select", required: true, options: [
      { value: "permanent", label: "Permanent / Indefinite" },
      { value: "fixed-term", label: "Fixed-Term Contract" },
      { value: "probation", label: "Probation Period" },
    ]},
    { id: "accumulated-leave", label: "Accumulated Unused Leave Days", type: "number", placeholder: "e.g., 5", required: false, min: 0, step: 0.5 },
    { id: "is-female", label: "Gender (for maternity/paternity)", type: "radio", required: true, options: [
      { value: "female", label: "Female" },
      { value: "male", label: "Male" },
    ]},
  ],
  outputs: [
    { id: "annual-leave-days", label: "Annual Leave Entitlement", type: "number", format: "days" },
    { id: "accrued-leave", label: "Accrued Leave to Date", type: "number", format: "days" },
    { id: "sick-leave-days", label: "Sick Leave Entitlement", type: "number", format: "days per year" },
    { id: "maternity-leave", label: "Maternity Leave", type: "number", format: "weeks" },
    { id: "paternity-leave", label: "Paternity Leave", type: "number", format: "days" },
    { id: "public-holidays", label: "Rwanda Public Holidays", type: "number", format: "days per year" },
    { id: "total-leave-entitlement", label: "Total Leave Days (Annual)", type: "number", format: "days" },
    { id: "leave-payout-value", label: "Unused Leave Payout Value", type: "number", format: "RWF currency" },
    { id: "monthly-salary", label: "Monthly Salary for Payout Calc", type: "number", placeholder: "e.g., 500000", required: false },
  ],
  legalReferences: {
    annualLeave: { days: 21, article: "Article 56", description: "Minimum 21 working days per year of service" },
    sickLeave: { days: 30, article: "Article 61", description: "30 days with full pay; extended 30 days at half pay" },
    maternityLeave: { weeks: 12, article: "Article 62", description: "12 consecutive weeks (6 before, 6 after delivery)" },
    paternityLeave: { days: 4, article: "Article 62", description: "4 working days within 15 days of childbirth" },
    publicHolidays: { days: 11, article: "Law on Public Holidays", description: "11 official public holidays in Rwanda" },
    leaveAccrual: { rate: 1.75, unit: "days per month", description: "Annual leave accrues at 1.75 days per month worked" },
  },
  logicDescription: "Annual leave accrues at 1.75 working days per month (21 days / 12 months). Unused leave is paid out at termination. Sick leave: 30 days full pay, then 30 days half pay. Maternity: 12 consecutive weeks. Paternity: 4 working days. Public holidays: 11 days per year as gazetted by the Government of Rwanda.",
  tips: [
    "Annual leave must be taken within 6 months of accrual under Rwanda Labour Law",
    "Unused leave can be carried forward if agreed with employer in writing",
    "Sick leave requires a medical certificate for absences over 2 consecutive days",
    "Maternity leave can start up to 6 weeks before the expected delivery date",
    "Paternity leave must be taken within 15 days of the child's birth",
    "Employers may offer more generous leave than the statutory minimum",
  ],
  relatedTools: ["leave-calculator", "notice-period-calculator", "salary-calculator"],
  metaTitle: "Leave Entitlement Calculator Rwanda | Labour Law Leave Days | Imyanya.rw",
  metaDescription: "Calculate your statutory leave entitlements under Rwanda Labour Law: annual leave, sick leave, maternity/paternity leave, and public holidays.",
};

export default leaveEntitlementCalculator;
