import React from "react";
import { useTheme } from "@mui/material/styles";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";
import {
  Box,
  Button,
  Card,
  Chip,
  Skeleton,
  Stack,
  Typography,
} from "@mui/material";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import {
  faBolt,
  faCalendarDays,
  faCircleDollarToSlot,
  faFire,
  faLocationDot,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { salaryString } from "../../utils/customData";
import MuiImageCustom from "../MuiImageCustom";
import { formatRoute, normalizeExternalUrl } from "../../utils/funcUtils";
import { ROUTES } from "../../configs/constants";

const JobPostLarge = ({
  slug,
  companyImageUrl,
  companyName,
  jobName,
  cityId,
  deadline,
  isUrgent,
  isHot,
  salaryMin,
  salaryMax,
  imageUrl,
  applyUrl,
}) => {
  const theme = useTheme();
  const nav = useNavigate();
  const { allConfig } = useSelector((state) => state.config);
  const thumbSrc = imageUrl || companyImageUrl;
  const location = allConfig?.cityDict?.[cityId];
  const officialApplyUrl = normalizeExternalUrl(applyUrl);
  const deadlineDate = deadline && dayjs(deadline).isValid() ? dayjs(deadline) : null;
  const daysLeft = deadlineDate ? deadlineDate.diff(dayjs(), "day") : null;
  const deadlineLabel = deadlineDate
    ? daysLeft < 0
      ? "Expired"
      : daysLeft === 0
        ? "Closes today"
        : `Closes ${deadlineDate.format("DD MMM YYYY")}`
    : "Open";

  const handleOpen = () => {
    if (!slug) return;
    nav(`/${formatRoute(ROUTES.JOB_SEEKER.JOB_DETAIL, slug)}`);
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      handleOpen();
    }
  };

  return (
    <Card
      variant="outlined"
      role="link"
      tabIndex={0}
      onClick={handleOpen}
      onKeyDown={handleKeyDown}
      sx={{
        boxShadow: 0,
        cursor: slug ? "pointer" : "default",
        p: 2,
        borderRadius: 2.5,
        border: `1px solid ${theme.palette.divider}`,
        position: "relative",
        overflow: "hidden",
        transition: "all 0.2s ease",
        "&:hover": {
          transform: "translateY(-2px)",
          boxShadow: theme.customShadows?.medium || "0 8px 24px rgba(0,0,0,0.08)",
          borderColor: isUrgent ? theme.palette.secondary.main : theme.palette.primary.main,
        },
        "&:focus-visible": {
          outline: `2px solid ${theme.palette.primary.main}`,
          outlineOffset: 2,
        },
      }}
    >
      <Stack direction={{ xs: "column", sm: "row" }} spacing={2} alignItems="flex-start">
        <Box sx={{ position: "relative", flexShrink: 0 }}>
          <MuiImageCustom
            width={88}
            height={88}
            src={thumbSrc}
            loading="lazy"
            sx={{
              border: 1,
              borderRadius: 2,
              borderColor: theme.palette.grey[200],
              p: 0.75,
              backgroundColor: theme.palette.common.white,
              objectFit: "cover",
            }}
          />
          {isUrgent && (
            <Box
              title="Urgent hiring"
              sx={{
                position: "absolute",
                top: -6,
                right: -6,
                width: 24,
                height: 24,
                borderRadius: "50%",
                bgcolor: "warning.main",
                color: "#fff",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: 1,
              }}
            >
              <FontAwesomeIcon icon={faBolt} style={{ fontSize: 12 }} />
            </Box>
          )}
        </Box>

        <Stack flex={1} spacing={0.75} minWidth={0}>
          <Stack direction="row" justifyContent="space-between" alignItems="flex-start" spacing={1}>
            <Box minWidth={0}>
              <Typography
                component="h3"
                sx={{
                  fontSize: { xs: 16, sm: 18 },
                  fontWeight: 700,
                  color: theme.palette.grey[900],
                  lineHeight: 1.35,
                  mb: 0.25,
                  display: "-webkit-box",
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: "vertical",
                  overflow: "hidden",
                }}
              >
                {jobName || "Untitled job"}
              </Typography>
              <Typography
                sx={{
                  color: theme.palette.primary.main,
                  fontSize: 14,
                  fontWeight: 600,
                }}
                noWrap
              >
                {companyName || "Company"}
              </Typography>
            </Box>
            <Stack direction="row" spacing={0.75} flexShrink={0}>
              {isHot && (
                <Chip
                  icon={<FontAwesomeIcon icon={faFire} />}
                  label="Hot"
                  size="small"
                  sx={{
                    height: 24,
                    fontWeight: 700,
                    color: "#b54708",
                    bgcolor: "#fffaeb",
                    border: "1px solid #fedf89",
                    "& .MuiChip-icon": { color: "#f79009", fontSize: 12, ml: 0.75 },
                  }}
                />
              )}
              {isUrgent && (
                <Chip
                  label="Urgent"
                  size="small"
                  color="warning"
                  variant="outlined"
                  sx={{ height: 24, fontWeight: 700 }}
                />
              )}
            </Stack>
          </Stack>

          <Stack
            direction="row"
            spacing={1}
            useFlexGap
            flexWrap="wrap"
            alignItems="center"
            sx={{ mt: 0.5 }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 0.75,
                px: 1.25,
                py: 0.5,
                borderRadius: 1.5,
                bgcolor: "primary.background",
                color: "primary.main",
                fontSize: 13,
                fontWeight: 600,
              }}
            >
              <FontAwesomeIcon icon={faCircleDollarToSlot} />
              <span>{salaryString(salaryMin, salaryMax)}</span>
            </Box>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 0.75,
                px: 1.25,
                py: 0.5,
                borderRadius: 1.5,
                bgcolor: "info.background",
                color: "info.main",
                fontSize: 13,
                fontWeight: 600,
              }}
            >
              <FontAwesomeIcon icon={faLocationDot} />
              <span>{location || "Location not specified"}</span>
            </Box>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 0.75,
                px: 1.25,
                py: 0.5,
                borderRadius: 1.5,
                bgcolor: daysLeft !== null && daysLeft < 0 ? "error.lighter" : "success.background",
                color: daysLeft !== null && daysLeft < 0 ? "error.main" : "success.main",
                fontSize: 13,
                fontWeight: 600,
              }}
            >
              <FontAwesomeIcon icon={faCalendarDays} />
              <span>{deadlineLabel}</span>
            </Box>
            {officialApplyUrl && (
              <Button
                component="a"
                href={officialApplyUrl}
                target="_blank"
                rel="noopener noreferrer"
                size="small"
                variant="contained"
                endIcon={<OpenInNewIcon sx={{ fontSize: 14 }} />}
                onClick={(e) => e.stopPropagation()}
                sx={{
                  textTransform: "none",
                  fontWeight: 700,
                  borderRadius: "16px",
                  px: 1.5,
                  py: 0.25,
                  minHeight: 30,
                  boxShadow: "none",
                  backgroundColor: "#1a73e8",
                  "&:hover": { backgroundColor: "#1b66c9", boxShadow: "none" },
                }}
              >
                Apply on official website
              </Button>
            )}
          </Stack>
        </Stack>
      </Stack>
    </Card>
  );
};

const Loading = () => (
  <Card variant="outlined" sx={{ p: 2, boxShadow: 0, borderRadius: 2.5 }}>
    <Stack direction="row" spacing={2}>
      <Skeleton variant="rounded" width={88} height={88} />
      <Box flex={1}>
        <Skeleton height={28} width="70%" />
        <Skeleton height={22} width="40%" />
        <Stack direction="row" spacing={1} sx={{ mt: 1 }}>
          <Skeleton height={28} width={110} />
          <Skeleton height={28} width={110} />
          <Skeleton height={28} width={120} />
        </Stack>
      </Box>
    </Stack>
  </Card>
);

const MemoizedJobPostLarge = React.memo(JobPostLarge);
MemoizedJobPostLarge.Loading = Loading;

export default MemoizedJobPostLarge;
