import * as React from "react";
import { Box, Container, Stack, Typography } from "@mui/material";

import { TabTitle } from "../../../utils/generalFunction";
import { APP_NAME } from "../../../configs/constants";

const sections = [
  {
    title: "Accounts",
    body:
      "You are responsible for keeping your login information secure and for activity under your account. Provide accurate account details and update your contact information when it changes.",
  },
  {
    title: "Job Posts and Applications",
    body:
      "Employers must publish accurate job information, including role responsibilities, requirements, location, work type, deadline, and application process where available. Job seekers must submit truthful profile, CV, and application information.",
  },
  {
    title: "Content Standards",
    body:
      "Do not post illegal, misleading, copied, discriminatory, hateful, adult, dangerous, fraudulent, or spam content. Do not impersonate another person or organization, publish jobs that require unlawful payments, or use Imyanya to collect information under false pretenses.",
  },
  {
    title: "Third-Party Links and References",
    body:
      "Some pages may include links to employer websites, social channels, app stores, or other third-party resources for convenience. Third-party sites control their own content and practices, so review their details carefully before sharing information or applying.",
  },
  {
    title: "No Hiring Guarantee",
    body:
      "Imyanya provides recruitment tools, job discovery, and career information. We do not guarantee interviews, job offers, candidate availability, employer decisions, salary terms, or the outcome of any recruitment process.",
  },
  {
    title: "Advertising and Site Experience",
    body:
      "Advertising may appear on public content pages. We aim to keep ads separate from navigation, account actions, and recruitment workflows so visitors can read content and use the site without confusion.",
  },
  {
    title: "Service Changes",
    body:
      "We may update, improve, limit, or temporarily suspend parts of the service to maintain security, reliability, content quality, and compliance with applicable policies.",
  },
];

const TermsOfUsePage = () => {
  TabTitle(`Terms of Use | ${APP_NAME}`);

  return (
    <Container maxWidth="md">
      <Box sx={{ py: { xs: 4, md: 7 } }}>
        <Stack spacing={3}>
          <Typography variant="h3" component="h1" fontWeight={700}>
            Terms of Use
          </Typography>
          <Typography color="text.secondary">
            Last updated: July 14, 2026
          </Typography>
          <Typography sx={{ lineHeight: 1.75 }}>
            By using {APP_NAME}, you agree to use the platform lawfully and to
            provide accurate information when creating accounts, applying for
            jobs, posting jobs, contacting users, or using recruitment tools.
          </Typography>

          {sections.map((section) => (
            <Box key={section.title}>
              <Typography variant="h5" component="h2" fontWeight={700} gutterBottom>
                {section.title}
              </Typography>
              <Typography sx={{ lineHeight: 1.75 }}>
                {section.body}
              </Typography>
            </Box>
          ))}

          <Box>
            <Typography variant="h5" component="h2" fontWeight={700} gutterBottom>
              Contact
            </Typography>
            <Typography sx={{ lineHeight: 1.75 }}>
              For questions about these terms, content concerns, or suspected
              misuse of the platform, contact us at nowdidier@gmail.com.
            </Typography>
          </Box>
        </Stack>
      </Box>
    </Container>
  );
};

export default TermsOfUsePage;
