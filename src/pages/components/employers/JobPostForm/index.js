import React from 'react';
import { useSelector } from 'react-redux';
import { useForm, useWatch } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Alert, AlertTitle, Box, Button, Card, CardContent, Chip, Grid, LinearProgress, Link, Stack, TextField, Typography } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
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
import companyService from '../../../../services/companyService';
import RichTextEditorWithPreview from '../../../../components/controls/RichTextEditorWithPreview';
import TextFieldAutoCompleteCustom from '../../../../components/controls/TextFieldAutoCompleteCustom';
import Map from '../../../../components/Map';

import goongService from '../../../../services/goongService';

const JobPostForm = ({ handleAddOrUpdate, editData, serverErrors }) => {
  const { allConfig } = useSelector((state) => state.config);
  const [companyName, setCompanyName] = React.useState('');
  const [districtOptions, setDistrictOptions] = React.useState([]);
  const districtOptionsRef = React.useRef(districtOptions);
  districtOptionsRef.current = districtOptions;
  const [locationOptions, setLocationOptions] = React.useState([]);
  const [imageUrlInput, setImageUrlInput] = React.useState('');
  const [imagePreviewError, setImagePreviewError] = React.useState(false);
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
    websiteUrl: yup
      .string()
      .max(200, 'Organisation website exceeds the maximum length.')
      .test(
        'website-url',
        'Enter a valid website URL starting with http(s)://.',
        (value) => !value || !String(value).trim() || /^https?:\/\/.+\..+/.test(String(value).trim())
      ),
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

  const { control, reset, setValue, setError, handleSubmit, getValues } =
    useForm({
      resolver: yupResolver(schema),
    });

  // The "Contact Person Name" of a job post is the hiring company, so new
  // posts are pre-filled with the employer's own company name. The website
  // is typed manually next to it and saved back to the company profile on
  // submit (existing company endpoint — no job API change).
  const [companySnapshot, setCompanySnapshot] = React.useState(null);
  React.useEffect(() => {
    const loadCompanyName = async () => {
      try {
        const resData = await companyService.getCompany();
        setCompanyName(resData.data?.companyName || '');
        setCompanySnapshot(resData.data || null);
      } catch (error) {
        // Optional: the employer can still type the name manually.
      }
    };

    loadCompanyName();
  }, []);

  React.useEffect(() => {
    if (editData || !companyName) return;

    const currentValue = getValues('contactPersonName');
    if (!currentValue || !String(currentValue).trim()) {
      setValue('contactPersonName', companyName, { shouldDirty: false });
    }
  }, [companyName, editData, getValues, setValue]);

  // NOTE: website is always typed by the employer in the form below —
  // it is never pre-filled/taken from the company profile.

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

        if (districtOptionsRef.current.length > 0)
          setValue('location.district', '');
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
        setImageUrlInput(
          editData.imageUrl.startsWith('data:') ? '' : editData.imageUrl
        );
      }
    } else {
      reset();
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

  const handleSubmitData = (values) => {
    const finalImageUrl = imageUrlInput.trim();
    const imagePayload = finalImageUrl ? { imageUrl: finalImageUrl } : {};

    // The website belongs to the Job Post: it is typed in this form and sent
    // with the job payload. As a backup (older posts / API without the field)
    // it is also saved to the company profile, which the public job page
    // uses as fallback for its "Apply on company website" button.
    const trimmedWebsite = String(values?.websiteUrl || '').trim();
    const websitePayload = trimmedWebsite ? { websiteUrl: trimmedWebsite } : {};

    if (
      trimmedWebsite &&
      companySnapshot?.id &&
      trimmedWebsite !== String(companySnapshot?.websiteUrl || '').trim()
    ) {
      companyService
        .updateCompany(companySnapshot.id, {
          ...companySnapshot,
          websiteUrl: trimmedWebsite,
        })
        .catch(() => {
          // Never block the job submit: the employer can still update the
          // website from the company profile page.
        });
    }

    handleAddOrUpdate({
      ...values,
      ...websitePayload,
      ...imagePayload,
    });
  };

  // ---------- Pro readiness / Google Jobs checklist (visualize what's missing) ----------
  const watchedValues = useWatch({ control });
  const plainTextLength = (value) => {
    if (!value) return 0;
    if (typeof value === 'string') {
      return value.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim().length;
    }
    if (typeof value.getCurrentContent === 'function') {
      return value.getCurrentContent().getPlainText(' ').trim().length;
    }
    return 0;
  };
  const jobTitle = String(watchedValues?.jobName || '').trim();
  const salaryMinNum = Number(watchedValues?.salaryMin);
  const salaryMaxNum = Number(watchedValues?.salaryMax);
  const deadlineVal = watchedValues?.deadline ? new Date(watchedValues.deadline) : null;
  const daysToDeadline =
    deadlineVal && !Number.isNaN(deadlineVal.getTime())
      ? Math.ceil((deadlineVal.getTime() - Date.now()) / (1000 * 60 * 60 * 24))
      : null;
  const descLen = plainTextLength(watchedValues?.jobDescription);
  const reqLen = plainTextLength(watchedValues?.jobRequirement);
  const benLen = plainTextLength(watchedValues?.benefitsEnjoyed);
  const imgTrimmed = imageUrlInput.trim();
  const isImageUrlValid = /^https:\/\/.+/i.test(imgTrimmed);
  const isImageExtOk = /\.(jpg|jpeg|png|webp)(\?.*)?$/i.test(imgTrimmed);
  const watchPhone = String(watchedValues?.contactPersonPhone || '').trim();
  const watchEmail = String(watchedValues?.contactPersonEmail || '').trim();
  const watchWebsite = String(watchedValues?.websiteUrl || '').trim();
  const isWebsiteValid = !watchWebsite || /^https?:\/\/.+\..+/.test(watchWebsite);
  const latOk = watchedValues?.location?.lat !== '' && watchedValues?.location?.lat !== undefined && watchedValues?.location?.lat !== null;
  const lngOk = watchedValues?.location?.lng !== '' && watchedValues?.location?.lng !== undefined && watchedValues?.location?.lng !== null;

  const readinessChecks = [
    {
      key: 'title',
      label: `Job title clear (${jobTitle.length}/10+ chars, no ALL CAPS)`,
      done: jobTitle.length >= 10 && jobTitle !== jobTitle.toUpperCase(),
    },
    {
      key: 'basics',
      label: 'Career, position, experience, workplace & job type selected',
      done: Boolean(
        watchedValues?.career !== undefined &&
          watchedValues?.career !== '' &&
          watchedValues?.position !== undefined &&
          watchedValues?.position !== '' &&
          watchedValues?.experience !== undefined &&
          watchedValues?.experience !== '' &&
          watchedValues?.typeOfWorkplace !== undefined &&
          watchedValues?.typeOfWorkplace !== '' &&
          watchedValues?.jobType !== undefined &&
          watchedValues?.jobType !== ''
      ),
    },
    {
      key: 'salary',
      label: 'Salary range valid in RWF (min < max)',
      done:
        Number.isFinite(salaryMinNum) &&
        Number.isFinite(salaryMaxNum) &&
        salaryMinNum >= 0 &&
        salaryMaxNum > salaryMinNum,
    },
    {
      key: 'deadline',
      label: `Deadline in the future${daysToDeadline !== null ? ` (${daysToDeadline} days left)` : ''}`,
      done: daysToDeadline !== null && daysToDeadline > 0,
    },
    {
      key: 'desc',
      label: `Full description 200+ chars (now ${descLen}) — required by Google Jobs`,
      done: descLen >= 200,
    },
    {
      key: 'req',
      label: `Requirements 100+ chars (now ${reqLen})`,
      done: reqLen >= 100,
    },
    {
      key: 'ben',
      label: `Benefits 50+ chars (now ${benLen})`,
      done: benLen >= 50,
    },
    {
      key: 'image',
      label: 'Cover image URL pasted (https + .jpg/.png/.webp for rich Google preview)',
      done: isImageUrlValid && isImageExtOk,
    },
    {
      key: 'location',
      label: 'Map location pinned (address + latitude + longitude)',
      done: Boolean(String(watchedValues?.location?.address || '').trim()) && latOk && lngOk,
    },
    {
      key: 'contact',
      label: 'Contact name, payment phone & email filled',
      done: Boolean(
        String(watchedValues?.contactPersonName || '').trim() &&
          watchPhone &&
          /.+@.+\..+/.test(watchEmail)
      ),
    },
  ];
  const readinessDone = readinessChecks.filter((c) => c.done).length;
  const readinessPct = Math.round((readinessDone / readinessChecks.length) * 100);
  const formatRwf = (n) =>
    Number.isFinite(Number(n)) ? `${Number(n).toLocaleString('en-US')} RWF` : '—';

  // Google search-result preview: frontend-only, mirrors JobPosting schema fields.
  const findOptionLabel = (options, value) => {
    if (value === undefined || value === '' || value === null) return '';
    const found = (options || []).find((o) => String(o.value) === String(value));
    return found ? found.label : '';
  };
  const serpCity = findOptionLabel(allConfig?.cityOptions, watchedValues?.location?.city);
  const serpJobType = findOptionLabel(allConfig?.jobTypeOptions, watchedValues?.jobType);
  const serpWorkplace = findOptionLabel(allConfig?.typeOfWorkplaceOptions, watchedValues?.typeOfWorkplace);
  const plainTextOf = (value) => {
    if (!value) return '';
    if (typeof value === 'string') return value.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();
    if (typeof value.getCurrentContent === 'function') return value.getCurrentContent().getPlainText(' ').replace(/\s+/g, ' ').trim();
    return '';
  };
  const serpDesc = plainTextOf(watchedValues?.jobDescription).slice(0, 160);

  const SectionHeader = ({ step, title, subtitle, right }) => (
    <Stack direction="row" alignItems="flex-start" justifyContent="space-between" spacing={2} sx={{ mb: 2 }}>
      <Stack direction="row" spacing={1.5} alignItems="flex-start">
        <Box
          sx={{
            width: 28,
            height: 28,
            borderRadius: '50%',
            bgcolor: '#1a73e8',
            color: 'white',
            fontSize: 14,
            fontWeight: 700,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
            mt: 0.25,
          }}
        >
          {step}
        </Box>
        <Box>
          <Typography variant="subtitle1" fontWeight={700} sx={{ color: '#202124' }}>
            {title}
          </Typography>
          {subtitle && (
            <Typography variant="body2" color="text.secondary" sx={{ fontSize: 13 }}>
              {subtitle}
            </Typography>
          )}
        </Box>
      </Stack>
      {right}
    </Stack>
  );

  return (
    <form id="modal-form" onSubmit={handleSubmit(handleSubmitData)}>
      <Stack spacing={2}>
        {/* Readiness: visualize what's missing for a pro + Google Jobs post */}
        <Card sx={{ border: '1px solid #dadce0', borderRadius: 2, boxShadow: 'none' }}>
          <CardContent>
            <Stack direction="row" alignItems="center" justifyContent="space-between" spacing={2} sx={{ mb: 1 }}>
              <Typography variant="subtitle1" fontWeight={700} sx={{ color: '#202124' }}>
                Pro post readiness — {readinessPct}%
              </Typography>
              <Chip
                size="small"
                label={readinessPct === 100 ? 'Ready for Google Jobs' : `${readinessChecks.length - readinessDone} missing`}
                color={readinessPct === 100 ? 'success' : 'warning'}
              />
            </Stack>
            <LinearProgress
              variant="determinate"
              value={readinessPct}
              sx={{ height: 8, borderRadius: 4, mb: 1.5, bgcolor: '#e8eaed' }}
            />
            <Grid container spacing={1}>
              {readinessChecks.map((check) => (
                <Grid item xs={12} sm={6} key={check.key}>
                  <Stack direction="row" spacing={1} alignItems="flex-start">
                    {check.done ? (
                      <CheckCircleIcon fontSize="small" color="success" sx={{ mt: 0.2 }} />
                    ) : (
                      <RadioButtonUncheckedIcon fontSize="small" color="disabled" sx={{ mt: 0.2 }} />
                    )}
                    <Typography
                      variant="body2"
                      sx={{ fontSize: 13, color: check.done ? 'text.primary' : 'text.secondary' }}
                    >
                      {check.label}
                    </Typography>
                  </Stack>
                </Grid>
              ))}
            </Grid>
            {/* Live Google preview: what Google Jobs / search will show */}
            <Box sx={{ mt: 1.5, border: '1px solid #dadce0', borderRadius: 2, p: 1.5, bgcolor: '#f8f9fa' }}>
              <Typography variant="caption" sx={{ fontWeight: 700, color: '#202124', display: 'block', mb: 0.5 }}>
                Google preview — live
              </Typography>
              <Typography variant="body2" sx={{ color: '#1a0dab', fontSize: 16, lineHeight: 1.3 }}>
                {jobTitle || 'Your job title'} - Jobs in Rwanda | Imyanya
              </Typography>
              <Typography variant="caption" sx={{ color: '#006621', display: 'block' }}>
                https://imyanya.rw/viec-lam/…
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ fontSize: 13 }}>
                {(companyName || 'Your company')}
                {(serpCity || watchPhone || watchedValues?.location?.address) ? ` · ${[serpCity, String(watchedValues?.location?.address || '').trim()].filter(Boolean).join(' — ')}` : ' · Rwanda'}
                {(serpJobType || serpWorkplace) ? ` · ${[serpJobType, serpWorkplace].filter(Boolean).join(' · ')}` : ''}
                {Number.isFinite(salaryMinNum) && Number.isFinite(salaryMaxNum) && salaryMaxNum > salaryMinNum
                  ? ` · ${formatRwf(salaryMinNum)} – ${formatRwf(salaryMaxNum)}`
                  : ' · Salary in RWF'}
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ fontSize: 13, mt: 0.25 }}>
                {serpDesc || 'Your first 160 characters of Job Description appear here. Write 200+ characters of real role detail.'}
              </Typography>
            </Box>
            <Typography variant="caption" color="text.secondary" sx={{ display: 'flex', gap: 0.5, mt: 1.5, alignItems: 'flex-start' }}>
              <InfoOutlinedIcon sx={{ fontSize: 14, mt: 0.2 }} />
              Google Jobs requires a clear title, full description, salary in RWF, future deadline,
              company + precise location. Company logo comes from your company profile.
            </Typography>
          </CardContent>
        </Card>

        <Alert severity="warning" sx={{ borderRadius: 2 }}>
          <AlertTitle>Payment and review notice</AlertTitle>
          When you submit or update this job post, it will return to pending
          review. Please make the job post payment using the same number you
          enter in <strong>Phone Number contact person</strong>
          {watchPhone ? (
            <>
              {' '}(pay with: <strong>{watchPhone}</strong>)
            </>
          ) : null}
          . Admin uses that number to match the payment to this job and approve
          it faster. Steps: 1) Submit this form → 2) Pay with that phone number →
          3) Wait for approval. If payment is blocked or you need help,{' '}
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

        {/* Section 1: Basics */}
        <Card sx={{ border: '1px solid #dadce0', borderRadius: 2, boxShadow: 'none' }}>
          <CardContent>
            <SectionHeader
              step="1"
              title="Job basics"
              subtitle="Clear titles get 2x more applies. Use role + level, e.g. Senior Accountant. Avoid ALL CAPS and company name in the title."
              right={
                <Chip
                  size="small"
                  label={`${jobTitle.length} chars`}
                  color={jobTitle.length >= 10 ? 'success' : 'default'}
                  variant={jobTitle.length >= 10 ? 'filled' : 'outlined'}
                />
              }
            />
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextFieldCustom
                  name="jobName"
                  title="Job Title"
                  showRequired={true}
                  placeholder="Enter job title"
                  control={control}
                  helperText={
                    jobTitle && jobTitle === jobTitle.toUpperCase()
                      ? 'Avoid ALL CAPS — Google Jobs may reject it. Use Title Case.'
                      : 'Example: Primary School Teacher, Registered Nurse, Frontend Developer.'
                  }
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
                  helperText="Google shows this as number of positions."
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
            </Grid>
          </CardContent>
        </Card>

        {/* Section 2: Compensation & schedule */}
        <Card sx={{ border: '1px solid #dadce0', borderRadius: 2, boxShadow: 'none' }}>
          <CardContent>
            <SectionHeader
              step="2"
              title="Pay & schedule"
              subtitle="Salaries are shown in RWF per month on Google Jobs. Posts with salary get far more qualified applies."
              right={
                <Chip
                  size="small"
                  label={
                    Number.isFinite(salaryMinNum) && Number.isFinite(salaryMaxNum)
                      ? `${formatRwf(salaryMinNum)} – ${formatRwf(salaryMaxNum)}`
                      : 'RWF / month'
                  }
                  color={
                    Number.isFinite(salaryMinNum) &&
                    Number.isFinite(salaryMaxNum) &&
                    salaryMinNum < salaryMaxNum
                      ? 'success'
                      : 'default'
                  }
                />
              }
            />
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <TextFieldCustom
                  name="salaryMin"
                  title="Minimum Salary"
                  showRequired={true}
                  placeholder="Enter minimum salary"
                  control={control}
                  type="number"
                  helperText="Gross monthly salary in RWF, e.g. 150000."
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
                  helperText="Must be greater than minimum salary."
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
                <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mt: 0.5 }}>
                  {daysToDeadline !== null
                    ? daysToDeadline > 0
                      ? `Closes in ${daysToDeadline} days — Google removes expired posts automatically.`
                      : 'Deadline has passed — pick a future date.'
                    : 'Format DD-MM-YYYY. Must be later than today.'}
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <CheckboxCustom name="isUrgent" control={control} title="Urgent Hiring" />
                <Typography variant="caption" color="text.secondary">
                  Adds an “Urgently hiring” badge on your post.
                </Typography>
              </Grid>
            </Grid>
          </CardContent>
        </Card>

        {/* Section 3: Content */}
        <Card sx={{ border: '1px solid #dadce0', borderRadius: 2, boxShadow: 'none' }}>
          <CardContent>
            <SectionHeader
              step="3"
              title="Description, requirements & benefits"
              subtitle="Google rejects thin posts. Write 200+ characters for the role, list must-have skills, then salary extras and perks."
            />
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <RichTextEditorWithPreview
                  name="jobDescription"
                  control={control}
                  title="Job Description"
                  showRequired={true}
                  withLinks
                  withImages
                />
                <Typography variant="caption" color={descLen >= 200 ? 'success.main' : 'text.secondary'}>
                  {descLen}/200+ characters — describe day-to-day work, team and hiring area.
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <RichTextEditorWithPreview
                  name="jobRequirement"
                  control={control}
                  title="Job Requirements"
                  showRequired={true}
                  withLinks
                  withImages
                />
                <Typography variant="caption" color={reqLen >= 100 ? 'success.main' : 'text.secondary'}>
                  {reqLen}/100+ characters — education, years, tools, languages.
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <RichTextEditorWithPreview
                  name="benefitsEnjoyed"
                  control={control}
                  title="Benefits"
                  showRequired={true}
                  withLinks
                  withImages
                />
                <Typography variant="caption" color={benLen >= 50 ? 'success.main' : 'text.secondary'}>
                  {benLen}/50+ characters — health insurance, transport, meals, leave, bonus.
                </Typography>
              </Grid>
            </Grid>
          </CardContent>
        </Card>

        {/* Section 4: Media */}
        <Card sx={{ border: '1px solid #dadce0', borderRadius: 2, boxShadow: 'none' }}>
          <CardContent>
            <SectionHeader
              step="4"
              title="Cover image"
              subtitle="1200×630 JPG/PNG/WEBP under 1MB works best for rich Google Jobs preview and sharing."
              right={
                imgTrimmed ? (
                  <Chip
                    size="small"
                    label={isImageUrlValid && isImageExtOk ? 'Valid image link' : 'Check link'}
                    color={isImageUrlValid && isImageExtOk ? 'success' : 'warning'}
                  />
                ) : null
              }
            />
            <Typography variant="subtitle2" gutterBottom>
              Job Post Preview Image
            </Typography>
            {imgTrimmed && !imagePreviewError ? (
              <Box sx={{ mb: 1.5, display: 'flex', gap: 2, alignItems: 'flex-start', flexWrap: 'wrap' }}>
                <img
                  src={imgTrimmed}
                  alt="Job post preview"
                  onError={() => setImagePreviewError(true)}
                  style={{ maxWidth: 320, maxHeight: 180, objectFit: 'cover', borderRadius: 8, border: '1px solid #dadce0' }}
                />
                {/* Mini Google-style preview */}
                <Box sx={{ border: '1px solid #dadce0', borderRadius: 2, p: 1.5, maxWidth: 280, bgcolor: '#f8f9fa' }}>
                  <Typography variant="caption" sx={{ fontWeight: 700, color: '#202124', display: 'block' }}>
                    {jobTitle || 'Your job title'}
                  </Typography>
                  <Typography variant="caption" color="text.secondary" sx={{ display: 'block' }}>
                    {companyName || 'Your company'} · Kigali
                  </Typography>
                  <Typography variant="caption" sx={{ color: '#1a73e8', fontWeight: 600 }}>
                    How it looks on Google Jobs
                  </Typography>
                </Box>
              </Box>
            ) : imgTrimmed && imagePreviewError ? (
              <Alert severity="error" sx={{ mb: 1.5 }}>
                This link does not load as an image. Use a direct link ending in .jpg, .png or .webp
                (right-click the uploaded image → “Copy image address”).
              </Alert>
            ) : null}
            {imageUrlInput && (
              <Button
                size="small"
                variant="outlined"
                color="error"
                sx={{ mb: 1.5 }}
                onClick={() => { setImageUrlInput(''); setImagePreviewError(false); }}
              >
                Remove
              </Button>
            )}
            <TextField
              fullWidth
              size="small"
              label="Paste an image URL"
              placeholder="https://i.postimg.cc/..."
              value={imageUrlInput}
              onChange={(e) => { setImageUrlInput(e.target.value); setImagePreviewError(false); }}
              helperText="Upload your image to a free host like postimages.org and paste the direct link here so it displays on your job post."
              error={Boolean(imgTrimmed) && (!isImageUrlValid || !isImageExtOk)}
              sx={{ mb: 1 }}
            />
            <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mt: 1 }}>
              Add a cover image to make your job post stand out and get a rich
              preview on Google Jobs.
            </Typography>
          </CardContent>
        </Card>

        {/* Section 5: Location */}
        <Card sx={{ border: '1px solid #dadce0', borderRadius: 2, boxShadow: 'none' }}>
          <CardContent>
            <SectionHeader
              step="5"
              title="Workplace address"
              subtitle="Precise pins rank higher on Google Jobs and Maps. Search, then click the map to fine-tune."
              right={
                <Chip
                  size="small"
                  label={latOk && lngOk ? 'Pinned on map' : 'Not pinned yet'}
                  color={latOk && lngOk ? 'success' : 'warning'}
                />
              }
            />
            <Grid container spacing={2}>
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
            </Grid>
          </CardContent>
        </Card>

        {/* Section 6: Contact & payment */}
        <Card sx={{ border: '1px solid #eab308', borderRadius: 2, boxShadow: 'none', bgcolor: '#fffbeb' }}>
          <CardContent>
            <SectionHeader
              step="6"
              title="Contact & payment matching"
              subtitle="Admin matches your MoMo payment to this post ONLY by the phone number below. Double-check it."
            />
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextFieldCustom
                  name="contactPersonName"
                  title="Contact Person Name"
                  showRequired={true}
                  placeholder={companyName ? companyName : 'Enter contact person name'}
                  control={control}
                  helperText="Shown to candidates. Use the hiring company or HR contact."
                />
              </Grid>
              <Grid item xs={12}>
                <TextFieldCustom
                  name="websiteUrl"
                  title="Organisation website"
                  placeholder="https://www.example.com"
                  helperText="Optional. Type the organisation website here — it will be saved to your company profile and used for the “Apply on company website” button on this job post."
                  control={control}
                />
                {watchWebsite && isWebsiteValid && (
                  <Alert severity="success" sx={{ mt: 1 }}>
                    Candidates will apply via Imyanya and via{' '}
                    <Link href={watchWebsite} target="_blank" rel="noopener noreferrer" underline="hover" sx={{ fontWeight: 700 }}>
                      {watchWebsite.replace(/^https?:\/\//i, '')}
                    </Link>
                    .
                  </Alert>
                )}
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
                {watchPhone && (
                  <Alert severity="info" sx={{ mt: 1 }}>
                    You will pay with <strong>{watchPhone}</strong>. If you pay with a
                    different number, approval will be delayed.
                  </Alert>
                )}
              </Grid>
              <Grid item xs={12}>
                <TextFieldCustom
                  name="contactPersonEmail"
                  title="Email contact person"
                  showRequired={true}
                  placeholder="Enter email contact person"
                  control={control}
                  helperText="Application alerts and approval status go here."
                />
              </Grid>
            </Grid>
          </CardContent>
        </Card>

        <Alert severity="info" sx={{ borderRadius: 2 }}>
          Submitting sends this post to <strong>pending review</strong>. Fix every red
          item above ({readinessChecks.length - readinessDone} left), pay with{' '}
          <strong>{watchPhone || 'the contact phone number'}</strong>, then ask in{' '}
          <Link href={supportWhatsAppUrl} target="_blank" rel="noopener noreferrer" underline="hover" sx={{ fontWeight: 700 }}>
            our WhatsApp group
          </Link>{' '}
          if approval takes long.
        </Alert>
      </Stack>
    </form>
  );
};

export default JobPostForm;
