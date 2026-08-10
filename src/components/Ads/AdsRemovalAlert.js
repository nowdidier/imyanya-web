import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Alert, Button, IconButton, Collapse } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import WorkspacePremiumIcon from "@mui/icons-material/WorkspacePremium";
import useShouldShowAds from "../../hooks/useShouldShowAds";
import { ROUTES } from "../../configs/constants";

const STORAGE_KEY = "imyanya-ads-alert-dismissed";

const AdsRemovalAlert = () => {
  const shouldShowAds = useShouldShowAds();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (!shouldShowAds) {
      setIsOpen(false);
      return;
    }

    const dismissed = window.localStorage.getItem(STORAGE_KEY) === "1";
    if (!dismissed) setIsOpen(true);
  }, [shouldShowAds]);

  const handleClose = () => {
    window.localStorage.setItem(STORAGE_KEY, "1");
    setIsOpen(false);
  };

  if (!shouldShowAds) return null;

  return (
    <Collapse in={isOpen}>
      <Alert
        severity="info"
        icon={<WorkspacePremiumIcon fontSize="inherit" />}
        sx={{
          borderRadius: 0,
          "& .MuiAlert-message": {
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexWrap: "wrap",
            gap: 1,
          },
        }}
        action={
          <IconButton
            aria-label="close"
            color="inherit"
            size="small"
            onClick={handleClose}
          >
            <CloseIcon fontSize="inherit" />
          </IconButton>
        }
      >
        Get Pro for free — a 100% ad-free experience.
        <Button
          component={Link}
          to={`/${ROUTES.AUTH.REGISTER}`}
          size="small"
          variant="contained"
          color="primary"
        >
          Sign Up Free
        </Button>
        <Button
          component={Link}
          to={`/${ROUTES.AUTH.LOGIN}`}
          size="small"
          variant="outlined"
          color="primary"
        >
          Log In
        </Button>
      </Alert>
    </Collapse>
  );
};

export default AdsRemovalAlert;
