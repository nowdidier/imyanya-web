import { classifyJobCategories } from "../OrganisationsMap/categoryFilterUtils";

export const JOBS_EXPLORER_FILTERS = [
  { id: "all", label: "All jobs" },
  { id: "kigali", label: "Kigali" },
  { id: "ngo", label: "NGO" },
  { id: "government", label: "Government" },
  { id: "technology", label: "Tech & AI" },
  { id: "internship", label: "Internship" },
  { id: "urgent", label: "Urgent" },
];

const GENERIC_COMPANY_NAMES = new Set([
  "imyanya",
  "imyanya opportunities",
  "employer",
]);

const MONOGRAM_TONES = [
  { bg: "#ede9fe", fg: "#441da0", border: "#ddd6fe" },
  { bg: "#e0f2fe", fg: "#0369a1", border: "#bae6fd" },
  { bg: "#dcfce7", fg: "#15803d", border: "#bbf7d0" },
  { bg: "#fef3c7", fg: "#b45309", border: "#fde68a" },
  { bg: "#fce7f3", fg: "#be185d", border: "#fbcfe8" },
  { bg: "#e0e7ff", fg: "#3730a3", border: "#c7d2fe" },
];

export const stripJobHtml = (html) => {
  if (!html) return "";
  return String(html)
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/gi, " ")
    .replace(/&amp;/gi, "&")
    .replace(/&lt;/gi, "<")
    .replace(/&gt;/gi, ">")
    .replace(/&#39;/g, "'")
    .replace(/&quot;/g, '"')
    .replace(/\s+/g, " ")
    .trim();
};

export const sanitizeFallbackInitials = (name) => {
  const words = String(name || "")
    .trim()
    .split(/\s+/)
    .map((w) => w.replace(/[^A-Za-z0-9]/g, ""))
    .filter(Boolean);
  if (words.length === 0) return "JB";
  if (words.length === 1) return words[0].slice(0, 2).toUpperCase();
  return `${words[0][0] || ""}${words[1][0] || ""}`.toUpperCase();
};

export const getMonogramTone = (name) => {
  const str = String(name || "Employer");
  let hash = 0;
  for (let i = 0; i < str.length; i += 1) {
    hash = (hash * 31 + str.charCodeAt(i)) >>> 0;
  }
  return MONOGRAM_TONES[hash % MONOGRAM_TONES.length];
};

export const sanitizeEmployerLogoUrl = (url) => {
  const trimmed = String(url || "").trim();
  if (!trimmed) return null;
  if (/company_logo_default\.(png|jpg|jpeg|webp)$/i.test(trimmed)) {
    return null;
  }
  return trimmed;
};

export const resolveEmployerName = (job) => {
  const rawCompany = String(job?.companyDict?.companyName || "").trim();
  if (rawCompany && !GENERIC_COMPANY_NAMES.has(rawCompany.toLowerCase())) {
    return rawCompany;
  }

  const text = `${job?.jobName || ""} ${stripJobHtml(job?.jobDescription || "")}`;

  const explicitCompanyMatch = text.match(
    /\bCompany\s*:\s*([A-Z0-9][A-Za-z0-9&.,'()\-\s]{2,45}?)(?=\s+(?:Location|Number|Employment|Job|Reports|Duty|Type|Start)\b|$)/
  );
  if (explicitCompanyMatch?.[1]) {
    return explicitCompanyMatch[1].trim();
  }

  const knownRules = [
    [/\bCHAI\s+RWANDA\b|\bClinton Health Access Initiative\b/i, "CHAI Rwanda"],
    [/\bTrinity Nyakabingo Mine\b/i, "Trinity Nyakabingo Mine"],
    [/\bUGHE\b|\bLearning\.ai\b/i, "UGHE · Learning.ai"],
    [/\bVisionFund Rwanda\b/i, "VisionFund Rwanda"],
    [/\bRALGA\b/i, "RALGA · Local Government"],
    [/\bAfrican Leadership University\b/i, "African Leadership University"],
    [/\bMount Kigali University\b/i, "Mount Kigali University"],
    [/\bChancen International\b|\bProtestant University of Rwanda\b/i, "Chancen Rwanda"],
    [/\bSambora Private Journeys\b/i, "Sambora Private Journeys"],
  ];

  for (const [pattern, label] of knownRules) {
    if (pattern.test(text)) return label;
  }

  const districtMatch = text.match(/\b([A-Z][a-z]+ District)\s+is recruiting\b/);
  if (districtMatch?.[1]) {
    return districtMatch[1];
  }

  return rawCompany || "Rwanda Employer";
};

export const resolveJobCityName = (job, cityDict = {}) => {
  const directCityName = job?.locationDict?.cityName;
  if (directCityName && String(directCityName).trim()) {
    return String(directCityName).trim();
  }
  const cityId = job?.locationDict?.city ?? job?.location?.city;
  if (cityId !== undefined && cityId !== null && cityDict[cityId]) {
    return String(cityDict[cityId]).trim();
  }
  const address = job?.locationDict?.address || job?.location?.address;
  if (address && String(address).trim()) {
    return String(address).trim();
  }
  return "Rwanda";
};

export const formatCityWithCountry = (cityName) => {
  const clean = String(cityName || "").trim();
  if (!clean || /^rwanda$/i.test(clean)) return "Rwanda";
  if (/\brwanda\b/i.test(clean)) return clean;
  return `${clean}, Rwanda`;
};

export const formatSalarySummary = (salaryMin, salaryMax) => {
  const min = Number(salaryMin) || 0;
  const max = Number(salaryMax) || 0;
  if (min <= 0 && max <= 0) return null;
  const fmt = (n) => n.toLocaleString("en-US");
  if (min > 0 && max > 0 && min !== max) {
    return `${fmt(min)}–${fmt(max)} RWF/mo`;
  }
  if (min > 0 && max > 0 && min === max) {
    return `${fmt(min)} RWF/mo`;
  }
  if (max > 0) return `Up to ${fmt(max)} RWF/mo`;
  return `From ${fmt(min)} RWF/mo`;
};

export const formatDeadlineSummary = (deadline) => {
  if (!deadline) return null;
  const date = new Date(deadline);
  if (Number.isNaN(date.getTime())) return null;
  return `Closes ${date.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  })}`;
};

export const buildJobHighlights = (
  detail,
  {
    jobTypeDict = {},
    workplaceDict = {},
    experienceDict = {},
    academicLevelDict = {},
  } = {}
) => {
  if (!detail) return [];
  const items = [];
  const jobType = detail.jobType && jobTypeDict[detail.jobType];
  const workplace =
    detail.typeOfWorkplace && workplaceDict[detail.typeOfWorkplace];
  const experience = detail.experience && experienceDict[detail.experience];
  const academic =
    detail.academicLevel && academicLevelDict[detail.academicLevel];
  const salary = formatSalarySummary(detail.salaryMin, detail.salaryMax);
  const deadline = formatDeadlineSummary(detail.deadline);

  if (jobType) items.push({ label: "Job type", value: jobType });
  if (workplace) items.push({ label: "Workplace", value: workplace });
  if (experience) items.push({ label: "Experience", value: experience });
  if (academic) items.push({ label: "Education", value: academic });
  if (salary) items.push({ label: "Compensation", value: salary });
  if (deadline) items.push({ label: "Deadline", value: deadline });

  return items;
};

export const filterJobsList = (
  jobs,
  { query = "", filterId = "all", cityDict = {} } = {}
) => {
  const list = Array.isArray(jobs) ? jobs : [];
  const normalizedQuery = String(query || "").trim().toLowerCase();

  return list.filter((job) => {
    if (!job || typeof job !== "object") return false;

    const cityName = resolveJobCityName(job, cityDict);
    const employerName = resolveEmployerName(job);
    const title = String(job?.jobName || "");
    const descriptionText = stripJobHtml(job?.jobDescription || "");

    if (filterId === "kigali") {
      if (!`${cityName} ${title} ${descriptionText}`.toLowerCase().includes("kigali")) {
        return false;
      }
    } else if (filterId === "urgent") {
      if (!job.isUrgent && !job.isHot) return false;
    } else if (
      filterId === "ngo" ||
      filterId === "government" ||
      filterId === "technology" ||
      filterId === "internship"
    ) {
      const categories = classifyJobCategories(job);
      if (!categories.some((cat) => String(cat).toLowerCase() === filterId)) {
        return false;
      }
    }

    if (!normalizedQuery) return true;

    const haystack = [title, employerName, cityName, descriptionText]
      .join(" ")
      .toLowerCase();
    return haystack.includes(normalizedQuery);
  });
};

const FILTER_QUERY_SUFFIX = {
  all: "",
  kigali: "Kigali",
  ngo: "NGO",
  government: "Government",
  technology: "Tech AI",
  internship: "Internship",
  urgent: "",
};

export const buildGoogleJobsSearchUrl = ({
  query = "",
  filterId = "all",
  jobTitle = "",
  employerName = "",
  cityName = "",
} = {}) => {
  const title = String(jobTitle || "").trim();
  const employer = String(employerName || "").trim();
  const city = String(cityName || "").trim();

  if (title) {
    const parts = [title];
    if (employer && !/^rwanda employer$/i.test(employer)) {
      parts.push(employer);
    }
    if (city && !/^rwanda$/i.test(city)) {
      parts.push(city);
    } else {
      parts.push("Rwanda");
    }
    return `https://www.google.com/search?q=${encodeURIComponent(
      parts.join(" ")
    )}&udm=8&jbr=sep:0&hl=en&gl=rw`;
  }

  const customQuery = String(query || "").trim();
  const filterSuffix = FILTER_QUERY_SUFFIX[filterId] || "";
  const searchTerms = [
    customQuery || "jobs near Rwanda",
    customQuery && !/\brwanda\b/i.test(customQuery) ? "Rwanda" : "",
    filterSuffix &&
    !customQuery.toLowerCase().includes(filterSuffix.toLowerCase())
      ? filterSuffix
      : "",
  ]
    .filter(Boolean)
    .join(" ");

  return `https://www.google.com/search?q=${encodeURIComponent(
    searchTerms
  )}&udm=8&jbr=sep:0&hl=en&gl=rw`;
};

