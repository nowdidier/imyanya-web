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

const JobSeekerSignUpForm = ({
  onRegister,
  onFacebookRegister,
  onGoogleRegister,
  serverErrors = {},
}) => {
  const schema = yup.object().shape({
    fullName: yup.string().required('Full name is required.'),
    email: yup
      .string()
      .required('Email is required!')
      .email('Invalid email format')
      .max(100, 'Email exceeds allowed length.'),
    password: yup
      .string()
      .required('Password is required!')
      .min(8, 'Password must be at least 8 characters.')
      .max(128, 'Password exceeds allowed length.')
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
        'Must contain uppercase, lowercase, number and special character'
      ),
    confirmPassword: yup
      .string()
      .required('Confirm password is required.')
      .oneOf([yup.ref('password')], 'Confirm password does not match.'),
  });

  const { control, setError, handleSubmit } = useForm({
    defaultValues: {
      fullName: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
    resolver: yupResolver(schema),
  });

  React.useEffect(() => {
    for (let err in serverErrors) {
      setError(err, { type: 400, message: serverErrors[err]?.join(' ') });
    }
  }, [serverErrors, setError]);

  return (
    <Box component="form" onSubmit={handleSubmit(onRegister)}>
      <Stack spacing={1.5} sx={{ mb: 2 }}>
        <TextFieldCustom
          name="fullName"
          control={control}
          title="Full Name"
          placeholder="Enter full name"
          showRequired={true}
        />
        <TextFieldCustom
          name="email"
          control={control}
          title="Email"
          placeholder="Enter email"
          showRequired={true}
        />
        <PasswordTextFieldCustom
          name="password"
          control={control}
          title="Password"
          placeholder="Enter password"
          showRequired={true}
        />
        <PasswordTextFieldCustom
          name="confirmPassword"
          control={control}
          title="Confirm Password"
          placeholder="Re-enter password"
          showRequired={true}
        />
      </Stack>
      <Button fullWidth variant="contained" type="submit" sx={{ mt: 3, mb: 2 }}>
        Sign Up
      </Button>
      <Divider>OR</Divider>
      <LoginSocialFacebook
        appId={AUTH_CONFIG.FACEBOOK_CLIENT_ID}
        fieldsProfile={'id'}
        // onLoginStart={onLoginStart}
        // onLogoutSuccess={onLogoutSuccess}
        // redirect_uri={REDIRECT_URI}
        isOnlyGetToken={true}
        ux_mode="popup"
        onResolve={onFacebookRegister}
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
          Sign up with Facebook
        </Button>
      </LoginSocialFacebook>

      <LoginSocialGoogle
        client_id={AUTH_CONFIG.GOOGLE_CLIENT_ID}
        // onLoginStart={onLoginStart}
        // redirect_uri={REDIRECT_URI}
        isOnlyGetToken={true}
        ux_mode="popup"
        access_type="offline"
        scope="openid profile email"
        discoveryDocs="claims_supported"
        onResolve={onGoogleRegister}
        onReject={(err) => {
          console.log(err);
        }}
      >
        <Button
          fullWidth
          variant="contained"
          sx={{ mb: 2, backgroundColor: '#CF4332' }}
          startIcon={<GoogleIcon />}
        >
          Sign up with Google
        </Button>
      </LoginSocialGoogle>
    </Box>
  );
};

export default JobSeekerSignUpForm;
