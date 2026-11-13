import test from "node:test";
import assert from "node:assert/strict";
import {
  JOB_CATEGORIES,
  classifyJobCategories,
  classifyOrgCategories,
  computeCategoryCounts,
  filterJobSpotByCategories,
  matchesJobCategories,
  parseCategoriesParam,
  serializeCategoriesParam,
} from "./categoryFilterUtils";

test("parseCategoriesParam validates, deduplicates, and preserves canonical order", () => {
  assert.deepEqual(parseCategoriesParam(""), []);
  assert.deepEqual(parseCategoriesParam(null), []);
  assert.deepEqual(
    parseCategoriesParam("internship,NGO,unknown,ngo,Government"),
    ["NGO", "Government", "Internship"]
  );
  assert.equal(
    serializeCategoriesParam(["Internship", "NGO", "Invalid"]),
    "NGO,Internship"
  );
});

test("classifyJobCategories identifies NGO, Government, Internship, and domain roles without false positives", () => {
  assert.deepEqual(
    classifyJobCategories({
      jobName: "Technical Advisor, Monitoring, Evaluation and Learning (MEL)",
      jobDescription:
        "<p>Clinton Health Access Initiative (CHAI) is a global health organization working at the invitation of governments.</p>",
    }),
    ["NGO", "Healthcare"]
  );

  assert.deepEqual(
    classifyJobCategories({
      jobName: "Cell Staffs Recruitment - Local Government Entities",
      jobDescription: "<p>Recruitment across local government entities in Rwanda.</p>",
    }),
    ["Government"]
  );

  assert.deepEqual(
    classifyJobCategories({
      jobName: "Senior Geologist",
      jobDescription:
        "<p>Trinity Nyakabingo Mine Ltd in Shyorongi Sector, Rulindo District.</p>",
    }),
    ["Engineering & Mining"]
  );

  assert.deepEqual(
    classifyJobCategories({
      jobName: "Software Engineering Intern",
      jobDescription: "<p>6-month paid internship for CS graduates.</p>",
      jobType: 6,
    }),
    ["Internship", "Technology"]
  );
});

test("classifyOrgCategories classifies organisations from sector, industry, culture text, and linked jobs", () => {
  const ngoOrg = classifyOrgCategories({
    companyName: "Partners In Health Rwanda",
    rawIndustry: "Healthcare / NGO",
    rawSector: "NGO",
  });
  assert.deepEqual(ngoOrg, ["NGO", "Healthcare"]);

  const govOrg = classifyOrgCategories({
    companyName: "Rwanda Revenue Authority",
    rawIndustry: "Government / Tax",
    rawSector: "Public",
  });
  assert.deepEqual(govOrg, ["Government", "Finance & Banking"]);

  const mtnWithInternship = classifyOrgCategories({
    companyName: "MTN Rwanda",
    sector: "Telecom",
    categoryText: "Youth graduate programmes (MTN Graduate Programme)",
  });
  assert.deepEqual(mtnWithInternship, ["Internship", "Technology"]);

  const linkedOrg = classifyOrgCategories(
    { companyName: "Local Clinic", sector: "Health" },
    ["Internship"]
  );
  assert.deepEqual(linkedOrg, ["Internship", "Healthcare"]);

  const bankWithTrainingAndInsurance = classifyOrgCategories({
    companyName: "Bank of Kigali",
    rawIndustry: "Banking & Financial Services",
    rawSector: "Private",
    description:
      "<p>Offers internal training programmes and staff health insurance.</p>",
    cultureDescription: "<p>Structured graduate training and benefits.</p>",
  });
  assert.deepEqual(bankWithTrainingAndInsurance, ["Finance & Banking"]);
});

test("matchesJobCategories and filterJobSpotByCategories apply OR semantics across selected checkboxes", () => {
  assert.equal(matchesJobCategories(["Technology"], []), true);
  assert.equal(matchesJobCategories(["NGO"], ["NGO", "Government"]), true);
  assert.equal(matchesJobCategories(["Technology"], ["NGO", "Government"]), false);

  const spot = {
    key: "spot-1",
    jobs: [
      { slug: "j1", jobName: "Software Intern", categories: ["Internship", "Technology"] },
      { slug: "j2", jobName: "Branch Manager", categories: ["Finance & Banking"] },
    ],
  };

  assert.equal(filterJobSpotByCategories(spot, []), spot);
  const filtered = filterJobSpotByCategories(spot, ["Internship"]);
  assert.equal(filtered.jobs.length, 1);
  assert.equal(filtered.jobs[0].slug, "j1");
  assert.equal(filterJobSpotByCategories(spot, ["Government"]), null);
});

test("computeCategoryCounts tallies orgs and job spots respecting show mode", () => {
  const orgs = [
    { key: "o1", sector: "NGO", companyName: "One Acre Fund", categories: ["NGO"] },
    { key: "o2", sector: "Government", companyName: "RSSB", categories: ["Government"] },
  ];
  const jobSpots = [
    {
      key: "s1",
      jobs: [
        { slug: "j1", jobName: "NGO Intern", categories: ["NGO", "Internship"] },
        { slug: "j2", jobName: "Program Officer", categories: ["NGO"] },
      ],
    },
  ];

  const allCounts = computeCategoryCounts({ orgs, jobSpots, show: "all" });
  assert.equal(allCounts.NGO, 2);
  assert.equal(allCounts.Government, 1);
  assert.equal(allCounts.Internship, 1);
  assert.equal(Object.keys(allCounts).length, JOB_CATEGORIES.length);

  const jobsOnlyCounts = computeCategoryCounts({ orgs, jobSpots, show: "jobs" });
  assert.equal(jobsOnlyCounts.NGO, 1);
  assert.equal(jobsOnlyCounts.Government, 0);
  assert.equal(jobsOnlyCounts.Internship, 1);
});
