
import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Grid } from '@mui/material';

import { DATE_OPTIONS } from '../../../../configs/constants';
import TextFieldCustom from '../../../../components/controls/TextFieldCustom';
import MultilineTextFieldCustom from '../../../../components/controls/MultilineTextFieldCustom';
import DatePickerCustom from '../../../../components/controls/DatePickerCustom';

const EducationDetaiForm = ({ handleAddOrUpdate, editData }) => {
  const schema = yup.object().shape({
    degreeName: yup
      .string()
      
    major: yup
      .string()
      
    trainingPlaceName: yup
      .string()
      
    startDate: yup
      .date()
      
    completedDate: yup.date().nullable(),
  });

  const { control, reset, handleSubmit } = useForm({
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

  return (
    <form id="modal-form" onSubmit={handleSubmit(handleAddOrUpdate)}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextFieldCustom
            name="degreeName"
            showRequired={true}
            control={control}
          />
        </Grid>
        <Grid item xs={12}>
          <TextFieldCustom
            name="major"
            showRequired={true}
            control={control}
          />
        </Grid>
        <Grid item xs={12}>
          <TextFieldCustom
            name="trainingPlaceName"
            showRequired={true}
            control={control}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <DatePickerCustom
            name="startDate"
            control={control}
            showRequired={true}
            maxDate={DATE_OPTIONS.yesterday}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <DatePickerCustom
            name="completedDate"
            control={control}
            maxDate={DATE_OPTIONS.today}
          />
        </Grid>
        <Grid item xs={12}>
          <MultilineTextFieldCustom
            name="description"
            control={control}
          />
        </Grid>
      </Grid>
    </form>
  );
};

export default EducationDetaiForm;
