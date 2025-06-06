import React from 'react';
import { useSelector } from 'react-redux';
import { useForm, useWatch } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import {
  Box,
  Button,
  Divider,
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

import commonService from '../../../../services/commonService';
import goongService from '../../../../services/goongService';

const steps = ['Login Information', 'Company Information'];

const StyledButton = styled(Button)(({ theme }) => ({
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

const StyledSocialButton = styled(Button)(({ theme }) => ({
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

const StyledDivider = styled(Divider)({
  height: '2px',
  background: 'linear-gradient(to right, #1976d2, #9c27b0)',
  border: 'none',
});

const EmployerSignUpForm = ({ onSignUp, serverErrors = {}, checkCreds }) => {
  const [activeStep, setActiveStep] = React.useState(0);
  const { allConfig } = useSelector((state) => state.config);
  const [districtOptions, setDistrictOptions] = React.useState([]);
  const [locationOptions, setLocationOptions] = React.useState([]);

  // schema
  const schema = yup.object().shape({
    fullName: yup
      .string()
      .required('Full name is required!')
      .max(100, 'Full name exceeds maximum length.'),
    email: yup
      .string()
      .required('Email is required!')
      .email('Invalid email format')
      .max(100, 'Email exceeds maximum length.'),
    password: yup
      .string()
      .required('Password is required!')
      .min(8, 'Password must be at least 8 characters.')
      .max(128, 'Password exceeds maximum length.')
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
        'Must contain uppercase, lowercase, number and special character'
      ),
    confirmPassword: yup
      .string()
      .required('Confirm password is required.')
      .oneOf([yup.ref('password')], 'Passwords do not match.'),
    company: yup.object().shape({
      companyName: yup
        .string()
        .required('Company name is required!')
        .max(255, 'Company name exceeds maximum length.'),
      companyEmail: yup
        .string()
        .required('Company email is required')
        .email('Invalid company email format')
        .max(100, 'Company email exceeds maximum length.'),
      companyPhone: yup
        .string()
        .required('Company phone number is required')
        .matches(REGEX_VATIDATE.phoneRegExp, 'Invalid phone number.')
        .max(15, 'Company phone number exceeds maximum length.'),
      taxCode: yup
        .string()
        .required('Company tax code is required')
        .max(30, 'Company tax code exceeds maximum length.'),
      since: yup.date().nullable().typeError(),
      fieldOperation: yup
        .string()
        .max(255, 'Company field of operation exceeds maximum length.'),
      employeeSize: yup
        .number()
        .required('Number of employees is required.')
        .typeError('Number of employees is required.'),
      websiteUrl: yup
        .string()
        .max(300, 'Company website URL exceeds maximum length.'),
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
          .required('Company address is required!')
          .max(255, 'Company address exceeds maximum length.'),
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
        spacing={2.5}
        sx={{ mb: 2, display: actStep === 0 ? 'block' : 'none' }}
      >
        <TextFieldCustom
          name="fullName"
          control={control}
          title="Họ và tên"
          placeholder="Nhập họ và tên"
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
          placeholder="Nhập email"
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
          title="Mật khẩu"
          placeholder="Nhập mật khẩu"
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
          title="Mật khẩu xác nhận"
          placeholder="Nhập mật khẩu xác nhận"
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
              title="Tên công ty"
              placeholder="Nhập tên công ty"
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
              title="Email công ty"
              placeholder="Nhập email công ty"
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
              title="Số điện thoại"
              placeholder="Nhập số điện thoại công ty"
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
              title="Mã số thuế"
              placeholder="Nhập mã số thuế công ty"
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
              title="Ngày thành lập"
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
              title="Lĩnh vực hoạt động"
              placeholder="Nhập lĩnh vực hoạt động của công ty"
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
              title="Quy mô công ty"
              placeholder="Nhập quy mô công ty"
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
              placeholder="Nhập địa chỉ website công ty"
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
              title="Tỉnh/Thành phố"
              placeholder="Chọn tỉnh thành phố"
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
              title="Quận/Huyện"
              placeholder="Chọn Quận/Huyện"
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
              title="Địa chỉ"
              showRequired={true}
              placeholder="Nhập địa chỉ"
              control={control}
              options={locationOptions}
              loading={true}
              handleSelect={handleSelectLocation}
              helperText="Chọn địa chỉ chúng tôi gợi ý để giúp chúng tôi xác định chính xác vị trí công ty của bạn"
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
              Quay lại
            </StyledButton>
          )}
          {activeStep === steps.length - 1 ? (
            <StyledButton 
              variant="contained" 
              type="submit"
              startIcon={<HowToRegIcon />}
            >
              Đăng ký
            </StyledButton>
          ) : (
            <StyledButton 
              variant="contained" 
              type="submit"
              endIcon={<NavigateNextIcon />}
            >
              Tiếp tục
            </StyledButton>
          )}
        </Stack>
      </>
    </Box>
  );
};

export default EmployerSignUpForm;
