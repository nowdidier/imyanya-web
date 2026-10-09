import * as React from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Divider,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import WorkIcon from "@mui/icons-material/Work";
import BusinessIcon from "@mui/icons-material/Business";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { ROUTES } from "../../configs/constants";
import { searchJobPost } from "../../redux/filterSlice";
import jobService from "../../services/jobService";

// Open-source "find jobs" strip — 100% built on OSS (React, MUI, Redux).
// Rendered inside the public layouts so EVERY page helps visitors find a
// job, and every page links to the 3 focus routes for SEO + traffic:
//   /jobs-in-rwanda  (jobs hub)
//   /companies       (employers hub)
//   /viec-lam/:slug  (job details — canonical detail path, matches sitemap)
const QUICK_LINKS = [
  { kw: "Kigali jobs", label: "Kigali" },
  { kw: "NGO jobs", label: "NGO" },
  { kw: "Internships", label: "Internships" },
  { kw: "Remote jobs", label: "Remote" },
];

const FindJobsStrip = () => {
  const dispatch = useDispatch();
  const nav = useNavigate();
  const [kw, setKw] = React.useState("");
  const [latest, setLatest] = React.useState([]);

  // Latest vacancies for direct /viec-lam/:slug deep links. Fails silently —
  // the strip must never break a page if the API is down.
  React.useEffect(() => {
    let alive = true;
    const t = setTimeout(async () => {
      try {
        const res = await jobService.getJobPosts({ page: 1, pageSize: 4 });
        if (alive) setLatest(res?.data?.results || []);
      } catch (e) {
        if (alive) setLatest([]);
      }
    }, 2500);
    return () => {
      alive = false;
      clearTimeout(t);
    };
  }, []);

  const goSearch = (term) => {
    const q = (term ?? kw).trim();
    dispatch(searchJobPost({ kw: q, cityId: "", careerId: "" }));
    nav(`/${ROUTES.JOB_SEEKER.JOBS_EN}`);
  };

  return (
    <Card
      component="section"
      aria-label="Find jobs in Rwanda"
      variant="outlined"
      sx={{ borderRadius: 4, overflow: "hidden" }}
    >
      <Box sx={{ height: 4, background: "linear-gradient(90deg,#441da0,#6d28d9 45%,#ff9800)" }} />
      <CardContent sx={{ p: { xs: 2.5, sm: 3 } }}>
        <Stack
          direction={{ xs: "column", md: "row" }}
          spacing={2.5}
          alignItems={{ md: "center" }}
        >
          <Box sx={{ flex: 1.2, minWidth: 0 }}>
            <Typography component="h2" variant="h6" fontWeight={800}>
              Find jobs in Rwanda
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
              Search vacancies, browse{" "}
              <Typography
                component={RouterLink}
                to={`/${ROUTES.JOB_SEEKER.JOBS_EN}`}
                sx={{ color: "primary.main", fontWeight: 700, textDecoration: "none" }}
              >
                jobs in Rwanda
              </Typography>{" "}
              or explore{" "}
              <Typography
                component={RouterLink}
                to={`/${ROUTES.JOB_SEEKER.COMPANY_EN}`}
                sx={{ color: "primary.main", fontWeight: 700, textDecoration: "none" }}
              >
                companies hiring
              </Typography>
              .
            </Typography>
            <Stack direction="row" spacing={1} sx={{ mt: 1.5 }}>
              <TextField
                size="small"
                fullWidth
                value={kw}
                onChange={(e) => setKw(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    goSearch();
                  }
                }}
                placeholder="Try “accountant Kigali”…"
                aria-label="Search jobs in Rwanda"
                sx={{ "& .MuiOutlinedInput-root": { borderRadius: 999 } }}
              />
              <Button
                variant="contained"
                onClick={() => goSearch()}
                startIcon={<SearchIcon />}
                sx={{ borderRadius: 999, px: 3, flexShrink: 0, fontWeight: 800 }}
              >
                Search
              </Button>
            </Stack>
            <Stack direction="row" spacing={1} sx={{ mt: 1.25, flexWrap: "wrap", rowGap: 1 }}>
              {QUICK_LINKS.map((l) => (
                <Chip
                  key={l.kw}
                  label={l.label}
                  size="small"
                  clickable
                  onClick={() => goSearch(l.kw)}
                  variant="outlined"
                  sx={{ fontWeight: 600 }}
                />
              ))}
            </Stack>
          </Box>

          <Divider
            orientation="vertical"
            flexItem
            sx={{ display: { xs: "none", md: "block" } }}
          />

          <Box sx={{ flex: 1, minWidth: 0 }}>
            <Stack direction="row" spacing={1} sx={{ flexWrap: "wrap", rowGap: 1 }}>
              <Button
                component={RouterLink}
                to={`/${ROUTES.JOB_SEEKER.JOBS_EN}`}
                variant="outlined"
                size="small"
                startIcon={<WorkIcon />}
                endIcon={<ArrowForwardIcon />}
                sx={{ borderRadius: 999, fontWeight: 700, textTransform: "none" }}
              >
                /jobs-in-rwanda
              </Button>
              <Button
                component={RouterLink}
                to={`/${ROUTES.JOB_SEEKER.COMPANY_EN}`}
                variant="outlined"
                size="small"
                startIcon={<BusinessIcon />}
                endIcon={<ArrowForwardIcon />}
                sx={{ borderRadius: 999, fontWeight: 700, textTransform: "none" }}
              >
                /companies
              </Button>
            </Stack>
            {latest.length > 0 && (
              <Box sx={{ mt: 1.5 }}>
                <Typography
                  variant="caption"
                  fontWeight={800}
                  color="primary"
                  sx={{ letterSpacing: 1, textTransform: "uppercase" }}
                >
                  Fresh vacancies
                </Typography>
                <Stack spacing={0.75} sx={{ mt: 0.75 }}>
                  {latest.map((job) => (
                    <Typography
                      key={job.slug || job.id}
                      component={RouterLink}
                      to={`/viec-lam/${job.slug}`}
                      variant="body2"
                      noWrap
                      sx={{
                        color: "text.primary",
                        textDecoration: "none",
                        fontWeight: 600,
                        "&:hover": { color: "primary.main", textDecoration: "underline" },
                      }}
                    >
                      {job.jobName}
                      {job?.companyDict?.companyName
                        ? ` — ${job.companyDict.companyName}`
                        : ""}
                    </Typography>
                  ))}
                </Stack>
              </Box>
            )}
          </Box>
        </Stack>
      </CardContent>
    </Card>
  );
};

export default FindJobsStrip;
