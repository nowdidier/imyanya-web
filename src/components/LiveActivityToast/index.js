import * as React from 'react';
import { Link } from 'react-router-dom';
import { Box, Card, Typography, styled } from '@mui/material';
import WorkIcon from '@mui/icons-material/Work';

import jobService from '../../services/jobService';
import { isEmployerHost } from '../../configs/constants';

const FETCH_SIZE = 20;
const SHOW_DURATION_MS = 6000;
const INTERVAL_MS = 18000;
const FETCH_DELAY_MS = 4000;

const ToastCard = styled(Card)(() => ({
  position: 'fixed',
  left: 16,
  bottom: 16,
  zIndex: 1200,
  maxWidth: 340,
  width: 'calc(100% - 32px)',
  borderRadius: 12,
  boxShadow: '0 8px 24px rgba(0,0,0,0.18)',
}));

const timeAgo = (dateString) => {
  if (!dateString) return null;

  const seconds = Math.floor((Date.now() - new Date(dateString).getTime()) / 1000);
  if (Number.isNaN(seconds) || seconds < 0) return null;
  if (seconds < 3600) {
    const minutes = Math.max(1, Math.floor(seconds / 60));
    return `${minutes}m ago`;
  }
  if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`;
  return `${Math.floor(seconds / 86400)}d ago`;
};

const LiveActivityToast = () => {
  const [jobs, setJobs] = React.useState([]);
  const [activeIndex, setActiveIndex] = React.useState(-1);
  const [isVisible, setIsVisible] = React.useState(false);

  React.useEffect(() => {
    if (isEmployerHost()) return undefined;

    const timer = setTimeout(async () => {
      try {
        const resData = await jobService.getJobPosts({
          page: 1,
          pageSize: FETCH_SIZE,
        });
        setJobs(resData?.data?.results || []);
      } catch (error) {
        console.error('LiveActivityToast fetch failed:', error);
      }
    }, FETCH_DELAY_MS);

    return () => clearTimeout(timer);
  }, []);

  const hasJobs = jobs.length > 0;

  React.useEffect(() => {
    if (!hasJobs) return undefined;

    let showTimeoutId;
    let intervalId;

    const showNext = () => {
      if (document.visibilityState !== 'visible') return;

      setActiveIndex((prev) => (prev + 1) % jobs.length);
      setIsVisible(true);

      showTimeoutId = setTimeout(() => setIsVisible(false), SHOW_DURATION_MS);
    };

    const startDelay = setTimeout(showNext, 1500);
    intervalId = setInterval(showNext, INTERVAL_MS);

    return () => {
      clearTimeout(startDelay);
      clearTimeout(showTimeoutId);
      clearInterval(intervalId);
    };
  }, [hasJobs, jobs.length]);

  if (!hasJobs) return null;

  const job = jobs[activeIndex];
  if (!job) return null;

  const ago = timeAgo(job.createdAt || job.created);

  return (
    <ToastCard
      sx={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0)' : 'translateY(12px)',
        transition: 'opacity 0.4s ease, transform 0.4s ease',
        pointerEvents: isVisible ? 'auto' : 'none',
      }}
    >
      <Box
        component={Link}
        to={`/viec-lam/${job.slug}`}
        sx={{
          display: 'flex',
          gap: 1.5,
          p: 1.5,
          textDecoration: 'none',
          alignItems: 'flex-start',
        }}
      >
        <Box
          sx={{
            width: 36,
            height: 36,
            flexShrink: 0,
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            bgcolor: 'rgba(68,29,160,0.08)',
            color: '#441da0',
          }}
        >
          <WorkIcon fontSize="small" />
        </Box>
        <Box sx={{ minWidth: 0 }}>
          <Typography variant="caption" sx={{ color: '#441da0', fontWeight: 700 }}>
            New on Imyanya
          </Typography>
          <Typography
            variant="body2"
            noWrap
            sx={{ fontWeight: 600, color: 'text.primary' }}
          >
            {job.jobName} at {job?.companyDict?.companyName}
          </Typography>
          <Typography variant="caption" color="text.secondary" noWrap>
            {job?.locationDict?.city ? `${job.locationDict.city}` : 'Rwanda'}
            {ago ? ` · posted ${ago}` : ''}
          </Typography>
        </Box>
      </Box>
    </ToastCard>
  );
};

export default LiveActivityToast;
