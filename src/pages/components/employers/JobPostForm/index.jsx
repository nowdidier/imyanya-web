
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
   
    career: yup
      .number()
  
    position: yup
      .number()
      
    experience: yup
      .number()
     
    typeOfWorkplace: yup
      .number()
      
    jobType: yup
      .number()
      
    quantity: yup
      .number()
      
    genderRequired: yup
      .string()
      
    salaryMin: yup
      .number()
      
      .test(
        'minimum-wage-comparison',
        function (value) {
          return !(value >= this.parent.salaryMax);
        }
      ),
    salaryMax: yup
      .number()
     
      .test(
        'maximum-wage-comparison',
        function (value) {
          return !(value <= this.parent.salaryMin);
        }
      ),
    academicLevel: yup
      .number()
      
    deadline: yup
      .date()
      
    jobDescription: yup
      .mixed()
        value.getCurrentContent().hasText()
      ),
    jobRequirement: yup
      .mixed()
        value.getCurrentContent().hasText()
      ),
    benefitsEnjoyed: yup
      .mixed()
        value.getCurrentContent().hasText()
      ),
    location: yup.object().shape({
      city: yup
        .number()
      
      district: yup
        .number()
        
      address: yup
        .string()
        
      lat: yup
        .number()
        
      lng: yup
        .number()
      
    }),
    contactPersonName: yup
      .string()
      
    contactPersonPhone: yup
      .string()
     
    contactPersonEmail: yup
      .string()
     
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
          </Alert>
        </Grid>

        <Grid item xs={12}>
          <TextFieldCustom
            name="jobName"
            showRequired={true}
            control={control}
          />
        </Grid>
        <Grid item xs={12}>
          <SingleSelectCustom
            name="career"
            control={control}
            options={allConfig?.careerOptions || []}
            showRequired={true}
          />
        </Grid>
        <Grid item xs={6}>
          <SingleSelectCustom
            name="position"
            control={control}
            options={allConfig?.positionOptions || []}
            showRequired={true}
          />
        </Grid>
        <Grid item xs={6}>
          <SingleSelectCustom
            name="experience"
            control={control}
            options={allConfig?.experienceOptions || []}
            showRequired={true}
          />
        </Grid>
        <Grid item xs={6}>
          <SingleSelectCustom
            name="typeOfWorkplace"
            control={control}
            options={allConfig?.typeOfWorkplaceOptions || []}
            showRequired={true}
          />
        </Grid>
        <Grid item xs={6}>
          <SingleSelectCustom
            name="jobType"
            control={control}
            options={allConfig?.jobTypeOptions || []}
            showRequired={true}
          />
        </Grid>
        <Grid item xs={6}>
          <TextFieldCustom
            name="quantity"
            showRequired={true}
            control={control}
            type="number"
          />
        </Grid>
        <Grid item xs={6}>
          <SingleSelectCustom
            name="genderRequired"
            control={control}
            options={allConfig?.genderOptions || []}
            showRequired={true}
          />
        </Grid>
        <Grid item xs={6}>
          <TextFieldCustom
            name="salaryMin"
            showRequired={true}
            control={control}
            type="number"
          />
        </Grid>
        <Grid item xs={6}>
          <TextFieldCustom
            name="salaryMax"
            showRequired={true}
            control={control}
            type="number"
          />
        </Grid>
        <Grid item xs={6}>
          <SingleSelectCustom
            name="academicLevel"
            control={control}
            options={allConfig?.academicLevelOptions || []}
            showRequired={true}
          />
        </Grid>
        <Grid item xs={6}>
          <DatePickerCustom
            name="deadline"
            control={control}
            showRequired={true}
            minDate={DATE_OPTIONS.tomorrow}
          />
        </Grid>
        <Grid item xs={12}>
          <RichTextEditorCustom
            name="jobDescription"
            control={control}
            showRequired={true}
          />
        </Grid>
        <Grid item xs={12}>
          <RichTextEditorCustom
            name="jobRequirement"
            control={control}
            showRequired={true}
          />
        </Grid>
        <Grid item xs={12}>
          <RichTextEditorCustom
            name="benefitsEnjoyed"
            control={control}
            showRequired={true}
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
            name="location.district"
            control={control}
            options={districtOptions}
            showRequired={true}
          />
        </Grid>
        <Grid item xs={12}>
          <TextFieldAutoCompleteCustom
            name="location.address"
            showRequired={true}
            control={control}
            options={locationOptions}
            loading={true}
            handleSelect={handleSelectLocation}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
          <TextFieldCustom
            name="location.lat"
            showRequired={true}
   
            control={control}
            type="number"
          />
        </Grid>
        <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
          <TextFieldCustom
            name="location.lng"
            showRequired={true}
     
            control={control}
            type="number"
          />
        </Grid>
        <Grid item xs={12}>
          <TextFieldCustom
            name="contactPersonName"
            showRequired={true}
            control={control}
          />
        </Grid>
        <Grid item xs={12}>
          <TextFieldCustom
            name="contactPersonPhone"
            showRequired={true}
            control={control}
          />
        </Grid>
        <Grid item xs={12}>
          <TextFieldCustom
            name="contactPersonEmail"
            showRequired={true}
            control={control}
          />
        </Grid>
        <Grid item xs={12}>
        </Grid>
      </Grid>
    </form>
  );
};

export default JobPostForm;
