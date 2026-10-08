import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Avatar, Box, Card, Skeleton, Stack, Typography } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBriefcase,
  faFontAwesome,
  faMapLocation,
  faUser,
  faUsers,
} from '@fortawesome/free-solid-svg-icons';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import VerifiedIcon from '@mui/icons-material/Verified';

import { IMAGES, ROLES_NAME } from '../../configs/constants';
import MuiImageCustom from '../MuiImageCustom';
import ClaimOrganisationButton from '../ClaimOrganisationButton';

import companyService from '../../services/companyService';
import toastMessages from '../../utils/toastMessages';
import errorHandling from '../../utils/errorHandling';

const FollowComponent = ({ slug, isFollowed }) => {
  const { isAuthenticated, currentUser } = useSelector((state) => state.user);
  const [isLoadingFollow, setIsLoadingFollow] = React.useState(false);
  const [followed, setFollowed] = React.useState(isFollowed);

  const handleFollow = (slug) => {
    const follow = async (slugCompany) => {
      setIsLoadingFollow(true);
     try {
        const resData = await companyService.followCompany(slugCompany);
        const isFollowed = resData.data.isFollowed;

        setFollowed(isFollowed);
        toastMessages.success(
          isFollowed ? 'Follow successfully.' : 'Cancel follow successfully.'
        );
      } catch (error) {
        errorHandling(error);
      } finally {
        setIsLoadingFollow(false);
      }
    };

    follow(slug);
  };

  return (
    <>
      {isAuthenticated && currentUser?.roleName === ROLES_NAME.JOB_SEEKER && (
        <Stack justifyContent="flex-end" sx={{ py: 1, px: 2, height: '100%' }}>
          <LoadingButton
            fullWidth
            onClick={() => handleFollow(slug)}
            startIcon={
              followed ? (
                <BookmarkIcon sx={{ color: 'common.white' }} />
              ) : (
                <BookmarkBorderIcon />
              )
            }
            loading={isLoadingFollow}
            loadingPosition="start"
            variant={followed ? 'contained' : 'outlined'}
            color="warning"
            sx={{ textTransform: 'inherit' }}
          >
            <span>
              {followed ? (
                <span style={{ color: 'white' }}>Following</span>
              ) : (
                'Follow'
              )}
            </span>
          </LoadingButton>
        </Stack>
      )}
    </>
  );
};

const Company = ({
  slug,
  companyImageUrl,
  companyCoverImageUrl,
  companyName,
  employeeSize,
  fieldOperation,
  city,
  cityName,
  sizeName,
  claimAddress,
  claimLat,
  claimLng,
  followNumber,
  jobPostNumber,
  isFollowed,
  isDirectory = false,
}) => {
  const { allConfig } = useSelector((state) => state.config);
  const { isAuthenticated, currentUser } = useSelector((state) => state.user);
  const initials = String(companyName || "")
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();

  return (
    <Card
      sx={{
        p: 2,
        position: 'relative',
        overflow: 'hidden',
        transition: 'all 0.3s ease-in-out',
        '&:before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: 4,
          background: 'linear-gradient(90deg, #441da0 0%, #6d28d9 50%, #ff9800 100%)',
          opacity: 0,
          transition: 'opacity 0.3s ease',
        },
        '&:hover': {
          borderColor: (theme) => theme.palette.primary.main,
          transform: 'translateY(-4px)',
          boxShadow: (theme) => theme.customShadows.glow,
          '&:before': {
            opacity: 1,
          },
        },
      }}
      variant="outlined"
    >
      <Stack
        style={{
          height:
            isAuthenticated && currentUser?.roleName === ROLES_NAME.JOB_SEEKER
              ? 480
              : 420,
        }}
        direction="column"
        justifyContent={'space-between'}
      >
        <Box>
          <Box sx={{ position: 'relative' }}>
            <MuiImageCustom
              width="100%"
              height={180}
              fit="cover"
              src={companyCoverImageUrl || IMAGES.coverImageDefault}
              sx={{ 
                borderRadius: 2,
                filter: 'brightness(0.9)',
              }}
              duration={1500}
            />
            <Box
              sx={{
                position: 'absolute',
                bottom: -40,
                left: 16,
                width: 85,
                height: 85,
               transition: 'transform 0.3s ease',
                '&:hover': {
                 transform: 'scale(1.05)',
                },
              }}
              component={Link}
              to={`/companies/${slug}`}
            >
              {companyImageUrl ? (
              <MuiImageCustom
                width={80}
                height={80}
                src={companyImageUrl}
                sx={{
                  bgcolor: 'white',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                  p: 0.75,
                  borderRadius: 3,
                }}
              />
              ) : (
                <Avatar
                  sx={{
                    width: 80,
                    height: 80,
                    bgcolor: 'primary.main',
                    color: 'white',
                    fontWeight: 700,
                    fontSize: 28,
                    boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                    borderRadius: 3,
                  }}
                  variant="rounded"
                >
                  {initials || '?'}
                </Avatar>
              )}
            </Box>
            {!isDirectory && (
            <Box 
              sx={{ 
                position: 'absolute', 
                top: 12, 
                right: 12,
                bgcolor: 'rgba(255,255,255,0.9)', 
                borderRadius: 2,
                px: 1.5,
                py: 0.5,
              }}
            >
              <Typography variant="caption" sx={{ fontWeight: 500 }}>
                <FontAwesomeIcon
                  icon={faUsers}
                  style={{ marginRight: 4 }}
                  color={(theme) => theme.palette.custom.mutedText} 
                />
                {followNumber} followers
              </Typography>
            </Box>
            )}
            {isDirectory && (
              <Box
                sx={{
                  position: 'absolute',
                  top: 12,
                  right: 12,
                  bgcolor: 'rgba(68,29,160,0.9)',
                  color: 'white',
                  borderRadius: 2,
                  px: 1.5,
                  py: 0.5,
                }}
              >
                <Typography variant="caption" sx={{ fontWeight: 600 }}>
                  No Imyanya profile yet
                </Typography>
              </Box>
            )}
          </Box>

          <Box sx={{ p: 2, pt: 5, width: '100%' }}>
            <Box mb={2}>
              <Typography
                variant="h6"
                component={Link}
                to={`/companies/${slug}`}
                sx={{
                  textDecoration: 'none',
                  color: 'inherit',
                  fontWeight: 600,
                 transition: 'color 0.2s ease',
                  '&:hover': {
                    color: (theme) => theme.palette.primary.main,
                  },
                }}
              >
                {companyName.substr(0, 55)}
                {companyName.length > 55 && '...'}
                {!isDirectory && (
                  <VerifiedIcon
                    sx={{
                      fontSize: 20,
                      color: 'success.main',
                      ml: 0.75,
                      verticalAlign: 'text-bottom',
                    }}
                    titleAccess="Verified employer with an Imyanya profile"
                  />
                )}
              </Typography>
            </Box>

            <Stack spacing={1.5}>
              <Typography variant="body2" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <FontAwesomeIcon
                  icon={faFontAwesome}
                  style={{ width: 16 }}
                  sx={{ color: 'grey.600' }}
                />
                {fieldOperation || (
                  <span style={{ color: '#9e9e9e', fontStyle: 'italic', fontSize: 13 }}>
                    Not updated
                  </span>
                )}
              </Typography>

              <Typography variant="body2" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <FontAwesomeIcon
                  icon={faMapLocation}
                  style={{ width: 16 }}
                  sx={{ color: 'grey.600' }}
                />
                {allConfig?.cityDict[city] || cityName || (
                  <span style={{ color: '#9e9e9e', fontStyle: 'italic', fontSize: 13 }}>
                    Not updated
                  </span>
                )}
              </Typography>

              <Typography variant="body2" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <FontAwesomeIcon
                  icon={faUser}
                  style={{ width: 16 }}
                  sx={{ color: 'grey.600' }}
                />
                {allConfig?.employeeSizeDict[employeeSize] || sizeName || (
                  <span style={{ color: '#9e9e9e', fontStyle: 'italic', fontSize: 13 }}>
                    Not updated
                  </span>
                )}
              </Typography>

              {isDirectory ? (
                <Typography
                  variant="body2"
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1,
                    color: 'text.secondary',
                    fontStyle: 'italic',
                  }}
                >
                  <FontAwesomeIcon
                    icon={faBriefcase}
                    style={{ width: 16 }}
                    sx={{ color: 'grey.500' }}
                  />
                  No jobs posted yet — come back soon
                </Typography>
              ) : (
              <Typography 
                variant="body2" 
                sx={{ 
                  display: 'flex', 
                  alignItems: 'center',
                  gap: 1,
                  color: 'primary.main',
                  fontWeight: 500
                }}
              >
                <FontAwesomeIcon
                  icon={faBriefcase}
                  style={{ width: 16 }}
                  sx={{ color: 'primary.main' }}
                />
                {jobPostNumber} jobs
              </Typography>
              )}
            </Stack>
          </Box>
        </Box>

        {isDirectory ? (
          <Stack justifyContent="flex-end" spacing={1} sx={{ py: 1, px: 2, height: '100%' }}>
            <Typography
              variant="caption"
              sx={{
                textAlign: 'center',
                color: 'text.secondary',
                bgcolor: 'grey.100',
                borderRadius: 2,
                p: 1.5,
                lineHeight: 1.6,
              }}
            >
              This organisation hasn&apos;t created its Imyanya profile yet.
              Come back soon — its jobs will appear here once posted.
            </Typography>
            <ClaimOrganisationButton
              companyName={companyName}
              address={claimAddress}
              lat={claimLat}
              lng={claimLng}
              fullWidth
            />
          </Stack>
        ) : (
          <FollowComponent slug={slug} isFollowed={isFollowed} />
        )}
      </Stack>
    </Card>
  );
};

const Loading = () => (
  <>
    <Card
      sx={{
        p: 2,
        boxShadow: 0,
      }}
    >
      <Stack>
        <Box>
          <Skeleton variant="rounded" height={150} />
        </Box>
        <Box sx={{ px: 2 }}>
          <Stack direction="row" justifyContent="space-between" spacing={2}>
            <Avatar
              sx={{
                width: 85,
                height: 85,
                marginTop: -5,
                backgroundColor: 'white',
              }}
              variant="rounded"
            >
              <Skeleton variant="rounded" sx={{ width: 85, height: 85 }} />
            </Avatar>
            <Box flex={1} sx={{ py: 1 }}>
              <Typography variant="caption" display="block">
                <Skeleton />
              </Typography>
            </Box>
          </Stack>
        </Box>
        <Box sx={{ p: 2 }}>
          <Typography variant="h6" gutterBottom>
            <Skeleton />
          </Typography>
          <Typography variant="body2" gutterBottom>
            <Skeleton />
          </Typography>
          <Typography variant="body2" gutterBottom>
            <Skeleton />
          </Typography>
          <Typography variant="body2" gutterBottom>
            <Skeleton />
          </Typography>
          <Typography variant="body2" gutterBottom>
            <Skeleton />
          </Typography>
        </Box>
        <Box sx={{ px: 2 }}>
          <Skeleton variant="rounded" height={30} />
        </Box>
      </Stack>
    </Card>
  </>
);

Company.Loading = Loading;

export default Company;
