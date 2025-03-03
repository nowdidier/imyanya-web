import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Stack } from '@mui/material';
import { Result } from 'antd';

import { TabTitle } from '../../../utils/generalFunction';

const NotFoundPage = () => {
  TabTitle("Page Not Found")
  const nav = useNavigate();

  return (
    <Stack
      direction="column"
      alignItems="center"
      justifyContent="center"
      justifyItems="center"
    >
      <Result
        style={{ marginTop: '15vh' }}
        status="404"
        title="404"
        subTitle="Sorry, the page you visited does not exist."
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
