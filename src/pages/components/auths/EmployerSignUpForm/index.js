import React from 'react';
import { useSelector } from 'react-redux';
import { useForm, useWatch } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import {
  Box,
  Button,
  Grid,
  Stack,
  Step,
  StepLabel,
  Stepper,
} from '@mui/material';

import useDebounce from '../../../../hooks/useDebounce';

import { REGEX_VATIDATE } from '../../../../configs/constants';
import errorHandling from '../../../../utils/errorHandling';

import TextFieldCustom from '../../../../components/controls/TextFieldCustom';
import PasswordTextFieldCustom from '../../../../components/controls/PasswordTextFieldCustom';
import SingleSelectCustom from '../../../../components/controls/SingleSelectCustom';
import DatePickerCustom from '../../../../components/controls/DatePickerCustom';
import TextFieldAutoCompleteCustom from '../../../../components/controls/TextFieldAutoCompleteCustom';

import commonService from '../../../../services/commonService';
import goongService from '../../../../services/goongService';

const steps = ['Thông tin đăng nhập', 'Thông tin công ty'];

const EmployerSignUpForm = ({ onSignUp, serverErrors = {}, checkCreds }) => {
  const [activeStep, setActiveStep] = React.useState(0);
  const { allConfig } = useSelector((state) => state.config);
  const [districtOptions, setDistrictOptions] = React.useState([]);
  const [locationOptions, setLocationOptions] = React.useState([]);

// schema
const schema = yup.object().shape({
  fullName: yup
    .string()
    .required('Izina ryuzuye ni ngombwa!')
    .max(100, 'Izina ryuzuye rirenze uburebure bwemewe.'),
  email: yup
    .string()
    .required('Email ni ngombwa!')
    .email('Email ntiyubahirije uburyo bwemewe')
    .max(100, 'Email irenze uburebure bwemewe.'),
  password: yup
    .string()
    .required('Ijambo ryibanga ni ngombwa!')
    .min(8, 'Ijambo ryibanga rigomba kuba nibura imibare 8.')
    .max(128, 'Ijambo ryibanga rirenze uburebure bwemewe.')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
      'Rigomba kuba ririmo inyuguti nkuru, inyuguti nto, umubare n’ikimenyetso kidasanzwe'
    ),
  confirmPassword: yup
    .string()
    .required('Kwemeza ijambo ryibanga ni ngombwa.')
    .oneOf([yup.ref('password')], 'Kwemeza ijambo ryibanga ntibihuye.'),
  company: yup.object().shape({
    companyName: yup
      .string()
      .required('Izina ryikigo ni ngombwa!')
      .max(255, 'Izina ryikigo rirenze uburebure bwemewe.'),
    companyEmail: yup
      .string()
      .required('Email yikigo ni ngombwa')
      .email('Email yikigo ntiyubahirije uburyo bwemewe')
      .max(100, 'Email yikigo irenze uburebure bwemewe.'),
    companyPhone: yup
      .string()
      .required('Nomero ya telefone yikigo ni ngombwa')
      .matches(REGEX_VATIDATE.phoneRegExp, 'Nomero ya telefone ntiyemewe.')
      .max(15, 'Nomero ya telefone yikigo irenze uburebure bwemewe.'),
    taxCode: yup
      .string()
      .required('Ikodi y’imisoro yikigo ni ngombwa')
      .max(30, 'Ikodi y’imisoro yikigo irenze uburebure bwemewe.'),
    since: yup.date().nullable().typeError(),
    fieldOperation: yup
      .string()
      .max(255, 'Urwego rwikorwa ryikigo rurenze uburebure bwemewe.'),
    employeeSize: yup
      .number()
      .required('Umubare wabakozi ni ngombwa.')
      .typeError('Umubare wabakozi ni ngombwa.'),
    websiteUrl: yup
      .string()
      .max(300, 'Uruziga rwurubuga rwikigo rurenze uburebure bwemewe.'),
    location: yup.object().shape({
      city: yup
        .number()
        .required('Umujyi/Intara ni ngombwa.')
        .typeError('Umujyi/Intara ni ngombwa.'),
      district: yup
        .number()
        .required('Akarere/Ka komini ni ngombwa.')
        .typeError('Akarere/Ka komini ni ngombwa.'),
      address: yup
        .string()
        .required('Adiresi yikigo ni ngombwa!')
        .max(255, 'Adiresi yikigo irenze uburebure bwemewe.'),
    }),
  }),
});

  // use form
  const { control, setError, clearErrors, setValue, getValues, handleSubmit } =
    useForm({
      defaultValues: {
        fullName: '',
        email: '',
        password: '',
        confirmPassword: '',
        company: {
          companyName: '',
          companyEmail: '',
          companyPhone: '',
          taxCode: '',
          fieldOperation: '',
          employeeSize: '',
          websiteUrl: '',
          location: {
            city: '',
            district: '',
            address: '',
          },
        },
      },
      resolver: yupResolver(schema),
    });

  const cityId = useWatch({
    control,
    name: 'company.location.city',
  });

  const address = useWatch({
    control,
    name: 'company.location.address',
  });

  const addressDebounce = useDebounce(address, 500);

  // show server errors
  React.useEffect(() => {
    for (let err in serverErrors) {
      if (err === 'company') {
        for (let companyErr in serverErrors['company']) {
          if (companyErr === 'location') {
            for (let locationErr in serverErrors[err]['location']) {
              setError(`${err}.${'location'}.${locationErr}`, {
                type: 400,
                message: serverErrors[err]['location'][locationErr]?.join(' '),
              });
            }
          } else {
            setError(`${err}.${companyErr}`, {
              type: 400,
              message: serverErrors[err][companyErr]?.join(' '),
            });
          }
        }
      } else {
        setError(err, {
          type: 400,
          message: serverErrors[err]?.join(' '),
        });
      }
    }
  }, [serverErrors, setError]);

  React.useEffect(() => {
    const loadLocation = async (input) => {
      try {
        const resData = await goongService.getPlaces(input);

        if (resData.predictions) setLocationOptions(resData.predictions);
      } catch (error) {}
    };

    loadLocation(addressDebounce);
  }, [addressDebounce]);

  // select location lat, lng
  const handleSelectLocation = async (e, value) => {
    try {
      const resData = await goongService.getPlaceDetailByPlaceId(
        value.place_id
      );
      setValue(
        'company.location.lat',
        resData?.result?.geometry.location.lat || ''
      );
      setValue(
        'company.location.lng',
        resData?.result?.geometry.location.lng || ''
      );
    } catch (error) {}
  };

  // fetch districts by city
  React.useEffect(() => {
    const loadDistricts = async (cityId) => {
      try {
        const resData = await commonService.getDistrictsByCityId(cityId);

        if (districtOptions.length > 0)
          setValue('company.location.district', '');
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

  const handleSubmtNextSuccess = (data) => {
    handleNext(data.email);
  };

  const handleSubmitNextError = async (errors, e) => {
    if (
      !('fullName' in errors) &&
      !('email' in errors) &&
      !('password' in errors) &&
      !('confirmPassword' in errors)
    ) {
      const email = getValues('email');
      handleNext(email);
    }
  };

  const handleNext = async (email) => {
    const checkCredsResult = await checkCreds(email, null);
    if (checkCredsResult === true) {
      clearErrors();
      setActiveStep(activeStep + 1);
    }
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  const formContent = (actStep) => (
    <Box>
      <Stack
        spacing={1.5}
        sx={{ mb: 2, display: actStep === 0 ? 'block' : 'none' }}
      >
        <TextFieldCustom
          name="fullName"
          control={control}
          title="Izina ryuzuye"
          placeholder="Shyiramo izina ryuzuye"
          showRequired={true}
        />
        <TextFieldCustom
          name="email"
          control={control}
          title="Email"
          placeholder="Shyiramo email"
          showRequired={true}
        />
        <PasswordTextFieldCustom
          name="password"
          control={control}
          title="Ijambo ryibanga"
          placeholder="Shyiramo ijambo ryibanga"
          showRequired={true}
        />
        <PasswordTextFieldCustom
          name="confirmPassword"
          control={control}
          title="Kwemeza ijambo ryibanga"
          placeholder="Shyiramo kwemeza ijambo ryibanga"
          showRequired={true}
        />
      </Stack>
  
      <Box sx={{ mb: 2, display: actStep !== 0 ? 'block' : 'none' }}>
        <Grid container spacing={1.5}>
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
            <TextFieldCustom
              name="company.companyName"
              control={control}
              title="Izina ryikigo"
              placeholder="Shyiramo izina ryikigo"
              showRequired={true}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
            <TextFieldCustom
              name="company.companyEmail"
              control={control}
              title="Email yikigo"
              placeholder="Shyiramo email yikigo"
              showRequired={true}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
            <TextFieldCustom
              name="company.companyPhone"
              control={control}
              title="Nomero ya telefone"
              placeholder="Shyiramo nomero ya telefone yikigo"
              showRequired={true}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
            <TextFieldCustom
              name="company.taxCode"
              control={control}
              title="Ikodi y’imisoro"
              placeholder="Shyiramo ikodi y’imisoro yikigo"
              showRequired={true}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={4} lg={4} xl={4}>
            <DatePickerCustom
              name="company.since"
              control={control}
              title="Itariki yo gutangira"
            />
          </Grid>
          <Grid item xs={12} sm={12} md={8} lg={8} xl={8}>
            <TextFieldCustom
              name="company.fieldOperation"
              control={control}
              title="Urwego rwikorwa"
              placeholder="Shyiramo urwego rwikorwa ryikigo"
            />
          </Grid>
          <Grid item xs={12} sm={12} md={4} lg={4} xl={4}>
            <SingleSelectCustom
              options={allConfig?.employeeSizeOptions || []}
              name="company.employeeSize"
              control={control}
              title="Ingano yabakozi"
              placeholder="Shyiramo ingano yabakozi"
              showRequired={true}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={8} lg={8} xl={8}>
            <TextFieldCustom
              name="company.websiteUrl"
              control={control}
              title="Urubuga"
              placeholder="Shyiramo uruziga rwurubuga rwikigo"
            />
          </Grid>
          <Grid item xs={12} sm={12} md={8} lg={8} xl={8}>
            <SingleSelectCustom
              options={allConfig?.cityOptions || []}
              name="company.location.city"
              control={control}
              title="Umujyi/Intara"
              placeholder="Hitamo umujyi/intara"
              showRequired={true}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={4} lg={4} xl={4}>
            <SingleSelectCustom
              options={districtOptions}
              name="company.location.district"
              control={control}
              title="Akarere/Ka komini"
              placeholder="Hitamo akarere/ka komini"
              showRequired={true}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
            <TextFieldAutoCompleteCustom
              name="company.location.address"
              title="Adiresi"
              showRequired={true}
              placeholder="Shyiramo adiresi"
              control={control}
              options={locationOptions}
              loading={true}
              handleSelect={handleSelectLocation}
              helperText="Hitamo adiresi twaguhitiyemo kugira ngo udushoboze kumenya neza aho ikigo cyawe giherereye"
            />
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
  
  return (
    <Box
      component="form"
      onSubmit={
        activeStep === steps.length - 1
          ? handleSubmit(onSignUp)
          : handleSubmit(handleSubmtNextSuccess, handleSubmitNextError)
      }
    >
      <Stepper activeStep={activeStep} sx={{ pb: 3 }}>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      <>
        {formContent(activeStep)}
        <Stack
          sx={{ mt: 3, mb: 2 }}
          spacing={1.5}
          direction="row"
          justifyContent="flex-end"
        >
          {activeStep !== 0 && (
            <Button variant="outlined" onClick={handleBack}>
              Subira inyuma
            </Button>
          )}
          {activeStep === steps.length - 1 ? (
            <Button variant="contained" type="submit">
              Iyandikishe
            </Button>
          ) : (
            <Button variant="contained" type="submit">
              Komeza
            </Button>
          )}
        </Stack>
      </>
    </Box>
  );
};  
export default EmployerSignUpForm;
