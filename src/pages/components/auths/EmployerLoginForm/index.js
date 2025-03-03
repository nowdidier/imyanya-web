import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Box, Button, Stack } from '@mui/material';

import TextFieldCustom from '../../../../components/controls/TextFieldCustom';
import PasswordTextFieldCustom from '../../../../components/controls/PasswordTextFieldCustom';

const EmployerLoginForm = ({ onLogin }) => {
  const schema = yup.object().shape({
    email: yup
      .string()
      .required('Email is required!')
      .email('Invalid email format'),
    password: yup
      .string()
      .required('Password is required!')
      .min(8, 'Password must be at least 8 characters.')
      .max(128, 'Password exceeds maximum length.')
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
        'Must contain uppercase, lowercase, number and special character'
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
      </Stack>
      <Button fullWidth variant="contained" sx={{ mt: 3, mb: 2 }} type="submit">
        Login
      </Button>
    </Box>
  );
};

export default EmployerLoginForm;
