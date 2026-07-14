import React from "react";
import {
  Box,
  Card,
  CardContent,
  Divider,
  Grid,
  List,
  ListItem,
  ListItemText,
  Stack,
  Typography,
} from "@mui/material";

import { TabTitle } from "../../../utils/generalFunction";
import JobPostSearch from "../../components/defaults/JobPostSearch";
import SuggestedJobPostCard from "../../components/defaults/SuggestedJobPostCard";
import MainJobPostCard from "../../components/defaults/MainJobPostCard";
import AppIntroductionCard from "../../../components/AppIntroductionCard";
import MainJobRightBanner from "../../../components/MainJobRightBanner";
import StaticJobFeedSection from "../../components/defaults/StaticJobFeedSection";
import {
  featuredRwandaJobs,
  rwandaJobFeedSourceMeta,
} from "../../../data/rwandaJobFeed";
import {
  rwandaApplicationChecklist,
  rwandaJobSearchSteps,
} from "../../../data/rwandaCareerContent";

const JobPage = () => {
  TabTitle("Job Search Results");

  return (
    <>
      <Box sx={{ mt: 2 }}>
        <Stack spacing={1.5} sx={{ mb: 4 }}>
          <Typography variant="h3" component="h1" fontWeight={800}>
            Jobs in Rwanda
          </Typography>
          <Typography color="text.secondary" sx={{ maxWidth: 900, lineHeight: 1.75 }}>
            Search current roles, compare employers, and use the guidance below
            to prepare stronger applications for Kigali and Rwanda-wide vacancies.
            This page combines platform listings with editorial notes that help
            candidates avoid generic applications.
          </Typography>
        </Stack>

        <Box>
          {/* Start: JobPostSearch */}
          <JobPostSearch />
          {/* End: JobPostSearch */}
        </Box>
        <Box sx={{ mt: 4 }}>
          <Card variant="outlined" sx={{ borderRadius: 1, mb: 4 }}>
            <CardContent>
              <Typography variant="h5" component="h2" fontWeight={700} gutterBottom>
                How to Use This Search Well
              </Typography>
              <Grid container spacing={2}>
                {rwandaJobSearchSteps.map((step) => (
                  <Grid item xs={12} md={6} key={step.title}>
                    <Typography variant="h6" fontWeight={700}>
                      {step.title}
                    </Typography>
                    <Typography color="text.secondary" sx={{ lineHeight: 1.7 }}>
                      {step.body}
                    </Typography>
                  </Grid>
                ))}
              </Grid>
            </CardContent>
          </Card>

          <Grid container spacing={3}>
            <Grid item xs={12} sm={12} md={12} lg={8} xl={8}>
              {/* Start: MainJobPostCard */}
              <MainJobPostCard />
              {/* End: MainJobPostCard */}
            </Grid>
            <Grid item xs={12} sm={12} md={12} lg={4} xl={4}>
              <Box sx={{ pt: 2, pb: 3 }}>
                <Typography variant="h5">Suggested Jobs</Typography>
              </Box>
              {/* Start: SuggestedJobPostCard */}
              <SuggestedJobPostCard fullWidth={true} />
              {/* End: SuggestedJobPostCard */}
              <Box>
                {/* Start: MainJobRightBanner */}
                <MainJobRightBanner />
                {/* End: MainJobRightBanner */}
              </Box>
            </Grid>
          </Grid>
        </Box>

        <Box sx={{ mt: 4 }}>
          <Card variant="outlined" sx={{ borderRadius: 1 }}>
            <CardContent>
              <Typography variant="h5" component="h2" fontWeight={700} gutterBottom>
                Application Quality Checklist
              </Typography>
              <List dense>
                {rwandaApplicationChecklist.map((item, index) => (
                  <React.Fragment key={item}>
                    <ListItem disableGutters>
                      <ListItemText
                        primary={item}
                        primaryTypographyProps={{ sx: { lineHeight: 1.6 } }}
                      />
                    </ListItem>
                    {index < rwandaApplicationChecklist.length - 1 && <Divider />}
                  </React.Fragment>
                ))}
              </List>
            </CardContent>
          </Card>
        </Box>

        <Box sx={{ mt: 4 }}>
          <Typography variant="h5" component="h2" fontWeight={700} gutterBottom>
            Featured Rwanda Job Search Guides
          </Typography>
          <StaticJobFeedSection
            jobs={featuredRwandaJobs}
            sourceNote={`${rwandaJobFeedSourceMeta.refreshedLabel}: use these guides alongside live search results to compare fields, locations, and work types.`}
          />
        </Box>

        <Box sx={{ mt: 4 }}>
          {/* Start: AppIntroductionCard */}
          <AppIntroductionCard />
          {/* End: AppIntroductionCard */}
        </Box>
      </Box>
    </>
  );
};

export default JobPage;
