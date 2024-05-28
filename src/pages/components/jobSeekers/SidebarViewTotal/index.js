import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Avatar,
  Box,
  Button,
  CircularProgress,
  Stack,
  Typography,
} from '@mui/material';

import statisticService from '../../../../services/statisticService';

const SidebarViewTotal = () => {
  const nav = useNavigate();
  const [isLoading, setIsLoading] = React.useState(true);
  const [data, setData] = React.useState(null);

  React.useEffect(() => {
    const statistics = async () => {
      setIsLoading(true);
      try {
        const resData = await statisticService.jobSeekerTotalView();

        setData(resData.data);
      } catch (error) {
        console.error('Error: ', error);
      } finally {
        setIsLoading(false);
      }
    };

    statistics();
  }, []);

  return (
    <Box>
      <Box>
        <Typography variant="h6" sx={{ mb: 1 }}>
          Ese CV yawe imeze neza bihagije?
        </Typography>
        <Typography variant="caption">
          Ni ba NTD bangahe bari kwitabira Umwirondoro wawe?
        </Typography>
      </Box>
      <Box sx={{ pt: 2 }}>
        <Stack direction="row" spacing={2}>
          <Box>
            <Avatar sx={{ width: 80, height: 80, bgcolor: '#182642' }}>
              {isLoading ? (
                <CircularProgress color="secondary" />
              ) : data === null ? (
                '---'
              ) : (
                data?.totalView
              )}
            </Avatar>
          </Box>
          <Box>
            <Typography variant="body1">
              Buri gihe Umukozi areba CV yawe, biguha amahirwe yo kwegera akazi gakwiriye.
            </Typography>
          </Box>
        </Stack>
      </Box>
      <Stack sx={{ pt: 3 }} direction="row" justifyContent="flex-end">
        <Button
          variant="contained"
          size="small"
          onClick={() => nav('/viec-lam')}
        >
          Tembera Umenye
        </Button>
      </Stack>
    </Box>
  );
};

export default SidebarViewTotal;
