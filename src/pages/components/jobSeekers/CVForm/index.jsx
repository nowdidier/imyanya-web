import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Grid } from '@mui/material';

import BasicDropzone from '../../../../components/controls/BasicDropzone';

const CVForm = ({ handleUpdate }) => {
  const schema = yup.object().shape({
    files: yup
      .mixed()
      .test(
        'files empty',
        'File is required.',
        (value) =>
          !(
            value === undefined ||
            value === null ||
            value === '' ||
            value.length === 0
          )
      ),
  });

  const { control, handleSubmit } = useForm({
    resolver: yupResolver(schema),
  });

  return (
    <form id="modal-form" onSubmit={handleSubmit(handleUpdate)}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <BasicDropzone
            control={control}
            name="files"
            title="Select your CV file"
            showRequired={true}
          />
        </Grid>
        <Grid item xs={12}>
        </Grid>
      </Grid>
    </form>
  );
};

export default CVForm;
