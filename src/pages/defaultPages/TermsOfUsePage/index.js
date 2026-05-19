import * as React from "react";
import { Box, Container, Stack, Typography } from "@mui/material";

import { TabTitle } from "../../../utils/generalFunction";
import { APP_NAME } from "../../../configs/constants";

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
            Last updated: May 19, 2026
          </Typography>
          <Typography>
            By using {APP_NAME}, you agree to use the platform lawfully and to
            provide accurate information when creating accounts, applying for
            jobs, posting jobs, or contacting other users.
          </Typography>
          <Typography variant="h5" component="h2" fontWeight={700}>
            Accounts
          </Typography>
          <Typography>
            You are responsible for keeping your login information secure and
            for activity under your account.
          </Typography>
          <Typography variant="h5" component="h2" fontWeight={700}>
            Job Posts and Applications
          </Typography>
          <Typography>
            Employers must publish accurate job information. Job seekers must
            submit truthful profile and application information.
          </Typography>
          <Typography variant="h5" component="h2" fontWeight={700}>
            Service Changes
          </Typography>
          <Typography>
            We may update, improve, or temporarily suspend parts of the service
            to maintain security and reliability.
          </Typography>
          <Typography variant="h5" component="h2" fontWeight={700}>
            Contact
          </Typography>
          <Typography>
            For questions about these terms, contact us at nowdidier@gmail.com.
          </Typography>
        </Stack>
      </Box>
    </Container>
  );
};

export default TermsOfUsePage;
