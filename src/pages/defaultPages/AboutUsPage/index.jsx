import React from "react";
import { Box, Card, Grid, Stack, Typography } from "@mui/material";
import WorkOutlineIcon from '@mui/icons-material/WorkOutline';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';

import { TabTitle } from "../../../utils/generalFunction";
import AppIntroductionCard from "../../../components/AppIntroductionCard";
import MuiImageCustom from "../../../components/MuiImageCustom";
import { ABOUT_IMAGES, APP_NAME } from "../../../configs/constants";

const AboutUsPage = () => {
  TabTitle(`About us - Job introduction system ${APP_NAME}`);

  const features = [
    {
      title: "Choose the right job - Go in the right direction",
      icon: WorkOutlineIcon,
      description: "Discover jobs that match your career orientation. Detailed information about job requirements, environment and development opportunities at each company.",
      color: "primary.main"
    },
    {
      title: "Create CV & Profile",
      icon: PersonOutlineIcon,
      description: "Build a professional application profile with a smart CV creation tool. Optimize your profile with beautiful CV templates for each industry.",
      color: "primary.main"
    },
    {
      title: "Jobs around you",
      icon: LocationOnOutlinedIcon,
      description: "Find ideal job opportunities in the area. With smart positioning, suggest suitable jobs near where you live.",
      color: "primary.main"
    },
    {
      title: "Job notifications at all times",
      icon: NotificationsNoneIcon,
      description: "Don't miss out on opportunities with a smart notification system. Get instant information about new job positions that match your skills.",
      color: "primary.main"
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
          About us
        </Typography>
        <Typography
          sx={{
            maxWidth: "800px",
            margin: "0 auto",
            color: "text.secondary",
            lineHeight: 1.8,
          }}
        >
          {APP_NAME} - Recruitment and job information channel for all
          Businesses and Candidates. We believe in bringing "HOPE" to 
          Businesses seeking talent and for Candidates seeking career opportunities. 
          With 2 systems: Website for Employers and Application
          for Job Seekers, {APP_NAME} will bring new and exciting
          experiences; Connect all talents' dreams of finding their ideal job 
          and help businesses build strong teams.
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
                  position: 'relative',
                  overflow: 'visible',
                  transition: "all 0.3s ease-in-out",
                  backgroundColor: 'background.paper',
                  border: '1px solid',
                  borderColor: 'grey.100',
                  "&:hover": {
                    transform: "translateY(-8px)",
                    boxShadow: (theme) => theme.customShadows.card,
                    borderColor: 'primary.light',
                    backgroundColor: (theme) => `${theme.palette.primary.background}`,
                    "& .feature-icon": {
                      color: 'primary.light',
                      transform: "scale(1.1)",
                    }
                  },
                }}
              >
                <Box
                  sx={{
                    position: 'absolute',
                    top: -20,
                    left: 20,
                    backgroundColor: 'background.paper',
                    borderRadius: '12px',
                    p: 1.5,
                    boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
                  }}
                >
                  <feature.icon 
                    className="feature-icon"
                    sx={{
                      fontSize: 32,
                      transition: "all 0.3s ease-in-out",
                      color: 'grey.500'
                    }}
                  />
                </Box>
                <Box sx={{ mt: 2 }}>
                  <Typography
                    variant="h6"
                    sx={{
                      mb: 2,
                      color: 'grey.700',
                      fontWeight: 600,
                    }}
                  >
                    {feature.title}
                  </Typography>
                  <Typography 
                    sx={{ 
                      lineHeight: 1.7,
                      fontSize: '0.95rem',
                      color: 'grey.600',
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

      <Box sx={{ mt: 5 }}>
        <Card sx={{ p: 5 }}>
          <Stack
            direction={{
              xs: "column",
              sm: "column",
              md: "row",
              lg: "row",
              xl: "row",
            }}
            spacing={2}
          >
            <Box width="100%">
              <Box sx={{ height: 600 }}>
                <MuiImageCustom src={ABOUT_IMAGES.JOB_POST} />
              </Box>
            </Box>
            <Box>
              <Stack spacing={2}>
                <Typography
                  variant="h4"
                  style={{ color: "warning.main", fontSize: 30 }}
                >
                  Choose the right job - Go in the right direction
                </Typography>
                <Typography textAlign="justify" color="text.secondary">
                  Discover jobs that match your career orientation.
                </Typography>
                <Typography textAlign="justify" color="text.secondary">
                  We provide detailed information about job requirements, 
                  work environment and development opportunities at each company.
                </Typography>
                <Typography textAlign="justify" color="text.secondary">
                  Honest reviews from employees will help you get the most realistic view
                  before making important career decisions.
                </Typography>
              </Stack>
            </Box>
          </Stack>
        </Card>
      </Box>

      <Box sx={{ mt: 5 }}>
        <Card sx={{ p: 5 }}>
          <Stack
            direction={{
              xs: "column-reverse",
              sm: "column-reverse",
              md: "row",
              lg: "row",
              xl: "row",
            }}
            spacing={2}
          >
            <Box>
              <Stack spacing={2}>
                <Typography
                  variant="h4"
                  style={{ color: "warning.main", fontSize: 30 }}
                >
                  Create CV & Profile  
                </Typography>
                <Typography textAlign="justify" color="text.secondary">
                  Build a professional application profile with smart CV creation tools.
                </Typography>
                <Typography textAlign="justify" color="text.secondary">
                  Optimize your profile with beautiful CV templates suitable for
                  each industry.
                </Typography>
                <Typography textAlign="justify" color="text.secondary">
                  Easy to update and customize your CV according to employer requirements,
                  increasing chances of getting noticed and selected for desired positions.
                </Typography>
              </Stack>
            </Box>
            <Box width="100%">
              <Box sx={{ height: 600 }}>
                <MuiImageCustom src={ABOUT_IMAGES.PROFILE} />
              </Box>
            </Box>
          </Stack>
        </Card>
      </Box>

      <Box sx={{ mt: 5 }}>
        <Card sx={{ p: 5 }}>
          <Stack
            direction={{
              xs: "column",
              sm: "column",
              md: "row",
              lg: "row",
              xl: "row",
            }}
            spacing={2}
          >
            <Box width="100%">
              <Box sx={{ height: 600 }}>
                <MuiImageCustom src={ABOUT_IMAGES.AROUND_JOB_POST} />
              </Box>
            </Box>
            <Box>
              <Stack spacing={2}>
                <Typography
                  variant="h4"
                  style={{ color: "warning.main", fontSize: 30 }}
                >
                  Jobs around you
                </Typography>
                <Typography textAlign="justify" color="text.secondary">
                  Find ideal job opportunities in your area.
                </Typography>
                <Typography textAlign="justify" color="text.secondary">
                  Find ideal job opportunities in your area.
                </Typography>
                <Typography textAlign="justify" color="text.secondary">
                  With smart location features, we suggest suitable jobs
                  near where you live.
                </Typography>
                <Typography textAlign="justify" color="text.secondary">
                  Save commute time and enjoy work-life balance with job
                  opportunities within your desired radius.
                </Typography>
              </Stack>
            </Box>
          </Stack>
        </Card>
      </Box>

      <Box sx={{ mt: 5 }}>
        <Card sx={{ p: 5 }}>
          <Stack
            direction={{
              xs: "column-reverse",
              sm: "column-reverse",
              md: "row",
              lg: "row",
              xl: "row",
            }}
            spacing={2}
          >
            <Box>
              <Stack spacing={2}>
                <Typography
                  variant="h4"
                  style={{ color: "warning.main", fontSize: 30 }}
                >
                  Job notifications anytime
                </Typography>
                <Typography textAlign="justify" color="text.secondary">
                  Don't miss any opportunities with smart notification system.
                </Typography>
                <Typography textAlign="justify" color="text.secondary">
                  Get instant updates about new job positions matching your
                  skills and preferences.
                </Typography>
                <Typography textAlign="justify" color="text.secondary">
                  Customize notification criteria like salary, location,
                  industry to ensure you're always updated with the best
                  opportunities in the market.
                </Typography>
              </Stack>
            </Box>
            <Box width="100%">
              <Box sx={{ height: 600 }}>
                <MuiImageCustom src={ABOUT_IMAGES.JOB_POST_NOTIFICATION} />
              </Box>
            </Box>
          </Stack>
        </Card>
      </Box>

      <Box sx={{ mt: 5 }}>
        <AppIntroductionCard />
      </Box>
    </Box>
  );
};

export default AboutUsPage;
