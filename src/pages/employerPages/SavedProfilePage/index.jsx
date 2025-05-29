import React from 'react';
import { Card } from '@mui/material';

import { TabTitle } from '../../../utils/generalFunction';
import SavedResumeCard from '../../components/employers/SavedResumeCard';

const SavedProfilePage = () => {
  TabTitle("Manage Saved Profiles")

  return (
    <Card sx={{ p: 3 }}>
      {/* Start: Saved Resume Card */}
      <SavedResumeCard title="Saved Profiles"/>
      {/* End: Saved Resume Card */}
    </Card>
  );
};

export default SavedProfilePage;
