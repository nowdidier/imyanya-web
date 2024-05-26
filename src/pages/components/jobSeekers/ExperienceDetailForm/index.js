import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Grid } from '@mui/material';

import { DATE_OPTIONS } from '../../../../configs/constants';
import TextFieldCustom from '../../../../components/controls/TextFieldCustom';
import MultilineTextFieldCustom from '../../../../components/controls/MultilineTextFieldCustom';
import DatePickerCustom from '../../../../components/controls/DatePickerCustom';

const ExperienceDetailForm = ({ handleAddOrUpdate, editData }) => {
  const schema = yup.object().shape({
    jobName: yup
      .string()
      .required('Izina ry\'umwanya w\'akazi ni ngombwa.')
      .max(200, 'Izina ry\'umwanya w\'akazi rirarenga uburebure bwemewe.'),
    companyName: yup
      .string()
      .required('Izina ry\'ikigo ni ngombwa.')
      .max(255, 'Izina ry\'ikigo rirarenga uburebure bwemewe.'),
    startDate: yup
      .date()
      .required('Itariki yo gutangira ni ngombwa.')
      .typeError('Itariki yo gutangira ni ngombwa.')
      .max(DATE_OPTIONS.yesterday, 'Itariki yo gutangira igomba kuba iri munsi y\'uyu munsi.')
      .test(
        'start-date-comparison',
        'Itariki yo gutangira igomba kuba iri munsi y\'itariki yo kurangiza.',
        function (value) {
          return !(value >= this.parent.endDate);
        }
      ),
    endDate: yup
      .date()
      .required('Itariki yo kurangiza ni ngombwa.')
      .typeError('Itariki yo kurangiza ni ngombwa.')
      .max(
        DATE_OPTIONS.today,
        'Itariki yo kurangiza igomba kuba iri munsi cyangwa ingana n\'uyu munsi.'
      )
      .test(
        'end-date-comparison',
        'Itariki yo kurangiza igomba kuba iri hejuru y\'itariki yo gutangira.',
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
            placeholder="Urugero: Injeniyeri wa software"
            title="Umwanya/akazi"
            showRequired={true}
          />
        </Grid>
        <Grid item xs={12}>
          <TextFieldCustom
            name="companyName"
            title="Izina ry'ikigo"
            placeholder="Injiza izina ry'ikigo"
            control={control}
            showRequired={true}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <DatePickerCustom
            name="startDate"
            control={control}
            title="Itariki yo gutangira"
            showRequired={true}
            maxDate={DATE_OPTIONS.yesterday}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <DatePickerCustom
            name="endDate"
            control={control}
            title="Itariki yo kurangiza"
            showRequired={true}
            maxDate={DATE_OPTIONS.today}
          />
        </Grid>
        <Grid item xs={12}>
          <MultilineTextFieldCustom
            name="description"
            title="Ibisobanuro byisumbuyeho"
            placeholder="Injiza ibisobanuro hano"
            control={control}
          />
        </Grid>
      </Grid>
    </form>
  );
};

export default ExperienceDetailForm;
