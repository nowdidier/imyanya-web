import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Grid } from '@mui/material';

import { DATE_OPTIONS } from '../../../../configs/constants';
import TextFieldCustom from '../../../../components/controls/TextFieldCustom';
import DatePickerCustom from '../../../../components/controls/DatePickerCustom';

const CertificateForm = ({
  handleAddOrUpdate,
  editData,
  serverErrors = null,
}) => {
  const schema = yup.object().shape({
    name: yup
      .string()
      .required('Certificate Name is required.')
      .max(200, 'Certificate Name exceeds the maximum length.'),
   trainingPlace: yup
      .string()
      .required('School/Training Center Name is required.')
      .max(255, 'School/Training Center Name exceeds the maximum length.'),
    startDate: yup
      .date()
      .required('Start date is required.')
      .typeError('Start date is required.'),
    expirationDate: yup.date().nullable(),
  });

  const { control, reset, setError, handleSubmit } = useForm({
    defaultValues: {
      name: '',
    },
    resolver: yupResolver(schema),
  });

  React.useEffect(() => {
    if (editData) {
      reset((formValues) => ({
        ...formValues,
        ...editData,
      }));
    } else {
      reset();
    }
  }, [editData, reset]);

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
    <form id="modal-form" onSubmit={handleSubmit(handleAddOrUpdate)}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextFieldCustom
            name="name"
            title="Certificate Name"
            showRequired={true}
            placeholder="Enter certificate name"
            control={control}
          />
        </Grid>
        <Grid item xs={12}>
          <TextFieldCustom
            name="trainingPlace"
            title="School / Training Center"
            showRequired={true}
            placeholder="Enter school/training center name"
            control={control}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <DatePickerCustom
            name="startDate"
            control={control}
            title="Start Date"
            showRequired={true}
            maxDate={DATE_OPTIONS.yesterday}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <DatePickerCustom
            name="expirationDate"
            control={control}
            title="Expiry Date (Leave blank if no expiration)"
            maxDate={DATE_OPTIONS.today}
          />
        </Grid>
      </Grid>
    </form>
  );
};

export default CertificateForm;
