import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Stack } from '@mui/material';
import { Result } from 'antd';

import { TabTitle } from '../../../utils/generalFunction';

const NotFoundPage = () => {
  TabTitle("Ntibyabonetse")
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
        subTitle="Mbabarira, urupapuro ushaka ntirubaho."
        extra={
          <Button type="primary" variant="contained" onClick={() => nav('/')}>
            Gusubira ku rupapuro rw'itangiriro
          </Button>
        }
      />
    </Stack>
  );
};

export default NotFoundPage;
