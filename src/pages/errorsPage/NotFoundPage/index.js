import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Stack } from '@mui/material';
import { Result } from 'antd';

import { TabTitle } from '../../../utils/generalFunction';

const NotFoundPage = () => {
  TabTitle("Page not found")
  const nav = useNavigate();

  return (
    <Stack
      component="main"
      direction="column"
      alignItems="center"
      justifyContent="center"
      sx={{ minHeight: "55vh", px: 2 }}
    >
      <Result
        style={{ marginTop: '15vh' }}
        status="404"
        title="404"
        subTitle="The link may be outdated or the page may have moved. Use the button below to continue browsing jobs and employers."
        extra={
          <Button type="primary" variant="contained" onClick={() => nav('/')}>
            Back to Home
          </Button>
        }
      />
    </Stack>
  );
};

export default NotFoundPage;
