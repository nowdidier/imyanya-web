import React from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Grid,
  Link,
  Stack,
  Typography,
} from "@mui/material";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";
import WorkOutlineIcon from "@mui/icons-material/WorkOutline";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";

import { TabTitle } from "../../../utils/generalFunction";
import {
  APP_NAME,
  HOST_NAME,
  ROUTES,
  getWhatsAppContactUrl,
} from "../../../configs/constants";
import {
  useEmployerHelp,
  useHelpToApply,
} from "../../../components/HelpToApply";

const supportAreas = [
  {
    title: "Job seeker support",
    body:
      "Ask for help with account access, profile updates, CV uploads, saved jobs, applications, notifications, and messages with employers.",
    icon: <WorkOutlineIcon color="primary" />,
  },
  {
    title: "Employer support",
    body:
      "Employers can contact us about company profiles, job post visibility, applicant management, candidate search, and recruitment account access.",
    icon: <HelpOutlineOutlinedIcon color="primary" />,
  },
  {
    title: "Privacy and policy requests",
    body:
      "Use email for privacy questions, account correction requests, content concerns, or reports about suspicious job posts.",
    icon: <EmailOutlinedIcon color="primary" />,
  },
];

const ContactPage = () => {
  TabTitle(`Contact ${APP_NAME} | Rwanda Job Platform Support`);
  const { openHelp } = useHelpToApply();
  const { openEmployerHelp } = useEmployerHelp();
  const employerOrigin = `https://${HOST_NAME.EMPLOYER_MYJOB}`;

  const handleOpenHelp = () =>
    openHelp({
      source: "contact",
    });

  const handleOpenEmployerHelp = () =>
    openEmployerHelp({
      source: "contact",
    });

  return (
    <Container maxWidth="lg">
      <Box sx={{ py: { xs: 4, md: 7 } }}>
        <Stack spacing={2} sx={{ maxWidth: 880, mb: 5 }}>
          <Typography variant="h3" component="h1" fontWeight={800}>
            Contact {APP_NAME}
          </Typography>
          <Typography variant="h6" color="text.secondary" sx={{ lineHeight: 1.75 }}>
            We support job seekers and employers using Imyanya for Rwanda job
            discovery, applications, recruitment, and account management.
          </Typography>
        </Stack>

        <Grid container spacing={3}>
          <Grid item xs={12} md={5}>
            <Card variant="outlined" sx={{ height: "100%", borderRadius: 1 }}>
              <CardContent>
                <Typography variant="h5" component="h2" fontWeight={700} gutterBottom>
                  Main Contact
                </Typography>
                <Stack spacing={2}>
                  <Box>
                    <Typography fontWeight={700}>Email</Typography>
                    <Link href="mailto:nowdidier@gmail.com" underline="hover">
                      nowdidier@gmail.com
                    </Link>
                  </Box>
                  <Box>
                    <Typography fontWeight={700}>WhatsApp</Typography>
                    <Link
                      href={getWhatsAppContactUrl()}
                      target="_blank"
                      rel="noopener noreferrer"
                      underline="hover"
                    >
                      Join our WhatsApp group
                    </Link>
                  </Box>
                  <Typography color="text.secondary" sx={{ lineHeight: 1.75 }}>
                    Include your account email, the job or company name, and a
                    short description of the issue so we can route the request.
                  </Typography>
                  <Box>
                    <Typography fontWeight={700}>
                      Need help applying? (Nkeneye ubufasha bwo gusaba)
                    </Typography>
                    <Typography color="text.secondary" sx={{ lineHeight: 1.75, mb: 1 }}>
                      We can write your CV or letter and submit your application
                      for any job on Imyanya — Submit only (1,000 RWF), Letter +
                      submit (2,000 RWF) or CV + letter + submit (3,000 RWF).
                    </Typography>
                    <Button
                      variant="outlined"
                      size="small"
                      color="success"
                      startIcon={<WhatsAppIcon />}
                      onClick={handleOpenHelp}
                      sx={{ textTransform: "none", fontWeight: 700 }}
                    >
                      Nkeneye ubufasha bwo gusaba
                    </Button>
                  </Box>
                  <Box>
                    <Typography fontWeight={700}>
                      Need help hiring? (Dukeneye gufashwa gushaka umukozi)
                    </Typography>
                    <Typography color="text.secondary" sx={{ lineHeight: 1.75, mb: 1 }}>
                      We post your job for you (5,000 RWF), write the job
                      description and post it (10,000 RWF), send up to 5
                      shortlisted CVs (25,000 RWF), or run full recruitment
                      (negotiated, 50% deposit before we start).
                    </Typography>
                    <Button
                      variant="outlined"
                      size="small"
                      color="primary"
                      startIcon={<WhatsAppIcon />}
                      onClick={handleOpenEmployerHelp}
                      sx={{ textTransform: "none", fontWeight: 700 }}
                    >
                      Dukeneye gufashwa gushaka umukozi
                    </Button>
                    <Typography variant="caption" display="block" sx={{ mt: 1 }}>
                      <Link
                        href={`${employerOrigin}/${ROUTES.EMPLOYER.PRICING}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        underline="hover"
                      >
                        For employers — pricing and services
                      </Link>
                    </Typography>
                  </Box>
                </Stack>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={7}>
            <Grid container spacing={2}>
              {supportAreas.map((item) => (
                <Grid item xs={12} key={item.title}>
                  <Card variant="outlined" sx={{ borderRadius: 1 }}>
                    <CardContent>
                      <Stack direction="row" spacing={1.5} alignItems="flex-start">
                        {item.icon}
                        <Box>
                          <Typography variant="h6" component="h2" fontWeight={700}>
                            {item.title}
                          </Typography>
                          <Typography color="text.secondary" sx={{ lineHeight: 1.7 }}>
                            {item.body}
                          </Typography>
                        </Box>
                      </Stack>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default ContactPage;
