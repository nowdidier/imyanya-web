import React from 'react';
import { Box, Card, Divider, Typography } from '@mui/material';

import { TabTitle } from '../../../utils/generalFunction';
import ProfileCard from '../../components/employers/ProfileCard';

const ProfilePage = () => {
  TabTitle("Shakisha abakandida")

  return (
    <Card sx={{ p: 3 }}>
      <Typography variant="h5">Shakisha abakandida</Typography>

      <Divider sx={{ mt: 2, mb: 3 }} />
      <Box>
        {/* Start: Profile card */}
        <ProfileCard />
        {/* End: Profile card */}
      </Box>
    </Card>
  );
};

export default ProfilePage;
