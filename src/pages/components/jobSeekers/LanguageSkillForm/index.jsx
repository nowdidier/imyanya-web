import React from 'react';
import { useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Grid } from '@mui/material';

import SingleSelectCustom from '../../../../components/controls/SingleSelectCustom';
import RatingCustom from '../../../../components/controls/RatingCustom';

const LanguageSkillForm = ({
  handleAddOrUpdate,
  editData,
  serverErrors = null,
}) => {
  const { allConfig } = useSelector((state) => state.config);
  const schema = yup.object().shape({
    language: yup
      .number()
      .required('Language is required.')
      .typeError('Language is required.'),
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
          <SingleSelectCustom
            name="language"
            control={control}
            options={allConfig?.languageOptions || []}
            title="Language"
            showRequired={true}
            placeholder="Select language"
          />
        </Grid>
        <Grid item xs={12}>
          <RatingCustom name="level" control={control} title="Level" />
        </Grid>
      </Grid>
    </form>
  );
};

export default LanguageSkillForm;
