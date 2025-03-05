import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Grid } from '@mui/material';

import { DATE_OPTIONS } from '../../../../configs/constants';
import TextFieldCustom from '../../../../components/controls/TextFieldCustom';
import MultilineTextFieldCustom from '../../../../components/controls/MultilineTextFieldCustom';
import DatePickerCustom from '../../../../components/controls/DatePickerCustom';

const ExperienceDetaiForm = ({ handleAddOrUpdate, editData }) => {
  const schema = yup.object().shape({
    jobName: yup
      .string()
      .required('Job title is required.')
      .max(200, 'Job title exceeds maximum length.'),
    companyName: yup
      .string()
      .required('Company name is required.')
      .max(255, 'Company name exceeds maximum length.'),
    startDate: yup
      .date()
      .required('Start date is required.')
      .typeError('Start date is required.')
      .max(DATE_OPTIONS.yesterday, 'Start date must be before today.')
      .test(
        'start-date-comparison',
        'Start date must be before end date.',
        function (value) {
          return !(value >= this.parent.endDate);
        }
      ),
    endDate: yup
      .date()
      .required('End date is required.')
      .typeError('End date is required.')
      .max(
        DATE_OPTIONS.today,
        'End date must be today or earlier.'
      )
      .test(
        'end-date-comparison',
        'End date must be after start date.',
        function (value) {
          return !(value <= this.parent.startDate);
        }
      ),
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
            name="jobName"
            control={control}
            placeholder="e.g.: Software Engineer"
            title="Job Title/Position"
            showRequired={true}
          />
        </Grid>
        <Grid item xs={12}>
          <TextFieldCustom
            name="companyName"
            title="Company Name"
            placeholder="Enter company name"
            control={control}
            showRequired={true}
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
            name="endDate"
            control={control}
            title="End Date"
            showRequired={true}
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

export default ExperienceDetaiForm;
