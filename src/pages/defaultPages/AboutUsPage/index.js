import React from 'react';
import { Box, Card, Grid, Stack, Typography } from '@mui/material';

import { TabTitle } from '../../../utils/generalFunction';
import AppIntroductionCard from '../../../components/AppIntroductionCard';
import MuiImageCustom from '../../../components/MuiImageCustom';
import { ABOUT_IMAGES } from '../../../configs/constants';

const AboutUsPage = () => {
  TabTitle('About Us - MyJob Employment System');

  return (
    <>
      <Box sx={{ my: 3 }}>
        <Typography variant="h4" sx={{ mb: 2, color: '#441da0' }}>
          About Us
        </Typography>
        <Stack spacing={3}>
          <Box>
            <Typography>
              MyJob - Job and recruitment information channel for all Businesses and 
              Candidates. We believe in bringing "HOPE" to Businesses seeking talent
              and Candidates seeking career opportunities. With 2 systems: Website for
              Recruiters and Application for Job Seekers, MyJob will deliver fresh,
              exciting experiences; connecting the dream of conquering jobs of all
              talents and helping businesses build strong human resources.
            </Typography>
          </Box>
          <Box>
            <Grid container spacing={3}>
              <Grid xs={12} sm={12} md={6} lg={3} xl={3} item>
                <Stack spacing={1}>
                  <Typography variant="h6" sx={{ color: '#fca34d' }}>
                    Website
                  </Typography>
                  <Typography sx={{ textAlign: 'justify' }}>
                    Website supports Recruiters in finding personnel, managing jobs,
                    candidates, building rich data sources.
                  </Typography>
                </Stack>
              </Grid>
              <Grid xs={12} sm={12} md={6} lg={3} xl={3} item>
                <Stack spacing={1}>
                  <Typography variant="h6" sx={{ color: '#fca34d' }}>
                    Mobile
                  </Typography>
                  <Typography sx={{ textAlign: 'justify' }}>
                    Job search app helps Job Seekers access the most suitable jobs
                    anywhere, anytime.
                  </Typography>
                </Stack>
              </Grid>
              <Grid xs={12} sm={12} md={6} lg={3} xl={3} item>
                <Stack spacing={1}>
                  <Typography variant="h6" sx={{ color: '#fca34d' }}>
                    Focus Areas
                  </Typography>
                  <Typography sx={{ textAlign: 'justify' }}>
                    Specializing in recruitment and job search in 3 fields: Information
                    Technology, Online Advertising, PR - Marketing. Job Seekers and
                    Recruiters will connect with the right audience, matching their needs.
                  </Typography>
                </Stack>
              </Grid>
              <Grid xs={12} sm={12} md={6} lg={3} xl={3} item>
                <Stack spacing={1}>
                  <Typography variant="h6" sx={{ color: '#fca34d' }}>
                    Cost Effective
                  </Typography>
                  <Typography sx={{ textAlign: 'justify' }}>
                    Save costs, time, achieve efficiency, meet all job search and 
                    talent search needs.
                  </Typography>
                </Stack>
              </Grid>
            </Grid>
          </Box>
        </Stack>
      </Box>
      <Box sx={{ my: 3 }}>
        <Typography variant="h4" sx={{ mb: 2, color: '#441da0' }}>
          Mobile App MyJob
        </Typography>
        <Box sx={{ mt: 5 }}>
          <Card sx={{ p: 5 }}>
            <Stack
              direction={{
                xs: 'column',
                sm: 'column',
                md: 'row',
                lg: 'row',
                xl: 'row',
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
                    style={{ color: '#fca34d', fontSize: 30 }}
                  >
                    Choose the right job - Go in the right direction
                  </Typography>
                  <Typography textAlign="justify" color="#6D7681">
                    Personalize job search experience according to candidate needs
                    including features like Job Suggestions, Job Search, Company Search
                    and Chatbot support to quickly find jobs.
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
                xs: 'column-reverse',
                sm: 'column-reverse',
                md: 'row',
                lg: 'row',
                xl: 'row',
              }}
              spacing={2}
            >
              <Box>
                <Stack spacing={2}>
                  <Typography
                    variant="h4"
                    style={{ color: '#fca34d', fontSize: 30 }}
                  >
                    Create CV & Profile
                  </Typography>
                  <Typography textAlign="justify" color="#6D7681">
                    Online CV and ability to upload attached CV. Convenient, fast,
                    professional and different. Increase application success rate by 80%.
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
                xs: 'column',
                sm: 'column',
                md: 'row',
                lg: 'row',
                xl: 'row',
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
                    style={{ color: '#fca34d', fontSize: 30 }}
                  >
                    Jobs Around You
                  </Typography>
                  <Typography textAlign="justify" color="#6D7681">
                    JOBS NEAR YOU feature on MyJob app. This feature helps candidates
                    easily choose a suitable job while ensuring close to home,
                    convenient travel without having to search through hundreds of job posts.
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
                xs: 'column-reverse',
                sm: 'column-reverse',
                md: 'row',
                lg: 'row',
                xl: 'row',
              }}
              spacing={2}
            >
              <Box>
                <Stack spacing={2}>
                  <Typography
                    variant="h4"
                    style={{ color: '#fca34d', fontSize: 30 }}
                  >
                    Job Notifications Anytime
                  </Typography>
                  <Typography textAlign="justify" color="#6D7681">
                    Create job alerts to let jobs find you. Latest jobs from top
                    employers will be sent to your email weekly.
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
          {/* Start: AppIntroductionCard */}
          <AppIntroductionCard />
          {/* End: AppIntroductionCard */}
        </Box>
      </Box>
    </>
  );
};

export default AboutUsPage;
