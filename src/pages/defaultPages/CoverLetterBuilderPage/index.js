import React from "react";
import dayjs from "dayjs";
import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Grid,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";

import { TabTitle } from "../../../utils/generalFunction";
import toastMessages from "../../../utils/toastMessages";
import { APP_NAME } from "../../../configs/constants";
import {
  buildCoverLetterDocument,
  downloadDocx,
  sanitizeFilename,
} from "../../../utils/docxBuilders";

const fieldProps = { fullWidth: true, size: "small", variant: "outlined" };

const CoverLetterBuilderPage = () => {
  TabTitle(`Free Cover Letter Builder (Download Word .docx) | ${APP_NAME}`);

  const [form, setForm] = React.useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    recipientName: "",
    companyName: "",
    companyAddress: "",
    position: "",
    salutation: "Dear Hiring Manager,",
    body: "",
    closing: "Yours sincerely,",
    enclosures: "CV",
  });
  const [isDownloading, setIsDownloading] = React.useState(false);

  const setField = (key) => (event) =>
    setForm((prev) => ({ ...prev, [key]: event.target.value }));

  const handleDownload = async () => {
    if (!form.fullName.trim()) {
      toastMessages.warn("Please enter your full name first.");
      return;
    }
    if (!form.body.trim()) {
      toastMessages.warn("Please write your letter body first.");
      return;
    }
    setIsDownloading(true);
    try {
      const doc = buildCoverLetterDocument({
        ...form,
        date: dayjs().format("DD MMMM YYYY"),
      });
      await downloadDocx(
        doc,
        `Cover-Letter-${sanitizeFilename(form.fullName, "my-letter")}`
      );
      toastMessages.success("Your cover letter was downloaded as a Word file.");
    } catch (error) {
      toastMessages.warn("Download failed. Please try again.");
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <Container maxWidth="lg">
      <Box sx={{ py: { xs: 4, md: 6 } }}>
        <Stack spacing={1.5} sx={{ maxWidth: 860, mb: 4 }}>
          <Typography variant="h3" component="h1" fontWeight={800}>
            Free Cover Letter Builder
          </Typography>
          <Typography color="text.secondary" sx={{ lineHeight: 1.7 }}>
            Address it to the employer, explain why you fit the role, and
            download a formal cover letter as a Word (.docx) file. Everything
            stays in your browser — nothing is uploaded.
          </Typography>
        </Stack>

        <Grid container spacing={3} alignItems="flex-start">
          <Grid item xs={12} md={7}>
            <Stack spacing={2.5}>
              <Card variant="outlined" sx={{ borderRadius: 3, borderColor: "#dadce0" }}>
                <CardContent sx={{ p: { xs: 2, md: 3 } }}>
                  <Typography variant="h6" fontWeight={700} gutterBottom>
                    1. Your details
                  </Typography>
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <TextField {...fieldProps} label="Full name *" value={form.fullName} onChange={setField("fullName")} placeholder="e.g. Ange Uwase" />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField {...fieldProps} label="Email" value={form.email} onChange={setField("email")} />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField {...fieldProps} label="Phone" value={form.phone} onChange={setField("phone")} />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField {...fieldProps} label="Your address" value={form.address} onChange={setField("address")} placeholder="Kigali, Rwanda" />
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>

              <Card variant="outlined" sx={{ borderRadius: 3, borderColor: "#dadce0" }}>
                <CardContent sx={{ p: { xs: 2, md: 3 } }}>
                  <Typography variant="h6" fontWeight={700} gutterBottom>
                    2. Employer & role
                  </Typography>
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                      <TextField {...fieldProps} label="Recipient name (if known)" value={form.recipientName} onChange={setField("recipientName")} placeholder="e.g. HR Manager" />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField {...fieldProps} label="Company / organisation" value={form.companyName} onChange={setField("companyName")} placeholder="e.g. Bright School" />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField {...fieldProps} label="Company address (optional)" value={form.companyAddress} onChange={setField("companyAddress")} />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField {...fieldProps} label="Position applied for *" value={form.position} onChange={setField("position")} placeholder="e.g. Primary School Teacher" helperText="Shown as the bold subject line: Re: Application for the Position of …" />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField {...fieldProps} label="Salutation" value={form.salutation} onChange={setField("salutation")} />
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>

              <Card variant="outlined" sx={{ borderRadius: 3, borderColor: "#dadce0" }}>
                <CardContent sx={{ p: { xs: 2, md: 3 } }}>
                  <Typography variant="h6" fontWeight={700} gutterBottom>
                    3. Letter body
                  </Typography>
                  <TextField
                    {...fieldProps}
                    multiline
                    minRows={8}
                    value={form.body}
                    onChange={setField("body")}
                    placeholder={"Paragraph 1: which role you apply for and where you saw it.\n\nParagraph 2: your experience and skills matching the requirements.\n\nParagraph 3: why this employer, availability, polite close."}
                    helperText="Separate paragraphs with a blank line."
                  />
                  <Grid container spacing={2} sx={{ mt: 0.5 }}>
                    <Grid item xs={12}>
                      <TextField {...fieldProps} label="Closing" value={form.closing} onChange={setField("closing")} />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField {...fieldProps} label="Enclosures" value={form.enclosures} onChange={setField("enclosures")} placeholder="CV, Degree certificate, National ID copy" helperText="Listed at the bottom as: Enclosures: …" />
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </Stack>
          </Grid>

          <Grid item xs={12} md={5}>
            <Box sx={{ position: { md: "sticky" }, top: 16 }}>
              <Card variant="outlined" sx={{ borderRadius: 3, borderColor: "#dadce0", bgcolor: "#f8f9fa" }}>
                <CardContent sx={{ p: { xs: 2, md: 3 } }}>
                  <Typography variant="h6" fontWeight={700} gutterBottom>
                    Preview
                  </Typography>
                  <Box sx={{ bgcolor: "white", border: "1px solid #e8eaed", borderRadius: 2, p: 2.5 }}>
                    <Typography fontWeight={800}>{form.fullName || "Your Name"}</Typography>
                    <Typography variant="body2" color="text.secondary">
                      {[form.address, [form.email, form.phone].filter(Boolean).join("  |  ")].filter(Boolean).join("  •  ") || "address  •  email  |  phone"}
                    </Typography>
                    <Typography variant="body2" align="right" color="text.secondary" sx={{ mt: 1.5 }}>
                      {dayjs().format("DD MMMM YYYY")}
                    </Typography>
                    <Typography variant="body2" sx={{ mt: 1.5 }}>
                      {form.recipientName || "Recipient name"}
                    </Typography>
                    <Typography variant="body2">{form.companyName || "Company name"}</Typography>
                    {form.companyAddress && (
                      <Typography variant="body2">{form.companyAddress}</Typography>
                    )}
                    {form.position && (
                      <Typography variant="body2" fontWeight={700} sx={{ mt: 1.5 }}>
                        Re: Application for the Position of {form.position}
                      </Typography>
                    )}
                    <Typography variant="body2" sx={{ mt: 1.5 }}>
                      {form.salutation}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mt: 1, whiteSpace: "pre-line" }}>
                      {form.body || "Your paragraphs will appear here…"}
                    </Typography>
                    <Typography variant="body2" sx={{ mt: 1.5 }}>
                      {form.closing}
                    </Typography>
                    <Typography variant="body2" fontWeight={700}>
                      {form.fullName || "Your Name"}
                    </Typography>
                    {form.enclosures && (
                      <Typography variant="caption" color="text.secondary" sx={{ display: "block", mt: 1.5, fontStyle: "italic" }}>
                        Enclosures: {form.enclosures}
                      </Typography>
                    )}
                  </Box>
                  <Button
                    fullWidth
                    size="large"
                    variant="contained"
                    startIcon={<DownloadOutlinedIcon />}
                    disabled={isDownloading}
                    onClick={handleDownload}
                    sx={{
                      mt: 2,
                      textTransform: "none",
                      fontWeight: 700,
                      borderRadius: "20px",
                      backgroundColor: "#1a73e8",
                      boxShadow: "none",
                      "&:hover": { backgroundColor: "#1b66c9", boxShadow: "none" },
                    }}
                  >
                    {isDownloading ? "Preparing…" : "Download letter as Word (.docx)"}
                  </Button>
                  <Typography variant="caption" color="text.secondary" sx={{ display: "block", mt: 1, textAlign: "center" }}>
                    Free download — the file opens in Word, WPS and Google Docs.
                  </Typography>
                </CardContent>
              </Card>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default CoverLetterBuilderPage;
