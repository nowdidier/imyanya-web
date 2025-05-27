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
      .required('Company name is required.')
      .max(255, 'Company name exceeds maximum length.'),
    taxCode: yup
      .string()
      .required('Tax code is required.')
      .max(30, 'Tax code exceeds maximum length.'),
    employeeSize: yup
      .number()
      .required('Employee size is required.')
      .typeError('Employee size is required.'),
    fieldOperation: yup
      .string()
      .required('Field of operation is required.')
      .max(255, 'Field of operation exceeds maximum length.'),
    location: yup.object().shape({
      city: yup
        .number()
        .required('City/Province is required.')
        .typeError('City/Province is required.'),
      district: yup
        .number()
        .required('District is required.')
        .typeError('District is required.'),
      address: yup
        .string()
        .required('Address is required.')
        .max(255, 'Address exceeds maximum length.'),
      lat: yup
        .number()
        .required('Latitude is required.')
        .typeError('Invalid latitude.'),
      lng: yup
        .number()
        .required('Longitude is required.')
        .typeError('Invalid longitude.'),
    }),
    since: yup.date().nullable(),
    companyEmail: yup
      .string()
      .required('Company email is required.')
      .email('Invalid email.')
      .max(100, 'Company email exceeds maximum length.'),
    companyPhone: yup
      .string()
      .required('Company phone number is required.')
      .matches(REGEX_VATIDATE.phoneRegExp, 'Invalid phone number.')
      .max(15, 'Company phone number exceeds maximum length.'),
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
                title="Company Name"
                showRequired={true}
                placeholder="Enter company name"
                control={control}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
              <TextFieldCustom
                name="taxCode"
                title="Tax Code"
                showRequired={true}
                placeholder="Enter company tax code"
                control={control}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
              <SingleSelectCustom
                name="employeeSize"
                control={control}
                options={allConfig?.employeeSizeOptions || []}
                title="Company Size"
                showRequired={true}
                placeholder="Select company size"
              />
            </Grid>
            <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
              <TextFieldCustom
                name="fieldOperation"
                title="Field of Operation"
                showRequired={true}
                placeholder="Enter company field of operation"
                control={control}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
              <DatePickerCustom
                name="since"
                control={control}
                title="Company Establishment Date"
              />
            </Grid>
            <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
              <TextFieldCustom
                name="websiteUrl"
                title="Website URL"
                placeholder="Enter company website URL"
                control={control}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
              <TextFieldCustom
                name="facebookUrl"
                title="Facebook URL"
                placeholder="Enter Facebook URL"
                control={control}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
              <TextFieldCustom
                name="youtubeUrl"
                title="Youtube URL"
                placeholder="Enter Youtube URL"
                control={control}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
              <TextFieldCustom
                name="linkedinUrl"
                title="Linkedin URL"
                placeholder="Enter Linkedin URL"
                control={control}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
              <TextFieldCustom
                name="companyEmail"
                title="Company Email"
                showRequired={true}
                placeholder="Enter company email"
                control={control}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
              <TextFieldCustom
                name="companyPhone"
                title="Phone Number"
                showRequired={true}
                placeholder="Enter company phone number"
                control={control}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
              <SingleSelectCustom
                name="location.city"
                control={control}
                options={allConfig?.cityOptions || []}
                title="City/Province"
                showRequired={true}
                placeholder="Select city/province"
              />
            </Grid>
            <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
              <SingleSelectCustom
                options={districtOptions}
                name="location.district"
                control={control}
                title="District"
                showRequired={true}
                placeholder="Select district"
              />
            </Grid>
            <Grid item xs={12}>
              <TextFieldAutoCompleteCustom
                name="location.address"
                title="Address"
                showRequired={true}
                placeholder="Enter address"
                control={control}
                options={locationOptions}
                handleSelect={handleSelectLocation}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
              <TextFieldCustom
                name="location.lat"
                title="Latitude"
                showRequired={true}
                placeholder="Enter company latitude."
                helperText="Auto-filled if you select a suggested address."
                control={control}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
              <TextFieldCustom
                name="location.lng"
                title="Longitude"
                showRequired={true}
                placeholder="Enter company longitude."
                helperText="Auto-filled if you select a suggested address."
                control={control}
              />
            </Grid>
            <Grid item xs={12}>
              <RichTextEditorCustom
                name="description"
                control={control}
                title="Additional Description"
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
