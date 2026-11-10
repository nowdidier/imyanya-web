import React from "react";
import { Box, Button, Card, Grid, Stack, Typography } from "@mui/material";
import LoginIcon from "@mui/icons-material/Login";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";

import { TabTitle } from "../../../utils/generalFunction";
import { getRedirectParam } from "../../../utils/funcUtils";
import { ROLES_NAME, ROUTES } from "../../../configs/constants";
import SeoBreadcrumbs from "../../../components/SeoBreadcrumbs";
import JobPostSearch from "../../components/defaults/JobPostSearch";
import SuggestedJobPostCard from "../../components/defaults/SuggestedJobPostCard";
import MainJobPostCard from "../../components/defaults/MainJobPostCard";
import OrganisationsMap from "../../../components/OrganisationsMap";
import AppIntroductionCard from "../../../components/AppIntroductionCard";
import MainJobRightBanner from "../../../components/MainJobRightBanner";
import HiringCTA from "../../../components/HiringCTA";
import NeedHelpSubscribe from "../../../components/NeedHelpSubscribe";

const JobPage = () => {
  TabTitle("Jobs in Rwanda | Imyanya");
  const nav = useNavigate();
  const location = useLocation();
  const { isAuthenticated, currentUser } = useSelector((state) => state.user);
  const isJobSeeker = isAuthenticated && currentUser?.roleName === ROLES_NAME.JOB_SEEKER;

  const handleSignIn = () => {
    nav(`/${ROUTES.AUTH.LOGIN}${getRedirectParam(location.pathname)}`);
  };

  return (
    <Box sx={{ mt: 2 }}>
      <SeoBreadcrumbs
        items={[{ label: "Home", href: "/" }, { label: "Jobs in Rwanda" }]}
      />
      <Typography variant="h3" component="h1" fontWeight={800} sx={{ mb: 0.5 }}>
        Jobs in Rwanda
      </Typography>
      <Typography
        color="text.secondary"
        sx={{ lineHeight: 1.7, maxWidth: 860, mb: 3 }}
      >
        Browse the latest job vacancies in Rwanda, including Kigali jobs, NGO roles,
        internships, and remote opportunities. Filter by career, location, and
        employment type, or explore{" "}
        <Typography component="a" href="/jobs-by-career" sx={{ color: "primary.main", textDecoration: "none", fontWeight: 600 }}>
          jobs by career
        </Typography>
        {", "}
        <Typography component="a" href="/jobs-by-location" sx={{ color: "primary.main", textDecoration: "none", fontWeight: 600 }}>
          jobs by location
        </Typography>
        {", "}
        <Typography component="a" href="/jobs-by-type" sx={{ color: "primary.main", textDecoration: "none", fontWeight: 600 }}>
          jobs by type
        </Typography>
        {", and "}
        <Typography component="a" href="/companies" sx={{ color: "primary.main", textDecoration: "none", fontWeight: 600 }}>
          companies hiring in Rwanda
        </Typography>
        .
      </Typography>

      {!isJobSeeker && (
        <Card
          variant="outlined"
          sx={{
            mb: 3,
            p: 2,
            borderRadius: 2,
            borderColor: "#d2e3fc",
            background: "linear-gradient(90deg, #f8fbff 0%, #ffffff 100%)",
          }}
        >
          <Stack
            direction={{ xs: "column", sm: "row" }}
            spacing={1.5}
            alignItems={{ xs: "stretch", sm: "center" }}
            justifyContent="space-between"
          >
            <Box>
              <Typography fontWeight={700} color="#202124">
                Ready to apply?
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {isAuthenticated
                  ? "Browse jobs and apply through Imyanya or the official website when available."
                  : "Sign in to apply on Imyanya. You can also apply through the official website when available."}
              </Typography>
            </Box>
            {!isAuthenticated && (
              <Button
                variant="contained"
                startIcon={<LoginIcon />}
                onClick={handleSignIn}
                sx={{
                  textTransform: "none",
                  fontWeight: 700,
                  borderRadius: "20px",
                  boxShadow: "none",
                  backgroundColor: "#1a73e8",
                  "&:hover": { backgroundColor: "#1b66c9", boxShadow: "none" },
                }}
              >
                Sign in to apply
              </Button>
            )}
          </Stack>
        </Card>
      )}

      <Box sx={{ mb: 4 }}>
        <OrganisationsMap
          compact
          hideFilters
          defaultShow="jobs"
          title="Jobs on the map"
          subtitle="Explore job locations across Rwanda. Click a pin to view open roles at that address."
        />
      </Box>

      <Box>
        <JobPostSearch />
      </Box>

      <Box sx={{ mt: 4 }}>
        <Grid container spacing={3}>
          <Grid item xs={12} lg={8}>
            <MainJobPostCard />
          </Grid>
          <Grid item xs={12} lg={4}>
            <Box sx={{ pt: 2, pb: 3 }}>
              <Typography variant="h5" fontWeight={700}>
                Suggested jobs
              </Typography>
            </Box>
            <SuggestedJobPostCard fullWidth />
            <HiringCTA variant="card" />
            <Box sx={{ mt: 2 }}>
              <NeedHelpSubscribe
                compact
                title="Need help applying?"
                subtitle="Subscribe for help with applications, CVs, or any job-related need."
                source="jobs-in-rwanda"
              />
            </Box>
            <Box sx={{ mt: 2 }}>
              <MainJobRightBanner />
            </Box>
          </Grid>
        </Grid>
      </Box>

      <Box sx={{ mt: 4 }}>
        <NeedHelpSubscribe
          title="Get help with anything you need"
          subtitle="Subscribe for help with job search, applications, interviews, CV writing, or employer support. We’ll follow up with you."
          source="jobs-in-rwanda-footer"
        />
      </Box>

      <Box sx={{ mt: 4 }}>
        <AppIntroductionCard />
      </Box>
    </Box>
  );
};

export default JobPage;
