import * as React from "react";
import { Box, Container, Stack, Typography } from "@mui/material";

import { TabTitle } from "../../../utils/generalFunction";
import { APP_NAME } from "../../../configs/constants";

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
            Last updated: May 19, 2026
          </Typography>
          <Typography>
            {APP_NAME} helps job seekers find opportunities and helps employers
            recruit candidates in Rwanda. This policy explains how we collect,
            use, and protect information when you use our website and
            authentication services.
          </Typography>
          <Typography variant="h5" component="h2" fontWeight={700}>
            Information We Collect
          </Typography>
          <Typography>
            We may collect account information such as your name, email address,
            role, profile details, resume information, job applications, company
            details, and messages you submit through the platform. If you use
            Google or Facebook sign-in, we receive the account information needed
            to authenticate you, such as your email address and public profile
            identifier.
          </Typography>
          <Typography variant="h5" component="h2" fontWeight={700}>
            How We Use Information
          </Typography>
          <Typography>
            We use information to create and secure accounts, match job seekers
            with job opportunities, help employers manage recruitment, provide
            support, prevent abuse, and improve the service.
          </Typography>
          <Typography variant="h5" component="h2" fontWeight={700}>
            Sharing
          </Typography>
          <Typography>
            Profile and application information may be shared with employers or
            job seekers as part of the recruitment workflow. We do not sell
            personal information.
          </Typography>
          <Typography variant="h5" component="h2" fontWeight={700}>
            Contact
          </Typography>
          <Typography>
            For privacy questions or account requests, contact us at
            nowdidier@gmail.com.
          </Typography>
        </Stack>
      </Box>
    </Container>
  );
};

export default PrivacyPolicyPage;
