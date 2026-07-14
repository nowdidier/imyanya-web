import React from 'react';
import { useSelector } from 'react-redux';
import { Box, Card, CardContent, Container, Divider, Grid, Typography } from '@mui/material';
import CategoryCard from '../../components/defaults/CategoryCard';
import { TabTitle } from '../../../utils/generalFunction';
import { rwandaCareerCategoryGuides } from '../../../data/rwandaCareerContent';

const JobsByCareerPage = () => {
  TabTitle('Jobs by Career in Rwanda | Imyanya');
  const { allConfig } = useSelector((state) => state.config);
  const careerOptions = allConfig?.careerOptions || [];

  return (
    <Container maxWidth="lg" sx={{ py: 2 }}>
      <Typography variant="h4">Jobs by Career in Rwanda</Typography>
      <Typography variant="body1" sx={{ mt: 1, color: 'text.secondary' }}>
        Explore active job categories and learn what employers usually compare
        inside each field before you choose where to apply.
      </Typography>
      <Divider sx={{ mt: 1, mb: 4 }} />
      {careerOptions.length > 0 ? (
        <CategoryCard options={careerOptions} type={'CARRER'} />
      ) : (
        <Typography color="text.secondary" sx={{ mb: 3 }}>
          Live category filters are loading. The guide below can still help you
          choose a field and prepare a stronger application.
        </Typography>
      )}

      <Box sx={{ mt: 5 }}>
        <Typography variant="h5" component="h2" fontWeight={700} gutterBottom>
          Career Field Notes
        </Typography>
        <Grid container spacing={2}>
          {rwandaCareerCategoryGuides.map((item) => (
            <Grid item xs={12} md={6} key={item.title}>
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

export default JobsByCareerPage;
