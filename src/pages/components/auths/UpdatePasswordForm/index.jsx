

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
      .required('Current password is required!')
      .max(128, 'Current password exceeds maximum length.'),
    newPassword: yup
      .string()
      .required('New password is required!')
      .min(8, 'Password must be at least 8 characters.')
      .max(128, 'New password exceeds maximum length.')
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
            title="Current Password"
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
