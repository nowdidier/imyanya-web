import React from 'react';
import { Box, Card, Typography, Container } from '@mui/material';

import { TabTitle } from '../../../utils/generalFunction';
import CompanySearch from '../../components/defaults/CompanySearch';
import Companies from '../../../components/Companies';

const CompanyPage = () => {
  TabTitle('Search results for employers')

  return (
    <Container maxWidth="xl">
      <Box 
        sx={{ 
          mt: 4,
          mb: 6,
        }}
      >
        <Typography 
          variant="h3" 
          gutterBottom
          sx={{
            fontWeight: 700,
            background: 'linear-gradient(45deg, #441da0 30%, #6b45c9 90%)',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            color: 'transparent',
            mb: 1
          }}
        >
          Explore Company Culture
        </Typography>
        <Typography 
          variant="h6" 
          sx={{ 
            color: 'text.secondary',
            maxWidth: '800px',
            mb: 4
          }}
        >
          Learn about company culture and choose the most suitable workplace for you
        </Typography>

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
