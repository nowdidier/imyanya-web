import React from "react";
import { useSelector } from "react-redux";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import dayjs from "dayjs";
import {
  Alert,
  AlertTitle,
  Box,
  Breadcrumbs,
  Button,
  Card,
  Chip,
  Dialog,
  DialogContent,
  Divider,
  Grid,
  IconButton,
  Skeleton,
  Stack,
  Tab,
  Tabs,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
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
import LoginIcon from "@mui/icons-material/Login";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import SearchIcon from "@mui/icons-material/Search";
import MapIcon from "@mui/icons-material/Map";

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
import companyService from "../../../services/companyService";
import ApplyCard from "../../../components/ApplyCard";
import OrganisationImagesCard from "../../../components/OrganisationImagesCard";
import SocialNetworkSharingPopup from "../../../components/SocialNetworkSharingPopup/SocialNetworkSharingPopup";
import FilterJobPostCard from "../../components/defaults/FilterJobPostCard";
import { ROLES_NAME, ROUTES } from "../../../configs/constants";
import {
  getRedirectParam,
  toWwwUrl,
  buildJobApplicationMessage,
  buildMailtoUrl,
  buildWhatsAppUrl,
} from "../../../utils/funcUtils";
import { buildJobShareData } from "../../../utils/shareUtils";
import useJobImage from "../../../hooks/useJobImage";
import { searchImagesMulti } from "../../../utils/jobImageSearch";
import HiringCTA from "../../../components/HiringCTA";
import { setContentNoindex } from "../../../components/SeoManager/contentFlag";
import { setJobSeo } from "../../../components/SeoManager/jobSeoFlag";
import { rwandaCareerCategoryGuides } from "../../../data/rwandaCareerContent";
import PersonIcon from "@mui/icons-material/Person";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";

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

// Single shared contact row: icon badge + label/value + actions.
const ContactRow = ({ icon, label, value, actions }) => (
  <Box
    sx={{
      display: "flex",
      alignItems: "center",
      gap: 2,
      p: 2,
      borderRadius: 2,
      border: "1px solid #e8eaed",
      bgcolor: "white",
      flexWrap: "wrap",
      transition: "border-color 0.2s",
      "&:hover": { borderColor: "#1a73e8" },
    }}
  >
    <Box
      sx={{
        width: 42,
        height: 42,
        borderRadius: 2,
        bgcolor: "#e8f0fe",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexShrink: 0,
      }}
    >
      {icon}
    </Box>
    <Box sx={{ flex: 1, minWidth: 170 }}>
      <Typography
        variant="caption"
        sx={{
          display: "block",
          fontWeight: 700,
          fontSize: 11,
          letterSpacing: 0.6,
          textTransform: "uppercase",
          color: "#5f6368",
          mb: 0.25,
        }}
      >
        {label}
      </Typography>
      <Typography
        variant="body1"
        fontWeight={600}
        sx={{ color: "#202124", wordBreak: "break-word" }}
      >
        {value || "Not updated"}
      </Typography>
    </Box>
    {actions && (
      <Stack direction="row" spacing={1} alignItems="center" sx={{ flexWrap: "wrap", rowGap: 1 }}>
        {actions}
      </Stack>
    )}
  </Box>
);

// Single shared section heading so every card on the page looks organized.
const SectionTitle = ({ children, sx = {} }) => (
  <Typography
    variant="h2"
    sx={{
      fontSize: "1.15rem",
      fontWeight: 700,
      color: "#202124",
      mb: 2,
      "&::after": {
        content: '""',
        display: "block",
        width: "44px",
        height: "3px",
        background: "#1a73e8",
        borderRadius: "2px",
        mt: 1,
      },
      ...sx,
    }}
  >
    {children}
  </Typography>
);

const ActionComponent = ({
  isApplied,
  isSaved,
  isLoadingSave,
  handleSave,
  handleShowApplyForm,
  handleSignIn,
  companyWebsiteUrl,
  imageSearchName,
  companyName = "",
  employerImages = [],
  setOpenSharePopup,
  isAuthenticated,
  currentUser,
  shareLabel = "Share job",
}) => {
  const isJobSeeker =
    isAuthenticated && currentUser?.roleName === ROLES_NAME.JOB_SEEKER;

  // Google Jobs style: solid blue Apply, outlined Save/External, icon Share.
  return (
    <Stack spacing={1.5}>
      {!isJobSeeker && (
        <OrganisationImagesCard
          name={imageSearchName}
          secondaryName={companyName}
          employerImages={employerImages}
        />
      )}

      <Stack
        direction="row"
        spacing={1.5}
        sx={{ flexWrap: "wrap", rowGap: 1.5, alignItems: "center" }}
      >
        {isJobSeeker ? (
          <Button
            variant="contained"
            size="large"
            sx={{
              textTransform: "none",
              borderRadius: "20px",
              px: 4,
              fontWeight: 600,
              backgroundColor: "#1a73e8",
              boxShadow: "none",
              "&:hover": { backgroundColor: "#1b66c9", boxShadow: "none" },
              "&.Mui-disabled": { backgroundColor: "#e8f0fe", color: "#1a73e8" },
            }}
            disabled={isApplied}
            onClick={handleShowApplyForm}
          >
            {isApplied ? "Applied" : "Apply on Imyanya"}
          </Button>
        ) : (
          <Button
            variant="contained"
            size="large"
            startIcon={<LoginIcon />}
            sx={{
              textTransform: "none",
              borderRadius: "20px",
              px: 3,
              fontWeight: 600,
              backgroundColor: "#1a73e8",
              boxShadow: "none",
              "&:hover": { backgroundColor: "#1b66c9", boxShadow: "none" },
            }}
            onClick={handleSignIn}
          >
            Sign in to apply
          </Button>
        )}

        {isJobSeeker && (
          <LoadingButton
            onClick={handleSave}
            startIcon={isSaved ? <FavoriteIcon /> : <FavoriteBorderIcon />}
            loading={isLoadingSave}
            loadingPosition="start"
            variant="outlined"
            size="large"
            sx={{
              textTransform: "none",
              borderRadius: "20px",
              px: 3,
              fontWeight: 600,
              borderColor: "#dadce0",
              color: isSaved ? "#1a73e8" : "#3c4043",
              backgroundColor: isSaved ? "#e8f0fe" : "white",
              "&:hover": { borderColor: "#1a73e8", backgroundColor: "#f6fafe" },
            }}
          >
            <span>{isSaved ? "Saved" : "Save"}</span>
          </LoadingButton>
        )}

        {companyWebsiteUrl && (
          <Button
            variant="outlined"
            size="large"
            component="a"
            href={companyWebsiteUrl}
            target="_blank"
            rel="noopener noreferrer"
            endIcon={<OpenInNewIcon sx={{ fontSize: 16 }} />}
            sx={{
              textTransform: "none",
              borderRadius: "20px",
              px: 3,
              fontWeight: 600,
              borderColor: "#dadce0",
              color: "#1a73e8",
              "&:hover": { borderColor: "#1a73e8", backgroundColor: "#f6fafe" },
            }}
          >
            Apply on company site
          </Button>
        )}

        <Button
          variant="text"
          size="large"
          startIcon={<ShareIcon />}
          sx={{
            textTransform: "none",
            borderRadius: "20px",
            px: 2,
            fontWeight: 600,
            color: "#1a73e8",
            "&:hover": { backgroundColor: "#f6fafe" },
          }}
          onClick={() => setOpenSharePopup(true)}
        >
          {shareLabel}
        </Button>
      </Stack>
    </Stack>
  );
};

// Website resolution: the Job Post's own website (typed in the job form)
// wins; the company profile website is only a fallback.
const fetchCompanyWebsiteUrl = async (jobData) => {
  const directUrl =
    toWwwUrl(jobData?.websiteUrl) ||
    toWwwUrl(jobData?.companyDict?.websiteUrl);
  if (directUrl) return directUrl;

  if (!jobData?.companyDict?.slug) return null;

  try {
    const resData = await companyService.getCompanyDetailById(
      jobData.companyDict.slug
    );
    return toWwwUrl(resData.data?.websiteUrl) || null;
  } catch (error) {
    return null;
  }
};

const JobDetailPage = () => {
  const { slug } = useParams();
  const nav = useNavigate();
  const location = useLocation();
  const { allConfig } = useSelector((state) => state.config);
  const { isAuthenticated, currentUser } = useSelector((state) => state.user);
  const [openSharePopup, setOpenSharePopup] = React.useState(false);
  const [openCoverLightbox, setOpenCoverLightbox] = React.useState(false);
  const [openPopup, setOpenPopup] = React.useState(false);
  const [isApplySucces, setIsApplySuccess] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(true);
  const [isLoadingSave, setIsLoadingSave] = React.useState(false);
  const [jobPostDetail, setJobPostDetail] = React.useState(null);
  const [companyWebsiteUrl, setCompanyWebsiteUrl] = React.useState(null);
  const [activeTab, setActiveTab] = React.useState(0);
  const [logoImages, setLogoImages] = React.useState([]);
  const [isLoadingLogos, setIsLoadingLogos] = React.useState(false);
  const coverSrc = useJobImage({
    title: jobPostDetail?.jobName,
    coverImageUrl: jobPostDetail?.imageUrl,
    description: jobPostDetail?.jobDescription,
  });
  // Search-engine queries: the job title first, then the company / contact
  // person name — so previews relate to both, never just one generic term.
  const logoQuery = React.useMemo(
    () => String(jobPostDetail?.jobName || "").trim(),
    [jobPostDetail]
  );
  const secondaryLogoQuery = React.useMemo(
    () =>
      String(
        jobPostDetail?.companyDict?.companyName ||
          jobPostDetail?.contactPersonName ||
          ""
      ).trim(),
    [jobPostDetail]
  );

  // Employer-uploaded assets shown first in the Logos tab.
  const employerLogos = React.useMemo(() => {
    const list = [];
    if (jobPostDetail?.companyDict?.companyImageUrl) {
      list.push({
        thumbUrl: jobPostDetail.companyDict.companyImageUrl,
        pageUrl: companyWebsiteUrl || "",
        label: "Company logo",
      });
    }
    if (jobPostDetail?.imageUrl && jobPostDetail.imageUrl !== jobPostDetail?.companyDict?.companyImageUrl) {
      list.push({
        thumbUrl: jobPostDetail.imageUrl,
        pageUrl: "",
        label: "Job cover",
      });
    }
    return list;
  }, [jobPostDetail, companyWebsiteUrl]);

  // Fetch all related logos/images from free search engines (Wikimedia Commons + Openverse).
  React.useEffect(() => {
    if (!logoQuery && !secondaryLogoQuery) {
      setLogoImages([]);
      return undefined;
    }
    let isMounted = true;
    setIsLoadingLogos(true);
    searchImagesMulti([logoQuery, secondaryLogoQuery], 10)
      .then((results) => {
        if (isMounted) setLogoImages(Array.isArray(results) ? results : []);
      })
      .catch(() => {
        if (isMounted) setLogoImages([]);
      })
      .finally(() => {
        if (isMounted) setIsLoadingLogos(false);
      });
    return () => {
      isMounted = false;
    };
  }, [logoQuery, secondaryLogoQuery]);

  const googleImagesUrl = logoQuery
    ? `https://www.google.com/search?tbm=isch&q=${encodeURIComponent(logoQuery)}`
    : "";

  // Frontend-only expiry status for banner + sticky bar (no backend change).
  const daysLeft = React.useMemo(() => {
    if (!jobPostDetail?.deadline) return null;
    return dayjs(jobPostDetail.deadline).endOf("day").diff(dayjs().startOf("day"), "day");
  }, [jobPostDetail]);
  const isExpired = daysLeft !== null && daysLeft < 0;
  const isClosingSoon = daysLeft !== null && daysLeft >= 0 && daysLeft <= 3;

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
        // Expired posts must not stay indexed: Google drops them via
        // validThrough, and we noindex so search results stay fresh.
        // Frontend-only: no backend change, display banner handles UX.
        if (!data) {
          setContentNoindex("not-found");
        } else if (data?.deadline && dayjs(data.deadline).endOf("day").isBefore(dayjs())) {
          setContentNoindex("expired");
        } else {
          setContentNoindex(null);
        }

        fetchCompanyWebsiteUrl(data).then((websiteUrl) => {
          if (websiteUrl) setCompanyWebsiteUrl(websiteUrl);
        });

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
      setJobPostDetail((prev) =>
        prev ? { ...prev, isApplied: true } : prev
      );
    }
  }, [isApplySucces]);

  React.useEffect(() => {
    return () => {
      setJobSeo(null);
    };
  }, []);

  // Google for Jobs structured data. Must satisfy required properties:
  // title, description (full), datePosted, hiringOrganization, jobLocation.
  // See https://developers.google.com/search/docs/appearance/structured-data/job-posting
  React.useEffect(() => {
    if (!jobPostDetail) return undefined;

    const stripHtml = (html = "") =>
      String(html || "")
        .replace(/<[^>]*>/g, " ")
        .replace(/\s+/g, " ")
        .trim();

    // Google Jobs accepts only these employmentType values. Return undefined
    // when unknown so we don't emit a misleading type.
    const mapJobTypeToGoogleSchema = (label = "") => {
      const normalized = String(label || "").toUpperCase().replace(/[\s-]+/g, "_");
      if (!normalized) return undefined;
      if (normalized.includes("FULL") || normalized.includes("PERMANENT"))
        return "FULL_TIME";
      if (normalized.includes("PART")) return "PART_TIME";
      if (normalized.includes("CONTRACT") || normalized.includes("FREELANCE"))
        return "CONTRACTOR";
      if (normalized.includes("TEMP")) return "TEMPORARY";
      if (normalized.includes("INTERN")) return "INTERN";
      if (normalized.includes("VOLUNT")) return "VOLUNTEER";
      if (normalized.includes("PER_DIEM") || normalized.includes("PERDIEM") || normalized.includes("CASUAL"))
        return "PER_DIEM";
      return undefined;
    };

    const toDateOnly = (value) => {
      if (!value) return undefined;
      const d = dayjs(value);
      return d.isValid() ? d.format("YYYY-MM-DD") : undefined;
    };

    const cityName =
      allConfig?.cityDict[jobPostDetail?.location?.city] ||
      jobPostDetail?.location?.address ||
      "Rwanda";
    const streetAddress = String(jobPostDetail?.location?.address || "").trim() || undefined;

    // Do NOT overwrite address: keep locality + country (required by Google).
    const jobLocation = {
      "@type": "Place",
      address: {
        "@type": "PostalAddress",
        ...(streetAddress ? { streetAddress } : {}),
        addressLocality: cityName,
        addressRegion: cityName,
        addressCountry: "RW",
      },
      ...(jobPostDetail?.location?.lat && jobPostDetail?.location?.lng
        ? {
            geo: {
              "@type": "GeoCoordinates",
              latitude: Number(jobPostDetail.location.lat),
              longitude: Number(jobPostDetail.location.lng),
            },
          }
        : {}),
    };

    // Full description: Google requires the complete job description,
    // including requirements and benefits - not a truncated summary.
    const fullDescription = [
      stripHtml(jobPostDetail?.jobDescription),
      stripHtml(jobPostDetail?.jobRequirement)
        ? `Requirements: ${stripHtml(jobPostDetail.jobRequirement)}`
        : "",
      stripHtml(jobPostDetail?.benefitsEnjoyed)
        ? `Benefits: ${stripHtml(jobPostDetail.benefitsEnjoyed)}`
        : "",
    ]
      .filter(Boolean)
      .join("\n\n");

    const canonicalJobUrl = `https://imyanya.rw/viec-lam/${jobPostDetail?.slug || slug}`;
    const employmentType = mapJobTypeToGoogleSchema(
      allConfig?.jobTypeDict[jobPostDetail?.jobType]
    );
    const workplaceLabel = String(
      allConfig?.typeOfWorkplaceDict?.[jobPostDetail?.typeOfWorkplace] || ""
    ).toLowerCase();
    const isRemote = workplaceLabel.includes("remote") || workplaceLabel.includes("home");

    const schema = {
      "@context": "https://schema.org",
      "@type": "JobPosting",
      title: String(jobPostDetail?.jobName || "").trim() || undefined,
      description: fullDescription || undefined,
      inLanguage: "en",
      mainEntityOfPage: {
        "@type": "WebPage",
        "@id": canonicalJobUrl,
      },
      identifier: {
        "@type": "PropertyValue",
        name: "Imyanya",
        value: String(jobPostDetail?.id || jobPostDetail?.slug || slug),
      },
      datePosted: toDateOnly(jobPostDetail?.createAt),
      ...(jobPostDetail?.deadline
        ? { validThrough: dayjs(jobPostDetail.deadline).format("YYYY-MM-DDTHH:mm:ssZ") }
        : {}),
      ...(employmentType ? { employmentType } : {}),
      ...(isRemote ? { jobLocationType: "TELECOMMUTE" } : {}),
      hiringOrganization: {
        "@type": "Organization",
        name: String(jobPostDetail?.companyDict?.companyName || "").trim() || "Employer",
        ...(jobPostDetail?.companyDict?.companyImageUrl
          ? { logo: jobPostDetail.companyDict.companyImageUrl }
          : {}),
        ...(jobPostDetail?.companyDict?.slug
          ? { sameAs: `https://imyanya.rw/companies/${jobPostDetail.companyDict.slug}` }
          : {}),
      },
      jobLocation,
      applicantLocationRequirements: {
        "@type": "Country",
        name: "Rwanda",
      },
      ...(jobPostDetail?.salaryMin || jobPostDetail?.salaryMax
        ? {
            baseSalary: {
              "@type": "MonetaryAmount",
              currency: "RWF",
              value: {
                "@type": "QuantitativeValue",
                ...(jobPostDetail?.salaryMin ? { minValue: Number(jobPostDetail.salaryMin) } : {}),
                ...(jobPostDetail?.salaryMax ? { maxValue: Number(jobPostDetail.salaryMax) } : {}),
                unitText: "MONTH",
              },
            },
          }
        : {}),
      ...(stripHtml(jobPostDetail?.jobRequirement)
        ? { qualifications: stripHtml(jobPostDetail.jobRequirement) }
        : {}),
      ...(stripHtml(jobPostDetail?.benefitsEnjoyed)
        ? { benefits: stripHtml(jobPostDetail.benefitsEnjoyed) }
        : {}),
      ...(jobPostDetail?.experience && allConfig?.experienceDict?.[jobPostDetail.experience]
        ? {
            experienceRequirements: {
              "@type": "OccupationalExperience",
              monthsOfExperience: undefined,
              description: allConfig.experienceDict[jobPostDetail.experience],
            },
          }
        : {}),
      ...(jobPostDetail?.academicLevel && allConfig?.academicLevelDict?.[jobPostDetail.academicLevel]
        ? {
            educationRequirements: {
              "@type": "EducationalOccupationalCredential",
              credentialCategory: allConfig.academicLevelDict[jobPostDetail.academicLevel],
            },
          }
        : {}),
      ...(jobPostDetail?.career && allConfig?.careerDict?.[jobPostDetail.career]
        ? { occupationalCategory: allConfig.careerDict[jobPostDetail.career] }
        : {}),
      directApply: Boolean(jobPostDetail?.id),
    };

    const upsertSchema = (id, data) => {
      let el = document.getElementById(id);
      if (!el) {
        el = document.createElement("script");
        el.type = "application/ld+json";
        el.id = id;
        document.head.appendChild(el);
      }
      el.textContent = JSON.stringify(data);
    };

    upsertSchema("imyanya-jobposting-schema", schema);

    // BreadcrumbList helps Google understand page hierarchy.
    upsertSchema("imyanya-job-breadcrumb-schema", {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: "https://imyanya.rw/",
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "Jobs in Rwanda",
          item: "https://imyanya.rw/jobs-in-rwanda",
        },
        {
          "@type": "ListItem",
          position: 3,
          name: String(jobPostDetail?.jobName || "Job"),
          item: canonicalJobUrl,
        },
      ],
    });

    return () => {
      document.getElementById("imyanya-jobposting-schema")?.remove();
      document.getElementById("imyanya-job-breadcrumb-schema")?.remove();
    };
  }, [jobPostDetail, allConfig, slug]);

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

  const handleSignIn = () => {
    nav(`/${ROUTES.AUTH.LOGIN}${getRedirectParam(location.pathname)}`);
  };

  const isJobSeekerUser =
    isAuthenticated && currentUser?.roleName === ROLES_NAME.JOB_SEEKER;

  const applicationMessage = buildJobApplicationMessage({
    jobTitle: jobPostDetail?.jobName,
    jobUrl: shareUrl,
    fullName: isJobSeekerUser ? currentUser?.fullName : "",
    email: isJobSeekerUser ? currentUser?.email : "",
    phone: isJobSeekerUser ? currentUser?.jobSeekerProfile?.phone : "",
  });

  const handleSendApplicationToEmail = () => {
    const url = buildMailtoUrl(
      jobPostDetail?.contactPersonEmail,
      `Job application: ${jobPostDetail?.jobName || "this job"}`,
      applicationMessage
    );

    if (!url) {
      toastMessages.warn(
        "This job has no contact email address for email applications."
      );
      return;
    }

    window.location.href = url;
  };

  const handleSendApplicationToWhatsApp = () => {
    const url = buildWhatsAppUrl(
      jobPostDetail?.contactPersonPhone,
      applicationMessage
    );

    if (!url) {
      toastMessages.warn(
        "This job has no contact phone number for WhatsApp applications."
      );
      return;
    }

    window.open(url, "_blank", "noopener,noreferrer");
    toastMessages.info(
      "WhatsApp opened with your application details. Press send to finish."
    );
  };

  // Searches the job title on Google (google.com), without restricting the
  // results to the company's own website.
  const handleSearchPositionOnline = () => {
    const query = (jobPostDetail?.jobName || "").trim();

    if (!query) {
      toastMessages.warn("This job has no title to search for.");
      return;
    }

    window.open(
      `https://www.google.com/search?q=${encodeURIComponent(query)}`,
      "_blank",
      "noopener,noreferrer"
    );
  };

  const handleCopyText = async (text, label = "Copied") => {
    if (!text) {
      toastMessages.warn("Nothing to copy yet.");
      return;
    }
    try {
      await navigator.clipboard.writeText(text);
      toastMessages.success(`${label} copied to clipboard.`);
    } catch (error) {
      toastMessages.warn("Copy failed. Please copy it manually.");
    }
  };

  const handleOpenLocationInGoogleMaps = () => {
    const jobLocation = jobPostDetail?.location;
    const query =
      jobLocation?.lat && jobLocation?.lng
        ? `${jobLocation.lat},${jobLocation.lng}`
        : jobLocation?.address || "";

    if (!query) {
      toastMessages.warn("This job has no location to open in Google Maps.");
      return;
    }

    window.open(
      `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
        query
      )}`,
      "_blank",
      "noopener,noreferrer"
    );
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
              {/* Breadcrumb: helps users + Google understand hierarchy */}
              <Breadcrumbs
                aria-label="breadcrumb"
                sx={{ mb: 1.5, fontSize: 13, color: "#5f6368" }}
              >
                <Typography
                  component={Link}
                  to="/"
                  sx={{ color: "#1a73e8", textDecoration: "none", fontSize: 13 }}
                >
                  Home
                </Typography>
                <Typography
                  component={Link}
                  to={`/${ROUTES.JOB_SEEKER.JOBS_EN}`}
                  sx={{ color: "#1a73e8", textDecoration: "none", fontSize: 13 }}
                >
                  Jobs in Rwanda
                </Typography>
                <Typography sx={{ fontSize: 13, color: "#5f6368" }} noWrap>
                  {jobPostDetail?.jobName}
                </Typography>
              </Breadcrumbs>
              {/* Expiry / closing banner: frontend-only miss, no backend change */}
              {isExpired && (
                <Alert severity="error" sx={{ mb: 1.5, borderRadius: 2 }}>
                  <AlertTitle>Applications closed</AlertTitle>
                  This post closed on {dayjs(jobPostDetail?.deadline).format("DD MMM YYYY")}.
                  Explore similar jobs in the sidebar.
                </Alert>
              )}
              {!isExpired && isClosingSoon && (
                <Alert severity="warning" sx={{ mb: 1.5, borderRadius: 2 }}>
                  <AlertTitle>
                    {daysLeft === 0 ? "Closes today — apply now" : `Closes in ${daysLeft} day${daysLeft === 1 ? "" : "s"}`}
                  </AlertTitle>
                  Deadline {dayjs(jobPostDetail?.deadline).format("DD MMM YYYY")}. Submit early;
                  late applications are rarely considered.
                </Alert>
              )}
              {/* Start: thong tin chung - Google Jobs style header */}
              <Card
                component="article"
                sx={{
                  py: 3,
                  px: { xs: 2, sm: 2.5, md: 3, lg: 3.5, xl: 3.5 },
                  border: "1px solid #dadce0",
                  borderRadius: 3,
                  boxShadow: "none",
                }}
              >
                <Stack>
                  <Box>
                    <Stack direction="row" alignItems="flex-start" spacing={2}>
                      <Box sx={{ flex: 1, minWidth: 0 }}>
                        <Typography
                          variant="h1"
                          sx={{
                            fontSize: { xs: 22, sm: 24, md: 26 },
                            fontWeight: 700,
                            color: "#202124",
                            lineHeight: 1.3,
                            mb: 0.5,
                          }}
                        >
                          {jobPostDetail?.jobName}
                        </Typography>
                        <Typography
                          variant="body1"
                          sx={{ color: "#3c4043", fontSize: 15, mb: 0.5 }}
                        >
                          <Box
                            component={Link}
                            to={`/companies/${jobPostDetail?.companyDict.slug}`}
                            sx={{
                              color: "#1a73e8",
                              textDecoration: "none",
                              fontWeight: 600,
                              "&:hover": { textDecoration: "underline" },
                            }}
                          >
                            {jobPostDetail?.companyDict.companyName}
                          </Box>
                          {" · "}
                          <Box
                            component={Link}
                            to={`/${ROUTES.JOB_SEEKER.JOBS_BY_CITY_EN}`}
                            sx={{
                              color: "#1a73e8",
                              textDecoration: "none",
                              "&:hover": { textDecoration: "underline" },
                            }}
                          >
                            {allConfig?.cityDict?.[jobPostDetail?.location?.city] ||
                              jobPostDetail?.location?.address ||
                              "Rwanda"}
                          </Box>
                        </Typography>
                        <Typography variant="body2" sx={{ color: "#5f6368", fontSize: 13 }}>
                          {allConfig?.employeeSizeDict?.[jobPostDetail?.companyDict.employeeSize]
                            ? `${allConfig.employeeSizeDict[jobPostDetail.companyDict.employeeSize]} · `
                            : ""}
                          Posted {dayjs(jobPostDetail?.createAt).format("DD MMM YYYY")} ·{" "}
                          {jobPostDetail?.views} views
                        </Typography>
                      </Box>
                      <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 1 }}>
                        <MuiImageCustom
                          width={104}
                          height={104}
                          src={jobPostDetail?.companyDict.companyImageUrl}
                          sx={{
                            bgcolor: "white",
                            borderRadius: 2,
                            border: "1px solid #dadce0",
                            p: 0.5,
                          }}
                        />
                        <Box sx={{ textAlign: "center" }}>
                          <Space direction="vertical" align="center">
                            <QRCode value={shareUrl || "-"} size={128} />
                          </Space>
                          <Typography
                            variant="caption"
                            color="text.secondary"
                            sx={{ display: "block", mt: 0.5, fontSize: 11 }}
                          >
                            Scan to open this job
                          </Typography>
                          <Button
                            size="small"
                            variant="outlined"
                            startIcon={<SearchIcon sx={{ fontSize: 14 }} />}
                            onClick={handleSearchPositionOnline}
                            sx={{
                              mt: 1,
                              textTransform: "none",
                              fontWeight: 600,
                              borderRadius: 999,
                              borderColor: "#dadce0",
                            }}
                          >
                            Search this position online
                          </Button>
                        </Box>
                      </Box>
                    </Stack>
                  </Box>
                  {coverSrc && (
                    <Box
                      onClick={() => setOpenCoverLightbox(true)}
                      sx={{
                        cursor: "zoom-in",
                        overflow: "hidden",
                        mt: 2,
                        border: "1px solid #dadce0",
                        borderRadius: 3,
                        boxShadow: "none",
                        "& img": {
                          width: "100%",
                          maxHeight: 320,
                          objectFit: "cover",
                          transition: "transform 0.35s ease",
                        },
                        "&:hover img": {
                          transform: "scale(1.04)",
                        },
                      }}
                    >
                      <Box
                        component="img"
                        src={coverSrc}
                        alt={jobPostDetail?.jobName}
                      />
                    </Box>
                  )}
                  <Dialog
                    open={openCoverLightbox}
                    onClose={() => setOpenCoverLightbox(false)}
                    maxWidth="lg"
                    fullWidth
                    PaperProps={{
                      sx: {
                        bgcolor: "transparent",
                        boxShadow: "none",
                        overflow: "visible",
                      },
                    }}
                  >
                    <IconButton
                      onClick={() => setOpenCoverLightbox(false)}
                      sx={{
                        position: "absolute",
                        top: 8,
                        right: 8,
                        bgcolor: "rgba(0,0,0,0.55)",
                        color: "white",
                        "&:hover": { bgcolor: "rgba(0,0,0,0.75)" },
                      }}
                    >
                      <CloseIcon />
                    </IconButton>
                    <DialogContent sx={{ p: 0 }}>
                      <Box
                        component="img"
                        src={coverSrc}
                        alt={jobPostDetail?.jobName}
                        sx={{
                          width: "100%",
                          maxHeight: "85vh",
                          objectFit: "contain",
                          borderRadius: 2,
                        }}
                      />
                    </DialogContent>
                  </Dialog>
                  <Divider sx={{ my: 2, borderColor: "#dadce0" }} />
                  <Box>
                    {/* Google Jobs style attribute chips */}
                    <Stack direction="row" spacing={1} sx={{ flexWrap: "wrap", rowGap: 1, mb: 1.5 }}>
                      {allConfig?.jobTypeDict?.[jobPostDetail?.jobType] && (
                        <Chip
                          label={allConfig.jobTypeDict[jobPostDetail.jobType]}
                          size="small"
                          sx={{ bgcolor: "#e8f0fe", color: "#1a73e8", fontWeight: 600 }}
                        />
                      )}
                      {allConfig?.typeOfWorkplaceDict?.[jobPostDetail?.typeOfWorkplace] && (
                        <Chip
                          label={allConfig.typeOfWorkplaceDict[jobPostDetail.typeOfWorkplace]}
                          size="small"
                          sx={{ bgcolor: "#e6f4ea", color: "#137333", fontWeight: 600 }}
                        />
                      )}
                      {allConfig?.careerDict?.[jobPostDetail?.career] && (
                        <Chip
                          component={Link}
                          to={`/${ROUTES.JOB_SEEKER.JOBS_BY_CAREER_EN}`}
                          clickable
                          label={allConfig.careerDict[jobPostDetail.career]}
                          size="small"
                          variant="outlined"
                          sx={{
                            borderColor: "#dadce0",
                            color: "#3c4043",
                            "&:hover": { borderColor: "#1a73e8", color: "#1a73e8" },
                          }}
                        />
                      )}
                      <Chip
                        icon={
                          <FontAwesomeIcon
                            icon={faCalendarDay}
                            style={{ fontSize: 12, color: "#5f6368" }}
                          />
                        }
                        label={`Apply by ${dayjs(jobPostDetail?.deadline).format("DD MMM YYYY")}`}
                        size="small"
                        variant="outlined"
                        sx={{ borderColor: "#dadce0", color: "#3c4043" }}
                      />
                      <DeadlineBadge deadline={jobPostDetail?.deadline} />
                    </Stack>

                    <Stack direction="row" spacing={2.5} sx={{ mb: 2, flexWrap: "wrap", rowGap: 0.5 }}>
                      <Typography
                        variant="body2"
                        sx={{ display: "flex", alignItems: "center", color: "#5f6368", fontSize: 13 }}
                      >
                        <FontAwesomeIcon icon={faEye} style={{ marginRight: 6, fontSize: 13 }} />
                        {jobPostDetail?.views} views
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{ display: "flex", alignItems: "center", color: "#5f6368", fontSize: 13 }}
                      >
                        <FontAwesomeIcon icon={faClockFour} style={{ marginRight: 6, fontSize: 13 }} />
                        Posted {dayjs(jobPostDetail?.createAt).format("DD MMM YYYY")}
                      </Typography>
                    </Stack>

                    <ActionComponent
                      isApplied={jobPostDetail.isApplied}
                      isSaved={jobPostDetail.isSaved}
                      isLoadingSave={isLoadingSave}
                    handleSave={handleSave}
                    handleShowApplyForm={handleShowApplyForm}
                    handleSignIn={handleSignIn}
                    companyWebsiteUrl={companyWebsiteUrl}
                    imageSearchName={jobPostDetail?.jobName || ""}
                    companyName={
                      jobPostDetail?.companyDict?.companyName ||
                      jobPostDetail?.contactPersonName ||
                      ""
                    }
                    employerImages={employerLogos}
                    setOpenSharePopup={setOpenSharePopup}
                    isAuthenticated={isAuthenticated}
                    currentUser={currentUser}
                    shareLabel="Share job"
                  />
                </Box>

                  <Divider sx={{ my: 2, borderColor: "#dadce0" }} />

                  {/* Job highlights - Google Jobs "Job details" panel style */}
                  <Box
                    sx={{
                      bgcolor: "#f8f9fa",
                      borderRadius: 2,
                      p: 2,
                      border: "1px solid #e8eaed",
                    }}
                  >
                    <Typography
                      variant="subtitle2"
                      sx={{ fontWeight: 700, color: "#202124", mb: 1.5, fontSize: 14 }}
                    >
                      Job highlights
                    </Typography>
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
                  </Box>
                </Stack>
              </Card>
              {/* End: thong tin chung */}

              {/* Start: Details / Logos tabs - Google Jobs style underline tabs */}
              <Card
                sx={{
                  mt: 2,
                  px: { xs: 1, sm: 1.5, md: 2, lg: 2, xl: 2 },
                  border: "1px solid #dadce0",
                  borderRadius: 3,
                  boxShadow: "none",
                  position: "sticky",
                  top: 8,
                  zIndex: 500,
                  bgcolor: "white",
                }}
              >
                <Tabs
                  value={activeTab}
                  onChange={(_, value) => setActiveTab(value)}
                  variant="scrollable"
                  scrollButtons="auto"
                  sx={{
                    "& .MuiTab-root": {
                      textTransform: "none",
                      fontWeight: 600,
                      color: "#5f6368",
                      minHeight: 48,
                    },
                    "& .Mui-selected": { color: "#1a73e8" },
                    "& .MuiTabs-indicator": { backgroundColor: "#1a73e8" },
                  }}
                >
                  <Tab label="Job details" />
                  <Tab
                    label={`Logos${logoImages.length + employerLogos.length ? ` (${logoImages.length + employerLogos.length})` : ""}`}
                  />
                </Tabs>
              </Card>
              {/* End: Details / Logos tabs */}

              {activeTab === 0 ? (
              <>
              {/* Start: mo ta chi tiet */}
              <Card
                sx={{
                  p: { xs: 2, md: 3 },
                  mt: 2,
                  border: "1px solid #dadce0",
                  borderRadius: 3,
                  boxShadow: "none",
                }}
              >
                <Stack spacing={4}>
                  {/* Job Description */}
                  <Box>
                    <SectionTitle>Job Description</SectionTitle>
                    <RichHtmlContent html={jobPostDetail?.jobDescription} />
                  </Box>

                  {/* Job Requirements */}
                  <Box>
                    <SectionTitle>Job Requirements</SectionTitle>
                    <RichHtmlContent html={jobPostDetail?.jobRequirement} />
                  </Box>

                  {/* Benefits */}
                  <Box>
                    <SectionTitle>Benefits</SectionTitle>
                    <RichHtmlContent html={jobPostDetail?.benefitsEnjoyed} />
                  </Box>

                  {/* Additional Information */}
                  <Box sx={{ mt: 2 }}>
                    <Grid container spacing={2}>
                      <Grid item xs={12} sm={6}>
                        {item(
                          "Occupation",
                          allConfig.careerDict[jobPostDetail?.career] ? (
                            <Typography
                              component={Link}
                              to={`/${ROUTES.JOB_SEEKER.JOBS_BY_CAREER_EN}`}
                              sx={{
                                fontWeight: "bold",
                                color: "primary.main",
                                textDecoration: "none",
                                "&:hover": { textDecoration: "underline" },
                              }}
                            >
                              {allConfig.careerDict[jobPostDetail?.career]}
                            </Typography>
                          ) : null
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
                          allConfig.cityDict[jobPostDetail?.location?.city] ? (
                            <Typography
                              component={Link}
                              to={`/${ROUTES.JOB_SEEKER.JOBS_BY_CITY_EN}`}
                              sx={{
                                fontWeight: "bold",
                                color: "primary.main",
                                textDecoration: "none",
                                "&:hover": { textDecoration: "underline" },
                              }}
                            >
                              {allConfig.cityDict[jobPostDetail?.location?.city]}
                            </Typography>
                          ) : null
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

              {/* Start: thong tin lien he */}
              <Card
                sx={{
                  p: { xs: 2, md: 3 },
                  mt: 2,
                  border: "1px solid #dadce0",
                  borderRadius: 3,
                  boxShadow: "none",
                }}
              >
                <Grid container spacing={4}>
                  <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                    <Box>
                      <SectionTitle>Contact Information</SectionTitle>
                      <Typography variant="body2" color="text.secondary" sx={{ mt: -1, mb: 2 }}>
                        Direct channels to ask about this role or send your application.
                      </Typography>

                      <Stack spacing={1.5}>
                        <ContactRow
                          icon={<PersonIcon sx={{ color: "#1a73e8", fontSize: 22 }} />}
                          label="Contact Person"
                          value={
                            <>
                              {jobPostDetail?.contactPersonName || "Not updated"}
                              {companyWebsiteUrl && (
                                <>
                                  {" — "}
                                  <Box
                                    component="a"
                                    href={companyWebsiteUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    sx={{
                                      color: "#1a73e8",
                                      fontWeight: 500,
                                      textDecoration: "none",
                                      "&:hover": { textDecoration: "underline" },
                                    }}
                                  >
                                    {companyWebsiteUrl.replace(
                                      /^https?:\/\//i,
                                      ""
                                    )}
                                  </Box>
                                </>
                              )}
                            </>
                          }
                        />

                        <ContactRow
                          icon={<EmailIcon sx={{ color: "#1a73e8", fontSize: 22 }} />}
                          label="Contact Email"
                          value={jobPostDetail?.contactPersonEmail}
                          actions={
                            <>
                              {jobPostDetail?.contactPersonEmail && (
                                <IconButton
                                  size="small"
                                  onClick={() => handleCopyText(jobPostDetail.contactPersonEmail, "Email")}
                                  sx={{ border: "1px solid #dadce0", borderRadius: 2 }}
                                  aria-label="Copy email"
                                >
                                  <ContentCopyIcon sx={{ fontSize: 16 }} />
                                </IconButton>
                              )}
                              <Button
                                size="small"
                                variant="outlined"
                                onClick={handleSendApplicationToEmail}
                                sx={{ textTransform: "none", fontWeight: 600, borderRadius: 999 }}
                              >
                                Send application
                              </Button>
                            </>
                          }
                        />

                        <ContactRow
                          icon={<PhoneIcon sx={{ color: "#1a73e8", fontSize: 22 }} />}
                          label="Phone Number"
                          value={jobPostDetail?.contactPersonPhone}
                          actions={
                            <>
                              {jobPostDetail?.contactPersonPhone && (
                                <IconButton
                                  size="small"
                                  onClick={() => handleCopyText(jobPostDetail.contactPersonPhone, "Phone number")}
                                  sx={{ border: "1px solid #dadce0", borderRadius: 2 }}
                                  aria-label="Copy phone number"
                                >
                                  <ContentCopyIcon sx={{ fontSize: 16 }} />
                                </IconButton>
                              )}
                              <Button
                                size="small"
                                variant="outlined"
                                color="success"
                                startIcon={<WhatsAppIcon sx={{ fontSize: 16 }} />}
                                onClick={handleSendApplicationToWhatsApp}
                                sx={{ textTransform: "none", fontWeight: 600, borderRadius: 999 }}
                              >
                                Apply via WhatsApp
                              </Button>
                            </>
                          }
                        />

                        <ContactRow
                          icon={<LocationOnIcon sx={{ color: "#1a73e8", fontSize: 22 }} />}
                          label="Address"
                          value={jobPostDetail?.location?.address}
                          actions={
                            jobPostDetail?.location?.address && (
                              <IconButton
                                size="small"
                                onClick={() => handleCopyText(jobPostDetail.location.address, "Address")}
                                sx={{ border: "1px solid #dadce0", borderRadius: 2 }}
                                aria-label="Copy address"
                              >
                                <ContentCopyIcon sx={{ fontSize: 16 }} />
                              </IconButton>
                            )
                          }
                        />

                      </Stack>
                    </Box>
                  </Grid>

                  <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                    <Box>
                      <SectionTitle sx={{ mb: 3 }}>Map</SectionTitle>
                      <Box sx={{
                        borderRadius: 2,
                        overflow: "hidden",
                        border: "1px solid #e8eaed",
                      }}>
                        <Map
                          title={jobPostDetail?.jobName}
                          subTitle={jobPostDetail?.location?.address}
                          latitude={jobPostDetail?.location?.lat}
                          longitude={jobPostDetail?.location?.lng}
                          height={420}
                        />
                      </Box>
                      <Box
                        sx={{
                          mt: 1.5,
                          p: 2,
                          borderRadius: 2,
                          border: "1px solid #e8eaed",
                          bgcolor: "white",
                        }}
                      >
                        <Stack
                          direction="row"
                          spacing={1.5}
                          alignItems="center"
                          justifyContent="space-between"
                          sx={{ flexWrap: "wrap", rowGap: 1 }}
                        >
                          <Stack direction="row" spacing={1.5} alignItems="center" sx={{ flex: 1, minWidth: 180 }}>
                            <LocationOnIcon sx={{ color: "#1a73e8", fontSize: 22 }} />
                            <Box>
                              <Typography
                                variant="caption"
                                sx={{
                                  display: "block",
                                  fontWeight: 700,
                                  fontSize: 11,
                                  letterSpacing: 0.6,
                                  textTransform: "uppercase",
                                  color: "#5f6368",
                                }}
                              >
                                Work location
                              </Typography>
                              <Typography variant="body2" fontWeight={600} sx={{ color: "#202124" }}>
                                {jobPostDetail?.location?.address || "Not updated"}
                                {allConfig?.cityDict?.[jobPostDetail?.location?.city]
                                  ? ` · ${allConfig.cityDict[jobPostDetail.location.city]}`
                                  : ""}
                              </Typography>
                            </Box>
                          </Stack>
                          <Stack direction="row" spacing={1}>
                            {jobPostDetail?.location?.address && (
                              <IconButton
                                size="small"
                                onClick={() => handleCopyText(jobPostDetail.location.address, "Address")}
                                sx={{ border: "1px solid #dadce0", borderRadius: 2 }}
                                aria-label="Copy address"
                              >
                                <ContentCopyIcon sx={{ fontSize: 16 }} />
                              </IconButton>
                            )}
                            <Button
                              size="small"
                              variant="outlined"
                              startIcon={<MapIcon sx={{ fontSize: 16 }} />}
                              onClick={handleOpenLocationInGoogleMaps}
                              sx={{ textTransform: "none", fontWeight: 600, borderRadius: 999 }}
                            >
                              Get directions
                            </Button>
                          </Stack>
                        </Stack>
                      </Box>
                    </Box>
                  </Grid>
                </Grid>
              </Card>
              {/* End: thong tin lien he */}

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
                      mt: 2,
                      p: { xs: 2, md: 3 },
                      border: "1px solid #dadce0",
                      borderRadius: 3,
                      boxShadow: "none",
                      bgcolor: "#f6fafe",
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

              {/* Start: Application Tips */}
              <Card
                sx={{
                  p: { xs: 2, md: 3 },
                  mt: 2,
                  border: "1px solid #dadce0",
                  borderRadius: 3,
                  boxShadow: "none",
                }}
              >
                <SectionTitle>Application Tips</SectionTitle>
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
                  p: { xs: 2, md: 3 },
                  mt: 2,
                  border: "1px solid #dadce0",
                  borderRadius: 3,
                  boxShadow: "none",
                }}
              >
                <SectionTitle>Salary and Career Context</SectionTitle>
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
              </>
              ) : (
              <>
              {/* Start: Logos tab - all logos from search engine */}
              <Card
                sx={{
                  mt: 2,
                  p: { xs: 2, md: 3 },
                  border: "1px solid #dadce0",
                  borderRadius: 3,
                  boxShadow: "none",
                }}
              >
                <Stack spacing={2}>
                  <Stack
                    direction="row"
                    alignItems="center"
                    justifyContent="space-between"
                    spacing={2}
                    sx={{ flexWrap: "wrap", rowGap: 1 }}
                  >
                    <Box>
                      <Typography variant="h5" sx={{ fontSize: "1.3rem", fontWeight: 700 }}>
                        Logos related to {logoQuery ? `"${logoQuery}"` : "this job"}
                        {secondaryLogoQuery ? ` & "${secondaryLogoQuery}"` : ""}
                      </Typography>
                      <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
                        Related to the job title
                        {secondaryLogoQuery ? " and the company / contact person" : ""} —
                        fetched from free image search engines for this job post.
                      </Typography>
                    </Box>
                    {googleImagesUrl && (
                      <Button
                        size="small"
                        variant="outlined"
                        component="a"
                        href={googleImagesUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        endIcon={<OpenInNewIcon />}
                        sx={{ textTransform: "none", fontWeight: 600 }}
                      >
                        Open in Google Images
                      </Button>
                    )}
                  </Stack>

                  {isLoadingLogos ? (
                    <Grid container spacing={2}>
                      {Array.from({ length: 8 }).map((_, index) => (
                        <Grid item xs={6} sm={4} md={3} key={index}>
                          <Skeleton variant="rounded" height={120} />
                        </Grid>
                      ))}
                    </Grid>
                  ) : employerLogos.length + logoImages.length === 0 ? (
                    <Typography variant="body2" color="text.secondary">
                      No logos found for this job yet.
                      {googleImagesUrl && " Try Google Images for the full result."}
                    </Typography>
                  ) : (
                    <>
                      <Grid container spacing={2}>
                        {employerLogos.map((logo) => (
                          <Grid item xs={6} sm={4} md={3} key={`employer-${logo.thumbUrl}`}>
                            <Box
                              component={logo.pageUrl ? "a" : "div"}
                              {...(logo.pageUrl
                                ? { href: logo.pageUrl, target: "_blank", rel: "noopener noreferrer" }
                                : {})}
                              sx={{
                                display: "block",
                                borderRadius: 2,
                                overflow: "hidden",
                                border: "1px solid",
                                borderColor: "grey.200",
                                bgcolor: "white",
                                p: 1,
                                textAlign: "center",
                              }}
                            >
                              <Box
                                component="img"
                                src={logo.thumbUrl}
                                alt={logo.label || logoQuery}
                                loading="lazy"
                                sx={{ width: "100%", height: 120, objectFit: "contain" }}
                              />
                              <Typography variant="caption" color="text.secondary">
                                {logo.label}
                              </Typography>
                            </Box>
                          </Grid>
                        ))}
                        {logoImages.map((image) => (
                          <Grid item xs={6} sm={4} md={3} key={image.thumbUrl}>
                            <Box
                              component="a"
                              href={image.pageUrl || googleImagesUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              title={`${logoQuery} — preview image`}
                              sx={{
                                display: "block",
                                borderRadius: 2,
                                overflow: "hidden",
                                border: "1px solid",
                                borderColor: "grey.200",
                                bgcolor: "white",
                                p: 1,
                                textAlign: "center",
                                "&:hover": { boxShadow: 1 },
                              }}
                            >
                              <Box
                                component="img"
                                src={image.thumbUrl}
                                alt={logoQuery}
                                loading="lazy"
                                onError={() =>
                                  setLogoImages((current) =>
                                    current.filter((item) => item.thumbUrl !== image.thumbUrl)
                                  )
                                }
                                sx={{ width: "100%", height: 120, objectFit: "contain" }}
                              />
                            </Box>
                          </Grid>
                        ))}
                      </Grid>
                      <Typography variant="caption" color="text.secondary">
                        Search previews from free image libraries (Wikimedia
                        Commons, Openverse). Click a logo to open its source page.
                      </Typography>
                    </>
                  )}
                </Stack>
              </Card>
              {/* End: Logos tab */}
              </>
              )}
            </Grid>

            <Grid item xs={12} sm={12} md={4} lg={4} xl={4}>
              <Box sx={{ mb: 2 }}>
                <HiringCTA variant="card" />
              </Box>
              <Card
                sx={{
                  p: { xs: 2, md: 3 },
                  border: "1px solid #dadce0",
                  borderRadius: 3,
                  boxShadow: "none",
                }}
              >
                <Stack spacing={2}>
                  <SectionTitle sx={{ mb: 0 }}>Similar Jobs in Rwanda</SectionTitle>
                  <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.6 }}>
                    Related roles from other employers hiring in similar fields.
                  </Typography>
                  <Box>
                    {/* Start: FilterJobPostCard */}
                    <FilterJobPostCard
                      params={{
                        excludeSlug: jobPostDetail?.slug,
                        careerId: jobPostDetail?.career,
                        cityId: jobPostDetail?.location?.city,
                      }}
                      fullWidth={true}
                    />
                    {/* End: FilterJobPostCard */}
                  </Box>
                  <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
                    <Typography
                      component={Link}
                      to={`/${ROUTES.JOB_SEEKER.JOBS_EN}`}
                      sx={{ fontSize: 13, fontWeight: 600 }}
                    >
                      All jobs in Rwanda
                    </Typography>
                    <Typography
                      component={Link}
                      to={`/${ROUTES.JOB_SEEKER.COMPANY_EN}`}
                      sx={{ fontSize: 13, fontWeight: 600 }}
                    >
                      Companies hiring
                    </Typography>
                    <Typography
                      component={Link}
                      to={`/${ROUTES.JOB_SEEKER.JOBS_BY_CAREER_EN}`}
                      sx={{ fontSize: 13, fontWeight: 600 }}
                    >
                      Jobs by career
                    </Typography>
                  </Stack>
                  <Box sx={{ mt: 3 }}>
                    <Button
                      component={Link}
                      to={`/${ROUTES.JOB_SEEKER.CAREER_TOOLS}`}
                      variant="contained"
                      fullWidth
                      sx={{
                        textTransform: "none",
                        fontWeight: 700,
                        borderRadius: "20px",
                        backgroundColor: "#1a73e8",
                        boxShadow: "none",
                        mb: 1.5,
                        "&:hover": { backgroundColor: "#1b66c9", boxShadow: "none" },
                      }}
                    >
                      CV yo mu Rwanda — Free Builders
                    </Button>
                    <Button
                      component={Link}
                      to={`/${ROUTES.JOB_SEEKER.CAREER_ADVICE}`}
                      variant="outlined"
                      fullWidth
                      sx={{ textTransform: "none", borderRadius: "20px" }}
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
        contactPhone={jobPostDetail?.contactPersonPhone}
        contactEmail={jobPostDetail?.contactPersonEmail}
        jobUrl={shareUrl}
      />
      {/* End: ApplyCard */}

      {/* Start: SocialNetworkSharingPopup */}
      <SocialNetworkSharingPopup
        open={openSharePopup}
        onClose={() => setOpenSharePopup(false)}
        shareData={shareData}
      />
      {/* End: SocialNetworkSharingPopup */}

      {/* Sticky mobile apply bar: frontend-only miss, no backend change */}
      {!isLoading && jobPostDetail && !isExpired && (
        <Box
          sx={{
            display: { xs: "flex", md: "none" },
            position: "fixed",
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 1100,
            gap: 1,
            alignItems: "center",
            px: 1.5,
            py: 1,
            pb: "calc(8px + env(safe-area-inset-bottom))",
            bgcolor: "white",
            borderTop: "1px solid #dadce0",
            boxShadow: "0 -2px 12px rgba(0,0,0,0.08)",
          }}
        >
          <Button
            variant="contained"
            fullWidth
            size="large"
            disabled={isJobSeekerUser && jobPostDetail?.isApplied}
            onClick={isJobSeekerUser ? handleShowApplyForm : handleSignIn}
            sx={{
              textTransform: "none",
              borderRadius: "20px",
              fontWeight: 700,
              backgroundColor: "#1a73e8",
              boxShadow: "none",
              "&:hover": { backgroundColor: "#1b66c9", boxShadow: "none" },
            }}
          >
            {isJobSeekerUser
              ? jobPostDetail?.isApplied
                ? "Applied"
                : "Apply now"
              : "Sign in to apply"}
          </Button>
          {isJobSeekerUser && (
            <LoadingButton
              onClick={handleSave}
              loading={isLoadingSave}
              variant="outlined"
              size="large"
              sx={{
                textTransform: "none",
                borderRadius: "20px",
                minWidth: 110,
                fontWeight: 600,
                borderColor: "#dadce0",
                color: jobPostDetail?.isSaved ? "#1a73e8" : "#3c4043",
                backgroundColor: jobPostDetail?.isSaved ? "#e8f0fe" : "white",
              }}
            >
              {jobPostDetail?.isSaved ? "Saved" : "Save"}
            </LoadingButton>
          )}
        </Box>
      )}
    </>
  );
};

export default JobDetailPage;
