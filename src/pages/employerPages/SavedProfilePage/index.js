import React from 'react';
import { Card } from '@mui/material';

import { TabTitle } from '../../../utils/generalFunction';
import SavedResumeCard from '../../components/employers/SavedResumeCard';

const SavedProfilePage = () => {
  TabTitle("Saved Resume Management")

  return (
    <Card sx={{ p: 3 }}>
      {/* Start: Saved Resume Card */}
      <SavedResumeCard title="Saved Resumes"/>
      {/* End: Saved Resume Card */}
    </Card>
  );
};

export default SavedProfilePage;
