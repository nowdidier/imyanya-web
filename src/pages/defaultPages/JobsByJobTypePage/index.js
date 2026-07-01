import React from 'react';
import { useSelector } from 'react-redux';
import { Container, Divider, Typography } from '@mui/material';

import { TabTitle } from '../../../utils/generalFunction';
import CategoryCard from '../../components/defaults/CategoryCard';

const JobsByJobTypePage = () => {
  TabTitle("Jobs by Job Type in Rwanda | Imyanya")
  const { allConfig } = useSelector((state) => state.config);

  return (
    <Container maxWidth="lg" sx={{ py: 2 }}>
      <Typography variant="h4">Jobs by Job Type in Rwanda</Typography>
      <Typography variant="body1" sx={{ mt: 1, color: 'text.secondary' }}>
        Search full-time, part-time, internship, and remote jobs across Rwanda.
      </Typography>
      <Divider sx={{ mt: 1, mb: 4 }} />
      <CategoryCard
        options={allConfig?.jobTypeOptions || []}
        type={'JOB_TYPE'}
      />
    </Container>
  );
};

export default JobsByJobTypePage;
