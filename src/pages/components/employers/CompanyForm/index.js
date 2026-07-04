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
import Map from '../../../../components/Map';

const CompanyForm = ({ handleUpdate, editData, serverErrors = null }) => {
  const { allConfig } = useSelector((state) => state.config);
  const [districtOptions, setDistrictOptions] = React.useState([]);
  const [locationOptions, setLocationOptions] = React.useState([]);

  const normalizeLocation = (location = {}) => ({
    city: '',
    district: '',
    address: '',
    lat: '',
    lng: '',
    ...(location || {}),
  });

  const schema = yup.object().shape({
    companyName: yup
      .string()
      .required('Company Name is required.')
      .max(255, 'Company Name exceeds the maximum length.'),
    taxCode: yup
      .string()
      .required('Tax code is required.')
      .max(30, 'Tax code exceeds the maximum length.'),
    employeeSize: yup
      .number()
      .required('Workforce size is required.')
      .typeError('Workforce size is required.'),
    fieldOperation: yup
      .string()
      .required('Industry/field is required.')
      .max(255, 'Company Name exceeds the maximum length.'),
    location: yup.object().shape({
      city: yup
        .number()
        .required('Province/City is required.')
        .typeError('Province/City is required.'),
      district: yup
        .number()
        .required('District is required.')
        .typeError('District is required.'),
      address: yup
        .string()
        .required('Address is required.')
        .max(255, 'Address exceeds the maximum length.'),
      lat: yup
        .number()
        .required('Company latitude is required.')
        .typeError('Company map latitude is invalid.'),
      lng: yup
        .number()
        .required('Company map longitude is required.')
        .typeError('Company map longitude is invalid.'),
    }),
    since: yup.date().nullable(),
    companyEmail: yup
      .string()
      .required('Company Email is required.')
      .email('Invalid email address.')
      .max(100, 'Company Email exceeds the maximum length.'),
    companyPhone: yup
      .string()
      .required('Company Phone Number is required.')
      .matches(REGEX_VATIDATE.phoneRegExp, 'Invalid phone number.')
      .max(15, 'Company Phone Number exceeds the maximum length.'),
  });

  const { control, reset, setValue, setError, handleSubmit } = useForm({
    resolver: yupResolver(schema),
  });

  const cityId = useWatch({
    control,
    name: 'location.city',
  });

  const latitude = useWatch({
    control,
    name: 'location.lat',
  });

  const longitude = useWatch({
    control,
    name: 'location.lng',
  });

  const address = useWatch({
    control,
    name: 'location.address',
  });

  const addressDebounce = useDebounce(address, 500);

  const setCoordinates = (lat, lng) => {
    setValue('location.lat', lat, {
      shouldDirty: true,
      shouldTouch: true,
      shouldValidate: true,
    });
    setValue('location.lng', lng, {
      shouldDirty: true,
      shouldTouch: true,
      shouldValidate: true,
    });
  };

  const clearCoordinates = () => {
    setValue('location.lat', '', {
      shouldDirty: true,
      shouldTouch: true,
    });
    setValue('location.lng', '', {
      shouldDirty: true,
      shouldTouch: true,
    });
  };

  const applyLocationFromMap = async (lat, lng) => {
    setCoordinates(lat, lng);

    try {
      const resData = await goongService.reverseGeocode(lat, lng);
      const formattedAddress = resData?.results?.[0]?.formatted_address || '';

      if (formattedAddress) {
        setValue('location.address', formattedAddress, {
          shouldDirty: true,
          shouldTouch: true,
          shouldValidate: true,
        });
      }
    } catch (error) {
      errorHandling(error);
    }
  };

  React.useEffect(() => {
    const loadDistricts = async (cityId) => {
     try {
        const resData = await commonService.getDistrictsByCityId(cityId);

        if (districtOptions.length > 0) setValue('location.district', '');
        setDistrictOptions(resData.data);
      } catch (error) {
        errorHandling(error);
      }
    };

    if (cityId) {
      loadDistricts(cityId);
    }
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
        location: {
          ...(formValues?.location || {}),
          ...normalizeLocation(editData?.location),
        },
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
    if (!value?.place_id) {
      return;
    }

    try {
      const resData = await goongService.getPlaceDetailByPlaceId(
        value.place_id
      );
      setCoordinates(
        resData?.result?.geometry?.location?.lat ?? '',
        resData?.result?.geometry?.location?.lng ?? ''
      );
    } catch (error) {
      errorHandling(error);
    }
  };

  const handleMapLocationChange = async ({ lat, lng }) => {
    await applyLocationFromMap(lat, lng);
  };

  const handleAddressInputChange = (event, newValue, reason) => {
    if (reason === 'input' || reason === 'clear') {
      clearCoordinates();
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
                placeholder="Enter tax code company"
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
                placeholder="Select size company"
              />
            </Grid>
            <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
              <TextFieldCustom
                name="fieldOperation"
                title="Business Sector"
                showRequired={true}
                placeholder="Enter business sector of company"
                control={control}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
              <DatePickerCustom
                name="since"
                control={control}
                title="Founded Date"
              />
            </Grid>
            <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
              <TextFieldCustom
                name="websiteUrl"
                title="Website URL"
                placeholder="Enter URL website of company"
                control={control}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
              <TextFieldCustom
                name="facebookUrl"
                title="Facebook URL"
                placeholder="Enter URL Facebook"
                control={control}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
              <TextFieldCustom
                name="youtubeUrl"
                title="YouTube URL"
                placeholder="Enter URL Youtube"
                control={control}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
              <TextFieldCustom
                name="linkedinUrl"
                title="LinkedIn URL"
                placeholder="Enter URL Linkedin"
                control={control}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
              <TextFieldCustom
                name="companyEmail"
                title="Company Email"
                showRequired={true}
                placeholder="Enter email of company"
                control={control}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
              <TextFieldCustom
                name="companyPhone"
                title="Phone Number"
                showRequired={true}
                placeholder="Enter phone number of company"
                control={control}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
              <SingleSelectCustom
                name="location.city"
                control={control}
                options={allConfig?.cityOptions || []}
                title="Province/City"
                showRequired={true}
                placeholder="Select province/city"
              />
            </Grid>
            <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
              <SingleSelectCustom
                options={districtOptions}
                name="location.district"
                control={control}
                title="District"
                showRequired={true}
                placeholder="Select District"
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
                handleInputChange={handleAddressInputChange}
                helperText="Search an address or click the map below. Latitude and longitude will fill automatically."
              />
            </Grid>
            <Grid item xs={12}>
              <Map
                title={editData?.companyName || 'Company location'}
                subTitle={address || 'Search an address or click the map to set the coordinates.'}
                latitude={latitude}
                longitude={longitude}
                editable={true}
                onLocationChange={handleMapLocationChange}
                height={320}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
              <TextFieldCustom
                name="location.lat"
                title="Latitude"
                showRequired={true}
                placeholder="Auto-filled from the map"
                helperText="Pick a point on the map or select a suggested address."
                control={control}
                type="number"
                readOnly={true}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
              <TextFieldCustom
                name="location.lng"
                title="Longitude"
                showRequired={true}
                placeholder="Auto-filled from the map"
                helperText="Pick a point on the map or select a suggested address."
                control={control}
                type="number"
                readOnly={true}
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
                title="Additional Description (use <br/> for line breaks)"
                placeholder="Enter description here"
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
