

import * as React from 'react';
import { Alert, Box, Card, Container, Stack, Typography } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelopeCircleCheck } from '@fortawesome/free-solid-svg-icons';

import { TabTitle } from '../../../utils/generalFunction';
import { PLATFORM } from '../../../configs/constants';
import errorHandling from '../../../utils/errorHandling';
import BackdropLoading from '../../../components/loading/BackdropLoading';
import ForgotPasswordForm from '../../components/auths/ForgotPasswordForm';
import authService from '../../../services/authService';

const ForgotPasswordPage = () => {
  TabTitle("Forgot password")

  const [isFullScreenLoading, setIsFullScreenLoading] = React.useState(false);
  const [messageSuccess, setMessageSuccess] = React.useState(null);

  const handleRequestResetPassword = (data) => {
    const requestResetPassword = async (data) => {
      setIsFullScreenLoading(true);

      try {
        await authService.forgotPassword(data);

        setMessageSuccess(
          `We have sent instructions to ${data?.email}`
        );
      } catch (error) {
        errorHandling(error);
      } finally {
        setIsFullScreenLoading(false);
      }
    };

    requestResetPassword({
      ...data,
      platform: PLATFORM,
    });
  };

  return (
    <>
      <Container
        maxWidth="sm"
        sx={{
          marginTop: 8,
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Card sx={{ p: 6, pt: 2 }}>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              my: 2,
            }}
          >
            <Typography component="h1" variant="h5">
              {!messageSuccess ? 'Forgot password' : 'Sent'}
            </Typography>
          </Box>

          {!messageSuccess ? (
            <Box>
              <Box sx={{ py: 2 }}>
                <Typography>
                  If the account exists, we will send password reset instructions to your email.
                </Typography>
              </Box>
              <Box sx={{ mt: 4 }}>
                <ForgotPasswordForm
                  handleRequestResetPassword={handleRequestResetPassword}
                />
              </Box>
            </Box>
          ) : (
            <Box>
              <Stack direction="row" justifyContent="center" sx={{ mb: 8 }}>
                <FontAwesomeIcon
                  icon={faEnvelopeCircleCheck}
                  size="7x"
                  color="#fca34d"
                />
              </Stack>
              <Stack>
                <Alert severity="success" sx={{ mb: 1 }}>
                  {messageSuccess}
                </Alert>
                <Typography variant="caption">
                  If the email doesn't show up soon, check your spam folder.
                </Typography>
                <Typography variant="caption">
                  We sent it from imyanya.contact00000@gmail.com.
                </Typography>
              </Stack>
            </Box>
          )}
        </Card>
      </Container>

      {/* Start: full screen loading */}
      {isFullScreenLoading && <BackdropLoading />}
      {/* End: full screen loading */}
    </>
  );
};

export default ForgotPasswordPage;
