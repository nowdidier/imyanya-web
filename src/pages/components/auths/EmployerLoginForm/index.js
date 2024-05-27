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
      .required('Email ni ngombwa!')
      .email('Email ntiyubahirije uburyo bwemewe'),
    password: yup
      .string()
      .required('Ijambo ryibanga ni ngombwa!')
      .min(8, 'Ijambo ryibanga rigomba kuba nibura imibare 8.')
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
    </Box>
  );
};

export default EmployerLoginForm;
