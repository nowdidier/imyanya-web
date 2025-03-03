import React from 'react';
import { useSelector } from 'react-redux';
import { Container, Divider, Typography } from '@mui/material';
import CategoryCard from '../../components/defaults/CategoryCard';
import { TabTitle } from '../../../utils/generalFunction';

const JobsByCareerPage = () => {
  TabTitle('Jobs by Career');
  const { allConfig } = useSelector((state) => state.config);

  return (
    <Container maxWidth="lg" sx={{ py: 2 }}>
      <Typography variant="h4">Jobs by Career</Typography>
      <Divider sx={{ mt: 1, mb: 4 }} />
      <CategoryCard options={allConfig?.careerOptions || []} type={'CARRER'} />
    </Container>
  );
};

export default JobsByCareerPage;
