import * as React from "react";
import { Link as RouterLink } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  Box,
  Button,
  Card,
  Divider,
  InputAdornment,
  Skeleton,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import WorkOutlineIcon from "@mui/icons-material/WorkOutline";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import ScheduleOutlinedIcon from "@mui/icons-material/ScheduleOutlined";
import PaymentsOutlinedIcon from "@mui/icons-material/PaymentsOutlined";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import CheckIcon from "@mui/icons-material/Check";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";

import jobService from "../../services/jobService";
import { ROUTES } from "../../configs/constants";
import RichHtmlContent from "../controls/RichHtmlContent";
import {
  JOBS_EXPLORER_FILTERS,
  buildGoogleJobsSearchUrl,
  buildJobHighlights,
  filterJobsList,
  formatCityWithCountry,
  formatDeadlineSummary,
  formatSalarySummary,
  getMonogramTone,
  resolveEmployerName,
  resolveJobCityName,
  sanitizeEmployerLogoUrl,
  sanitizeFallbackInitials,
} from "./jobsExplorerUtils";

const GoogleGMark = ({ size = 18 }) => (
  <Box
    component="svg"
    viewBox="0 0 24 24"
    aria-hidden="true"
    sx={{ width: size, height: size, flexShrink: 0, display: "block" }}
  >
    <path
      fill="#4285F4"
      d="M23.49 12.27c0-.79-.07-1.54-.19-2.27H12v4.51h6.47c-.29 1.48-1.14 2.73-2.4 3.58v3h3.86c2.26-2.09 3.56-5.17 3.56-8.82z"
    />
    <path
      fill="#34A853"
      d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.86-3c-1.08.72-2.45 1.16-4.07 1.16-3.13 0-5.78-2.11-6.73-4.96H1.29v3.09C3.26 21.3 7.31 24 12 24z"
    />
    <path
      fill="#FBBC05"
      d="M5.27 14.29c-.25-.72-.38-1.49-.38-2.29s.14-1.57.38-2.29V6.62H1.29C.47 8.24 0 10.06 0 12s.47 3.76 1.29 5.38l3.98-3.09z"
    />
    <path
      fill="#EA4335"
      d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.31 0 3.26 2.7 1.29 6.62l3.98 3.09c.95-2.85 3.6-4.96 6.73-4.96z"
    />
  </Box>
);

const CompanyLogoAvatar = ({ src, companyName }) => {
  const safeSrc = sanitizeEmployerLogoUrl(src);
  const [failed, setFailed] = React.useState(false);
  const initials = sanitizeFallbackInitials(companyName);
  const tone = getMonogramTone(companyName);

  React.useEffect(() => {
    setFailed(false);
  }, [safeSrc]);

  return (
    <Box
      sx={{
        position: "relative",
        width: 42,
        height: 42,
        borderRadius: 2,
        bgcolor: tone.bg,
        color: tone.fg,
        border: `1px solid ${tone.border}`,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontWeight: 800,
        fontSize: 13,
        letterSpacing: "0.02em",
        flexShrink: 0,
        overflow: "hidden",
      }}
    >
      <span aria-hidden="true">{initials}</span>
      {safeSrc && !failed && (
        <Box
          component="img"
          src={safeSrc}
          alt={companyName || "Employer logo"}
          loading="lazy"
          referrerPolicy="no-referrer"
          onError={() => setFailed(true)}
          sx={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            bgcolor: "#ffffff",
          }}
        />
      )}
    </Box>
  );
};

const JobsInRwandaExplorer = ({ compact = false, showViewAllLink = false }) => {
  const { allConfig } = useSelector((state) => state.config);
  const cityDict = React.useMemo(() => allConfig?.cityDict || {}, [allConfig]);
  const jobTypeDict = React.useMemo(
    () => allConfig?.jobTypeDict || {},
    [allConfig]
  );
  const workplaceDict = React.useMemo(
    () => allConfig?.typeOfWorkplaceDict || {},
    [allConfig]
  );
  const experienceDict = React.useMemo(
    () => allConfig?.experienceDict || {},
    [allConfig]
  );
  const academicLevelDict = React.useMemo(
    () => allConfig?.academicLevelDict || {},
    [allConfig]
  );

  const [jobs, setJobs] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [hasError, setHasError] = React.useState(false);
  const [query, setQuery] = React.useState("");
  const [activeFilter, setActiveFilter] = React.useState("all");
  const [selectedSlug, setSelectedSlug] = React.useState("");
  const [detailBySlug, setDetailBySlug] = React.useState({});
  const [isLoadingDetail, setIsLoadingDetail] = React.useState(false);
  const [copiedSlug, setCopiedSlug] = React.useState("");
  const detailPaneRef = React.useRef(null);
  const detailCacheRef = React.useRef(new Map());
  const copyTimerRef = React.useRef(null);

  const loadJobs = React.useCallback(async () => {
    setIsLoading(true);
    setHasError(false);
    try {
      const res = await jobService.getJobPosts({ page: 1, pageSize: 25 });
      const results = res?.data?.results || res?.data || [];
      const list = Array.isArray(results) ? results : [];
      setJobs(list);
      if (list.length > 0) {
        setSelectedSlug((prev) => prev || list[0].slug || "");
      }
    } catch (error) {
      setHasError(true);
    } finally {
      setIsLoading(false);
    }
  }, []);

  React.useEffect(() => {
    loadJobs();
    return () => {
      if (copyTimerRef.current) {
        window.clearTimeout(copyTimerRef.current);
      }
    };
  }, [loadJobs]);

  const filteredJobs = React.useMemo(
    () =>
      filterJobsList(jobs, {
        query,
        filterId: activeFilter,
        cityDict,
      }),
    [jobs, query, activeFilter, cityDict]
  );

  React.useEffect(() => {
    if (filteredJobs.length === 0) {
      setSelectedSlug("");
      return;
    }
    const stillVisible = filteredJobs.some((j) => j.slug === selectedSlug);
    if (!stillVisible) {
      setSelectedSlug(filteredJobs[0].slug || "");
    }
  }, [filteredJobs, selectedSlug]);

  const selectedJobSummary = React.useMemo(
    () => filteredJobs.find((j) => j.slug === selectedSlug) || null,
    [filteredJobs, selectedSlug]
  );

  React.useEffect(() => {
    if (!selectedSlug) return undefined;
    if (detailCacheRef.current.has(selectedSlug)) {
      return undefined;
    }
    let mounted = true;
    setIsLoadingDetail(true);
    jobService
      .getJobPostDetailById(selectedSlug)
      .then((res) => {
        if (!mounted) return;
        const detail = res?.data || res || null;
        if (detail) {
          detailCacheRef.current.set(selectedSlug, detail);
          setDetailBySlug((prev) => ({ ...prev, [selectedSlug]: detail }));
        }
      })
      .catch(() => {})
      .finally(() => {
        if (mounted) setIsLoadingDetail(false);
      });
    return () => {
      mounted = false;
    };
  }, [selectedSlug]);

  const selectedDetail =
    (selectedSlug && detailBySlug[selectedSlug]) || selectedJobSummary;

  const paneHeight = compact ? 460 : 560;
  const selectedCity = selectedDetail
    ? formatCityWithCountry(resolveJobCityName(selectedDetail, cityDict))
    : "Rwanda";
  const selectedEmployer = selectedDetail
    ? resolveEmployerName(selectedDetail)
    : "Rwanda Employer";
  const selectedHighlights = React.useMemo(
    () =>
      buildJobHighlights(selectedDetail, {
        jobTypeDict,
        workplaceDict,
        experienceDict,
        academicLevelDict,
      }),
    [
      selectedDetail,
      jobTypeDict,
      workplaceDict,
      experienceDict,
      academicLevelDict,
    ]
  );

  const handleSelectJob = (slug) => {
    setSelectedSlug(slug);
    if (typeof window !== "undefined" && window.innerWidth < 900) {
      detailPaneRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
      });
    }
  };

  const handleCopyJobLink = async () => {
    if (!selectedDetail?.slug || typeof window === "undefined") return;
    const shareUrl = `${window.location.origin}/viec-lam/${selectedDetail.slug}`;
    let copied = false;
    try {
      if (navigator?.clipboard?.writeText) {
        await navigator.clipboard.writeText(shareUrl);
        copied = true;
      }
    } catch (e) {
      copied = false;
    }

    if (!copied && typeof document !== "undefined") {
      try {
        const input = document.createElement("textarea");
        input.value = shareUrl;
        input.setAttribute("readonly", "");
        input.style.position = "fixed";
        input.style.opacity = "0";
        document.body.appendChild(input);
        input.select();
        copied = document.execCommand("copy");
        document.body.removeChild(input);
      } catch (e) {
        copied = false;
      }
    }

    if (copied) {
      setCopiedSlug(selectedDetail.slug);
      if (copyTimerRef.current) window.clearTimeout(copyTimerRef.current);
      copyTimerRef.current = window.setTimeout(() => setCopiedSlug(""), 2000);
    }
  };

  const handleReset = () => {
    setQuery("");
    setActiveFilter("all");
  };

  const isCopied = Boolean(selectedDetail?.slug && copiedSlug === selectedDetail.slug);
  const googleJobsQueryUrl = React.useMemo(
    () => buildGoogleJobsSearchUrl({ query, filterId: activeFilter }),
    [query, activeFilter]
  );
  const googleJobsRoleUrl = React.useMemo(
    () =>
      selectedDetail
        ? buildGoogleJobsSearchUrl({
            jobTitle: selectedDetail.jobName,
            employerName: selectedEmployer,
            cityName: selectedCity,
          })
        : googleJobsQueryUrl,
    [selectedDetail, selectedEmployer, selectedCity, googleJobsQueryUrl]
  );

  return (
    <Card
      component="section"
      aria-label="Jobs near Rwanda on Google Jobs"
      data-testid="jobs-in-rwanda-explorer"
      variant="outlined"
      sx={{
        borderRadius: 3,
        overflow: "hidden",
        borderColor: "#e2e0eb",
        bgcolor: "#ffffff",
        boxShadow: "0 6px 24px -12px rgba(68, 29, 160, 0.16)",
      }}
    >
      {/* Search & Filter Header */}
      <Box
        sx={{
          px: { xs: 2, sm: 2.5 },
          py: 2,
          bgcolor: "#faf9fe",
          borderBottom: "1px solid #e6e3f0",
        }}
      >
        <Stack
          direction={{ xs: "column", sm: "row" }}
          spacing={1.5}
          alignItems={{ xs: "flex-start", sm: "center" }}
          justifyContent="space-between"
        >
          <Stack direction="row" spacing={1.25} alignItems="center">
            <Box
              sx={{
                width: 34,
                height: 34,
                borderRadius: 2,
                bgcolor: "#ffffff",
                border: "1px solid #dadce0",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
              }}
            >
              <GoogleGMark size={18} />
            </Box>
            <Box>
              <Typography
                component="h2"
                variant="h6"
                fontWeight={800}
                sx={{ color: "#202124", lineHeight: 1.25 }}
              >
                Jobs near Rwanda · Google Jobs
              </Typography>
              <Typography variant="caption" sx={{ color: "#5f6368", display: "block" }}>
                Open vacancies in Kigali and across districts ·{" "}
                <Box component="span" sx={{ fontVariantNumeric: "tabular-nums" }}>
                  {filteredJobs.length}
                </Box>{" "}
                {filteredJobs.length === 1 ? "role" : "roles"} shown
              </Typography>
            </Box>
          </Stack>

          <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap sx={{ flexShrink: 0 }}>
            <Button
              component="a"
              href={googleJobsQueryUrl}
              target="_blank"
              rel="noopener noreferrer"
              variant="contained"
              size="small"
              endIcon={<OpenInNewIcon sx={{ fontSize: 15 }} />}
              sx={{
                textTransform: "none",
                fontWeight: 700,
                whiteSpace: "nowrap",
                flexShrink: 0,
                borderRadius: 2,
                px: 1.75,
                background: "#1a73e8",
                backgroundImage: "none",
                color: "#ffffff",
                boxShadow: "none",
                "&:hover": {
                  background: "#1558b0",
                  backgroundImage: "none",
                  boxShadow: "none",
                },
              }}
            >
              Open Google Jobs
            </Button>
            {showViewAllLink && (
              <Button
                component={RouterLink}
                to={`/${ROUTES.JOB_SEEKER.JOBS_EN}`}
                variant="outlined"
                size="small"
                endIcon={<ArrowForwardIcon sx={{ fontSize: 16 }} />}
                sx={{
                  textTransform: "none",
                  fontWeight: 700,
                  whiteSpace: "nowrap",
                  flexShrink: 0,
                  borderRadius: 2,
                  borderColor: "#d6d1e8",
                  color: "#441da0",
                  background: "#ffffff",
                  backgroundImage: "none",
                  "&:hover": {
                    borderColor: "#441da0",
                    background: "#f5f2ff",
                    backgroundImage: "none",
                  },
                }}
              >
                View all jobs
              </Button>
            )}
          </Stack>
        </Stack>

        <Stack
          direction={{ xs: "column", md: "row" }}
          spacing={1.25}
          alignItems={{ md: "center" }}
          sx={{ mt: 1.75 }}
        >
          <TextField
            size="small"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search role, employer, or city…"
            inputProps={{ "aria-label": "Search jobs in Rwanda" }}
            sx={{
              minWidth: { md: 280 },
              flex: { md: "0 0 295px" },
              "& .MuiOutlinedInput-root": {
                bgcolor: "#ffffff",
                borderRadius: 2,
              },
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon fontSize="small" sx={{ color: "#5f6368" }} />
                </InputAdornment>
              ),
            }}
          />

          <Stack
            direction="row"
            spacing={0.75}
            sx={{
              flex: 1,
              overflowX: "auto",
              pb: { xs: 0.25, md: 0 },
            }}
            role="group"
            aria-label="Filter jobs in Rwanda"
          >
            {JOBS_EXPLORER_FILTERS.map((item) => {
              const active = activeFilter === item.id;
              return (
                <Button
                  key={item.id}
                  type="button"
                  size="small"
                  variant="outlined"
                  aria-pressed={active}
                  onClick={() => setActiveFilter(item.id)}
                  sx={{
                    textTransform: "none",
                    fontWeight: active ? 700 : 600,
                    whiteSpace: "nowrap",
                    flexShrink: 0,
                    borderRadius: 2,
                    px: 1.75,
                    py: 0.6,
                    boxShadow: "none",
                    borderColor: active ? "#441da0" : "#dadce0",
                    background: active ? "#ede9fe" : "#ffffff",
                    backgroundImage: "none",
                    color: active ? "#441da0" : "#3c4043",
                    "&:hover": {
                      boxShadow: "none",
                      borderColor: "#441da0",
                      background: active ? "#ddd6fe" : "#f8f7fc",
                      backgroundImage: "none",
                    },
                  }}
                >
                  {item.label}
                </Button>
              );
            })}
          </Stack>
        </Stack>
      </Box>

      {/* Split-Pane Explorer Body */}
      {isLoading ? (
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", md: "40% 60%" },
            minHeight: paneHeight,
          }}
        >
          <Box sx={{ p: 2, borderRight: { md: "1px solid #e6e3f0" } }}>
            {[0, 1, 2, 3, 4].map((idx) => (
              <Box key={idx} sx={{ mb: 2 }}>
                <Skeleton variant="text" width="75%" height={24} />
                <Skeleton variant="text" width="55%" height={18} />
                <Skeleton variant="text" width="40%" height={16} />
              </Box>
            ))}
          </Box>
          <Box sx={{ p: 3 }}>
            <Skeleton variant="text" width="60%" height={36} />
            <Skeleton variant="text" width="40%" height={22} sx={{ mb: 2 }} />
            <Skeleton variant="rectangular" height={240} sx={{ borderRadius: 2 }} />
          </Box>
        </Box>
      ) : hasError ? (
        <Box sx={{ p: 4, textAlign: "center" }}>
          <WorkOutlineIcon sx={{ fontSize: 38, color: "#9aa0a6" }} />
          <Typography variant="subtitle1" fontWeight={700} sx={{ mt: 1, color: "#202124" }}>
            Unable to load live jobs right now
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5, mb: 2 }}>
            Please retry loading open vacancies in Rwanda.
          </Typography>
          <Button
            variant="contained"
            onClick={loadJobs}
            sx={{
              textTransform: "none",
              fontWeight: 700,
              background: "#441da0",
              backgroundImage: "none",
              color: "#ffffff",
              "&:hover": { background: "#351580", backgroundImage: "none" },
            }}
          >
            Retry
          </Button>
        </Box>
      ) : filteredJobs.length === 0 ? (
        <Box sx={{ p: 4, textAlign: "center" }}>
          <WorkOutlineIcon sx={{ fontSize: 38, color: "#9aa0a6" }} />
          <Typography variant="subtitle1" fontWeight={700} sx={{ mt: 1, color: "#202124" }}>
            No jobs match this view
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5, mb: 2 }}>
            Try another keyword or clear filters to see all available Rwanda vacancies.
          </Typography>
          <Button
            variant="contained"
            onClick={handleReset}
            sx={{
              textTransform: "none",
              fontWeight: 700,
              background: "#441da0",
              backgroundImage: "none",
              color: "#ffffff",
              "&:hover": { background: "#351580", backgroundImage: "none" },
            }}
          >
            Reset filters
          </Button>
        </Box>
      ) : (
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", md: "40% 60%" },
          }}
        >
          {/* Left Master List */}
          <Box
            role="region"
            aria-label="Jobs list"
            sx={{
              maxHeight: { xs: 320, md: paneHeight },
              overflowY: "auto",
              borderRight: { md: "1px solid #e6e3f0" },
              borderBottom: { xs: "1px solid #e6e3f0", md: "none" },
              bgcolor: "#ffffff",
            }}
          >
            {filteredJobs.map((job) => {
              const isSelected = job.slug === selectedSlug;
              const employerName = resolveEmployerName(job);
              const cityLabel = formatCityWithCountry(
                resolveJobCityName(job, cityDict)
              );
              const salaryText = formatSalarySummary(job.salaryMin, job.salaryMax);
              const deadlineText = formatDeadlineSummary(job.deadline);

              return (
                <Box
                  key={job.slug || job.id}
                  component="button"
                  type="button"
                  aria-pressed={isSelected}
                  onClick={() => handleSelectJob(job.slug)}
                  sx={{
                    width: "100%",
                    textAlign: "left",
                    border: 0,
                    borderBottom: "1px solid #eef0f3",
                    borderLeft: isSelected
                      ? "3px solid #441da0"
                      : "3px solid transparent",
                    p: 2,
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "flex-start",
                    gap: 1.5,
                    bgcolor: isSelected ? "#f5f2ff" : "#ffffff",
                    transition: "background-color 0.15s ease",
                    "&:hover": {
                      bgcolor: isSelected ? "#ede9fe" : "#f9f8fc",
                    },
                    "&:focus-visible": {
                      outline: "2px solid #441da0",
                      outlineOffset: "-2px",
                    },
                  }}
                >
                  <CompanyLogoAvatar
                    src={job?.companyDict?.companyImageUrl}
                    companyName={employerName}
                  />
                  <Box sx={{ minWidth: 0, flex: 1 }}>
                    <Typography
                      variant="subtitle2"
                      fontWeight={700}
                      sx={{
                        color: isSelected ? "#441da0" : "#202124",
                        lineHeight: 1.35,
                        display: "-webkit-box",
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: "vertical",
                        overflow: "hidden",
                      }}
                    >
                      {job.jobName}
                    </Typography>
                    <Typography
                      variant="body2"
                      noWrap
                      sx={{ color: "#3c4043", fontSize: 13, fontWeight: 500, mt: 0.25 }}
                    >
                      {employerName}
                    </Typography>
                    <Stack
                      direction="row"
                      spacing={1.25}
                      useFlexGap
                      flexWrap="wrap"
                      alignItems="center"
                      sx={{ mt: 0.6, color: "#5f6368", fontVariantNumeric: "tabular-nums" }}
                    >
                      <Stack direction="row" spacing={0.4} alignItems="center">
                        <LocationOnOutlinedIcon sx={{ fontSize: 14 }} />
                        <Typography variant="caption">{cityLabel}</Typography>
                      </Stack>
                      {deadlineText && (
                        <Stack direction="row" spacing={0.4} alignItems="center">
                          <ScheduleOutlinedIcon sx={{ fontSize: 14 }} />
                          <Typography variant="caption">{deadlineText}</Typography>
                        </Stack>
                      )}
                      {salaryText && (
                        <Stack direction="row" spacing={0.4} alignItems="center">
                          <PaymentsOutlinedIcon sx={{ fontSize: 14 }} />
                          <Typography variant="caption">{salaryText}</Typography>
                        </Stack>
                      )}
                      {job.isUrgent && (
                        <Typography
                          variant="caption"
                          sx={{ color: "#b91c1c", fontWeight: 700 }}
                        >
                          Urgent
                        </Typography>
                      )}
                    </Stack>
                  </Box>
                </Box>
              );
            })}
          </Box>

          {/* Right Detail Pane */}
          <Box
            ref={detailPaneRef}
            role="region"
            aria-label="Selected job details"
            sx={{
              maxHeight: { xs: "none", md: paneHeight },
              overflowY: { md: "auto" },
              p: { xs: 2, sm: 3 },
              bgcolor: "#ffffff",
            }}
          >
            {selectedDetail && (
              <>
                <Stack direction="row" spacing={1.5} alignItems="flex-start">
                  <CompanyLogoAvatar
                    src={
                      selectedDetail?.companyDict?.companyImageUrl ||
                      selectedJobSummary?.companyDict?.companyImageUrl
                    }
                    companyName={selectedEmployer}
                  />
                  <Box sx={{ minWidth: 0, flex: 1 }}>
                    <Typography
                      component="h3"
                      variant="h5"
                      fontWeight={800}
                      sx={{
                        color: "#202124",
                        lineHeight: 1.25,
                        textWrap: "balance",
                      }}
                    >
                      {selectedDetail.jobName}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{ color: "#3c4043", fontWeight: 600, mt: 0.5 }}
                    >
                      {selectedEmployer} · {selectedCity}
                    </Typography>
                  </Box>
                </Stack>

                <Stack
                  direction="row"
                  spacing={1.25}
                  useFlexGap
                  sx={{ mt: 2, mb: 2.5, flexWrap: "wrap" }}
                >
                  <Button
                    component={RouterLink}
                    to={`/viec-lam/${selectedDetail.slug}`}
                    variant="contained"
                    endIcon={<ArrowForwardIcon sx={{ fontSize: 16 }} />}
                    sx={{
                      textTransform: "none",
                      fontWeight: 700,
                      borderRadius: 2,
                      px: 2.5,
                      background: "#441da0",
                      backgroundImage: "none",
                      color: "#ffffff",
                      boxShadow: "none",
                      "&:hover": {
                        background: "#351580",
                        backgroundImage: "none",
                        boxShadow: "none",
                      },
                    }}
                  >
                    Apply now
                  </Button>
                  <Button
                    component="a"
                    href={googleJobsRoleUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    variant="outlined"
                    endIcon={<OpenInNewIcon sx={{ fontSize: 15 }} />}
                    sx={{
                      textTransform: "none",
                      fontWeight: 700,
                      borderRadius: 2,
                      borderColor: "#dadce0",
                      color: "#1a73e8",
                      background: "#ffffff",
                      backgroundImage: "none",
                      "&:hover": {
                        borderColor: "#1a73e8",
                        background: "#f4f8fe",
                        backgroundImage: "none",
                      },
                    }}
                  >
                    View on Google Jobs
                  </Button>
                  <Button
                    type="button"
                    variant="outlined"
                    onClick={handleCopyJobLink}
                    startIcon={
                      isCopied ? (
                        <CheckIcon sx={{ fontSize: 16 }} />
                      ) : (
                        <ContentCopyIcon sx={{ fontSize: 15 }} />
                      )
                    }
                    sx={{
                      textTransform: "none",
                      fontWeight: 700,
                      borderRadius: 2,
                      borderColor: "#d6d1e8",
                      color: "#441da0",
                      background: isCopied ? "#ede9fe" : "#ffffff",
                      backgroundImage: "none",
                      "&:hover": {
                        borderColor: "#441da0",
                        background: "#f5f2ff",
                        backgroundImage: "none",
                      },
                    }}
                  >
                    {isCopied ? "Link copied" : "Copy link"}
                  </Button>
                </Stack>

                {selectedHighlights.length > 0 && (
                  <Box
                    sx={{
                      mb: 2.5,
                      p: 2,
                      borderRadius: 2,
                      bgcolor: "#faf9fe",
                      border: "1px solid #eceaf4",
                    }}
                  >
                    <Typography
                      variant="subtitle2"
                      fontWeight={700}
                      sx={{ color: "#202124", mb: 1.25 }}
                    >
                      Job highlights
                    </Typography>
                    <Box
                      sx={{
                        display: "grid",
                        gridTemplateColumns: { xs: "1fr", sm: "repeat(2, 1fr)" },
                        gap: 1.25,
                      }}
                    >
                      {selectedHighlights.map((item) => (
                        <Box key={item.label}>
                          <Typography
                            variant="caption"
                            sx={{ color: "#5f6368", display: "block" }}
                          >
                            {item.label}
                          </Typography>
                          <Typography
                            variant="body2"
                            fontWeight={600}
                            sx={{
                              color: "#202124",
                              fontVariantNumeric: "tabular-nums",
                            }}
                          >
                            {item.value}
                          </Typography>
                        </Box>
                      ))}
                    </Box>
                  </Box>
                )}

                <Divider sx={{ mb: 2.5, borderColor: "#eef0f3" }} />

                <Box>
                  <Typography
                    variant="subtitle1"
                    fontWeight={700}
                    sx={{ color: "#202124", mb: 1 }}
                  >
                    Job description
                  </Typography>
                  {selectedDetail.jobDescription ? (
                    <RichHtmlContent
                      html={selectedDetail.jobDescription}
                      sx={{ fontSize: 14.5, color: "#3c4043" }}
                    />
                  ) : (
                    <Typography variant="body2" color="text.secondary">
                      Open the job post to view complete role details.
                    </Typography>
                  )}

                  {isLoadingDetail && !detailBySlug[selectedSlug] && (
                    <Box sx={{ mt: 2 }}>
                      <Skeleton variant="text" width="45%" height={24} />
                      <Skeleton variant="text" width="90%" height={18} />
                      <Skeleton variant="text" width="80%" height={18} />
                    </Box>
                  )}

                  {selectedDetail.jobRequirement && (
                    <Box sx={{ mt: 2.5 }}>
                      <Typography
                        variant="subtitle1"
                        fontWeight={700}
                        sx={{ color: "#202124", mb: 1 }}
                      >
                        Qualifications &amp; requirements
                      </Typography>
                      <RichHtmlContent
                        html={selectedDetail.jobRequirement}
                        sx={{ fontSize: 14.5, color: "#3c4043" }}
                      />
                    </Box>
                  )}

                  {selectedDetail.benefitsEnjoyed && (
                    <Box sx={{ mt: 2.5 }}>
                      <Typography
                        variant="subtitle1"
                        fontWeight={700}
                        sx={{ color: "#202124", mb: 1 }}
                      >
                        Benefits
                      </Typography>
                      <RichHtmlContent
                        html={selectedDetail.benefitsEnjoyed}
                        sx={{ fontSize: 14.5, color: "#3c4043" }}
                      />
                    </Box>
                  )}
                </Box>
              </>
            )}
          </Box>
        </Box>
      )}
    </Card>
  );
};

export default JobsInRwandaExplorer;
