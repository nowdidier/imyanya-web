import React from 'react';
import { useSelector } from 'react-redux';
import { useForm, useWatch } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Alert, Grid } from '@mui/material';

import { DATE_OPTIONS, REGEX_VATIDATE } from '../../../../configs/constants';
import useDebounce from '../../../../hooks/useDebounce';
import errorHandling from '../../../../utils/errorHandling';
import TextFieldCustom from '../../../../components/controls/TextFieldCustom';
import SingleSelectCustom from '../../../../components/controls/SingleSelectCustom';
import DatePickerCustom from '../../../../components/controls/DatePickerCustom';
import CheckboxCustom from '../../../../components/controls/CheckboxCustom';
import commonService from '../../../../services/commonService';
import RichTextEditorCustom from '../../../../components/controls/RichTextEditorCustom';
import TextFieldAutoCompleteCustom from '../../../../components/controls/TextFieldAutoCompleteCustom';

import goongService from '../../../../services/goongService';

const JobPostForm = ({ handleAddOrUpdate, editData, serverErrors }) => {
  const { allConfig } = useSelector((state) => state.config);
  const [districtOptions, setDistrictOptions] = React.useState([]);
  const [locationOptions, setLocationOptions] = React.useState([]);

  const schema = yup.object().shape({
    jobName: yup
      .string()
      .required('Izina ry’akazi ni ngombwa.')
      .max(200, 'Izina ry’akazi rirenze uburebure bwemewe.'),
    career: yup
      .number()
      .required('Umwuga ni ngombwa.')
      .typeError('Umwuga ni ngombwa.'),
    position: yup
      .number()
      .required('Umwanya w’akazi ni ngombwa.')
      .typeError('Umwanya w’akazi ni ngombwa.'),
    experience: yup
      .number()
      .required('Ubunararibonye ni ngombwa.')
      .typeError('Ubunararibonye ni ngombwa.'),
    typeOfWorkplace: yup
      .number()
      .required('Aho wakorera ni ngombwa.')
      .typeError('Aho wakorera ni ngombwa.'),
    jobType: yup
      .number()
      .required('Ubwoko bw’akazi ni ngombwa.')
      .typeError('Ubwoko bw’akazi ni ngombwa.'),
    quantity: yup
      .number()
      .required('Umubare w’abakozi ni ngombwa.')
      .typeError('Umubare w’abakozi si ngombwa.')
      .min(1, 'Umubare w’abakozi byibuze ni umwe.'),
    genderRequired: yup
      .string()
      .required('Igitsina ni ngombwa.')
      .typeError('Igitsina ni ngombwa.'),
    salaryMin: yup
      .number()
      .required('Umushahara muto ni ngombwa.')
      .typeError('Umushahara muto si ngombwa.')
      .min(0, 'Umushahara muto si ngombwa.')
      .test(
        'minimum-wage-comparison',
        'Umushahara muto ugomba kuba muto kuruta umushahara munini.',
        function (value) {
          return !(value >= this.parent.salaryMax);
        }
      ),
    salaryMax: yup
      .number()
      .required('Umushahara munini ni ngombwa.')
      .typeError('Umushahara munini si ngombwa.')
      .min(0, 'Umushahara munini si ngombwa.')
      .test(
        'maximum-wage-comparison',
        'Umushahara munini ugomba kuba munini kuruta umushahara muto.',
        function (value) {
          return !(value <= this.parent.salaryMin);
        }
      ),
    academicLevel: yup
      .number()
      .required('Impamyabumenyi ni ngombwa.')
      .typeError('Impamyabumenyi ni ngombwa.'),
    deadline: yup
      .date()
      .required('Igihe ntarengwa cyo gusaba ni ngombwa.')
      .typeError('Igihe ntarengwa cyo gusaba si ngombwa.')
      .min(new Date() + 1, 'Igihe ntarengwa cyo gusaba kigomba kuba kinini kuruta uyu munsi.'),
    jobDescription: yup
      .mixed()
      .test('editorContent', 'Ibisobanuro by’akazi ni ngombwa.', (value) =>
        value.getCurrentContent().hasText()
      ),
    jobRequirement: yup
      .mixed()
      .test('editorContent', 'Ibisabwa ku kazi ni ngombwa.', (value) =>
        value.getCurrentContent().hasText()
      ),
    benefitsEnjoyed: yup
      .mixed()
      .test('editorContent', 'Ibyiza ni ngombwa.', (value) =>
        value.getCurrentContent().hasText()
      ),
    location: yup.object().shape({
      city: yup
        .number()
        .required('Umujyi ni ngombwa.')
        .typeError('Umujyi ni ngombwa.'),
      district: yup
        .number()
        .required('Akarere ni ngombwa.')
        .typeError('Akarere ni ngombwa.'),
      address: yup
        .string()
        .required('Aderesi ni ngombwa.')
        .max(255, 'Aderesi irenze uburebure bwemewe.'),
      lat: yup
        .number()
        .required('Latitude ku ikarita ni ngombwa.')
        .typeError('Latitude ku ikarita si ngombwa.'),
      lng: yup
        .number()
        .required('Longitude ku ikarita ni ngombwa.')
        .typeError('Longitude ku ikarita si ngombwa.'),
    }),
    contactPersonName: yup
      .string()
      .required('Izina ry’uwo muvugana ni ngombwa.')
      .max(100, 'Izina ry’uwo muvugana rirenze uburebure bwemewe.'),
    contactPersonPhone: yup
      .string()
      .required('Telefone y’uwo muvugana ni ngombwa.')
      .matches(REGEX_VATIDATE.phoneRegExp, 'Telefone si ngombwa.')
      .max(15, 'Telefone y’uwo muvugana rirenze uburebure bwemewe.'),
    contactPersonEmail: yup
      .string()
      .required('Email y’uwo muvugana ni ngombwa.')
      .email('Email si ngombwa.')
      .max(100, 'Email y’uwo muvugana rirenze uburebure bwemewe.'),
    isUrgent: yup.boolean().default(false),
  });

  const { control, reset, setValue, setError, handleSubmit } = useForm({
    resolver: yupResolver(schema),
  });

  const cityId = useWatch({
    control,
    name: 'location.city',
  });

  const address = useWatch({
    control,
    name: 'location.address',
  });

  const addressDebounce = useDebounce(address, 500);

  React.useEffect(() => {
    const loadDistricts = async (cityId) => {
      try {
        const resData = await commonService.getDistrictsByCityId(cityId);

        if (districtOptions.length > 0) setValue('location.district', '');
        setDistrictOptions(resData.data);
      } catch (error) {
        errorHandling(error);
      } finally {
      }
    };

    if (cityId) {
      loadDistricts(cityId);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cityId, setValue]);

  React.useEffect(() => {
    const loadLocation = async (input) => {
      try {
        const resData = await goongService.getPlaces(input);

        if (resData.predictions) setLocationOptions(resData.predictions);
      } catch (error) {}
    };

    loadLocation(addressDebounce);
  }, [addressDebounce]);

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

  React.useEffect(() => {
    if (serverErrors !== null)
      for (let err in serverErrors) {
        setError(err, {
          type: 400,
          message: serverErrors[err]?.join(' '),
        });
      }
    else {
      setError();
    }
  }, [serverErrors, setError]);

  const handleSelectLocation = async (e, value) => {
    try {
      const resData = await goongService.getPlaceDetailByPlaceId(
        value.place_id
      );
      setValue('location.lat', resData?.result?.geometry.location.lat || '');
      setValue('location.lng', resData?.result?.geometry.location.lng || '');
    } catch (error) {}
  };

  return (
    <form id="modal-form" onSubmit={handleSubmit(handleAddOrUpdate)}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Alert severity="warning">
            !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
            Iyo uvuguruye itangazo, rizaba riri mu gihe cyo gusuzumwa!
          </Alert>
        </Grid>

        <Grid item xs={12}>
          <TextFieldCustom
            name="jobName"
            title="Izina ry'akazi"
            showRequired={true}
            placeholder="Andika izina ry'akazi"
            control={control}
          />
        </Grid>
        <Grid item xs={12}>
          <SingleSelectCustom
            name="career"
            control={control}
            options={allConfig?.careerOptions || []}
            title="Urwego rw'umwuga"
            showRequired={true}
            placeholder="Hitamo urwego rw'umwuga wo gushaka"
          />
        </Grid>
        <Grid item xs={6}>
          <SingleSelectCustom
            name="position"
            control={control}
            options={allConfig?.positionOptions || []}
            title="Umwanya/Inshingano"
            showRequired={true}
            placeholder="Hitamo umwanya/inshingano"
          />
        </Grid>
        <Grid item xs={6}>
          <SingleSelectCustom
            name="experience"
            control={control}
            options={allConfig?.experienceOptions || []}
            title="Uburambe"
            showRequired={true}
            placeholder="Hitamo uburambe busabwa"
          />
        </Grid>
        <Grid item xs={6}>
          <SingleSelectCustom
            name="typeOfWorkplace"
            control={control}
            options={allConfig?.typeOfWorkplaceOptions || []}
            title="Aho akazi gakorerwa"
            showRequired={true}
            placeholder="Hitamo aho akazi gakorerwa"
          />
        </Grid>
        <Grid item xs={6}>
          <SingleSelectCustom
            name="jobType"
            control={control}
            options={allConfig?.jobTypeOptions || []}
            title="Ubwoko bw'akazi"
            showRequired={true}
            placeholder="Hitamo ubwoko bw'akazi"
          />
        </Grid>
        <Grid item xs={6}>
          <TextFieldCustom
            name="quantity"
            title="Umubare w'abakozi bashakwa"
            showRequired={true}
            placeholder="Andika umubare w'abakozi bashakwa"
            control={control}
            type="number"
          />
        </Grid>
        <Grid item xs={6}>
          <SingleSelectCustom
            name="genderRequired"
            control={control}
            options={allConfig?.genderOptions || []}
            title="Ibisabwa ku gitsina"
            showRequired={true}
            placeholder="Hitamo igitsina gisabwa"
          />
        </Grid>
        <Grid item xs={6}>
          <TextFieldCustom
            name="salaryMin"
            title="Umushahara ntarengwa muto"
            showRequired={true}
            placeholder="Andika umushahara ntarengwa muto"
            control={control}
            type="number"
          />
        </Grid>
        <Grid item xs={6}>
          <TextFieldCustom
            name="salaryMax"
            title="Umushahara ntarengwa munini"
            showRequired={true}
            placeholder="Andika umushahara ntarengwa munini"
            control={control}
            type="number"
          />
        </Grid>
        <Grid item xs={6}>
          <SingleSelectCustom
            name="academicLevel"
            control={control}
            options={allConfig?.academicLevelOptions || []}
            title="Impamyabumenyi"
            showRequired={true}
            placeholder="Hitamo impamyabumenyi"
          />
        </Grid>
        <Grid item xs={6}>
          <DatePickerCustom
            name="deadline"
            control={control}
            showRequired={true}
            title="Igihe ntarengwa cyo gutanga ibyangombwa"
            minDate={DATE_OPTIONS.tomorrow}
          />
        </Grid>
        <Grid item xs={12}>
          <RichTextEditorCustom
            name="jobDescription"
            control={control}
            title="Ibisobanuro by'akazi"
            showRequired={true}
          />
        </Grid>
        <Grid item xs={12}>
          <RichTextEditorCustom
            name="jobRequirement"
            control={control}
            title="Ibisabwa mu kazi"
            showRequired={true}
          />
        </Grid>
        <Grid item xs={12}>
          <RichTextEditorCustom
            name="benefitsEnjoyed"
            control={control}
            title="Ibyiza by'akazi"
            showRequired={true}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
          <SingleSelectCustom
            name="location.city"
            control={control}
            options={allConfig?.cityOptions || []}
            title="Umujyi/Intara"
            showRequired={true}
            placeholder="Hitamo umujyi/intara"
          />
        </Grid>
        <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
          <SingleSelectCustom
            name="location.district"
            control={control}
            options={districtOptions}
            title="Akarere/Sekiteri"
            showRequired={true}
            placeholder="Hitamo akarere/sekiteri"
          />
        </Grid>
        <Grid item xs={12}>
          <TextFieldAutoCompleteCustom
            name="location.address"
            title="Adiresi"
            showRequired={true}
            placeholder="Andika adiresi"
            control={control}
            options={locationOptions}
            loading={true}
            handleSelect={handleSelectLocation}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
          <TextFieldCustom
            name="location.lat"
            title="Latitude"
            showRequired={true}
            placeholder="Andika latitude y'aho ikigo giherereye ku ikarita."
            helperText="Birazuzuzwa byikora iyo uhise uhitemo adiresi yatanzwe."
            control={control}
            type="number"
          />
        </Grid>
        <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
          <TextFieldCustom
            name="location.lng"
            title="Longitude"
            showRequired={true}
            placeholder="Andika longitude y'aho ikigo giherereye ku ikarita."
            helperText="Birazuzuzwa byikora iyo uhise uhitemo adiresi yatanzwe."
            control={control}
            type="number"
          />
        </Grid>
        <Grid item xs={12}>
          <TextFieldCustom
            name="contactPersonName"
            title="Izina ry'umuntu wo guhamagara"
            showRequired={true}
            placeholder="Andika izina ry'umuntu wo guhamagara"
            control={control}
          />
        </Grid>
        <Grid item xs={12}>
          <TextFieldCustom
            name="contactPersonPhone"
            title="Telefoni y'umuntu wo guhamagara"
            showRequired={true}
            placeholder="Andika telefoni y'umuntu wo guhamagara"
            control={control}
          />
        </Grid>
        <Grid item xs={12}>
          <TextFieldCustom
            name="contactPersonEmail"
            title="Imeli y'umuntu wo guhamagara"
            showRequired={true}
            placeholder="Andika imeli y'umuntu wo guhamagara"
            control={control}
          />
        </Grid>
        <Grid item xs={12}>
          <CheckboxCustom name="isUrgent" control={control} title="Akazi kihutirwa" />
        </Grid>
      </Grid>
    </form>
  );
};

export default JobPostForm;
