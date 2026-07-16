import * as React from "react";
import { Box, Container, Stack, Typography } from "@mui/material";

import { TabTitle } from "../../../utils/generalFunction";
import { APP_NAME } from "../../../configs/constants";

const sections = [
  {
    title: "Our Commitment to Accuracy",
    body:
      `${APP_NAME} is committed to publishing accurate and reliable career information for Rwandan job seekers. Despite our editorial review process, errors can occur. This policy explains how we handle corrections when mistakes are identified in our editorial content.`,
  },
  {
    title: "How to Report an Error",
    body:
      `If you find an error in any of our career articles, guides, employer profiles, or other editorial content, please contact us through the contact page or email corrections@imyanya.rw. Include the page URL, a description of the error, and the correct information if known. We aim to respond to correction requests within five business days.`,
  },
  {
    title: "Types of Corrections",
    body:
      "Minor errors such as typos, spelling mistakes, or formatting issues are corrected silently without a public notice. Factual errors, including incorrect dates, statistics, salary figures, or policy descriptions, are corrected promptly. For significant factual errors that could mislead readers, we add a correction notice at the top or bottom of the article explaining what was changed and when.",
  },
  {
    title: "Correction Notices",
    body:
      "When a substantial correction is made to an article, we append a note in the following format: 'Correction: [date] — A previous version of this article incorrectly stated [original claim]. It has been corrected to [corrected information].' This notice remains on the article for at least 30 days after the correction.",
  },
  {
    title: "Job Listing Corrections",
    body:
      "Job listings are provided by employers or collected from public announcements. If a listing contains inaccurate information, users should contact the employer directly or report the listing through the platform. We will review reported listings and remove or update them as appropriate. Significant inaccuracies in job listings may result in the listing being removed from the platform.",
  },
  {
    title: "Retractions",
    body:
      "In rare cases where an article contains a fundamental error that cannot be corrected through revision, we may retract the article entirely. Retracted articles are removed from public view, and a notice explaining the retraction is published in its place. Retractions are reserved for cases involving serious inaccuracies, plagiarism, or content that violates our editorial standards.",
  },
  {
    title: "Update History",
    body:
      "Articles that have been significantly updated include a 'last updated' date at the bottom of the page. Readers can compare the current version with the original publication date to assess how recent the information is.",
  },
];

const CorrectionPolicyPage = () => {
  TabTitle(`Correction Policy | ${APP_NAME}`);

  return (
    <Container maxWidth="md">
      <Box sx={{ py: { xs: 4, md: 7 } }}>
        <Typography
          variant="h3"
          component="h1"
          fontWeight={800}
          sx={{ mb: 1 }}
        >
          Correction Policy
        </Typography>
        <Typography
          color="text.secondary"
          sx={{ mb: 5, lineHeight: 1.7, maxWidth: 720 }}
        >
          How Imyanya handles errors, corrections, and updates in its editorial
          content.
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

export default CorrectionPolicyPage;
