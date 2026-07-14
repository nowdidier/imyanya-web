import * as React from "react";
import { Box, Container, Link, Stack, Typography } from "@mui/material";

import { TabTitle } from "../../../utils/generalFunction";
import { APP_NAME } from "../../../configs/constants";

const sections = [
  {
    title: "Information We Collect",
    body:
      "We may collect account information such as your name, email address, role, phone number, profile details, resume information, job applications, company details, messages, saved jobs, and support requests. If you use Google or Facebook sign-in, we receive the account information needed to authenticate you, such as your email address and public profile identifier.",
  },
  {
    title: "How We Use Information",
    body:
      "We use information to create and secure accounts, match job seekers with opportunities, help employers manage recruitment, send service notifications, respond to support requests, prevent abuse, maintain platform reliability, and improve job-search and hiring workflows.",
  },
  {
    title: "Sharing During Recruitment",
    body:
      "Profile and application information may be shared with employers or job seekers as part of the recruitment workflow. For example, a job seeker profile may be visible to an employer reviewing applicants, and employer company information may be shown to candidates. We do not sell personal information.",
  },
  {
    title: "Advertising, Cookies, and Analytics",
    body:
      "We may use Google AdSense, Google advertising services, analytics tools, cookies, web beacons, IP addresses, browser identifiers, and similar technologies to operate the site, understand traffic, protect the service, and show or measure ads. Third parties, including Google, may place and read cookies on your browser or use web beacons and IP addresses as a result of ad serving on Imyanya.",
  },
  {
    title: "Your Choices",
    body:
      "You can use browser controls to block or delete cookies. If a feature requires cookies for sign-in, security, or session management, blocking cookies may limit how that feature works. Where consent is required by law for advertising or analytics cookies, we aim to request and respect that consent.",
  },
  {
    title: "Data Security and Retention",
    body:
      "We use reasonable technical and organizational measures to protect account and recruitment data. We keep information for as long as needed to provide the service, comply with legal obligations, resolve disputes, prevent abuse, and maintain accurate recruitment records.",
  },
  {
    title: "Children",
    body:
      "Imyanya is a recruitment platform for job seekers and employers. It is not directed to children under 13. If you believe a child has provided personal information, contact us so we can review and remove it where appropriate.",
  },
];

const PrivacyPolicyPage = () => {
  TabTitle(`Privacy Policy | ${APP_NAME}`);

  return (
    <Container maxWidth="md">
      <Box sx={{ py: { xs: 4, md: 7 } }}>
        <Stack spacing={3}>
          <Typography variant="h3" component="h1" fontWeight={700}>
            Privacy Policy
          </Typography>
          <Typography color="text.secondary">
            Last updated: July 14, 2026
          </Typography>
          <Typography sx={{ lineHeight: 1.75 }}>
            {APP_NAME} helps job seekers find opportunities and helps employers
            recruit candidates in Rwanda. This policy explains how we collect,
            use, share, and protect information when you use our website,
            authentication services, recruitment tools, advertising, and support
            channels.
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
              Google Advertising Disclosure
            </Typography>
            <Typography sx={{ lineHeight: 1.75 }}>
              Google explains how it uses data when users visit partner sites at{" "}
              <Link
                href="https://policies.google.com/technologies/partner-sites"
                target="_blank"
                rel="noopener noreferrer"
              >
                policies.google.com/technologies/partner-sites
              </Link>
              . You can also review Google ad settings and browser controls to
              manage personalized advertising choices.
            </Typography>
          </Box>

          <Box>
            <Typography variant="h5" component="h2" fontWeight={700} gutterBottom>
              Contact
            </Typography>
            <Typography sx={{ lineHeight: 1.75 }}>
              For privacy questions, account correction requests, or data
              deletion requests, contact us at nowdidier@gmail.com.
            </Typography>
          </Box>
        </Stack>
      </Box>
    </Container>
  );
};

export default PrivacyPolicyPage;
