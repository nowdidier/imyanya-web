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
      .required('Degree/Certificate Name is required.')
      .max(200, 'Degree/Certificate Name exceeds the maximum length.'),
    major: yup
      .string()
      .required('Major/Field of study is required.')
      .max(255, 'Major/Field of study exceeds the maximum length.'),
   trainingPlaceName: yup
      .string()
      .required('School/Training center is required.')
      .max(255, 'School/Training center exceeds the maximum length.'),
    startDate: yup
      .date()
      .required('Start date is required.')
      .typeError('Start date is required.'),
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
            title="Degree/Certificate Name"
            showRequired={true}
            placeholder="e.g. College Diploma in IT, Electrical Trade Certificate"
            control={control}
          />
        </Grid>
        <Grid item xs={12}>
          <TextFieldCustom
            name="major"
            title="Major / Field of Study"
            showRequired={true}
            placeholder="Enter major/field of study"
            control={control}
          />
        </Grid>
        <Grid item xs={12}>
          <TextFieldCustom
            name="trainingPlaceName"
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
            name="completedDate"
            control={control}
            title="Completion Date (Leave blank if currently studying here)"
            maxDate={DATE_OPTIONS.today}
          />
        </Grid>
        <Grid item xs={12}>
          <MultilineTextFieldCustom
            name="description"
            title="Additional Description"
            placeholder="Enter description here"
            control={control}
          />
        </Grid>
      </Grid>
    </form>
  );
};

export default EducationDetaiForm;
