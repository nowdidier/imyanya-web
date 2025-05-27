import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Box, Button, Stack } from '@mui/material';

import PasswordTextFieldCustom from '../../../../components/controls/PasswordTextFieldCustom';

const ResetPasswordForm = ({ handleResetPassword, serverErrors = {} }) => {
  const schema = yup.object().shape({
    newPassword: yup
      .string()
      .required('New password is required!')
      .min(8, 'Password must be at least 8 characters.')
      .max(128, 'Password exceeds maximum length.')
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
        'Must contain uppercase, lowercase, number and special character'
      ),
    confirmPassword: yup
      .string()
      .required('Confirm password is required.')
      .oneOf([yup.ref('newPassword')], 'Passwords do not match.'),
  });

  const { control, setError, handleSubmit } = useForm({
    defaultValues: {
      newPassword: '',
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
    <Box>
      <Stack spacing={1.5} sx={{ mb: 2 }}>
        <PasswordTextFieldCustom
          name="newPassword"
          control={control}
          title="New Password"
          showRequired={true}
          placeholder="Enter new password"
        />
        <PasswordTextFieldCustom
          name="confirmPassword"
          control={control}
          title="Confirm Password"
          showRequired={true}
          placeholder="Re-enter new password"
        />
      </Stack>

      <Button
        fullWidth
        variant="contained"
        sx={{ mt: 3, mb: 2 }}
        onClick={handleSubmit(handleResetPassword)}
      >
        Reset Password
      </Button>
    </Box>
  );
};

export default ResetPasswordForm;
