import React from 'react';
import { Box, Card, Container } from '@mui/material';

import { TabTitle } from '../../../utils/generalFunction';
import CompanySearch from '../../components/defaults/CompanySearch';
import Companies from '../../../components/Companies';
import SeoBreadcrumbs from '../../../components/SeoBreadcrumbs';

const CompanyPage = () => {
  TabTitle('Employer Search Results')

  return (
    <Container maxWidth="xl">
      <SeoBreadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "Companies hiring in Rwanda" },
        ]}
      />
      <Box
        sx={{
          mt: 2,
          mb: 6,
        }}
      >
        <Box sx={{ mt: 2, mb: 6 }}>
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
      </Box>
    </Container>
  );
};

export default CompanyPage;
