import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import dayjs from 'dayjs';
import { Box, Card, Chip, Divider, Skeleton, Stack, Tooltip, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import Moment from 'react-moment';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCalendarDays,
  faCircleDollarToSlot,
  faLocationDot,
  faFire,
  faBolt,
  faClock,
} from '@fortawesome/free-solid-svg-icons';
import { salaryString } from '../../utils/customData';
import MuiImageCustom from '../MuiImageCustom';
import { formatRoute } from '../../utils/funcUtils';
import { ROUTES } from '../../configs/constants';

const getCompanyInitials = (value = '') => {
  const parts = String(value)
    .trim()
    .split(/\s+/)
    .filter(Boolean);

  if (parts.length === 0) return 'JB';

  return parts
    .slice(0, 2)
    .map((part) => part[0])
    .join('')
    .toUpperCase();
};

const JobPost = ({
  slug,
  href,
  target = '_blank',
  rel = 'noopener noreferrer',
  companyImageUrl,
  companyName,
  jobName,
  categoryLabel,
  locationLabel,
  cityId,
  deadline,
  dateLabel,
  metaLabel,
  salaryLabel,
  isUrgent,
  isHot,
  salaryMin,
  salaryMax,
}) => {
  const myRef = React.useRef(null);
  const [width, setWidth] = React.useState('95%');
  const nav = useNavigate();
  const { allConfig } = useSelector((state) => state.config);
  const theme = useTheme();
  const jobDetailPath = slug ? `/${formatRoute(ROUTES.JOB_SEEKER.JOB_DETAIL, slug)}` : null;
  const hasExternalLink = Boolean(href);
  const isInteractive = hasExternalLink || Boolean(jobDetailPath);
  const deadlineText =
    dateLabel ||
    (deadline && dayjs(deadline).isValid()
      ? dayjs(deadline).format('DD/MM/YYYY')
      : 'Open now');

  React.useEffect(() => {
    const elementWidth = myRef.current?.offsetWidth;
    setWidth(Math.max(0, (elementWidth || 0) - 70));
  }, []);

  const handleCardClick = () => {
    if (jobDetailPath) {
      nav(jobDetailPath);
    }
  };

  const handleCardKeyDown = (event) => {
    if (!jobDetailPath) return;

    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      nav(jobDetailPath);
    }
  };

  return (
    <Card
      variant="outlined"
      {...(hasExternalLink
        ? {
            component: 'a',
            href,
            target,
            rel,
          }
        : {
            role: isInteractive ? 'link' : undefined,
            tabIndex: isInteractive ? 0 : undefined,
            onClick: isInteractive ? handleCardClick : undefined,
            onKeyDown: isInteractive ? handleCardKeyDown : undefined,
          })}
      sx={{
        boxShadow: 0,
        cursor: isInteractive ? 'pointer' : 'default',
        px: 2,
        pt: 2,
        pb: 1,
        transition: 'all 0.3s ease',
        borderRadius: 2,
        border: `1px solid ${theme.palette.divider}`,
        position: 'relative',
        overflow: 'hidden',
        textDecoration: 'none',
        color: 'inherit',
        ...(isUrgent && {
          borderLeft: 'none',
          backgroundColor: theme.palette.secondary.background,
          '&::before': {
            content: '""',
            position: 'absolute',
            left: 0,
            top: 0,
            bottom: 0,
            width: '4px',
            background: theme.palette.secondary.main,
            borderRadius: '4px',
            boxShadow: `0 0 8px ${theme.palette.secondary.main}40`,
          },
        }),
        ...(isInteractive && {
          '&:hover': {
            transform: 'translateY(-2px)',
            boxShadow: theme.customShadows.large,
            ...(isUrgent
              ? {
                  borderColor: theme.palette.secondary.main,
                  borderLeft: 'none',
                  backgroundColor: theme.palette.secondary.backgroundHover,
                }
              : {
                  borderColor: theme.palette.primary.main,
                }),
          },
        }),
      }}
    >
      {isHot && (
        <Tooltip title="Hot" placement="top">
          <Box
            sx={{
              position: 'absolute',
              top: 5,
              right: 6,
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
              backgroundColor: theme.palette.hot.background,
              padding: '4px 8px',
              borderRadius: '4px',
              zIndex: 1,
            }}
          >
            <FontAwesomeIcon 
              icon={faFire} 
              style={{ 
                fontSize: '14px',
                color: theme.palette.hot.main,
              }}
            />
            <Typography
              sx={{
                fontSize: '12px',
                fontWeight: 'bold',
                color: theme.palette.hot.main,
                lineHeight: 1,
              }}
            >
              HOT
            </Typography>
          </Box>
        </Tooltip>
      )}

      <Stack direction="row" spacing={2} alignItems="center" ref={myRef}>
        <Stack>
          <Box sx={{ position: 'relative' }}>
            {companyImageUrl ? (
              <MuiImageCustom
                width={65}
                height={65}
                src={companyImageUrl}
                sx={{
                  border: 1,
                  borderRadius: 2,
                  borderColor: theme.palette.grey[200],
                  p: 1,
                  backgroundColor: theme.palette.common.white,
                  transition: 'transform 0.2s ease',
                  '&:hover': {
                    transform: 'scale(1.05)',
                  },
                }}
              />
            ) : (
              <Box
                sx={{
                  width: 65,
                  height: 65,
                  border: 1,
                  borderRadius: 2,
                  borderColor: theme.palette.grey[200],
                  p: 1,
                  background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: theme.palette.common.white,
                  fontWeight: 800,
                  letterSpacing: 0.5,
                  transition: 'transform 0.2s ease',
                  '&:hover': {
                    transform: 'scale(1.05)',
                  },
                }}
              >
                {getCompanyInitials(companyName)}
              </Box>
            )}
            {isUrgent && (
              <Tooltip title="Urgent Hiring" placement="top">
                <Box
                  sx={{
                    position: 'absolute',
                    top: -6,
                    left: -6,
                    backgroundColor: theme.palette.common.white,
                    borderRadius: '50%',
                    width: 20,
                    height: 20,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: theme.customShadows.small,
                    zIndex: 1,
                  }}
                >
                  <FontAwesomeIcon 
                    icon={faBolt} 
                    style={{ 
                      fontSize: '12px',
                      color: theme.palette.warning.main,
                    }}
                  />
                </Box>
              </Tooltip>
            )}
          </Box>
        </Stack>
        <Stack
          spacing={0.5}
          width={width}
        >
          <Stack
            direction="row"
            alignItems="center"
            style={{ overflow: 'hidden' }}
            spacing={1.25}
          >
            <Tooltip followCursor title={jobName}>
              <Typography
                variant="subtitle2"
                sx={{
                  fontSize: 14,
                  fontWeight: 600,
                  fontFamily: 'Open Sans',
                  color: theme.palette.grey[800],
                }}
                noWrap
                style={{
                  textOverflow: 'ellipsis',
                }}
                flex={1}
              >
                {jobName}
              </Typography>
            </Tooltip>
          </Stack>
          <Tooltip followCursor title={companyName}>
            <Typography
              variant="subtitle2"
              sx={{
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                fontSize: 13,
                color: theme.palette.grey[600],
                fontWeight: 500,
              }}
            >
              {companyName}
            </Typography>
          </Tooltip>
          {categoryLabel && (
            <Chip
              label={categoryLabel}
              size="small"
              variant="outlined"
              color="primary"
              sx={{
                alignSelf: 'flex-start',
                height: 22,
                mt: 0.25,
                '& .MuiChip-label': {
                  px: 1,
                  fontSize: 11,
                  fontWeight: 600,
                },
              }}
            />
          )}
        </Stack>
      </Stack>

      <Stack
        direction="row"
        spacing={2}
        sx={{ mt: 2 }}
        justifyContent="flex-start"
      >
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 0.8,
            color: theme.palette.grey[600],
          }}
        >
          <FontAwesomeIcon icon={faCircleDollarToSlot} color={theme.palette.primary.main} />
          <Typography sx={{ fontWeight: 500, fontSize: 13 }} variant="body2">
            {salaryLabel || salaryString(salaryMin, salaryMax)}
          </Typography>
        </Box>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 0.8,
            color: theme.palette.grey[600],
          }}
        >
          <FontAwesomeIcon icon={faLocationDot} color={theme.palette.primary.main} />
          <Typography sx={{ fontWeight: 500, fontSize: 13 }} variant="body2">
            {locationLabel || allConfig?.cityDict?.[cityId] || (
              <span style={{ fontStyle: 'italic', color: theme.palette.grey[500] }}>
                Not updated
              </span>
            )}
          </Typography>
        </Box>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 0.8,
            color: theme.palette.grey[600],
          }}
        >
          <FontAwesomeIcon icon={faCalendarDays} color={theme.palette.primary.main} />
          <Typography sx={{ fontWeight: 500, fontSize: 13 }} variant="body2">
            {deadlineText}
          </Typography>
        </Box>
      </Stack>

      <Divider sx={{ mt: 1, mb: 0.75, borderColor: theme.palette.grey[400] }} />
      
      <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 0.8,
            color: theme.palette.grey[600],
          }}
        >
          <FontAwesomeIcon 
            icon={faClock} 
            style={{ fontSize: '14px' }}
            color={theme.palette.grey[400]}
          />
          <Typography 
            sx={{ 
              fontWeight: 500, 
              fontSize: 13,
              color: theme.palette.grey[600]
            }} 
            variant="body2"
          >
            {metaLabel || (deadline ? (
              <>
                Expires in <Moment fromNow ago>{deadline}</Moment>
              </>
            ) : 'Open now')}
          </Typography>
        </Box>
      </Box>

    </Card>
  );
};

const Loading = () => (
  <>
    <Card sx={{ p: 1, boxShadow: 0 }}>
      <Stack direction="row" spacing={1}>
        <Box>
          <Skeleton variant="rounded" width={60} height={60} />
        </Box>
        <Box flex={1}>
          <Typography variant="subtitle2" sx={{ fontSize: 15 }} gutterBottom>
            <Skeleton height={30} />
          </Typography>
          <Typography variant="subtitle2" color="gray">
            <Skeleton />
          </Typography>
        </Box>
        <Box>
          <Skeleton height={30} width={60} />
        </Box>
      </Stack>
      <Stack
        direction="row"
        spacing={1}
        sx={{ mt: 0.75 }}
        justifyContent="space-between"
      >
        <Stack direction="row" spacing={1} justifyContent="space-between">
          <Skeleton width={80} />
          <Skeleton width={80} />
          <Skeleton width={80} />
        </Stack>
      </Stack>
    </Card>
  </>
);

JobPost.Loading = Loading;

export default JobPost;
