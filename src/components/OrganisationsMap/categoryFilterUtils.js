export const JOB_CATEGORIES = [
  { id: "NGO", label: "NGO", color: "#2e7d32" },
  { id: "Government", label: "Government", color: "#ef6c00" },
  { id: "Internship", label: "Internship", color: "#0288d1" },
  { id: "Technology", label: "Technology", color: "#00838f" },
  { id: "Finance & Banking", label: "Finance & Banking", color: "#441da0" },
  { id: "Healthcare", label: "Healthcare", color: "#d81b60" },
  { id: "Education", label: "Education", color: "#43a047" },
  { id: "Engineering & Mining", label: "Engineering & Mining", color: "#546e7a" },
];

const VALID_CATEGORY_IDS = new Set(JOB_CATEGORIES.map((c) => c.id));
const CATEGORY_ID_BY_LOWER = new Map(
  JOB_CATEGORIES.map((c) => [c.id.toLowerCase(), c.id])
);

const stripHtml = (value = "") =>
  String(value || "")
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim();

const CATEGORY_RULES = [
  {
    id: "NGO",
    sectorPattern:
      /\b(ngo|non-profit|nonprofit|humanitarian|international org|international development)\b/i,
    textPattern:
      /\b(ngo|non-profit|nonprofit|humanitarian|international org|international development|undp|unicef|usaid|world bank|giz|oxfam|world vision|save the children|partners in health|one acre fund|mercy corps|plan international|care international|clinton health access initiative|chai|monitoring,\s*evaluation\s+and\s+learning|program officer|donor-funded)\b/i,
  },
  {
    id: "Government",
    sectorPattern: /\b(government|public|public service|public sector|civil service)\b/i,
    textPattern:
      /\b(local government|government entit(?:y|ies)|government agenc(?:y|ies)|government institution|republic of rwanda|ministry|ministries|public service|public sector|civil service|cell level|cell staffs|mifotra|rwanda revenue authority|rwanda biomedical centre|rra|rbc|rssb|rdb|rura|bnr|national bank of rwanda|rwandair|social development officer[^.]*district)\b/i,
  },
  {
    id: "Internship",
    sectorPattern: /\b(intern|internship|graduate trainee|fellowship)\b/i,
    textPattern:
      /\b(intern|interns|internship|internships|graduate trainee|graduate program|graduate programme|fellowship|apprentice|apprenticeship|scholarship)\b/i,
  },
  {
    id: "Technology",
    sectorPattern:
      /\b(technology|telecom|telecommunications|software|it|digital|fintech|innovation)\b/i,
    textPattern:
      /\b(software|developer|devops|data analyst|data scientist|cloud|cybersecurity|telecom|telecommunications|artificial intelligence|ai|full-stack|frontend|backend|ui\/ux|it support|systems administrator|fintech|zorabots|andela|exuus|mtn|airtel)\b/i,
  },
  {
    id: "Finance & Banking",
    sectorPattern:
      /\b(banking|finance|financial|insurance|sacco|microfinance|capital|accounting|tax)\b/i,
    textPattern:
      /\b(accountant|accounting|finance|financial|audit|auditor|bank|banking|branch manager|credit|loan|teller|insurance|treasury|investment|microfinance|sacco|tax administration)\b/i,
  },
  {
    id: "Healthcare",
    sectorPattern: /\b(health|healthcare|hospital|medical|pharma|clinic)\b/i,
    textPattern:
      /\b(healthcare|health systems|public health|global health|medical|nurse|doctor|physician|clinical|pharmacy|pharmacist|dental|medical laboratory|biomedical|epidemiolog\w*|occupational health)\b/i,
  },
  {
    id: "Education",
    sectorPattern: /\b(education|school|university|academy)\b/i,
    textPattern:
      /\b(teacher|lecturer|professor|education|higher education|business school|university|academic|curriculum|scholarship|undergraduate|learning and documentation)\b/i,
  },
  {
    id: "Engineering & Mining",
    sectorPattern: /\b(mining|engineering|construction|energy|manufacturing|geology)\b/i,
    textPattern:
      /\b(geologist|mine|mining|civil engineer|mechanical engineer|electrical engineer|mine planning|architect|construction|surveyor|surveying|mineral|energy|immobilier)\b/i,
  },
];

const orderCategories = (matchedSet) =>
  JOB_CATEGORIES.map((c) => c.id).filter((id) => matchedSet.has(id));

export const parseCategoriesParam = (value) => {
  if (!value) return [];
  const rawList = Array.isArray(value) ? value : String(value).split(",");
  const seen = new Set();
  const parsed = [];
  for (const raw of rawList) {
    const trimmed = String(raw || "").trim();
    if (!trimmed) continue;
    const canonical =
      (VALID_CATEGORY_IDS.has(trimmed) && trimmed) ||
      CATEGORY_ID_BY_LOWER.get(trimmed.toLowerCase()) ||
      null;
    if (canonical && !seen.has(canonical)) {
      seen.add(canonical);
      parsed.push(canonical);
    }
  }
  return orderCategories(new Set(parsed));
};

export const serializeCategoriesParam = (categories = []) =>
  parseCategoriesParam(categories).join(",");

export const classifyJobCategories = (job = {}) => {
  if (Array.isArray(job?.categories) && job.categories.length > 0) {
    return parseCategoriesParam(job.categories);
  }

  const sectorText = [
    job?.careerName,
    job?.jobTypeName,
    job?.fieldOperation,
    job?.sector,
  ]
    .filter(Boolean)
    .join(" ");
  const bodyText = stripHtml(
    [
      job?.jobName,
      job?.jobDescription,
      job?.companyName,
      job?.careerName,
      job?.jobTypeName,
      job?.fieldOperation,
    ]
      .filter(Boolean)
      .join(" ")
  );

  const matched = new Set();
  if (Number(job?.jobType) === 6) {
    matched.add("Internship");
  }

  for (const rule of CATEGORY_RULES) {
    if (
      (sectorText && rule.sectorPattern.test(sectorText)) ||
      (bodyText && rule.textPattern.test(bodyText))
    ) {
      matched.add(rule.id);
    }
  }

  return orderCategories(matched);
};

export const classifyOrgCategories = (org = {}, linkedJobCategories = []) => {
  const matched = new Set(parseCategoriesParam(org?.categories || []));
  for (const cat of parseCategoriesParam(linkedJobCategories)) {
    matched.add(cat);
  }

  const sectorText = [
    org?.sector,
    org?.rawIndustry,
    org?.industry,
    org?.rawSector,
    org?.fieldOperation,
  ]
    .filter(Boolean)
    .join(" ");

  const bodyText = stripHtml(
    [
      org?.companyName,
      org?.sector,
      org?.rawIndustry,
      org?.industry,
      org?.rawSector,
      org?.fieldOperation,
      org?.tagline,
      org?.categoryText,
    ]
      .filter(Boolean)
      .join(" ")
  );

  const internshipText = stripHtml(
    [org?.description, org?.cultureDescription].filter(Boolean).join(" ")
  );

  for (const rule of CATEGORY_RULES) {
    if (
      (sectorText && rule.sectorPattern.test(sectorText)) ||
      (bodyText && rule.textPattern.test(bodyText))
    ) {
      matched.add(rule.id);
    }
  }

  const internshipRule = CATEGORY_RULES.find((r) => r.id === "Internship");
  if (internshipRule && internshipText && internshipRule.textPattern.test(internshipText)) {
    matched.add("Internship");
  }

  return orderCategories(matched);
};

export const matchesJobCategories = (itemCategories = [], selectedCategories = []) => {
  const selected = parseCategoriesParam(selectedCategories);
  if (selected.length === 0) return true;
  const itemSet = new Set(itemCategories || []);
  return selected.some((cat) => itemSet.has(cat));
};

export const filterJobSpotByCategories = (spot, selectedCategories = []) => {
  const selected = parseCategoriesParam(selectedCategories);
  if (!spot) return null;
  if (selected.length === 0) return spot;
  const jobs = Array.isArray(spot.jobs) ? spot.jobs : [];
  const matchingJobs = jobs.filter((job) =>
    matchesJobCategories(classifyJobCategories(job), selected)
  );
  if (matchingJobs.length === 0) return null;
  if (matchingJobs.length === jobs.length) return spot;
  return { ...spot, jobs: matchingJobs };
};

export const computeCategoryCounts = ({
  orgs = [],
  jobSpots = [],
  show = "all",
  orgCategoriesByKey = null,
} = {}) => {
  const counts = Object.fromEntries(JOB_CATEGORIES.map((c) => [c.id, 0]));

  if (show !== "jobs") {
    for (const org of orgs) {
      const cats = orgCategoriesByKey?.get(org.key) || classifyOrgCategories(org);
      for (const cat of cats) {
        if (cat in counts) counts[cat] += 1;
      }
    }
  }

  if (show !== "orgs") {
    for (const spot of jobSpots) {
      const spotCats = new Set();
      for (const job of spot.jobs || []) {
        for (const cat of classifyJobCategories(job)) {
          spotCats.add(cat);
        }
      }
      for (const cat of spotCats) {
        if (cat in counts) counts[cat] += 1;
      }
    }
  }

  return counts;
};
