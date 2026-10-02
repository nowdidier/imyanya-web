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
  styled,
} from '@mui/material';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import HowToRegIcon from '@mui/icons-material/HowToReg';

import useDebounce from '../../../../hooks/useDebounce';

import { REGEX_VATIDATE } from '../../../../configs/constants';
import errorHandling from '../../../../utils/errorHandling';

import TextFieldCustom from '../../../../components/controls/TextFieldCustom';
import PasswordTextFieldCustom from '../../../../components/controls/PasswordTextFieldCustom';
import SingleSelectCustom from '../../../../components/controls/SingleSelectCustom';
import DatePickerCustom from '../../../../components/controls/DatePickerCustom';
import TextFieldAutoCompleteCustom from '../../../../components/controls/TextFieldAutoCompleteCustom';
import Map from '../../../../components/Map';

import commonService from '../../../../services/commonService';
import goongService from '../../../../services/goongService';

const steps = ['Account Information', 'Company Information'];

const StyledButton = styled(Button)(() => ({
  padding: '8px 16px',
  borderRadius: '8px',
  fontSize: '14px',
  fontWeight: 500,
  textTransform: 'none',
  boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
 transition: 'all 0.2s ease',
  '&:hover': {
   transform: 'translateY(-1px)',
    boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
  },
}));

const StyledStepper = styled(Stepper)(({ theme }) => ({
  '& .MuiStepLabel-root .Mui-completed': {
    color: theme.palette.primary.main,
  },
  '& .MuiStepLabel-root .Mui-active': {
    color: theme.palette.primary.main,
  },
  '& .MuiStepLabel-label': {
    fontSize: '14px',
    fontWeight: 500,
  },
}));

const EmployerSignUpForm = ({ onSignUp, serverErrors = {}, checkCreds }) => {
  const [activeStep, setActiveStep] = React.useState(0);
  const { allConfig } = useSelector((state) => state.config);
  const [districtOptions, setDistrictOptions] = React.useState([]);
  const districtOptionsRef = React.useRef(districtOptions);
  districtOptionsRef.current = districtOptions;
  const [locationOptions, setLocationOptions] = React.useState([]);

  // schema
  const schema = yup.object().shape({
    fullName: yup
      .string()
      .required('Full Name is required!')
      .max(100, 'Full Name exceeds the maximum length.'),
    email: yup
      .string()
      .required('Email is required!')
      .email('Invalid email format')
      .max(100, 'Email exceeds the maximum length.'),
    password: yup
      .string()
      .required('Password is required!')
      .min(8, 'Password must be at least 8 characters.')
      .max(128, 'Password exceeds the maximum length.')
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/,
        'Must contain one uppercase letter, one lowercase letter, one number, and one special character'
      ),
    confirmPassword: yup
      .string()
      .required('Password confirmation is required.')
      .oneOf([yup.ref('password')], 'Password confirmation is incorrect.'),
    company: yup.object().shape({
      companyName: yup
        .string()
        .required('Company Name is required!')
        .max(255, 'Company Name exceeds the maximum length.'),
      companyEmail: yup
        .string()
        .required('Company email is required')
        .email('Company email has an invalid format')
        .max(100, 'Company Email exceeds the maximum length.'),
      companyPhone: yup
        .string()
        .required('Company Phone Number is required')
        .matches(REGEX_VATIDATE.phoneRegExp, 'Invalid phone number.')
        .max(15, 'Company Phone Number exceeds the maximum length.'),
      taxCode: yup
        .string()
        .required('Tax code is required')
        .max(30, 'Tax code exceeds the maximum length.'),
      since: yup.date().nullable().typeError(),
      fieldOperation: yup
        .string()
        .max(255, 'Business sector exceeds the maximum length.'),
      employeeSize: yup
        .number()
        .required('Employee count is required.')
        .typeError('Employee count is required.'),
      websiteUrl: yup
        .string()
        .max(300, 'Company website URL exceeds the maximum length.'),
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
          .required('Company Address is required!')
          .max(255, 'Company Address exceeds the maximum length.'),
        lat: yup
          .number()
          .required('Company latitude is required.')
          .typeError('Company map latitude is invalid.'),
        lng: yup
          .number()
          .required('Company longitude is required.')
          .typeError('Company map longitude is invalid.'),
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
            lat: '',
            lng: '',
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

  const latitude = useWatch({
    control,
    name: 'company.location.lat',
  });

  const longitude = useWatch({
    control,
    name: 'company.location.lng',
  });

  const addressDebounce = useDebounce(address, 500);

  const setCoordinates = (lat, lng) => {
    setValue('company.location.lat', lat, {
      shouldDirty: true,
      shouldTouch: true,
      shouldValidate: true,
    });
    setValue('company.location.lng', lng, {
      shouldDirty: true,
      shouldTouch: true,
      shouldValidate: true,
    });
  };

  const clearCoordinates = () => {
    setValue('company.location.lat', '', {
      shouldDirty: true,
      shouldTouch: true,
    });
    setValue('company.location.lng', '', {
      shouldDirty: true,
      shouldTouch: true,
    });
  };

  const updateAddressFromCoordinates = async (lat, lng) => {
    try {
      const resData = await goongService.reverseGeocode(lat, lng);
      const formattedAddress = resData?.results?.[0]?.formatted_address || '';

      if (formattedAddress) {
        setValue('company.location.address', formattedAddress, {
          shouldDirty: true,
          shouldTouch: true,
          shouldValidate: true,
        });
      }
    } catch (error) {
      errorHandling(error);
    }
  };

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
      } catch (error) {
        errorHandling(error);
      }
    };

    loadLocation(addressDebounce);
  }, [addressDebounce]);

  // select location lat, lng
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
    setCoordinates(lat, lng);
    await updateAddressFromCoordinates(lat, lng);
  };

  const handleAddressInputChange = (event, newValue, reason) => {
    if (reason === 'input' || reason === 'clear') {
      clearCoordinates();
    }
  };

  // fetch districts by city
  React.useEffect(() => {
    const loadDistricts = async (cityId) => {
     try {
        const resData = await commonService.getDistrictsByCityId(cityId);

        if (districtOptionsRef.current.length > 0)
          setValue('company.location.district', '');
        setDistrictOptions(resData.data);
      } catch (error) {
        errorHandling(error);
      }
    };

    if (cityId) {
      loadDistricts(cityId);
    }
  }, [cityId, setValue]);

  const handleSubmtNextSuccess = (data) => {
    handleNext(data.email);
  };

  const handleSubmitNextError = async (errors) => {
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
    if (checkCredsResult ===true) {
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
        spacing={2.5}
        sx={{ mb: 2, display: actStep === 0 ? 'block' : 'none' }}
      >
        <TextFieldCustom
          name="fullName"
          control={control}
          title="Full Name"
          placeholder="Enter full name"
          showRequired={true}
          sx={{
            '& .MuiOutlinedInput-root': {
              borderRadius: '10px',
              backgroundColor: 'rgba(255, 255, 255, 0.8)',
            }
          }}
        />
        <TextFieldCustom
          name="email"
          control={control}
          title="Email"
          placeholder="Enter email"
          showRequired={true}
          sx={{
            '& .MuiOutlinedInput-root': {
              borderRadius: '10px',
              backgroundColor: 'rgba(255, 255, 255, 0.8)',
            }
          }}
        />
        <PasswordTextFieldCustom
          name="password"
          control={control}
          title="Password"
          placeholder="Enter password"
          showRequired={true}
          sx={{
            '& .MuiOutlinedInput-root': {
              borderRadius: '10px',
              backgroundColor: 'rgba(255, 255, 255, 0.8)',
            }
          }}
        />
        <PasswordTextFieldCustom
          name="confirmPassword"
          control={control}
          title="Confirm Password"
          placeholder="Enter password confirmation"
          showRequired={true}
          sx={{
            '& .MuiOutlinedInput-root': {
              borderRadius: '10px',
              backgroundColor: 'rgba(255, 255, 255, 0.8)',
            }
          }}
        />
      </Stack>

      <Box sx={{ mb: 2, display: actStep !== 0 ? 'block' : 'none' }}>
        <Grid container spacing={2.5}>
          <Grid item xs={12}>
            <TextFieldCustom
              name="company.companyName"
              control={control}
              title="Company Name"
              placeholder="Enter company name"
              showRequired={true}
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: '10px',
                  backgroundColor: 'rgba(255, 255, 255, 0.8)',
                }
              }}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
            <TextFieldCustom
              name="company.companyEmail"
              control={control}
              title="Company Email"
              placeholder="Enter email company"
              showRequired={true}
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: '10px',
                  backgroundColor: 'rgba(255, 255, 255, 0.8)',
                }
              }}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
            <TextFieldCustom
              name="company.companyPhone"
              control={control}
              title="Phone Number"
              placeholder="Enter phone number company"
              showRequired={true}
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: '10px',
                  backgroundColor: 'rgba(255, 255, 255, 0.8)',
                }
              }}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
            <TextFieldCustom
              name="company.taxCode"
              control={control}
              title="Tax Code"
              placeholder="Enter tax code company"
              showRequired={true}
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: '10px',
                  backgroundColor: 'rgba(255, 255, 255, 0.8)',
                }
              }}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={4} lg={4} xl={4}>
            <DatePickerCustom
              name="company.since"
              control={control}
              title="Founded Date"
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: '10px',
                  backgroundColor: 'rgba(255, 255, 255, 0.8)',
                }
              }}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={8} lg={8} xl={8}>
            <TextFieldCustom
              name="company.fieldOperation"
              control={control}
              title="Business Sector"
              placeholder="Enter business sector of company"
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: '10px',
                  backgroundColor: 'rgba(255, 255, 255, 0.8)',
                }
              }}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={4} lg={4} xl={4}>
            <SingleSelectCustom
              options={allConfig?.employeeSizeOptions || []}
              name="company.employeeSize"
              control={control}
              title="Company Size"
              placeholder="Enter size company"
              showRequired={true}
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: '10px',
                  backgroundColor: 'rgba(255, 255, 255, 0.8)',
                }
              }}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={8} lg={8} xl={8}>
            <TextFieldCustom
              name="company.websiteUrl"
              control={control}
              title="Website"
              placeholder="Enter company website URL"
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: '10px',
                  backgroundColor: 'rgba(255, 255, 255, 0.8)',
                }
              }}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={8} lg={8} xl={8}>
            <SingleSelectCustom
              options={allConfig?.cityOptions || []}
              name="company.location.city"
              control={control}
              title="Province/City"
              placeholder="Select province/city"
              showRequired={true}
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: '10px',
                  backgroundColor: 'rgba(255, 255, 255, 0.8)',
                }
              }}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={4} lg={4} xl={4}>
            <SingleSelectCustom
              options={districtOptions}
              name="company.location.district"
              control={control}
              title="District"
              placeholder="Select District"
              showRequired={true}
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: '10px',
                  backgroundColor: 'rgba(255, 255, 255, 0.8)',
                }
              }}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
            <TextFieldAutoCompleteCustom
              name="company.location.address"
              title="Address"
              showRequired={true}
              placeholder="Enter address"
              control={control}
              options={locationOptions}
              loading={true}
              handleSelect={handleSelectLocation}
              handleInputChange={handleAddressInputChange}
              helperText="Search an address or click the map below. Latitude and longitude will fill automatically."
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: '10px',
                  backgroundColor: 'rgba(255, 255, 255, 0.8)',
                }
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <Map
              title="Company location"
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
              name="company.location.lat"
              control={control}
              title="Latitude"
              placeholder="Auto-filled from the map"
              helperText="Pick a point on the map or select a suggested address."
              showRequired={true}
              type="number"
              readOnly={true}
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: '10px',
                  backgroundColor: 'rgba(255, 255, 255, 0.8)',
                }
              }}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
            <TextFieldCustom
              name="company.location.lng"
              control={control}
              title="Longitude"
              placeholder="Auto-filled from the map"
              helperText="Pick a point on the map or select a suggested address."
              showRequired={true}
              type="number"
              readOnly={true}
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: '10px',
                  backgroundColor: 'rgba(255, 255, 255, 0.8)',
                }
              }}
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
      sx={{
        width: '100%',
        '& .MuiTextField-root': {
          borderRadius: '10px',
        },
      }}
    >
      <StyledStepper activeStep={activeStep} sx={{ pb: 4 }}>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </StyledStepper>
      <>
        {formContent(activeStep)}
        <Stack
          sx={{ mt: 4 }}
          spacing={2}
          direction={{ xs: 'column', sm: 'row' }}
          justifyContent="flex-end"
        >
          {activeStep !== 0 && (
            <StyledButton 
              variant="outlined" 
              onClick={handleBack}
              startIcon={<NavigateBeforeIcon />}
            >
              Back
            </StyledButton>
          )}
          {activeStep === steps.length - 1 ? (
            <StyledButton 
              variant="contained" 
              type="submit"
              startIcon={<HowToRegIcon />}
            >
              Register
            </StyledButton>
          ) : (
            <StyledButton 
              variant="contained" 
              type="submit"
              endIcon={<NavigateNextIcon />}
            >
              Continue
            </StyledButton>
          )}
        </Stack>
      </>
    </Box>
  );
};

export default EmployerSignUpForm;
