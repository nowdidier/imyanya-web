
import React from 'react';
import { useSelector } from 'react-redux';
import { Box, Card, Container, Stack, Typography } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelopeCircleCheck } from '@fortawesome/free-solid-svg-icons';
import { TabTitle } from '../../../utils/generalFunction';
import { APP_NAME } from '../../../configs/constants';
const EmailVerificationRequiredPage = () => {
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
        </Typography>
        <Typography variant="subtitle2 ">
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
            </Typography>
          </Box>
          <Box>
            <Typography variant="body1" gutterBottom>
            </Typography>
            <Typography variant="subtitle2" sx={{ textAlign: 'center' }}>
              {email}
            </Typography>
          </Box>
          <Box>
            <Typography variant="caption" sx={{ color: 'gray' }}>
            </Typography>
          </Box>
        </Stack>
        <Box sx={{ mt: 10 }}>
          <Typography
            variant="body1"
            sx={{ color: 'gray', textAlign: 'center', cursor: 'pointer' }}
          >
            <span style={{ fontWeight: 'bold', color: 'red' }}>
            </span>
          </Typography>
        </Box>
      </Card>
    </Container>
  );
};

export default EmailVerificationRequiredPage;
