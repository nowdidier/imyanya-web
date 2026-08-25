import React from "react";
import PropTypes from "prop-types";
import {
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Container,
  Divider,
  Grid,
  IconButton,
  Skeleton,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import CheckIcon from "@mui/icons-material/Check";
import TelegramIcon from "@mui/icons-material/Telegram";

import {
  fetchYouTubeVideos,
  UPLOADS_PLAYLIST_ID,
} from "../../services/youtubeService";
import { LINKS, WHATSAPP_CONFIG } from "../../configs/constants";
import toastMessages from "../../utils/toastMessages";

const formatViews = (count) => {
  if (!count) return null;
  if (count >= 1000000) return `${(count / 1000000).toFixed(1)}M views`;
  if (count >= 1000) return `${(count / 1000).toFixed(1)}K views`;
  return `${count} views`;
};

const formatDate = (dateString) => {
  if (!dateString) return "";
  return new Date(dateString).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
};

const copyToClipboard = async (url) => {
  try {
    await navigator.clipboard.writeText(url);
    toastMessages.success("Link copied to clipboard.");
    return true;
  } catch {
    toastMessages.error("Unable to copy link.");
    return false;
  }
};

const buildWhatsAppContactUrl = (video, contactMessagePrefix) => {
  const message = `${contactMessagePrefix}\n\n${video.title}\n${video.shareUrl}`;
  return `https://wa.me/${WHATSAPP_CONFIG.PHONE}?text=${encodeURIComponent(message)}`;
};

const FeaturedPlayer = ({ video, isPlaying }) => {
  if (!isPlaying) {
    return (
      <Box
        sx={{
          position: "relative",
          width: "100%",
          pt: "56.25%",
          bgcolor: "grey.900",
        }}
      >
        <Box
          component="img"
          src={video.thumbnail}
          alt={video.title}
          loading="lazy"
          sx={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }}
        />
        <Box
          sx={{
            position: "absolute",
            inset: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            bgcolor: "rgba(0,0,0,0.25)",
          }}
        >
          <IconButton
            aria-label={`Play ${video.title}`}
            sx={{
              color: "white",
              bgcolor: "#441da0",
              width: { xs: 56, md: 72 },
              height: { xs: 56, md: 72 },
              boxShadow: "0 8px 24px rgba(0,0,0,0.35)",
              transition: "transform 0.2s ease",
              "&:hover": { bgcolor: "#5a2fc4", transform: "scale(1.08)" },
            }}
          >
            <PlayArrowIcon sx={{ fontSize: { xs: 36, md: 48 } }} />
          </IconButton>
        </Box>
      </Box>
    );
  }

  return (
    <Box sx={{ position: "relative", width: "100%", pt: "56.25%", bgcolor: "black" }}>
      <Box
        component="iframe"
        title={video.title}
        src={`https://www.youtube-nocookie.com/embed/${video.videoId}?autoplay=1&rel=0`}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
        sx={{ position: "absolute", inset: 0, width: "100%", height: "100%", border: 0 }}
      />
    </Box>
  );
};

FeaturedPlayer.propTypes = {
  video: PropTypes.object.isRequired,
  isPlaying: PropTypes.bool.isRequired,
};

const PlaylistRow = ({ video, isActive, onSelect }) => (
  <Stack
    direction="row"
    spacing={1.5}
    onClick={onSelect}
    sx={{
      p: 1,
      borderRadius: 2,
      cursor: "pointer",
      alignItems: "center",
      border: "1px solid",
      borderColor: isActive ? "#441da0" : "transparent",
      bgcolor: isActive ? "rgba(68,29,160,0.06)" : "transparent",
      transition: "all 0.2s ease",
      "&:hover": { bgcolor: "rgba(68,29,160,0.04)" },
    }}
  >
    <Box sx={{ position: "relative", flexShrink: 0, width: { xs: 96, sm: 110 } }}>
      <Box sx={{ position: "relative", width: "100%", pt: "56.25%" }}>
        <Box
          component="img"
          src={video.thumbnail}
          alt=""
          loading="lazy"
          sx={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", borderRadius: 1 }}
        />
      </Box>
      {isActive && (
        <Box
          sx={{
            position: "absolute",
            inset: 0,
            borderRadius: 1,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            bgcolor: "rgba(0,0,0,0.45)",
          }}
        >
          <PlayArrowIcon sx={{ color: "white" }} />
        </Box>
      )}
    </Box>
    <Box sx={{ minWidth: 0 }}>
      <Typography
        variant="body2"
        fontWeight={isActive ? 700 : 600}
        sx={{
          display: "-webkit-box",
          WebkitLineClamp: 2,
          WebkitBoxOrient: "vertical",
          overflow: "hidden",
          lineHeight: 1.35,
        }}
      >
        {video.title}
      </Typography>
      <Typography variant="caption" color="text.secondary" sx={{ mt: 0.5, display: "block" }}>
        {[formatViews(video.viewCount), formatDate(video.published)].filter(Boolean).join(" · ")}
      </Typography>
    </Box>
  </Stack>
);

PlaylistRow.propTypes = {
  video: PropTypes.object.isRequired,
  isActive: PropTypes.bool.isRequired,
  onSelect: PropTypes.func.isRequired,
};

const SectionSkeleton = () => (
  <Grid container spacing={3}>
    <Grid item xs={12} md={8}>
      <Skeleton variant="rounded" sx={{ pt: "56.25%", borderRadius: 2 }} />
    </Grid>
    <Grid item xs={12} md={4}>
      {[...Array(6)].map((_, i) => (
        <Stack key={i} direction="row" spacing={1.5} sx={{ mb: 2 }}>
          <Skeleton variant="rounded" width={96} height={54} />
          <Box sx={{ flexGrow: 1 }}>
            <Skeleton variant="text" />
            <Skeleton variant="text" width="50%" />
          </Box>
        </Stack>
      ))}
    </Grid>
  </Grid>
);

const ChannelFallback = () => (
  <Card variant="outlined" sx={{ borderRadius: 2, overflow: "hidden" }}>
    <Box sx={{ position: "relative", width: "100%", pt: "56.25%", bgcolor: "grey.100" }}>
      <Box
        component="iframe"
        title="Imyanya channel playlist"
        src={`https://www.youtube.com/embed/videoseries?list=${UPLOADS_PLAYLIST_ID}`}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
        sx={{ position: "absolute", inset: 0, width: "100%", height: "100%", border: 0 }}
      />
    </Box>
  </Card>
);

const YouTubeVideoSection = ({
  title = "Latest Videos",
  subtitle = "",
  maxVideos = 6,
  showContainer = true,
  contactLabel = "Contact Imyanya",
  contactMessagePrefix = "Hello Imyanya, I would like more information about this video.",
  tagLabel = "YouTube",
}) => {
  const [videos, setVideos] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [hasFailed, setHasFailed] = React.useState(false);
  const [activeId, setActiveId] = React.useState(null);
  const [isPlaying, setIsPlaying] = React.useState(false);
  const [copied, setCopied] = React.useState(false);

  React.useEffect(() => {
    let isMounted = true;

    const loadVideos = async () => {
      setIsLoading(true);
      setHasFailed(false);
      try {
        const data = await fetchYouTubeVideos();
        if (!isMounted) return;
        const sliced = data.slice(0, maxVideos);
        setVideos(sliced);
        setActiveId(sliced[0]?.videoId || null);
        setIsPlaying(false);
      } catch (err) {
        if (isMounted) setHasFailed(true);
      } finally {
        if (isMounted) setIsLoading(false);
      }
    };

    loadVideos();

    return () => {
      isMounted = false;
    };
  }, [maxVideos]);

  const activeVideo = videos.find((v) => v.videoId === activeId) || null;

  const handleCopy = async () => {
    const ok = await copyToClipboard(activeVideo.shareUrl);
    if (ok) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const content = (
    <Box sx={{ py: { xs: 4, md: 6 } }}>
      <Stack
        direction={{ xs: "column", md: "row" }}
        justifyContent="space-between"
        alignItems={{ xs: "flex-start", md: "flex-end" }}
        spacing={2}
        sx={{ mb: 3 }}
      >
        <Stack spacing={1}>
          <Typography variant="h4" component="h2" fontWeight={800}>
            {title}
          </Typography>
          {subtitle && (
            <Typography color="text.secondary" sx={{ lineHeight: 1.65, maxWidth: 720 }}>
              {subtitle}
            </Typography>
          )}
        </Stack>
        <Button
          href={LINKS.YOUTUBE_LINK}
          target="_blank"
          rel="noopener noreferrer"
          variant="outlined"
          startIcon={<OpenInNewIcon />}
          sx={{ flexShrink: 0, textTransform: "none", fontWeight: 600 }}
        >
          Imyanya on YouTube
        </Button>
      </Stack>

      {isLoading && <SectionSkeleton />}

      {!isLoading && hasFailed && <ChannelFallback />}

      {!isLoading && !hasFailed && activeVideo && (
        <Grid container spacing={3} alignItems="stretch">
          {/* Featured video */}
          <Grid item xs={12} md={8}>
            <Card
              variant="outlined"
              sx={{
                borderRadius: 2,
                overflow: "hidden",
                height: "100%",
                display: "flex",
                flexDirection: "column",
                cursor: isPlaying ? "auto" : "pointer",
              }}
              onClick={!isPlaying ? () => setIsPlaying(true) : undefined}
            >
              <FeaturedPlayer video={activeVideo} isPlaying={isPlaying} />

              <CardContent sx={{ flexGrow: 1 }}>
                <Stack direction="row" spacing={1} alignItems="center" flexWrap="wrap" useFlexGap>
                  <Chip
                    label={tagLabel}
                    size="small"
                    sx={{ bgcolor: "#441da0", color: "white", fontWeight: 700, fontSize: "0.7rem" }}
                  />
                  {formatViews(activeVideo.viewCount) && (
                    <Chip
                      icon={<VisibilityOutlinedIcon sx={{ fontSize: 14 }} />}
                      label={formatViews(activeVideo.viewCount)}
                      size="small"
                      variant="outlined"
                      sx={{ fontSize: "0.7rem", height: 24 }}
                    />
                  )}
                  {activeVideo.published && (
                    <Chip
                      icon={<CalendarTodayOutlinedIcon sx={{ fontSize: 12 }} />}
                      label={formatDate(activeVideo.published)}
                      size="small"
                      variant="outlined"
                      sx={{ fontSize: "0.7rem", height: 24 }}
                    />
                  )}
                </Stack>

                <Typography variant="h6" component="h3" fontWeight={700} sx={{ mt: 1.5, lineHeight: 1.35 }}>
                  {activeVideo.title}
                </Typography>

                {activeVideo.description && (
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{
                      mt: 1,
                      lineHeight: 1.6,
                      display: "-webkit-box",
                      WebkitLineClamp: 3,
                      WebkitBoxOrient: "vertical",
                      overflow: "hidden",
                    }}
                  >
                    {activeVideo.description}
                  </Typography>
                )}
              </CardContent>

              <Divider />

              <Stack
                direction={{ xs: "column", sm: "row" }}
                spacing={1.25}
                alignItems={{ xs: "stretch", sm: "center" }}
                sx={{ p: 2 }}
              >
                <Button
                  href={buildWhatsAppContactUrl(activeVideo, contactMessagePrefix)}
                  target="_blank"
                  rel="noopener noreferrer"
                  variant="contained"
                  color="success"
                  startIcon={<WhatsAppIcon />}
                  sx={{ textTransform: "none", fontWeight: 700 }}
                >
                  {contactLabel}
                </Button>

                <Tooltip title="Share on WhatsApp">
                  <IconButton
                    href={`https://wa.me/?text=${encodeURIComponent(`Imyanya listing: ${activeVideo.title}\n${activeVideo.shareUrl}`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    sx={{ color: "#25D366" }}
                  >
                    <WhatsAppIcon />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Share on Telegram">
                  <IconButton
                    href={`https://t.me/share/url?url=${encodeURIComponent(activeVideo.shareUrl)}&text=${encodeURIComponent(`Imyanya listing: ${activeVideo.title}`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    sx={{ color: "#229ED9" }}
                  >
                    <TelegramIcon />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Copy link">
                  <IconButton onClick={handleCopy} sx={{ color: copied ? "success.main" : "text.secondary" }}>
                    {copied ? <CheckIcon /> : <ContentCopyIcon />}
                  </IconButton>
                </Tooltip>

                <Button
                  href={activeVideo.youtubeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  variant="outlined"
                  endIcon={<OpenInNewIcon />}
                  sx={{ textTransform: "none", ml: { sm: "auto !important" } }}
                >
                  Watch on YouTube
                </Button>
              </Stack>
            </Card>
          </Grid>

          {/* Playlist */}
          <Grid item xs={12} md={4}>
            <Box
              sx={{
                maxHeight: { xs: 420, md: 520 },
                overflowY: "auto",
                pr: 0.5,
              }}
            >
              <Typography variant="overline" color="text.secondary" sx={{ px: 1 }}>
                More listings ({videos.length})
              </Typography>
              <Stack spacing={1}>
                {videos.map((video) => (
                  <PlaylistRow
                    key={video.videoId}
                    video={video}
                    isActive={video.videoId === activeId}
                    onSelect={() => {
                      setActiveId(video.videoId);
                      setIsPlaying(false);
                    }}
                  />
                ))}
              </Stack>
            </Box>
          </Grid>
        </Grid>
      )}

      {!isLoading && !hasFailed && !activeVideo && <ChannelFallback />}
    </Box>
  );

  if (!showContainer) return content;

  return <Container maxWidth="lg">{content}</Container>;
};

YouTubeVideoSection.propTypes = {
  title: PropTypes.string,
  subtitle: PropTypes.string,
  maxVideos: PropTypes.number,
  showContainer: PropTypes.bool,
  contactLabel: PropTypes.string,
  contactMessagePrefix: PropTypes.string,
  tagLabel: PropTypes.string,
};

export default YouTubeVideoSection;
