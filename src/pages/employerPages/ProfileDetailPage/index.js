import React from 'react';
import { Box, Card } from '@mui/material';

import { TabTitle } from '../../../utils/generalFunction';
import ProfileDetailCard from '../../components/employers/ProfileDetailCard';

const ProfileDetailPage = () => {
  TabTitle("Candidate Profile Details")

  return (
    <Card sx={{ p: 3 }}>
      <Box>
        {/* Start: ProfileDetailCard */}
        <ProfileDetailCard />
        {/* End: ProfileDetailCard */}
      </Box>
    </Card>
  );
};

export default ProfileDetailPage;
