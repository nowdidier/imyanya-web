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
      .required('Izina ry\'icyemezo ni ngombwa.')
      .max(200, 'Izina ry\'icyemezo rirarenze uburebure bwemewe.'),
    trainingPlace: yup
      .string()
      .required('Izina ry\'ishuri/Ikigo cy\'amahugurwa ni ngombwa.')
      .max(255, 'Izina ry\'ishuri/Ikigo cy\'amahugurwa rirarenze uburebure bwemewe.'),
    startDate: yup
      .date()
      .required('Itariki y\'itangiriro ni ngombwa.')
      .typeError('Itariki y\'itangiriro ni ngombwa.'),
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
            title="Izina ry'icyemezo"
            showRequired={true}
            placeholder="Injiza izina ry'icyemezo"
            control={control}
          />
        </Grid>
        <Grid item xs={12}>
          <TextFieldCustom
            name="trainingPlace"
            title="Ishuri/Ikigo cy'amahugurwa"
            showRequired={true}
            placeholder="Injiza izina ry'ishuri/Ikigo cy'amahugurwa"
            control={control}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <DatePickerCustom
            name="startDate"
            control={control}
            title="Itariki y'itangiriro"
            showRequired={true}
            maxDate={DATE_OPTIONS.yesterday}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <DatePickerCustom
            name="expirationDate"
            control={control}
            title="Itariki izarangiriraho (Reka ubusa niba icyemezo kidasaza)"
            maxDate={DATE_OPTIONS.today}
          />
        </Grid>
      </Grid>
    </form>
  );
};

export default CertificateForm;
