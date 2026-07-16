import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
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
};

const CareerAdvicePage = () => {
  TabTitle(`Career Advice Rwanda | Job Search Articles | ${APP_NAME}`);
  const nav = useNavigate();

  const categories = [...new Set(careerArticles.map((a) => a.category))];

  return (
    <Container maxWidth="lg">
      <Box sx={{ py: { xs: 4, md: 7 } }}>
        <Stack spacing={2} sx={{ maxWidth: 920, mb: 5 }}>
          <Typography variant="h3" component="h1" fontWeight={800}>
            Career Advice Rwanda
          </Typography>
          <Typography variant="h6" color="text.secondary" sx={{ lineHeight: 1.75 }}>
            Original articles on CV writing, interview preparation, salary
            negotiation, and career development for the Rwandan job market. New
            articles published regularly.
          </Typography>
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
