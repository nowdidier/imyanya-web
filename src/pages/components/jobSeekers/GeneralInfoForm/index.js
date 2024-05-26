import React from 'react';
import { useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Grid } from '@mui/material';

import TextFieldCustom from '../../../../components/controls/TextFieldCustom';
import MultilineTextFieldCustom from '../../../../components/controls/MultilineTextFieldCustom';
import SingleSelectCustom from '../../../../components/controls/SingleSelectCustom';

const GeneralInfoForm = ({ handleUpdate, editData }) => {
  const { allConfig } = useSelector((state) => state.config);
  const schema = yup.object().shape({
    title: yup
      .string()
      .required('Umwanya wifuzwa urakenewe.')
      .max(200, 'Umwanya wifuzwa urenze uburebure bwemewe.'),
    position: yup
      .number()
      .required('Urwego rwifuzwa rurakenewe.')
      .typeError('Urwego rwifuzwa rurakenewe.'),
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
      .required('Uburyo bw\'umwuga burakenewe.')
      .typeError('Uburyo bw\'umwuga burakenewe.'),
    city: yup
      .number()
      .required('Intara/Umujyi birakenewe.')
      .typeError('Intara/Umujyi birakenewe.'),
    salaryMin: yup
      .number()
      .required('Umushahara w\'ibanze wifuzwa urakenewe.')
      .typeError('Umushahara w\'ibanze ntabwo ari wo.')
      .min(0, 'Umushahara w\'ibanze ntabwo ari wo.')
      .test(
        'minimum-wage-comparison',
        'Umushahara w\'ibanze ugomba kuba muto kurenza umushahara ntarengwa.',
        function (value) {
          return !(value >= this.parent.salaryMax);
        }
      ),
    salaryMax: yup
      .number()
      .required('Umushahara ntarengwa wifuzwa urakenewe.')
      .typeError('Umushahara ntarengwa ntabwo ari wo.')
      .min(0, 'Umushahara ntarengwa ntabwo ari wo.')
      .test(
        'maximum-wage-comparison',
        'Umushahara ntarengwa ugomba kuba munini kurenza umushahara w\'ibanze.',
        function (value) {
          return !(value <= this.parent.salaryMin);
        }
      ),
    typeOfWorkplace: yup
      .number()
      .required('Aho ukorera birakenewe.')
      .typeError('Aho ukorera birakenewe.'),
    jobType: yup
      .number()
      .required('Ubwoko bw\'akazi burakenewe.')
      .typeError('Ubwoko bw\'akazi burakenewe.'),
    description: yup
      .string()
      .required('Intego z\'umwuga zirakenewe.')
      .max(800, 'Intego z\'umwuga zirenze uburebure bwemewe.'),
  });

  const { control, reset, handleSubmit } = useForm({
    resolver: yupResolver(schema),
  });

  React.useEffect(() => {
    reset((formValues) => ({
      ...formValues,
      title: editData.title || '',
      position: editData?.position || '',
      academicLevel: editData?.academicLevel || '',
      experience: editData?.experience || '',
      career: editData?.career || '',
      city: editData?.city || '',
      salaryMin: editData?.salaryMin || '',
      salaryMax: editData?.salaryMax || '',
      typeOfWorkplace: editData?.typeOfWorkplace || '',
      jobType: editData?.jobType || '',
      description: editData?.description || '',
    }));
  }, [editData, reset]);

  return (
    <form id="modal-form" onSubmit={handleSubmit(handleUpdate)}>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <TextFieldCustom
            name="title"
            showRequired={true}
            title="Umwanya wifuzwa"
            placeholder="Urugero: Umuhanga mu gukoresha mudasobwa mu bijyanye na Backend"
            control={control}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <SingleSelectCustom
            name="position"
            control={control}
            options={allConfig?.positionOptions || []}
            title="Urwego rwifuzwa"
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
            title="Uburyo bw'umwuga"
            showRequired={true}
            placeholder="Hitamo uburyo bw'umwuga"
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
            title="Umushahara w'ibanze wifuzwa"
            showRequired={true}
            placeholder="Andika umushahara w'ibanze wifuzwa"
            control={control}
            icon={'VND'}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextFieldCustom
            name="salaryMax"
            title="Umushahara ntarengwa wifuzwa"
            showRequired={true}
            placeholder="Andika umushahara ntarengwa wifuzwa"
            control={control}
            icon={'VND'}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <SingleSelectCustom
            name="typeOfWorkplace"
            control={control}
            options={allConfig?.typeOfWorkplaceOptions || []}
            title="Aho ukorera"
            showRequired={true}
            placeholder="Hitamo aho ukorera"
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
            placeholder="Andika intego z'umwuga hano"
            control={control}
          />
        </Grid>
      </Grid>
    </form>
  );
};

export default GeneralInfoForm;
