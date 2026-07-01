import * as React from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
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
import {
  AUTH_CONFIG,
  AUTH_PROVIDER,
  PLATFORM,
  ROLES_NAME,
  ROUTES,
} from '../../../configs/constants';

import { TabTitle } from '../../../utils/generalFunction';
import getAuthErrorMessage from '../../../utils/authErrorMessage';
import toastMessages from '../../../utils/toastMessages';
import BackdropLoading from '../../../components/loading/BackdropLoading';
import errorHandling from '../../../utils/errorHandling';
import JobSeekerSignUpForm from '../../components/auths/JobSeekerSignUpForm';

import tokenService from '../../../services/tokenService';
import authService from '../../../services/authService';
import { getUserInfo } from '../../../redux/userSlice';
import { updateVerifyEmail } from '../../../redux/authSlice';
import { getSocialLoginToken } from '../../../utils/socialLogin';

const StyledCard = styled(Card)(() => ({
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

const JobSeekerSignUp = () => {
  TabTitle("Register account Job Seeker")

  const dispatch = useDispatch();
  const nav = useNavigate();
  const [errorMessage, setErrorMessage] = React.useState(null);
  const [isFullScreenLoading, setIsFullScreenLoading] = React.useState(false);
  const [serverErrors, setServerErrors] = React.useState({});

  const handleRegister = (data) => {
    const register = async (data, roleName) => {
      setIsFullScreenLoading(true);
     try {
        const resData = await authService.jobSeekerRegister(data);
        const registeredUser = resData.data || {};

        dispatch(
          updateVerifyEmail({
            isAllowVerifyEmail:true,
            email: registeredUser.email || data?.email,
            roleName: registeredUser.roleName || roleName,
          })
        );
        if (registeredUser.emailSent === false) {
          toastMessages.warn('Account created, but the verification email was not sent. Please use Resend email.');
        }
        nav(`/${ROUTES.AUTH.EMAIL_VERIFICATION}`);
      } catch (error) {
        errorHandling(error, setServerErrors);
      } finally {
        setIsFullScreenLoading(false);
      }
    };

    register({ ...data, platform: PLATFORM }, ROLES_NAME.JOB_SEEKER);
  };

  const handleSocialRegister = async (
    clientId,
    clientSecret,
    provider,
    token
  ) => {
    setIsFullScreenLoading(true);

   try {
      const resData = await authService.convertToken(
        clientId,
        clientSecret,
        provider,
        token
      );
      const {
        access_token: accessToken,
        refresh_token: refreshToken,
        backend,
      } = resData.data;

      if (!accessToken || !refreshToken || !backend) {
        throw new Error(
          'The social sign-up response was incomplete. Please try again.'
        );
      }

      const isSaveTokenToCookie =
        tokenService.saveAccessTokenAndRefreshTokenToCookie(
          accessToken,
          refreshToken,
          backend
        );

      if (isSaveTokenToCookie) {
        try {
          await dispatch(getUserInfo()).unwrap();
          nav('/');
        } catch (error) {
          setErrorMessage(getAuthErrorMessage(error));
        }
      } else {
        toastMessages.error('An error occurred, please log in again!');
      }
    } catch (error) {
      const res = error?.response;
      const errors = res?.data?.errors;

      if (res?.status === 400 && errors) {
        if ('errorMessage' in errors) {
          setErrorMessage(errors.errorMessage.join(' '));
          return;
        }

        toastMessages.error('An error occurred, please try again!');
        return;
      }

      setErrorMessage(getAuthErrorMessage(error));
    } finally {
      setIsFullScreenLoading(false);
    }
  };

  const handleFacebookRegister = (result) => {
    const accessToken = getSocialLoginToken(result);
    if (accessToken) {
      handleSocialRegister(
        AUTH_CONFIG.FACEBOOK_CLIENT_ID,
        AUTH_CONFIG.FACEBOOK_CLIENT_SECRET,
        AUTH_PROVIDER.FACEBOOK,
        accessToken
      );
      return;
    }

    setErrorMessage(
      'Facebook sign-up did not return a token. Please try again.'
    );
  };

  const handleGoogleRegister = (result) => {
    const accessToken = getSocialLoginToken(result);
    if (accessToken) {
      handleSocialRegister(
        AUTH_CONFIG.GOOGLE_CLIENT_ID,
        AUTH_CONFIG.GOOGLE_CLIENT_SECRET,
        AUTH_PROVIDER.GOOGLE,
        accessToken
      );
      return;
    }

    setErrorMessage(
      'Google sign-up did not return a token. Please verify the Google OAuth redirect URI and try again.'
    );
  };

  const handleSocialReject = (error) => {
    const errorText =
      error?.error_description ||
      error?.error ||
      error?.message ||
      'Social sign-up was not completed. Please try again.';

    setErrorMessage(errorText);
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
              Register account
            </Typography>
            <Typography 
              variant="subtitle1" 
              align="center"
              sx={{ 
                color: 'text.secondary',
                mb: 2 
              }}
            >
              Create a new job seeker account
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

          <Box sx={{ mt: 2 }}>
            <JobSeekerSignUpForm
              onRegister={handleRegister}
              onFacebookRegister={handleFacebookRegister}
              onGoogleRegister={handleGoogleRegister}
              onSocialReject={handleSocialReject}
              serverErrors={serverErrors}
            />
          </Box>

          <Grid 
            container 
            sx={{ 
              mt: 4,
              justifyContent: 'center',
              alignItems: 'center'
            }}
          >
            <Grid item>
              <StyledLink to={`/${ROUTES.AUTH.LOGIN}`}>
                Already have an account? Log in
              </StyledLink>
            </Grid>
          </Grid>
        </StyledCard>
      </Container>
      {isFullScreenLoading && <BackdropLoading />}
    </>
  );
};

export default JobSeekerSignUp;
