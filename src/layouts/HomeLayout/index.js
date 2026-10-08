import React from 'react';
import { Outlet } from 'react-router-dom';
import { Box, Container } from '@mui/material';

import Header from '../components/commons/Header';
import SubHeader from '../components/commons/SubHeader';
import TopSlide from '../components/commons/TopSlide';
import Footer from '../components/commons/Footer';
import HiringCTA from '../../components/HiringCTA';
import InstallAppBanner from '../../components/InstallAppBanner';

const HomeLayout = () => {
  return (
    <Box>
      <Header />
      <InstallAppBanner />
      <SubHeader />
      <Container
        component="main"
        maxWidth="xl"
        sx={{
          paddingLeft: 0,
          paddingRight: 0,
        }}
      >
        <section>
          <TopSlide />
        </section>
      </Container>

      <Container
        maxWidth="xl"
        sx={{
          paddingLeft: { xs: 1, sm: 4, md: 6, lg: 8, xl: 8 },
          paddingRight: { xs: 1, sm: 4, md: 6, lg: 8, xl: 8 },
        }}
      >
        <section aria-label="Home page content">
          <Outlet />
        </section>
      </Container>

      <Box sx={{ mt: 6, px: { xs: 1, sm: 4, md: 8, lg: 8, xl: 8 } }}>
        <HiringCTA variant="banner" />
      </Box>

      <Box
        component="footer"
        sx={{
          mt: 10,
          px: {
            xs: 1,
            sm: 5,
            md: 8,
            lg: 10,
            xl: 14
          },
          py: {
            xs: 2,
            sm: 2,
            md: 2,
            lg: 5,
            xl: 5
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

export default HomeLayout;
