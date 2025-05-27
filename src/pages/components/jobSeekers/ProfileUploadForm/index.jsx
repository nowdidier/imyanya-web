import React from 'react';
import { useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Grid } from '@mui/material';

import TextFieldCustom from '../../../../components/controls/TextFieldCustom';
import MultilineTextFieldCustom from '../../../../components/controls/MultilineTextFieldCustom';
import SingleSelectCustom from '../../../../components/controls/SingleSelectCustom';
import FileUploadCustom from '../../../../components/controls/FileUploadCustom';

const ProfileUploadForm = ({ handleAdd }) => {
  const { allConfig } = useSelector((state) => state.config);
  const schema = yup.object().shape({
    file: yup
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
    title: yup
      .string()
      .required('Desired position is required.')
      .max(200, 'Desired position exceeds the allowed length.'),
    position: yup
      .number()
      .required('Desired level is required.')
      .typeError('Desired level is required.'),
    academicLevel: yup
      .number()
      .required('Education level is required.')
      .typeError('Education level is required.'),
    experience: yup
      .number()
      .required('Work experience is required.')
      .typeError('Work experience is required.'),
    career: yup
      .number()
      .required('Career is required.')
      .typeError('Career is required.'),
    city: yup
      .number()
      .required('Province/City is required.')
      .typeError('Province/City is required.'),
    salaryMin: yup
      .number()
      .required('Minimum desired salary is required.')
      .typeError('Invalid minimum salary.')
      .min(0, 'Invalid minimum salary.')
      .test(
        'minimum-wage-comparison',
        'Minimum salary must be less than maximum salary.',
        function (value) {
          return !(value >= this.parent.salaryMax);
        }
      ),
    salaryMax: yup
      .number()
      .required('Maximum desired salary is required.')
      .typeError('Invalid maximum salary.')
      .min(0, 'Invalid maximum salary.')
      .test(
        'maximum-wage-comparison',
        'Maximum salary must be greater than minimum salary.',
        function (value) {
          return !(value <= this.parent.salaryMin);
        }
      ),
    typeOfWorkplace: yup
      .number()
      .required('Workplace is required.')
      .typeError('Workplace is required.'),
    jobType: yup
      .number()
      .required('Job type is required.')
      .typeError('Job type is required.'),
    description: yup
      .string()
      .required('Career objective is required.')
      .max(800, 'Career objective exceeds the allowed length.'),
  });

  const { control, handleSubmit } = useForm({
    resolver: yupResolver(schema),
  });

  return (
    <form id="modal-form" onSubmit={handleSubmit(handleAdd)}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <FileUploadCustom
            control={control}
            name="file"
            title="Choose your CV file"
            showRequired={true}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextFieldCustom
            name="title"
            showRequired={true}
            title="Desired position"
            placeholder="E.g.: Backend Developer"
            control={control}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <SingleSelectCustom
            name="position"
            control={control}
            options={allConfig?.positionOptions || []}
            title="Desired level"
            showRequired={true}
            placeholder="Select level"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <SingleSelectCustom
            name="academicLevel"
            control={control}
            options={allConfig?.academicLevelOptions || []}
            title="Education level"
            showRequired={true}
            placeholder="Select education level"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <SingleSelectCustom
            name="experience"
            control={control}
            options={allConfig?.experienceOptions || []}
            title="Work experience"
            showRequired={true}
            placeholder="Select work experience"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <SingleSelectCustom
            name="career"
            control={control}
            options={allConfig?.careerOptions || []}
            title="Career"
            showRequired={true}
            placeholder="Select career"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <SingleSelectCustom
            name="city"
            control={control}
            options={allConfig?.cityOptions || []}
            title="Province/City"
            showRequired={true}
            placeholder="Select province/city"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextFieldCustom
            name="salaryMin"
            title="Minimum desired salary"
            showRequired={true}
            placeholder="Enter minimum desired salary"
            control={control}
            icon={'VND'}
            type='number'
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextFieldCustom
            name="salaryMax"
            title="Maximum desired salary"
            showRequired={true}
            placeholder="Enter maximum desired salary"
            control={control}
            icon={'VND'}
            type='number'
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <SingleSelectCustom
            name="typeOfWorkplace"
            control={control}
            options={allConfig?.typeOfWorkplaceOptions || []}
            title="Workplace"
            showRequired={true}
            placeholder="Select workplace"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <SingleSelectCustom
            name="jobType"
            control={control}
            options={allConfig?.jobTypeOptions || []}
            title="Job type"
            showRequired={true}
            placeholder="Select job type"
          />
        </Grid>
        <Grid item xs={12}>
          <MultilineTextFieldCustom
            name="description"
            title="Career objective"
            showRequired={true}
            placeholder="Enter content here"
            control={control}
          />
        </Grid>
      </Grid>
    </form>
  );
};

export default ProfileUploadForm;
