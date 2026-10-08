import React from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import {
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Container,
  Divider,
  Stack,
  Typography,
} from "@mui/material";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

import { TabTitle } from "../../../utils/generalFunction";
import { APP_NAME, ROUTES } from "../../../configs/constants";
import careerArticles from "../../../data/rwandaCareerArticles";

const CareerArticlePage = () => {
  const { slug } = useParams();
  const nav = useNavigate();

  const article = careerArticles.find((a) => a.slug === slug);

  if (!article) {
    TabTitle(`Article Not Found | ${APP_NAME}`);
    return (
      <Container maxWidth="md">
        <Box sx={{ py: 10, textAlign: "center" }}>
          <Typography variant="h4" fontWeight={700} gutterBottom>
            Article Not Found
          </Typography>
          <Typography color="text.secondary" sx={{ mb: 3 }}>
            The article you are looking for does not exist or has been moved.
          </Typography>
          <Button
            variant="contained"
            onClick={() => nav(`/${ROUTES.JOB_SEEKER.CAREER_ADVICE}`)}
          >
            Browse All Articles
          </Button>
        </Box>
      </Container>
    );
  }

  TabTitle(`${article.title} | ${APP_NAME}`);

  return (
    <Container maxWidth="md">
      <Box sx={{ py: { xs: 4, md: 7 } }}>
        <Button
          component={Link}
          to={`/${ROUTES.JOB_SEEKER.CAREER_ADVICE}`}
          startIcon={<ArrowBackIcon />}
          sx={{ mb: 3, textTransform: "none" }}
        >
          Back to Career Advice
        </Button>

        <Stack spacing={1.5} sx={{ mb: 4 }}>
          <Stack direction="row" spacing={1}>
            <Chip
              label={article.category}
              size="small"
              color="primary"
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
          <Typography variant="h3" component="h1" fontWeight={800}>
            {article.title}
          </Typography>
          <Typography variant="h6" color="text.secondary" sx={{ lineHeight: 1.65 }}>
            {article.excerpt}
          </Typography>
        </Stack>

        {article.body.map((section, index) => (
          <Box key={index} sx={{ mb: 4 }}>
            <Typography
              variant="h5"
              component="h2"
              fontWeight={700}
              sx={{ mb: 1.5 }}
            >
              {section.heading}
            </Typography>
            {section.paragraphs.map((p, pIdx) => (
              <Typography
                key={pIdx}
                color="text.secondary"
                sx={{ lineHeight: 1.8, mb: 1.5 }}
              >
                {p}
              </Typography>
            ))}
            {section.list && (
              <Box
                component="ul"
                sx={{
                  pl: 3,
                  "& li": {
                    color: "text.secondary",
                    lineHeight: 1.8,
                    mb: 0.5,
                  },
                }}
              >
                {section.list.map((item, lIdx) => (
                  <li key={lIdx}>{item}</li>
                ))}
              </Box>
            )}
          </Box>
        ))}

        <Divider sx={{ my: 5 }} />

        <Box sx={{ mb: 5 }}>
          <Typography variant="h5" component="h2" fontWeight={700} sx={{ mb: 2 }}>
            Key Takeaways
          </Typography>
          <Box
            component="ul"
            sx={{
              pl: 3,
              "& li": {
                color: "text.secondary",
                lineHeight: 1.8,
                mb: 0.75,
              },
            }}
          >
            {article.takeaways.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </Box>
        </Box>

        {article.faq && article.faq.length > 0 && (
          <Box sx={{ mb: 5 }}>
            <Typography variant="h5" component="h2" fontWeight={700} sx={{ mb: 2 }}>
              Frequently Asked Questions
            </Typography>
            {article.faq.map((item, index) => (
              <Card key={index} variant="outlined" sx={{ mb: 1.5, borderRadius: 1 }}>
                <CardContent>
                  <Typography variant="subtitle1" fontWeight={700} gutterBottom>
                    {item.q}
                  </Typography>
                  <Typography color="text.secondary" sx={{ lineHeight: 1.7 }}>
                    {item.a}
                  </Typography>
                </CardContent>
              </Card>
            ))}
          </Box>
        )}

        <Divider sx={{ mb: 4 }} />

        <Stack direction="row" spacing={2}>
          <Button
            variant="contained"
            onClick={() => nav(`/${ROUTES.JOB_SEEKER.CAREER_ADVICE}`)}
          >
            Browse All Articles
          </Button>
          <Button
            variant="outlined"
            onClick={() => nav(`/${ROUTES.JOB_SEEKER.JOBS_EN}`)}
          >
            Browse Jobs
          </Button>
        </Stack>
      </Box>
    </Container>
  );
};

export default CareerArticlePage;
