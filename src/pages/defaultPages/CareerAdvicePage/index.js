import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardActionArea,
  Chip,
  Container,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import ArticleOutlinedIcon from "@mui/icons-material/ArticleOutlined";

import { TabTitle } from "../../../utils/generalFunction";
import { APP_NAME, ROUTES } from "../../../configs/constants";
import SeoBreadcrumbs from "../../../components/SeoBreadcrumbs";
import careerArticles from "../../../data/rwandaCareerArticles";

const categoryColors = {
  "CV & Cover Letters": "primary",
  "Interview Preparation": "secondary",
  "Salary & Benefits": "success",
  "Government & NGO Jobs": "warning",
  "Career Advice": "info",
  "Industry Insights": "default",
  "Scholarships & Study": "default",
  "Internships & Entry Level": "default",
  "Job Search Strategies": "primary",
  "Professional Development": "secondary",
  "Remote Work": "success",
  "Career Transitions": "warning",
  "Workplace Skills": "info",
  "Leadership & Management": "secondary",
  "Entrepreneurship": "success",
};

const CareerAdvicePage = () => {
  TabTitle(`Career Advice Rwanda | Job Search Articles | ${APP_NAME}`);
  const nav = useNavigate();

  const categories = [...new Set(careerArticles.map((a) => a.category))];

  return (
    <Container maxWidth="lg">
      <SeoBreadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "Career Advice" },
        ]}
      />
      <Box sx={{ py: { xs: 2, md: 4 } }}>
        <Stack spacing={2} sx={{ maxWidth: 920, mb: 5 }}>
          <Typography variant="h3" component="h1" fontWeight={800}>
            Career Advice Rwanda
          </Typography>
          <Typography variant="h6" color="text.secondary" sx={{ lineHeight: 1.75 }}>
            Original articles on CV writing, interview preparation, salary
            negotiation, and career development for the Rwandan job market. New
            articles published regularly.
          </Typography>
          <Card
            variant="outlined"
            sx={{
              borderRadius: 3,
              borderColor: "#dadce0",
              bgcolor: "#f6fafe",
              mt: 1,
            }}
          >
            <CardContent sx={{ p: { xs: 2, md: 2.5 } }}>
              <Stack
                direction={{ xs: "column", sm: "row" }}
                spacing={2}
                alignItems={{ xs: "flex-start", sm: "center" }}
                justifyContent="space-between"
              >
                <Box>
                  <Typography variant="h6" fontWeight={700}>
                    Don&apos;t just read — build it
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Create your CV or cover letter now and download it as a Word
                    (.docx) file. Free, no account needed.
                  </Typography>
                </Box>
                <Stack direction={{ xs: "column", sm: "row" }} spacing={1.5}>
                  <Button
                    variant="contained"
                    onClick={() => nav(`/${ROUTES.JOB_SEEKER.CV_BUILDER}`)}
                    sx={{
                      textTransform: "none",
                      fontWeight: 700,
                      borderRadius: "20px",
                      backgroundColor: "#1a73e8",
                      boxShadow: "none",
                      whiteSpace: "nowrap",
                      "&:hover": { backgroundColor: "#1b66c9", boxShadow: "none" },
                    }}
                  >
                    CV yo mu Rwanda
                  </Button>
                  <Button
                    variant="outlined"
                    onClick={() => nav(`/${ROUTES.JOB_SEEKER.COVER_LETTER_BUILDER}`)}
                    sx={{
                      textTransform: "none",
                      fontWeight: 600,
                      borderRadius: "20px",
                      whiteSpace: "nowrap",
                    }}
                  >
                    Cover Letter Builder
                  </Button>
                </Stack>
              </Stack>
            </CardContent>
          </Card>
        </Stack>

        {categories.map((category) => {
          const articles = careerArticles.filter((a) => a.category === category);
          return (
            <Box key={category} sx={{ mb: 6 }}>
              <Typography
                variant="h5"
                component="h2"
                fontWeight={700}
                sx={{ mb: 2.5 }}
              >
                {category}
              </Typography>
              <Grid container spacing={2.5}>
                {articles.map((article) => (
                  <Grid item xs={12} sm={6} md={4} key={article.slug}>
                    <Card
                      variant="outlined"
                      sx={{
                        height: "100%",
                        borderRadius: 1,
                        transition: "all 0.2s ease-in-out",
                        "&:hover": {
                          borderColor: "primary.light",
                          boxShadow: (theme) => theme.customShadows?.card,
                        },
                      }}
                    >
                      <CardActionArea
                        onClick={() =>
                          nav(`/${ROUTES.JOB_SEEKER.CAREER_ADVICE}/${article.slug}`)
                        }
                        sx={{ height: "100%", display: "flex", flexDirection: "column", alignItems: "stretch" }}
                      >
                        <CardContent sx={{ flexGrow: 1, display: "flex", flexDirection: "column" }}>
                          <Stack direction="row" spacing={1} sx={{ mb: 1.5 }}>
                            <Chip
                              label={article.category}
                              size="small"
                              color={categoryColors[article.category] || "default"}
                              variant="outlined"
                            />
                            <Chip
                              icon={<AccessTimeIcon sx={{ fontSize: 14 }} />}
                              label={article.readingTime}
                              size="small"
                              variant="outlined"
                              sx={{ color: "text.secondary" }}
                            />
                          </Stack>
                          <Typography variant="h6" component="h3" fontWeight={700} gutterBottom>
                            {article.title}
                          </Typography>
                          <Typography
                            variant="body2"
                            color="text.secondary"
                            sx={{ lineHeight: 1.65, flexGrow: 1 }}
                          >
                            {article.excerpt}
                          </Typography>
                          <Stack
                            direction="row"
                            spacing={0.5}
                            alignItems="center"
                            sx={{ mt: 2, color: "primary.main" }}
                          >
                            <ArticleOutlinedIcon sx={{ fontSize: 16 }} />
                            <Typography variant="body2" fontWeight={600}>
                              Read article
                            </Typography>
                          </Stack>
                        </CardContent>
                      </CardActionArea>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </Box>
          );
        })}
      </Box>
    </Container>
  );
};

export default CareerAdvicePage;
