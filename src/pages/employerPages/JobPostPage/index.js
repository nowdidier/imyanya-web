import React from 'react';
import { Card } from '@mui/material';

import { TabTitle } from '../../../utils/generalFunction';
import JobPostCard from '../../components/employers/JobPostCard';

const JobPostPage = () => {
  TabTitle("Job Posts Management")

  return (
    <Card sx={{ p: 3 }}>
      <JobPostCard />
    </Card>
  );
};

export default JobPostPage;
