import * as React from "react";
import { useNavigate, Link as RouterLink } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  Avatar,
  Box,
  Card,
  CardContent,
  CardHeader,
  Grid,
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
} from "../../../configs/constants";
import { rwandaJobSearchSteps } from "../../../data/rwandaCareerContent";
import AllCompaniesCarousel from "../../../components/AllCompaniesCarousel";
import SectionHeader from "../../../components/SectionHeader";
import CareerCarousel from "../../../components/CareerCarousel";
import FeedbackCarousel from "../../../components/FeedbackCarousel";
import JobByCategory from "../../components/defaults/JobByCategory";
import FilterJobPostCard from "../../components/defaults/FilterJobPostCard";
import SuggestedJobPostCard from "../../components/defaults/SuggestedJobPostCard";
import YouTubeVideoSection from "../../../components/YouTubeVideoSection";
import TicketsPromo from "../../../components/TicketsPromo";
import LiveStats from "../../../components/LiveStats";

export default function HomePage() {
  TabTitle(`Jobs in Rwanda | Kigali Vacancies, Job Categories & Employers | ${APP_NAME}`);
  const { isAuthenticated, currentUser } = useSelector((state) => state.user);
  const nav = useNavigate();

  return (
    <>
      <Box sx={{ mt: 6 }}>
        {/* Start: All companies slides — top employers mixed with every company */}
        <SectionHeader
          eyebrow="Employers"
          title="Explore All Companies"
          subtitle={
            <>
              Top employers first, then every employer on {APP_NAME} in one place —
              click any logo to open its profile and see all its open roles, or{" "}
              <Typography
                component={RouterLink}
                to={`/${ROUTES.JOB_SEEKER.COMPANY_EN}`}
                sx={{ color: "primary.main", fontWeight: 600, textDecoration: "none" }}
              >
                view all companies hiring in Rwanda
              </Typography>
              .
            </>
          }
        />
        <AllCompaniesCarousel />
        {/* End: All companies slides */}
      </Box>

      <Box sx={{ mt: 10 }}>
        {/* Start: Urgent jobs */}
        <Card variant="outlined" sx={{ boxShadow: 0, overflow: "hidden" }}>
          <CardHeader
            avatar={
              <Avatar sx={{ bgcolor: "white" }} aria-label="recipe">
                <AccessTimeIcon color="secondary" />
              </Avatar>
            }
            title={
              <Typography variant="h5" sx={{ color: "white", fontWeight: 800 }}>
                Urgent Jobs in Rwanda
              </Typography>
            }
            subheader={
              <Typography variant="body2" sx={{ color: "rgba(255,255,255,0.85)" }}>
                Employers hiring right now — apply before deadlines pass
              </Typography>
            }
            sx={{
              backgroundImage:
                "linear-gradient(120deg, #2f1578 0%, #441da0 45%, #6d28d9 100%)",
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

      <Box sx={{ mt: 10 }}>
        {/* Start: Careers */}
        <SectionHeader
          eyebrow="Careers"
          title="Popular Job Categories in Rwanda"
          subtitle={
            <>
              Browse the most active career areas and jump straight into the jobs that fit your background.
              You can also see{" "}
              <Typography
                component={RouterLink}
                to={`/${ROUTES.JOB_SEEKER.COMPANY_EN}`}
                sx={{ color: "primary.main", fontWeight: 600, textDecoration: "none" }}
              >
                which companies are hiring
              </Typography>
              .
            </>
          }
        />
        <CareerCarousel />
        {/* End: Careers */}
      </Box>

      <Box sx={{ mt: 10 }}>
        {/* Start: How it works */}
        <SectionHeader
          eyebrow="How it works"
          title="How Imyanya Works"
          subtitle={
            <>
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
            </>
          }
        />
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
                      backgroundImage:
                        "linear-gradient(135deg, #441da0 0%, #6d28d9 60%, #8b5cf6 100%)",
                      color: "white",
                      fontWeight: 800,
                      mb: 1.5,
                      boxShadow: "0 6px 16px -6px rgba(109, 40, 217, 0.55)",
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
          borderRadius: 4,
          p: 4,
          mt: 6,
          backgroundImage: `url('${require("../../../assets/images/banner-explore-pc.png")}')`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          boxShadow: (theme) => theme.customShadows.glow,
          border: "1px solid rgba(109, 40, 217, 0.2)",
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
        <SectionHeader
          eyebrow="Community"
          title="User Ratings"
          subtitle="Real feedback from job seekers and employers using Imyanya across Rwanda."
        />
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
