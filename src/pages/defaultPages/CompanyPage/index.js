import React from 'react';
import { Box, Card, Typography } from '@mui/material';

import { TabTitle } from '../../../utils/generalFunction';
import CompanySearch from '../../components/defaults/CompanySearch';
import Companies from '../../../components/Companies';

const CompanyPage = () => {
  TabTitle('Ibisubizo byo gushakisha abakoresha')

  return (
    <Box sx={{ mt: 2 }}>
      <Box sx={{ mt: 4 }}>
        <Typography variant="h4" gutterBottom>
          Menya Umuco w'Ikigo
        </Typography>
        <Typography>
          Menya umuco w'ikigo kandi uhitemo ahantu heza ho gukorera hakubereye
        </Typography>
      </Box>
      <Box sx={{ mt: 4 }}>
        <CompanySearch />
      </Box>
      <Box sx={{ mt: 4 }}>
        <Card sx={{ px: { xs: 1, sm: 1, md: 2, lg: 4, xl: 4 } }} variant="outlined">
          {/* Start: companies */}
          <Companies />
          {/* End: companies */}
        </Card>
      </Box>
    </Box>
  );
};

export default CompanyPage;
