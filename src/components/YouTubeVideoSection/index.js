import React from "react";
import PropTypes from "prop-types";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  CardActions,
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
import PlayCircleOutlineIcon from "@mui/icons-material/PlayCircleOutline";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import InstagramIcon from "@mui/icons-material/Instagram";
import YouTubeIcon from "@mui/icons-material/YouTube";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import TelegramIcon from "@mui/icons-material/Telegram";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import CheckIcon from "@mui/icons-material/Check";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";

import {
  fetchYouTubeVideos,
  UPLOADS_PLAYLIST_ID,
} from "../../services/youtubeService";
import { LINKS, WHATSAPP_CONFIG } from "../../configs/constants";
import toastMessages from "../../utils/toastMessages";

const formatViews = (count) => {
  if (count >= 1000000) {
    return `${(count / 1000000).toFixed(1)}M views`;
  }
  if (count >= 1000) {
    return `${(count / 1000).toFixed(1)}K views`;
  }
  return `${count} views`;
};

const formatDate = (dateString) => {
  if (!dateString) return "";
  const date = new Date(dateString);
  return date.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
};

const shareOnFacebook = (url) => {
  window.open(
    `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
    "_blank",
    "width=600,height=400"
  );
};

const shareOnTwitter = (url, text) => {
  window.open(
    `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`,
    "_blank",
    "width=600,height=400"
  );
};

const shareOnLinkedIn = (url) => {
  window.open(
    `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
    "_blank",
    "width=600,height=400"
  );
};

const shareOnWhatsApp = (url, text) => {
  window.open(
    `https://wa.me/?text=${encodeURIComponent(text + "\n" + url)}`,
    "_blank"
  );
};

const shareOnTelegram = (url, text) => {
  window.open(
    `https://t.me/share/url?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`,
    "_blank",
    "width=600,height=400"
  );
};

const copyToClipboard = async (url) => {
  try {
    await navigator.clipboard.writeText(url);
    toastMessages.success("Link copied to clipboard.");
  } catch {
    toastMessages.error("Unable to copy link.");
  }
};

const SOCIAL_CHANNELS = [
  { label: "YouTube", href: LINKS.YOUTUBE_LINK, Icon: YouTubeIcon, color: "#FF0000" },
  { label: "Facebook", href: LINKS.FACEBOOK_LINK, Icon: FacebookIcon, color: "#1877F2" },
  { label: "Instagram", href: LINKS.INSTAGRAM_LINK, Icon: InstagramIcon, color: "#C13584" },
  { label: "LinkedIn", href: LINKS.LINKEDIN_LINK, Icon: LinkedInIcon, color: "#0A66C2" },
  { label: "X", href: LINKS.TWITTER_LINK, Icon: TwitterIcon, color: "#111111" },
];

const buildWhatsAppContactUrl = (video, contactMessagePrefix) => {
  const message = `${contactMessagePrefix}\n\n${video.title}\n${video.shareUrl}`;
  return `https://wa.me/${WHATSAPP_CONFIG.PHONE}?text=${encodeURIComponent(message)}`;
};

const YouTubePlaylistFallback = ({ title, subtitle }) => (
  <Card variant="outlined" sx={{ borderRadius: 1, overflow: "hidden" }}>
    <Grid container>
      <Grid item xs={12} md={8}>
        <Box sx={{ position: "relative", width: "100%", pt: "56.25%", bgcolor: "grey.100" }}>
          <Box
            component="iframe"
            title={title}
            src={`https://www.youtube.com/embed/videoseries?list=${UPLOADS_PLAYLIST_ID}`}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            sx={{
              position: "absolute",
              inset: 0,
              width: "100%",
              height: "100%",
              border: 0,
            }}
          />
        </Box>
      </Grid>
      <Grid item xs={12} md={4}>
        <CardContent sx={{ height: "100%", p: { xs: 2.5, md: 3 } }}>
          <Stack spacing={2} sx={{ height: "100%" }}>
            <Box>
              <Typography variant="h6" fontWeight={800} gutterBottom>
                Latest from Imyanya
              </Typography>
              <Typography color="text.secondary" sx={{ lineHeight: 1.7 }}>
                {subtitle}
              </Typography>
            </Box>
            <Stack direction="row" spacing={0.5} alignItems="center" flexWrap="wrap">
              {SOCIAL_CHANNELS.map(({ label, href, Icon, color }) => (
                <Tooltip title={label} key={label}>
                  <IconButton
                    component="a"
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    size="small"
                    sx={{ color }}
                  >
                    <Icon fontSize="small" />
                  </IconButton>
                </Tooltip>
              ))}
            </Stack>
            <Button
              href={LINKS.YOUTUBE_LINK}
              target="_blank"
              rel="noopener noreferrer"
              variant="contained"
              startIcon={<YouTubeIcon />}
              sx={{ alignSelf: "flex-start", mt: "auto" }}
            >
              Open Channel
            </Button>
          </Stack>
        </CardContent>
      </Grid>
    </Grid>
  </Card>
);

YouTubePlaylistFallback.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string.isRequired,
};

const VideoCard = ({
  video,
  contactLabel,
  contactMessagePrefix,
  tagLabel,
  showSocialChannels,
}) => {
  const [copied, setCopied] = React.useState(false);

  const handleCopy = async () => {
    await copyToClipboard(video.shareUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const shareText = `Imyanya listing: ${video.title}`;

  return (
    <Card
      variant="outlined"
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        borderRadius: 2,
        overflow: "hidden",
        transition: "all 0.25s ease-in-out",
        "&:hover": {
          borderColor: "primary.light",
          boxShadow: (theme) => theme.customShadows?.card,
          transform: "translateY(-3px)",
        },
      }}
    >
      <Box sx={{ position: "relative" }}>
        <CardMedia
          component="img"
          height="200"
          image={video.thumbnail}
          alt={video.title}
          loading="lazy"
          sx={{ objectFit: "cover" }}
        />
        <Box
          sx={{
            position: "absolute",
            inset: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            bgcolor: "rgba(0,0,0,0.3)",
            opacity: 0,
            transition: "opacity 0.2s",
            "&:hover": { opacity: 1 },
          }}
        >
          <IconButton
            href={video.youtubeUrl}
            target="_blank"
            rel="noopener noreferrer"
            size="large"
            sx={{ color: "white" }}
          >
            <PlayCircleOutlineIcon sx={{ fontSize: 56 }} />
          </IconButton>
        </Box>
        {video.viewCount > 0 && (
          <Chip
            icon={<VisibilityOutlinedIcon sx={{ fontSize: 14 }} />}
            label={formatViews(video.viewCount)}
            size="small"
            sx={{
              position: "absolute",
              bottom: 8,
              right: 8,
              bgcolor: "rgba(0,0,0,0.75)",
              color: "white",
              fontWeight: 600,
              fontSize: "0.7rem",
              "& .MuiChip-icon": { color: "white" },
            }}
          />
        )}
      </Box>

      <CardContent sx={{ flexGrow: 1, pb: 1 }}>
        <Typography
          variant="subtitle1"
          component="h3"
          fontWeight={700}
          sx={{
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
            lineHeight: 1.4,
            mb: 1,
          }}
        >
          {video.title}
        </Typography>

        {video.description && (
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
              lineHeight: 1.5,
              mb: 1,
            }}
          >
            {video.description}
          </Typography>
        )}

        <Stack direction="row" spacing={1} alignItems="center">
          {video.published && (
            <Chip
              icon={<CalendarTodayOutlinedIcon sx={{ fontSize: 12 }} />}
              label={formatDate(video.published)}
              size="small"
              variant="outlined"
              sx={{ fontSize: "0.7rem", height: 24 }}
            />
          )}
          <Chip
            label={tagLabel}
            size="small"
            color="error"
            variant="outlined"
            sx={{ fontSize: "0.7rem", height: 24 }}
          />
        </Stack>
      </CardContent>

      <CardActions
        sx={{
          px: 2,
          py: 1.5,
          borderTop: "1px solid",
          borderColor: "divider",
          display: "flex",
          flexDirection: "column",
          alignItems: "stretch",
          gap: 1.25,
        }}
      >
        <Stack direction={{ xs: "column", sm: "row" }} spacing={1}>
          <Button
            href={buildWhatsAppContactUrl(video, contactMessagePrefix)}
            target="_blank"
            rel="noopener noreferrer"
            variant="contained"
            color="success"
            size="small"
            fullWidth
            startIcon={<WhatsAppIcon />}
          >
            {contactLabel}
          </Button>
          <Button
            href={video.youtubeUrl}
            target="_blank"
            rel="noopener noreferrer"
            variant="outlined"
            size="small"
            fullWidth
            endIcon={<OpenInNewIcon />}
          >
            Watch
          </Button>
        </Stack>

        <Divider flexItem />

        <Stack
          direction="row"
          spacing={0.5}
          alignItems="center"
          justifyContent="space-between"
          flexWrap="wrap"
        >
          <Stack direction="row" spacing={0.5} alignItems="center">
            <Tooltip title="Share on Facebook">
              <IconButton
                size="small"
                onClick={() => shareOnFacebook(video.shareUrl)}
                sx={{ color: "#1877F2" }}
              >
                <FacebookIcon fontSize="small" />
              </IconButton>
            </Tooltip>
            <Tooltip title="Share on X">
              <IconButton
                size="small"
                onClick={() => shareOnTwitter(video.shareUrl, shareText)}
                sx={{ color: "#111" }}
              >
                <TwitterIcon fontSize="small" />
              </IconButton>
            </Tooltip>
            <Tooltip title="Share on LinkedIn">
              <IconButton
                size="small"
                onClick={() => shareOnLinkedIn(video.shareUrl)}
                sx={{ color: "#0A66C2" }}
              >
                <LinkedInIcon fontSize="small" />
              </IconButton>
            </Tooltip>
            <Tooltip title="Share on WhatsApp">
              <IconButton
                size="small"
                onClick={() => shareOnWhatsApp(video.shareUrl, shareText)}
                sx={{ color: "#25D366" }}
              >
                <WhatsAppIcon fontSize="small" />
              </IconButton>
            </Tooltip>
            <Tooltip title="Share on Telegram">
              <IconButton
                size="small"
                onClick={() => shareOnTelegram(video.shareUrl, shareText)}
                sx={{ color: "#229ED9" }}
              >
                <TelegramIcon fontSize="small" />
              </IconButton>
            </Tooltip>
            <Tooltip title="Copy link">
              <IconButton
                size="small"
                onClick={handleCopy}
                sx={{ color: copied ? "success.main" : "text.secondary" }}
              >
                {copied ? <CheckIcon fontSize="small" /> : <ContentCopyIcon fontSize="small" />}
              </IconButton>
            </Tooltip>
          </Stack>

          {showSocialChannels && (
            <Stack direction="row" spacing={0.25} alignItems="center">
              {SOCIAL_CHANNELS.map(({ label, href, Icon, color }) => (
                <Tooltip title={label} key={label}>
                  <IconButton
                    component="a"
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    size="small"
                    sx={{ color }}
                  >
                    <Icon fontSize="small" />
                  </IconButton>
                </Tooltip>
              ))}
            </Stack>
          )}
        </Stack>
      </CardActions>
    </Card>
  );
};

VideoCard.propTypes = {
  video: PropTypes.shape({
    videoId: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    published: PropTypes.string,
    thumbnail: PropTypes.string,
    description: PropTypes.string,
    viewCount: PropTypes.number,
    youtubeUrl: PropTypes.string.isRequired,
    shareUrl: PropTypes.string.isRequired,
  }).isRequired,
  contactLabel: PropTypes.string.isRequired,
  contactMessagePrefix: PropTypes.string.isRequired,
  tagLabel: PropTypes.string.isRequired,
  showSocialChannels: PropTypes.bool.isRequired,
};

const VideoSkeleton = () => (
  <Card variant="outlined" sx={{ borderRadius: 2, overflow: "hidden" }}>
    <Skeleton variant="rectangular" height={200} />
    <CardContent>
      <Skeleton variant="text" width="80%" height={28} />
      <Skeleton variant="text" width="60%" height={20} sx={{ mt: 0.5 }} />
      <Stack direction="row" spacing={1} sx={{ mt: 1.5 }}>
        <Skeleton variant="rounded" width={80} height={24} />
        <Skeleton variant="rounded" width={60} height={24} />
      </Stack>
    </CardContent>
    <CardActions sx={{ px: 2, py: 1.5, borderTop: "1px solid", borderColor: "divider" }}>
      <Stack direction="row" spacing={0.5}>
        {[...Array(6)].map((_, i) => (
          <Skeleton key={i} variant="circular" width={32} height={32} />
        ))}
      </Stack>
    </CardActions>
  </Card>
);

const YouTubeVideoSection = ({
  title = "Latest Videos",
  subtitle = "Watch our latest videos on jobs, career advice, and opportunities in Rwanda. Subscribe to our YouTube channel for updates.",
  maxVideos = 6,
  showContainer = true,
  contactLabel = "Contact Imyanya",
  contactMessagePrefix = "Hello Imyanya, I would like more information about this video.",
  tagLabel = "YouTube",
  showSocialChannels = true,
}) => {
  const [videos, setVideos] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [error, setError] = React.useState(null);

  React.useEffect(() => {
    const loadVideos = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const data = await fetchYouTubeVideos();
        setVideos(data.slice(0, maxVideos));
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };
    loadVideos();
  }, [maxVideos]);

  const content = (
    <Box sx={{ py: { xs: 4, md: 6 } }}>
      <Stack
        direction={{ xs: "column", md: "row" }}
        justifyContent="space-between"
        alignItems={{ xs: "flex-start", md: "flex-end" }}
        spacing={2}
        sx={{ mb: 4 }}
      >
        <Stack spacing={1.5}>
          <Typography variant="h4" component="h2" fontWeight={800}>
            {title}
          </Typography>
          {subtitle && (
            <Typography variant="h6" color="text.secondary" sx={{ lineHeight: 1.65, maxWidth: 760 }}>
              {subtitle}
            </Typography>
          )}
        </Stack>
        <Button
          href={LINKS.YOUTUBE_LINK}
          target="_blank"
          rel="noopener noreferrer"
          variant="outlined"
          startIcon={<YouTubeIcon />}
          sx={{ flexShrink: 0 }}
        >
          Open Channel
        </Button>
      </Stack>

      {error && !isLoading && (
        <YouTubePlaylistFallback
          title={title}
          subtitle="The embedded channel playlist stays current with new YouTube uploads and keeps Imyanya social links close to the video."
        />
      )}

      {isLoading && (
        <Grid container spacing={3}>
          {[...Array(Math.min(maxVideos, 3))].map((_, i) => (
            <Grid item xs={12} sm={6} md={4} key={i}>
              <VideoSkeleton />
            </Grid>
          ))}
        </Grid>
      )}

      {!isLoading && !error && videos.length > 0 && (
        <Grid container spacing={3}>
          {videos.map((video) => (
            <Grid item xs={12} sm={6} md={4} key={video.videoId}>
              <VideoCard
                video={video}
                contactLabel={contactLabel}
                contactMessagePrefix={contactMessagePrefix}
                tagLabel={tagLabel}
                showSocialChannels={showSocialChannels}
              />
            </Grid>
          ))}
        </Grid>
      )}

      {!isLoading && !error && videos.length === 0 && (
        <YouTubePlaylistFallback
          title={title}
          subtitle="Current Imyanya videos are available in the channel playlist while individual listing cards are being prepared."
        />
      )}
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
  showSocialChannels: PropTypes.bool,
};

export default YouTubeVideoSection;
