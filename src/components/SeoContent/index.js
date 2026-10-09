import * as React from "react";
import { Link as RouterLink } from "react-router-dom";
import { Box, Card, CardContent, Chip, Grid, Stack, Typography } from "@mui/material";
import { ROUTES } from "../../configs/constants";

// Keyword-rich SEO content block for the homepage. Gives Google crawlable
// H2s, internal links and Rwanda-specific copy — key to ranking #1 for
// "jobs in Rwanda", "Kigali jobs", "NGO jobs Rwanda", etc.
const SeoContent = () => (
  <Card
    component="section"
    aria-label="About jobs in Rwanda on Imyanya"
    variant="outlined"
    sx={{ borderRadius: 4, overflow: "hidden" }}
  >
    <CardContent sx={{ p: { xs: 2.5, sm: 3.5 } }}>
      <Typography variant="overline" color="primary" fontWeight={800} sx={{ letterSpacing: 1.4 }}>
        Rwanda&apos;s #1 job portal
      </Typography>
      <Typography component="h2" variant="h5" fontWeight={800} sx={{ mt: 0.5, lineHeight: 1.3 }}>
        Jobs in Rwanda — Kigali vacancies, NGO jobs, internships & more
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mt: 1, lineHeight: 1.75 }}>
        Imyanya (Imyanya y&apos;akazi) is Rwanda&apos;s fastest-growing job portal. Every day,
        employers in <strong>Kigali</strong> and across all provinces post verified{" "}
        <strong>job vacancies in Rwanda</strong> — from <strong>NGO jobs</strong>, government roles
        and banking & finance, to tech, hospitality, health, education and{" "}
        <strong>remote jobs</strong>. Create a free account, build your CV in minutes, and apply
        before deadlines pass.
      </Typography>

      <Grid container spacing={2} sx={{ mt: 1.5 }}>
        {[
          {
            title: "Find Kigali jobs fast",
            body: "Most vacancies sit in Kigali. Filter by city, apply in one click, and turn on alerts so you never miss a closing date.",
            link: `/${ROUTES.JOB_SEEKER.JOBS_BY_CITY_EN}`,
            linkLabel: "Browse jobs by location →",
          },
          {
            title: "NGO & international roles",
            body: "UN agencies, international NGOs and local nonprofits hire through Imyanya all year — M&E, grants, field and HQ posts.",
            link: `/${ROUTES.JOB_SEEKER.JOBS_EN}`,
            linkLabel: "See NGO jobs in Rwanda →",
          },
          {
            title: "Internships & graduate jobs",
            body: "Students & fresh graduates: start with internships, trainee programmes and entry-level posts, plus free CV templates.",
            link: `/${ROUTES.JOB_SEEKER.CAREER_TOOLS}`,
            linkLabel: "Build a free CV →",
          },
        ].map((c) => (
          <Grid item xs={12} md={4} key={c.title}>
            <Box sx={{ p: 2, borderRadius: 3, bgcolor: "grey.50", border: "1px solid", borderColor: "grey.200", height: "100%" }}>
              <Typography variant="subtitle1" fontWeight={800}>
                {c.title}
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5, lineHeight: 1.65 }}>
                {c.body}
              </Typography>
              <Typography
                component={RouterLink}
                to={c.link}
                sx={{ display: "inline-block", mt: 1, color: "primary.main", fontWeight: 700, textDecoration: "none", fontSize: 14 }}
              >
                {c.linkLabel}
              </Typography>
            </Box>
          </Grid>
        ))}
      </Grid>

      <Stack direction="row" spacing={1} sx={{ mt: 2, flexWrap: "wrap", rowGap: 1 }} aria-label="Popular job searches in Rwanda">
        {[
          { label: "Jobs in Kigali", href: "/jobs-in-rwanda" },
          { label: "NGO jobs Rwanda", href: "/jobs-in-rwanda" },
          { label: "Internships Rwanda", href: "/jobs-by-type" },
          { label: "Remote jobs Rwanda", href: "/jobs-by-type" },
          { label: "Companies hiring", href: "/companies" },
          { label: "Career guide", href: "/rwanda-career-guide" },
        ].map((chip) => (
          <Chip
            key={chip.label}
            component={RouterLink}
            to={chip.href}
            label={chip.label}
            clickable
            variant="outlined"
            size="small"
            sx={{ fontWeight: 600 }}
          />
        ))}
      </Stack>
    </CardContent>
  </Card>
);

export default SeoContent;
