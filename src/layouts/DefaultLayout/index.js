import * as React from 'react';
import { Outlet } from 'react-router-dom';
import { Box, Container, useMediaQuery, useTheme } from '@mui/material';

import Header from '../components/commons/Header';
import Footer from '../components/commons/Footer';
import { AdUnit, MobileStickyBar, Smartlink } from '../../components/Ads';
import { isEmployerHost } from '../../configs/constants';

const DefaultLayout = () => {
  const showAds = !isEmployerHost();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Box>
      <Header />

      {showAds && (
        <Box sx={{ mt: 1, mb: 1, display: 'flex', justifyContent: 'center' }}>
          <AdUnit size="728x90" />
        </Box>
      )}

      <Container
        maxWidth="lg"
        sx={{
          paddingLeft: { xs: 1, sm: 4, md: 6, lg: 8, xl: 0 },
          paddingRight: { xs: 1, sm: 4, md: 6, lg: 8, xl: 0 },
        }}
      >
        <section>
          <Outlet />
        </section>
      </Container>

      {showAds && <Smartlink sx={{ mb: 2 }}>Sponsored</Smartlink>}

      <Box
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
          bgcolor: '#441da0',
        }}
      >
        <Footer />
      </Box>

      {showAds && isMobile && <MobileStickyBar />}
    </Box>
  );
};

export default DefaultLayout;
