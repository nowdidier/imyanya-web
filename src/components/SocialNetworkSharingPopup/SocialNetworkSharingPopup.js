import React from "react";
import PropTypes from "prop-types";
import {
  alpha,
  useTheme,
} from "@mui/material/styles";
import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Divider,
  Grid,
  IconButton,
  InputAdornment,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import ShareIcon from "@mui/icons-material/Share";
import CloseIcon from "@mui/icons-material/Close";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import CheckIcon from "@mui/icons-material/Check";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";

import {
  APP_NAME,
  AUTH_CONFIG,
} from "../../configs/constants";
import toastMessages from "../../utils/toastMessages";

import {
  EmailIcon,
  EmailShareButton,
  FacebookIcon,
  FacebookMessengerIcon,
  FacebookMessengerShareButton,
  FacebookShareButton,
  LinkedinIcon,
  LinkedinShareButton,
  TelegramIcon,
  TelegramShareButton,
  TwitterIcon,
  TwitterShareButton,
  WhatsappIcon,
  WhatsappShareButton,
} from "react-share";

const buildFallbackShareData = ({
  facebook,
  facebookMessenger,
  linkedin,
  twitter,
  email,
}) => {
  const url =
    facebook?.url ||
    facebookMessenger?.url ||
    linkedin?.url ||
    twitter?.url ||
    email?.url ||
    "";
  const title =
    linkedin?.title ||
    twitter?.title ||
    email?.subject ||
    facebook?.quote ||
    APP_NAME;
  const description =
    facebook?.quote ||
    linkedin?.summary ||
    twitter?.title ||
    email?.body ||
    `Share this page on ${APP_NAME}.`;

  return {
    badge: "Share",
    dialogTitle: "Share this page",
    title,
    description,
    quote: description,
    subject: email?.subject || title,
    emailBody: email?.body || description,
    copyText: [description, url].filter(Boolean).join("\n\n"),
    nativeText: description,
    hashtags: twitter?.hashtags || [],
    source: linkedin?.source || APP_NAME,
    via: twitter?.via || "",
    messengerAppId: facebookMessenger?.appId || AUTH_CONFIG.FACEBOOK_CLIENT_ID || "",
    url,
  };
};

const getFacebookHashtag = (hashtags = []) => {
  const firstTag = Array.isArray(hashtags) ? hashtags[0] : "";

  if (!firstTag) {
    return "";
  }

  return firstTag.startsWith("#") ? firstTag : `#${firstTag}`;
};

const SocialNetworkSharingPopup = (props) => {
  const theme = useTheme();
  const [copied, setCopied] = React.useState(false);
  const copyResetTimerRef = React.useRef(null);

  const {
    open,
    onClose,
    setOpenPopup,
    shareData = {},
    facebook,
    facebookMessenger,
    linkedin,
    twitter,
    email,
  } = props;

  const resolvedShareData = {
    ...buildFallbackShareData({
      facebook,
      facebookMessenger,
      linkedin,
      twitter,
      email,
    }),
    ...shareData,
  };

  const shareUrl =
    resolvedShareData.url ||
    (typeof window !== "undefined" ? window.location.href : "");
  const shareText =
    resolvedShareData.nativeText ||
    resolvedShareData.description ||
    resolvedShareData.quote ||
    resolvedShareData.title ||
    "";
  const shareCopyText =
    resolvedShareData.copyText ||
    [shareText, shareUrl].filter(Boolean).join("\n\n");
  const facebookHashtag = getFacebookHashtag(resolvedShareData.hashtags);
  const hasNativeShare =
    typeof navigator !== "undefined" && typeof navigator.share === "function";
  const showMessenger = Boolean(resolvedShareData.messengerAppId);

  const closePopup = () => {
    if (onClose) {
      onClose();
      return;
    }

    if (setOpenPopup) {
      setOpenPopup(false);
    }
  };

  const handleCopyLink = async () => {
    try {
      if (typeof navigator !== "undefined" && navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(shareCopyText);
      } else {
        const textArea = document.createElement("textarea");
        textArea.value = shareCopyText;
        textArea.setAttribute("readonly", "");
        textArea.style.position = "fixed";
        textArea.style.opacity = "0";
        document.body.appendChild(textArea);
        textArea.select();
        const wasCopied = document.execCommand("copy");
        document.body.removeChild(textArea);

        if (!wasCopied) {
          throw new Error("Unable to copy the link.");
        }
      }

      setCopied(true);
      toastMessages.success("Link copied to clipboard.");

      if (copyResetTimerRef.current) {
        window.clearTimeout(copyResetTimerRef.current);
      }

      copyResetTimerRef.current = window.setTimeout(() => {
        setCopied(false);
      }, 2000);
    } catch (error) {
      toastMessages.error("Unable to copy the link.");
    }
  };

  const handleNativeShare = async () => {
    if (!hasNativeShare) {
      return;
    }

    try {
      await navigator.share({
        title: resolvedShareData.title || APP_NAME,
        text: shareText,
        url: shareUrl,
      });
      toastMessages.success("Shared successfully.");
    } catch (error) {
      if (error?.name !== "AbortError") {
        toastMessages.error("Unable to open the device share sheet.");
      }
    }
  };

  React.useEffect(() => {
    return () => {
      if (copyResetTimerRef.current) {
        window.clearTimeout(copyResetTimerRef.current);
      }
    };
  }, []);

  const tileBaseSx = {
    width: "100%",
    minHeight: 118,
    borderRadius: 3,
    p: 1.5,
    border: "1px solid transparent",
    display: "flex",
    alignItems: "stretch",
    textAlign: "left",
    transition: "transform 160ms ease, box-shadow 160ms ease, border-color 160ms ease",
    textDecoration: "none",
    "&:hover": {
      transform: "translateY(-2px)",
      boxShadow: theme.customShadows.small,
    },
  };

  const renderShareTile = ({ color, icon, label, note }) => {
    return (
      <Box sx={{ ...tileBaseSx, backgroundColor: alpha(color, 0.06), borderColor: alpha(color, 0.18) }}>
        <Stack spacing={1.25} justifyContent="space-between" sx={{ width: "100%" }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1.25 }}>
            <Box sx={{ lineHeight: 0, flexShrink: 0 }}>
              {icon}
            </Box>
            <Box>
              <Typography variant="subtitle2" sx={{ fontWeight: 700, lineHeight: 1.2 }}>
                {label}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                {note}
              </Typography>
            </Box>
          </Box>
          <Typography
            variant="caption"
            sx={{
              color: color,
              fontWeight: 700,
              letterSpacing: 0.2,
            }}
          >
            Tap to share
          </Typography>
        </Stack>
      </Box>
    );
  };

  return (
    <Dialog
      open={open}
      onClose={closePopup}
      fullWidth
      maxWidth="sm"
      PaperProps={{
        sx: {
          overflow: "hidden",
          borderRadius: { xs: 3, sm: 4 },
          boxShadow: theme.customShadows.large,
          backgroundImage: "none",
        },
      }}
    >
      <DialogTitle sx={{ p: 0 }}>
        <Box
          sx={{
            position: "relative",
            overflow: "hidden",
            p: { xs: 2.5, sm: 3 },
            color: "common.white",
            background: (muiTheme) =>
              `linear-gradient(135deg, ${muiTheme.palette.primary.main} 0%, ${muiTheme.palette.secondary.main} 100%)`,
            "&::before": {
              content: '""',
              position: "absolute",
              inset: 0,
              background:
                "radial-gradient(circle at top right, rgba(255,255,255,0.18), transparent 36%)",
              pointerEvents: "none",
            },
            "&::after": {
              content: '""',
              position: "absolute",
              bottom: -70,
              left: -40,
              width: 170,
              height: 170,
              borderRadius: "50%",
              background: "rgba(255,255,255,0.1)",
              pointerEvents: "none",
            },
          }}
        >
          <Stack
            direction="row"
            alignItems="flex-start"
            justifyContent="space-between"
            spacing={2}
            sx={{ position: "relative", zIndex: 1 }}
          >
            <Stack direction="row" spacing={1.5} alignItems="center">
              <Box
                sx={{
                  width: 52,
                  height: 52,
                  borderRadius: 3,
                  display: "grid",
                  placeItems: "center",
                  bgcolor: "rgba(255,255,255,0.16)",
                  border: "1px solid rgba(255,255,255,0.22)",
                  boxShadow: "0 12px 28px rgba(0,0,0,0.12)",
                  flexShrink: 0,
                }}
              >
                <ShareIcon />
              </Box>
              <Box>
                <Typography
                  variant="overline"
                  sx={{
                    display: "block",
                    letterSpacing: 1.6,
                    opacity: 0.88,
                    lineHeight: 1,
                  }}
                >
                  {resolvedShareData.badge || "Share"}
                </Typography>
                <Typography variant="h5" sx={{ fontWeight: 800, mt: 0.5 }}>
                  {resolvedShareData.dialogTitle || "Share this page"}
                </Typography>
              </Box>
            </Stack>

            <IconButton
              onClick={closePopup}
              size="small"
              sx={{
                color: "common.white",
                bgcolor: "rgba(255,255,255,0.12)",
                border: "1px solid rgba(255,255,255,0.16)",
                "&:hover": {
                  bgcolor: "rgba(255,255,255,0.2)",
                },
              }}
            >
              <CloseIcon fontSize="small" />
            </IconButton>
          </Stack>

          <Typography
            variant="body2"
            sx={{
              position: "relative",
              zIndex: 1,
              mt: 2,
              maxWidth: 520,
              color: "rgba(255,255,255,0.9)",
            }}
          >
            {resolvedShareData.description ||
              "Share this listing with your network and give it more reach."}
          </Typography>
        </Box>
      </DialogTitle>

      <DialogContent sx={{ p: 0 }}>
        <Box sx={{ p: { xs: 2, sm: 3 }, pt: 2.5 }}>
          <Stack spacing={2.5}>
            <Box
              sx={{
                p: 2,
                borderRadius: 3,
                bgcolor: "grey.50",
                border: "1px solid",
                borderColor: "grey.200",
              }}
            >
              <Stack spacing={1}>
                <Typography
                  variant="caption"
                  sx={{
                    color: "primary.main",
                    textTransform: "uppercase",
                    letterSpacing: 1.2,
                    fontWeight: 700,
                  }}
                >
                  Preview
                </Typography>
                <Typography variant="h6" sx={{ fontWeight: 700 }}>
                  {resolvedShareData.title || "Share this page"}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {resolvedShareData.description ||
                    "Share this listing with a wider audience."}
                </Typography>
              </Stack>
            </Box>

            <Box>
              <Typography variant="subtitle2" sx={{ mb: 1 }}>
                Share link
              </Typography>
              <TextField
                fullWidth
                size="small"
                value={shareUrl}
                inputProps={{
                  readOnly: true,
                }}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: 3,
                    bgcolor: "common.white",
                  },
                }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <Button
                        onClick={handleCopyLink}
                        variant="contained"
                        size="small"
                        color={copied ? "success" : "primary"}
                        startIcon={copied ? <CheckIcon /> : <ContentCopyIcon />}
                        sx={{
                          borderRadius: 999,
                          minWidth: 124,
                          ml: 1,
                          whiteSpace: "nowrap",
                        }}
                      >
                        {copied ? "Copied" : "Copy"}
                      </Button>
                    </InputAdornment>
                  ),
                }}
              />

              {hasNativeShare && (
                <Button
                  onClick={handleNativeShare}
                  variant="outlined"
                  color="primary"
                  startIcon={<OpenInNewIcon />}
                  sx={{
                    mt: 1.25,
                    borderRadius: 999,
                    px: 2.5,
                    borderColor: "primary.main",
                    bgcolor: "primary.background",
                  }}
                >
                  Share on device
                </Button>
              )}
            </Box>

            <Divider />

            <Box>
              <Typography variant="h6" sx={{ mb: 1.5 }}>
                Social channels
              </Typography>
              <Grid container spacing={1.5}>
                <Grid item xs={6} sm={4}>
                  <FacebookShareButton
                    url={shareUrl}
                    quote={resolvedShareData.quote || resolvedShareData.description || resolvedShareData.title || ""}
                    hashtag={facebookHashtag}
                    style={{ width: "100%", display: "block" }}
                  >
                    {renderShareTile({
                      color: "#1877F2",
                      label: "Facebook",
                      note: "Feed and groups",
                      icon: (
                        <FacebookIcon
                          size={48}
                          round
                          bgStyle={{ fill: "#1877F2" }}
                        />
                      ),
                    })}
                  </FacebookShareButton>
                </Grid>

                {showMessenger && (
                  <Grid item xs={6} sm={4}>
                    <FacebookMessengerShareButton
                      url={shareUrl}
                      appId={resolvedShareData.messengerAppId}
                      redirectUri={shareUrl}
                      style={{ width: "100%", display: "block" }}
                    >
                      {renderShareTile({
                        color: "#0099FF",
                        label: "Messenger",
                        note: "Direct chat",
                        icon: (
                          <FacebookMessengerIcon
                            size={48}
                            round
                            bgStyle={{ fill: "#0099FF" }}
                          />
                        ),
                      })}
                    </FacebookMessengerShareButton>
                  </Grid>
                )}

                <Grid item xs={6} sm={4}>
                  <WhatsappShareButton
                    url={shareUrl}
                    title={shareText}
                    separator="\n\n"
                    style={{ width: "100%", display: "block" }}
                  >
                    {renderShareTile({
                      color: "#25D366",
                      label: "WhatsApp",
                      note: "Fast mobile sharing",
                      icon: (
                        <WhatsappIcon
                          size={48}
                          round
                          bgStyle={{ fill: "#25D366" }}
                        />
                      ),
                    })}
                  </WhatsappShareButton>
                </Grid>

                <Grid item xs={6} sm={4}>
                  <TelegramShareButton
                    url={shareUrl}
                    title={shareText}
                    separator="\n\n"
                    style={{ width: "100%", display: "block" }}
                  >
                    {renderShareTile({
                      color: "#229ED9",
                      label: "Telegram",
                      note: "Chats and channels",
                      icon: (
                        <TelegramIcon
                          size={48}
                          round
                          bgStyle={{ fill: "#229ED9" }}
                        />
                      ),
                    })}
                  </TelegramShareButton>
                </Grid>

                <Grid item xs={6} sm={4}>
                  <LinkedinShareButton
                    url={shareUrl}
                    title={resolvedShareData.title || ""}
                    summary={resolvedShareData.description || ""}
                    source={resolvedShareData.source || APP_NAME}
                    style={{ width: "100%", display: "block" }}
                  >
                    {renderShareTile({
                      color: "#0A66C2",
                      label: "LinkedIn",
                      note: "Professional network",
                      icon: (
                        <LinkedinIcon
                          size={48}
                          round
                          bgStyle={{ fill: "#0A66C2" }}
                        />
                      ),
                    })}
                  </LinkedinShareButton>
                </Grid>

                <Grid item xs={6} sm={4}>
                  <TwitterShareButton
                    url={shareUrl}
                    title={resolvedShareData.title || ""}
                    via={resolvedShareData.via || ""}
                    hashtags={resolvedShareData.hashtags || []}
                    related={resolvedShareData.related || []}
                    style={{ width: "100%", display: "block" }}
                  >
                    {renderShareTile({
                      color: "#111111",
                      label: "X / Twitter",
                      note: "Short public post",
                      icon: (
                        <TwitterIcon
                          size={48}
                          round
                          bgStyle={{ fill: "#111111" }}
                        />
                      ),
                    })}
                  </TwitterShareButton>
                </Grid>

                <Grid item xs={6} sm={4}>
                  <EmailShareButton
                    url={shareUrl}
                    subject={resolvedShareData.subject || resolvedShareData.title || ""}
                    body={resolvedShareData.emailBody || resolvedShareData.description || ""}
                    separator="\n\n"
                    style={{ width: "100%", display: "block" }}
                  >
                    {renderShareTile({
                      color: "#EA4335",
                      label: "Email",
                      note: "Send by inbox",
                      icon: (
                        <EmailIcon
                          size={48}
                          round
                          bgStyle={{ fill: "#EA4335" }}
                        />
                      ),
                    })}
                  </EmailShareButton>
                </Grid>
              </Grid>
            </Box>
          </Stack>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

SocialNetworkSharingPopup.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func,
  setOpenPopup: PropTypes.func,
  shareData: PropTypes.shape({
    badge: PropTypes.string,
    dialogTitle: PropTypes.string,
    title: PropTypes.string,
    description: PropTypes.string,
    quote: PropTypes.string,
    subject: PropTypes.string,
    emailBody: PropTypes.string,
    copyText: PropTypes.string,
    nativeText: PropTypes.string,
    hashtags: PropTypes.arrayOf(PropTypes.string),
    source: PropTypes.string,
    via: PropTypes.string,
    messengerAppId: PropTypes.string,
    url: PropTypes.string,
  }),
  facebook: PropTypes.shape({
    url: PropTypes.string,
    quote: PropTypes.string,
    hashtag: PropTypes.string,
  }),
  facebookMessenger: PropTypes.shape({
    url: PropTypes.string,
    appId: PropTypes.string,
    to: PropTypes.string,
  }),
  linkedin: PropTypes.shape({
    url: PropTypes.string,
    title: PropTypes.string,
    summary: PropTypes.string,
    source: PropTypes.string,
  }),
  twitter: PropTypes.shape({
    url: PropTypes.string,
    title: PropTypes.string,
    via: PropTypes.string,
    hashtags: PropTypes.arrayOf(PropTypes.string),
    related: PropTypes.arrayOf(PropTypes.string),
  }),
  email: PropTypes.shape({
    url: PropTypes.string,
    subject: PropTypes.string,
    body: PropTypes.string,
  }),
};

export default SocialNetworkSharingPopup;
