import * as React from "react";
import { useNavigate, Link as RouterLink } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  Avatar,
  Box,
  Card,
  CardContent,
  CardHeader,
  Chip,
  Grid,
  Link,
  Stack,
  Typography,
  Button,
} from "@mui/material";

import AccessTimeIcon from "@mui/icons-material/AccessTime";
import TipsAndUpdatesIcon from "@mui/icons-material/TipsAndUpdates";
import SearchIcon from "@mui/icons-material/Search";

import { TabTitle } from "../../../utils/generalFunction";
import {
  ROLES_NAME,
  ROUTES,
  APP_NAME,
  LINKS,
} from "../../../configs/constants";
import { rwandaJobSearchSteps } from "../../../data/rwandaCareerContent";
import HomeSearch from "../../components/defaults/HomeSearch";
import TopCompanyCarousel from "../../../components/TopCompanyCarousel";
import CareerCarousel from "../../../components/CareerCarousel";
import FeedbackCarousel from "../../../components/FeedbackCarousel";
import JobByCategory from "../../components/defaults/JobByCategory";
import FilterJobPostCard from "../../components/defaults/FilterJobPostCard";
import SuggestedJobPostCard from "../../components/defaults/SuggestedJobPostCard";
import YouTubeVideoSection from "../../../components/YouTubeVideoSection";
import HiringCTA from "../../../components/HiringCTA";
import TicketsPromo from "../../../components/TicketsPromo";
import LiveStats from "../../../components/LiveStats";

export default function HomePage() {
  TabTitle(`Jobs in Rwanda | Kigali Vacancies, Job Categories & Employers | ${APP_NAME}`);
  const { isAuthenticated, currentUser } = useSelector((state) => state.user);
  const nav = useNavigate();

  return (
    <>
      <Box sx={{ mt: 6 }}>
        <Box
          sx={{
            mb: 4,
            p: { xs: 2, sm: 3, md: 4 },
            borderRadius: 3,
            background: "linear-gradient(135deg, #441da0 0%, #6d28d9 100%)",
            color: "white",
          }}
        >
          <Typography
            variant="h3"
            component="h1"
            sx={{ fontWeight: 800, mb: 1, fontSize: { xs: 28, sm: 34, md: 40 } }}
          >
            Find Jobs in Rwanda
          </Typography>
          <Typography variant="body1" sx={{ opacity: 0.92, mb: 2.5, maxWidth: 760 }}>
            Search the latest vacancies across Kigali and every province —
            NGO jobs, internships, remote roles, and full-time positions from
            employers hiring now on {APP_NAME}. Create a free account in one
            click with Google or Facebook, build your CV, and apply in minutes.
            Follow us on{" "}
            <Link href={LINKS.FACEBOOK_LINK} target="_blank" underline="always" sx={{ color: "#ffd54f" }}>
              Facebook
            </Link>
            ,{" "}
            <Link href={LINKS.INSTAGRAM_LINK} target="_blank" underline="always" sx={{ color: "#ffd54f" }}>
              Instagram
            </Link>{" "}
            and{" "}
            <Link href={LINKS.YOUTUBE_LINK} target="_blank" underline="always" sx={{ color: "#ffd54f" }}>
              YouTube
            </Link>{" "}
            for daily openings and career tips.
          </Typography>

          {/* Instant job search */}
          <HomeSearch />

          {/* Popular searches */}
          <Stack
            direction="row"
            spacing={1}
            alignItems="center"
            sx={{ mt: 2.5, flexWrap: "wrap", rowGap: 1 }}
          >
            <Typography variant="body2" sx={{ opacity: 0.85, mr: 0.5 }}>
              Popular:
            </Typography>
            {[
              { label: "Kigali jobs", to: "/kigali-jobs" },
              { label: "Jobs by career", to: `/${ROUTES.JOB_SEEKER.JOBS_BY_CAREER_EN}` },
              { label: "Jobs by location", to: `/${ROUTES.JOB_SEEKER.JOBS_BY_CITY_EN}` },
              { label: "Remote & part-time", to: `/${ROUTES.JOB_SEEKER.JOBS_BY_TYPE_EN}` },
              { label: "Companies hiring", to: `/${ROUTES.JOB_SEEKER.COMPANY_EN}` },
              { label: "Career advice", to: `/${ROUTES.JOB_SEEKER.CAREER_ADVICE}` },
            ].map((item) => (
              <Chip
                key={item.label}
                component={RouterLink}
                to={item.to}
                label={item.label}
                clickable
                size="small"
                sx={{
                  color: "white",
                  borderColor: "rgba(255,255,255,0.5)",
                  "&:hover": { borderColor: "#ffd54f", color: "#ffd54f" },
                }}
                variant="outlined"
              />
            ))}
          </Stack>
        </Box>
        {/* Start: Top companies */}
        <Typography variant="h5" sx={{ mb: 1 }} gutterBottom>
          Companies Hiring in Rwanda
        </Typography>
        <Typography variant="body1" sx={{ mb: 3, color: "text.secondary" }}>
          Explore employers posting jobs across Kigali and the rest of Rwanda.
        </Typography>
        <TopCompanyCarousel />
        {/* End: Top companies */}
      </Box>

      <Box sx={{ mt: 10 }}>
        {/* Start: Urgent jobs */}
        <Card variant="outlined" sx={{ boxShadow: 0 }}>
          <CardHeader
            avatar={
              <Avatar sx={{ bgcolor: "white" }} aria-label="recipe">
                <AccessTimeIcon color="secondary" />
              </Avatar>
            }
            title={
              <Typography variant="h5" sx={{ color: "white" }}>
                Urgent Jobs in Rwanda
              </Typography>
            }
            sx={{
              backgroundColor: "#441da0",
              p: { xs: 0.75, sm: 1, md: 1.5, lg: 1.5, xl: 1.5 },
            }}
          />
          <CardContent>
            <Box sx={{ p: { xs: 0, sm: 0, md: 0, lg: 2, xl: 2 } }}>
              <FilterJobPostCard
                params={{
                  isUrgent:true,
                }}
              />
            </Box>
          </CardContent>
        </Card>
        {/* End: Urgent jobs */}
      </Box>

      <Box sx={{ mt: 4 }}>
        <HiringCTA variant="banner" />
      </Box>

      <Box sx={{ mt: 10 }}>
        {/* Start: Careers */}
        <Typography variant="h5" sx={{ mb: 1 }} gutterBottom>
          Popular Job Categories in Rwanda
        </Typography>
        <Typography variant="body1" sx={{ mb: 3, color: "text.secondary" }}>
          Browse the most active career areas and jump straight into the jobs that fit your background.
        </Typography>
        <CareerCarousel />
        {/* End: Careers */}
      </Box>

      <Box sx={{ mt: 10 }}>
        {/* Start: How it works */}
        <Typography variant="h5" sx={{ mb: 1 }} gutterBottom>
          How Imyanya Works
        </Typography>
        <Typography variant="body1" sx={{ mb: 3, color: "text.secondary" }}>
          From search to signed offer — follow these four steps, then read the
          full{" "}
          <Typography
            component={RouterLink}
            to={`/${ROUTES.JOB_SEEKER.CAREER_GUIDE}`}
            sx={{ color: "primary.main", fontWeight: 600, textDecoration: "none" }}
          >
            Rwanda Career Guide
          </Typography>{" "}
          for CV templates, interview preparation, and salary advice.
        </Typography>
        <Grid container spacing={2}>
          {rwandaJobSearchSteps.map((step, index) => (
            <Grid item xs={12} sm={6} md={3} key={step.title}>
              <Card
                variant="outlined"
                sx={{
                  height: "100%",
                  borderRadius: 3,
                  transition: "transform 0.2s ease, box-shadow 0.2s ease",
                  "&:hover": {
                    transform: "translateY(-4px)",
                    boxShadow: (theme) => theme.customShadows.medium,
                  },
                }}
              >
                <CardContent>
                  <Avatar
                    sx={{
                      bgcolor: "primary.main",
                      color: "white",
                      fontWeight: 800,
                      mb: 1.5,
                    }}
                  >
                    {index + 1}
                  </Avatar>
                  <Typography variant="subtitle1" fontWeight={700} gutterBottom>
                    {step.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.65 }}>
                    {step.body}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
        <Box sx={{ mt: 2.5, display: "flex", gap: 1.5, flexWrap: "wrap" }}>
          <Button
            component={RouterLink}
            to={`/${ROUTES.JOB_SEEKER.JOBS_EN}`}
            variant="contained"
            color="primary"
            size="large"
            startIcon={<SearchIcon />}
          >
            Browse Jobs in Rwanda
          </Button>
          <Button
            component={RouterLink}
            to={`/${ROUTES.JOB_SEEKER.CV_BUILDER}`}
            variant="outlined"
            color="primary"
            size="large"
          >
            Build a Free CV
          </Button>
        </Box>
        {/* End: How it works */}
      </Box>

      {isAuthenticated && currentUser?.roleName === ROLES_NAME.JOB_SEEKER && (
        <Box sx={{ mt: 10 }}>
          {/* Start: Suggested jobs */}
          <Card variant="outlined">
            <CardHeader
              avatar={
                <Avatar sx={{ bgcolor: "white" }} aria-label="recipe">
                  <TipsAndUpdatesIcon color="secondary" />
                </Avatar>
              }
              title={
                  <Typography variant="h5" sx={{ color: "#441da0" }}>
                    Recommended Jobs for You
                  </Typography>
              }
              sx={{
                backgroundImage: `url('${require("../../../assets/images/banner-explore.png")}')`,
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
                p: { xs: 0.75, sm: 1, md: 1.5, lg: 1.5, xl: 1.5 },
              }}
            />
            <CardContent sx={{ backgroundColor: "#e0f0ff" }}>
              <Box sx={{ p: { xs: 0, sm: 0, md: 0, lg: 2, xl: 2 } }}>
                {/* Start: SuggestedJobPostCard */}
                <SuggestedJobPostCard />
                {/* End: SuggestedJobPostCard */}
              </Box>
            </CardContent>
          </Card>
          {/* End: Suggested jobs */}
        </Box>
      )}

      <Box
        sx={{
          borderRadius: 1,
          p: 4,
          mt: 6,
          backgroundImage: `url('${require("../../../assets/images/banner-explore-pc.png")}')`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
        }}
      >
        <Stack
          direction={{
            xs: "column",
            sm: "row",
            md: "row",
            lg: "row",
            xl: "row",
          }}
          justifyContent="space-between"
          spacing={2}
        >
          <Box>
            <Typography fontSize={32} fontWeight="bold" color="white">
              Need jobs that match you in Rwanda?
            </Typography>
          </Box>
          <Box>
            <Button
              variant="contained"
              color="primary"
              size="large"
              startIcon={<SearchIcon />}
              onClick={() => nav(`/${ROUTES.JOB_SEEKER.JOBS_EN}`)}
            >
              Browse Jobs in Rwanda
            </Button>
          </Box>
        </Stack>
      </Box>

      <Box sx={{ mt: 6 }}>
        {/* Start: Live stats */}
        <LiveStats />
        {/* End: Live stats */}
      </Box>

      <Box sx={{ mt: 6 }}>
        <TicketsPromo variant="banner" />
      </Box>

      <Box sx={{ mt: 10 }}>
        {/* Start: YouTube videos */}
        <YouTubeVideoSection
          title="Places for sale on video"
          subtitle="Watch recent Imyanya videos for plots, houses, land, and places for sale in Rwanda."
          maxVideos={6}
          contactLabel="Ask about this place"
          contactMessagePrefix="Hello Imyanya, I am interested in this plot/place for sale."
          tagLabel="Place for sale"
        />
        {/* End: YouTube videos */}
      </Box>

      <Box sx={{ mt: 10 }}>
        {/* Start: Feedback */}
        <Typography variant="h5" sx={{ mb: 3 }} gutterBottom>
          User Ratings
        </Typography>
        <FeedbackCarousel />
        {/* End: Feedback */}
      </Box>

      <Box sx={{ mt: 10 }}>
        {/* Start: Job by category */}
        <Box
          sx={{
            backgroundColor: "background.paper",
            borderRadius: 2,
          }}
        >
          <JobByCategory />
        </Box>
        {/* End: Job by category */}
      </Box>
    </>
  );
}
