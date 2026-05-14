import React from "react";
import { Box, Card, Grid, Stack, Typography } from "@mui/material";
import WorkOutlineIcon from "@mui/icons-material/WorkOutline";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";

import { TabTitle } from "../../../utils/generalFunction";
import AppIntroductionCard from "../../../components/AppIntroductionCard";
import MuiImageCustom from "../../../components/MuiImageCustom";
import { ABOUT_IMAGES, APP_NAME } from "../../../configs/constants";

const AboutUsPage = () => {
  TabTitle(`About Us - Job referral system ${APP_NAME}`);

  const features = [
    {
      title: "Choose the Right Job - Move in the Right Direction",
      icon: WorkOutlineIcon,
      description:
        "Discover jobs that match your career direction, with clear information about requirements, work environment, and growth opportunities.",
    },
    {
      title: "Create CV & Profile",
      icon: PersonOutlineIcon,
      description:
        "Build a professional application profile with smart CV tools and polished templates for each career field.",
    },
    {
      title: "Jobs Near You",
      icon: LocationOnOutlinedIcon,
      description:
        "Search for ideal job opportunities in your area and find matching roles near where you live.",
    },
    {
      title: "Job Notifications Anytime",
      icon: NotificationsNoneIcon,
      description:
        "Get instant updates about new job positions that match your skills, goals, and preferred criteria.",
    },
  ];

  const sections = [
    {
      title: "Choose the Right Job - Move in the Right Direction",
      image: ABOUT_IMAGES.JOB_POST,
      reverse: false,
      lines: [
        "Discover jobs that match your career direction.",
        "We provide clear information about job requirements, work environment, and growth opportunities at each company.",
        "Authentic employee ratings help you make confident career decisions.",
      ],
    },
    {
      title: "Create CV & Profile",
      image: ABOUT_IMAGES.PROFILE,
      reverse: true,
      lines: [
        "Build a professional application profile with smart CV tools.",
        "Optimize your profile with polished CV templates for each career field.",
        "Easily update your CV for employer requirements and increase your chance of being noticed.",
      ],
    },
    {
      title: "Jobs Near You",
      image: ABOUT_IMAGES.AROUND_JOB_POST,
      reverse: false,
      lines: [
        "Search for ideal job opportunities in your area.",
        "With smart location features, we suggest matching jobs near where you live.",
        "Save commuting time and find opportunities inside your preferred radius.",
      ],
    },
    {
      title: "Job Notifications Anytime",
      image: ABOUT_IMAGES.JOB_POST_NOTIFICATION,
      reverse: true,
      lines: [
        "Never miss an opportunity with smart notifications.",
        "Receive instant updates about new job positions that match your skills and goals.",
        "Customize criteria such as salary, location, and career field to stay updated on the best opportunities.",
      ],
    },
  ];

  return (
    <Box sx={{ maxWidth: "1200px", margin: "0 auto", py: 5, px: 3 }}>
      <Box sx={{ mb: 6, textAlign: "center" }}>
        <Typography
          variant="h3"
          sx={{
            mb: 2,
            background: (theme) => theme.palette.primary.gradient,
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            fontWeight: 700,
          }}
        >
          About Us
        </Typography>
        <Typography
          sx={{
            maxWidth: "800px",
            margin: "0 auto",
            color: "text.secondary",
            lineHeight: 1.8,
          }}
        >
          {APP_NAME} is a recruitment and job information channel for
          businesses and candidates. We help employers find talent and help
          candidates find meaningful career opportunities.
        </Typography>
      </Box>

      <Box sx={{ mb: 8 }}>
        <Grid container spacing={4}>
          {features.map((feature, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Card
                sx={{
                  height: "100%",
                  p: 3,
                  position: "relative",
                  overflow: "visible",
                  transition: "all 0.3s ease-in-out",
                  backgroundColor: "background.paper",
                  border: "1px solid",
                  borderColor: "grey.100",
                  "&:hover": {
                    transform: "translateY(-8px)",
                    boxShadow: (theme) => theme.customShadows.card,
                    borderColor: "primary.light",
                    backgroundColor: (theme) =>
                      `${theme.palette.primary.background}`,
                    "& .feature-icon": {
                      color: "primary.light",
                      transform: "scale(1.1)",
                    },
                  },
                }}
              >
                <Box
                  sx={{
                    position: "absolute",
                    top: -20,
                    left: 20,
                    backgroundColor: "background.paper",
                    borderRadius: "12px",
                    p: 1.5,
                    boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
                  }}
                >
                  <feature.icon
                    className="feature-icon"
                    sx={{
                      fontSize: 32,
                      transition: "all 0.3s ease-in-out",
                      color: "grey.500",
                    }}
                  />
                </Box>
                <Box sx={{ mt: 2 }}>
                  <Typography
                    variant="h6"
                    sx={{
                      mb: 2,
                      color: "grey.700",
                      fontWeight: 600,
                    }}
                  >
                    {feature.title}
                  </Typography>
                  <Typography
                    sx={{
                      lineHeight: 1.7,
                      fontSize: "0.95rem",
                      color: "grey.600",
                    }}
                  >
                    {feature.description}
                  </Typography>
                </Box>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>

      <Typography
        variant="h4"
        sx={{
          mb: 4,
          textAlign: "center",
          background: (theme) => theme.palette.primary.gradient,
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          fontWeight: 700,
        }}
      >
        Mobile App {APP_NAME}
      </Typography>

      {sections.map((section) => (
        <Box sx={{ mt: 5 }} key={section.title}>
          <Card sx={{ p: 5 }}>
            <Stack
              direction={{
                xs: section.reverse ? "column-reverse" : "column",
                sm: section.reverse ? "column-reverse" : "column",
                md: section.reverse ? "row" : "row",
              }}
              spacing={2}
            >
              {!section.reverse && (
                <Box width="100%">
                  <Box sx={{ height: 600 }}>
                    <MuiImageCustom src={section.image} />
                  </Box>
                </Box>
              )}
              <Box>
                <Stack spacing={2}>
                  <Typography
                    variant="h4"
                    style={{ color: "warning.main", fontSize: 30 }}
                  >
                    {section.title}
                  </Typography>
                  {section.lines.map((line) => (
                    <Typography
                      key={line}
                      textAlign="justify"
                      color="text.secondary"
                    >
                      {line}
                    </Typography>
                  ))}
                </Stack>
              </Box>
              {section.reverse && (
                <Box width="100%">
                  <Box sx={{ height: 600 }}>
                    <MuiImageCustom src={section.image} />
                  </Box>
                </Box>
              )}
            </Stack>
          </Card>
        </Box>
      ))}

      <Box sx={{ mt: 5 }}>
        <AppIntroductionCard />
      </Box>
    </Box>
  );
};

export default AboutUsPage;
