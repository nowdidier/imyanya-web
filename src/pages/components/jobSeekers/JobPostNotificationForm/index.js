import React from 'react';
import { useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Grid } from '@mui/material';

import TextFieldCustom from '../../../../components/controls/TextFieldCustom';
import SingleSelectCustom from '../../../../components/controls/SingleSelectCustom';
import RadioCustom from '../../../../components/controls/RadioCustom';

const JobPostNotificationForm = ({ handleAddOrUpdate, editData }) => {
  const { allConfig } = useSelector((state) => state.config);

  const schema = yup.object().shape({
    jobName: yup
      .string()
      .required('Ijambo ryibanze rirakenewe.')
      .max(200, 'Ijambo ryibanze ntirigomba kurenga inyuguti 200.'),
    career: yup
      .number()
      .required('Umwuga urakenewe.')
      .typeError('Umwuga urakenewe.'),
    city: yup
      .number()
      .required('Intara/Umujyi birakenewe.')
      .typeError('Intara/Umujyi birakenewe.'),
    position: yup.number().notRequired().nullable(),
    experience: yup.number().notRequired().nullable(),
    salary: yup
      .number()
      .nullable()
      .typeError('Umushahara wifuzwa ntabwo ari wo.')
      .transform((value, originalValue) => {
        if (originalValue === '') {
          return null;
        }
        return value;
      }),
  });

  const {
    control,
    reset,
    handleSubmit,
  } = useForm({
    defaultValues: {
      frequency:
        (allConfig?.frequencyNotificationOptions || []).length > 0
          ? allConfig?.frequencyNotificationOptions[0].id
          : null,
    },
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
            title="Ijambo ryibanze"
            showRequired={true}
            placeholder="Injiza ijambo ryibanze ari izina ry'akazi cyangwa irihariye ku kazi urimo gushaka."
            control={control}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
          <SingleSelectCustom
            name="career"
            control={control}
            options={allConfig?.careerOptions || []}
            title="Umwuga"
            showRequired={true}
            placeholder="Hitamo umwuga ushaka gukora"
          />
        </Grid>
        <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
          <SingleSelectCustom
            name="city"
            control={control}
            options={allConfig?.cityOptions || []}
            title="Intara/Umujyi"
            showRequired={true}
            placeholder="Hitamo intara cyangwa umujyi"
          />
        </Grid>
        <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
          <SingleSelectCustom
            name="position"
            control={control}
            options={allConfig?.positionOptions || []}
            title="Umwanya/Intebe"
            placeholder="Hitamo umwanya cyangwa intebe"
          />
        </Grid>
        <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
          <SingleSelectCustom
            name="experience"
            control={control}
            options={allConfig?.experienceOptions || []}
            title="Uburambe"
            placeholder="Hitamo uburambe busabwa"
          />
        </Grid>
        <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
          <TextFieldCustom
            name="salary"
            title="Umushahara wifuzwa"
            placeholder="Injiza umushahara wifuzwa"
            control={control}
            type="number"
          />
        </Grid>
        <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
          <RadioCustom
            name="frequency"
            control={control}
            options={allConfig?.frequencyNotificationOptions || []}
            title="Ubwinshi bw'amakuru"
          />
        </Grid>
      </Grid>
    </form>
  );
};

export default JobPostNotificationForm;
