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
        .required('Full name is required.')
        .max(100, 'Full name exceeds the allowed length.'),
    }),
    phone: yup
      .string()
      .required('Phone number is required.')
      .matches(REGEX_VATIDATE.phoneRegExp, 'Invalid phone number.')
      .max(15, 'Phone number exceeds the allowed length.'),
    birthday: yup
      .date()
      .transform((value, originalValue) => {
        if (originalValue) {
          return new Date(originalValue);
        }
        return value;
      })
      .required('Date of birth is required.')
      .typeError('Invalid date of birth.')
      .max(DATE_OPTIONS.yesterday, 'Invalid date of birth.'),
    gender: yup
      .string()
      .required('Gender is required.')
      .max(1, 'Gender exceeds the allowed length.'),
    maritalStatus: yup
      .string()
      .required('Marital status is required.')
      .max(1, 'Marital status exceeds the allowed length.'),
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
        .max(255, 'Address exceeds the allowed length.'),
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
            title="Full name"
            showRequired={true}
            placeholder="Enter full name"
            control={control}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextFieldCustom
            name="phone"
            title="Phone number"
            showRequired={true}
            placeholder="Enter phone number"
            control={control}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <DatePickerCustom
            name="birthday"
            control={control}
            title="Date of birth"
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
            title="Marital status"
            showRequired={true}
            placeholder="Select marital status"
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <SingleSelectCustom
            name="location.city"
            control={control}
            options={allConfig?.cityOptions || []}
            title="City/Province"
            showRequired={true}
            placeholder="Select city/province"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <SingleSelectCustom
            options={districtOptions || []}
            name="location.district"
            control={control}
            title="District"
            showRequired={true}
            placeholder="Select district"
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
