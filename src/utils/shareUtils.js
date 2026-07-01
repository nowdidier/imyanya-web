import dayjs from "dayjs";

import { APP_NAME, AUTH_CONFIG } from "../configs/constants";

const compactText = (value = "") => String(value ?? "").replace(/\s+/g, " ").trim();

const formatDeadline = (deadline) => {
  if (!deadline) {
    return "";
  }

  const parsedDeadline = dayjs(deadline);

  return parsedDeadline.isValid() ? parsedDeadline.format("DD MMM YYYY") : "";
};

const buildDescription = (parts = []) => {
  return compactText(parts.filter(Boolean).join(" "));
};

export const buildJobShareData = ({
  url = "",
  jobName = "",
  companyName = "",
  locationName = "",
  deadline = "",
  salaryLabel = "",
  jobTypeLabel = "",
  brand = APP_NAME,
  hashtags = ["JobsInRwanda", "RwandaJobs", "KigaliJobs"],
} = {}) => {
  const titleCore = compactText(
    [jobName, companyName].filter(Boolean).join(" at ")
  );
  const title = titleCore
    ? `${titleCore} | Jobs in Rwanda`
    : `Jobs in Rwanda | ${brand}`;
  const description = buildDescription([
    titleCore || `Explore top opportunities on ${brand}.`,
    locationName ? `Location: ${locationName}.` : "",
    jobTypeLabel ? `Type: ${jobTypeLabel}.` : "",
    salaryLabel ? `Salary: ${salaryLabel}.` : "",
    formatDeadline(deadline)
      ? `Apply before ${formatDeadline(deadline)}.`
      : "",
    `Find more jobs in Rwanda on ${brand}.`,
  ]);

  return {
    badge: "Job opportunity",
    dialogTitle: "Share this job",
    title,
    description,
    quote: description,
    subject: compactText(`Job opportunity: ${titleCore || brand}`),
    emailBody: description,
    copyText: [description, url].filter(Boolean).join("\n\n"),
    nativeText: description,
    hashtags,
    source: brand,
    via: "",
    messengerAppId: AUTH_CONFIG.FACEBOOK_CLIENT_ID || "",
    url,
  };
};

export const buildCompanyShareData = ({
  url = "",
  companyName = "",
  fieldOperation = "",
  locationName = "",
  jobPostNumber = 0,
  brand = APP_NAME,
  hashtags = ["RwandaJobs", "HireInRwanda", "KigaliJobs"],
} = {}) => {
  const openJobsNumber = Number(jobPostNumber);
  const openJobsText =
    Number.isFinite(openJobsNumber) && openJobsNumber > 0
      ? `${openJobsNumber} open job${openJobsNumber === 1 ? "" : "s"}`
      : "";
  const titleCore = compactText(companyName);
  const title = titleCore
    ? `${titleCore} | Hiring in Rwanda`
    : `Hiring in Rwanda | ${brand}`;
  const description = buildDescription([
    titleCore || `Explore employers on ${brand}.`,
    fieldOperation ? `Industry: ${fieldOperation}.` : "",
    locationName ? `Location: ${locationName}.` : "",
    openJobsText ? `${openJobsText}.` : "",
    `Discover companies and careers in Rwanda on ${brand}.`,
  ]);

  return {
    badge: "Company profile",
    dialogTitle: "Share this company",
    title,
    description,
    quote: description,
    subject: compactText(`Explore ${titleCore || "this company"} on ${brand}`),
    emailBody: description,
    copyText: [description, url].filter(Boolean).join("\n\n"),
    nativeText: description,
    hashtags,
    source: brand,
    via: "",
    messengerAppId: AUTH_CONFIG.FACEBOOK_CLIENT_ID || "",
    url,
  };
};
