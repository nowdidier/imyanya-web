import React from 'react';
import { useSelector } from 'react-redux';
import { Box, Card, CardContent, Container, Divider, Grid, Typography } from '@mui/material';

import { TabTitle } from '../../../utils/generalFunction';
import CategoryCard from '../../components/defaults/CategoryCard';
import SeoBreadcrumbs from '../../../components/SeoBreadcrumbs';
import OrganisationsMap from '../../../components/OrganisationsMap';
import { rwandaLocationGuides } from '../../../data/rwandaCareerContent';

const JobsByCityPage = () => {
  TabTitle('Jobs by Location in Rwanda | Imyanya');
  const { allConfig } = useSelector((state) => state.config);
  const cityOptions = allConfig?.cityOptions || [];

  return (
    <Container maxWidth="lg" sx={{ py: 2 }}>
      <SeoBreadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "Jobs in Rwanda", href: "/jobs-in-rwanda" },
          { label: "Jobs by Location" },
        ]}
      />
      <Typography variant="h3" component="h1" fontWeight={800} sx={{ mb: 0.5 }}>
        Jobs by Location in Rwanda
      </Typography>
      <Typography variant="h6" color="text.secondary" sx={{ lineHeight: 1.7, maxWidth: 860, mb: 1 }}>
        Search job vacancies across Rwanda&apos;s cities and districts. While
        Kigali has the highest concentration of office and professional roles —
        see dedicated{" "}
        <Typography
          component="a"
          href="/kigali-jobs"
          sx={{ color: "primary.main", textDecoration: "none", fontWeight: 600 }}
        >
          Kigali jobs
        </Typography>{" "}
        listings — opportunities exist in every province for candidates with
        the right skills and flexibility. Your location preference and
        willingness to travel or relocate can significantly expand your options.
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
        Choose a city or district below to see active listings, or read the
        location search notes for advice on how to present your availability and
        location preferences to employers.
      </Typography>
      <Divider sx={{ mb: 4 }} />
      {cityOptions.length > 0 ? (
        <CategoryCard options={cityOptions} type={'CITY'} />
      ) : (
        <Box sx={{ mb: 4, p: 3, bgcolor: 'grey.50', borderRadius: 1, border: '1px solid', borderColor: 'grey.200' }}>
          <Typography variant="h6" fontWeight={700} gutterBottom>
            No location filters available right now
          </Typography>
          <Typography color="text.secondary" sx={{ lineHeight: 1.7 }}>
            We are updating our location data. The location search notes below
            can still help you decide how to present your location preference,
            commute readiness, and flexibility to employers. Check back soon for
            the latest listings filtered by city and district.
          </Typography>
        </Box>
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

      <Box sx={{ mt: 5 }}>
        <OrganisationsMap
          title="Organisations by District"
          subtitle="Prefer browsing by place? Filter the map by district or city, then click any pin to see that employer's open roles."
        />
      </Box>
    </Container>
  );
};

export default JobsByCityPage;
