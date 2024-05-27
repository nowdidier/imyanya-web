import React from 'react';
import { Card, Grid, Stack } from '@mui/material';

import { TabTitle } from '../../../utils/generalFunction';
import AccountCard from '../../components/auths/AccountCard';

const AccountPage = () => {
  TabTitle('Gucunga konti y’Umukoresha');

  return (
    <Stack spacing={3}>
      <Card sx={{ p: 2 }}>
        <Grid container>
          <Grid item xs={12} sm={12} md={6} lg={5} xl={5}>
            {/* Start: Account card */}
            <AccountCard title="Amakuru ya konti" />
            {/* End: Account card */}
          </Grid>
        </Grid>
      </Card>
    </Stack>
  );
};

export default AccountPage;
