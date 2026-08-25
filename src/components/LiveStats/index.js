import * as React from 'react';
import {
  Avatar,
  Box,
  Card,
  CardContent,
  CardHeader,
  Grid,
  Typography,
} from '@mui/material';
import WorkIcon from '@mui/icons-material/Work';
import BusinessIcon from '@mui/icons-material/Business';
import MenuBookIcon from '@mui/icons-material/MenuBook';

import jobService from '../../services/jobService';
import companyService from '../../services/companyService';
import careerArticles from '../../data/rwandaCareerArticles';
import {
  rwandaCareerCategoryGuides,
  rwandaLocationGuides,
  rwandaWorkTypeGuides,
} from '../../data/rwandaCareerContent';

const REFRESH_INTERVAL_MS = 60000;
const COUNT_UP_DURATION_MS = 1200;

const easeOutQuart = (t) => 1 - Math.pow(1 - t, 4);

const useCountUp = (target) => {
  const [value, setValue] = React.useState(0);
  const fromRef = React.useRef(0);

  React.useEffect(() => {
    const from = fromRef.current;
    if (target === from) return undefined;

    let rafId;
    const start = performance.now();

    const tick = (now) => {
      const progress = Math.min((now - start) / COUNT_UP_DURATION_MS, 1);
      const current = Math.round(from + (target - from) * easeOutQuart(progress));
      setValue(current);

      if (progress < 1) {
        rafId = requestAnimationFrame(tick);
      } else {
        fromRef.current = target;
      }
    };

    rafId = requestAnimationFrame(tick);

    return () => cancelAnimationFrame(rafId);
  }, [target]);

  return value;
};

const formatNumber = (value) => new Intl.NumberFormat('en-US').format(value);

const StatItem = ({ icon, value, label }) => {
  const animatedValue = useCountUp(value);

  return (
    <Grid item xs={12} sm={4}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
          gap: 1,
        }}
      >
        <Avatar sx={{ bgcolor: 'white' }}>
          {icon}
        </Avatar>
        <Typography variant="h4" fontWeight={700} sx={{ color: 'white' }}>
          {formatNumber(animatedValue)}
        </Typography>
        <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.85)' }}>
          {label}
        </Typography>
      </Box>
    </Grid>
  );
};

const LiveStats = () => {
  const [openJobs, setOpenJobs] = React.useState(0);
  const [companiesHiring, setCompaniesHiring] = React.useState(0);

  const guideCount =
    rwandaCareerCategoryGuides.length +
    rwandaLocationGuides.length +
    rwandaWorkTypeGuides.length +
    careerArticles.length;

  React.useEffect(() => {
    let isMounted = true;

    const fetchStats = async () => {
      try {
        const [jobsRes, companiesRes] = await Promise.all([
          jobService.getJobPosts({ page: 1, pageSize: 1 }),
          companyService.getCompanies({ page: 1, pageSize: 1 }),
        ]);

        if (!isMounted) return;

        setOpenJobs(jobsRes?.data?.count || 0);
        setCompaniesHiring(companiesRes?.data?.count || 0);
      } catch (error) {
        console.error('LiveStats fetch failed:', error);
      }
    };

    fetchStats();

    const intervalId = setInterval(() => {
      if (document.visibilityState === 'visible') {
        fetchStats();
      }
    }, REFRESH_INTERVAL_MS);

    return () => {
      isMounted = false;
      clearInterval(intervalId);
    };
  }, []);

  return (
    <Card variant="outlined" sx={{ boxShadow: 0 }}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: 'white' }} aria-label="live">
            <Box
              component="span"
              sx={{
                width: 10,
                height: 10,
                borderRadius: '50%',
                bgcolor: '#ff4d4f',
                display: 'inline-block',
                animation: 'livePulse 1.5s ease-in-out infinite',
                '@keyframes livePulse': {
                  '0%, 100%': { opacity: 1, transform: 'scale(1)' },
                  '50%': { opacity: 0.4, transform: 'scale(0.75)' },
                },
              }}
            />
          </Avatar>
        }
        title={
          <Typography variant="h5" sx={{ color: 'white' }}>
            Imyanya Right Now
          </Typography>
        }
        subheader={
          <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.75)' }}>
            Live counts — refreshed every minute
          </Typography>
        }
        sx={{
          backgroundColor: '#441da0',
          p: { xs: 0.75, sm: 1, md: 1.5, lg: 1.5, xl: 1.5 },
        }}
      />
      <CardContent
        sx={{
          backgroundColor: '#441da0',
          pt: 0,
          pb: { xs: 2, sm: 2, md: 3, lg: 3, xl: 3 },
        }}
      >
        <Grid container spacing={3} justifyContent="center">
          <StatItem
            icon={<WorkIcon sx={{ color: '#441da0' }} />}
            value={openJobs}
            label="Open jobs across Rwanda"
          />
          <StatItem
            icon={<BusinessIcon sx={{ color: '#441da0' }} />}
            value={companiesHiring}
            label="Companies hiring"
          />
          <StatItem
            icon={<MenuBookIcon sx={{ color: '#441da0' }} />}
            value={guideCount}
            label="Free guides & articles"
          />
        </Grid>
      </CardContent>
    </Card>
  );
};

export default LiveStats;
