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
      .required('Position desired is required.')
      .max(200, 'Position desired exceeds the maximum length.'),
    position: yup
      .number()
      .required('Level desired is required.')
      .typeError('Level desired is required.'),
    academicLevel: yup
      .number()
      .required('Education Level is required.')
      .typeError('Education Level is required.'),
    experience: yup
      .number()
      .required('Work Experience is required.')
      .typeError('Work Experience is required.'),
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
      .required('Minimum Desired Salary is required.')
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
      .required('Maximum Desired Salary is required.')
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
      .required('Work location is required.')
      .typeError('Work location is required.'),
    jobType: yup
      .number()
      .required('Job Type is required.')
      .typeError('Job Type is required.'),
    description: yup
      .string()
      .required('Career Objective is required.')
      .max(800, 'Career Objective exceeds the maximum length.'),
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
            title="Select your CV file"
            showRequired={true}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextFieldCustom
            name="title"
            showRequired={true}
            title="Position desired"
            placeholder="e.g. Backend Developer"
            control={control}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <SingleSelectCustom
            name="position"
            control={control}
            options={allConfig?.positionOptions || []}
            title="Level desired"
            showRequired={true}
            placeholder="Select level"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <SingleSelectCustom
            name="academicLevel"
            control={control}
            options={allConfig?.academicLevelOptions || []}
            title="Education Level"
            showRequired={true}
            placeholder="Select education level"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <SingleSelectCustom
            name="experience"
            control={control}
            options={allConfig?.experienceOptions || []}
            title="Work Experience"
            showRequired={true}
            placeholder="Select work experience"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <SingleSelectCustom
            name="career"
            control={control}
            options={allConfig?.careerOptions || []}
            title="Occupation"
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
            title="Minimum Desired Salary"
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
            title="Maximum Desired Salary"
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
            title="Work Location"
            showRequired={true}
            placeholder="Select workplace"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <SingleSelectCustom
            name="jobType"
            control={control}
            options={allConfig?.jobTypeOptions || []}
            title="Job Type"
            showRequired={true}
            placeholder="Select job type"
          />
        </Grid>
        <Grid item xs={12}>
          <MultilineTextFieldCustom
            name="description"
            title="Career Objective"
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
