import * as React from 'react';
import { Box, Button, Card, Stack, Typography } from '@mui/material';
import WorkOutlineIcon from '@mui/icons-material/WorkOutline';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import HowToRegIcon from '@mui/icons-material/HowToReg';

import { HOST_NAME, ROUTES, isEmployerHost } from '../../configs/constants';

const EMPLOYER_ORIGIN = `https://${HOST_NAME.EMPLOYER_MYJOB}`;

const POST_JOB_URL = `${EMPLOYER_ORIGIN}/${ROUTES.EMPLOYER.JOB_POST}`;
const REGISTER_URL = `${EMPLOYER_ORIGIN}/${ROUTES.AUTH.REGISTER}`;

const BannerCTA = () => (
  <Box
    sx={{
      px: { xs: 3, sm: 6 },
      py: { xs: 4, md: 5 },
      borderRadius: 2,
      color: 'white',
      bgcolor: '#441da0',
      textAlign: 'center',
    }}
  >
    <Typography variant="h5" component="h2" fontWeight={700} gutterBottom>
      Hiring in Rwanda? Post your job on Imyanya.
    </Typography>
    <Typography variant="body1" sx={{ opacity: 0.9, maxWidth: 720, mx: 'auto' }}>
      Reach thousands of active job seekers in Kigali and across Rwanda. Create your
      employer account and publish your vacancy in minutes — qualified candidates start
      applying right away.
    </Typography>
    <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} justifyContent="center" sx={{ mt: 3 }}>
      <Button
        variant="contained"
        size="large"
        href={POST_JOB_URL}
        endIcon={<ArrowForwardIcon />}
        sx={{
          textTransform: 'none',
          fontWeight: 700,
          color: '#441da0',
          bgcolor: 'white',
          '&:hover': { bgcolor: 'rgba(255,255,255,0.85)' },
        }}
      >
        Post a Job
      </Button>
      <Button
        variant="outlined"
        size="large"
        href={REGISTER_URL}
        startIcon={<HowToRegIcon />}
        sx={{
          textTransform: 'none',
          fontWeight: 700,
          color: 'white',
          borderColor: 'rgba(255,255,255,0.7)',
          '&:hover': { borderColor: 'white', bgcolor: 'rgba(255,255,255,0.1)' },
        }}
      >
        Create Employer Account
      </Button>
    </Stack>
  </Box>
);

const CardCTA = () => (
  <Card
    sx={{
      p: { xs: 1.5, sm: 1.5, md: 2, lg: 2, xl: 2 },
      bgcolor: '#441da0',
      color: 'white',
      borderRadius: 2,
    }}
  >
    <Stack spacing={2}>
      <Box
        sx={{
          width: 48,
          height: 48,
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          bgcolor: 'rgba(255,255,255,0.15)',
        }}
      >
        <WorkOutlineIcon />
      </Box>
      <Typography variant="h5">Are you hiring?</Typography>
      <Typography variant="body2" sx={{ lineHeight: 1.6, opacity: 0.9 }}>
        Post your job on Imyanya and reach thousands of job seekers across Kigali and
        the rest of Rwanda. Your next hire is already here.
      </Typography>
      <Button
        variant="contained"
        fullWidth
        href={POST_JOB_URL}
        endIcon={<ArrowForwardIcon />}
        sx={{
          textTransform: 'none',
          fontWeight: 700,
          color: '#441da0',
          bgcolor: 'white',
          '&:hover': { bgcolor: 'rgba(255,255,255,0.85)' },
        }}
      >
        Post a Job
      </Button>
      <Button
        variant="outlined"
        fullWidth
        href={REGISTER_URL}
        sx={{
          textTransform: 'none',
          color: 'white',
          borderColor: 'rgba(255,255,255,0.7)',
          '&:hover': { borderColor: 'white', bgcolor: 'rgba(255,255,255,0.1)' },
        }}
      >
        Create Employer Account
      </Button>
    </Stack>
  </Card>
);

const InlineCTA = () => (
  <Box
    role="note"
    aria-label="Employers can post jobs on Imyanya"
    sx={{
      my: 2,
      p: 2,
      borderRadius: 2,
      border: '1px dashed rgba(68,29,160,0.4)',
      bgcolor: 'rgba(68,29,160,0.04)',
      display: 'flex',
      alignItems: 'center',
      gap: 2,
      flexWrap: { xs: 'wrap', sm: 'nowrap' },
    }}
  >
    <Box
      sx={{
        width: 40,
        height: 40,
        flexShrink: 0,
        borderRadius: '50%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        bgcolor: '#441da0',
        color: 'white',
      }}
    >
      <WorkOutlineIcon fontSize="small" />
    </Box>
    <Box sx={{ flexGrow: 1, minWidth: 0 }}>
      <Typography variant="subtitle2" fontWeight={700}>
        Hiring? Post your vacancy on Imyanya.
      </Typography>
      <Typography variant="caption" color="text.secondary">
        Reach thousands of job seekers across Rwanda — start receiving applications today.
      </Typography>
    </Box>
    <Button
      variant="contained"
      size="small"
      href={POST_JOB_URL}
      endIcon={<ArrowForwardIcon />}
      sx={{ textTransform: 'none', fontWeight: 700, flexShrink: 0 }}
    >
      Post a Job
    </Button>
  </Box>
);

const VARIANTS = {
  banner: BannerCTA,
  card: CardCTA,
  inline: InlineCTA,
};

const HiringCTA = ({ variant = 'banner' }) => {
  if (isEmployerHost()) return null;

  const VariantComponent = VARIANTS[variant] || BannerCTA;

  return <VariantComponent />;
};

export default HiringCTA;
