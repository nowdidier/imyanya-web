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
    fullName: yup.string().required('Amazina yuzuye ni ngombwa.'),
    email: yup
      .string()
      .required('Email ni ngombwa!')
      .email('Email ntifite uburyo bwiza')
      .max(100, 'Email irenze uburebure bwemewe.'),
    password: yup
      .string()
      .required('Ijambo ryibanga ni ngombwa!')
      .min(8, 'Ijambo ryibanga rigomba kuba nibura ibimenyetso 8.')
      .max(128, 'Ijambo ryibanga rirenze uburebure bwemewe.')
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
        'Rigomba kuba ririmo inyuguti nkuru, inyuguti nto, umubare n’ikimenyetso kidasanzwe'
      ),
    confirmPassword: yup
      .string()
      .required('Kwemeza ijambo ryibanga ni ngombwa.')
      .oneOf([yup.ref('password')], 'Kwemeza ijambo ryibanga ntibihuye.'),
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
          title="Amazina yuzuye"
          placeholder="Shyiramo amazina yuzuye"
          showRequired={true}
        />
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
        <PasswordTextFieldCustom
          name="confirmPassword"
          control={control}
          title="Kwemeza ijambo ryibanga"
          placeholder="Shyiramo ijambo ryibanga kwemeza"
          showRequired={true}
        />
      </Stack>
      <Button fullWidth variant="contained" type="submit" sx={{ mt: 3, mb: 2 }}>
        Iyandikishe
      </Button>
      <Divider>HOẶC</Divider>
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
          Kwiyandikisha na Facebook
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
          Kwiyandikisha na Google
        </Button>
      </LoginSocialGoogle>
    </Box>
  );
};

export default JobSeekerSignUpForm;
