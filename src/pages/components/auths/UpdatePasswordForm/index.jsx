
import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Grid } from '@mui/material';

import PasswordTextFieldCustom from '../../../../components/controls/PasswordTextFieldCustom';

const UpdatePasswordForm = ({ handleUpdatePassword, serverErrors = {} }) => {
  const schema = yup.object().shape({
    oldPassword: yup
      .string()
      .required(),
    newPassword: yup
      .string()
      .required()
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
      ),
    confirmPassword: yup
      .string()
      .required(),
  });

  const { control, setError, handleSubmit } = useForm({
    defaultValues: {
      oldPassword: '',
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
    <form id="modal-form" onSubmit={handleSubmit(handleUpdatePassword)}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <PasswordTextFieldCustom
            name="oldPassword"
            control={control}
            showRequired={true}
          />
        </Grid>
        <Grid item xs={12}>
          <PasswordTextFieldCustom
            name="newPassword"
            control={control}
            showRequired={true}
          />
        </Grid>
        <Grid item xs={12}>
          <PasswordTextFieldCustom
            name="confirmPassword"
            control={control}
            showRequired={true}
          />
        </Grid>
      </Grid>
    </form>
  );
};

export default UpdatePasswordForm;
