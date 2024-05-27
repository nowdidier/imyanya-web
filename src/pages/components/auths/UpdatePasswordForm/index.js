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
      .required('Ijambo ryibanga rya kera ni ngombwa!')
      .max(128, 'Ijambo ryibanga rya kera rirenze uburebure bwemewe.'),
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
            title="Ijambo ryibanga rya kera"
            showRequired={true}
            placeholder="Shyiramo ijambo ryibanga rya kera"
          />
        </Grid>
        <Grid item xs={12}>
          <PasswordTextFieldCustom
            name="newPassword"
            control={control}
            title="Ijambo ryibanga rishya"
            showRequired={true}
            placeholder="Shyiramo ijambo ryibanga rishya"
          />
        </Grid>
        <Grid item xs={12}>
          <PasswordTextFieldCustom
            name="confirmPassword"
            control={control}
            title="Kwemeza ijambo ryibanga"
            showRequired={true}
            placeholder="Shyiramo ijambo ryibanga rishya"
          />
        </Grid>
      </Grid>
    </form>
  );
};

export default UpdatePasswordForm;
