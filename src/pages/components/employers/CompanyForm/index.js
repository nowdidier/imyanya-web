import React from 'react';
import { useSelector } from 'react-redux';
import { useForm, useWatch } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Grid, Skeleton } from '@mui/material';

import errorHandling from '../../../../utils/errorHandling';
import { REGEX_VATIDATE } from '../../../../configs/constants';
import TextFieldCustom from '../../../../components/controls/TextFieldCustom';
import SingleSelectCustom from '../../../../components/controls/SingleSelectCustom';
import DatePickerCustom from '../../../../components/controls/DatePickerCustom';

import commonService from '../../../../services/commonService';
import useDebounce from '../../../../hooks/useDebounce';
import TextFieldAutoCompleteCustom from '../../../../components/controls/TextFieldAutoCompleteCustom';
import goongService from '../../../../services/goongService';
import RichTextEditorCustom from '../../../../components/controls/RichTextEditorCustom';

const CompanyForm = ({ handleUpdate, editData, serverErrors = null }) => {
  const { allConfig } = useSelector((state) => state.config);
  const [districtOptions, setDistrictOptions] = React.useState([]);
  const [locationOptions, setLocationOptions] = React.useState([]);

  const schema = yup.object().shape({
    companyName: yup
      .string()
      .required('Izina ry\'ikigo ni ryiza.')
      .max(255, 'Izina ry\'ikigo ririmo amabara y\'ibihumbi magana atanu.'),
    taxCode: yup
      .string()
      .required('Kode y\'imisoro ni ryiza.')
      .max(30, 'Kode y\'imisoro ririmo amabara abiri n\'icumi.'),
    employeeSize: yup
      .number()
      .required('Ingano y\'abakozi ni ryiza.')
      .typeError('Ingano y\'abakozi ni ryiza.'),
    fieldOperation: yup
      .string()
      .required('Urwego rw\'imirimo ni ryiza.')
      .max(255, 'Urwego rw\'imirimo ririmo amabara y\'ibihumbi magana atanu.'),
    location: yup.object().shape({
      city: yup
        .number()
        .required('Umujyi/Intara ni ryiza.')
        .typeError('Umujyi/Intara ni ryiza.'),
      district: yup
        .number()
        .required('Akarere/Ka ni ryiza.')
        .typeError('Akarere/Ka ni ryiza.'),
      address: yup
        .string()
        .required('Adiresi ni ryiza.')
        .max(255, 'Adiresi ririmo amabara y\'ibihumbi magana atanu.'),
      lat: yup
        .number()
        .required('Vĩ độ ku ikarita ni ryiza.')
        .typeError('Vĩ độ ku ikarita ntibaho.'),
      lng: yup
        .number()
        .required('Kinh độ ku ikarita ni ryiza.')
        .typeError('Kinh độ ku ikarita ntibaho.'),
    }),
    since: yup.date().nullable(),
    companyEmail: yup
      .string()
      .required('Imeli y\'ikigo ni ryiza.')
      .email('Imeli ntibaho.')
      .max(100, 'Imeli y\'ikigo ririmo amabara y\'ibihumbi.'),
    companyPhone: yup
      .string()
      .required('Nomero ya telefone y\'ikigo ni ryiza.')
      .matches(REGEX_VATIDATE.phoneRegExp, 'Nomero ya telefone ntibaho.')
      .max(15, 'Nomero ya telefone y\'ikigo ririmo amabara abiri n\'icumi.'),
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
      } catch (error) {
        errorHandling(error);
      }
    };

    loadLocation(addressDebounce);
  }, [addressDebounce]);

  React.useEffect(() => {
    if (editData !== null)
      reset((formValues) => ({
        ...formValues,
        ...editData,
      }));
    else reset();
  }, [editData, reset]);

  // show server errors
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
    } catch (error) {
      errorHandling(error);
    }
  };

  return (
    <form id="company-form" onSubmit={handleSubmit(handleUpdate)}>
      <Grid container>
        <Grid item xs={12} sm={12} md={12} lg={10} xl={10}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
              <TextFieldCustom
                name="companyName"
                title="Izina ry'ikigo"
                showRequired={true}
                placeholder="Shyiramo izina ry'ikigo"
                control={control}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
              <TextFieldCustom
                name="taxCode"
                title="Kode y'imisoro"
                showRequired={true}
                placeholder="Shyiramo kode y'imisoro y'ikigo"
                control={control}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
              <SingleSelectCustom
                name="employeeSize"
                control={control}
                options={allConfig?.employeeSizeOptions || []}
                title="Ingano y'abakozi"
                showRequired={true}
                placeholder="Hitamo ingano y'ikigo"
              />
            </Grid>
            <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
              <TextFieldCustom
                name="fieldOperation"
                title="Urwego rw'imirimo"
                showRequired={true}
                placeholder="Shyiramo urwego rw'imirimo y'ikigo"
                control={control}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
              <DatePickerCustom
                name="since"
                control={control}
                title="Itariki ryashingwa ry'ikigo"
              />
            </Grid>
            <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
              <TextFieldCustom
                name="websiteUrl"
                title="Uruzinduko rw'urubuga"
                placeholder="Shyiramo URL y'urubuga rw'ikigo"
                control={control}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
              <TextFieldCustom
                name="facebookUrl"
                title="Uruzinduko rwa Facebook"
                placeholder="Shyiramo URL ya Facebook"
                control={control}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
              <TextFieldCustom
                name="youtubeUrl"
                title="Uruzinduko rwa Youtube"
                placeholder="Shyiramo URL ya Youtube"
                control={control}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
              <TextFieldCustom
                name="linkedinUrl"
                title="Uruzinduko rwa Linkedin"
                placeholder="Shyiramo URL ya Linkedin"
                control={control}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
              <TextFieldCustom
                name="companyEmail"
                title="Imeli y'ikigo"
                showRequired={true}
                placeholder="Shyiramo imeli y'ikigo"
                control={control}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
              <TextFieldCustom
                name="companyPhone"
                title="Nomero ya telefone"
                showRequired={true}
                placeholder="Shyiramo nomero ya telefone y'ikigo"
                control={control}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
              <SingleSelectCustom
                name="location.city"
                control={control}
                options={allConfig?.cityOptions || []}
                title="Umujyi/Intara"
                showRequired={true}
                placeholder="Hitamo umujyi cyangwa intara"
              />
            </Grid>
            <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
              <SingleSelectCustom
                options={districtOptions}
                name="location.district"
                control={control}
                title="Akarere/Ka"
                showRequired={true}
                placeholder="Hitamo akarere"
              />
            </Grid>
            <Grid item xs={12}>
              <TextFieldAutoCompleteCustom
                name="location.address"
                title="Adiresi"
                showRequired={true}
                placeholder="Shyiramo adiresi"
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
                placeholder="Shyiramo latitude y'ikigo ku ikarita."
                helperText="Izuzuzwa mu buryo bwikora niba uhise uhitemo adiresi."
                control={control}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
              <TextFieldCustom
                name="location.lng"
                title="Longitude"
                showRequired={true}
                placeholder="Shyiramo longitude y'ikigo ku ikarita."
                helperText="Izuzuzwa mu buryo bwikora niba uhise uhitemo adiresi."
                control={control}
              />
            </Grid>
            <Grid item xs={12}>
              <RichTextEditorCustom
                name="description"
                control={control}
                title="Ibisobanuro birambuye"
              />
              {/* <MultilineTextFieldCustom
                name="description"
                title="Ibisobanuro birambuye (shyiramo <br/> kugira ngo umanuke)"
                placeholder="Shyiramo ibisobanuro hano"
                control={control}
              /> */}
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </form>
  );
};  

const Loading = () => {
  return (
    <Grid container>
      <Grid item xs={12} sm={12} md={12} lg={10} xl={10}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
            <Skeleton height={50} />
          </Grid>
          <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
            <Skeleton height={50} />
          </Grid>
          <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
            <Skeleton height={50} />
          </Grid>
          <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
            <Skeleton height={50} />
          </Grid>
          <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
            <Skeleton height={50} />
          </Grid>
          <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
            <Skeleton height={50} />
          </Grid>
          <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
            <Skeleton height={50} />
          </Grid>
          <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
            <Skeleton height={50} />
          </Grid>
          <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
            <Skeleton height={50} />
          </Grid>
          <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
            <Skeleton height={50} />
          </Grid>
          <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
            <Skeleton height={50} />
          </Grid>
          <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
            <Skeleton height={50} />
          </Grid>
          <Grid item xs={12}>
            <Skeleton height={50} />
          </Grid>
          <Grid item xs={12}>
            <Skeleton height={50} />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

CompanyForm.Loading = Loading;

export default CompanyForm;
