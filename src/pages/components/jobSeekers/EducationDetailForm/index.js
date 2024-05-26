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
      .required('Izina rya dipolome/Impamyabumenyi ni ngombwa.')
      .max(200, 'Izina rya dipolome/Impamyabumenyi rirarenze uburebure bwemewe.'),
    major: yup
      .string()
      .required('Icyiciro cy\'amasomo ni ngombwa.')
      .max(255, 'Icyiciro cy\'amasomo kirarenze uburebure bwemewe.'),
    trainingPlaceName: yup
      .string()
      .required('Ishuri/Ikigo cy\'amasomo ni ngombwa.')
      .max(255, 'Ishuri/Ikigo cy\'amasomo kirarenze uburebure bwemewe.'),
    startDate: yup
      .date()
      .required('Itariki itangirirwaho ni ngombwa.')
      .typeError('Itariki itangirirwaho ni ngombwa.'),
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
            title="Izina rya dipolome/Impamyabumenyi"
            showRequired={true}
            placeholder="Urugero: Impamyabumenyi ya kaminuza mu ikoranabuhanga, Impamyabumenyi y'ubumenyi ngiro"
            control={control}
          />
        </Grid>
        <Grid item xs={12}>
          <TextFieldCustom
            name="major"
            title="Icyiciro cy'amasomo"
            showRequired={true}
            placeholder="Injiza icyiciro cy'amasomo"
            control={control}
          />
        </Grid>
        <Grid item xs={12}>
          <TextFieldCustom
            name="trainingPlaceName"
            title="Ishuri/Ikigo cy'amasomo"
            showRequired={true}
            placeholder="Injiza izina ry'ishuri/Ikigo cy'amasomo"
            control={control}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <DatePickerCustom
            name="startDate"
            control={control}
            title="Itariki itangirirwaho"
            showRequired={true}
            maxDate={DATE_OPTIONS.yesterday}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <DatePickerCustom
            name="completedDate"
            control={control}
            title="Itariki isozwa (Siga ubusa niba ukiga hano)"
            maxDate={DATE_OPTIONS.today}
          />
        </Grid>
        <Grid item xs={12}>
          <MultilineTextFieldCustom
            name="description"
            title="Ibisobanuro birambuye"
            placeholder="Injiza ibisobanuro hano"
            control={control}
          />
        </Grid>
      </Grid>
    </form>
  );
};

export default EducationDetaiForm;
