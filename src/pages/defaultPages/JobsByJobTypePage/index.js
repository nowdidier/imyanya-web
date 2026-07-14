import React from 'react';
import { useSelector } from 'react-redux';
import { Box, Card, CardContent, Container, Divider, Grid, Typography } from '@mui/material';

import { TabTitle } from '../../../utils/generalFunction';
import CategoryCard from '../../components/defaults/CategoryCard';
import { rwandaWorkTypeGuides } from '../../../data/rwandaCareerContent';

const JobsByJobTypePage = () => {
  TabTitle('Jobs by Job Type in Rwanda | Imyanya');
  const { allConfig } = useSelector((state) => state.config);
  const jobTypeOptions = allConfig?.jobTypeOptions || [];

  return (
    <Container maxWidth="lg" sx={{ py: 2 }}>
      <Typography variant="h4">Jobs by Job Type in Rwanda</Typography>
      <Typography variant="body1" sx={{ mt: 1, color: 'text.secondary' }}>
        Search full-time, part-time, internship, contract, and remote jobs
        across Rwanda. Work format matters, so prepare your profile around the
        expectations that fit each role type.
      </Typography>
      <Divider sx={{ mt: 1, mb: 4 }} />
      {jobTypeOptions.length > 0 ? (
        <CategoryCard options={jobTypeOptions} type={'JOB_TYPE'} />
      ) : (
        <Typography color="text.secondary" sx={{ mb: 3 }}>
          Live work-type filters are loading. The guide below explains how to
          compare opportunities while job data is being refreshed.
        </Typography>
      )}

      <Box sx={{ mt: 5 }}>
        <Typography variant="h5" component="h2" fontWeight={700} gutterBottom>
          Work Type Notes
        </Typography>
        <Grid container spacing={2}>
          {rwandaWorkTypeGuides.map((item) => (
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

export default JobsByJobTypePage;
