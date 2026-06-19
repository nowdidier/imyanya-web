import React from 'react';
import { useSelector } from 'react-redux';
import {
  Alert,
  Box,
  Button,
  Card,
  CircularProgress,
  Container,
  Stack,
  Typography,
} from '@mui/material';
import MarkEmailUnreadOutlinedIcon from '@mui/icons-material/MarkEmailUnreadOutlined';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelopeCircleCheck } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';

import { TabTitle } from '../../../utils/generalFunction';
import getAuthErrorMessage from '../../../utils/authErrorMessage';
import { APP_NAME, PLATFORM, ROUTES } from '../../../configs/constants';
import authService from '../../../services/authService';

const EmailVerificationRequiredPage = () => {
  TabTitle("Email Verification")

  const nav = useNavigate();
  const { email, roleName } = useSelector((state) => state.auth);
  const [isSending, setIsSending] = React.useState(false);
  const [successMessage, setSuccessMessage] = React.useState('');
  const [errorMessage, setErrorMessage] = React.useState('');

  const canResend = Boolean(email && roleName);

  const handleResend = async () => {
    if (!canResend) {
      setErrorMessage('Please return to login and enter your email again.');
      return;
    }

    setIsSending(true);
    setSuccessMessage('');
    setErrorMessage('');

    try {
      const resData = await authService.resendVerificationEmail({
        email,
        roleName,
        platform: PLATFORM,
      });

      setSuccessMessage(
        resData.data?.message || 'Verification email has been sent.'
      );
    } catch (error) {
      setErrorMessage(
        getAuthErrorMessage(
          error,
          'Unable to resend the verification email. Please try again.'
        )
      );
    } finally {
      setIsSending(false);
    }
  };

  return (
    <Container
      maxWidth="sm"
      sx={{
        marginTop: 8,
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <Stack sx={{ pb: 2 }} alignItems="center">
        <Typography variant="h5" gutterBottom>
          Confirm email
        </Typography>
        <Typography variant="subtitle2 ">
          Thank you for registering with {APP_NAME}
        </Typography>
      </Stack>
      <Card sx={{ p: 6, pt: 2, boxShadow: 0 }}>
        <Stack alignItems="center" spacing={2}>
          <Box sx={{ mb: 1 }}>
            <FontAwesomeIcon
              icon={faEnvelopeCircleCheck}
              size="7x"
              color="#fca34d"
            />
          </Box>
          <Box>
            <Typography variant="h5" gutterBottom>
              Confirm email address your
            </Typography>
          </Box>
          <Box>
            <Typography variant="body1" gutterBottom>
              A confirmation email has been sent to:
            </Typography>
            <Typography variant="subtitle2" sx={{ textAlign: 'center' }}>
              {email}
            </Typography>
          </Box>
          <Box>
            <Typography variant="caption" sx={{ color: 'gray' }}>
              Click the link in the email to activate your account
            </Typography>
          </Box>
          {successMessage && (
            <Alert severity="success" sx={{ width: '100%' }}>
              {successMessage}
            </Alert>
          )}
          {errorMessage && (
            <Alert severity="error" sx={{ width: '100%' }}>
              {errorMessage}
            </Alert>
          )}
        </Stack>
        <Stack sx={{ mt: 8 }} spacing={2} alignItems="center">
          <Button
            variant="contained"
            onClick={handleResend}
            disabled={isSending || !canResend}
            startIcon={
              isSending ? (
                <CircularProgress color="inherit" size={18} />
              ) : (
                <MarkEmailUnreadOutlinedIcon />
              )
            }
          >
            Resend email
          </Button>
          {!canResend && (
            <Button
              variant="text"
              onClick={() => nav(`/${ROUTES.AUTH.LOGIN}`)}
            >
              Back to login
            </Button>
          )}
        </Stack>
      </Card>
    </Container>
  );
};

export default EmailVerificationRequiredPage;
