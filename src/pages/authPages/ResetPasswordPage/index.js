import * as React from 'react';
import {
  Alert,
  AlertTitle,
  Box,
  Card,
  Container,
  Typography,
} from '@mui/material';

import { TabTitle } from '../../../utils/generalFunction';
import { PLATFORM } from '../../../configs/constants';
import BackdropLoading from '../../../components/loading/BackdropLoading';
import authService from '../../../services/authService';
import ResetPasswordForm from '../../components/auths/ResetPasswordForm';
import { useNavigate, useParams } from 'react-router-dom';
import toastMessages from '../../../utils/toastMessages';

const ResetPasswordPage = () => {
  TabTitle("Hindura ijambo ry'ibanga")

  const { token } = useParams();
  const nav = useNavigate();
  const [isFullScreenLoading, setIsFullScreenLoading] = React.useState(false);
  const [serverErrors, setServerErrors] = React.useState({});
  const [errorMessage, setErrorMessage] = React.useState(null);

  const handleResetPassword = (data) => {
    const resetPassword = async (data) => {
      setIsFullScreenLoading(true);
      try {
        const resData = await authService.resetPassword(data);

        const redirectLoginUrl = resData.data?.redirectLoginUrl;

        nav(
          `${redirectLoginUrl}/?successMessage=Hindura ijambo ry'ibanga ryagenze neza.`
        );
      } catch (error) {
        const res = error.response;

        switch (res.status) {
          case 400:
            const errors = res.data?.errors;
            if ('errorMessage' in errors) {
              setErrorMessage(errors['errorMessage']);
            } else {
              setServerErrors(errors);
            }
            break;
          default:
            toastMessages.error('Habaye ikosa, mwongere mugerageze!');
        }
      } finally {
        setIsFullScreenLoading(false);
      }
    };

    const newData = { ...data, token: token, platform: PLATFORM };
    resetPassword(newData);
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
              Hindura ijambo ry'ibanga ryawe
            </Typography>
          </Box>

          {/* Start: Error alert here */}
          {errorMessage && (
            <Box>
              <Alert severity="error">
                <AlertTitle>Byanze</AlertTitle>
                {errorMessage}
              </Alert>
            </Box>
          )}
          {/* End: Error alert here */}

          <Box sx={{ mt: 4 }}>
            <ResetPasswordForm
              handleResetPassword={handleResetPassword}
              serverErrors={serverErrors}
            />
          </Box>
        </Card>
      </Container>

      {/* Start: full screen loading */}
      {isFullScreenLoading && <BackdropLoading />}
      {/* End: full screen loading */}
    </>
  );
};

export default ResetPasswordPage;
