import React from "react";
import { Box, Button, Card, Grid, Stack, Typography } from "@mui/material";
import WorkOutlineIcon from "@mui/icons-material/WorkOutline";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import { Link as RouterLink } from "react-router-dom";

import { TabTitle } from "../../../utils/generalFunction";
import AppIntroductionCard from "../../../components/AppIntroductionCard";
import SeoBreadcrumbs from "../../../components/SeoBreadcrumbs";
import { APP_NAME, ROUTES } from "../../../configs/constants";

const AboutUsPage = () => {
  TabTitle(`About ${APP_NAME} | Jobs and Career Opportunities in Rwanda`);

  const features = [
    {
      title: "Find the right opportunities",
      icon: WorkOutlineIcon,
      description:
        "Search jobs in Rwanda by career, location, and work type with clear information to help you apply confidently.",
    },
    {
      title: "Build a strong profile",
      icon: PersonOutlineIcon,
      description:
        "Create and improve your CV/profile so employers can quickly understand your skills and experience.",
    },
    {
      title: "Explore jobs near you",
      icon: LocationOnOutlinedIcon,
      description:
        "Discover opportunities across Kigali and other regions in Rwanda that match your goals and availability.",
    },
    {
      title: "Stay updated",
      icon: NotificationsNoneIcon,
      description:
        "Get timely updates and keep track of relevant opportunities, companies, and career resources.",
    },
  ];

  const contentStandards = [
    {
      title: "Rwanda-focused job information",
      description:
        "We help candidates compare opportunities across Rwanda with practical guidance on applications, locations, categories, and employers.",
    },
    {
      title: "Clear tools for job seekers and employers",
      description:
        "Job seekers can prepare profiles and apply, while employers can publish roles, review applicants, and connect with talent.",
    },
    {
      title: "Trust and safety",
      description:
        "We encourage users to review job details carefully and report suspicious listings or unclear requests.",
    },
  ];

  return (
    <Box sx={{ maxWidth: "1100px", margin: "0 auto", py: 5, px: 3 }}>
      <SeoBreadcrumbs
        items={[{ label: "Home", href: "/" }, { label: "About us" }]}
      />

      <Box sx={{ mb: 5 }}>
        <Typography variant="h3" component="h1" fontWeight={800} sx={{ mb: 1.5, color: "#202124" }}>
          About {APP_NAME}
        </Typography>
        <Typography sx={{ maxWidth: 860, color: "text.secondary", lineHeight: 1.8 }}>
          {APP_NAME} helps people find jobs and career opportunities in Rwanda while enabling
          employers to reach qualified candidates. Our goal is to make job search, applications,
          and hiring simpler, faster, and more accessible.
        </Typography>
        <Stack direction={{ xs: "column", sm: "row" }} spacing={1.5} sx={{ mt: 2.5 }}>
          <Button
            component={RouterLink}
            to={`/${ROUTES.JOB_SEEKER.JOBS_EN}`}
            variant="contained"
            sx={{ textTransform: "none", fontWeight: 700, borderRadius: "20px", boxShadow: "none" }}
          >
            Browse jobs in Rwanda
          </Button>
          <Button
            component={RouterLink}
            to={`/${ROUTES.JOB_SEEKER.COMPANY_EN}`}
            variant="outlined"
            sx={{ textTransform: "none", fontWeight: 700, borderRadius: "20px" }}
          >
            Explore companies
          </Button>
        </Stack>
      </Box>

      <Box sx={{ mb: 6 }}>
        <Typography variant="h4" component="h2" fontWeight={700} sx={{ mb: 2.5 }}>
          What we do
        </Typography>
        <Grid container spacing={3}>
          {contentStandards.map((item) => (
            <Grid item xs={12} md={4} key={item.title}>
              <Card variant="outlined" sx={{ height: "100%", p: 3, borderRadius: 2 }}>
                <Typography variant="h6" fontWeight={700} sx={{ mb: 1 }}>
                  {item.title}
                </Typography>
                <Typography color="text.secondary" sx={{ lineHeight: 1.75 }}>
                  {item.description}
                </Typography>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>

      <Box sx={{ mb: 6 }}>
        <Typography variant="h4" component="h2" fontWeight={700} sx={{ mb: 2.5 }}>
          How {APP_NAME} helps
        </Typography>
        <Grid container spacing={3}>
          {features.map((feature) => (
            <Grid item xs={12} sm={6} md={3} key={feature.title}>
              <Card variant="outlined" sx={{ height: "100%", p: 2.5, borderRadius: 2 }}>
                <Box
                  sx={{
                    width: 44,
                    height: 44,
                    borderRadius: 2,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    bgcolor: "primary.background",
                    color: "primary.main",
                    mb: 1.5,
                  }}
                >
                  <feature.icon />
                </Box>
                <Typography variant="h6" sx={{ mb: 1, fontSize: "1.05rem", fontWeight: 700 }}>
                  {feature.title}
                </Typography>
                <Typography color="text.secondary" sx={{ lineHeight: 1.7, fontSize: "0.95rem" }}>
                  {feature.description}
                </Typography>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>

      <Card variant="outlined" sx={{ p: 3, borderRadius: 2, mb: 4, bgcolor: "#f8fbff", borderColor: "#d2e3fc" }}>
        <Typography variant="h5" fontWeight={700} sx={{ mb: 1 }}>
          Get started
        </Typography>
        <Typography color="text.secondary" sx={{ mb: 2, lineHeight: 1.7 }}>
          Browse current opportunities, explore companies hiring in Rwanda, and use our career tools to prepare strong applications.
        </Typography>
        <Stack direction={{ xs: "column", sm: "row" }} spacing={1.5}>
          <Button component={RouterLink} to={`/${ROUTES.JOB_SEEKER.JOBS_EN}`} variant="contained" sx={{ textTransform: "none", fontWeight: 700, borderRadius: "20px", boxShadow: "none" }}>
            Find jobs
          </Button>
          <Button component={RouterLink} to={`/${ROUTES.JOB_SEEKER.CAREER_GUIDE}`} variant="outlined" sx={{ textTransform: "none", fontWeight: 700, borderRadius: "20px" }}>
            Career guide
          </Button>
          <Button component={RouterLink} to={`/${ROUTES.JOB_SEEKER.CAREER_TOOLS}`} variant="outlined" sx={{ textTransform: "none", fontWeight: 700, borderRadius: "20px" }}>
            Career tools
          </Button>
        </Stack>
      </Card>

      <Box sx={{ mt: 2 }}>
        <AppIntroductionCard />
      </Box>
    </Box>
  );
};

export default AboutUsPage;
