import React from 'react';
import { Box, Card, CardContent, Grid, Typography, Container } from '@mui/material';

import { TabTitle } from '../../../utils/generalFunction';
import CompanySearch from '../../components/defaults/CompanySearch';
import Companies from '../../../components/Companies';
import { employerEvaluationGuide } from '../../../data/rwandaCareerContent';

const CompanyPage = () => {
  TabTitle('Employer Search Results')

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
          Learn about company culture, open roles, and hiring signals before you
          decide where to apply in Rwanda.
        </Typography>

        <Grid container spacing={2} sx={{ mb: 4 }}>
          {employerEvaluationGuide.map((item) => (
            <Grid item xs={12} md={4} key={item.title}>
              <Card variant="outlined" sx={{ height: '100%', borderRadius: 1 }}>
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
