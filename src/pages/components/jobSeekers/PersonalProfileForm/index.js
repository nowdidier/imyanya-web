import React from 'react';
import { useSelector } from 'react-redux';
import { useForm, useWatch } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Grid } from '@mui/material';

import errorHandling from '../../../../utils/errorHandling';
import { DATE_OPTIONS, REGEX_VATIDATE } from '../../../../configs/constants';
import TextFieldCustom from '../../../../components/controls/TextFieldCustom';
import SingleSelectCustom from '../../../../components/controls/SingleSelectCustom';
import DatePickerCustom from '../../../../components/controls/DatePickerCustom';

import commonService from '../../../../services/commonService';

const PersonalProfileForm = ({ handleUpdateProfile, editData }) => {
  const { allConfig } = useSelector((state) => state.config);
  const schema = yup.object().shape({
    user: yup.object().shape({
      fullName: yup
        .string()
        .required('Full Name is required.')
        .max(100, 'Full Name exceeds the maximum length.'),
    }),
    phone: yup
      .string()
      .required('Phone Number is required.')
      .matches(REGEX_VATIDATE.phoneRegExp, 'Invalid phone number.')
      .max(15, 'Phone Number exceeds the maximum length.'),
    birthday: yup
      .date()
      .required('Date of Birth is required.')
      .typeError('Date of Birth is invalid.')
      .max(DATE_OPTIONS.yesterday, 'Date of Birth is invalid.'),
    gender: yup
      .string()
      .required('Gender is required.')
      .max(1, 'Gender exceeds the maximum length.'),
    maritalStatus: yup
      .string()
      .required('Marital status is required.')
      .max(1, 'Marital status exceeds the maximum length.'),
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
    }),
  });
  const [districtOptions, setDistrictOptions] = React.useState([]);

  const { control, setValue, reset, handleSubmit } = useForm({
    resolver: yupResolver(schema),
  });

  const cityId = useWatch({
    control,
    name: 'location.city',
  });

  React.useEffect(() => {
    reset((formValues) => ({
      ...formValues,
      phone: editData?.phone || '',
      birthday: editData?.birthday,
      gender: editData?.gender || '',
      maritalStatus: editData?.maritalStatus || '',
      user: {
        fullName: editData.user?.fullName || '',
      },
      location: {
        city: editData.location?.city || '',
        district: editData.location?.district || '',
        address: editData.location?.address || '',
      },
    }));
  }, [editData, reset]);

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

  return (
    <form id="modal-form" onSubmit={handleSubmit(handleUpdateProfile)}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextFieldCustom
            name="user.fullName"
            title="Full Name"
            showRequired={true}
            placeholder="Enter full name"
            control={control}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextFieldCustom
            name="phone"
            title="Phone Number"
            showRequired={true}
            placeholder="Enter phone number"
            control={control}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <DatePickerCustom
            name="birthday"
            control={control}
            title="Date of Birth"
            showRequired={true}
            maxDate={DATE_OPTIONS.yesterday}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <SingleSelectCustom
            name="gender"
            control={control}
            options={allConfig?.genderOptions || []}
            title="Gender"
            showRequired={true}
            placeholder="Select gender"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <SingleSelectCustom
            name="maritalStatus"
            control={control}
            options={allConfig?.maritalStatusOptions || []}
            title="Marital Status"
            showRequired={true}
            placeholder="Select marital status"
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <SingleSelectCustom
            name="location.city"
            control={control}
            options={allConfig?.cityOptions || []}
            title="Province/City"
            showRequired={true}
            placeholder="Select province/city"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <SingleSelectCustom
            options={districtOptions || []}
            name="location.district"
            control={control}
            title="District"
            showRequired={true}
            placeholder="Select District"
          />
        </Grid>
        <Grid item xs={12}>
          <TextFieldCustom
            name="location.address"
            title="Address"
            showRequired={true}
            placeholder="Enter address"
            control={control}
          />
        </Grid>
      </Grid>
    </form>
  );
};

export default PersonalProfileForm;
