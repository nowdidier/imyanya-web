import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Box, Button, Divider, Stack } from '@mui/material';
import FacebookIcon from '@mui/icons-material/Facebook';
import GoogleIcon from '@mui/icons-material/Google';
import { LoginSocialFacebook, LoginSocialGoogle } from 'reactjs-social-login';

import TextFieldCustom from '../../../../components/controls/TextFieldCustom';
import PasswordTextFieldCustom from '../../../../components/controls/PasswordTextFieldCustom';
import { AUTH_CONFIG } from '../../../../configs/constants';

const JobSeekerLoginForm = ({ onLogin, onFacebookLogin, onGoogleLogin }) => {
  const schema = yup.object().shape({
    email: yup
      .string()
      .required('Email ni ngombwa!')
      .email('Email ntifite uburyo bwiza'),
    password: yup.string().required('Ijambo ryibanga ni ngombwa!')
    .min(8, 'Ijambo ryibanga rigomba kuba nibura ibimenyetso 8.')
    .max(128, 'Ijambo ryibanga rirenze uburebure bwemewe.')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
      'Rigomba kuba ririmo inyuguti nkuru, inyuguti nto, umubare n’ikimenyetso kidasanzwe'
    ),
  });

  const { control, handleSubmit } = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
    resolver: yupResolver(schema),
  });

  return (
    <Box component="form" onSubmit={handleSubmit(onLogin)}>
      <Stack spacing={1.5} sx={{ mb: 2 }}>
        <TextFieldCustom
          name="email"
          control={control}
          title="Email"
          placeholder="Shyiramo email"
          showRequired={true}
        />
        <PasswordTextFieldCustom
          name="password"
          control={control}
          title="Ijambo ryibanga"
          placeholder="Shyiramo ijambo ryibanga"
          showRequired={true}
        />
      </Stack>
      <Button fullWidth variant="contained" sx={{ mt: 3, mb: 2 }} type="submit">
        Injira
      </Button>
      <Divider>CYANGWA</Divider>

      <LoginSocialFacebook
        appId={AUTH_CONFIG.FACEBOOK_CLIENT_ID}
        fieldsProfile={'id'}
        // onLoginStart={ }
        // onLogoutSuccess={onLogoutSuccess}
        // redirect_uri={REDIRECT_URI}
        isOnlyGetToken={true}
        ux_mode="popup"
        onResolve={onFacebookLogin}
        onReject={(err) => {
          console.log(err);
        }}
      >
        <Button
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2, backgroundColor: '#3B66C4' }}
          startIcon={<FacebookIcon />}
        >
          Injira na Facebook
        </Button>
      </LoginSocialFacebook>

      <LoginSocialGoogle
        client_id={AUTH_CONFIG.GOOGLE_CLIENT_ID}
        // onLoginStart={ }
        // redirect_uri={REDIRECT_URI}
        isOnlyGetToken={true}
        access_type="offline"
        scope="openid profile email"
        discoveryDocs="claims_supported"
        onResolve={onGoogleLogin}
        onReject={(err) => {
          console.log(err);
        }}
        ux_mode="popup"
      >
        <Button
          fullWidth
          variant="contained"
          sx={{ mb: 2, backgroundColor: '#CF4332' }}
          startIcon={<GoogleIcon />}
        >
          Injira na Google
        </Button>
      </LoginSocialGoogle>
    </Box>
  );
};

export default JobSeekerLoginForm;
