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
        .required('Amazina yombi arakenewe.')
        .max(100, 'Amazina yombi ararenze uburebure bwemewe.'),
    }),
    phone: yup
      .string()
      .required('Numero ya telefone irakenewe.')
      .matches(REGEX_VATIDATE.phoneRegExp, 'Numero ya telefone siyo.')
      .max(15, 'Numero ya telefone irarenze uburebure bwemewe.'),
    birthday: yup
      .date()
      .required('Itariki y’amavuko irakenewe.')
      .typeError('Itariki y’amavuko siyo.')
      .max(DATE_OPTIONS.yesterday, 'Itariki y’amavuko siyo.'),
    gender: yup
      .string()
      .required('Igitsina kirakenewe.')
      .max(1, 'Igitsina kirarenze uburebure bwemewe.'),
    maritalStatus: yup
      .string()
      .required('Imiterere y’isezerano irakenewe.')
      .max(1, 'Imiterere y’isezerano irarenze uburebure bwemewe.'),
    location: yup.object().shape({
      city: yup
        .number()
        .required('Intara/Umutwe w’umujyi birakenewe.')
        .typeError('Intara/Umutwe w’umujyi birakenewe.'),
      district: yup
        .number()
        .required('Akarere irakenewe.')
        .typeError('Akarere irakenewe.'),
      address: yup
        .string()
        .required('Aderesi irakenewe.')
        .max(255, 'Aderesi irarenze uburebure bwemewe.'),
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
            title="Amazina Yombi"
            showRequired={true}
            placeholder="Injiza Amazina Yombi"
            control={control}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextFieldCustom
            name="phone"
            title="Numero ya Telefone"
            showRequired={true}
            placeholder="Injiza Numero ya Telefone"
            control={control}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <DatePickerCustom
            name="birthday"
            control={control}
            title="Itariki y’Amavuko"
            showRequired={true}
            maxDate={DATE_OPTIONS.yesterday}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <SingleSelectCustom
            name="gender"
            control={control}
            options={allConfig?.genderOptions || []}
            title="Igitsina"
            showRequired={true}
            placeholder="Hitamo Igitsina"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <SingleSelectCustom
            name="maritalStatus"
            control={control}
            options={allConfig?.maritalStatusOptions || []}
            title="Imiterere y'Isezerano"
            showRequired={true}
            placeholder="Hitamo Imiterere y'Isezerano"
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <SingleSelectCustom
            name="location.city"
            control={control}
            options={allConfig?.cityOptions || []}
            title="Intara/Umutwe w’Umujyi"
            showRequired={true}
            placeholder="Hitamo Intara/Umutwe w’Umujyi"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <SingleSelectCustom
            options={districtOptions || []}
            name="location.district"
            control={control}
            title="Akarere"
            showRequired={true}
            placeholder="Hitamo Akarere"
          />
        </Grid>
        <Grid item xs={12}>
          <TextFieldCustom
            name="location.address"
            title="Aderesi"
            showRequired={true}
            placeholder="Injiza Aderesi"
            control={control}
          />
        </Grid>
      </Grid>
    </form>
  );
};

export default PersonalProfileForm;
