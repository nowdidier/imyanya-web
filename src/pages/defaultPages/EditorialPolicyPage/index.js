import * as React from "react";
import { Box, Container, Stack, Typography } from "@mui/material";

import { TabTitle } from "../../../utils/generalFunction";
import { APP_NAME } from "../../../configs/constants";

const sections = [
  {
    title: "Our Editorial Approach",
    body:
      `${APP_NAME} publishes career advice articles, job-search guides, employer profiles, salary information, and industry insights to help Rwandan job seekers make informed career decisions. Every piece of editorial content is written or commissioned by our team with the goal of providing practical, accurate, and relevant information for candidates comparing opportunities in Kigali and across Rwanda.`,
  },
  {
    title: "Content Sources and Originality",
    body:
      "Career articles, guides, and advice pieces published on Imyanya are original works created by our editorial team. We do not copy or republish content from other sources without attribution. When we reference external data, statistics, or third-party research, we cite the source clearly within the article. Job listings on the platform are provided by employers or collected from publicly available announcements, and we add original context such as application tips and sector notes where possible.",
  },
  {
    title: "Editorial Independence",
    body:
      "Our editorial content is independent of employer relationships. Publishing a career article or guide does not imply endorsement of any specific employer, and no employer pays for coverage in our editorial sections. Sponsored or promotional content, if any, will be clearly labelled as such. Job listings are published separately from editorial content and do not influence our editorial decisions.",
  },
  {
    title: "Review Process",
    body:
      "Articles and guides are reviewed by at least one editor before publication. Reviews check for factual accuracy, clarity, relevance to the Rwandan job market, and compliance with our content standards. When articles contain time-sensitive information such as application deadlines or policy changes, we include the date of last review to help readers assess currency.",
  },
  {
    title: "Updates and Currency",
    body:
      "We review evergreen career articles periodically to ensure they remain accurate and relevant. Articles that contain time-sensitive information, such as scholarship guides or industry outlooks, include a 'last updated' date. Readers should verify critical details such as application deadlines or policy requirements with the official source before acting on them.",
  },
  {
    title: "User-Generated Content",
    body:
      "Registered users may submit reviews, comments, or other content on the platform. We reserve the right to moderate, edit, or remove user-generated content that violates our content standards, including inaccurate information, spam, hateful language, or promotional material. User-generated content reflects the views of the author and not those of Imyanya.",
  },
  {
    title: "Contact Our Editorial Team",
    body:
      `If you have questions about our editorial process, want to suggest a topic, or believe an article needs correction, please contact us through the contact page or email editorial@imyanya.rw. We welcome feedback from readers and job seekers.`,
  },
];

const EditorialPolicyPage = () => {
  TabTitle(`Editorial Policy | ${APP_NAME}`);

  return (
    <Container maxWidth="md">
      <Box sx={{ py: { xs: 4, md: 7 } }}>
        <Typography
          variant="h3"
          component="h1"
          fontWeight={800}
          sx={{ mb: 1 }}
        >
          Editorial Policy
        </Typography>
        <Typography
          color="text.secondary"
          sx={{ mb: 5, lineHeight: 1.7, maxWidth: 720 }}
        >
          How Imyanya creates, reviews, and maintains original career content
          for Rwandan job seekers.
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

export default EditorialPolicyPage;
