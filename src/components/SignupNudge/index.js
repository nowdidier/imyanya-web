import * as React from "react";
import { Link as RouterLink } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Collapse,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import BoltIcon from "@mui/icons-material/Bolt";
import { ROUTES } from "../../configs/constants";
import { shouldShowSignupNudge, dismissSignupNudge, getReferredBy } from "../../utils/referral";

// Attention-grabbing signup nudge. Shows only to guests.
// Variants: "banner" (in-feed CTA), "sticky" (bottom bar), "hero" (compact strip).
const BENEFITS = [
  "1-click apply to Kigali & Rwanda jobs",
  "Free CV + cover-letter builder (Word & PDF)",
  "Job alerts before deadlines pass",
];

const SignupNudge = ({ variant = "banner" }) => {
  const { isAuthenticated } = useSelector((state) => state.user || {});
  const [visible, setVisible] = React.useState(false);
  const [referredBy, setReferredBy] = React.useState(null);

  React.useEffect(() => {
    if (isAuthenticated) {
      setVisible(false);
      return;
    }
    setReferredBy(getReferredBy());
    setVisible(shouldShowSignupNudge());
  }, [isAuthenticated]);

  if (isAuthenticated || !visible) return null;

  const handleDismiss = () => {
    dismissSignupNudge();
    setVisible(false);
  };

  if (variant === "sticky") {
    return (
      <Box
        sx={{
          position: "fixed", left: 0, right: 0, bottom: 0, zIndex: 1300,
          px: { xs: 1.5, sm: 3 }, pb: { xs: 1.5, sm: 2 }, pointerEvents: "none",
        }}
      >
        <Collapse in={visible}>
          <Card
            sx={{
              pointerEvents: "auto", maxWidth: 720, mx: "auto", borderRadius: 4, overflow: "hidden",
              border: "1px solid rgba(255,152,0,0.4)",
              backgroundImage: "linear-gradient(120deg,#2f1578 0%,#441da0 55%,#6d28d9 100%)",
              color: "white", boxShadow: "0 18px 50px -12px rgba(47,21,120,0.7)",
            }}
          >
            <Box sx={{ height: 3, background: "linear-gradient(90deg,#ff9800,#ffb74d,#8b5cf6)" }} />
            <CardContent sx={{ p: 2, display: "flex", gap: 1.5, alignItems: "center" }}>
              <Box sx={{ flex: 1, minWidth: 0 }}>
                <Typography fontWeight={800} sx={{ fontSize: 15, lineHeight: 1.35 }}>
                  Free account = 3× more interviews 🇷🇼
                </Typography>
                <Typography variant="caption" sx={{ color: "rgba(255,255,255,0.82)" }}>
                  Join free in 60 seconds — CV builder + alerts included.
                </Typography>
              </Box>
              <Button
                component={RouterLink}
                to={`/${ROUTES.AUTH.REGISTER}`}
                variant="contained"
                size="small"
                sx={{ bgcolor: "#ff9800", color: "#2f1578", fontWeight: 800, borderRadius: 999, px: 2.5, flexShrink: 0, "&:hover": { bgcolor: "#ffb74d" } }}
              >
                Sign up free
              </Button>
              <IconButton size="small" aria-label="Dismiss signup bar" onClick={handleDismiss} sx={{ color: "rgba(255,255,255,0.7)", flexShrink: 0 }}>
                <CloseIcon fontSize="small" />
              </IconButton>
            </CardContent>
          </Card>
        </Collapse>
      </Box>
    );
  }

  return (
    <Card
      component="section"
      aria-label="Create a free Imyanya account"
      sx={{
        position: "relative", overflow: "hidden", borderRadius: 4,
        border: "1px solid rgba(109,40,217,0.22)",
        backgroundImage: "linear-gradient(135deg,#ffffff 0%,#f5f0ff 55%,#fff7ed 100%)",
        boxShadow: (theme) => theme.customShadows.glow,
      }}
    >
      <Box sx={{ height: 4, background: "linear-gradient(90deg,#441da0,#6d28d9 45%,#ff9800)" }} />
      <IconButton aria-label="Dismiss signup nudge" size="small" onClick={handleDismiss} sx={{ position: "absolute", top: 8, right: 8, color: "text.secondary" }}>
        <CloseIcon fontSize="small" />
      </IconButton>
      <CardContent sx={{ p: { xs: 2.5, sm: 3.5 } }}>
        <Stack direction={{ xs: "column", md: "row" }} spacing={2.5} alignItems={{ md: "center" }}>
          <Box
            sx={{
              width: 58, height: 58, borderRadius: 4, flexShrink: 0, display: "grid", placeItems: "center",
              backgroundImage: "linear-gradient(135deg,#441da0,#6d28d9)", color: "white",
              boxShadow: "0 10px 26px -8px rgba(109,40,217,0.6)",
            }}
          >
            <PersonAddAltIcon sx={{ fontSize: 30 }} />
          </Box>
          <Box sx={{ flex: 1, minWidth: 0 }}>
            <Stack direction="row" spacing={1} alignItems="center" sx={{ flexWrap: "wrap", rowGap: 1 }}>
              <Chip icon={<BoltIcon sx={{ fontSize: 14 }} />} label="FREE FOREVER" size="small" sx={{ bgcolor: "#ff9800", color: "#2f1578", fontWeight: 800, fontSize: 11 }} />
              {referredBy && (
                <Chip label={`Invited by ${referredBy} — claim your bonus`} size="small" variant="outlined" sx={{ fontWeight: 700 }} />
              )}
            </Stack>
            <Typography variant="h5" fontWeight={800} sx={{ mt: 1, lineHeight: 1.25 }}>
              Stop scrolling jobs. Start getting hired.
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5, lineHeight: 1.65 }}>
              Create your free account in 60 seconds and apply faster than everyone else.
            </Typography>
            <Stack direction="row" spacing={1} sx={{ mt: 1.25, flexWrap: "wrap", rowGap: 1 }}>
              {BENEFITS.map((b) => (
                <Chip key={b} icon={<CheckCircleIcon sx={{ fontSize: 15 }} />} label={b} size="small" variant="outlined" sx={{ fontWeight: 600 }} />
              ))}
            </Stack>
          </Box>
          <Stack spacing={1.25} sx={{ minWidth: { md: 230 } }}>
            <Button
              component={RouterLink}
              to={`/${ROUTES.AUTH.REGISTER}`}
              variant="contained"
              size="large"
              sx={{ fontWeight: 800, borderRadius: 999, px: 3.5, py: 1.4 }}
            >
              Create free account
            </Button>
            <Button component={RouterLink} to={`/${ROUTES.AUTH.LOGIN}`} variant="outlined" size="large" sx={{ fontWeight: 700, borderRadius: 999 }}>
              I already have an account
            </Button>
            <Typography variant="caption" color="text.secondary" textAlign="center">
              No fees • No spam • Unsubscribe anytime
            </Typography>
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  );
};

export default SignupNudge;
