export const negotiationScriptGenerator = {
  id: "negotiation-script-generator",
  name: "Salary Negotiation Script Generator",
  slug: "negotiation-script-generator",
  category: "Template",
  description: "Generate personalized salary negotiation scripts and strategies for the Rwandan job market, with talking points for different scenarios and employer types.",
  icon: "ChatIcon",
  inputs: [
    { id: "scenario", label: "Negotiation Scenario", type: "select", required: true, options: [
      { value: "job-offer", label: "Initial Job Offer" },
      { value: "promotion", label: "Promotion / Internal Move" },
      { value: "annual-review", label: "Annual Performance Review" },
      { value: "counter-offer", label: "Counter-Offer from Current Employer" },
      { value: "salary-review", label: "Off-Cycle Salary Review Request" },
    ]},
    { id: "employer-type", label: "Employer Type", type: "select", required: true, options: [
      { value: "corporate", label: "Corporate / Private Sector" },
      { value: "ngo", label: "NGO / International Organization" },
      { value: "government", label: "Government / Public Sector (fixed scale)" },
      { value: "startup", label: "Startup / Small Business" },
      { value: "multinational", label: "Multinational Company" },
    ]},
    { id: "current-offer", label: "Current Offer (RWF/month)", type: "number", placeholder: "e.g., 800000", required: true, min: 0, step: 10000 },
    { id: "target-salary", label: "Target Salary (RWF/month)", type: "number", placeholder: "e.g., 1000000", required: true, min: 0, step: 10000 },
    { id: "experience-years", label: "Years of Experience", type: "number", placeholder: "e.g., 5", required: true, min: 0, step: 1 },
    { id: "have-competing-offer", label: "Do you have a competing offer?", type: "radio", required: true, options: [
      { value: "yes", label: "Yes - I have another offer" },
      { value: "no", label: "No" },
    ]},
    { id: "key-leverage-point", label: "Key Leverage Point", type: "select", required: true, options: [
      { value: "experience", label: "Relevant experience and expertise" },
      { value: "certification", label: "Professional certification" },
      { value: "skills", label: "Rare or in-demand skills" },
      { value: "results", label: "Proven track record of results" },
      { value: "competing", label: "Competing job offer" },
    ]},
  ],
  outputs: [
    { id: "script-email", label: "Email Script", type: "text", format: "email template" },
    { id: "script-verbal", label: "Phone / In-Person Script", type: "text", format: "verbal script" },
    { id: "script-follow-up", label: "Follow-Up Script", type: "text", format: "follow-up" },
    { id: "key-talking-points", label: "Key Talking Points", type: "table", format: "list" },
    { id: "what-to-avoid", label: "What to Avoid Saying", type: "text", format: "list" },
    { id: "salary-range-recommendation", label: "Recommended Salary Range", type: "text", format: "range" },
    { id: "total-package-checklist", label: "Total Package Negotiation Points", type: "table", format: "checklist" },
  ],
  scripts: {
    "job-offer": {
      corporate: {
        emailScript: `Dear [Hiring Manager Name],

Thank you very much for offering me the [Role Title] position at [Company Name]. I am genuinely excited about the opportunity to join your team and contribute to [specific company goal or project].

I have reviewed the offer carefully. While I am enthusiastic about the role, the base salary of [offer amount] RWF is below my expectations based on my [X] years of experience and market research.

Based on my research on Imyanya.rw and discussions with industry peers, the market range for this level of role is [range] RWF. Given my experience in [specific area] and my track record of [key achievement], I am targeting [target amount] RWF.

I would love to find a solution that works for both of us. Could we discuss adjusting the base salary or exploring other components of the total package?

Thank you for your consideration. I look forward to continuing our conversation.

Sincerely,
[Your Name]`,
        verbalScript: "Thank you for the offer. I'm very excited about this opportunity. After reviewing the offer, I wanted to discuss the salary component. Based on my experience and market research, I was hoping for something closer to [target amount]. Is there flexibility in the budget for this role?",
        talkingPoints: [
          "Express genuine enthusiasm for the role and company first",
          "Reference specific skills and experience that justify your target",
          "Cite market data from Imyanya.rw salary guides",
          "Be open to discussing total package not just base salary",
          "Suggest a specific, reasonable number - not a vague range",
        ],
      },
      ngo: {
        emailScript: `Dear [Hiring Manager Name],

Thank you for the offer to join [Organization Name] as [Role Title]. I am very passionate about your mission to [organizational mission] and would be thrilled to contribute.

I have reviewed the offer package. While I am committed to the work, I would like to discuss the salary in light of my [X] years of experience in the development sector and my specific expertise in [relevant area].

Given the market rates for this level of role in Rwanda's development sector, I would like to request consideration of [target amount] RWF. I am also open to discussing other elements of the package such as professional development support or additional leave.

I believe my skills in [specific skills] will bring significant value to your programs, and I am confident we can reach a mutually agreeable arrangement.

Sincerely,
[Your Name]`,
        verbalScript: "Thank you for this offer. I'm very excited about the opportunity to contribute to your mission. I wanted to discuss the salary package. With my experience in [area] and the market rates for this level, I was hoping for [target]. Is there room to adjust?",
        talkingPoints: [
          "Lead with passion for the mission - NGOs value commitment to cause",
          "Highlight specific development sector experience and results",
          "Be prepared for tighter budgets - focus on total package",
          "Professional development budget and training opportunities are common negotiation points",
          "Mention language skills and local context knowledge",
        ],
      },
      startup: {
        emailScript: `Hi [Hiring Manager Name],

Thanks so much for the offer to join [Startup Name] as [Role Title]. I'm really excited about what you're building and would love to be part of the team.

I wanted to chat about the compensation package. Based on my skills and experience, I was thinking [target amount] would be more aligned with the value I can bring. I know early-stage budgets can be tight, so I'm also open to discussing equity options, performance bonuses, or a 3-month review with an increase.

I'm confident I can help drive [specific startup goal] and I'm keen to find a package that works for both of us.

Best,
[Your Name]`,
        verbalScript: "Thanks for the offer - I'm really excited about the team and what you're building. I wanted to talk about comp. With my background in [skill], I'm looking for [target]. I understand startup constraints - would you be open to including equity or a performance-based component?",
        talkingPoints: [
          "Startups value flexibility - be open to creative compensation",
          "Equity can be a significant part of total compensation at startups",
          "Performance-based bonuses or 3-month review adjustments are common",
          "Show you understand the startup stage and are willing to partner",
          "Highlight specific skills that directly impact the startup's growth",
        ],
      },
    },
    promotion: {
      corporate: {
        emailScript: `Dear [Manager Name],

Thank you for the opportunity to discuss my promotion to [New Role Title]. I am grateful for the trust you have placed in me and excited about the new responsibilities.

I would like to discuss the proposed compensation for this new role. Over the past [X] years, I have [key achievements]. The market range for this level of role is [range] RWF per month.

Given my proven track record and the increased responsibilities, I believe a salary of [target amount] RWF would be appropriate. This represents a [X]% increase and aligns with both market rates and internal equity.

I look forward to continuing our discussion.

Sincerely,
[Your Name]`,
        talkingPoints: [
          "Document your achievements and value delivered since last review",
          "Research market rates for the new role level",
          "Reference specific contributions that justify the increase",
          "Discuss timing - align with budget cycles if possible",
          "Be prepared to discuss non-monetary benefits as alternatives",
        ],
      },
    },
  },
  whatToAvoid: [
    "Saying 'I really need this job' - reduces your leverage",
    "Making ultimatums unless you have a competing offer and are willing to walk away",
    "Comparing salaries with current colleagues (breaches confidentiality)",
    "Focusing only on base salary - consider the total package",
    "Negotiating too early - wait for a formal written offer",
    "Being aggressive or confrontational - keep it collaborative",
    "Accepting immediately - always take time to review the offer",
  ],
  totalPackageElements: [
    { element: "Base Salary", negotiable: true, importance: "high" },
    { element: "Transport Allowance", negotiable: true, importance: "medium" },
    { element: "Housing Allowance", negotiable: true, importance: "medium" },
    { element: "Meal Allowance", negotiable: true, importance: "low" },
    { element: "Health Insurance (Family vs Individual)", negotiable: true, importance: "high" },
    { element: "Annual Bonus / Performance Bonus", negotiable: true, importance: "high" },
    { element: "Professional Development Budget", negotiable: true, importance: "medium" },
    { element: "Certification Support (Fees + Study Leave)", negotiable: true, importance: "medium" },
    { element: "Additional Annual Leave Days", negotiable: true, importance: "medium" },
    { element: "Flexible / Remote Working Arrangements", negotiable: true, importance: "medium" },
    { element: "Phone / Communication Allowance", negotiable: true, importance: "low" },
    { element: "Gym or Wellness Benefits", negotiable: false, importance: "low" },
  ],
  tips: [
    "Always negotiate in good faith - be respectful and professional",
    "Do your market research on Imyanya.rw before the conversation",
    "Practice your script out loud before the actual conversation",
    "Have a clear walk-away point in mind before negotiating",
    "Consider the total package, not just base salary",
    "Get the final offer in writing before accepting",
    "In Rwanda, in-person negotiation is often preferred over email for important discussions",
    "Timing matters - end of quarter or fiscal year often has more budget flexibility",
  ],
  relatedTools: ["salary-calculator", "salary-comparison", "interview-question-bank"],
  metaTitle: "Salary Negotiation Script Generator | Rwanda | Imyanya.rw",
  metaDescription: "Generate personalized salary negotiation scripts for Rwandan job seekers. Email and verbal scripts for job offers, promotions, and salary reviews with talking points.",
};

export default negotiationScriptGenerator;
