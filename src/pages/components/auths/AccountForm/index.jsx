

import React from 'react';
import { useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Grid } from '@mui/material';

import TextFieldCustom from '../../../../components/controls/TextFieldCustom';

const AccountForm = ({ handleUpdate, serverErrors }) => {
  const { currentUser } = useSelector((state) => state.user);

  const schema = yup.object().shape({
    fullName: yup
      .string()
      .required('Full name is required.')
      .max(100, 'Full name exceeds maximum length.'),
  });

  const { control, reset, setError, handleSubmit } = useForm({
    resolver: yupResolver(schema),
  });

  React.useEffect(() => {
    reset((formValues) => ({
      ...formValues,
      fullName: currentUser?.fullName,
      email: currentUser?.email,
      password: '*****************',
    }));
  }, [currentUser, reset]);

  // show server errors
  React.useEffect(() => {
    if (serverErrors !== null)
      for (let err in serverErrors) {
        setError(err, {
          type: 400,
          message: serverErrors[err]?.join(' '),
        });
      }
    else {
      setError();
    }
  }, [serverErrors, setError]);

  return (
    <form id="account-form" onSubmit={handleSubmit(handleUpdate)}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextFieldCustom
            name="fullName"
            title="Full Name"
            showRequired={true}
            placeholder="Enter your full name"
            control={control}
          />
        </Grid>
        <Grid item xs={12}>
          <TextFieldCustom
            name="email"
            title="Email"
            showRequired={true}
            placeholder="Enter email"
            control={control}
            disabled={true}
          />
        </Grid>
        <Grid item xs={12}>
          <TextFieldCustom
            name="password"
            title="Password"
            showRequired={true}
            placeholder="Enter password"
            control={control}
            disabled={true}
          />
        </Grid>
      </Grid>
    </form>
  );
};

export default AccountForm;
