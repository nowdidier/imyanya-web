import test from "node:test";
import assert from "node:assert/strict";

import {
  buildGoogleJobsSearchUrl,
  buildJobHighlights,
  filterJobsList,
  formatCityWithCountry,
  formatDeadlineSummary,
  formatSalarySummary,
  resolveEmployerName,
  resolveJobCityName,
  sanitizeEmployerLogoUrl,
  sanitizeFallbackInitials,
  stripJobHtml,
} from "./jobsExplorerUtils.js";

test("formatSalarySummary, formatDeadlineSummary, and initials format cleanly", () => {
  assert.equal(formatSalarySummary(0, 0), null);
  assert.equal(formatSalarySummary(200000, 3000000), "200,000–3,000,000 RWF/mo");
  assert.equal(formatSalarySummary(0, 100000), "Up to 100,000 RWF/mo");
  assert.equal(formatSalarySummary(500000, 500000), "500,000 RWF/mo");
  assert.equal(formatDeadlineSummary("2026-11-30"), "Closes 30 Nov 2026");
  assert.equal(formatDeadlineSummary("not-a-date"), null);
  assert.equal(sanitizeFallbackInitials("CHAI Rwanda"), "CR");
  assert.equal(sanitizeFallbackInitials("UGHE · Learning.ai"), "UL");
  assert.equal(sanitizeFallbackInitials("UGHE"), "UG");
  assert.equal(stripJobHtml("<p>Hello&nbsp;<strong>Rwanda</strong></p>"), "Hello Rwanda");
});

test("resolveEmployerName and sanitizeEmployerLogoUrl extract true employer and drop broken default logos", () => {
  assert.equal(
    resolveEmployerName({
      jobName: "Content Program Officer",
      companyDict: { companyName: "Imyanya Opportunities" },
      jobDescription: "<p>CHAI RWANDA VACANCY ANNOUNCEMENT</p>",
    }),
    "CHAI Rwanda"
  );
  assert.equal(
    resolveEmployerName({
      jobName: "Graphic Designers",
      companyDict: { companyName: "Imyanya Opportunities" },
      jobDescription: "<p>Company: MJJ DESIGN Ltd Location: Kigali</p>",
    }),
    "MJJ DESIGN Ltd"
  );
  assert.equal(
    resolveEmployerName({
      jobName: "Accountant",
      companyDict: { companyName: "Bank of Kigali" },
      jobDescription: "<p>Hiring in Kigali</p>",
    }),
    "Bank of Kigali"
  );
  assert.equal(
    sanitizeEmployerLogoUrl(
      "https://res.cloudinary.com/dswnatoh2/image/upload/v1/myjob-bucket/system/company_logo_default.png"
    ),
    null
  );
  assert.equal(
    sanitizeEmployerLogoUrl("https://cdn.example.com/bk-logo.png"),
    "https://cdn.example.com/bk-logo.png"
  );
});

test("resolveJobCityName and formatCityWithCountry format Rwanda locations", () => {
  const cityDict = { 1: "Kigali", 18: "Muhanga" };
  assert.equal(resolveJobCityName({ locationDict: { city: 18 } }, cityDict), "Muhanga");
  assert.equal(
    formatCityWithCountry(resolveJobCityName({ locationDict: { city: 18 } }, cityDict)),
    "Muhanga, Rwanda"
  );
  assert.equal(formatCityWithCountry("Rwanda"), "Rwanda");
  assert.equal(formatCityWithCountry("City of Kigali"), "City of Kigali, Rwanda");
});

test("buildJobHighlights builds structured metadata from config dictionaries", () => {
  const highlights = buildJobHighlights(
    {
      jobType: 1,
      typeOfWorkplace: 2,
      experience: 5,
      academicLevel: 2,
      salaryMin: 500000,
      salaryMax: 900000,
      deadline: "2026-11-30",
    },
    {
      jobTypeDict: { 1: "Permanent full-time" },
      workplaceDict: { 2: "Hybrid" },
      experienceDict: { 5: "3 years of experience" },
      academicLevelDict: { 2: "University" },
    }
  );
  assert.equal(highlights.length, 6);
  assert.deepEqual(highlights[0], { label: "Job type", value: "Permanent full-time" });
  assert.deepEqual(highlights[1], { label: "Workplace", value: "Hybrid" });
});

test("filterJobsList filters by keyword, location, category, and urgent flag", () => {
  const jobs = [
    {
      id: 1,
      slug: "content-program-officer",
      jobName: "Content Program Officer",
      isUrgent: false,
      companyDict: { companyName: "Imyanya Opportunities" },
      locationDict: { city: 1 },
      jobDescription: "<p>CHAI RWANDA Clinton Health Access Initiative NGO role in Kigali.</p>",
    },
    {
      id: 2,
      slug: "branch-manager",
      jobName: "Branch Manager",
      isUrgent: true,
      companyDict: { companyName: "VisionFund Rwanda" },
      locationDict: { city: 18 },
      jobDescription: "<p>Lead branch operations in Muhanga.</p>",
    },
    {
      id: 3,
      slug: "devops-engineer-ai",
      jobName: "Infrastructure and DevOps Engineer, AI",
      isUrgent: false,
      companyDict: { companyName: "Imyanya Opportunities" },
      locationDict: { city: 1 },
      jobDescription: "<p>Cloud software & AI infrastructure at UGHE in Kigali.</p>",
    },
  ];
  const cityDict = { 1: "Kigali", 18: "Muhanga" };

  assert.equal(filterJobsList(jobs, { filterId: "all", cityDict }).length, 3);
  assert.equal(filterJobsList(jobs, { filterId: "kigali", cityDict }).length, 2);
  assert.equal(filterJobsList(jobs, { filterId: "urgent", cityDict }).length, 1);
  assert.equal(filterJobsList(jobs, { filterId: "ngo", cityDict })[0].id, 1);
  assert.equal(filterJobsList(jobs, { filterId: "technology", cityDict })[0].id, 3);
  assert.equal(
    filterJobsList(jobs, { query: "chai", filterId: "all", cityDict })[0].id,
    1
  );
});

test("buildGoogleJobsSearchUrl creates udm=8 Google Jobs URLs for queries and roles", () => {
  assert.equal(
    buildGoogleJobsSearchUrl(),
    "https://www.google.com/search?q=jobs%20near%20Rwanda&udm=8&jbr=sep:0&hl=en&gl=rw"
  );
  assert.equal(
    buildGoogleJobsSearchUrl({ query: "Accountant", filterId: "ngo" }),
    "https://www.google.com/search?q=Accountant%20Rwanda%20NGO&udm=8&jbr=sep:0&hl=en&gl=rw"
  );
  assert.equal(
    buildGoogleJobsSearchUrl({
      jobTitle: "Content Program Officer",
      employerName: "CHAI Rwanda",
      cityName: "Kigali, Rwanda",
    }),
    "https://www.google.com/search?q=Content%20Program%20Officer%20CHAI%20Rwanda%20Kigali%2C%20Rwanda&udm=8&jbr=sep:0&hl=en&gl=rw"
  );
});
