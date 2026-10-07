import React from 'react';
import { useSelector } from 'react-redux';
import { Box, Card, CardContent, Container, Divider, Grid, Typography } from '@mui/material';
import CategoryCard from '../../components/defaults/CategoryCard';
import SeoBreadcrumbs from '../../../components/SeoBreadcrumbs';
import { TabTitle } from '../../../utils/generalFunction';
import { rwandaCareerCategoryGuides } from '../../../data/rwandaCareerContent';

const JobsByCareerPage = () => {
  TabTitle('Jobs by Career in Rwanda | Imyanya');
  const { allConfig } = useSelector((state) => state.config);
  const careerOptions = allConfig?.careerOptions || [];

  return (
    <Container maxWidth="lg" sx={{ py: 2 }}>
      <SeoBreadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "Jobs in Rwanda", href: "/jobs-in-rwanda" },
          { label: "Jobs by Career" },
        ]}
      />
      <Typography variant="h3" component="h1" fontWeight={800} sx={{ mb: 0.5 }}>
        Jobs by Career in Rwanda
      </Typography>
      <Typography variant="h6" color="text.secondary" sx={{ lineHeight: 1.7, maxWidth: 860, mb: 1 }}>
        Browse open positions across Rwanda by career field. Each sector has
        different hiring patterns, required qualifications, and application
        expectations. Understanding these differences helps you focus your job
        search on roles where your background is strongest and tailor your
        application to what employers in that field actually look for.
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
        Select a career category below to filter active listings, or read the
        career field notes for guidance on how to prepare a competitive
        application in your chosen area.
      </Typography>
      <Divider sx={{ mb: 4 }} />
      {careerOptions.length > 0 ? (
        <CategoryCard options={careerOptions} type={'CARRER'} />
      ) : (
        <Box sx={{ mb: 4, p: 3, bgcolor: 'grey.50', borderRadius: 1, border: '1px solid', borderColor: 'grey.200' }}>
          <Typography variant="h6" fontWeight={700} gutterBottom>
            No job listings available right now
          </Typography>
          <Typography color="text.secondary" sx={{ lineHeight: 1.7 }}>
            We are refreshing our job listings. In the meantime, the career field
            notes below can help you understand what each sector expects, how to
            tailor your CV, and where to focus your search when new opportunities
            are posted. Check back soon for the latest vacancies.
          </Typography>
        </Box>
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
