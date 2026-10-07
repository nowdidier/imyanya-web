import React from 'react';

import { TabTitle } from '../../../utils/generalFunction';
import JobPostCard from '../../components/employers/JobPostCard';

const JobPostPage = () => {
  TabTitle("Manage Job Postings")

  return (
    <JobPostCard />
  );
};

export default JobPostPage;
