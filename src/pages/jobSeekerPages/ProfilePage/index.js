import React from 'react';
import { Link } from 'react-router-dom';
import {
  Box,
  Card,
  Divider,
  Grid,
  Stack,
  Typography,
  Button,
} from '@mui/material';

import { TabTitle } from '../../../utils/generalFunction';
import BoxProfile from '../../components/jobSeekers/BoxProfile';
import ProfileUpload from '../../components/jobSeekers/ProfileUpload';
import CompanyViewedCard from '../../components/jobSeekers/CompanyViewedCard';

const ProfilePage = () => {
  TabTitle("Kubika umwirondoro w'akazi") // Translated to 'Manage job profile'

  return (
    <Box>
      <Grid container spacing={2}>
        <Grid xs={12} sm={12} md={12} lg={8} xl={8} item>
          <Stack spacing={2}>
            <Card sx={{ p: { xs: 2, sm: 2, md: 2, lg: 3, xl: 3 } }}>
              {/* Start: Box profile */}
              <BoxProfile title="IMYANYAProfile" /> // Title kept in English
              {/* End: Box profile  */}
            </Card>
            <Card sx={{ p: { xs: 2, sm: 2, md: 2, lg: 3, xl: 3 } }}>
              {/* Start: Profile upload */}
              <ProfileUpload title="Umwirondoro wifatanye" /> // Translated to 'Attached profile'
              {/* End: Profile upload */}
            </Card>
          </Stack>
        </Grid>
        <Grid xs={12} sm={12} md={12} lg={4} xl={4} item>
          <Stack spacing={2}>
            <Card sx={{ p: { xs: 1, sm: 1, md: 2, lg: 2, xl: 2 } }}>
              <Stack>
                <Box>
                  <Typography variant="h6">Abarebye umwirondoro wawe</Typography> // Translated to 'Who viewed your profile'
                </Box>
                <Divider sx={{ mt: 2, mb: 3 }} />
                <Box>
                  {/* Start: CompanyViewedCard */}
                  <CompanyViewedCard />
                  {/* End: CompanyViewedCard */}
                </Box>
                <Stack direction="row" justifyContent="center">
                  <Button
                    sx={{ textTransform: 'inherit' }}
                    variant="text"
                    color="primary"
                    component={Link}
                    to="/ung-vien/cong-ty-cua-toi" // Path kept unchanged
                  >
                    Reba ibisobanuro // Translated to 'View details'
                  </Button>
                </Stack>
              </Stack>
            </Card>
          </Stack>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ProfilePage;
