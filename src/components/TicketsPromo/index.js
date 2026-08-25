import * as React from 'react';
import { Box, Button, Stack, Typography } from '@mui/material';
import ConfirmationNumberIcon from '@mui/icons-material/ConfirmationNumber';
import EventIcon from '@mui/icons-material/Event';
import StorefrontIcon from '@mui/icons-material/Storefront';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

import { HOST_NAME, isEmployerHost } from '../../configs/constants';

const TICKETS_URL = `https://tickets.${HOST_NAME.MYJOB}`;

const Banner = () => (
  <Box
    sx={{
      px: { xs: 3, sm: 6 },
      py: { xs: 4, md: 4 },
      borderRadius: 2,
      border: '1px solid',
      borderColor: 'rgba(68,29,160,0.15)',
      bgcolor: '#f6f1ff',
      textAlign: 'center',
    }}
  >
    <Box
      sx={{
        width: 56,
        height: 56,
        mx: 'auto',
        mb: 2,
        borderRadius: '50%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        bgcolor: '#441da0',
        color: 'white',
      }}
    >
      <ConfirmationNumberIcon />
    </Box>
    <Typography variant="h5" component="h2" fontWeight={700} color="#441da0" gutterBottom>
      Events, concerts & sports across Rwanda
    </Typography>
    <Typography variant="body1" color="text.secondary" sx={{ maxWidth: 720, mx: 'auto' }}>
      Discover what&apos;s happening in Kigali and beyond, buy your ticket online, and get in
      with a secure digital QR code — powered by Imyanya Tickets.
    </Typography>
    <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} justifyContent="center" sx={{ mt: 3 }}>
      <Button
        variant="contained"
        size="large"
        href={TICKETS_URL}
        target="_blank"
        rel="noopener noreferrer"
        startIcon={<EventIcon />}
        endIcon={<ArrowForwardIcon />}
        sx={{ textTransform: 'none', fontWeight: 700 }}
      >
        Find Events
      </Button>
      <Button
        variant="outlined"
        size="large"
        href={TICKETS_URL}
        target="_blank"
        rel="noopener noreferrer"
        startIcon={<StorefrontIcon />}
        sx={{
          textTransform: 'none',
          fontWeight: 700,
          color: '#441da0',
          borderColor: 'rgba(68,29,160,0.5)',
          '&:hover': {
            borderColor: '#441da0',
            bgcolor: 'rgba(68,29,160,0.06)',
          },
        }}
      >
        Sell Tickets
      </Button>
    </Stack>
  </Box>
);

const VARIANTS = {
  banner: Banner,
};

const TicketsPromo = ({ variant = 'banner' }) => {
  if (isEmployerHost()) return null;

  const VariantComponent = VARIANTS[variant] || Banner;

  return <VariantComponent />;
};

export default TicketsPromo;
