import * as React from "react";
import { Link as RouterLink } from "react-router-dom";
import {
  Box,
  Button,
  Card,
  Divider,
  Stack,
  Typography,
} from "@mui/material";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import DirectionsOutlinedIcon from "@mui/icons-material/DirectionsOutlined";
import RateReviewOutlinedIcon from "@mui/icons-material/RateReviewOutlined";
import WorkOutlineIcon from "@mui/icons-material/WorkOutline";
import PhotoLibraryOutlinedIcon from "@mui/icons-material/PhotoLibraryOutlined";
import LanguageIcon from "@mui/icons-material/Language";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import PhoneOutlinedIcon from "@mui/icons-material/PhoneOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import BusinessCenterOutlinedIcon from "@mui/icons-material/BusinessCenterOutlined";
import VerifiedIcon from "@mui/icons-material/Verified";
import StarIcon from "@mui/icons-material/Star";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import CheckIcon from "@mui/icons-material/Check";

import {
  getMonogramTone,
  sanitizeFallbackInitials,
} from "../JobsInRwandaExplorer/jobsExplorerUtils";
import { buildGoogleProfileUrls } from "./googleProfileUtils";

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

const ACTION_BUTTON_SX = {
  textTransform: "none",
  fontWeight: 600,
  fontSize: 13,
  borderRadius: 2,
  px: 1.5,
  py: 0.75,
  borderColor: "#dadce0",
  color: "#1a73e8",
  background: "#ffffff",
  backgroundImage: "none",
  boxShadow: "none",
  whiteSpace: "nowrap",
  "&:hover": {
    borderColor: "#1a73e8",
    background: "#f4f8fe",
    backgroundImage: "none",
    boxShadow: "none",
  },
};

const CompanyGoogleProfileCard = ({
  profile,
  compact = false,
  showImyanyaLink = false,
}) => {
  const [logoFailed, setLogoFailed] = React.useState(false);
  const [copied, setCopied] = React.useState(false);
  const copyTimerRef = React.useRef(null);

  React.useEffect(() => {
    setLogoFailed(false);
  }, [profile?.logoUrl]);

  React.useEffect(() => {
    return () => {
      if (copyTimerRef.current) {
        window.clearTimeout(copyTimerRef.current);
      }
    };
  }, []);

  if (!profile) return null;

  const urls = buildGoogleProfileUrls({
    companyName: profile.companyName,
    address: profile.address,
    city: profile.city,
    district: profile.district,
    lat: profile.lat,
    lng: profile.lng,
    websiteUrl: profile.websiteUrl,
    industry: profile.category,
  });

  const initials = sanitizeFallbackInitials(profile.companyName);
  const tone = getMonogramTone(profile.companyName);

  const handleCopyGoogleLink = async () => {
    let ok = false;
    try {
      if (navigator?.clipboard?.writeText) {
        await navigator.clipboard.writeText(urls.profileSearchUrl);
        ok = true;
      }
    } catch (e) {
      ok = false;
    }

    if (!ok && typeof document !== "undefined") {
      try {
        const input = document.createElement("textarea");
        input.value = urls.profileSearchUrl;
        input.setAttribute("readonly", "");
        input.style.position = "fixed";
        input.style.opacity = "0";
        document.body.appendChild(input);
        input.select();
        ok = document.execCommand("copy");
        document.body.removeChild(input);
      } catch (e) {
        ok = false;
      }
    }

    if (ok) {
      setCopied(true);
      if (copyTimerRef.current) window.clearTimeout(copyTimerRef.current);
      copyTimerRef.current = window.setTimeout(() => setCopied(false), 2000);
    }
  };

  const summaryText =
    profile.tagline ||
    (profile.descriptionText
      ? profile.descriptionText.length > 260
        ? `${profile.descriptionText.slice(0, 257).trim()}...`
        : profile.descriptionText
      : "");

  return (
    <Card
      id="google-profile"
      component="section"
      aria-label={`Google profile for ${profile.companyName}`}
      data-testid="company-google-profile"
      variant="outlined"
      sx={{
        scrollMarginTop: { xs: "80px", md: "92px" },
        borderRadius: 3,
        overflow: "hidden",
        borderColor: "#dadce0",
        bgcolor: "#ffffff",
        boxShadow: "0 2px 10px rgba(32, 33, 36, 0.06)",
      }}
    >
      <Box
        sx={{
          height: 4,
          background:
            "linear-gradient(90deg, #4285F4 0%, #EA4335 33%, #FBBC05 66%, #34A853 100%)",
        }}
      />

      <Box sx={{ p: { xs: 2, sm: compact ? 2.5 : 3 } }}>
        {/* Top bar: Google Profile identity + primary CTA */}
        <Stack
          direction={compact ? "column" : { xs: "column", md: "row" }}
          spacing={2}
          alignItems={compact ? "flex-start" : { xs: "flex-start", md: "center" }}
          justifyContent="space-between"
        >
          <Stack direction="row" spacing={1.75} alignItems="center" sx={{ minWidth: 0 }}>
            <Box
              sx={{
                position: "relative",
                width: 52,
                height: 52,
                borderRadius: 2,
                bgcolor: tone.bg,
                color: tone.fg,
                border: `1px solid ${tone.border}`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontWeight: 800,
                fontSize: 16,
                flexShrink: 0,
                overflow: "hidden",
              }}
            >
              <span aria-hidden="true">{initials}</span>
              {profile.logoUrl && !logoFailed && (
                <Box
                  component="img"
                  src={profile.logoUrl}
                  alt={profile.companyName}
                  loading="lazy"
                  referrerPolicy="no-referrer"
                  onError={() => setLogoFailed(true)}
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

            <Box sx={{ minWidth: 0 }}>
              <Stack direction="row" spacing={0.75} alignItems="center" flexWrap="wrap">
                <GoogleGMark size={16} />
                <Typography
                  variant="caption"
                  sx={{ color: "#5f6368", fontWeight: 700, letterSpacing: "0.02em" }}
                >
                  Google Business Profile preview
                </Typography>
              </Stack>

              <Stack direction="row" spacing={0.75} alignItems="center" sx={{ mt: 0.25 }}>
                <Typography
                  component="h2"
                  variant={compact ? "h6" : "h5"}
                  fontWeight={800}
                  sx={{
                    color: "#202124",
                    lineHeight: 1.25,
                    wordBreak: "break-word",
                  }}
                >
                  {profile.companyName}
                </Typography>
                {profile.isRegistered && (
                  <VerifiedIcon
                    sx={{ fontSize: 18, color: "#1a73e8", flexShrink: 0 }}
                    titleAccess="Verified profile"
                  />
                )}
              </Stack>

              <Stack
                direction="row"
                spacing={1}
                alignItems="center"
                flexWrap="wrap"
                useFlexGap
                sx={{ mt: 0.4, color: "#5f6368", fontVariantNumeric: "tabular-nums" }}
              >
                {typeof profile.rating === "number" && (
                  <Stack direction="row" spacing={0.35} alignItems="center">
                    <Typography variant="body2" fontWeight={700} sx={{ color: "#202124" }}>
                      {profile.rating.toFixed(1)}
                    </Typography>
                    <StarIcon sx={{ fontSize: 16, color: "#fbbc04" }} />
                    {typeof profile.reviewCount === "number" && (
                      <Typography variant="body2" sx={{ color: "#5f6368" }}>
                        ({profile.reviewCount})
                      </Typography>
                    )}
                    <Typography variant="body2" aria-hidden="true">
                      ·
                    </Typography>
                  </Stack>
                )}
                <Typography variant="body2" sx={{ color: "#3c4043", fontWeight: 500 }}>
                  {[profile.category, profile.city ? `${profile.city}, Rwanda` : ""]
                    .filter(Boolean)
                    .join(" · ")}
                </Typography>
              </Stack>
            </Box>
          </Stack>

          <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap sx={{ flexShrink: 0 }}>
            <Button
              component="a"
              href={urls.profileSearchUrl}
              target="_blank"
              rel="noopener noreferrer"
              variant="contained"
              endIcon={<OpenInNewIcon sx={{ fontSize: 16 }} />}
              sx={{
                textTransform: "none",
                fontWeight: 700,
                borderRadius: 2,
                px: 2,
                background: "#1a73e8",
                backgroundImage: "none",
                color: "#ffffff",
                boxShadow: "none",
                whiteSpace: "nowrap",
                "&:hover": {
                  background: "#1558b0",
                  backgroundImage: "none",
                  boxShadow: "none",
                },
              }}
            >
              View on Google
            </Button>

            {showImyanyaLink && profile.slug && (
              <Button
                component={RouterLink}
                to={`/companies/${profile.slug}`}
                variant="outlined"
                sx={{
                  ...ACTION_BUTTON_SX,
                  color: "#441da0",
                  borderColor: "#d6d1e8",
                  "&:hover": {
                    borderColor: "#441da0",
                    background: "#f5f2ff",
                    backgroundImage: "none",
                  },
                }}
              >
                Full profile
              </Button>
            )}
          </Stack>
        </Stack>

        {/* Google Profile Action Row */}
        <Stack
          direction="row"
          spacing={1}
          useFlexGap
          flexWrap="wrap"
          sx={{ mt: 2 }}
        >
          <Button
            component="a"
            href={urls.directionsUrl}
            target="_blank"
            rel="noopener noreferrer"
            variant="outlined"
            size="small"
            startIcon={<DirectionsOutlinedIcon sx={{ fontSize: 16 }} />}
            sx={ACTION_BUTTON_SX}
          >
            Directions
          </Button>
          <Button
            component="a"
            href={urls.reviewsUrl}
            target="_blank"
            rel="noopener noreferrer"
            variant="outlined"
            size="small"
            startIcon={<RateReviewOutlinedIcon sx={{ fontSize: 16 }} />}
            sx={ACTION_BUTTON_SX}
          >
            Google reviews
          </Button>
          <Button
            component="a"
            href={urls.jobsUrl}
            target="_blank"
            rel="noopener noreferrer"
            variant="outlined"
            size="small"
            startIcon={<WorkOutlineIcon sx={{ fontSize: 16 }} />}
            sx={ACTION_BUTTON_SX}
          >
            Jobs on Google
          </Button>
          <Button
            component="a"
            href={urls.photosUrl}
            target="_blank"
            rel="noopener noreferrer"
            variant="outlined"
            size="small"
            startIcon={<PhotoLibraryOutlinedIcon sx={{ fontSize: 16 }} />}
            sx={ACTION_BUTTON_SX}
          >
            Photos
          </Button>
          {urls.websiteUrl && (
            <Button
              component="a"
              href={urls.websiteUrl}
              target="_blank"
              rel="noopener noreferrer"
              variant="outlined"
              size="small"
              startIcon={<LanguageIcon sx={{ fontSize: 16 }} />}
              sx={ACTION_BUTTON_SX}
            >
              Website
            </Button>
          )}
          <Button
            type="button"
            variant="outlined"
            size="small"
            onClick={handleCopyGoogleLink}
            startIcon={
              copied ? (
                <CheckIcon sx={{ fontSize: 15 }} />
              ) : (
                <ContentCopyIcon sx={{ fontSize: 15 }} />
              )
            }
            sx={{
              ...ACTION_BUTTON_SX,
              background: copied ? "#e8f0fe" : "#ffffff",
            }}
          >
            {copied ? "Link copied" : "Copy link"}
          </Button>
        </Stack>

        <Divider sx={{ my: 2, borderColor: "#eef0f3" }} />

        {/* Structured Knowledge Panel Facts */}
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "1fr",
              md: compact ? "1fr" : "1.15fr 0.85fr",
            },
            gap: 2,
          }}
        >
          <Stack spacing={1.25}>
            <Stack direction="row" spacing={1.25} alignItems="flex-start">
              <LocationOnOutlinedIcon
                sx={{ fontSize: 18, color: "#5f6368", mt: 0.2, flexShrink: 0 }}
              />
              <Typography variant="body2" sx={{ color: "#202124", lineHeight: 1.55 }}>
                <Box component="span" sx={{ fontWeight: 700 }}>
                  Address:{" "}
                </Box>
                {profile.fullLocation}
              </Typography>
            </Stack>

            {profile.phone && (
              <Stack direction="row" spacing={1.25} alignItems="center">
                <PhoneOutlinedIcon
                  sx={{ fontSize: 18, color: "#5f6368", flexShrink: 0 }}
                />
                <Typography variant="body2" sx={{ color: "#202124", fontVariantNumeric: "tabular-nums" }}>
                  <Box component="span" sx={{ fontWeight: 700 }}>
                    Phone:{" "}
                  </Box>
                  <Box
                    component="a"
                    href={`tel:${profile.phone.replace(/\s+/g, "")}`}
                    sx={{ color: "#1a73e8", textDecoration: "none", "&:hover": { textDecoration: "underline" } }}
                  >
                    {profile.phone}
                  </Box>
                </Typography>
              </Stack>
            )}

            {profile.email && (
              <Stack direction="row" spacing={1.25} alignItems="center">
                <EmailOutlinedIcon
                  sx={{ fontSize: 18, color: "#5f6368", flexShrink: 0 }}
                />
                <Typography variant="body2" sx={{ color: "#202124", wordBreak: "break-word" }}>
                  <Box component="span" sx={{ fontWeight: 700 }}>
                    Email:{" "}
                  </Box>
                  <Box
                    component="a"
                    href={`mailto:${profile.email}`}
                    sx={{ color: "#1a73e8", textDecoration: "none", "&:hover": { textDecoration: "underline" } }}
                  >
                    {profile.email}
                  </Box>
                </Typography>
              </Stack>
            )}

            {(profile.sizeLabel || profile.foundedLabel || profile.jobPostNumber > 0) && (
              <Stack direction="row" spacing={1.25} alignItems="flex-start">
                <BusinessCenterOutlinedIcon
                  sx={{ fontSize: 18, color: "#5f6368", mt: 0.2, flexShrink: 0 }}
                />
                <Typography variant="body2" sx={{ color: "#202124", fontVariantNumeric: "tabular-nums" }}>
                  {[
                    profile.sizeLabel,
                    profile.foundedLabel ? `Founded ${profile.foundedLabel}` : "",
                    profile.jobPostNumber > 0
                      ? `${profile.jobPostNumber} open role${profile.jobPostNumber === 1 ? "" : "s"}`
                      : "",
                  ]
                    .filter(Boolean)
                    .join(" · ")}
                </Typography>
              </Stack>
            )}

            {urls.websiteUrl && (
              <Stack direction="row" spacing={1.25} alignItems="center">
                <LanguageIcon
                  sx={{ fontSize: 18, color: "#5f6368", flexShrink: 0 }}
                />
                <Typography variant="body2" sx={{ color: "#202124" }}>
                  <Box component="span" sx={{ fontWeight: 700 }}>
                    Website:{" "}
                  </Box>
                  <Box
                    component="a"
                    href={urls.websiteUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    sx={{ color: "#1a73e8", textDecoration: "none", "&:hover": { textDecoration: "underline" } }}
                  >
                    {urls.websiteHost}
                  </Box>
                </Typography>
              </Stack>
            )}
          </Stack>

          {(summaryText || profile.pros.length > 0) && (
            <Box
              sx={{
                p: 1.75,
                borderRadius: 2,
                bgcolor: "#f8f9fa",
                border: "1px solid #eceef1",
              }}
            >
              {summaryText && (
                <>
                  <Typography
                    variant="caption"
                    sx={{ color: "#5f6368", fontWeight: 700, display: "block", mb: 0.5 }}
                  >
                    Profile overview
                  </Typography>
                  <Typography variant="body2" sx={{ color: "#3c4043", lineHeight: 1.6 }}>
                    {summaryText}
                  </Typography>
                </>
              )}
              {profile.pros.length > 0 && (
                <Box sx={{ mt: summaryText ? 1.25 : 0 }}>
                  <Typography
                    variant="caption"
                    sx={{ color: "#5f6368", fontWeight: 700, display: "block", mb: 0.5 }}
                  >
                    Reviewer highlights
                  </Typography>
                  <Stack spacing={0.35}>
                    {profile.pros.map((item) => (
                      <Typography key={item} variant="caption" sx={{ color: "#3c4043", display: "block" }}>
                        • {item}
                      </Typography>
                    ))}
                  </Stack>
                </Box>
              )}
            </Box>
          )}
        </Box>
      </Box>
    </Card>
  );
};

export default CompanyGoogleProfileCard;
