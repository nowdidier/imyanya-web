import React from 'react';
import { useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import {
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

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faFile, faFilePdf } from '@fortawesome/free-regular-svg-icons';
import errorHandling from '../../utils/errorHandling';
import { CV_TYPES, REGEX_VATIDATE } from '../../configs/constants';

import TextFieldCustom from '../controls/TextFieldCustom';
import jobSeekerProfileService from '../../services/jobSeekerProfileService';

const ApplyForm = ({ handleApplyJob }) => {
  const { currentUser } = useSelector((state) => state.user);
  const [isLoadingResumes, setIsLoadingResumes] = React.useState(false);

  const [resumes, setResumes] = React.useState([]);

  const schema = yup.object().shape({
    fullName: yup
      .string()
      .required('Izina ryawe ni ryiza.')
      .max(100, 'Izina ryawe rirangiye ibyerekeye uburyo bwo kubika.'),
    email: yup
      .string()
      .required('Email ni cyiza.')
      .email('Email nticyiza.')
      .max(100, 'Email rirangiye ibyerekeye uburyo bwo kubika.'),
    phone: yup
      .string()
      .required('Telefoni ni cyiza.')
      .matches(REGEX_VATIDATE.phoneRegExp, 'Telefoni nticyiza.')
      .max(15, 'Telefoni rirangiye ibyerekeye uburyo bwo kubika.'),
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
                      <Card sx={{ p: 1 }} variant="outlined" key={value.id}>
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
                                    color="#182642"
                                  />{' '}
                                  Hồ sơ trực tuyến
                                </>
                              ) : value.type === CV_TYPES.cvUpload ? (
                                <>
                                  <FontAwesomeIcon
                                    icon={faFilePdf}
                                    style={{ marginRight: 1 }}
                                    color="red"
                                  />{' '}
                                  Hồ sơ đính kèm
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
                                  ? `/ung-vien/ho-so-tung-buoc/${value.slug}`
                                  : `/ung-vien/ho-so-dinh-kem/${value.slug}`
                              }
                              style={{
                                textDecoration: 'none',
                              }}
                            >
                              <Typography
                                sx={{ fontWeight: 'bold', cursor: 'pointer' }}
                                color="#182642"
                              >
                                <FontAwesomeIcon icon={faEye} /> Xem hồ sơ
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
    title="Izina ryose"
    showRequired={true}
    placeholder="Shyiramo izina ryose"
    control={control}
  />
</Grid>
<Grid item xs={12}>
  <TextFieldCustom
    name="email"
    title="Email"
    showRequired={true}
    placeholder="Shyiramo email"
    control={control}
  />
</Grid>
<Grid item xs={12}>
  <TextFieldCustom
    name="phone"
    title="Nomero ya telefoni"
    showRequired={true}
    placeholder="Shyiramo nomero ya telefoni"
    control={control}
  />
</Grid>
<Grid item xs={12}>
  <Typography color="GrayText" variant="caption">
    Uwibuke: Izina ryose, email, na nomero ya telefoni bigomba kuba bizwi neza kugira ngo umukoresha abashe kubahuza nawe.
  </Typography>
</Grid>
</Grid>
</form>
</>
);
};

export default ApplyForm;
