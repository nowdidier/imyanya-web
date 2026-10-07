import React from 'react';
import { useSelector } from 'react-redux';
import { Box, Card, CardContent, Container, Divider, Grid, Typography } from '@mui/material';

import { TabTitle } from '../../../utils/generalFunction';
import CategoryCard from '../../components/defaults/CategoryCard';
import SeoBreadcrumbs from '../../../components/SeoBreadcrumbs';
import { rwandaWorkTypeGuides } from '../../../data/rwandaCareerContent';

const JobsByJobTypePage = () => {
  TabTitle('Full-time, Part-time and Remote Jobs in Rwanda | Imyanya');
  const { allConfig } = useSelector((state) => state.config);
  const jobTypeOptions = allConfig?.jobTypeOptions || [];

  return (
    <Container maxWidth="lg" sx={{ py: 2 }}>
      <SeoBreadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "Jobs in Rwanda", href: "/jobs-in-rwanda" },
          { label: "Jobs by Type" },
        ]}
      />
      <Typography variant="h3" component="h1" fontWeight={800} sx={{ mb: 0.5 }}>
        Full-time, Part-time and Remote Jobs in Rwanda
      </Typography>
      <Typography variant="h6" color="text.secondary" sx={{ lineHeight: 1.7, maxWidth: 860, mb: 1 }}>
        Find full-time roles, part-time positions, internships, contract work,
        and remote opportunities across Rwanda. Each work type comes with
        different employer expectations around availability, commitment, and
        deliverables. Matching your profile to the right format helps you get
        noticed faster.
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
        Select a work type below to browse matching listings, or read the work
        type notes for advice on how to present your availability and experience
        for each category.
      </Typography>
      <Divider sx={{ mb: 4 }} />
      {jobTypeOptions.length > 0 ? (
        <CategoryCard options={jobTypeOptions} type={'JOB_TYPE'} />
      ) : (
        <Box sx={{ mb: 4, p: 3, bgcolor: 'grey.50', borderRadius: 1, border: '1px solid', borderColor: 'grey.200' }}>
          <Typography variant="h6" fontWeight={700} gutterBottom>
            No work type filters available right now
          </Typography>
          <Typography color="text.secondary" sx={{ lineHeight: 1.7 }}>
            We are refreshing our job type data. The work type notes below can
            still guide you on how different employment formats are evaluated by
            employers in Rwanda. Check back soon for updated listings organised
            by work type.
          </Typography>
        </Box>
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
