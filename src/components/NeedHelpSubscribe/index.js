import React from "react";
import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import SupportAgentIcon from "@mui/icons-material/SupportAgent";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";

import myjobService from "../../services/myjobService";
import toastMessages from "../../utils/toastMessages";
import { buildWhatsAppUrl } from "../../utils/funcUtils";
import { HELP_TO_APPLY_CONFIG } from "../../configs/constants";

const NeedHelpSubscribe = ({
  title = "Need help with jobs, applications, or hiring?",
  subtitle = "Subscribe for help and updates. Tell us what you need and our team will follow up.",
  source = "website",
  compact = false,
}) => {
  const [form, setForm] = React.useState({ name: "", contact: "", need: "" });
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [isDone, setIsDone] = React.useState(false);

  const onChange = (field) => (e) =>
    setForm((prev) => ({ ...prev, [field]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    const need = String(form.need || "").trim();
    const contact = String(form.contact || "").trim();
    if (!need) {
      toastMessages.warn("Please tell us what you need help with.");
      return;
    }
    setIsSubmitting(true);
    try {
      await myjobService.createFeedback({
        fullName: String(form.name || "").trim() || "Website visitor",
        email: contact.includes("@") ? contact : "",
        phone: !contact.includes("@") ? contact : "",
        subject: `Help subscription/request (${source})`,
        content: [
          `Need: ${need}`,
          `Contact: ${contact || "Not provided"}`,
          `Name: ${String(form.name || "").trim() || "Not provided"}`,
          `Source: ${source}`,
          "Subscribed: yes",
        ].join("\n"),
      });
      setIsDone(true);
      setForm({ name: "", contact: "", need: "" });
      toastMessages.success("Submitted. We received your request.");
    } catch (error) {
      toastMessages.info(
        "Could not submit right now. You can contact us on WhatsApp for quick help."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const whatsappUrl = buildWhatsAppUrl(
    HELP_TO_APPLY_CONFIG.SUPPORT_WHATSAPP_PHONE,
    "Hello Imyanya, I need help with: "
  );

  return (
    <Card
      variant="outlined"
      sx={{
        borderRadius: 3,
        borderColor: "#d2e3fc",
        background: "linear-gradient(135deg, #f8fbff 0%, #ffffff 60%, #f3efff 100%)",
      }}
    >
      <CardContent sx={{ p: { xs: 2, sm: 3 } }}>
        <Stack spacing={2}>
          <Stack direction="row" spacing={1.5} alignItems="flex-start">
            <Box
              sx={{
                width: 40,
                height: 40,
                borderRadius: "50%",
                bgcolor: "#441da0",
                color: "#fff",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
              }}
            >
              <NotificationsActiveIcon fontSize="small" />
            </Box>
            <Box>
              <Typography variant={compact ? "h6" : "h5"} fontWeight={800} color="#202124">
                {title}
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mt: 0.25 }}>
                {subtitle}
              </Typography>
            </Box>
          </Stack>

          {isDone ? (
            <Alert severity="success" sx={{ borderRadius: 2 }}>
              Thanks! You’re subscribed for help. We’ll get back to you as soon as possible.
            </Alert>
          ) : (
            <Box component="form" onSubmit={handleSubmit}>
              <Stack spacing={1.5}>
                {!compact && (
                  <Stack direction={{ xs: "column", sm: "row" }} spacing={1.5}>
                    <TextField
                      size="small"
                      label="Your name (optional)"
                      value={form.name}
                      onChange={onChange("name")}
                      fullWidth
                    />
                    <TextField
                      size="small"
                      label="Email or phone (optional)"
                      value={form.contact}
                      onChange={onChange("contact")}
                      fullWidth
                    />
                  </Stack>
                )}
                <TextField
                  size="small"
                  label="What do you need help with?"
                  placeholder="e.g. applying for a job, writing a CV, posting a job, finding candidates..."
                  value={form.need}
                  onChange={onChange("need")}
                  fullWidth
                  multiline
                  minRows={compact ? 2 : 3}
                  required
                />
                <Stack direction={{ xs: "column", sm: "row" }} spacing={1}>
                  <Button
                    type="submit"
                    variant="contained"
                    disabled={isSubmitting}
                    startIcon={<SupportAgentIcon />}
                    sx={{
                      textTransform: "none",
                      fontWeight: 700,
                      borderRadius: "20px",
                      boxShadow: "none",
                      backgroundColor: "#441da0",
                      "&:hover": { backgroundColor: "#35177d", boxShadow: "none" },
                    }}
                  >
                    {isSubmitting ? "Submitting..." : "Subscribe for help"}
                  </Button>
                  {whatsappUrl && (
                    <Button
                      variant="outlined"
                      component="a"
                      href={whatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      startIcon={<WhatsAppIcon />}
                      sx={{
                        textTransform: "none",
                        fontWeight: 700,
                        borderRadius: "20px",
                        color: "#128C7E",
                        borderColor: "#128C7E",
                        "&:hover": { borderColor: "#075E54", backgroundColor: "#f0fdf4" },
                      }}
                    >
                      Chat on WhatsApp
                    </Button>
                  )}
                </Stack>
              </Stack>
            </Box>
          )}
        </Stack>
      </CardContent>
    </Card>
  );
};

export default NeedHelpSubscribe;
