
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
      .required('Tên công ty là bắt buộc.')
      .max(255, 'Tên công ty vượt quá độ dài cho phép.'),
    taxCode: yup
      .string(),
    employeeSize: yup
      .number(),
    fieldOperation: yup
      .string(),
    location: yup.object().shape({
      city: yup
        .number(),
      district: yup
        .number(),
      address: yup
        .string(),
      lat: yup
        .number(),
      lng: yup
        .number(),
    }),
    since: yup.date().nullable(),
    companyEmail: yup
      .string(),
    companyPhone: yup
      .string(),
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
                showRequired={true}
                control={control}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
              <TextFieldCustom
                name="taxCode"
                showRequired={true}
                control={control}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
              <SingleSelectCustom
                name="employeeSize"
                control={control}
                options={allConfig?.employeeSizeOptions || []}
                showRequired={true}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
              <TextFieldCustom
                name="fieldOperation"
                showRequired={true}
                control={control}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
              <DatePickerCustom
                name="since"
                control={control}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
              <TextFieldCustom
                name="websiteUrl"
                
                control={control}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
              <TextFieldCustom
                name="facebookUrl"
                
                control={control}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
              <TextFieldCustom
                name="youtubeUrl"
               
                control={control}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
              <TextFieldCustom
                name="linkedinUrl"
                
                control={control}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
              <TextFieldCustom
                name="companyEmail"
                showRequired={true}
                control={control}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
              <TextFieldCustom
                name="companyPhone"
                showRequired={true}
                control={control}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
              <SingleSelectCustom
                name="location.city"
                control={control}
                options={allConfig?.cityOptions || []}
                showRequired={true}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
              <SingleSelectCustom
                options={districtOptions}
                name="location.district"
                control={control}
                showRequired={true}
              />
            </Grid>
            <Grid item xs={12}>
              <TextFieldAutoCompleteCustom
                name="location.address"
                showRequired={true}
                control={control}
                options={locationOptions}
                handleSelect={handleSelectLocation}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
              <TextFieldCustom
                name="location.lat"
                showRequired={true}

                control={control}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
              <TextFieldCustom
                name="location.lng"
                showRequired={true}

                control={control}
              />
            </Grid>
            <Grid item xs={12}>
              <RichTextEditorCustom
                name="description"
                control={control}
              />
              {/* <MultilineTextFieldCustom
                name="description"
                title="Mô tả thêm (thêm <br/> để xuống dòng)"
                placeholder="Nhập nội dung mô tả tại đây"
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
