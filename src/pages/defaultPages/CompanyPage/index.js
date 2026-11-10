import React from 'react';
import { Box, Button, Card, Container, Stack, Typography } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

import { TabTitle } from '../../../utils/generalFunction';
import { ROUTES } from '../../../configs/constants';
import CompanySearch from '../../components/defaults/CompanySearch';
import Companies from '../../../components/Companies';
import SeoBreadcrumbs from '../../../components/SeoBreadcrumbs';
import NeedHelpSubscribe from '../../../components/NeedHelpSubscribe';
import HiringCTA from '../../../components/HiringCTA';

const CompanyPage = () => {
  TabTitle('Companies Hiring in Rwanda | Imyanya');

  return (
    <Container maxWidth="xl">
      <SeoBreadcrumbs
        items={[
          { label: 'Home', href: '/' },
          { label: 'Companies hiring in Rwanda' },
        ]}
      />
      <Box sx={{ mt: 2, mb: 6 }}>
        <Typography variant="h3" component="h1" fontWeight={800} sx={{ mb: 1 }}>
          Companies hiring in Rwanda
        </Typography>
        <Typography color="text.secondary" sx={{ maxWidth: 860, mb: 3, lineHeight: 1.7 }}>
          Explore employers across Rwanda, discover open opportunities, and connect with
          organizations that match your goals. Browse all companies, search by name or
          location, and find jobs from each employer.
        </Typography>

        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1.5} sx={{ mb: 3 }}>
          <Button
            component={RouterLink}
            to={`/${ROUTES.JOB_SEEKER.JOBS_EN}`}
            variant="contained"
            sx={{ textTransform: 'none', fontWeight: 700, borderRadius: '20px', boxShadow: 'none' }}
          >
            Browse all jobs
          </Button>
          <Button
            component={RouterLink}
            to={`/${ROUTES.JOB_SEEKER.CAREER_GUIDE}`}
            variant="outlined"
            sx={{ textTransform: 'none', fontWeight: 700, borderRadius: '20px' }}
          >
            Career guide
          </Button>
        </Stack>

        <Box sx={{ mt: 2, mb: 4 }}>
          <CompanySearch />
        </Box>

        <Card
          sx={{
            px: { xs: 2, sm: 3, md: 4, lg: 5, xl: 6 },
            py: 4,
            boxShadow: (theme) => theme.customShadows.large,
            bgcolor: 'background.paper',
            borderRadius: '16px',
          }}
          variant="outlined"
        >
          <Companies />
        </Card>

        <Box sx={{ mt: 4 }}>
          <HiringCTA variant="banner" />
        </Box>

        <Box sx={{ mt: 4 }}>
          <NeedHelpSubscribe
            title="Need help finding the right company or candidate?"
            subtitle="Subscribe for help with job search, applications, employer outreach, or hiring support. Tell us what you need."
            source="companies"
          />
        </Box>
      </Box>
    </Container>
  );
};

export default CompanyPage;
