import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Grid } from '@mui/material';

import TextFieldCustom from '../../../../components/controls/TextFieldCustom';
import RatingCustom from '../../../../components/controls/RatingCustom';

const AdvancedSkillForm = ({
  handleAddOrUpdate,
  editData,
  serverErrors = null,
}) => {
  const schema = yup.object().shape({
    name: yup
      .string()
      .required('Skill name is required.')
      .max(200, 'Skill name exceeds maximum length.'),
    level: yup.number().required('Level is required.'),
  });

  const { control, reset, setError, handleSubmit } = useForm({
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
        <Grid item xs={12} lg={12} md={12}>
          <TextFieldCustom
            name="name"
            title="Skill Name"
            showRequired={true}
            placeholder="Enter skill name"
            control={control}
          />
        </Grid>
        <Grid item xs={12}>
          <RatingCustom name="level" control={control} title="Level" />
        </Grid>
      </Grid>
    </form>
  );
};

export default AdvancedSkillForm;
