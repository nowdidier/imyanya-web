import React from 'react';
import { useSelector } from 'react-redux';
import { Box, Card, Container, Stack, Typography } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelopeCircleCheck } from '@fortawesome/free-solid-svg-icons';

import { TabTitle } from '../../../utils/generalFunction';

const EmailVerificationRequiredPage = () => {
  TabTitle("Email Verification")
  const { email } = useSelector((state) => state.auth);

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
          Email Verification
        </Typography>
        <Typography variant="subtitle2 ">
          Thank you for registering with imyanya
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
              Verify your email address
            </Typography>
          </Box>
          <Box>
            <Typography variant="body1" gutterBottom>
              Verification email has been sent to:
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
        </Stack>
        <Box sx={{ mt: 10 }}>
          <Typography
            variant="body1"
            sx={{ color: 'gray', textAlign: 'center', cursor: 'pointer' }}
          >
            Didn't receive the email?{' '}
            <span style={{ fontWeight: 'bold', color: 'red' }}>
              Resend email
            </span>
          </Typography>
        </Box>
      </Card>
    </Container>
  );
};

export default EmailVerificationRequiredPage;
