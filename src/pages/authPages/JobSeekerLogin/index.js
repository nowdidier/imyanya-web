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
} from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';

import { TabTitle } from '../../../utils/generalFunction';
import {
  AUTH_CONFIG,
  AUTH_PROVIDER,
  ROLES_NAME,
} from '../../../configs/constants';
import toastMessages from '../../../utils/toastMessages';
import BackdropLoading from '../../../components/loading/BackdropLoading';

import { updateVerifyEmail } from '../../../redux/authSlice';
import { getUserInfo } from '../../../redux/userSlice';
import JobSeekerLoginForm from '../../components/auths/JobSeekerLoginForm';

import authService from '../../../services/authService';
import tokenService from '../../../services/tokenService';

const JobSeekerLogin = () => {
  TabTitle('Kwinjira uwushakamwuga');

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
              toastMessages.error('Ikibazo cyageze, ihangane wongere winjire');
            });
        } else {
          toastMessages.error('Ikibazo cyageze, ihangane wongere winjire');
        }
      } catch (error) {
        // 400 bad request
        const res = error.response;
        if (res.status === 400) {
          const errors = res.data?.errors;
          if ('errorMessage' in errors) {
            setErrorMessage(errors.errorMessage.join(' '));
          } else {
            toastMessages.error('Ikibazo cyageze, gerageza bundi bushya!');
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
          nav('/email-verification-required');

          return;
        } else if (exists === false) {
          setErrorMessage(
            'Nta gahunda y\'uwushakamwuga ifitanye n\'iyi imeri!'
          );

          return;
        }

        getAccesToken(resEmail, password, roleName);
      } catch (error) {
        toastMessages.error('Ikibazo cyageze, ihangane wongere winjire');
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
            toastMessages.error('Ikibazo cyageze, ihangane wongere winjire');
          });
      } else {
        toastMessages.error('Ikibazo cyageze, ihangane wongere winjire');
      }
    } catch (error) {
      // 400 bad request
      const res = error.response;
      if (res.status === 400) {
        const errors = res.data?.errors;
        if ('errorMessage' in errors) {
          setErrorMessage(errors.errorMessage.join(' '));
        } else {
          toastMessages.error('Ikibazo cyageze, gerageza bundi bushya!');
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
    const accessToken = result?.data?.access_token;
    if (accessToken) {
      handleSocialLogin(
        AUTH_CONFIG.GOOGLE_CLIENT_ID,
        AUTH_CONFIG.GOOGLE_CLIENT_SECRET,
        AUTH_PROVIDER.GOOGLE,
        accessToken
      );
    }
  };

  return (
    <>
      <Container
        maxWidth="sm"
        sx={{
          marginTop: { xs: 2, sm: 4, md: 8, lg: 8, xl: 8 },
          p: 0,
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Card sx={{ p: { xs: 2, sm: 6, md: 6, lg: 6, xl: 6 }, pt: 2 }}>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5" align="center">
              kwinjira muri gahunda y'uwushakamwuga
            </Typography>
          </Box>
          {/* <Box>
            <Alert severity="info">
              <AlertTitle>Thông tin đăng nhập</AlertTitle>
              <Typography>
                Email: <strong>test@gmail.com</strong>
              </Typography>
              <Typography>
                Password: <strong>123</strong>
              </Typography>
            </Alert>
          </Box> */}
          {errorMessage ? (
             <Box>
             <Alert severity="error">
               <AlertTitle>Kumanuka</AlertTitle>
               {errorMessage}
             </Alert>
           </Box>
          ) : successMessage ? (
            <Box>
    <Alert severity="success">
      <AlertTitle>Ikigero</AlertTitle>
      {successMessage}
    </Alert>
  </Box>
          ) : (
            ''
          )}

          <Box sx={{ mt: { xs: 3, sm: 4, md: 4, lg: 4, xl: 4 } }}>
            {/* Start: login form */}
            <JobSeekerLoginForm
              onLogin={handleLogin}
              onFacebookLogin={handleFacebookLogin}
              onGoogleLogin={handleGoogleLogin}
            />
            {/* End: login form */}
          </Box>
          <Grid container sx={{ mt: 3 }}>
  <Grid item xs>
    <Link
      to="/quen-mat-khau"
      variant="body2"
      style={{ textDecoration: 'none', color: '#441da0' }}
    >
      Wibagiwe ijambobanga?
    </Link>
  </Grid>
  <Grid item>
    <Link
      to="/dang-ky-tai-khoan-ung-vien"
      variant="body2"
      style={{ textDecoration: 'none', color: '#441da0' }}
    >
      {'Nturabasha kwinjira? Kwiyandikisha'}
    </Link>
  </Grid>
          </Grid>
        </Card>
      </Container>

      {/* Start: full screen loading */}
      {isFullScreenLoading && <BackdropLoading />}
      {/* End: full screen loading */}
    </>
  );
};

export default JobSeekerLogin;