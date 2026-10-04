import React from 'react';
import { useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import {
  Button,
  Card,
  CircularProgress,
  FormControlLabel,
  Grid,
  Link,
  Radio,
  RadioGroup,
  Stack,
  Typography,
} from '@mui/material';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import EmailIcon from '@mui/icons-material/Email';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faFile, faFilePdf } from '@fortawesome/free-regular-svg-icons';
import errorHandling from '../../utils/errorHandling';
import { CV_TYPES, REGEX_VATIDATE, ROUTES } from '../../configs/constants';

import TextFieldCustom from '../controls/TextFieldCustom';
import jobSeekerProfileService from '../../services/jobSeekerProfileService';
import { formatRoute } from '../../utils/funcUtils';

const ApplyForm = ({
  handleApplyJob,
  onWhatsAppApply,
  onEmailApply,
  showWhatsApp = false,
  showEmail = false,
}) => {
  const { currentUser } = useSelector((state) => state.user);
  const [isLoadingResumes, setIsLoadingResumes] = React.useState(false);

  const [resumes, setResumes] = React.useState([]);

  const schema = yup.object().shape({
    fullName: yup
      .string()
      .required('Full Name is required.')
      .max(100, 'Full Name exceeds the maximum length.'),
    email: yup
      .string()
      .required('Email is required.')
      .email('Invalid email address.')
      .max(100, 'Email exceeds the maximum length.'),
    phone: yup
      .string()
      .required('Phone Number is required.')
      .matches(REGEX_VATIDATE.phoneRegExp, 'Invalid phone number.')
      .max(15, 'Phone Number exceeds the maximum length.'),
  });

  const { control, setValue, handleSubmit } = useForm({
    defaultValues: {
      fullName: currentUser.fullName,
      email: currentUser.email,
      phone: currentUser?.jobSeekerProfile?.phone || '',
      resume: '',
    },
    resolver: yupResolver(schema),
  });

  const submitVia = (handler) =>
    handleSubmit((data) => {
      if (typeof handler !== 'function') return;

      const resume = resumes.find(
        (value) => String(value.id) === String(data.resume)
      );

      handler(data, resume);
    });

  React.useEffect(() => {
    const getOnlineProfile = async (jobSeekerProfileId, params) => {
      setIsLoadingResumes(true);
     try {
        const resData = await jobSeekerProfileService.getResumes(
          jobSeekerProfileId,
          params
        );

        setResumes(resData.data);
      } catch (error) {
        errorHandling(error);
      } finally {
        setIsLoadingResumes(false);
      }
    };

    getOnlineProfile(currentUser?.jobSeekerProfileId);
  }, [currentUser]);

  return (
    <>
      <form id="modal-form" onSubmit={handleSubmit(handleApplyJob)}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Stack spacing={1} justifyContent="center">
              {isLoadingResumes ? (
                <CircularProgress color="secondary" sx={{ margin: '0 auto' }} />
              ) : (
                <RadioGroup
                  aria-labelledby="resume"
                  defaultValue={() => {
                    let defaultResumes = resumes.filter(
                      (value) => value.type === CV_TYPES.cvWebsite
                    );
                    if (defaultResumes.length > 0) {
                      setValue('resume', `${defaultResumes[0].id}`)
                      return defaultResumes[0].id;
                    } else if (resumes.length > 0) {
                      setValue('resume', `${resumes[0].id}`)
                      return resumes[0].id;
                    }
                  }}
                  name="resume"
                  onChange={(event) => setValue('resume', event.target.value)}
                >
                  <Stack spacing={1}>
                    {resumes.map((value) => (
                      <Card sx={{ p: 2 }} variant="outlined" key={value.id}>
                        <Stack direction="row" sx={{ width: '100%' }}>
                          <Stack>
                            <FormControlLabel
                              value={value.id}
                              control={<Radio />}
                              sx={{ mr: 1 }}
                            />
                          </Stack>
                          <Stack flex={1}>
                            <Typography variant="h6" sx={{ fontSize: 17 }}>
                              {value?.title}
                            </Typography>
                            <Typography
                              variant="body2"
                              sx={{ fontStyle: 'italic' }}
                            >
                              {value.type === CV_TYPES.cvWebsite ? (
                                <>
                                  <FontAwesomeIcon
                                    icon={faFile}
                                    style={{ marginRight: 1 }}
                                    color="#441da0"
                                  />{' '}
                                  Online Profile
                                </>
                              ) : value.type === CV_TYPES.cvUpload ? (
                                <>
                                  <FontAwesomeIcon
                                    icon={faFilePdf}
                                    style={{ marginRight: 1 }}
                                    color="red"
                                  />{' '}
                                  Attached Profile
                                </>
                              ) : (
                                ''
                              )}
                            </Typography>
                          </Stack>
                          <Stack justifyContent="center">
                            <Link
                              target="_blank"
                              href={
                                value.type === CV_TYPES.cvWebsite
                                  ? `/${ROUTES.JOB_SEEKER.DASHBOARD}/${formatRoute(ROUTES.JOB_SEEKER.STEP_PROFILE, value.slug)}`
                                  : `/${ROUTES.JOB_SEEKER.DASHBOARD}/${formatRoute(ROUTES.JOB_SEEKER.ATTACHED_PROFILE, value.slug)}`
                              }
                              style={{
                                textDecoration: 'none',
                              }}
                            >
                              <Typography
                                sx={{ fontWeight: 'bold', cursor: 'pointer' }}
                                color="#441da0"
                              >
                                <FontAwesomeIcon icon={faEye} /> View Resume
                              </Typography>
                            </Link>
                          </Stack>
                        </Stack>
                      </Card>
                    ))}
                  </Stack>
                </RadioGroup>
              )}
            </Stack>
          </Grid>
          <Grid item xs={12}>
            <TextFieldCustom
              name="fullName"
              title="Full Name"
              showRequired={true}
              placeholder="Enter full name"
              control={control}
            />
          </Grid>
          <Grid item xs={12}>
            <TextFieldCustom
              name="email"
              title="Email"
              showRequired={true}
              placeholder="Enter email"
              control={control}
            />
          </Grid>
          <Grid item xs={12}>
            <TextFieldCustom
              name="phone"
              title="Phone Number"
              showRequired={true}
              placeholder="Enter phone number"
              control={control}
            />
          </Grid>
          <Grid item xs={12}>
            <Typography color="GrayText" variant="caption">
              Note: Full name, email, and phone number must be accurate so employers can contact you.</Typography>
          </Grid>
          {(showWhatsApp || showEmail) && (
            <Grid item xs={12}>
              <Typography color="GrayText" variant="caption">
                Or send this application straight to the employer:
              </Typography>
              <Stack
                direction="row"
                spacing={1.5}
                sx={{ mt: 1, flexWrap: 'wrap', rowGap: 1 }}
              >
                {showWhatsApp && (
                  <Button
                    type="button"
                    variant="outlined"
                    color="success"
                    startIcon={<WhatsAppIcon />}
                    onClick={submitVia(onWhatsAppApply)}
                  >
                    Apply via WhatsApp
                  </Button>
                )}
                {showEmail && (
                  <Button
                    type="button"
                    variant="outlined"
                    startIcon={<EmailIcon />}
                    onClick={submitVia(onEmailApply)}
                  >
                    Apply via Contact Email
                  </Button>
                )}
              </Stack>
            </Grid>
          )}
        </Grid>
      </form>
    </>
  );
};

export default ApplyForm;
