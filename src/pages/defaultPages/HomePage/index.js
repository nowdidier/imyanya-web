import * as React from "react";
import { useNavigate } from "react-router-dom";
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
import ArticleOutlinedIcon from "@mui/icons-material/ArticleOutlined";
import TipsAndUpdatesIcon from "@mui/icons-material/TipsAndUpdates";
import SearchIcon from "@mui/icons-material/Search";
import WorkIcon from "@mui/icons-material/Work";
import CategoryIcon from "@mui/icons-material/Category";

import { TabTitle } from "../../../utils/generalFunction";
import {
  ROLES_NAME,
  ROUTES,
  APP_NAME,
} from "../../../configs/constants";
import TopCompanyCarousel from "../../../components/TopCompanyCarousel";
import CareerCarousel from "../../../components/CareerCarousel";
import FeedbackCarousel from "../../../components/FeedbackCarousel";
import JobByCategory from "../../components/defaults/JobByCategory";
import FilterJobPostCard from "../../components/defaults/FilterJobPostCard";
import SuggestedJobPostCard from "../../components/defaults/SuggestedJobPostCard";
import StaticJobFeedSection from "../../components/defaults/StaticJobFeedSection";
import YouTubeVideoSection from "../../../components/YouTubeVideoSection";
import {
  featuredRwandaJobs,
  normalizeCategoryFeed,
  rwandaJobCategoryFeeds,
  rwandaJobFeedSourceMeta,
} from "../../../data/rwandaJobFeed";
import { rwandaJobMarketHighlights } from "../../../data/rwandaCareerContent";
import { AdUnit, NativeBanner } from "../../../components/Ads";

export default function HomePage() {
  TabTitle(`Jobs in Rwanda | Kigali Vacancies, Job Categories & Employers | ${APP_NAME}`);
  const { isAuthenticated, currentUser } = useSelector((state) => state.user);
  const nav = useNavigate();
  const categoryFeedJobs = React.useMemo(
    () => rwandaJobCategoryFeeds.map(normalizeCategoryFeed),
    []
  );

  return (
    <>
      <Box sx={{ mt: 6 }}>
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

      <Box sx={{ mt: 6, display: 'flex', justifyContent: 'center' }}>
        <AdUnit size="300x250" />
      </Box>

      <Box sx={{ mt: 10 }}>
        <Stack
          direction={{ xs: "column", md: "row" }}
          justifyContent="space-between"
          alignItems={{ xs: "flex-start", md: "center" }}
          spacing={2}
          sx={{ mb: 3 }}
        >
          <Box>
            <Stack direction="row" spacing={1} alignItems="center">
              <ArticleOutlinedIcon color="primary" />
              <Typography variant="h5" gutterBottom>
                Rwanda Job Search Notes
              </Typography>
            </Stack>
            <Typography variant="body1" color="text.secondary">
              Original guidance for comparing roles, preparing applications, and
              deciding where to focus your time.
            </Typography>
          </Box>
          <Button
            variant="outlined"
            onClick={() => nav(`/${ROUTES.JOB_SEEKER.CAREER_GUIDE}`)}
          >
            Read the Career Guide
          </Button>
        </Stack>
        <Grid container spacing={2}>
          {rwandaJobMarketHighlights.map((item) => (
            <Grid item xs={12} md={4} key={item.title}>
              <Card variant="outlined" sx={{ height: "100%", borderRadius: 1 }}>
                <CardContent>
                  <Typography variant="h6" fontWeight={700} gutterBottom>
                    {item.title}
                  </Typography>
                  <Typography color="text.secondary" sx={{ lineHeight: 1.7 }}>
                    {item.body}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
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

      <Box sx={{ mt: 4, display: 'flex', justifyContent: 'center' }}>
        <NativeBanner />
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
        {/* Start: Featured job search guides */}
        <Card variant="outlined" sx={{ boxShadow: 0 }}>
          <CardHeader
            avatar={
              <Avatar sx={{ bgcolor: "white" }} aria-label="recipe">
                <WorkIcon color="secondary" />
              </Avatar>
            }
            title={
              <Typography variant="h5" sx={{ color: "white" }}>
                Featured Rwanda Job Search Guides
              </Typography>
            }
            sx={{
              backgroundColor: "#441da0",
              p: { xs: 0.75, sm: 1, md: 1.5, lg: 1.5, xl: 1.5 },
            }}
          />
          <CardContent>
            <Box sx={{ p: { xs: 0, sm: 0, md: 0, lg: 2, xl: 2 } }}>
              <StaticJobFeedSection
                jobs={featuredRwandaJobs}
                sourceNote={`${rwandaJobFeedSourceMeta.refreshedLabel}: software, accounting, sales, hospitality, HR, marketing, project, health, research, support, and logistics roles in Rwanda.`}
              />
            </Box>
          </CardContent>
        </Card>
        {/* End: Featured job search guides */}
      </Box>

      <Box sx={{ mt: 10 }}>
        {/* Start: Category guide feeds */}
        <Card variant="outlined" sx={{ boxShadow: 0 }}>
          <CardHeader
            avatar={
              <Avatar sx={{ bgcolor: "white" }} aria-label="recipe">
                <CategoryIcon color="secondary" />
              </Avatar>
            }
            title={
              <Typography variant="h5" sx={{ color: "white" }}>
                Browse Rwanda Jobs by Category
              </Typography>
            }
            sx={{
              backgroundColor: "#441da0",
              p: { xs: 0.75, sm: 1, md: 1.5, lg: 1.5, xl: 1.5 },
            }}
          />
          <CardContent>
            <Box sx={{ p: { xs: 0, sm: 0, md: 0, lg: 2, xl: 2 } }}>
              <StaticJobFeedSection
                jobs={categoryFeedJobs}
                sourceNote="Open all major job categories first: software, finance, admin, sales, customer service, engineering, HR, marketing, project management, education, health, and hospitality."
              />
            </Box>
          </CardContent>
        </Card>
        {/* End: Category guide feeds */}
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
