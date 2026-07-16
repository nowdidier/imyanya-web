export const cvChecklist = {
  id: "cv-checklist",
  name: "CV Review Checklist",
  slug: "cv-checklist",
  category: "Checklist",
  description: "Ensure your CV meets Rwandan employer expectations with this comprehensive checklist covering format, content, and compliance requirements.",
  icon: "ChecklistIcon",
  inputs: [
    { id: "cv-level", label: "Experience Level", type: "select", required: true, options: [
      { value: "entry", label: "Entry Level (0-2 years)" },
      { value: "mid", label: "Mid Level (3-5 years)" },
      { value: "senior", label: "Senior Level (5+ years)" },
      { value: "executive", label: "Executive / C-Level" },
    ]},
    { id: "sector", label: "Target Sector", type: "select", required: true, options: [
      { value: "private", label: "Private Sector" },
      { value: "government", label: "Government / Public Sector" },
      { value: "ngo", label: "NGO / International Organization" },
      { value: "academia", label: "Academia / Research" },
    ]},
  ],
  outputs: [
    { id: "total-items", label: "Total Checklist Items", type: "number", format: "count" },
    { id: "completed-items", label: "Completed Items", type: "number", format: "count" },
    { id: "completion-percentage", label: "CV Readiness Score", type: "number", format: "percentage" },
    { id: "missing-items", label: "Items to Improve", type: "table", format: "table" },
    { id: "category-scores", label: "Category Breakdown", type: "chart", format: "bar-chart" },
  ],
  categories: [
    {
      name: "Contact & Personal Info",
      items: [
        { id: "full-name", label: "Full name as per official ID", importance: "critical", description: "Use your full legal name matching your national ID or passport" },
        { id: "phone-number", label: "Active phone number with country code (+250)", importance: "critical", description: "Rwandan employers expect +250 prefix" },
        { id: "email-professional", label: "Professional email address", importance: "critical", description: "Avoid nicknames; use firstname.lastname format" },
        { id: "linkedin-profile", label: "LinkedIn profile URL", importance: "recommended", description: "Increasingly important for professional roles in Rwanda" },
        { id: "location", label: "Current location (City, District)", importance: "recommended", description: "Employers want to know if you are in Kigali or available to relocate" },
        { id: "drivers-license", label: "Driver's license (if relevant)", importance: "optional", description: "Important for field sales, logistics, and management roles" },
      ],
    },
    {
      name: "Professional Summary",
      items: [
        { id: "professional-summary", label: "2-3 sentence professional summary", importance: "critical", description: "Brief overview matching your target role" },
        { id: "career-objective", label: "Career objective or goal statement", importance: "recommended", description: "Tailor this to each application" },
        { id: "key-strengths", label: "3-5 key strengths or specialities", importance: "recommended", description: "Bulleted highlights of your core competencies" },
      ],
    },
    {
      name: "Work Experience",
      items: [
        { id: "reverse-chronological", label: "Reverse chronological order", importance: "critical", description: "Most recent experience first" },
        { id: "company-names", label: "Company names and locations", importance: "critical", description: "Include city and country for each employer" },
        { id: "employment-dates", label: "Employment dates (month/year)", importance: "critical", description: "Use MM/YYYY format consistently" },
        { id: "achievement-bullets", label: "Achievement-oriented bullet points", importance: "critical", description: "Use numbers and metrics; Rwanda employers value results" },
        { id: "action-verbs", label: "Action verbs to start each bullet", importance: "recommended", description: "e.g., Led, Managed, Implemented, Achieved" },
        { id: "quantified-results", label: "Quantified results where possible", importance: "recommended", description: "e.g., Managed 50M RWF budget, Led team of 10" },
        { id: "responsibility-gap", label: "No unexplained gaps (explain gaps)", importance: "recommended", description: "Briefly explain career breaks or study periods" },
      ],
    },
    {
      name: "Education & Qualifications",
      items: [
        { id: "degrees-list", label: "All degrees listed with institutions", importance: "critical", description: "Include university name, degree, and graduation year" },
        { id: "professional-certs", label: "Professional certifications", importance: "critical", description: "CPA, ACCA, PMP, SHRM, etc. are highly valued in Rwanda" },
        { id: "certification-dates", label: "Certification dates and expiry", importance: "recommended", description: "Some certs require renewal; show current status" },
        { id: "relevant-courses", label: "Relevant coursework or training", importance: "optional", description: "Include short courses from recognized institutions" },
      ],
    },
    {
      name: "Skills",
      items: [
        { id: "technical-skills", label: "Technical/professional skills listed", importance: "critical", description: "Match skills to job description keywords" },
        { id: "language-proficiency", label: "Language proficiency with levels", importance: "critical", description: "English, French, Kinyarwanda; include speaking/writing levels" },
        { id: "software-tools", label: "Software and tool proficiency", importance: "recommended", description: "MS Office, ERP systems, industry-specific tools" },
        { id: "skill-rating", label: "Skill rating (Beginner/Intermediate/Expert)", importance: "recommended", description: "Honest self-assessment helps employers gauge fit" },
      ],
    },
    {
      name: "Rwanda-Specific Compliance",
      items: [
        { id: "rssb-number", label: "RSSB social security number", importance: "recommended", description: "Required for formal employment; include if available" },
        { id: "national-id", label: "National ID number (optional)", importance: "optional", description: "Some employers request this; not mandatory on CV" },
        { id: "work-permit", label: "Work permit status (if foreign national)", importance: "critical", description: "Clearly state your right to work in Rwanda" },
        { id: "tax-id", label: "RRA Tax Identification Number", importance: "optional", description: "May be requested for payroll processing" },
        { id: "rra-compliance", label: "RRA tax compliance certificate", importance: "optional", description: "Relevant for senior finance and management roles" },
      ],
    },
    {
      name: "Formatting & Presentation",
      items: [
        { id: "one-to-two-pages", label: "1-2 pages maximum", importance: "critical", description: "Rwanda employers prefer concise CVs; 2 pages max for senior roles" },
        { id: "consistent-formatting", label: "Consistent fonts, sizes, and spacing", importance: "critical", description: "Professional appearance matters" },
        { id: "no-photo", label: "No photo (preferred in Rwanda)", importance: "recommended", description: "CV photos are not standard practice in Rwanda" },
        { id: "pdf-format", label: "PDF format for submission", importance: "critical", description: "Always submit as PDF unless requested otherwise" },
        { id: "file-naming", label: "Professional file name", importance: "recommended", description: "e.g., Jean_Mugabo_CV_2026.pdf" },
        { id: "spell-checked", label: "Spell-checked and proofread", importance: "critical", description: "Errors create negative impression" },
      ],
    },
    {
      name: "References",
      items: [
        { id: "referees-list", label: "2-3 professional referees", importance: "recommended", description: "Include name, title, company, phone, and email" },
        { id: "referee-permission", label: "Referee consent obtained", importance: "recommended", description: "Always ask permission before listing someone" },
        { id: "referees-format", label: "Referees available on request", importance: "optional", description: "Alternative to listing them directly on CV" },
      ],
    },
  ],
  tips: [
    "Rwandan employers typically prefer a 1-2 page CV with clear section headings",
    "Tailor your CV to each application - generic CVs are easily spotted",
    "Include key skills from the job description to pass ATS screening",
    "Quantify achievements with Rwandan context (e.g., 'Managed 200M RWF budget')",
    "Proofread for spelling and grammar - errors signal carelessness",
    "Save your CV as 'FirstName_LastName_CV_MonthYear.pdf'",
    "Avoid including your photo, marital status, or age unless specifically requested",
  ],
  relatedTools: ["cover-letter-generator", "resume-templates", "interview-question-bank"],
  metaTitle: "CV Checklist for Rwanda Jobs | CV Review Guide | Imyanya.rw",
  metaDescription: "Complete CV checklist for Rwandan job seekers. Ensure your CV meets employer expectations with sector-specific requirements, format tips, and RSSB compliance.",
};

export default cvChecklist;
