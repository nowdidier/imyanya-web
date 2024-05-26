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
        'Ifayile irakenewe.',
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
      .required('Icyifuzo ni ngombwa.')
      .max(200, 'Icyifuzo kirenze uburebure bwemewe.'),
    position: yup
      .number()
      .required('Urwego rurakenewe.')
      .typeError('Urwego rurakenewe.'),
    academicLevel: yup
      .number()
      .required('Urwego rw\'amashuri rurakenewe.')
      .typeError('Urwego rw\'amashuri rurakenewe.'),
    experience: yup
      .number()
      .required('Ubunararibonye mu kazi burakenewe.')
      .typeError('Ubunararibonye mu kazi burakenewe.'),
    career: yup
      .number()
      .required('Umwuga urakenewe.')
      .typeError('Umwuga urakenewe.'),
    city: yup
      .number()
      .required('Intara/Umujyi urakenewe.')
      .typeError('Intara/Umujyi urakenewe.'),
    salaryMin: yup
      .number()
      .required('Umushahara ntarengwa uri hasi urakenewe.')
      .typeError('Umushahara uri hasi nturakenewe.')
      .min(0, 'Umushahara uri hasi nturakenewe.')
      .test(
        'minimum-wage-comparison',
        'Umushahara uri hasi ugomba kuba muto kuruta uri hejuru.',
        function (value) {
          return !(value >= this.parent.salaryMax);
        }
      ),
    salaryMax: yup
      .number()
      .required('Umushahara ntarengwa uri hejuru urakenewe.')
      .typeError('Umushahara uri hejuru nturakenewe.')
      .min(0, 'Umushahara uri hejuru nturakenewe.')
      .test(
        'maximum-wage-comparison',
        'Umushahara uri hejuru ugomba kuba munini kuruta uri hasi.',
        function (value) {
          return !(value <= this.parent.salaryMin);
        }
      ),
    typeOfWorkplace: yup
      .number()
      .required('Aho gukorera harakenewe.')
      .typeError('Aho gukorera harakenewe.'),
    jobType: yup
      .number()
      .required('Ubwoko bw\'akazi burakenewe.')
      .typeError('Ubwoko bw\'akazi burakenewe.'),
    description: yup
      .string()
      .required('Intego z\'umwuga zirakenewe.')
      .max(800, 'Intego z\'umwuga zirarenze uburebure bwemewe.'),
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
            title="Hitamo ifayile ya CV yawe"
            showRequired={true}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextFieldCustom
            name="title"
            showRequired={true}
            title="Icyifuzo"
            placeholder="Urugero: Umutekinisiye wa Backend"
            control={control}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <SingleSelectCustom
            name="position"
            control={control}
            options={allConfig?.positionOptions || []}
            title="Urwego"
            showRequired={true}
            placeholder="Hitamo urwego"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <SingleSelectCustom
            name="academicLevel"
            control={control}
            options={allConfig?.academicLevelOptions || []}
            title="Urwego rw'amashuri"
            showRequired={true}
            placeholder="Hitamo urwego rw'amashuri"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <SingleSelectCustom
            name="experience"
            control={control}
            options={allConfig?.experienceOptions || []}
            title="Ubunararibonye mu kazi"
            showRequired={true}
            placeholder="Hitamo ubunararibonye mu kazi"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <SingleSelectCustom
            name="career"
            control={control}
            options={allConfig?.careerOptions || []}
            title="Umwuga"
            showRequired={true}
            placeholder="Hitamo umwuga"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <SingleSelectCustom
            name="city"
            control={control}
            options={allConfig?.cityOptions || []}
            title="Intara/Umujyi"
            showRequired={true}
            placeholder="Hitamo intara/umujyi"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextFieldCustom
            name="salaryMin"
            title="Umushahara uri hasi"
            showRequired={true}
            placeholder="Injiza umushahara uri hasi wifuzwa"
            control={control}
            icon={'FRW'}
            type='number'
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextFieldCustom
            name="salaryMax"
            title="Umushahara uri hejuru"
            showRequired={true}
            placeholder="Injiza umushahara uri hejuru wifuzwa"
            control={control}
            icon={'FRW'}
            type='number'
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <SingleSelectCustom
            name="typeOfWorkplace"
            control={control}
            options={allConfig?.typeOfWorkplaceOptions || []}
            title="Aho gukorera"
            showRequired={true}
            placeholder="Hitamo aho gukorera"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <SingleSelectCustom
            name="jobType"
            control={control}
            options={allConfig?.jobTypeOptions || []}
            title="Ubwoko bw'akazi"
            showRequired={true}
            placeholder="Hitamo ubwoko bw'akazi"
          />
        </Grid>
        <Grid item xs={12}>
          <MultilineTextFieldCustom
            name="description"
            title="Intego z'umwuga"
            showRequired={true}
            placeholder="Andika intego zawe hano"
            control={control}
          />
        </Grid>
      </Grid>
    </form>
  );
};

export default ProfileUploadForm;
