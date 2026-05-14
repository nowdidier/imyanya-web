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
      .required('Password current is required!')
      .max(128, 'Password current exceeds the maximum length.'),
    newPassword: yup
      .string()
      .required('New Password is required!')
      .min(8, 'Password must be at least 8 characters.')
      .max(128, 'New Password exceeds the maximum length.')
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
        'Must contain one uppercase letter, one lowercase letter, one number, and one special character'
      ),
    confirmPassword: yup
      .string()
      .required('Password confirmation is required.')
      .oneOf([yup.ref('newPassword')], 'Password confirmation is incorrect.'),
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
            title="Password current"
            showRequired={true}
            placeholder="Enter current password"
          />
        </Grid>
        <Grid item xs={12}>
          <PasswordTextFieldCustom
            name="newPassword"
            control={control}
            title="New Password"
            showRequired={true}
            placeholder="Enter new password"
          />
        </Grid>
        <Grid item xs={12}>
          <PasswordTextFieldCustom
            name="confirmPassword"
            control={control}
            title="Confirm Password"
            showRequired={true}
            placeholder="Re-enter new password"
          />
        </Grid>
      </Grid>
    </form>
  );
};

export default UpdatePasswordForm;
