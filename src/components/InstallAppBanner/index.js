import * as React from "react";
import {
  Box,
  Button,
  Card,
  Collapse,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import GetAppIcon from "@mui/icons-material/GetApp";
import IosShareIcon from "@mui/icons-material/IosShare";

const DISMISS_KEY = "imyanya-pwa-dismissed-at";
const DISMISS_DAYS = 30;

const isIosDevice = () =>
  typeof navigator !== "undefined" &&
  /iphone|ipad|ipod/i.test(navigator.userAgent);

const isStandalone = () =>
  (typeof window !== "undefined" &&
    window.matchMedia &&
    window.matchMedia("(display-mode: standalone)").matches) ||
  (typeof navigator !== "undefined" && navigator.standalone === true);

const wasDismissedRecently = () => {
  try {
    const raw = localStorage.getItem(DISMISS_KEY);
    if (!raw) return false;
    return Date.now() - Number(raw) < DISMISS_DAYS * 24 * 60 * 60 * 1000;
  } catch (error) {
    return false;
  }
};

// Floating "install the web app" nudge. Chrome/Edge: uses the real
// beforeinstallprompt. iPhone/iPad: shows Add-to-Home-Screen steps.
const InstallAppBanner = () => {
  const [deferredPrompt, setDeferredPrompt] = React.useState(null);
  const [visible, setVisible] = React.useState(false);
  const [showIosSteps, setShowIosSteps] = React.useState(false);
  const isIos = React.useMemo(isIosDevice, []);

  React.useEffect(() => {
    if (isStandalone() || wasDismissedRecently()) return undefined;

    const onPrompt = (event) => {
      event.preventDefault();
      setDeferredPrompt(event);
      // Small delay so it doesn't fight the page load.
      const id = setTimeout(() => setVisible(true), 2000);
      return () => clearTimeout(id);
    };

    // iOS never fires beforeinstallprompt — show the manual path instead.
    if (isIosDevice() && !navigator.standalone) {
      const id = setTimeout(() => setVisible(true), 2500);
      window.addEventListener("beforeinstallprompt", onPrompt);
      return () => {
        window.removeEventListener("beforeinstallprompt", onPrompt);
        clearTimeout(id);
      };
    }

    window.addEventListener("beforeinstallprompt", onPrompt);
    return () => window.removeEventListener("beforeinstallprompt", onPrompt);
  }, []);

  const dismiss = React.useCallback((remember = true) => {
    try {
      if (remember) localStorage.setItem(DISMISS_KEY, String(Date.now()));
    } catch (error) {
      // storage unavailable — just hide for this session
    }
    setVisible(false);
  }, []);

  const handleInstall = React.useCallback(async () => {
    if (isIos) {
      setShowIosSteps((v) => !v);
      return;
    }
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    try {
      await deferredPrompt.userChoice;
    } catch (error) {
      // ignore — banner stays until dismissed
    }
    setDeferredPrompt(null);
    dismiss(true);
  }, [deferredPrompt, dismiss, isIos]);

  if (!visible || (!deferredPrompt && !isIos)) return null;

  return (
    <Box
      sx={{
        position: "fixed",
        left: 0,
        right: 0,
        bottom: { xs: 12, sm: 20 },
        zIndex: 1400,
        display: "flex",
        justifyContent: "center",
        px: 2,
        pointerEvents: "none",
      }}
    >
      <Collapse in={visible} sx={{ width: "100%", maxWidth: 520 }}>
        <Card
          sx={{
            pointerEvents: "auto",
            borderRadius: 4,
            overflow: "hidden",
            border: "1px solid rgba(255, 255, 255, 0.25)",
            backgroundImage:
              "linear-gradient(120deg, #2f1578 0%, #441da0 45%, #6d28d9 100%)",
            boxShadow: "0 18px 50px -12px rgba(47, 21, 120, 0.65)",
            color: "white",
          }}
        >
          <Box
            sx={{
              height: 4,
              background:
                "linear-gradient(90deg, #ff9800 0%, #ffb74d 50%, #8b5cf6 100%)",
            }}
          />
          <Stack
            direction="row"
            spacing={1.5}
            alignItems="center"
            sx={{ p: 2 }}
          >
            <Box
              component="img"
              src={`${process.env.PUBLIC_URL || ""}/logo192.png`}
              alt="Imyanya app icon"
              sx={{
                width: 52,
                height: 52,
                borderRadius: 3,
                flexShrink: 0,
                bgcolor: "white",
                p: 0.5,
                boxShadow: "0 6px 18px -6px rgba(0,0,0,0.5)",
              }}
            />
            <Box sx={{ flex: 1, minWidth: 0 }}>
              <Typography fontWeight={800} sx={{ lineHeight: 1.3 }}>
                Get the Imyanya app
              </Typography>
              <Typography
                variant="body2"
                sx={{ color: "rgba(255,255,255,0.85)", lineHeight: 1.45 }}
              >
                Install in seconds — jobs, alerts &amp; 1-tap open. Free,
                no app store needed.
              </Typography>
            </Box>
            <Button
              variant="contained"
              size="small"
              startIcon={isIos ? <IosShareIcon /> : <GetAppIcon />}
              onClick={handleInstall}
              sx={{
                flexShrink: 0,
                bgcolor: "white",
                color: "#441da0",
                fontWeight: 800,
                "&:hover": { bgcolor: "#ede9fe" },
              }}
            >
              {isIos ? "How" : "Install"}
            </Button>
            <IconButton
              aria-label="Dismiss install banner"
              size="small"
              onClick={() => dismiss(true)}
              sx={{ color: "rgba(255,255,255,0.8)", flexShrink: 0 }}
            >
              <CloseIcon fontSize="small" />
            </IconButton>
          </Stack>
          {isIos && showIosSteps && (
            <Box
              sx={{
                mx: 2,
                mb: 2,
                p: 1.5,
                borderRadius: 2,
                bgcolor: "rgba(255,255,255,0.12)",
              }}
            >
              <Typography variant="body2" sx={{ lineHeight: 1.7 }}>
                1. Tap the <strong>Share</strong> button in Safari
                <br />
                2. Choose <strong>Add to Home Screen</strong>
                <br />
                3. Tap <strong>Add</strong> — Imyanya opens like an app
              </Typography>
            </Box>
          )}
        </Card>
      </Collapse>
    </Box>
  );
};

export default InstallAppBanner;
