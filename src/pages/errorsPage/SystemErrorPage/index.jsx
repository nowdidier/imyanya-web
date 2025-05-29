import React from 'react';
import { Stack } from '@mui/material';
import { Result } from 'antd';

const SystemErrorPage = () => {
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
        subTitle="Sorry, the system is under maintenance. Please try again later."
      />
    </Stack>
  );
};

export default SystemErrorPage;
