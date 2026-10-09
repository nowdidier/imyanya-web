import * as React from 'react';
import { Outlet } from 'react-router-dom';
import { Box, Container } from '@mui/material';

import Header from '../components/commons/Header';
import Footer from '../components/commons/Footer';
import HiringCTA from '../../components/HiringCTA';
import FindJobsStrip from '../../components/FindJobsStrip';
import InstallAppBanner from '../../components/InstallAppBanner';

const DefaultLayout = () => {
  return (
    <Box>
      <Header />
      <InstallAppBanner />

      <Container
        component="main"
        maxWidth="lg"
        sx={{
          paddingLeft: { xs: 1, sm: 4, md: 6, lg: 8, xl: 0 },
          paddingRight: { xs: 1, sm: 4, md: 6, lg: 8, xl: 0 },
        }}
      >
        <section aria-label="Page content">
          <Outlet />
        </section>
      </Container>

      <Container
        maxWidth="lg"
        sx={{
          mt: 4,
          paddingLeft: { xs: 1, sm: 4, md: 6, lg: 8, xl: 0 },
          paddingRight: { xs: 1, sm: 4, md: 6, lg: 8, xl: 0 },
        }}
      >
        {/* Every page helps visitors find a job + links the 3 focus routes */}
        <FindJobsStrip />
      </Container>

      <Container
        maxWidth="lg"
        sx={{
          mt: 4,
          paddingLeft: { xs: 1, sm: 4, md: 6, lg: 8, xl: 0 },
          paddingRight: { xs: 1, sm: 4, md: 6, lg: 8, xl: 0 },
        }}
      >
        <HiringCTA variant="banner" />
      </Container>

      <Box
        component="footer"
        sx={{
          mt: {
            xs: 2,
            sm: 10,
            md: 10,
            lg: 10,
            xl: 10,
          },
          px: {
            xs: 1,
            sm: 5,
            md: 8,
            lg: 10,
            xl: 14,
          },
          py: {
            xs: 2,
            sm: 2,
            md: 2,
            lg: 5,
            xl: 5,
          },
          color: 'white',
          backgroundImage:
            'linear-gradient(180deg, #3a1890 0%, #2f1578 60%, #241058 100%)',
          borderTop: '1px solid rgba(255, 255, 255, 0.1)',
        }}
      >
        <Footer />
      </Box>
    </Box>
  );
};

export default DefaultLayout;
