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
      .required('Ijambo ryibanga rishya ni ngombwa!')
      .min(8, 'Ijambo ryibanga rigomba kuba nibura ibimenyetso 8.')
      .max(128, 'Ijambo ryibanga rishya rirenze uburebure bwemewe.')
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
        'Rigomba kuba ririmo inyuguti nkuru, inyuguti nto, umubare n’ikimenyetso kidasanzwe'
      ),
    confirmPassword: yup
      .string()
      .required('Kwemeza ijambo ryibanga ni ngombwa.')
      .oneOf([yup.ref('newPassword')], 'Kwemeza ijambo ryibanga ntibihuye.'),
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
          title="Ijambo ryibanga rishya"
          showRequired={true}
          placeholder="Shyiramo ijambo ryibanga rishya"
        />
        <PasswordTextFieldCustom
          name="confirmPassword"
          control={control}
          title="Kwemeza ijambo ryibanga"
          showRequired={true}
          placeholder="Shyiramo ijambo ryibanga rishya"
        />
      </Stack>

      <Button
        fullWidth
        variant="contained"
        sx={{ mt: 3, mb: 2 }}
        onClick={handleSubmit(handleResetPassword)}
      >
        Seta ijambo ryibanga
      </Button>
    </Box>
  );
};

export default ResetPasswordForm;
