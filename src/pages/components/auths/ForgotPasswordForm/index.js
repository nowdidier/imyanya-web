import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Box, Button, Stack } from '@mui/material';

import TextFieldCustom from '../../../../components/controls/TextFieldCustom';

const ForgotPasswordForm = ({ handleRequestResetPassword }) => {
  const schema = yup.object().shape({
    email: yup
      .string()
      .required('Email irakenewe!')
      .email('Imiterere ya imeri ntabwo aribyo'),
  });

  const { control, handleSubmit } = useForm({
    defaultValues: {
      email: '',
    },
    resolver: yupResolver(schema),
  });

  return (
    <Box component="form" onSubmit={handleSubmit(handleRequestResetPassword)}>
      <Stack spacing={1.5} sx={{ mb: 2 }}>
        <TextFieldCustom
          name="email"
          control={control}
          title="Email"
          showRequired={true}
          placeholder="Enter email"
        />
      </Stack>

      <Button fullWidth variant="contained" sx={{ mt: 3, mb: 2 }} type="submit">
      Ongera usubize ijambo ryibanga uko ryari riri      </Button>
    </Box>
  );
};

export default ForgotPasswordForm;
