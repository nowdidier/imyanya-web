import React from 'react';
import { Box, Card, Typography } from '@mui/material';
import { TabTitle } from '../../../utils/generalFunction';
import CompanySearch from '../../components/defaults/CompanySearch';
import Companies from '../../../components/Companies';

const CompanyPage = () => {
  TabTitle('Ibyavuye mu gushakisha abatanga akazi')

  return (
    <Box sx={{ mt: 2 }}>
      <Box sx={{ mt: 4 }}>
        <Typography variant="h4" gutterBottom>
          Gutegereza Umuco w'Ikigo
        </Typography>
        <Typography>
          Menya umuco w'ikigo kandi uhitamo aho ukorera bikwiriye
        </Typography>
      </Box>
      <Box sx={{ mt: 4 }}>
        <CompanySearch />
      </Box>
      <Box sx={{ mt: 4 }}>
        <Card sx={{ px: { xs: 1, sm: 1, md: 2, lg: 4, xl: 4 } }} variant="outlined">
          {/* Gutangira: ibigo*/}
          <Companies />
          {/* Guhera: ibigo*/}
        </Card>
      </Box>
    </Box>
  );
};

export default CompanyPage;