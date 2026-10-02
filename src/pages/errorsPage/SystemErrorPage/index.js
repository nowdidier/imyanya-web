import React from 'react';
import { Stack } from '@mui/material';
import { Result } from 'antd';

import { TabTitle } from '../../../utils/generalFunction';

const SystemErrorPage = () => {
  TabTitle("System error");
  return (
    <Stack
      direction="column"
      alignItems="center"
      justifyContent="center"
      justifyItems="center"
    >
      <Result
        style={{ marginTop: '15vh' }}
        status="500"
        title="500"
        subTitle="Sorry, the system is currently under maintenance. Please come back later."
      />
    </Stack>
  );
};

export default SystemErrorPage;
