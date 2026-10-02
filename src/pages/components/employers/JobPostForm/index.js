import React from 'react';
import { useSelector } from 'react-redux';
import { useForm, useWatch } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Alert, AlertTitle, Box, Button, Grid, Link, TextField, Typography } from '@mui/material';
import { Upload } from 'antd';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';

import {
  DATE_OPTIONS,
  REGEX_VATIDATE,
  getWhatsAppContactUrl,
} from '../../../../configs/constants';
import useDebounce from '../../../../hooks/useDebounce';
import errorHandling from '../../../../utils/errorHandling';
import TextFieldCustom from '../../../../components/controls/TextFieldCustom';
import SingleSelectCustom from '../../../../components/controls/SingleSelectCustom';
import DatePickerCustom from '../../../../components/controls/DatePickerCustom';
import CheckboxCustom from '../../../../components/controls/CheckboxCustom';
import commonService from '../../../../services/commonService';
import RichTextEditorCustom from '../../../../components/controls/RichTextEditorCustom';
import TextFieldAutoCompleteCustom from '../../../../components/controls/TextFieldAutoCompleteCustom';
import Map from '../../../../components/Map';

import goongService from '../../../../services/goongService';

const JobPostForm = ({ handleAddOrUpdate, editData, serverErrors }) => {
  const { allConfig } = useSelector((state) => state.config);
  const [districtOptions, setDistrictOptions] = React.useState([]);
  const [locationOptions, setLocationOptions] = React.useState([]);
  const [coverImage, setCoverImage] = React.useState(null);
  const [imageUrlInput, setImageUrlInput] = React.useState('');
  const supportWhatsAppUrl = getWhatsAppContactUrl();

  const editorHasContent = (value) => {
    if (value && typeof value.getCurrentContent === 'function') {
      return value.getCurrentContent().hasText();
    }

    if (typeof value === 'string') {
      return value.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim().length > 0;
    }

    return false;
  };

  const normalizeLocation = (location = {}) => ({
    city: '',
    district: '',
    address: '',
    lat: '',
    lng: '',
    ...(location || {}),
  });

  const schema = yup.object().shape({
    jobName: yup
      .string()
      .required('Job Title is required.')
      .max(200, 'Job Title exceeds the maximum length.'),
    career: yup
      .number()
      .required('Industry/occupation is required.')
      .typeError('Industry/occupation is required.'),
    position: yup
      .number()
      .required('Position job is required.')
      .typeError('Position job is required.'),
    experience: yup
      .number()
      .required('Work Experience is required.')
      .typeError('Work Experience is required.'),
    typeOfWorkplace: yup
      .number()
      .required('Work location is required.')
      .typeError('Work location is required.'),
    jobType: yup
      .number()
      .required('Job Type is required.')
      .typeError('Job Type is required.'),
    quantity: yup
      .number()
      .required('Vacancies is required.')
      .typeError('Vacancies is invalid.')
      .min(1, 'Vacancies must be at least one.'),
    genderRequired: yup
      .string()
      .required('Gender Requirement is required.')
      .typeError('Gender Requirement is required.'),
    salaryMin: yup
      .number()
      .required('Minimum salary is required.')
      .typeError('Invalid minimum salary.')
      .min(0, 'Invalid minimum salary.')
      .test(
        'minimum-wage-comparison',
        'Minimum salary must be less than maximum salary.',
        function (value) {
          return !(value >= this.parent.salaryMax);
        }
      ),
    salaryMax: yup
      .number()
      .required('Maximum salary is required.')
      .typeError('Invalid maximum salary.')
      .min(0, 'Invalid maximum salary.')
      .test(
        'maximum-wage-comparison',
        'Maximum salary must be greater than minimum salary.',
        function (value) {
          return !(value <= this.parent.salaryMin);
        }
      ),
    academicLevel: yup
      .number()
      .required('Degree is required.')
      .typeError('Degree is required.'),
    deadline: yup
      .date()
      .required('Application Deadline is required.')
      .typeError('Application Deadline is invalid.')
      .min(
        DATE_OPTIONS.tomorrow,
        'Application deadline must be later than today.'
      ),
    jobDescription: yup
      .mixed()
      .test('editorContent', 'Job Description is required.', editorHasContent),
    jobRequirement: yup
      .mixed()
      .test('editorContent', 'Job Requirements is required.', editorHasContent),
    benefitsEnjoyed: yup
      .mixed()
      .test('editorContent', 'Benefits is required.', editorHasContent),
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
        .required('Map latitude is required.')
        .typeError('Map latitude is invalid.'),
      lng: yup
        .number()
        .required('Map longitude is required.')
        .typeError('Map longitude is invalid.'),
    }),
    contactPersonName: yup
      .string()
      .required('Contact Person Name is required.')
      .max(100, 'Contact Person Name exceeds the maximum length.'),
    contactPersonPhone: yup
      .string()
      .required('Phone Number contact person is required.')
      .matches(REGEX_VATIDATE.phoneRegExp, 'Invalid phone number.')
      .max(15, 'Phone Number contact person exceeds the maximum length.'),
    contactPersonEmail: yup
      .string()
      .required('Email contact person is required.')
      .email('Invalid email address.')
      .max(100, 'Email contact person exceeds the maximum length.'),
    isUrgent: yup.boolean().default(false),
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
    if (editData) {
      reset((formValues) => ({
        ...formValues,
        ...editData,
        location: {
          ...(formValues?.location || {}),
          ...normalizeLocation(editData?.location),
        },
      }));
      if (editData?.imageUrl) {
        setCoverImage({ url: editData.imageUrl });
        setImageUrlInput(
          editData.imageUrl.startsWith('data:') ? '' : editData.imageUrl
        );
      }
    } else {
      reset();
      setCoverImage(null);
      setImageUrlInput('');
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

  const readFileAsDataUrl = (file) =>
    new Promise((resolve) => {
      const reader = new FileReader();

      reader.onload = (e) => resolve(e.target.result);
      reader.readAsDataURL(file);
    });

  const handleCoverImageBeforeUpload = async (file) => {
    const url = await readFileAsDataUrl(file);

    setCoverImage({ file, url });
    return false;
  };

  const handleSubmitData = (values) => {
    const finalImageUrl = imageUrlInput.trim() || coverImage?.url || '';
    const imagePayload = finalImageUrl ? { imageUrl: finalImageUrl } : {};

    handleAddOrUpdate({
      ...values,
      ...imagePayload,
    });
  };

  return (
    <form id="modal-form" onSubmit={handleSubmit(handleSubmitData)}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Alert severity="warning">
            <AlertTitle>Payment and review notice</AlertTitle>
            When you submit or update this job post, it will return to pending
            review. Please make the job post payment using the same number you
            enter in <strong>Phone Number contact person</strong>. Admin uses
            that number to match the payment to this job and approve it faster.
            If payment is blocked or you need help,{' '}
            <Link
              href={supportWhatsAppUrl}
              target="_blank"
              rel="noopener noreferrer"
              underline="hover"
              sx={{ fontWeight: 700 }}
            >
              join our WhatsApp group
            </Link>{' '}
            to ask how to post a job or how to view images in a job post.
          </Alert>
        </Grid>

        <Grid item xs={12}>
          <TextFieldCustom
            name="jobName"
            title="Job Title"
            showRequired={true}
            placeholder="Enter job title"
            control={control}
          />
        </Grid>
        <Grid item xs={12}>
          <SingleSelectCustom
            name="career"
            control={control}
            options={allConfig?.careerOptions || []}
            title="Career"
            showRequired={true}
            placeholder="Select industry"
          />
        </Grid>
        <Grid item xs={6}>
          <SingleSelectCustom
            name="position"
            control={control}
            options={allConfig?.positionOptions || []}
            title="Position/Title"
            showRequired={true}
            placeholder="Select position/title"
          />
        </Grid>
        <Grid item xs={6}>
          <SingleSelectCustom
            name="experience"
            control={control}
            options={allConfig?.experienceOptions || []}
            title="Experience"
            showRequired={true}
            placeholder="Select required experience"
          />
        </Grid>
        <Grid item xs={6}>
          <SingleSelectCustom
            name="typeOfWorkplace"
            control={control}
            options={allConfig?.typeOfWorkplaceOptions || []}
            title="Work Location"
            showRequired={true}
            placeholder="Select workplace type"
          />
        </Grid>
        <Grid item xs={6}>
          <SingleSelectCustom
            name="jobType"
            control={control}
            options={allConfig?.jobTypeOptions || []}
            title="Job Type"
            showRequired={true}
            placeholder="Select job type"
          />
        </Grid>
        <Grid item xs={6}>
          <TextFieldCustom
            name="quantity"
            title="Vacancies"
            showRequired={true}
            placeholder="Enter number of hires needed"
            control={control}
            type="number"
          />
        </Grid>
        <Grid item xs={6}>
          <SingleSelectCustom
            name="genderRequired"
            control={control}
            options={allConfig?.genderOptions || []}
            title="Gender Requirement"
            showRequired={true}
            placeholder="Select gender requirement"
          />
        </Grid>
        <Grid item xs={6}>
          <TextFieldCustom
            name="salaryMin"
            title="Minimum Salary"
            showRequired={true}
            placeholder="Enter minimum salary"
            control={control}
            type="number"
          />
        </Grid>
        <Grid item xs={6}>
          <TextFieldCustom
            name="salaryMax"
            title="Maximum Salary"
            showRequired={true}
            placeholder="Enter maximum salary"
            control={control}
            type="number"
          />
        </Grid>
        <Grid item xs={6}>
          <SingleSelectCustom
            name="academicLevel"
            control={control}
            options={allConfig?.academicLevelOptions || []}
            title="Degree"
            showRequired={true}
            placeholder="Select degree"
          />
        </Grid>
        <Grid item xs={6}>
          <DatePickerCustom
            name="deadline"
            control={control}
            showRequired={true}
            title="Application Deadline"
            minDate={DATE_OPTIONS.tomorrow}
          />
        </Grid>
        <Grid item xs={12}>
          <RichTextEditorCustom
            name="jobDescription"
            control={control}
            title="Job Description"
            showRequired={true}
            withLinks
            withImages
          />
        </Grid>
        <Grid item xs={12}>
          <RichTextEditorCustom
            name="jobRequirement"
            control={control}
            title="Job Requirements"
            showRequired={true}
            withLinks
            withImages
          />
        </Grid>
        <Grid item xs={12}>
          <RichTextEditorCustom
            name="benefitsEnjoyed"
            control={control}
            title="Benefits"
            showRequired={true}
            withLinks
            withImages
          />
        </Grid>
        <Grid item xs={12}>
          <Typography variant="subtitle2" gutterBottom>
            Job Post Preview Image
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2, mb: 1.5 }}>
            <Upload
              listType="picture-card"
              maxCount={1}
              accept="image/*"
              showUploadList={false}
              beforeUpload={handleCoverImageBeforeUpload}
            >
              {imageUrlInput.trim() || coverImage?.url ? (
                <img
                  src={imageUrlInput.trim() || coverImage.url}
                  alt="Job post preview"
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                  }}
                />
              ) : (
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 0.5 }}>
                  <AddPhotoAlternateIcon color="primary" />
                  <Typography variant="caption" color="text.secondary">
                    Upload
                  </Typography>
                </Box>
              )}
            </Upload>
            {(coverImage?.url || imageUrlInput) && (
              <Button
                size="small"
                variant="outlined"
                color="error"
                onClick={() => {
                  setCoverImage(null);
                  setImageUrlInput('');
                }}
              >
                Remove
              </Button>
            )}
          </Box>
          <TextField
            fullWidth
            size="small"
            label="Or paste an image URL"
            placeholder="https://i.postimg.cc/..."
            value={imageUrlInput}
            onChange={(e) => setImageUrlInput(e.target.value)}
            helperText="Upload your image to a free host like postimages.org and paste the direct link here so it displays on your job post."
            sx={{ mb: 1 }}
          />
          <Typography
            variant="caption"
            color="text.secondary"
            sx={{ display: 'block', mt: 1 }}
          >
            Add a cover image to make your job post stand out and get a rich
            preview on Google Jobs.
          </Typography>
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
            name="location.district"
            control={control}
            options={districtOptions}
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
            loading={true}
            handleSelect={handleSelectLocation}
            handleInputChange={handleAddressInputChange}
            helperText="Search an address or click the map below. Latitude and longitude will fill automatically."
          />
        </Grid>
        <Grid item xs={12}>
          <Map
            title="Job post location"
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
          <TextFieldCustom
            name="contactPersonName"
            title="Contact Person Name"
            showRequired={true}
            placeholder="Enter contact person name"
            control={control}
          />
        </Grid>
        <Grid item xs={12}>
          <TextFieldCustom
            name="contactPersonPhone"
            title="Phone Number contact person"
            showRequired={true}
            placeholder="Enter phone number contact person"
            helperText="Use this same phone number when paying for this job post so admin can match your payment and approve faster."
            control={control}
          />
        </Grid>
        <Grid item xs={12}>
          <TextFieldCustom
            name="contactPersonEmail"
            title="Email contact person"
            showRequired={true}
            placeholder="Enter email contact person"
            control={control}
          />
        </Grid>
        <Grid item xs={12}>
          <CheckboxCustom name="isUrgent" control={control} title="Urgent Hiring" />
        </Grid>
      </Grid>
    </form>
  );
};

export default JobPostForm;
