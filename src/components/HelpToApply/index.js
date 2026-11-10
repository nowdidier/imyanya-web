import React from "react";
import {
  Alert,
  Box,
  Button,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControlLabel,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Paper,
  Radio,
  RadioGroup,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import ShieldOutlinedIcon from "@mui/icons-material/ShieldOutlined";
import PhoneIphoneIcon from "@mui/icons-material/PhoneIphone";
import WorkOutlineOutlinedIcon from "@mui/icons-material/WorkOutlineOutlined";

import toastMessages from "../../utils/toastMessages";
import { buildWhatsAppUrl } from "../../utils/funcUtils";
import {
  EMPLOYER_HELP_CONFIG,
  HELP_TO_APPLY_CONFIG,
} from "../../configs/constants";

const HelpToApplyContext = React.createContext(null);

/**
 * Usage: `const { openHelp } = useHelpToApply();`
 * Then: `openHelp({ source: "cv-builder", jobTitle, jobUrl })`
 * `source` decides the pre-selected service and the "Source:" line in the
 * WhatsApp message, so every placement can be tracked separately.
 */
export const useHelpToApply = () => {
  const context = React.useContext(HelpToApplyContext);

  if (!context) {
    throw new Error(
      "useHelpToApply must be used within a HelpToApplyProvider"
    );
  }

  return context;
};

/**
 * Employer side of the same modal. Opens the employer services (post for me,
 * write + post, post + shortlist, full recruitment) with an optional company
 * name so the WhatsApp message is ready to act on.
 *
 * Usage: `const { openEmployerHelp } = useEmployerHelp();`
 * Then: `openEmployerHelp({ source: "employer-dashboard" })`
 */
export const useEmployerHelp = () => {
  const { request, openHelp, closeHelp } = useHelpToApply();

  const openEmployerHelp = React.useCallback(
    (options = {}) =>
      openHelp({
        mode: "employer",
        source: "employer-page",
        ...options,
      }),
    [openHelp]
  );

  return { request, openEmployerHelp, closeHelp };
};

export const helpPriceLabel = (value) =>
  `${Number(value || 0).toLocaleString("en-US")} RWF`;

const applicantServices = Object.values(HELP_TO_APPLY_CONFIG.SERVICES);
const employerServices = Object.values(EMPLOYER_HELP_CONFIG.SERVICES);

const getHelpMode = (mode) => {
  const isEmployer = mode === "employer";
  const config = isEmployer ? EMPLOYER_HELP_CONFIG : HELP_TO_APPLY_CONFIG;

  return {
    isEmployer,
    config,
    services: isEmployer ? employerServices : applicantServices,
    defaultServiceId: isEmployer
      ? EMPLOYER_HELP_CONFIG.SERVICES.POST_JOB.id
      : HELP_TO_APPLY_CONFIG.SERVICES.SUBMIT_ONLY.id,
    title: isEmployer
      ? "Dukeneye gufashwa gushaka umukozi"
      : "Nkeneye ubufasha bwo gusaba",
    subtitle: isEmployer
      ? "We help you hire — pick the service you want."
      : "We apply for you — pick the service you want.",
    accentColor: isEmployer ? "#441da0" : "#1a73e8",
    accentBackground: isEmployer ? "#f0ebfa" : "#e8f0fe",
  };
};

const appendSourceLine = (lines, sourceLabels, source) => {
  const sourceLabel = sourceLabels[source] || String(source || "");
  if (sourceLabel) {
    lines.push(`Source: ${sourceLabel}`);
  }
};

const buildApplicantMessage = ({ service, jobTitle, jobUrl, source }) => {
  const lines = ["Nkeneye ubufasha bwo gusaba (Help to apply)"];

  if (jobTitle) {
    lines.push(`Job: ${jobTitle}`);
  }
  if (jobUrl) {
    lines.push(`Job link: ${jobUrl}`);
  }

  lines.push(`Service: ${service.label}`);
  lines.push(`Price: ${helpPriceLabel(service.price)}`);
  lines.push(
    `Nishyuye ${helpPriceLabel(
      service.price
    )}, screenshot yo kwishyura ndayiboherereje hano.`
  );
  appendSourceLine(lines, HELP_TO_APPLY_CONFIG.SOURCE_LABELS, source);

  return lines.join("\n");
};

const buildEmployerMessage = ({
  service,
  jobTitle,
  jobUrl,
  company,
  source,
}) => {
  const lines = ["Muraho, turi umukoresha dukeneye ubufasha:", ""];

  lines.push(`Ikigo: ${String(company || "").trim() || "-"}`);

  if (jobTitle) {
    lines.push(`Akazi: ${jobTitle}`);
  }
  if (jobUrl) {
    lines.push(`Job link: ${jobUrl}`);
  }

  lines.push(`Serivisi: ${service.label}`);

  if (service.price) {
    lines.push(`Igiciro: ${helpPriceLabel(service.price)}`);
    lines.push("Narishyuye, screenshot ndayiboherereje hano.");
  } else {
    lines.push("Igiciro: Tuvugane");
    lines.push("Mwambwira igiciro tuvugane.");
  }

  appendSourceLine(lines, EMPLOYER_HELP_CONFIG.SOURCE_LABELS, source);

  return lines.join("\n");
};

const buildWhatsAppMessage = ({ isEmployer, ...options }) =>
  isEmployer
    ? buildEmployerMessage(options)
    : buildApplicantMessage(options);

const HelpToApplyModal = () => {
  const { request, closeHelp } = useHelpToApply();
  const [serviceId, setServiceId] = React.useState(
    HELP_TO_APPLY_CONFIG.SERVICES.SUBMIT_ONLY.id
  );
  const [company, setCompany] = React.useState("");

  React.useEffect(() => {
    if (!request) return;

    const requestMode = getHelpMode(request.mode);

    setServiceId(
      request.preselectService ||
        requestMode.config.DEFAULT_SERVICE_BY_SOURCE[request.source] ||
        requestMode.defaultServiceId
    );
    setCompany(request.company || "");
  }, [request]);

  if (!request) {
    return null;
  }

  const mode = getHelpMode(request.mode);
  const { config, isEmployer } = mode;
  const service =
    mode.services.find((item) => item.id === serviceId) || mode.services[0];
  const isQuoteOnly = !service.price;

  const whatsappUrl = buildWhatsAppUrl(
    config.SUPPORT_WHATSAPP_PHONE,
    buildWhatsAppMessage({
      isEmployer,
      service,
      jobTitle: request.jobTitle,
      jobUrl: request.jobUrl,
      company,
      source: request.source,
    })
  );

  const paymentSteps = [
    `Send ${helpPriceLabel(
      service.price
    )} to MoMo: ${config.MOMO_NUMBER_DISPLAY} (${config.MOMO_OWNER}).`,
    "Take a screenshot of the payment confirmation.",
    'Click "Narishyuye, fungura WhatsApp" — WhatsApp opens with a ready message. Attach your payment screenshot and send.',
  ];

  const handleOpenWhatsApp = () => {
    window.open(whatsappUrl, "_blank", "noopener,noreferrer");
  };

  const handleCopyMomoNumber = async () => {
    try {
      await navigator.clipboard.writeText(config.MOMO_NUMBER_DISPLAY);
      toastMessages.success("MoMo number copied to clipboard.");
    } catch (error) {
      toastMessages.warn("Copy failed. Please copy it manually.");
    }
  };

  return (
    <Dialog open onClose={closeHelp} maxWidth="sm" fullWidth scroll="body">
      <DialogTitle sx={{ pb: 1 }}>
        <Typography component="h2" variant="h6" fontWeight={800}>
          {mode.title}
        </Typography>
        <Typography variant="caption" color="text.secondary">
          {mode.subtitle}
        </Typography>
      </DialogTitle>
      <DialogContent dividers sx={{ pt: 2 }}>
        <Stack spacing={2}>
          {request.jobTitle && (
            <Chip
              icon={<WorkOutlineOutlinedIcon />}
              label={request.jobTitle}
              variant="outlined"
              color="primary"
              sx={{ justifyContent: "flex-start", fontWeight: 700 }}
            />
          )}

          {isEmployer && (
            <TextField
              label="Izina ry'ikigo"
              placeholder="Company / organisation name"
              value={company}
              onChange={(event) => setCompany(event.target.value)}
              size="small"
              fullWidth
              helperText="We use this to verify your business before posting on your behalf."
            />
          )}

          <RadioGroup
            name="help-service"
            value={serviceId}
            onChange={(event) => setServiceId(event.target.value)}
          >
            <Stack spacing={1.5}>
              {mode.services.map((item) => {
                const isSelected = item.id === serviceId;

                return (
                  <Paper
                    key={item.id}
                    variant="outlined"
                    component="label"
                    tabIndex={-1}
                    sx={{
                      display: "flex",
                      alignItems: "flex-start",
                      p: 1.5,
                      cursor: "pointer",
                      borderColor: isSelected
                        ? mode.accentColor
                        : "#dadce0",
                      bgcolor: isSelected ? mode.accentBackground : "white",
                      "&:hover": { borderColor: mode.accentColor },
                    }}
                  >
                    <FormControlLabel
                      value={item.id}
                      control={<Radio size="small" sx={{ p: 0.5 }} />}
                      label={
                        <Stack sx={{ pr: 1 }}>
                          <Typography fontWeight={700}>{item.label}</Typography>
                          <Typography
                            variant="caption"
                            color="text.secondary"
                            sx={{ lineHeight: 1.5, whiteSpace: "normal" }}
                          >
                            {item.description}
                          </Typography>
                        </Stack>
                      }
                      sx={{ alignItems: "flex-start", mr: 0, flex: 1 }}
                    />
                    <Typography
                      fontWeight={800}
                      sx={{
                        pt: 0.75,
                        whiteSpace: "nowrap",
                        color: isSelected ? mode.accentColor : "#202124",
                      }}
                    >
                      {item.price ? helpPriceLabel(item.price) : "Tuvugane"}
                    </Typography>
                  </Paper>
                );
              })}
            </Stack>
          </RadioGroup>

          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              bgcolor: mode.accentBackground,
              borderRadius: 2,
              p: 1.5,
            }}
          >
            <Typography fontWeight={700}>
              {isEmployer ? "Igiciro" : "Amount to pay"}
            </Typography>
            <Typography
              variant="h5"
              fontWeight={800}
              color={mode.accentColor}
            >
              {isQuoteOnly ? "Tuvugane" : helpPriceLabel(service.price)}
            </Typography>
          </Box>

          {isQuoteOnly ? (
            <Alert severity="info" sx={{ borderRadius: 2 }}>
              <Typography variant="body2" sx={{ lineHeight: 1.7 }}>
                Ntukishyure ubu. Kanda &quot;Tuvugane kuri WhatsApp&quot; tuvugane
                ku giciro. Recruitment yuzuye isaba deposit ya 50% mbere yo
                gutangira.
              </Typography>
            </Alert>
          ) : (
            <Box>
              <Typography fontWeight={700} gutterBottom>
                Payment — MoMo
              </Typography>
              <Stack
                direction="row"
                alignItems="center"
                spacing={1}
                sx={{ flexWrap: "wrap", rowGap: 1, mb: 1 }}
              >
                <Chip
                  icon={<PhoneIphoneIcon />}
                  label={`${config.MOMO_NUMBER_DISPLAY} (${config.MOMO_OWNER})`}
                />
                <IconButton
                  size="small"
                  aria-label="Copy MoMo number"
                  onClick={handleCopyMomoNumber}
                >
                  <ContentCopyIcon fontSize="small" />
                </IconButton>
              </Stack>
              <List dense disablePadding>
                {paymentSteps.map((step, index) => (
                  <ListItem
                    key={index}
                    disableGutters
                    sx={{ alignItems: "flex-start" }}
                  >
                    <ListItemIcon sx={{ minWidth: 30, mt: "2px" }}>
                      <CheckCircleOutlineIcon
                        fontSize="small"
                        color="success"
                      />
                    </ListItemIcon>
                    <ListItemText
                      primary={step}
                      primaryTypographyProps={{
                        variant: "body2",
                        sx: { lineHeight: 1.6 },
                      }}
                    />
                  </ListItem>
                ))}
              </List>
            </Box>
          )}

          <Alert severity="warning" icon={<ShieldOutlinedIcon />} sx={{ borderRadius: 2 }}>
            <List dense disablePadding>
              {config.RULES.map((rule, index) => (
                <ListItem key={index} disableGutters sx={{ py: 0.25 }}>
                  <ListItemText
                    primary={rule}
                    primaryTypographyProps={{
                      variant: "caption",
                      sx: { lineHeight: 1.6 },
                    }}
                  />
                </ListItem>
              ))}
            </List>
          </Alert>
        </Stack>
      </DialogContent>
      <DialogActions sx={{ px: 2, py: 2 }}>
        <Button onClick={closeHelp} color="inherit" sx={{ textTransform: "none" }}>
          Close
        </Button>
        <Button
          variant="contained"
          startIcon={<WhatsAppIcon />}
          onClick={handleOpenWhatsApp}
          sx={{
            flex: 1,
            textTransform: "none",
            fontWeight: 700,
            color: "#fff",
            backgroundColor: "#25D366",
            boxShadow: "0 6px 18px rgba(37, 211, 102, 0.35)",
            "&:hover": { backgroundColor: "#1ebe5d", boxShadow: "none" },
          }}
        >
          {isQuoteOnly
            ? "Tuvugane kuri WhatsApp"
            : "Narishyuye, fungura WhatsApp"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

const HelpToApplyProvider = ({ children }) => {
  const [request, setRequest] = React.useState(null);

  const openHelp = React.useCallback(
    (options = {}) => {
      setRequest({
        mode: "applicant",
        source: "",
        jobTitle: "",
        jobUrl: "",
        company: "",
        preselectService: "",
        ...options,
      });
    },
    []
  );

  const closeHelp = React.useCallback(() => {
    setRequest(null);
  }, []);

  return (
    <HelpToApplyContext.Provider value={{ request, openHelp, closeHelp }}>
      {children}
      <HelpToApplyModal />
    </HelpToApplyContext.Provider>
  );
};

export default HelpToApplyProvider;
