import * as React from "react";
import { Box, Container, Stack, Typography } from "@mui/material";

import { TabTitle } from "../../../utils/generalFunction";
import { APP_NAME } from "../../../configs/constants";

const sections = [
  {
    title: "How We Handle Job Listings",
    body:
      `${APP_NAME} publishes job listings from employers operating in Rwanda. Listings may be submitted directly by employers through our platform or collected from publicly available sources such as company career pages and government announcements. We encourage employers to provide accurate and complete information, but we do not independently verify every detail of every listing before publication.`,
  },
  {
    title: "Listing Verification Steps",
    body:
      "When a listing is submitted directly by an employer through our platform, we review it for completeness and clarity. We check that the listing includes a valid job title, location, and application method. Listings that appear incomplete, misleading, or inconsistent with our content standards may be rejected or removed. For listings collected from public sources, we include a note directing users to the original announcement for verification.",
  },
  {
    title: "Reporting Suspicious Listings",
    body:
      "Job seekers who encounter a listing that appears fraudulent, misleading, or otherwise suspicious should report it immediately through the platform or by emailing report@imyanya.rw. We investigate all reports and take appropriate action, which may include removing the listing, contacting the employer, or referring the matter to relevant authorities such as the Rwanda National Police or the Rwanda Investigation Bureau.",
  },
  {
    title: "Red Flags We Watch For",
    body:
      "We monitor listings for common warning signs, including requests for payment from applicants, unrealistic salary offers for the role or industry, vague job descriptions with no specific requirements, employers who refuse to provide verifiable contact information, and listings that pressure candidates to act immediately. Users are encouraged to remain cautious and report any listing that seems suspicious.",
  },
  {
    title: "Employer Verification",
    body:
      "Employers who register on Imyanya are required to provide basic company information. We may verify employer identity through official business registration documents, company website verification, or direct contact. Verified employers are marked where appropriate. The absence of a verification badge does not necessarily indicate a listing is fraudulent, but users should exercise additional caution with unverified listings.",
  },
  {
    title: "Limitations",
    body:
      "While we take reasonable steps to ensure the quality of job listings on our platform, we cannot guarantee the accuracy, completeness, or legitimacy of every listing. Job seekers should conduct their own research before applying, including verifying the employer's identity and reviewing the terms of any job offer independently. Imyanya is not responsible for the outcome of any application or hiring decision.",
  },
  {
    title: "User Responsibility",
    body:
      "Job seekers are encouraged to read job listings carefully, research employers before sharing personal information, and never send money or payment details as part of a job application. If an offer seems too good to be true, it probably is. Trust your instincts and report anything that feels wrong.",
  },
];

const VerificationPolicyPage = () => {
  TabTitle(`Content Verification Policy | ${APP_NAME}`);

  return (
    <Container maxWidth="md">
      <Box sx={{ py: { xs: 4, md: 7 } }}>
        <Typography
          variant="h3"
          component="h1"
          fontWeight={800}
          sx={{ mb: 1 }}
        >
          Content Verification Policy
        </Typography>
        <Typography
          color="text.secondary"
          sx={{ mb: 5, lineHeight: 1.7, maxWidth: 720 }}
        >
          How Imyanya approaches the accuracy and reliability of job listings
          and platform content.
        </Typography>

        <Stack spacing={4}>
          {sections.map((section) => (
            <Box key={section.title}>
              <Typography
                variant="h5"
                component="h2"
                fontWeight={700}
                sx={{ mb: 1.5 }}
              >
                {section.title}
              </Typography>
              <Typography
                color="text.secondary"
                sx={{ lineHeight: 1.8 }}
              >
                {section.body}
              </Typography>
            </Box>
          ))}
        </Stack>

        <Typography
          color="text.secondary"
          variant="body2"
          sx={{ mt: 6, fontStyle: "italic" }}
        >
          Last updated: July 2026
        </Typography>
      </Box>
    </Container>
  );
};

export default VerificationPolicyPage;
