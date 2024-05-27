import React from 'react';
import { useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import dayjs from 'dayjs';
import {
  Box,
  Button,
  Card,
  Divider,
  Grid,
  Skeleton,
  Stack,
  Typography,
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCalendarDay,
  faEye,
  faClockFour,
} from '@fortawesome/free-solid-svg-icons';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';

import { QRCode, Space } from 'antd';

import { TabTitle } from '../../../utils/generalFunction';
import toastMessages from '../../../utils/toastMessages';
import errorHandling from '../../../utils/errorHandling';
import MuiImageCustom from '../../../components/MuiImageCustom';
import { salaryString } from '../../../utils/customData';
import NoDataCard from '../../../components/NoDataCard';
import Map from '../../../components/Map';
import jobService from '../../../services/jobService';
import ApplyCard from '../../../components/ApplyCard';
import SocialNetworkSharingPopup from '../../../components/SocialNetworkSharingPopup/SocialNetworkSharingPopup';
import FilterJobPostCard from '../../components/defaults/FilterJobPostCard';
import { ROLES_NAME } from '../../../configs/constants';

const Loading = (
  <>
    <Box sx={{ mt: 2 }}>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={12} md={8} lg={8} xl={8}>
          {/* Start: thong tin chung */}
          <Card sx={{ py: 2, px: 4 }}>
            <Stack>
              <Box>
                <Stack direction="row" alignItems="center" spacing={2}>
                  <Skeleton variant="circular" width={65} height={65} />
                  <Box sx={{ flex: 1 }}>
                    <Typography variant="h6">
                      <Skeleton />
                    </Typography>
                    <Typography variant="subtitle2" gutterBottom>
                      <Skeleton width={200} />
                    </Typography>
                  </Box>
                </Stack>
              </Box>
              <Box sx={{ my: 1 }}></Box>
              <Stack spacing={2}>
                <Box>
                  <Typography variant="h5">
                    <Skeleton height={50} />
                  </Typography>
                </Box>
                <Stack direction="row" spacing={3}>
                  <Typography variant="subtitle2" sx={{ flex: 1 }}>
                    <Skeleton />
                  </Typography>
                  <Typography variant="subtitle2" sx={{ flex: 1 }}>
                    <Skeleton />
                  </Typography>
                  <Typography variant="subtitle2" sx={{ flex: 1 }}>
                    <Skeleton />
                  </Typography>
                </Stack>
                <Stack direction="row" spacing={2}>
                  <Skeleton variant="rounded" width={100} height={40} />
                  <Skeleton variant="rounded" width={100} height={40} />
                  <Skeleton variant="rounded" width={100} height={40} />
                </Stack>
              </Stack>
              <Box sx={{ my: 1 }}></Box>
              <Box>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={12} md={6} lg={3} xl={3}>
                    <Skeleton />
                  </Grid>
                  <Grid item xs={12} sm={12} md={6} lg={3} xl={3}>
                    <Skeleton />
                  </Grid>
                  <Grid item xs={12} sm={12} md={6} lg={3} xl={3}>
                    <Skeleton />
                  </Grid>
                  <Grid item xs={12} sm={12} md={6} lg={3} xl={3}>
                    <Skeleton />
                  </Grid>
                </Grid>
              </Box>
              <Box sx={{ my: 1 }}></Box>
              <Box>
                <Stack>
                  <Typography variant="h5" gutterBottom>
                    <Skeleton />
                  </Typography>
                  <Box>
                    <Grid container spacing={2}>
                      <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                        <Skeleton />
                      </Grid>
                      <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                        <Skeleton />
                      </Grid>
                      <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                        <Skeleton />
                      </Grid>
                      <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                        <Skeleton />
                      </Grid>
                      <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                        <Skeleton />
                      </Grid>
                      <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                        <Skeleton />
                      </Grid>
                    </Grid>
                  </Box>
                </Stack>
              </Box>
              <Box></Box>
            </Stack>
          </Card>
          {/* End: thong tin chung */}

          {/* Start: mo ta chi tiet */}
          <Card sx={{ p: 4, mt: 3 }}>
            <Stack spacing={4}>
              <Box>
                <Typography variant="h5">
                  <Skeleton />
                </Typography>
                <Box sx={{ pt: 1 }}>
                  <Skeleton variant="rounded" height={100} />
                </Box>
              </Box>
              <Box>
                <Typography variant="h5">
                  <Skeleton />
                </Typography>
                <Box sx={{ pt: 1 }}>
                  <Skeleton variant="rounded" height={100} />
                </Box>
              </Box>
              <Box>
                <Typography variant="h5">
                  <Skeleton />
                </Typography>
                <Box sx={{ pt: 1 }}>
                  <Skeleton variant="rounded" height={100} />
                </Box>
              </Box>
            </Stack>
            <Box sx={{ my: 1 }}></Box>
            <Stack direction="row" spacing={2}>
              <Skeleton variant="rounded" width={100} height={40} />
              <Skeleton variant="rounded" width={100} height={40} />
              <Skeleton variant="rounded" width={100} height={40} />
            </Stack>
          </Card>
          {/* End: mo ta chi tiet */}

          {/* Start: thong tin lien he */}
          <Card sx={{ p: 4, mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={8}>
                <Box>
                  <Typography variant="h5">
                    <Skeleton />
                  </Typography>
                  <Stack sx={{ pt: 1 }} spacing={2}>
                    <Skeleton />
                    <Skeleton />
                    <Skeleton />
                    <Skeleton />
                  </Stack>
                </Box>
              </Grid>
              <Grid item xs={4}>
                <Box>
                  <Typography variant="h5">
                    <Skeleton />
                  </Typography>
                  <Stack sx={{ pt: 1 }} spacing={2}>
                    <Skeleton />
                    <Skeleton />
                    <Skeleton />
                    <Skeleton />
                  </Stack>
                </Box>
              </Grid>
            </Grid>
          </Card>
          {/* End: thong tin lien he */}
        </Grid>
      </Grid>
    </Box>
  </>
);

const item = (title, value) => {
  return (
    <Box>
      <Typography variant="body2" color="#bdbdbd" sx={{ fontWeight: 'normal' }}>
        {title}
      </Typography>
      <Typography variant="body1" gutterBottom sx={{ textAlign: 'justify' }}>
        {value ? (
          <span style={{ fontWeight: 'bold' }}>{value}</span>
        ) : (
          <span style={{ color: '#e0e0e0', fontStyle: 'italic', fontSize: 13 }}>
            Chưa cập nhật
          </span>
        )}
      </Typography>
    </Box>
  );
};

const ActionComponent = ({
  isApplied,
  isSaved,
  isLoadingSave,
  handleSave,
  handleShowApplyForm,
  setOpenSharePopup,
  isAuthenticated,
  currentUser,
}) => (
  <Stack direction="row" spacing={2}>
    {isAuthenticated && currentUser?.roleName === ROLES_NAME.JOB_SEEKER && (
      <>
        <Button
          variant="contained"
          size="large"
          sx={{ textTransform: 'inherit' }}
          disabled={isApplied}
          onClick={handleShowApplyForm}
        >
          {isApplied ? 'Đã ứng tuyển' : 'Nộp hồ sơ'}
        </Button>
        <LoadingButton
          onClick={handleSave}
          startIcon={isSaved ? <FavoriteIcon /> : <FavoriteBorderIcon />}
          loading={isLoadingSave}
          loadingPosition="start"
          variant="outlined"
          sx={{ textTransform: 'inherit' }}
        >
          <span>{isSaved ? 'Đã lưu' : 'Lưu'}</span>
        </LoadingButton>
      </>
    )}
    <Button
      variant="outlined"
      size="large"
      startIcon={<ShareIcon />}
      sx={{ textTransform: 'inherit' }}
      onClick={() => setOpenSharePopup(true)}
    >
      Chia sẻ
    </Button>
  </Stack>
);

const JobDetailPage = () => {
  const { slug } = useParams();
  const { allConfig } = useSelector((state) => state.config);
  const { isAuthenticated, currentUser } = useSelector((state) => state.user);
  const [openSharePopup, setOpenSharePopup] = React.useState(false);
  const [openPopup, setOpenPopup] = React.useState(false);
  const [isApplySucces, setIsApplySuccess] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(true);
  const [isLoadingSave, setIsLoadingSave] = React.useState(false);
  const [jobPostDetail, setJobPostDetail] = React.useState(null);

  React.useEffect(() => {
    const getJobPostDetail = async (jobPostSlug) => {
      try {
        const resData = await jobService.getJobPostDetailById(jobPostSlug);
        const data = resData.data

        setJobPostDetail(data);
        TabTitle(data?.jobName)
      } catch (error) {
      } finally {
        setIsLoading(false);
      }
    };

    getJobPostDetail(slug);
  }, [slug]);

  React.useEffect(() => {
    if (isApplySucces) {
      setJobPostDetail({ ...jobPostDetail, isApplied: true });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isApplySucces]);
  const handleSave = () => {
    const saveJobPost = async () => {
      setIsLoadingSave(true);
      try {
        const resData = await jobService.saveJobPost(slug);
        const isSaved = resData.data.isSaved;
  
        setJobPostDetail({ ...jobPostDetail, isSaved: isSaved });
        toastMessages.success(
          isSaved ? 'Byakunze kubika.' : 'Byakunze kubihagarika.'
        );
      } catch (error) {
        errorHandling(error);
      } finally {
        setIsLoadingSave(false);
      }
    };
  
    saveJobPost();
  };
  
  const handleShowApplyForm = () => {
    setOpenPopup(true);
  };
  
  return (
    <>
      {isLoading ? (
        Loading
      ) : jobPostDetail === null ? (
        <NoDataCard />
      ) : (
        <Box sx={{ mt: 2 }}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={12} md={8} lg={8} xl={8}>
              {/* Start: Amakuru rusange */}
              <Card
                sx={{ py: 2, px: { xs: 1.5, sm: 1.5, md: 2, lg: 4, xl: 4 } }}
              >
                <Stack>
                  <Box>
                    <Stack direction="row" alignItems="center" spacing={2}>
                      <Box>
                        <MuiImageCustom
                          width={75}
                          height={75}
                          src={jobPostDetail?.companyDict?.companyImageUrl}
                          sx={{
                            bgcolor: 'white',
                            borderRadius: 2,
                            boxShadow: 6,
                            p: 0.5,
                          }}
                        />
                      </Box>
                      <Box sx={{ flex: 1 }}>
                        <Typography
                          variant="h6"
                          component={Link}
                          to={`/cong-ty/${jobPostDetail?.companyDict?.slug}`}
                          sx={{ color: 'inherit', textDecoration: 'none' }}
                        >
                          {jobPostDetail?.companyDict?.companyName}
                        </Typography>
                        <Typography
                          variant="subtitle2"
                          gutterBottom
                          color="GrayText"
                        >
                          {allConfig?.employeeSizeDict[
                            jobPostDetail?.companyDict?.employeeSize
                          ] || (
                            <span
                              style={{
                                color: '#e0e0e0',
                                fontStyle: 'italic',
                                fontSize: 13,
                              }}
                            >
                              Ntibiraboneka
                            </span>
                          )}
                        </Typography>
                      </Box>
                      <Box>
                        <Space direction="vertical" align="center">
                          <QRCode
                            value={window.location.href || '-'}
                            size={75}
                          />
                        </Space>
                      </Box>
                    </Stack>
                  </Box>
                  <Divider sx={{ my: 2 }} />
                  <Stack spacing={2}>
                    <Box>
                      <Typography variant="h5" sx={{ fontSize: 26 }}>
                        {jobPostDetail?.jobName}
                      </Typography>
                    </Box>
                    <Stack
                      direction={{
                        sx: 'column',
                        sm: 'row',
                        md: 'row',
                        lg: 'row',
                        xl: 'row',
                      }}
                      spacing={3}
                    >
                      <Typography variant="subtitle2">
                        <FontAwesomeIcon
                          icon={faCalendarDay}
                          style={{
                            marginRight: 6,
                            fontSize: 15,
                            color: '#bdbdbd',
                          }}
                        />{' '}
                        Itariki ntarengwa yo gutanga ibyangombwa:{' '}
                        {dayjs(jobPostDetail?.deadline).format('DD/MM/YYYY')}
                      </Typography>
                      <Typography variant="subtitle2">
                        <FontAwesomeIcon
                          icon={faEye}
                          style={{
                            marginRight: 6,
                            fontSize: 15,
                            color: '#bdbdbd',
                          }}
                        />{' '}
                        Abarebye: {jobPostDetail?.views}
                      </Typography>
                      <Typography variant="subtitle2">
                        <FontAwesomeIcon
                          icon={faClockFour}
                          style={{
                            marginRight: 6,
                            fontSize: 15,
                            color: '#bdbdbd',
                          }}
                        />{' '}
                        Itariki yashyizweho:{' '}
                        {dayjs(jobPostDetail?.createAt).format('DD/MM/YYYY')}
                      </Typography>
                    </Stack>
                    {/* Start: ActionComponent */}
                    <ActionComponent
                      isApplied={jobPostDetail.isApplied}
                      isSaved={jobPostDetail.isSaved}
                      isLoadingSave={isLoadingSave}
                      handleSave={handleSave}
                      handleShowApplyForm={handleShowApplyForm}
                      setOpenSharePopup={setOpenSharePopup}
                      isAuthenticated={isAuthenticated}
                      currentUser={currentUser}
                    />
                    {/* End: ActionComponent */}
                  </Stack>
                  <Divider sx={{ my: 2 }} />
                  <Box>
                    <Grid container spacing={2}>
                      <Grid item xs={12} sm={12} md={6} lg={3} xl={3}>
                        <Typography
                          variant="body2"
                          gutterBottom
                          color="#bdbdbd"
                        >
                          Ibisabwa kugira ubunararibonye
                        </Typography>
                        <Typography
                          variant="body1"
                          gutterBottom
                          sx={{ fontWeight: 'bold' }}
                        >
                          {allConfig?.experienceDict[
                            jobPostDetail?.experience
                          ] || (
                            <span
                              style={{
                                color: '#e0e0e0',
                                fontStyle: 'italic',
                                fontSize: 13,
                              }}
                            >
                              Ntibiraboneka
                            </span>
                          )}
                        </Typography>
                      </Grid>
                      <Grid item xs={12} sm={12} md={6} lg={3} xl={3}>
                        <Typography
                          variant="body2"
                          gutterBottom
                          color="#bdbdbd"
                        >
                          Umushahara
                        </Typography>
                        <Typography
                          variant="body1"
                          gutterBottom
                          sx={{ fontWeight: 'bold' }}
                        >
                          {salaryString(
                            jobPostDetail?.salaryMin,
                            jobPostDetail?.salaryMax
  
                          )}
                        </Typography>
                      </Grid>
                      <Grid item xs={12} sm={12} md={6} lg={3} xl={3}>
  <Typography
    variant="body2"
    gutterBottom
    color="#bdbdbd"
  >
    Uruhare
  </Typography>
  <Typography
    variant="body1"
    gutterBottom
    sx={{ fontWeight: 'bold' }}
  >
    {allConfig?.positionDict[jobPostDetail?.position] || (
      <span
        style={{
          color: '#e0e0e0',
          fontStyle: 'italic',
          fontSize: 13,
        }}
      >
        Ntibiraboneka
      </span>
    )}
  </Typography>
</Grid>
<Grid item xs={12} sm={12} md={6} lg={3} xl={3}>
  <Typography
    variant="body2"
    gutterBottom
    color="#bdbdbd"
  >
    Uburyo bw'akazi
  </Typography>
  <Typography
    variant="body1"
    gutterBottom
    sx={{ fontWeight: 'bold' }}
  >
    {allConfig?.jobTypeDict[jobPostDetail?.jobType] || (
      <span
        style={{
          color: '#e0e0e0',
          fontStyle: 'italic',
          fontSize: 13,
        }}
      >
        Ntibiraboneka
      </span>
    )}
  </Typography>
</Grid>
</Grid>
</Box>
<Divider sx={{ my: 2 }} />
<Box>
  <Stack>
    <Typography variant="h5" gutterBottom>
      Amakuru
    </Typography>
    <Box>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
          {item(
            'Umurimo',
            allConfig.careerDict[jobPostDetail?.career]
          )}
        </Grid>
        <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
          {item(
            'Aho akazi kari',
            allConfig.typeOfWorkplaceDict[
              jobPostDetail?.typeOfWorkplace
            ]
          )}
        </Grid>
        <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
          {item(
            'Uburezi',
            allConfig.academicLevelDict[
              jobPostDetail?.academicLevel
            ]
          )}
        </Grid>
        <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
          {item('Umubare w\'abakenewe', jobPostDetail?.quantity)}
        </Grid>
        <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
          {item(
            'Agace katangiwemo akazi',
            allConfig.cityDict[jobPostDetail?.location?.city]
          )}
        </Grid>
        <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
          {item(
            'Ibisabwa n\'igitsina',
            allConfig.genderDict[
              jobPostDetail?.genderRequired
            ]
          )}
        </Grid>
      </Grid>
    </Box>
  </Stack>
</Box>
<Box></Box>
</Stack>
</Card>

              {/* End: thong tin chung */}

              {/* Start: mo ta chi tiet */}
              <Card
  sx={{
    py: 4,
    mt: 3,
    px: { xs: 1.5, sm: 1.5, md: 2, lg: 4, xl: 4 },
  }}
>
  <Stack spacing={4}>
    <Box>
      <Typography variant="h5">Ibisobanuro by'akazi</Typography>
      <Box sx={{ pt: 1 }}>
        <div
          dangerouslySetInnerHTML={{
            __html: jobPostDetail?.jobDescription,
          }}
        ></div>
      </Box>
    </Box>
    <Box>
      <Typography variant="h5">Ibisabwa n'akazi</Typography>
      <Box sx={{ pt: 1 }}>
        <div
          dangerouslySetInnerHTML={{
            __html: jobPostDetail?.jobRequirement,
          }}
        ></div>
      </Box>
    </Box>
    <Box>
      <Typography variant="h5">Ibyiza byo gukora akazi</Typography>
      <Box sx={{ pt: 1 }}>
        <div
          dangerouslySetInnerHTML={{
            __html: jobPostDetail?.benefitsEnjoyed,
          }}
        ></div>
      </Box>
    </Box>
  </Stack>
  <Divider sx={{ my: 2 }} />
  {/* Start: ActionComponent */}
  <ActionComponent
    isApplied={jobPostDetail.isApplied}
    isSaved={jobPostDetail.isSaved}
    isLoadingSave={isLoadingSave}
    handleSave={handleSave}
    handleShowApplyForm={handleShowApplyForm}
    setOpenSharePopup={setOpenSharePopup}
    isAuthenticated={isAuthenticated}
    currentUser={currentUser}
  />
  {/* End: ActionComponent */}
</Card>
{/* End: mo ta chi tiet */}

{/* Start: Amakuru y'itumanaho */}
<Card
  sx={{
    py: 4,
    mt: 3,
    px: { xs: 1.5, sm: 1.5, md: 2, lg: 4, xl: 4 },
  }}
>
  <Grid container spacing={2}>
    <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
      <Box>
        <Typography variant="h5">Amakuru y'itumanaho</Typography>
        <Stack sx={{ pt: 1 }} spacing={2}>
          <Box>
            {item(
              'Uwakira abantu',
              jobPostDetail?.contactPersonName
            )}
          </Box>
          <Box>
            {item(
              'Email y\'uwakira abantu',
              jobPostDetail?.contactPersonEmail
            )}
          </Box>
          <Box>
            {item(
              'Telefoni y\'uwakira abantu',
              jobPostDetail?.contactPersonPhone
            )}
          </Box>
          <Box>
            {item('Adiresi', jobPostDetail?.location?.address)}
          </Box>
        </Stack>
      </Box>
    </Grid>
    <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
      <Box>
        <Typography variant="body2" color="#bdbdbd">
          Ikarita
        </Typography>
        <Stack sx={{ pt: 1 }} spacing={2}>
          <Box>
            <Map
              title={jobPostDetail?.jobName}
              subTitle={jobPostDetail?.location?.address}
              latitude={jobPostDetail?.location?.lat}
              longitude={jobPostDetail?.location?.lng}
            />
          </Box>
        </Stack>
      </Box>
    </Grid>
  </Grid>
</Card>
{/* End: Amakuru y'itumanaho */}
</Grid>

<Grid item xs={12} sm={12} md={4} lg={4} xl={4}>
  <Card sx={{ p: { xs: 1.5, sm: 1.5, md: 2, lg: 2, xl: 2 } }}>
    <Stack spacing={2}>
      <Typography variant="h5">Akazi gafitanye isano</Typography>
      <Box
        sx={{ width: 120, height: 5, backgroundColor: '#441da0' }}
      ></Box>
      <Box>
        {/* Start: FilterJobPostCard */}
        <FilterJobPostCard
          params={{
            excludeSlug: jobPostDetail?.slug,
            // cityId: jobPostDetail?.location?.city,
            // careerId: jobPostDetail?.career
          }}
          fullWidth={true}
        />
        {/* End: FilterJobPostCard */}
      </Box>
    </Stack>
  </Card>
</Grid>
</Grid>
</Box>
)}
{/* Start: ApplyCard */}
<ApplyCard
  title={jobPostDetail?.jobName}
  jobPostId={jobPostDetail?.id}
  openPopup={openPopup}
  setOpenPopup={setOpenPopup}
  setIsApplySuccess={setIsApplySuccess}
/>
{/* End: ApplyCard */}

{/* Start: SocialNetworkSharingPopup */}
<SocialNetworkSharingPopup
  open={openSharePopup}
  setOpenPopup={setOpenSharePopup}
  facebook={{
    url: window.location.href,
  }}
  facebookMessenger={{
    url: window.location.href,
  }}
  linkedin={{
    url: window.location.href,
    source: '',
    title: '',
    summary: '',
  }}
  twitter={{
    url: window.location.href,
    title: '',
    via: '',
    hashtags: [],
    related: [],
  }}
  email={{
    url: window.location.href,
    subject: '',
    body: '',
  }}
/>
{/* End: SocialNetworkSharingPopup */}
</>
);
};

export default JobDetailPage;
