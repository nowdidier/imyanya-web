import React from "react";
import { useSelector } from "react-redux";
import { Link as RouterLink } from "react-router-dom";
import dayjs from "dayjs";
import { pdf } from "@react-pdf/renderer";
import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  Checkbox,
  Container,
  Divider,
  FormControlLabel,
  Grid,
  IconButton,
  MenuItem,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
import AssignmentIndIcon from "@mui/icons-material/AssignmentInd";
import PictureAsPdfOutlinedIcon from "@mui/icons-material/PictureAsPdfOutlined";

import { TabTitle } from "../../../utils/generalFunction";
import toastMessages from "../../../utils/toastMessages";
import errorHandling from "../../../utils/errorHandling";
import { APP_NAME, ROUTES } from "../../../configs/constants";
import CvBuilderPdf from "../../../components/CvBuilderPdf";
import jobSeekerProfileService from "../../../services/jobSeekerProfileService";
import resumeService from "../../../services/resumeService";
import {
  buildCvDocument,
  downloadBlob,
  downloadDocx,
  sanitizeFilename,
} from "../../../utils/docxBuilders";

const emptyExperience = () => ({
  jobTitle: "",
  employer: "",
  start: "",
  end: "",
  current: false,
  details: "",
});

const emptyEducation = () => ({ degree: "", school: "", year: "" });

const emptyLanguage = () => ({ name: "", level: "" });

const emptyCertificate = () => ({ name: "", issuer: "", year: "" });

const emptyReferee = () => ({
  name: "",
  position: "",
  organisation: "",
  phone: "",
  email: "",
});

const LANGUAGE_LEVELS = ["Fluent", "Very good", "Good", "Basic", "Beginner"];

const levelFromRating = (rating) =>
  ({ 5: "Fluent", 4: "Very good", 3: "Good", 2: "Basic", 1: "Beginner" }[
    Number(rating)
  ] || "");

const fieldProps = { fullWidth: true, size: "small", variant: "outlined" };

const toYear = (value) => {
  if (!value) return "";
  const parsed = dayjs(value);
  return parsed.isValid() ? parsed.format("YYYY") : String(value);
};

const CvBuilderPage = () => {
  TabTitle(`CV yo mu Rwanda — Free CV Builder (Word & PDF Download) | ${APP_NAME}`);
  const { isAuthenticated, currentUser } = useSelector((state) => state.user);

  const [form, setForm] = React.useState({
    fullName: "",
    title: "",
    email: "",
    phone: "",
    address: "",
    nationality: "",
    dateOfBirth: "",
    portfolio: "",
    summary: "",
    skills: "",
  });
  const [experience, setExperience] = React.useState([emptyExperience()]);
  const [education, setEducation] = React.useState([emptyEducation()]);
  const [languages, setLanguages] = React.useState([emptyLanguage()]);
  const [certificates, setCertificates] = React.useState([emptyCertificate()]);
  const [referees, setReferees] = React.useState([emptyReferee()]);
  const [isDownloading, setIsDownloading] = React.useState(false);
  const [isDownloadingPdf, setIsDownloadingPdf] = React.useState(false);
  const [isLoadingProfile, setIsLoadingProfile] = React.useState(false);

  const setField = (key) => (event) =>
    setForm((prev) => ({ ...prev, [key]: event.target.value }));

  const setExpField = (index, key) => (event) => {
    const value =
      event.target.type === "checkbox" ? event.target.checked : event.target.value;
    setExperience((prev) =>
      prev.map((item, i) => (i === index ? { ...item, [key]: value } : item))
    );
  };

  const setEduField = (index, key) => (event) =>
    setEducation((prev) =>
      prev.map((item, i) => (i === index ? { ...item, [key]: event.target.value } : item))
    );

  const setListField = (setter) => (index, key) => (event) =>
    setter((prev) =>
      prev.map((item, i) => (i === index ? { ...item, [key]: event.target.value } : item))
    );

  const setLangField = setListField(setLanguages);
  const setCertField = setListField(setCertificates);
  const setRefField = setListField(setReferees);

  // Fills the builder with all information from the website: account +
  // Imyanya profile (contacts) + saved online resume (experience,
  // education, skills, languages, certificates).
  const handleLoadProfile = async () => {
    if (!isAuthenticated) {
      toastMessages.info("Please sign in as a job seeker first.");
      return;
    }
    setIsLoadingProfile(true);
    try {
      const profileRes = await jobSeekerProfileService.getProfile();
      const profile = profileRes.data || {};

      let detail = null;
      try {
        const resumesRes = await jobSeekerProfileService.getResumes(
          currentUser?.jobSeekerProfileId,
          {}
        );
        const list = Array.isArray(resumesRes.data)
          ? resumesRes.data
          : resumesRes.data?.results || [];
        const active = list.find((item) => item?.isActive) || list[0];
        if (active?.slug) {
          const detailRes = await resumeService.getResumeDetail(active.slug);
          detail = detailRes.data || null;
        }
      } catch (resumeError) {
        // Profile basics below still apply without a saved resume.
      }

      setForm((prev) => ({
        ...prev,
        fullName: profile?.user?.fullName || currentUser?.fullName || prev.fullName,
        email: currentUser?.email || prev.email,
        phone:
          profile?.phone ||
          currentUser?.jobSeekerProfile?.phone ||
          prev.phone,
        address: profile?.location?.address || prev.address,
        nationality: prev.nationality || "Rwandan",
        title: detail?.title || prev.title,
        summary: prev.summary,
        skills:
          (detail?.advancedSkills || [])
            .map((skill) => skill?.name)
            .filter(Boolean)
            .join(", ") || prev.skills,
      }));

      const mappedLanguages = (detail?.languageSkills || [])
        .map((lang) => ({
          name: lang?.language || "",
          level: levelFromRating(lang?.level),
        }))
        .filter((item) => item.name);
      if (mappedLanguages.length > 0) setLanguages(mappedLanguages);

      const mappedCertificates = (detail?.certificateDetails || [])
        .map((cert) => ({
          name: cert?.name || "",
          issuer: cert?.trainingPlace || "",
          year: toYear(cert?.startDate),
        }))
        .filter((item) => item.name || item.issuer);
      if (mappedCertificates.length > 0) setCertificates(mappedCertificates);

      const mappedExperience = (detail?.experienceDetails || []).map((item) => ({
        jobTitle: item?.jobName || "",
        employer: item?.companyName || "",
        start: toYear(item?.startDate),
        end: toYear(item?.endDate),
        current: !item?.endDate,
        details: String(item?.description || "")
          .replace(/<[^>]*>/g, " ")
          .replace(/\s+/g, " ")
          .trim(),
      }));
      if (mappedExperience.length > 0) setExperience(mappedExperience);

      const mappedEducation = (detail?.educationDetails || []).map((item) => ({
        degree: [item?.degreeName, item?.major].filter(Boolean).join(" — ") || "",
        school: item?.trainingPlaceName || "",
        year: toYear(item?.completedDate || item?.startDate),
      }));
      if (mappedEducation.length > 0) setEducation(mappedEducation);

      toastMessages.success(
        detail
          ? "Your Imyanya profile was loaded into the builder."
          : "Your contact information was loaded. No saved resume found — fill in the rest manually."
      );
    } catch (error) {
      errorHandling(error);
    } finally {
      setIsLoadingProfile(false);
    }
  };

  const handleDownload = async () => {
    if (!form.fullName.trim()) {
      toastMessages.warn("Please enter your full name first.");
      return;
    }
    setIsDownloading(true);
    try {
      const doc = buildCvDocument({ ...form, experience, education, languages, certificates, referees });
      await downloadDocx(doc, `CV-yo-mu-Rwanda-${sanitizeFilename(form.fullName, "my-cv")}`);
      toastMessages.success("Your CV was downloaded as a Word file.");
    } catch (error) {
      toastMessages.warn("Download failed. Please try again.");
    } finally {
      setIsDownloading(false);
    }
  };

  const handleDownloadPdf = async () => {
    if (!form.fullName.trim()) {
      toastMessages.warn("Please enter your full name first.");
      return;
    }
    setIsDownloadingPdf(true);
    try {
      const blob = await pdf(
        <CvBuilderPdf data={{ ...form, experience, education, languages, certificates, referees }} />
      ).toBlob();
      downloadBlob(
        blob,
        `CV-yo-mu-Rwanda-${sanitizeFilename(form.fullName, "my-cv")}.pdf`
      );
      toastMessages.success("Your CV was downloaded as PDF.");
    } catch (error) {
      toastMessages.warn("Download failed. Please try again.");
    } finally {
      setIsDownloadingPdf(false);
    }
  };

  return (
    <Container maxWidth="lg">
      <Box sx={{ py: { xs: 4, md: 6 } }}>
        <Stack spacing={1.5} sx={{ maxWidth: 860, mb: 4 }}>
          <Typography variant="h3" component="h1" fontWeight={800}>
            CV yo mu Rwanda
          </Typography>
          <Typography color="text.secondary" sx={{ lineHeight: 1.7 }}>
            The free Rwandan CV builder: fill in the sections below — or load
            everything from your Imyanya profile in one click — then download a
            clean, professional CV as a Word (.docx) or PDF file. Your edits
            stay in your browser; only loading uses your saved profile.
          </Typography>
          {isAuthenticated ? (
            <Box>
              <Button
                variant="outlined"
                startIcon={<AssignmentIndIcon />}
                disabled={isLoadingProfile}
                onClick={handleLoadProfile}
                sx={{
                  textTransform: "none",
                  fontWeight: 700,
                  borderRadius: "20px",
                  borderColor: "#dadce0",
                }}
              >
                {isLoadingProfile ? "Loading your profile…" : "Load my Imyanya profile"}
              </Button>
              <Typography variant="caption" color="text.secondary" sx={{ display: "block", mt: 1 }}>
                Uses all information from the website: name, contacts, experience,
                education, skills, languages and certificates.
              </Typography>
            </Box>
          ) : (
            <Alert severity="info" sx={{ borderRadius: 2 }}>
              <RouterLink to={`/${ROUTES.AUTH.LOGIN}`}>Sign in</RouterLink> as a
              job seeker to load all your Imyanya profile information
              automatically — or just fill in the form manually, no account needed.
            </Alert>
          )}
        </Stack>

        <Grid container spacing={3} alignItems="flex-start">
          <Grid item xs={12} md={7}>
            <Stack spacing={2.5}>
              <Card variant="outlined" sx={{ borderRadius: 3, borderColor: "#dadce0" }}>
                <CardContent sx={{ p: { xs: 2, md: 3 } }}>
                  <Typography variant="h6" fontWeight={700} gutterBottom>
                    1. Personal details
                  </Typography>
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <TextField {...fieldProps} label="Full name *" value={form.fullName} onChange={setField("fullName")} placeholder="e.g. Ange Uwase" />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField {...fieldProps} label="Professional title" value={form.title} onChange={setField("title")} placeholder="e.g. Primary School Teacher" />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField {...fieldProps} label="Email" value={form.email} onChange={setField("email")} placeholder="you@example.com" />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField {...fieldProps} label="Phone" value={form.phone} onChange={setField("phone")} placeholder="+250 7xx xxx xxx" />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField {...fieldProps} label="Address" value={form.address} onChange={setField("address")} placeholder="Kigali, Rwanda" />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                      <TextField {...fieldProps} label="Nationality" value={form.nationality} onChange={setField("nationality")} placeholder="Rwandan" />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                      <TextField {...fieldProps} label="Date of birth" value={form.dateOfBirth} onChange={setField("dateOfBirth")} placeholder="01/01/1998" />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                      <TextField {...fieldProps} label="LinkedIn / portfolio link" value={form.portfolio} onChange={setField("portfolio")} placeholder="linkedin.com/in/you" />
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>

              <Card variant="outlined" sx={{ borderRadius: 3, borderColor: "#dadce0" }}>
                <CardContent sx={{ p: { xs: 2, md: 3 } }}>
                  <Typography variant="h6" fontWeight={700} gutterBottom>
                    2. Professional summary
                  </Typography>
                  <TextField
                    {...fieldProps}
                    multiline
                    minRows={3}
                    value={form.summary}
                    onChange={setField("summary")}
                    placeholder="2–4 sentences: years of experience, key skills, what you are looking for."
                  />
                </CardContent>
              </Card>

              <Card variant="outlined" sx={{ borderRadius: 3, borderColor: "#dadce0" }}>
                <CardContent sx={{ p: { xs: 2, md: 3 } }}>
                  <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 2 }}>
                    <Typography variant="h6" fontWeight={700}>
                      3. Work experience
                    </Typography>
                    <Button size="small" startIcon={<AddIcon />} onClick={() => setExperience((prev) => [...prev, emptyExperience()])} sx={{ textTransform: "none" }}>
                      Add role
                    </Button>
                  </Stack>
                  <Stack spacing={2.5} divider={<Divider />}>
                    {experience.map((item, index) => (
                      <Box key={index}>
                        <Stack direction="row" justifyContent="space-between" alignItems="center">
                          <Typography variant="subtitle2" color="text.secondary">
                            Role {index + 1}
                          </Typography>
                          {experience.length > 1 && (
                            <IconButton
                              size="small"
                              color="error"
                              aria-label="Remove role"
                              onClick={() => setExperience((prev) => prev.filter((_, i) => i !== index))}
                            >
                              <DeleteOutlineIcon fontSize="small" />
                            </IconButton>
                          )}
                        </Stack>
                        <Grid container spacing={2} sx={{ mt: 0.5 }}>
                          <Grid item xs={12} sm={6}>
                            <TextField {...fieldProps} label="Job title" value={item.jobTitle} onChange={setExpField(index, "jobTitle")} />
                          </Grid>
                          <Grid item xs={12} sm={6}>
                            <TextField {...fieldProps} label="Employer" value={item.employer} onChange={setExpField(index, "employer")} />
                          </Grid>
                          <Grid item xs={6} sm={3}>
                            <TextField {...fieldProps} label="Start" value={item.start} onChange={setExpField(index, "start")} placeholder="2021" />
                          </Grid>
                          <Grid item xs={6} sm={3}>
                            <TextField {...fieldProps} label="End" value={item.end} onChange={setExpField(index, "end")} placeholder="2024" disabled={item.current} />
                          </Grid>
                          <Grid item xs={12} sm={6}>
                            <FormControlLabel
                              control={<Checkbox size="small" checked={item.current} onChange={setExpField(index, "current")} />}
                              label="I currently work here"
                            />
                          </Grid>
                          <Grid item xs={12}>
                            <TextField
                              {...fieldProps}
                              multiline
                              minRows={2}
                              label="Achievements (one per line)"
                              value={item.details}
                              onChange={setExpField(index, "details")}
                              placeholder={"Increased sales by 20%\nTrained 5 new staff"}
                            />
                          </Grid>
                        </Grid>
                      </Box>
                    ))}
                  </Stack>
                </CardContent>
              </Card>

              <Card variant="outlined" sx={{ borderRadius: 3, borderColor: "#dadce0" }}>
                <CardContent sx={{ p: { xs: 2, md: 3 } }}>
                  <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 2 }}>
                    <Typography variant="h6" fontWeight={700}>
                      4. Education
                    </Typography>
                    <Button size="small" startIcon={<AddIcon />} onClick={() => setEducation((prev) => [...prev, emptyEducation()])} sx={{ textTransform: "none" }}>
                      Add education
                    </Button>
                  </Stack>
                  <Stack spacing={2} divider={<Divider />}>
                    {education.map((item, index) => (
                      <Box key={index}>
                        <Stack direction="row" justifyContent="flex-end">
                          {education.length > 1 && (
                            <IconButton
                              size="small"
                              color="error"
                              aria-label="Remove education"
                              onClick={() => setEducation((prev) => prev.filter((_, i) => i !== index))}
                            >
                              <DeleteOutlineIcon fontSize="small" />
                            </IconButton>
                          )}
                        </Stack>
                        <Grid container spacing={2}>
                          <Grid item xs={12} sm={6}>
                            <TextField {...fieldProps} label="Degree / certificate" value={item.degree} onChange={setEduField(index, "degree")} placeholder="e.g. Bachelor of Education" />
                          </Grid>
                          <Grid item xs={12} sm={4}>
                            <TextField {...fieldProps} label="School" value={item.school} onChange={setEduField(index, "school")} placeholder="e.g. UR College" />
                          </Grid>
                          <Grid item xs={12} sm={2}>
                            <TextField {...fieldProps} label="Year" value={item.year} onChange={setEduField(index, "year")} placeholder="2023" />
                          </Grid>
                        </Grid>
                      </Box>
                    ))}
                  </Stack>
                </CardContent>
              </Card>

              <Card variant="outlined" sx={{ borderRadius: 3, borderColor: "#dadce0" }}>
                <CardContent sx={{ p: { xs: 2, md: 3 } }}>
                  <Typography variant="h6" fontWeight={700} gutterBottom>
                    5. Skills
                  </Typography>
                  <TextField
                    {...fieldProps}
                    multiline
                    minRows={2}
                    value={form.skills}
                    onChange={setField("skills")}
                    placeholder="Separate skills with commas: Excel, Customer care, Driving licence"
                    helperText="Separate skills with commas. Languages go in the next section."
                  />
                </CardContent>
              </Card>

              <Card variant="outlined" sx={{ borderRadius: 3, borderColor: "#dadce0" }}>
                <CardContent sx={{ p: { xs: 2, md: 3 } }}>
                  <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 2 }}>
                    <Typography variant="h6" fontWeight={700}>
                      6. Languages
                    </Typography>
                    <Button size="small" startIcon={<AddIcon />} onClick={() => setLanguages((prev) => [...prev, emptyLanguage()])} sx={{ textTransform: "none" }}>
                      Add language
                    </Button>
                  </Stack>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                    Employers in Rwanda expect Kinyarwanda plus English and/or French.
                  </Typography>
                  <Stack spacing={2} divider={<Divider />}>
                    {languages.map((item, index) => (
                      <Box key={index}>
                        <Stack direction="row" justifyContent="flex-end">
                          {languages.length > 1 && (
                            <IconButton
                              size="small"
                              color="error"
                              aria-label="Remove language"
                              onClick={() => setLanguages((prev) => prev.filter((_, i) => i !== index))}
                            >
                              <DeleteOutlineIcon fontSize="small" />
                            </IconButton>
                          )}
                        </Stack>
                        <Grid container spacing={2}>
                          <Grid item xs={12} sm={6}>
                            <TextField {...fieldProps} label="Language" value={item.name} onChange={setLangField(index, "name")} placeholder="e.g. English" />
                          </Grid>
                          <Grid item xs={12} sm={6}>
                            <TextField {...fieldProps} select label="Level" value={item.level} onChange={setLangField(index, "level")}>
                              {LANGUAGE_LEVELS.map((level) => (
                                <MenuItem key={level} value={level}>
                                  {level}
                                </MenuItem>
                              ))}
                            </TextField>
                          </Grid>
                        </Grid>
                      </Box>
                    ))}
                  </Stack>
                </CardContent>
              </Card>

              <Card variant="outlined" sx={{ borderRadius: 3, borderColor: "#dadce0" }}>
                <CardContent sx={{ p: { xs: 2, md: 3 } }}>
                  <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 2 }}>
                    <Typography variant="h6" fontWeight={700}>
                      7. Certificates & training
                    </Typography>
                    <Button size="small" startIcon={<AddIcon />} onClick={() => setCertificates((prev) => [...prev, emptyCertificate()])} sx={{ textTransform: "none" }}>
                      Add certificate
                    </Button>
                  </Stack>
                  <Stack spacing={2} divider={<Divider />}>
                    {certificates.map((item, index) => (
                      <Box key={index}>
                        <Stack direction="row" justifyContent="flex-end">
                          {certificates.length > 1 && (
                            <IconButton
                              size="small"
                              color="error"
                              aria-label="Remove certificate"
                              onClick={() => setCertificates((prev) => prev.filter((_, i) => i !== index))}
                            >
                              <DeleteOutlineIcon fontSize="small" />
                            </IconButton>
                          )}
                        </Stack>
                        <Grid container spacing={2}>
                          <Grid item xs={12} sm={6}>
                            <TextField {...fieldProps} label="Certificate name" value={item.name} onChange={setCertField(index, "name")} placeholder="e.g. CPA, Driving licence Cat. B" />
                          </Grid>
                          <Grid item xs={12} sm={4}>
                            <TextField {...fieldProps} label="Issuer" value={item.issuer} onChange={setCertField(index, "issuer")} placeholder="e.g. ICPAR" />
                          </Grid>
                          <Grid item xs={12} sm={2}>
                            <TextField {...fieldProps} label="Year" value={item.year} onChange={setCertField(index, "year")} placeholder="2023" />
                          </Grid>
                        </Grid>
                      </Box>
                    ))}
                  </Stack>
                </CardContent>
              </Card>

              <Card variant="outlined" sx={{ borderRadius: 3, borderColor: "#dadce0" }}>
                <CardContent sx={{ p: { xs: 2, md: 3 } }}>
                  <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 2 }}>
                    <Typography variant="h6" fontWeight={700}>
                      8. Referees
                    </Typography>
                    <Button size="small" startIcon={<AddIcon />} onClick={() => setReferees((prev) => [...prev, emptyReferee()])} sx={{ textTransform: "none" }}>
                      Add referee
                    </Button>
                  </Stack>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                    Two or three professional referees (former supervisor, lecturer). Always ask their permission first.
                  </Typography>
                  <Stack spacing={2} divider={<Divider />}>
                    {referees.map((item, index) => (
                      <Box key={index}>
                        <Stack direction="row" justifyContent="space-between" alignItems="center">
                          <Typography variant="subtitle2" color="text.secondary">
                            Referee {index + 1}
                          </Typography>
                          {referees.length > 1 && (
                            <IconButton
                              size="small"
                              color="error"
                              aria-label="Remove referee"
                              onClick={() => setReferees((prev) => prev.filter((_, i) => i !== index))}
                            >
                              <DeleteOutlineIcon fontSize="small" />
                            </IconButton>
                          )}
                        </Stack>
                        <Grid container spacing={2} sx={{ mt: 0.5 }}>
                          <Grid item xs={12} sm={6}>
                            <TextField {...fieldProps} label="Full name" value={item.name} onChange={setRefField(index, "name")} />
                          </Grid>
                          <Grid item xs={12} sm={6}>
                            <TextField {...fieldProps} label="Position / title" value={item.position} onChange={setRefField(index, "position")} placeholder="e.g. Head Teacher" />
                          </Grid>
                          <Grid item xs={12} sm={6}>
                            <TextField {...fieldProps} label="Organisation" value={item.organisation} onChange={setRefField(index, "organisation")} />
                          </Grid>
                          <Grid item xs={12} sm={6}>
                            <TextField {...fieldProps} label="Phone" value={item.phone} onChange={setRefField(index, "phone")} />
                          </Grid>
                          <Grid item xs={12}>
                            <TextField {...fieldProps} label="Email" value={item.email} onChange={setRefField(index, "email")} />
                          </Grid>
                        </Grid>
                      </Box>
                    ))}
                  </Stack>
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
                    <Typography variant="h5" fontWeight={800} align="center" gutterBottom>
                      {form.fullName || "Your Name"}
                    </Typography>
                    {form.title && (
                      <Typography align="center" color="primary" fontWeight={700} gutterBottom>
                        {form.title}
                      </Typography>
                    )}
                    <Typography variant="body2" align="center" color="text.secondary" gutterBottom>
                      {[form.email, form.phone, form.address].filter(Boolean).join("  |  ") || "email  |  phone  |  address"}
                    </Typography>
                    {[form.nationality, form.dateOfBirth, form.portfolio].filter(Boolean).length > 0 && (
                      <Typography variant="body2" align="center" color="text.secondary" gutterBottom>
                        {[form.nationality, form.dateOfBirth, form.portfolio].filter(Boolean).join("  |  ")}
                      </Typography>
                    )}
                    <Divider sx={{ my: 1.5 }} />
                    {form.summary && (
                      <Typography variant="body2" color="text.secondary" sx={{ mb: 1.5 }}>
                        {form.summary}
                      </Typography>
                    )}
                    <Typography variant="subtitle2" fontWeight={700} color="primary">
                      WORK EXPERIENCE
                    </Typography>
                    {experience.filter((e) => e.jobTitle || e.employer).length === 0 && (
                      <Typography variant="body2" color="text.secondary">Your roles will appear here…</Typography>
                    )}
                    {experience
                      .filter((e) => e.jobTitle || e.employer)
                      .map((e, i) => (
                        <Box key={i} sx={{ mt: 1 }}>
                          <Typography variant="body2" fontWeight={700}>
                            {[e.jobTitle, e.employer].filter(Boolean).join(" — ")}
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            {[e.start, e.current ? "Present" : e.end].filter(Boolean).join(" – ")}
                          </Typography>
                        </Box>
                      ))}
                    <Typography variant="subtitle2" fontWeight={700} color="primary" sx={{ mt: 1.5 }}>
                      EDUCATION
                    </Typography>
                    {education
                      .filter((e) => e.degree || e.school)
                      .map((e, i) => (
                        <Typography key={i} variant="body2" color="text.secondary">
                          {[e.degree, e.school, e.year].filter(Boolean).join(", ")}
                        </Typography>
                      ))}
                    {form.skills && (
                      <>
                        <Typography variant="subtitle2" fontWeight={700} color="primary" sx={{ mt: 1.5 }}>
                          SKILLS
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {form.skills}
                        </Typography>
                      </>
                    )}
                    {languages.filter((l) => l.name).length > 0 && (
                      <>
                        <Typography variant="subtitle2" fontWeight={700} color="primary" sx={{ mt: 1.5 }}>
                          LANGUAGES
                        </Typography>
                        {languages
                          .filter((l) => l.name)
                          .map((l, i) => (
                            <Typography key={i} variant="body2" color="text.secondary">
                              {l.name}{l.level ? ` — ${l.level}` : ""}
                            </Typography>
                          ))}
                      </>
                    )}
                    {certificates.filter((c) => c.name || c.issuer).length > 0 && (
                      <>
                        <Typography variant="subtitle2" fontWeight={700} color="primary" sx={{ mt: 1.5 }}>
                          CERTIFICATES
                        </Typography>
                        {certificates
                          .filter((c) => c.name || c.issuer)
                          .map((c, i) => (
                            <Typography key={i} variant="body2" color="text.secondary">
                              {[c.name, c.issuer, c.year].filter(Boolean).join(", ")}
                            </Typography>
                          ))}
                      </>
                    )}
                    {referees.filter((r) => r.name || r.phone || r.email).length > 0 && (
                      <>
                        <Typography variant="subtitle2" fontWeight={700} color="primary" sx={{ mt: 1.5 }}>
                          REFEREES
                        </Typography>
                        {referees
                          .filter((r) => r.name || r.phone || r.email)
                          .map((r, i) => (
                            <Box key={i} sx={{ mt: 0.5 }}>
                              <Typography variant="body2" fontWeight={700}>
                                {[r.name, r.position, r.organisation].filter(Boolean).join(", ")}
                              </Typography>
                              <Typography variant="caption" color="text.secondary">
                                {[r.phone, r.email].filter(Boolean).join("  |  ")}
                              </Typography>
                            </Box>
                          ))}
                      </>
                    )}
                  </Box>
                  <Stack direction="row" spacing={1.5} sx={{ mt: 2 }}>
                    <Button
                      fullWidth
                      size="large"
                      variant="contained"
                      startIcon={<DownloadOutlinedIcon />}
                      disabled={isDownloading || isDownloadingPdf}
                      onClick={handleDownload}
                      sx={{
                        textTransform: "none",
                        fontWeight: 700,
                        borderRadius: "20px",
                        backgroundColor: "#1a73e8",
                        boxShadow: "none",
                        "&:hover": { backgroundColor: "#1b66c9", boxShadow: "none" },
                      }}
                    >
                      {isDownloading ? "Preparing…" : "Word (.docx)"}
                    </Button>
                    <Button
                      fullWidth
                      size="large"
                      variant="outlined"
                      startIcon={<PictureAsPdfOutlinedIcon />}
                      disabled={isDownloading || isDownloadingPdf}
                      onClick={handleDownloadPdf}
                      sx={{
                        textTransform: "none",
                        fontWeight: 700,
                        borderRadius: "20px",
                        borderColor: "#dadce0",
                      }}
                    >
                      {isDownloadingPdf ? "Preparing…" : "PDF"}
                    </Button>
                  </Stack>
                  <Typography variant="caption" color="text.secondary" sx={{ display: "block", mt: 1, textAlign: "center" }}>
                    Free download — Word opens in Word, WPS and Google Docs; PDF prints anywhere.
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

export default CvBuilderPage;
