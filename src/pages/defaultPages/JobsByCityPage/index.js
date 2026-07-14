import React from 'react';
import { useSelector } from 'react-redux';
import { Box, Card, CardContent, Container, Divider, Grid, Typography } from '@mui/material';

import { TabTitle } from '../../../utils/generalFunction';
import CategoryCard from '../../components/defaults/CategoryCard';
import { rwandaLocationGuides } from '../../../data/rwandaCareerContent';

const JobsByCityPage = () => {
  TabTitle('Jobs by Location in Rwanda | Imyanya');
  const { allConfig } = useSelector((state) => state.config);
  const cityOptions = allConfig?.cityOptions || [];

  return (
    <Container maxWidth="lg" sx={{ py: 2 }}>
      <Typography variant="h4">Jobs by Location in Rwanda</Typography>
      <Typography variant="body1" sx={{ mt: 1, color: 'text.secondary' }}>
        Browse vacancies across Kigali and the rest of Rwanda by city or
        province, and compare how location affects commute, field work, and
        employer expectations.
      </Typography>
      <Divider sx={{ mt: 1, mb: 4 }} />
      {cityOptions.length > 0 ? (
        <CategoryCard options={cityOptions} type={'CITY'} />
      ) : (
        <Typography color="text.secondary" sx={{ mb: 3 }}>
          Live location filters are loading. The guide below remains available
          while job-location data is being refreshed.
        </Typography>
      )}

      <Box sx={{ mt: 5 }}>
        <Typography variant="h5" component="h2" fontWeight={700} gutterBottom>
          Location Search Notes
        </Typography>
        <Grid container spacing={2}>
          {rwandaLocationGuides.map((item) => (
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
      </Box>
    </Container>
  );
};

export default JobsByCityPage;
