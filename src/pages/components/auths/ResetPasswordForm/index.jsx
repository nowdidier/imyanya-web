
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
    
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
      ),
    confirmPassword: yup
      .string()
  
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
          showRequired={true}
        />
        <PasswordTextFieldCustom
          name="confirmPassword"
          control={control}
          showRequired={true}
        />
      </Stack>

      <Button
        fullWidth
        variant="contained"
        sx={{ mt: 3, mb: 2 }}
        onClick={handleSubmit(handleResetPassword)}
      >
      </Button>
    </Box>
  );
};

export default ResetPasswordForm;
