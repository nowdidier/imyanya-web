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
  TabTitle("Wibagiwe ijambobanga")
  const [isFullScreenLoading, setIsFullScreenLoading] = React.useState(false);
  const [messageSuccess, setMessageSuccess] = React.useState(null);

  const handleRequestResetPassword = (data) => {
    const requestResetPassword = async (data) => {
      setIsFullScreenLoading(true);
      try {
        await authService.forgotPassword(data);
        setMessageSuccess(
          `Twoherejwe imeri ihishuraho kuri ${data?.email}`
        );
      } catch (error) {
        errorHandling(error);
      } finally {
        setIsFullScreenLoading(false);
      }
    };
    requestResetPassword({ ...data, platform: PLATFORM });
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
              {!messageSuccess ? 'Wibagiwe ijambobanga' : 'Twoherejwe'}
            </Typography>
          </Box>
          {!messageSuccess ? (
            <Box>
              <Box sx={{ py: 2 }}>
                <Typography>
                  Niba gahunda iri, turazakohereza imeri igaragaza uburyo bwo guhindura ijambobanga ryawe.
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
                  color="#00B2A3"
                />
              </Stack>
              <Stack>
                <Alert severity="success" sx={{ mb: 1 }}>
                  {messageSuccess}
                </Alert>
                <Typography variant="caption">
                  Niba imeri itarahagera, gerageza ikiboko cy'imvugo.
                </Typography>
                <Typography variant="caption">
                  Twoherejwe imeri ituruka myjob.contact00000@gmail.com.
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