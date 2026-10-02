import React from 'react';
import { Card } from '@mui/material';

import { TabTitle } from '../../../utils/generalFunction';
import AppliedResumeCard from '../../components/employers/AppliedResumeCard';

const ProfileAppliedPage = () => {
  TabTitle("Manage Applied Resumes")

  return (
    <Card sx={{ p: 3 }}>
      {/* Start: Applied Resume Card */}
      <AppliedResumeCard title="Profile applied"/>
      {/* End: Applied Resume Card */}
    </Card>
  );
};

export default ProfileAppliedPage;
