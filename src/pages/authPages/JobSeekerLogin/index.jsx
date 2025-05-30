

import * as React from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import {
  Alert,
  AlertTitle,
  Avatar,
  Box,
  Card,
  Container,
  Grid,
  Typography,
  styled,
} from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';

import { TabTitle } from '../../../utils/generalFunction';
import {
  AUTH_CONFIG,
  AUTH_PROVIDER,
  ROLES_NAME,
  ROUTES,
} from '../../../configs/constants';
import toastMessages from '../../../utils/toastMessages';
import BackdropLoading from '../../../components/loading/BackdropLoading';

import { updateVerifyEmail } from '../../../redux/authSlice';
import { getUserInfo } from '../../../redux/userSlice';
import JobSeekerLoginForm from '../../components/auths/JobSeekerLoginForm';

import authService from '../../../services/authService';
import tokenService from '../../../services/tokenService';

const StyledCard = styled(Card)(({ theme }) => ({
  background: 'rgba(255, 255, 255, 0.9)',
  backdropFilter: 'blur(10px)',
  borderRadius: '16px',
  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
  transition: 'all 0.3s ease',
}));

const StyledAvatar = styled(Avatar)(({ theme }) => ({
  margin: '16px',
  width: '56px',
  height: '56px',
  backgroundColor: theme.palette.secondary.main,
  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
}));

const StyledLink = styled(Link)(({ theme }) => ({
  textDecoration: 'none',
  color: theme.palette.primary.main,
  fontWeight: 500,
  transition: 'all 0.2s ease',
  '&:hover': {
    color: theme.palette.primary.dark,
    textDecoration: 'underline',
  },
}));

const JobSeekerLogin = () => {
  TabTitle('Job Seeker Account Login');

  const dispatch = useDispatch();
  const nav = useNavigate();
  const [searchParams] = useSearchParams();
  const [isFullScreenLoading, setIsFullScreenLoading] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState(null);
  const [successMessage, setSuccessMessage] = React.useState(null);

  React.useEffect(() => {
    const successMsg = searchParams.get('successMessage');
    const errorMsg = searchParams.get('errorMessage');

    if (successMsg !== null) {
      setSuccessMessage(successMsg);
    }

    setErrorMessage(errorMsg);
  }, [searchParams]);

  const handleLogin = (data) => {
    const getAccesToken = async (email, password, roleName) => {
      setIsFullScreenLoading(true);

      try {
        const resData = await authService.getToken(email, password, roleName);
        const {
          access_token: accessToken,
          refresh_token: refreshToken,
          backend,
        } = resData.data;

        // save cookie
        const isSaveTokenToCookie =
          tokenService.saveAccessTokenAndRefreshTokenToCookie(
            accessToken,
            refreshToken,
            backend
          );
        if (isSaveTokenToCookie) {
          dispatch(getUserInfo())
            .unwrap()
            .then(() => {
              nav('/');
            })
            .catch(() => {
              toastMessages.error('An error occurred, please log in again!');
            });
        } else {
          toastMessages.error('An error occurred, please log in again!');
        }
      } catch (error) {
        // 400 bad request
        const res = error.response;
        if (res.status === 400) {
          const errors = res.data?.errors;
          if ('errorMessage' in errors) {
            setErrorMessage(errors.errorMessage.join(' '));
          } else {
            toastMessages.error('An error occurred, please try again!');
          }
        }
      } finally {
        setIsFullScreenLoading(false);
      }
    };

    const checkCreds = async (email, password, roleName) => {
      setIsFullScreenLoading(true);

      try {
        const resData = await authService.checkCreds(email, roleName);

        const { exists, email: resEmail, email_verified } = resData.data;
        if (exists === true && email_verified === false) {
          dispatch(
            updateVerifyEmail({
              isAllowVerifyEmail: true,
              email: email,
              roleName: roleName,
            })
          );
          nav(`/${ROUTES.AUTH.EMAIL_VERIFICATION}`);

          return;
        } else if (exists === false) {
          setErrorMessage(
            'No candidate account exists with this email!'
          );

          return;
        }

        getAccesToken(resEmail, password, roleName);
      } catch (error) {
        toastMessages.error('An error occurred, please log in again!');
      } finally {
        setIsFullScreenLoading(false);
      }
    };

    checkCreds(data.email, data.password, ROLES_NAME.JOB_SEEKER);
  };

  const handleSocialLogin = async (
    clientId,
    clientSecrect,
    provider,
    token
  ) => {
    setIsFullScreenLoading(true);

    try {
      const resData = await authService.convertToken(
        clientId,
        clientSecrect,
        provider,
        token
      );
      const {
        access_token: accessToken,
        refresh_token: refreshToken,
        backend,
      } = resData.data;

      // save cookie
      const isSaveTokenToCookie =
        tokenService.saveAccessTokenAndRefreshTokenToCookie(
          accessToken,
          refreshToken,
          backend
        );
      if (isSaveTokenToCookie) {
        dispatch(getUserInfo())
          .unwrap()
          .then(() => {
            nav('/');
          })
          .catch(() => {
            toastMessages.error('An error occurred, please log in again!');
          });
      } else {
        toastMessages.error('An error occurred, please log in again!');
      }
    } catch (error) {
      // 400 bad request
      const res = error.response;
      if (res.status === 400) {
        const errors = res.data?.errors;
        if ('errorMessage' in errors) {
          setErrorMessage(errors.errorMessage.join(' '));
        } else {
          toastMessages.error('An error occurred, please try again!');
        }
      }
    } finally {
      setIsFullScreenLoading(false);
    }
  };

  const handleFacebookLogin = (result) => {
    const accessToken = result?.data?.accessToken;
    if (accessToken) {
      handleSocialLogin(
        AUTH_CONFIG.FACEBOOK_CLIENT_ID,
        AUTH_CONFIG.FACEBOOK_CLIENT_SECRET,
        AUTH_PROVIDER.FACEBOOK,
        accessToken
      );
    }
  };

  const handleGoogleLogin = (result) => {
    const code = result?.code;
    if (code) {
      handleSocialLogin(
        AUTH_CONFIG.GOOGLE_CLIENT_ID,
        AUTH_CONFIG.GOOGLE_CLIENT_SECRET,
        AUTH_PROVIDER.GOOGLE,
        code
      );
    }
  };

  return (
    <>
      <Container
        maxWidth="sm"
        sx={{
          marginTop: { xs: 0, sm: 2, md: 3 },
          p: { xs: 0, sm: 3 },
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <StyledCard sx={{ 
          p: { xs: 2, sm: 4, md: 5 }, 
          width: '100%',
          borderRadius: { xs: 0, sm: '16px' },
          boxShadow: { xs: 'none', sm: '0 8px 32px rgba(0, 0, 0, 0.1)' },
        }}>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              mb: 4,
            }}
          >
            <StyledAvatar>
              <LockOutlinedIcon sx={{ fontSize: 28 }} />
            </StyledAvatar>
            <Typography 
              component="h1" 
              variant="h4" 
              align="center"
              sx={{ 
                fontWeight: 600,
                color: 'primary.main',
                mb: 1
              }}
            >
              Login
            </Typography>
            <Typography 
              variant="subtitle1" 
              align="center"
              sx={{ 
                color: 'text.secondary',
                mb: 2 
              }}
            >
              Welcome back
            </Typography>
          </Box>

          {errorMessage && (
            <Alert 
              severity="error" 
              sx={{ 
                mb: 3,
                borderRadius: '8px',
              }}
            >
              <AlertTitle>Failed</AlertTitle>
              {errorMessage}
            </Alert>
          )}

          {successMessage && (
            <Alert 
              severity="success"
              sx={{ 
                mb: 3,
                borderRadius: '8px',
              }}
            >
              <AlertTitle>Success</AlertTitle>
              {successMessage}
            </Alert>
          )}

          <Box sx={{ mt: 2 }}>
            <JobSeekerLoginForm
              onLogin={handleLogin}
              onFacebookLogin={handleFacebookLogin}
              onGoogleLogin={handleGoogleLogin}
            />
          </Box>

          <Grid 
            container 
            spacing={2} 
            sx={{ 
              mt: 4,
              justifyContent: 'space-between',
              alignItems: 'center'
            }}
          >
            <Grid item xs={12} sm={6}>
              <StyledLink to={`/${ROUTES.AUTH.FORGOT_PASSWORD}`}>
                Forgot password?
              </StyledLink>
            </Grid>
            <Grid 
              item 
              xs={12} 
              sm={6}
              sx={{
                textAlign: { xs: 'left', sm: 'right' }
              }}
            >
              <StyledLink to={`/${ROUTES.AUTH.REGISTER}`}>
                Don't have an account? Register
              </StyledLink>
            </Grid>
          </Grid>
        </StyledCard>
      </Container>
      {isFullScreenLoading && <BackdropLoading />}
    </>
  );
};

export default JobSeekerLogin;
