import React from "react";
import {
  Box,
  Grid,
  Typography,
} from "@mui/material";

import { TabTitle } from "../../../utils/generalFunction";
import SeoBreadcrumbs from "../../../components/SeoBreadcrumbs";
import JobPostSearch from "../../components/defaults/JobPostSearch";
import SuggestedJobPostCard from "../../components/defaults/SuggestedJobPostCard";
import MainJobPostCard from "../../components/defaults/MainJobPostCard";
import OrganisationsMap from "../../../components/OrganisationsMap";
import AppIntroductionCard from "../../../components/AppIntroductionCard";
import MainJobRightBanner from "../../../components/MainJobRightBanner";
import HiringCTA from "../../../components/HiringCTA";

const JobPage = () => {
  TabTitle("Job Search Results");

  return (
    <>
      <Box sx={{ mt: 2 }}>
        <SeoBreadcrumbs
          items={[{ label: "Home", href: "/" }, { label: "Jobs in Rwanda" }]}
        />
        <Typography
          variant="h3"
          component="h1"
          fontWeight={800}
          sx={{ mb: 0.5 }}
        >
          Jobs in Rwanda
        </Typography>
        <Typography
          color="text.secondary"
          sx={{ lineHeight: 1.7, maxWidth: 860, mb: 3 }}
        >
          Browse the latest job vacancies in Rwanda — Kigali jobs, NGO roles,
          internships, and remote opportunities. Filter by career, location,
          and employment type, explore{" "}
          <Typography
            component="a"
            href="/jobs-by-career"
            sx={{ color: "primary.main", textDecoration: "none", fontWeight: 600 }}
          >
            jobs by career
          </Typography>
          {", "}
          <Typography
            component="a"
            href="/jobs-by-location"
            sx={{ color: "primary.main", textDecoration: "none", fontWeight: 600 }}
          >
            jobs by location
          </Typography>
          {" and "}
          <Typography
            component="a"
            href="/jobs-by-type"
            sx={{ color: "primary.main", textDecoration: "none", fontWeight: 600 }}
          >
            jobs by type
          </Typography>
          {", or browse "}
          <Typography
            component="a"
            href="/companies"
            sx={{ color: "primary.main", textDecoration: "none", fontWeight: 600 }}
          >
            companies hiring in Rwanda
          </Typography>
          .
        </Typography>
        <Box>
          {/* Start: JobPostSearch */}
          <JobPostSearch />
          {/* End: JobPostSearch */}
        </Box>
        <Box sx={{ mt: 4 }}>
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
              <HiringCTA variant="card" />
              <Box>
                {/* Start: MainJobRightBanner */}
                <MainJobRightBanner />
                {/* End: MainJobRightBanner */}
              </Box>
            </Grid>
          </Grid>
        </Box>

        {/* Start: Jobs map — every posted job pinned at its location */}
        <Box sx={{ mt: 6 }}>
          <OrganisationsMap
            compact
            defaultShow="jobs"
            title="Jobs Pinned on the Map"
            subtitle="Every green pin is a real job location posted on Imyanya — organisations, shops and self-employers included. Click a pin to see the open roles at that address."
          />
        </Box>
        {/* End: Jobs map */}

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
