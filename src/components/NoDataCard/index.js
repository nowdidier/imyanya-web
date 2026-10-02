import React from 'react';
import { Box, Stack, Typography } from '@mui/material';
import { ImageSvg1 } from '../../configs/constants';

const NoDataCard = ({
  children,
  title = 'No data found',
  imgComponentSgv = <ImageSvg1 />,
}) => {
  return (
    <Stack
      justifyContent="center"
      alignItems="center"
      spacing={3}
      sx={{ py: 4 }}
    >
      <div>{imgComponentSgv}</div>
      <Typography
        variant="caption"
        sx={{ color: '#9e9e9e', textAlign: 'center' }}
      >
        {title}
      </Typography>
      <Box>{children}</Box>
    </Stack>
  );
};

export default NoDataCard;
