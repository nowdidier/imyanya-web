import React from 'react';
import { useSelector } from 'react-redux';
import { Container, Divider, Typography } from '@mui/material';

import { TabTitle } from '../../../utils/generalFunction';
import CategoryCard from '../../components/defaults/CategoryCard';

const JobsByCityPage = () => {
  TabTitle("Akazi hakurikijwe intara")
  const { allConfig } = useSelector((state) => state.config);

  return (
    <Container maxWidth="lg" sx={{ py: 2 }}>
      <Typography variant="h4">Akazi hakurikijwe Intara</Typography>
      <Divider sx={{ mt: 1, mb: 4 }} />
      <CategoryCard options={allConfig?.cityOptions || []}  type={"CITY"}/>
    </Container>
  );
};

export default JobsByCityPage;
