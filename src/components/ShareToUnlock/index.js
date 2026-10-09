import * as React from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Divider,
  LinearProgress,
  Stack,
  Typography,
  IconButton,
  Tooltip,
} from "@mui/material";
import ShareIcon from "@mui/icons-material/Share";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import LockIcon from "@mui/icons-material/Lock";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import CheckIcon from "@mui/icons-material/Check";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import FacebookIcon from "@mui/icons-material/Facebook";
import TelegramIcon from "@mui/icons-material/Telegram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import CloseIcon from "@mui/icons-material/Close";
import CardGiftcardIcon from "@mui/icons-material/CardGiftcard";
import toastMessages from "../../utils/toastMessages";
import {
  UNLOCK_TIERS,
  getShareCount,
  recordShare,
  buildReferralUrl,
  buildShareText,
  getProgressToNext,
} from "../../utils/referral";

// Share-to-redeem: no money, just shares. User shares Imyanya with a
// referral link → local counter grows → features unlock (alerts, salary
// insights, CV spotlight). Visual + rewarding to drive traffic.
const ShareToUnlock = ({
  pageTitle = "Jobs in Rwanda",
  shareUrl,
  compact = false,
  dismissible = false,
}) => {
  const [count, setCount] = React.useState(0);
  const [copied, setCopied] = React.useState(false);
  const [dismissed, setDismissed] = React.useState(false);

  React.useEffect(() => {
    setCount(getShareCount());
    const onStorage = () => setCount(getShareCount());
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  const referralLink = React.useMemo(
    () => buildReferralUrl(shareUrl || (typeof window !== "undefined" ? window.location.href : "https://imyanya.rw/")),
    [shareUrl]
  );
  const shareText = React.useMemo(() => buildShareText(pageTitle), [pageTitle]);
  const progress = getProgressToNext(count);
  const isMaxed = !progress.next;

  const handleCounted = (channel) => {
    const res = recordShare(channel);
    setCount(res.count);
    if (res.justUnlocked) {
      const tier = UNLOCK_TIERS.find((t) => t.count === res.count);
      toastMessages.success(`Unlocked: ${tier?.label || "new feature"}! Keep sharing for more.`);
    } else if (isMaxed) {
      toastMessages.success("Thanks for sharing Imyanya across Rwanda!");
    } else {
      toastMessages.success(`Shared! ${progress.remaining - 1 <= 0 ? "Almost there" : `${progress.remaining - 1} more share(s)`} to unlock ${progress.next?.label}.`);
    }
  };

  const openShare = (channel, href) => {
    handleCounted(channel);
    window.open(href, "_blank", "noopener,noreferrer,width=640,height=560");
  };

  const handleCopy = async () => {
    try {
      const text = `${shareText}\n\n${referralLink}`;
      if (navigator.clipboard?.writeText) await navigator.clipboard.writeText(text);
      else {
        const ta = document.createElement("textarea");
        ta.value = text;
        document.body.appendChild(ta);
        ta.select();
        document.execCommand("copy");
        document.body.removeChild(ta);
      }
      setCopied(true);
      handleCounted("copy");
      setTimeout(() => setCopied(false), 2000);
    } catch (e) {
      toastMessages.error("Copy failed — long-press the link to copy.");
    }
  };

  const handleNative = async () => {
    if (!navigator.share) return handleCopy();
    try {
      await navigator.share({ title: pageTitle, text: shareText, url: referralLink });
      handleCounted("native");
    } catch (e) {
      if (e?.name !== "AbortError") toastMessages.error("Share cancelled.");
    }
  };

  if (dismissed) return null;

  const waHref = `https://wa.me/?text=${encodeURIComponent(`${shareText}\n\n${referralLink}`)}`;
  const fbHref = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(referralLink)}&quote=${encodeURIComponent(shareText)}`;
  const tgHref = `https://t.me/share/url?url=${encodeURIComponent(referralLink)}&text=${encodeURIComponent(shareText)}`;
  const liHref = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(referralLink)}`;
  const xHref = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(referralLink)}&hashtags=JobsInRwanda,KigaliJobs,Imyanya`;

  return (
    <Card
      component="section"
      aria-label="Share Imyanya to unlock free features"
      sx={{
        position: "relative",
        overflow: "hidden",
        borderRadius: 4,
        border: "1px solid rgba(255,152,0,0.35)",
        backgroundImage: "linear-gradient(135deg, #2f1578 0%, #441da0 45%, #6d28d9 80%, #b45309 130%)",
        color: "white",
        boxShadow: "0 18px 50px -16px rgba(47,21,120,0.6)",
      }}
    >
      <Box sx={{ height: 4, background: "linear-gradient(90deg,#ff9800,#ffb74d,#8b5cf6)" }} />
      {dismissible && (
        <IconButton
          aria-label="Dismiss share panel"
          size="small"
          onClick={() => setDismissed(true)}
          sx={{ position: "absolute", top: 10, right: 10, color: "rgba(255,255,255,0.8)" }}
        >
          <CloseIcon fontSize="small" />
        </IconButton>
      )}
      <CardContent sx={{ p: { xs: 2.5, sm: 3.5 } }}>
        <Stack direction={{ xs: "column", sm: "row" }} spacing={2.5} alignItems={{ sm: "center" }}>
          <Box
            sx={{
              width: 60, height: 60, borderRadius: 4, flexShrink: 0,
              display: "grid", placeItems: "center",
              bgcolor: "rgba(255,152,0,0.18)", border: "1px solid rgba(255,152,0,0.5)",
              boxShadow: "0 8px 24px -6px rgba(255,152,0,0.6)",
              animation: "sharePulse 2.2s ease-in-out infinite",
              "@keyframes sharePulse": {
                "0%,100%": { transform: "scale(1)" },
                "50%": { transform: "scale(1.06)" },
              },
            }}
          >
            <CardGiftcardIcon sx={{ fontSize: 30, color: "#ffb74d" }} />
          </Box>
          <Box sx={{ flex: 1, minWidth: 0 }}>
            <Stack direction="row" spacing={1} alignItems="center" sx={{ flexWrap: "wrap", rowGap: 1 }}>
              <Chip
                label="SHARE & REDEEM • NO MONEY"
                size="small"
                sx={{ bgcolor: "#ff9800", color: "#2f1578", fontWeight: 800, fontSize: 11, letterSpacing: 0.6 }}
              />
              <Chip
                label={`${count} share${count === 1 ? "" : "s"}`}
                size="small"
                variant="outlined"
                sx={{ color: "white", borderColor: "rgba(255,255,255,0.4)", fontWeight: 700 }}
              />
            </Stack>
            <Typography variant={compact ? "h6" : "h5"} fontWeight={800} sx={{ mt: 1, lineHeight: 1.25 }}>
              Share Imyanya, unlock free career boosts
            </Typography>
            <Typography variant="body2" sx={{ color: "rgba(255,255,255,0.88)", mt: 0.5, lineHeight: 1.6 }}>
              {isMaxed
                ? "You unlocked everything — legend! Every share brings more jobs & employers to Rwanda."
                : `Share with ${progress.remaining} more friend${progress.remaining === 1 ? "" : "s"} to unlock ${progress.next?.label}. Invite via WhatsApp — it takes 10 seconds.`}
            </Typography>
            {!isMaxed && (
              <Box sx={{ mt: 1.5 }}>
                <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 0.5 }}>
                  <Typography variant="caption" fontWeight={700} sx={{ color: "#ffd54f" }}>
                    {count}/{progress.next?.count} → {progress.next?.label}
                  </Typography>
                  <Typography variant="caption" sx={{ color: "rgba(255,255,255,0.75)" }}>
                    {progress.percent}%
                  </Typography>
                </Stack>
                <LinearProgress
                  variant="determinate"
                  value={Math.max(8, Math.round((count / (progress.next?.count || 5)) * 100))}
                  sx={{
                    height: 8, borderRadius: 999, bgcolor: "rgba(255,255,255,0.18)",
                    "& .MuiLinearProgress-bar": { borderRadius: 999, backgroundImage: "linear-gradient(90deg,#ff9800,#ffb74d)" },
                  }}
                />
              </Box>
            )}
          </Box>
        </Stack>

        <Stack direction="row" spacing={1} sx={{ mt: 2.5, flexWrap: "wrap", rowGap: 1 }}>
          <Button
            variant="contained"
            startIcon={<WhatsAppIcon />}
            onClick={() => openShare("whatsapp", waHref)}
            sx={{ bgcolor: "#25D366", color: "white", fontWeight: 800, borderRadius: 999, px: 2.5, "&:hover": { bgcolor: "#1eb85a" } }}
          >
            WhatsApp
          </Button>
          <Button variant="contained" startIcon={<FacebookIcon />} onClick={() => openShare("facebook", fbHref)} sx={{ bgcolor: "white", color: "#1877F2", fontWeight: 800, borderRadius: 999 }}>
            Facebook
          </Button>
          <Button variant="outlined" onClick={() => openShare("x", xHref)} sx={{ color: "white", borderColor: "rgba(255,255,255,0.5)", fontWeight: 700, borderRadius: 999 }}>
            X Post
          </Button>
          <Button variant="outlined" startIcon={<TelegramIcon />} onClick={() => openShare("telegram", tgHref)} sx={{ color: "white", borderColor: "rgba(255,255,255,0.5)", fontWeight: 700, borderRadius: 999 }}>
            Telegram
          </Button>
          <Button variant="outlined" startIcon={<LinkedInIcon />} onClick={() => openShare("linkedin", liHref)} sx={{ color: "white", borderColor: "rgba(255,255,255,0.5)", fontWeight: 700, borderRadius: 999 }}>
            LinkedIn
          </Button>
          <Button
            variant="outlined"
            startIcon={copied ? <CheckIcon /> : <ContentCopyIcon />}
            onClick={handleCopy}
            sx={{ color: "#ffd54f", borderColor: "rgba(255,213,79,0.6)", fontWeight: 800, borderRadius: 999 }}
          >
            {copied ? "Copied!" : "Copy invite link"}
          </Button>
          {typeof navigator !== "undefined" && typeof navigator.share === "function" && (
            <Button variant="text" startIcon={<ShareIcon />} onClick={handleNative} sx={{ color: "white", fontWeight: 700 }}>
              More…
            </Button>
          )}
        </Stack>

        {!compact && (
          <>
            <Divider sx={{ my: 2.5, borderColor: "rgba(255,255,255,0.15)" }} />
            <Stack direction={{ xs: "column", sm: "row" }} spacing={1.5}>
              {UNLOCK_TIERS.map((tier) => {
                const unlocked = count >= tier.count;
                return (
                  <Box
                    key={tier.id}
                    sx={{
                      flex: 1, p: 1.75, borderRadius: 3,
                      bgcolor: unlocked ? "rgba(255,152,0,0.16)" : "rgba(255,255,255,0.07)",
                      border: unlocked ? "1px solid rgba(255,152,0,0.55)" : "1px solid rgba(255,255,255,0.14)",
                    }}
                  >
                    <Stack direction="row" spacing={1} alignItems="center">
                      <Typography fontSize={22}>{tier.icon}</Typography>
                      <Typography variant="subtitle2" fontWeight={800}>
                        {tier.label}
                      </Typography>
                      {unlocked ? (
                        <LockOpenIcon sx={{ ml: "auto", fontSize: 18, color: "#ffb74d" }} />
                      ) : (
                        <Tooltip title={`Share ${tier.count - count} more to unlock`}>
                          <LockIcon sx={{ ml: "auto", fontSize: 18, color: "rgba(255,255,255,0.55)" }} />
                        </Tooltip>
                      )}
                    </Stack>
                    <Typography variant="caption" sx={{ color: unlocked ? "#ffe0b2" : "rgba(255,255,255,0.7)", mt: 0.5, display: "block", lineHeight: 1.55 }}>
                      {unlocked ? "Unlocked ✓ — enjoy it free." : `${tier.description} (${tier.count} share${tier.count === 1 ? "" : "s"})`}
                    </Typography>
                  </Box>
                );
              })}
            </Stack>
            <Typography variant="caption" sx={{ display: "block", mt: 1.5, color: "rgba(255,255,255,0.6)", textAlign: "center" }}>
              Your invite link: {referralLink}
            </Typography>
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default ShareToUnlock;
