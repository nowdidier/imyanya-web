import React from "react";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import dayjs from "dayjs";
import {
  Box,
  Button,
  Card,
  Divider,
  Grid,
  Skeleton,
  Stack,
  Typography,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCalendarDay,
  faEye,
  faClockFour,
} from "@fortawesome/free-solid-svg-icons";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";

import { QRCode, Space } from "antd";

import { TabTitle } from "../../../utils/generalFunction";
import toastMessages from "../../../utils/toastMessages";
import errorHandling from "../../../utils/errorHandling";
import MuiImageCustom from "../../../components/MuiImageCustom";
import RichHtmlContent from "../../../components/controls/RichHtmlContent";
import { salaryString } from "../../../utils/customData";
import NoDataCard from "../../../components/NoDataCard";
import Map from "../../../components/Map";
import jobService from "../../../services/jobService";
import ApplyCard from "../../../components/ApplyCard";
import SocialNetworkSharingPopup from "../../../components/SocialNetworkSharingPopup/SocialNetworkSharingPopup";
import FilterJobPostCard from "../../components/defaults/FilterJobPostCard";
import { ROLES_NAME, ROUTES } from "../../../configs/constants";
import { formatRoute } from "../../../utils/funcUtils";
import { buildJobShareData } from "../../../utils/shareUtils";
import HiringCTA from "../../../components/HiringCTA";
import { setContentNoindex } from "../../../components/SeoManager/contentFlag";
import { setJobSeo } from "../../../components/SeoManager/jobSeoFlag";
import { rwandaCareerCategoryGuides } from "../../../data/rwandaCareerContent";
import PersonIcon from "@mui/icons-material/Person";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import LocationOnIcon from "@mui/icons-material/LocationOn";

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

const daysUntil = (deadline) => {
  if (!deadline) return null;
  return dayjs(deadline).startOf('day').diff(dayjs().startOf('day'), 'day');
};

const DeadlineBadge = ({ deadline }) => {
  const days = daysUntil(deadline);
  if (days === null || days < 0) return null;

  const bgcolor =
    days === 0 ? 'error.main' : days <= 3 ? 'warning.main' : 'success.main';
  const label =
    days === 0
      ? 'Closes today'
      : days === 1
        ? 'Closes tomorrow'
        : `Closes in ${days} days`;

  return (
    <Box
      component="span"
      sx={{
        ml: 1,
        px: 1.25,
        py: 0.4,
        borderRadius: '12px',
        fontSize: 12,
        fontWeight: 700,
        color: '#fff',
        bgcolor: bgcolor,
      }}
    >
      {label}
    </Box>
  );
};

const item = (title, value) => {
  return (
    <Box>
      <Typography
        variant="body2"
        color="text.secondary"
        sx={{ fontWeight: "normal", pb: 1 }}
      >
        {title}
      </Typography>
      <Typography variant="body1" gutterBottom sx={{ textAlign: "justify" }}>
        {value ? (
          <span style={{ fontWeight: "bold" }}>{value}</span>
        ) : (
          <span style={{ color: "#e0e0e0", fontStyle: "italic", fontSize: 13 }}>
            Not updated
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
  shareLabel = "Share job",
}) => (
  <Stack direction="row" spacing={2} sx={{ flexWrap: "wrap" }}>
    {isAuthenticated && currentUser?.roleName === ROLES_NAME.JOB_SEEKER && (
      <>
        <Button
          variant="contained"
          size="large"
          sx={{
            textTransform: "none",
            background: "linear-gradient(45deg, #FF9800 30%, #FF5722 90%)",
            color: "white",
            fontWeight: 600,
            "&:hover": {
              background: "linear-gradient(45deg, #FB8C00 30%, #F4511E 90%)",
            },
          }}
          disabled={isApplied}
          onClick={handleShowApplyForm}
        >
          {isApplied ? "Applied" : "Apply Now"}
        </Button>
        <LoadingButton
          onClick={handleSave}
          startIcon={isSaved ? <FavoriteIcon /> : <FavoriteBorderIcon />}
          loading={isLoadingSave}
          loadingPosition="start"
          variant={isSaved ? "contained" : "outlined"}
          sx={{
            textTransform: "none",
            ...(isSaved
              ? {
                  backgroundColor: "#9c27b0",
                  "&:hover": {
                    backgroundColor: "#7b1fa2",
                  },
                }
              : {
                  borderColor: "#9c27b0",
                  color: "#9c27b0",
                  "&:hover": {
                    borderColor: "#7b1fa2",
                    backgroundColor: "rgba(156,39,176,0.04)",
                  },
                }),
          }}
        >
          <span>{isSaved ? "Saved" : "Save Job"}</span>
        </LoadingButton>
      </>
    )}
    <Button
      variant="contained"
      size="large"
      startIcon={<ShareIcon />}
      sx={{
        textTransform: "none",
        borderRadius: 999,
        px: 3,
        fontWeight: 700,
        background: "linear-gradient(45deg, #441da0 30%, #6b45c9 90%)",
        color: "white",
        boxShadow: "0 12px 24px rgba(68,29,160,0.22)",
        "&:hover": {
          background: "linear-gradient(45deg, #2f1578 30%, #5a39b1 90%)",
          boxShadow: "0 14px 28px rgba(68,29,160,0.28)",
          transform: "translateY(-1px)",
        },
      }}
      onClick={() => setOpenSharePopup(true)}
    >
      {shareLabel}
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
  const shareUrl = typeof window !== "undefined" ? window.location.href : "";
  const shareData = React.useMemo(
    () =>
      buildJobShareData({
        url: shareUrl,
        jobName: jobPostDetail?.jobName,
        companyName: jobPostDetail?.companyDict?.companyName,
        locationName:
          allConfig?.cityDict[jobPostDetail?.location?.city] ||
          jobPostDetail?.location?.address ||
          "",
        deadline: jobPostDetail?.deadline,
        salaryLabel: salaryString(
          jobPostDetail?.salaryMin,
          jobPostDetail?.salaryMax
        ),
        jobTypeLabel: allConfig?.jobTypeDict[jobPostDetail?.jobType],
      }),
    [allConfig, jobPostDetail, shareUrl]
  );

  React.useEffect(() => {
    const getJobPostDetail = async (jobPostSlug) => {
      try {
        const resData = await jobService.getJobPostDetailById(jobPostSlug);
        const data = resData.data;

        setJobPostDetail(data);
        TabTitle(data?.jobName);
        setContentNoindex(data ? null : "not-found");

        const cityName =
          allConfig?.cityDict[data?.location?.city] ||
          data?.location?.address ||
          "Rwanda";

        setJobSeo({
          jobName: data?.jobName || "",
          companyName: data?.companyDict?.companyName || "",
          description:
            (data?.jobDescription
              ?.replace(/<[^>]*>/g, " ")
              .replace(/\s+/g, " ")
              .trim() || "") +
            " " +
            (data?.jobRequirement
              ?.replace(/<[^>]*>/g, " ")
              .replace(/\s+/g, " ")
              .trim() || ""),
          location: cityName,
          salaryLabel: salaryString(data?.salaryMin, data?.salaryMax),
          imageUrl: data?.imageUrl || data?.companyDict?.companyImageUrl || "",
          deadline: data?.deadline || "",
          jobType: allConfig?.jobTypeDict[data?.jobType] || "",
          experience: allConfig?.experienceDict[data?.experience] || "",
          academicLevel: allConfig?.academicLevelDict[data?.academicLevel] || "",
          career: allConfig?.careerDict[data?.career] || "",
        });
      } catch (error) {
        console.error(error);
        setContentNoindex("not-found");
        setJobSeo(null);
      } finally {
        setIsLoading(false);
      }
    };

    getJobPostDetail(slug);
  }, [slug, allConfig]);

  React.useEffect(() => {
    if (isApplySucces) {
      setJobPostDetail({ ...jobPostDetail, isApplied:true });
    }
  }, [isApplySucces]);

  React.useEffect(() => {
    return () => {
      setJobSeo(null);
    };
  }, []);

  // Google Jobs structured data. Emitted for every job post so all listings
  // are eligible for rich Google Jobs results.
  React.useEffect(() => {
    if (!jobPostDetail) return undefined;

    const stripHtml = (html = "") =>
      String(html || "")
        .replace(/<[^>]*>/g, " ")
        .replace(/\s+/g, " ")
        .trim();

    const cityName =
      allConfig?.cityDict[jobPostDetail?.location?.city] ||
      jobPostDetail?.location?.address ||
      "Rwanda";

    const jobLocation = {
      "@type": "Place",
      address: {
        "@type": "PostalAddress",
        addressLocality: cityName,
        streetAddress: jobPostDetail?.location?.address,
        addressCountry: "RW",
      },
      ...(jobPostDetail?.location?.lat
        ? {
            geo: {
              "@type": "GeoCoordinates",
              latitude: jobPostDetail?.location?.lat,
              longitude: jobPostDetail?.location?.lng,
            },
          }
        : {}),
    };

    const schema = {
      "@context": "https://schema.org",
      "@type": "JobPosting",
      title: jobPostDetail?.jobName,
      description: stripHtml(jobPostDetail?.jobDescription),
      datePosted: jobPostDetail?.createAt
        ? dayjs(jobPostDetail.createAt).toISOString()
        : undefined,
      ...(jobPostDetail?.deadline
        ? { validThrough: dayjs(jobPostDetail.deadline).toISOString() }
        : {}),
      employmentType:
        allConfig?.jobTypeDict[jobPostDetail?.jobType] || undefined,
      hiringOrganization: {
        "@type": "Organization",
        name: jobPostDetail?.companyDict?.companyName,
        ...(jobPostDetail?.companyDict?.companyImageUrl
          ? { logo: jobPostDetail.companyDict.companyImageUrl }
          : {}),
        ...(jobPostDetail?.companyDict?.slug
          ? { sameAs: `https://imyanya.rw/companies/${jobPostDetail.companyDict.slug}` }
          : {}),
      },
      jobLocation: {
        ...jobLocation,
        ...(jobPostDetail?.location?.address
          ? { address: { "@type": "PostalAddress", streetAddress: jobPostDetail.location.address } }
          : {}),
      },
      applicantLocationRequirements: {
        "@type": "Country",
        name: "Rwanda",
      },
      ...(jobPostDetail?.salaryMin
        ? {
            baseSalary: {
              "@type": "MonetaryAmount",
              currency: "RWF",
              value: {
                "@type": "QuantitativeValue",
                ...(jobPostDetail?.salaryMin
                  ? { minValue: jobPostDetail.salaryMin }
                  : {}),
                ...(jobPostDetail?.salaryMax
                  ? { maxValue: jobPostDetail.salaryMax }
                  : {}),
                unitText: "MONTH",
              },
            },
          }
        : {}),
      ...(jobPostDetail?.imageUrl || jobPostDetail?.companyDict?.companyImageUrl
        ? {
            image:
              jobPostDetail?.imageUrl ||
              jobPostDetail?.companyDict?.companyImageUrl,
          }
        : {}),
      ...(stripHtml(jobPostDetail?.jobRequirement)
        ? { qualifications: stripHtml(jobPostDetail.jobRequirement) }
        : {}),
      ...(stripHtml(jobPostDetail?.benefitsEnjoyed)
        ? { benefits: stripHtml(jobPostDetail.benefitsEnjoyed) }
        : {}),
      ...(jobPostDetail?.experience
        ? { experienceRequirements: allConfig?.experienceDict[jobPostDetail.experience] || undefined }
        : {}),
      ...(jobPostDetail?.academicLevel
        ? { educationRequirements: allConfig?.academicLevelDict[jobPostDetail.academicLevel] || undefined }
        : {}),
      ...(jobPostDetail?.career
        ? { occupationalCategory: allConfig?.careerDict[jobPostDetail.career] || undefined }
        : {}),
      ...(jobPostDetail?.quantity
        ? { numberOfPositions: jobPostDetail.quantity }
        : {}),
    };

    const scriptId = "imyanya-jobposting-schema";
    let el = document.getElementById(scriptId);

    if (!el) {
      el = document.createElement("script");
      el.type = "application/ld+json";
      el.id = scriptId;
      document.head.appendChild(el);
    }

    el.textContent = JSON.stringify(schema);

    return () => {
      document.getElementById(scriptId)?.remove();
    };
  }, [jobPostDetail, allConfig]);

  const handleSave = () => {
    const saveJobPost = async () => {
      setIsLoadingSave(true);
     try {
        const resData = await jobService.saveJobPost(slug);
        const isSaved = resData.data.isSaved;

        setJobPostDetail({ ...jobPostDetail, isSaved: isSaved });
        toastMessages.success(
          isSaved ? "Saved successfully." : "Removed from saved list."
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
              {/* Start: thong tin chung */}
              <Card
                sx={{
                  py: 2,
                  px: { xs: 1.5, sm: 1.5, md: 2, lg: 4, xl: 4 },
                  boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                }}
              >
                <Stack>
                  <Box>
                    <Stack direction="row" alignItems="center" spacing={2}>
                      <Box>
                        <MuiImageCustom
                          width={75}
                          height={75}
                          src={jobPostDetail?.companyDict.companyImageUrl}
                          sx={{
                            bgcolor: "white",
                            borderRadius: 2,
                            boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
                            p: 0.5,
                          }}
                        />
                      </Box>
                      <Box sx={{ flex: 1 }}>
                        <Typography
                          variant="h6"
                          component={Link}
                          to={`/${formatRoute(
                            ROUTES.JOB_SEEKER.COMPANY_DETAIL,
                            jobPostDetail?.companyDict.slug
                          )}`}
                          sx={{ color: "inherit", textDecoration: "none" }}
                        >
                          {jobPostDetail?.companyDict.companyName}
                        </Typography>
                        <Typography
                          variant="subtitle2"
                          gutterBottom
                          color="GrayText"
                        >
                          {allConfig?.employeeSizeDict[
                            jobPostDetail?.companyDict.employeeSize
                          ] || (
                            <span
                              style={{
                                color: "#e0e0e0",
                                fontStyle: "italic",
                                fontSize: 13,
                              }}
                            >
                              Not updated
                            </span>
                          )}
                        </Typography>
                      </Box>
                      <Box>
                        <Space direction="vertical" align="center">
                          <QRCode value={shareUrl || "-"} size={75} />
                        </Space>
                      </Box>
                    </Stack>
                  </Box>
                  {jobPostDetail?.imageUrl && (
                    <Box
                      component="img"
                      src={jobPostDetail.imageUrl}
                      alt={jobPostDetail?.jobName}
                      sx={{
                        width: '100%',
                        maxHeight: 320,
                        objectFit: 'cover',
                        borderRadius: 2,
                        mt: 2,
                        boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                      }}
                    />
                  )}
                  <Divider sx={{ my: 2 }} />
                  <Box>
                    <Typography variant="h5" sx={{ fontSize: 26, mb: 2 }}>
                      {jobPostDetail?.jobName}
                    </Typography>

                    <Stack direction="row" spacing={3} sx={{ mb: 2 }}>
                      <Typography
                        variant="subtitle2"
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          color: "text.secondary",
                        }}
                      >
                        <FontAwesomeIcon
                          icon={faCalendarDay}
                          style={{
                            marginRight: 6,
                            fontSize: 15,
                            color: "#9c27b0",
                          }}
                        />
                        Deadline:{" "}
                        {dayjs(jobPostDetail?.deadline).format("DD/MM/YYYY")}
                        <DeadlineBadge deadline={jobPostDetail?.deadline} />
                      </Typography>
                      <Typography
                        variant="subtitle2"
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          color: "text.secondary",
                        }}
                      >
                        <FontAwesomeIcon
                          icon={faEye}
                          style={{
                            marginRight: 6,
                            fontSize: 15,
                            color: "#9c27b0",
                          }}
                        />
                        {jobPostDetail?.views} views
                      </Typography>
                      <Typography
                        variant="subtitle2"
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          color: "text.secondary",
                        }}
                      >
                        <FontAwesomeIcon
                          icon={faClockFour}
                          style={{
                            marginRight: 6,
                            fontSize: 15,
                            color: "#9c27b0",
                          }}
                        />
                        Posted on:{" "}
                        {dayjs(jobPostDetail?.createAt).format("DD/MM/YYYY")}
                      </Typography>
                    </Stack>

                    <ActionComponent
                      isApplied={jobPostDetail.isApplied}
                      isSaved={jobPostDetail.isSaved}
                      isLoadingSave={isLoadingSave}
                    handleSave={handleSave}
                    handleShowApplyForm={handleShowApplyForm}
                    setOpenSharePopup={setOpenSharePopup}
                    isAuthenticated={isAuthenticated}
                    currentUser={currentUser}
                    shareLabel="Share job"
                  />
                </Box>

                  <Divider sx={{ my: 2 }} />

                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={6} md={3}>
                      {item(
                        "Salary",
                        salaryString(
                          jobPostDetail?.salaryMin,
                          jobPostDetail?.salaryMax
                        )
                      )}
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                      {item(
                        "Experience",
                        allConfig?.experienceDict[jobPostDetail?.experience]
                      )}
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                      {item(
                        "Level",
                        allConfig?.positionDict[jobPostDetail?.position]
                      )}
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                      {item(
                        "Job Type",
                        allConfig?.jobTypeDict[jobPostDetail?.jobType]
                      )}
                    </Grid>
                  </Grid>
                </Stack>
              </Card>
              {/* End: thong tin chung */}

              {/* Start: Editorial Note */}
              {(() => {
                const careerName = allConfig?.careerDict[jobPostDetail?.career];
                const guide = careerName
                  ? rwandaCareerCategoryGuides.find((g) =>
                      g.title.toLowerCase().includes(careerName.toLowerCase()) ||
                      careerName.toLowerCase().includes(g.title.split(",")[0]?.toLowerCase())
                    )
                  : null;
                if (!guide && !careerName) return null;
                return (
                  <Card
                    sx={{
                      mt: 3,
                      p: 3,
                      border: "1px solid",
                      borderColor: "primary.light",
                      borderRadius: 1,
                      bgcolor: "rgba(156,39,176,0.03)",
                    }}
                  >
                    <Stack spacing={1.5}>
                      <Typography variant="h6" fontWeight={700}>
                        Editorial Note
                      </Typography>
                      {careerName && (
                        <Typography variant="body2" color="primary" fontWeight={600}>
                          Career field: {careerName}
                        </Typography>
                      )}
                      {guide ? (
                        <Typography color="text.secondary" sx={{ lineHeight: 1.7 }}>
                          {guide.body}
                        </Typography>
                      ) : (
                        <Typography color="text.secondary" sx={{ lineHeight: 1.7 }}>
                          This role is in the {careerName} field. Before
                          applying, review the job requirements carefully and
                          tailor your CV to highlight the specific skills and
                          experience mentioned in the description. Research the
                          employer and prepare questions that show your
                          understanding of the role and sector.
                        </Typography>
                      )}
                      <Typography variant="body2" color="text.secondary" sx={{ fontStyle: "italic" }}>
                        This note is provided by our editorial team to help you
                        evaluate this opportunity.
                      </Typography>
                    </Stack>
                  </Card>
                );
              })()}
              {/* End: Editorial Note */}

              {/* Start: mo ta chi tiet */}
              <Card
                sx={{
                  p: 4,
                  mt: 3,
                  px: { xs: 1.5, sm: 1.5, md: 2, lg: 4, xl: 4 },
                  boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                }}
              >
                <Stack spacing={4}>
                  {/* Job Description */}
                  <Box>
                    <Typography
                      variant="h5"
                      sx={{
                        fontSize: "1.3rem",
                        fontWeight: 700,
                        mb: 2,
                        "&::after": {
                          content: '""',
                          display: "block",
                          width: "50px",
                          height: "3px",
                          background: "#9c27b0",
                          borderRadius: "2px",
                          mt: 1,
                        },
                      }}
                    >
                      Job Description
                    </Typography>
                    <RichHtmlContent html={jobPostDetail?.jobDescription} />
                  </Box>

                  {/* Job Requirements */}
                  <Box>
                    <Typography
                      variant="h5"
                      sx={{
                        fontSize: "1.3rem",
                        fontWeight: 700,
                        mb: 2,
                        "&::after": {
                          content: '""',
                          display: "block",
                          width: "50px",
                          height: "3px",
                          background: "#9c27b0",
                          borderRadius: "2px",
                          mt: 1,
                        },
                      }}
                    >
                      Job Requirements
                    </Typography>
                    <RichHtmlContent html={jobPostDetail?.jobRequirement} />
                  </Box>

                  {/* Benefits */}
                  <Box>
                    <Typography
                      variant="h5"
                      sx={{
                        fontSize: "1.3rem",
                        fontWeight: 700,
                        mb: 2,
                        "&::after": {
                          content: '""',
                          display: "block",
                          width: "50px",
                          height: "3px",
                          background: "#9c27b0",
                          borderRadius: "2px",
                          mt: 1,
                        },
                      }}
                    >
                      Benefits
                    </Typography>
                    <RichHtmlContent html={jobPostDetail?.benefitsEnjoyed} />
                  </Box>

                  {/* Additional Information */}
                  <Box sx={{ mt: 2 }}>
                    <Grid container spacing={2}>
                      <Grid item xs={12} sm={6}>
                        {item(
                          "Occupation",
                          allConfig.careerDict[jobPostDetail?.career]
                        )}
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        {item(
                          "Work Location",
                          allConfig.typeOfWorkplaceDict[
                            jobPostDetail?.typeOfWorkplace
                          ]
                        )}
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        {item(
                          "Education",
                          allConfig.academicLevelDict[
                            jobPostDetail?.academicLevel
                          ]
                        )}
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        {item("Vacancies", jobPostDetail?.quantity)}
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        {item(
                          "Hiring Area",
                          allConfig.cityDict[jobPostDetail?.location?.city]
                        )}
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        {item(
                          "Gender Requirement",
                          allConfig.genderDict[jobPostDetail?.genderRequired]
                        )}
                      </Grid>
                    </Grid>
                  </Box>
                </Stack>
              </Card>
              {/* End: mo ta chi tiet */}

              {/* Start: Application Tips */}
              <Card
                sx={{
                  p: 4,
                  mt: 3,
                  px: { xs: 1.5, sm: 1.5, md: 2, lg: 4, xl: 4 },
                  boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                }}
              >
                <Typography
                  variant="h5"
                  sx={{
                    fontSize: "1.3rem",
                    fontWeight: 700,
                    mb: 2,
                    "&::after": {
                      content: '""',
                      display: "block",
                      width: "50px",
                      height: "3px",
                      background: "#9c27b0",
                      borderRadius: "2px",
                      mt: 1,
                    },
                  }}
                >
                  Application Tips
                </Typography>
                <Stack spacing={2}>
                  <Typography color="text.secondary" sx={{ lineHeight: 1.8 }}>
                    Before applying, read the requirements carefully and tailor
                    your CV to highlight the skills and experience mentioned in
                    the job description. Use the same role title from the listing
                    in your application so the recruiter can match your profile
                    quickly.
                  </Typography>
                  <Typography color="text.secondary" sx={{ lineHeight: 1.8 }}>
                    If the listing includes a deadline, submit your application
                    before the closing date. Late applications are rarely
                    considered. Prepare your documents in advance so you are not
                    rushing at the last minute.
                  </Typography>
                  <Typography color="text.secondary" sx={{ lineHeight: 1.8 }}>
                    After submitting, consider following up with the employer
                    within a few business days if a contact is provided. A brief,
                    professional email confirming your application shows
                    initiative and attention to detail.
                  </Typography>
                </Stack>
              </Card>
              {/* End: Application Tips */}

              {/* Start: Career Context */}
              <Card
                sx={{
                  p: 4,
                  mt: 3,
                  px: { xs: 1.5, sm: 1.5, md: 2, lg: 4, xl: 4 },
                  boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                }}
              >
                <Typography
                  variant="h5"
                  sx={{
                    fontSize: "1.3rem",
                    fontWeight: 700,
                    mb: 2,
                    "&::after": {
                      content: '""',
                      display: "block",
                      width: "50px",
                      height: "3px",
                      background: "#9c27b0",
                      borderRadius: "2px",
                      mt: 1,
                    },
                  }}
                >
                  Salary and Career Context
                </Typography>
                <Stack spacing={2}>
                  {jobPostDetail?.salaryMin || jobPostDetail?.salaryMax ? (
                    <Typography color="text.secondary" sx={{ lineHeight: 1.8 }}>
                      The salary range shown is based on information provided by
                      the employer. Compare it with similar roles in the same
                      sector and location to assess whether it aligns with your
                      expectations. Remember that total compensation may include
                      benefits such as health insurance, transport allowance, or
                      professional development support.
                    </Typography>
                  ) : (
                    <Typography color="text.secondary" sx={{ lineHeight: 1.8 }}>
                      This listing does not include a specific salary figure.
                      Consider researching typical pay ranges for similar roles
                      in Rwanda before your interview, so you can negotiate from
                      an informed position if you receive an offer.
                    </Typography>
                  )}
                  <Typography color="text.secondary" sx={{ lineHeight: 1.8 }}>
                    If you are early in your career, focus on roles that offer
                    growth opportunities, mentorship, and skill development
                    rather than salary alone. A role with strong learning
                    potential can lead to better opportunities in the long term.
                  </Typography>
                </Stack>
              </Card>
              {/* End: Career Context */}

              {/* Start: thong tin lien he */}
              <Card
                sx={{
                  py: 4,
                  mt: 3,
                  px: { xs: 1.5, sm: 1.5, md: 2, lg: 4, xl: 4 },
                  boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                }}
              >
                <Grid container spacing={4}>
                  <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                    <Box>
                      <Typography
                        variant="h5"
                        sx={{
                          fontSize: "1.3rem",
                          fontWeight: 700,
                          mb: 3,
                          "&::after": {
                            content: '""',
                            display: "block",
                            width: "50px",
                            height: "3px",
                            background: "#9c27b0",
                            borderRadius: "2px",
                            mt: 1,
                          },
                        }}
                      >
                        Contact Information
                      </Typography>

                      <Stack spacing={2.5}>
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: 2,
                            p: 2,
                            borderRadius: 2,
                            bgcolor: "rgba(156,39,176,0.04)",
                           transition: "all 0.2s",
                            "&:hover": {
                              bgcolor: "rgba(156,39,176,0.08)",
                             transform: "translateX(8px)",
                            }
                          }}
                        >
                          <PersonIcon sx={{ color: "#9c27b0", fontSize: 24 }} />
                          <Box>
                            <Typography variant="body2" color="text.secondary" gutterBottom>
                              Contact Person
                            </Typography>
                            <Typography variant="body1" fontWeight={500}>
                              {jobPostDetail?.contactPersonName || "Not updated"}
                            </Typography>
                          </Box>
                        </Box>

                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: 2,
                            p: 2,
                            borderRadius: 2,
                            bgcolor: "rgba(156,39,176,0.04)",
                           transition: "all 0.2s",
                            "&:hover": {
                              bgcolor: "rgba(156,39,176,0.08)", 
                             transform: "translateX(8px)",
                            }
                          }}
                        >
                          <EmailIcon sx={{ color: "#9c27b0", fontSize: 24 }} />
                          <Box>
                            <Typography variant="body2" color="text.secondary" gutterBottom>
                              Contact Email
                            </Typography>
                            <Typography variant="body1" fontWeight={500}>
                              {jobPostDetail?.contactPersonEmail || "Not updated"}
                            </Typography>
                          </Box>
                        </Box>

                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center", 
                            gap: 2,
                            p: 2,
                            borderRadius: 2,
                            bgcolor: "rgba(156,39,176,0.04)",
                           transition: "all 0.2s",
                            "&:hover": {
                              bgcolor: "rgba(156,39,176,0.08)",
                             transform: "translateX(8px)",
                            }
                          }}
                        >
                          <PhoneIcon sx={{ color: "#9c27b0", fontSize: 24 }} />
                          <Box>
                            <Typography variant="body2" color="text.secondary" gutterBottom>
                              Phone Number
                            </Typography>
                            <Typography variant="body1" fontWeight={500}>
                              {jobPostDetail?.contactPersonPhone || "Not updated"}
                            </Typography>
                          </Box>
                        </Box>

                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: 2,
                            p: 2,
                            borderRadius: 2,
                            bgcolor: "rgba(156,39,176,0.04)",
                           transition: "all 0.2s",
                            "&:hover": {
                              bgcolor: "rgba(156,39,176,0.08)",
                             transform: "translateX(8px)",
                            }
                          }}
                        >
                          <LocationOnIcon sx={{ color: "#9c27b0", fontSize: 24 }} />
                          <Box>
                            <Typography variant="body2" color="text.secondary" gutterBottom>
                              Address
                            </Typography>
                            <Typography variant="body1" fontWeight={500}>
                              {jobPostDetail?.location?.address || "Not updated"}
                            </Typography>
                          </Box>
                        </Box>
                      </Stack>
                    </Box>
                  </Grid>

                  <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                    <Box>
                      <Typography
                        variant="h5"
                        sx={{
                          fontSize: "1.3rem",
                          fontWeight: 700,
                          mb: 3,
                          "&::after": {
                            content: '""',
                            display: "block",
                            width: "50px", 
                            height: "3px",
                            background: "#9c27b0",
                            borderRadius: "2px",
                            mt: 1,
                          },
                        }}
                      >
                        Map
                      </Typography>
                      <Box sx={{ 
                        borderRadius: 2,
                        overflow: "hidden",
                        boxShadow: "0 4px 12px rgba(0,0,0,0.08)"
                      }}>
                        <Map
                          title={jobPostDetail?.jobName}
                          subTitle={jobPostDetail?.location?.address}
                          latitude={jobPostDetail?.location?.lat}
                          longitude={jobPostDetail?.location?.lng}
                        />
                      </Box>
                    </Box>
                  </Grid>
                </Grid>
              </Card>
              {/* End: thong tin lien he */}
            </Grid>

            <Grid item xs={12} sm={12} md={4} lg={4} xl={4}>
              <Box sx={{ mb: 2 }}>
                <HiringCTA variant="card" />
              </Box>
              <Card sx={{ p: { xs: 1.5, sm: 1.5, md: 2, lg: 2, xl: 2 } }}>
                <Stack spacing={2}>
                  <Typography variant="h5">Similar Jobs in Rwanda</Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.6 }}>
                    Explore related roles from other employers hiring in similar fields.
                  </Typography>
                  <Box
                    sx={{ width: 120, height: 5, backgroundColor: "#441da0" }}
                  ></Box>
                  <Box>
                    {/* Start: FilterJobPostCard */}
                    <FilterJobPostCard
                      params={{
                        excludeSlug: jobPostDetail?.slug,
                      }}
                      fullWidth={true}
                    />
                    {/* End: FilterJobPostCard */}
                  </Box>
                  <Box sx={{ mt: 3 }}>
                    <Button
                      component={Link}
                      to={`/${ROUTES.JOB_SEEKER.CAREER_ADVICE}`}
                      variant="outlined"
                      fullWidth
                      sx={{ textTransform: "none" }}
                    >
                      Browse Career Advice Articles
                    </Button>
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
        onClose={() => setOpenSharePopup(false)}
        shareData={shareData}
      />
      {/* End: SocialNetworkSharingPopup */}
    </>
  );
};

export default JobDetailPage;
