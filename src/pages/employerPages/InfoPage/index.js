import React from "react";
import { useLocation } from "react-router-dom";
import {
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Grid,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Stack,
  Typography,
} from "@mui/material";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";

import { TabTitle } from "../../../utils/generalFunction";
import NotFoundPage from "../../errorsPage/NotFoundPage";
import employerInfoPages from "../../../data/employerInfo";

const BRAND = "#441da0";

const normalizePath = (pathname = "") => {
  const trimmed = pathname.replace(/\/+$/, "");
  return trimmed.replace(/^\//, "") || "/";
};

const Hero = ({ title, subtitle }) => (
  <Box
    sx={{
      mt: { xs: 3, md: 5 },
      mb: { xs: 4, md: 6 },
      px: { xs: 3, sm: 5 },
      py: { xs: 4, md: 6 },
      borderRadius: 3,
      color: "white",
      bgcolor: BRAND,
      backgroundImage:
        "linear-gradient(135deg, rgba(255,255,255,0.12) 0%, rgba(255,255,255,0) 60%)",
    }}
  >
    <Typography variant="h3" component="h1" fontWeight={800} sx={{ fontSize: { xs: "1.9rem", md: "2.6rem" } }}>
      {title}
    </Typography>
    <Typography variant="body1" sx={{ mt: 1.5, maxWidth: 760, opacity: 0.92, lineHeight: 1.7 }}>
      {subtitle}
    </Typography>
  </Box>
);

const Section = ({ heading, paragraphs = [], bullets = [] }) => (
  <Box sx={{ mb: 5 }}>
    <Typography variant="h5" component="h2" fontWeight={700} sx={{ mb: 1.5 }}>
      {heading}
    </Typography>
    {paragraphs.map((paragraph) => (
      <Typography
        key={paragraph}
        variant="body1"
        color="text.secondary"
        sx={{ mb: 1.5, lineHeight: 1.8 }}
      >
        {paragraph}
      </Typography>
    ))}
    {bullets.length > 0 && (
      <List dense sx={{ mt: 1 }}>
        {bullets.map((bullet) => (
          <ListItem key={bullet} alignItems="flex-start" sx={{ px: 0 }}>
            <ListItemIcon sx={{ minWidth: 32, mt: 0.5 }}>
              <CheckCircleOutlineIcon fontSize="small" color="primary" />
            </ListItemIcon>
            <ListItemText primary={bullet} primaryTypographyProps={{ sx: { lineHeight: 1.7 } }} />
          </ListItem>
        ))}
      </List>
    )}
  </Box>
);

const PlanCard = ({ plan }) => (
  <Card
    elevation={plan.highlight ? 6 : 1}
    sx={{
      height: "100%",
      borderRadius: 3,
      position: "relative",
      border: plan.highlight ? `2px solid ${BRAND}` : "1px solid",
      borderColor: plan.highlight ? BRAND : "divider",
    }}
  >
    {plan.highlight && (
      <Chip
        label="Most popular"
        size="small"
        sx={{
          position: "absolute",
          top: 12,
          right: 12,
          bgcolor: BRAND,
          color: "white",
          fontWeight: 600,
        }}
      />
    )}
    <CardContent sx={{ p: 3 }}>
      <Typography variant="h6" fontWeight={700}>
        {plan.name}
      </Typography>
      <Stack direction="baseline" spacing={1} sx={{ mt: 1, mb: 0.5 }}>
        <Typography variant="h4" fontWeight={800} color={BRAND}>
          {plan.price}
        </Typography>
        {plan.period && (
          <Typography variant="body2" color="text.secondary">
            {plan.period}
          </Typography>
        )}
      </Stack>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 2, minHeight: 40 }}>
        {plan.description}
      </Typography>
      <List dense sx={{ p: 0, mb: 2 }}>
        {plan.features.map((feature) => (
          <ListItem key={feature} sx={{ px: 0, py: 0.5 }}>
            <ListItemIcon sx={{ minWidth: 28 }}>
              <CheckCircleOutlineIcon fontSize="small" color="primary" />
            </ListItemIcon>
            <ListItemText primary={feature} primaryTypographyProps={{ variant: "body2" }} />
          </ListItem>
        ))}
      </List>
      <Button
        fullWidth
        variant={plan.highlight ? "contained" : "outlined"}
        href={plan.href}
        endIcon={<ArrowForwardIcon />}
        sx={{ textTransform: "none", fontWeight: 700, color: plan.highlight ? "white" : BRAND }}
      >
        {plan.cta}
      </Button>
    </CardContent>
  </Card>
);

const FaqItem = ({ question, answer }) => {
  const [expanded, setExpanded] = React.useState(false);

  return (
    <Card
      variant="outlined"
      sx={{ mb: 1.5, borderRadius: 2, bgcolor: expanded ? "action.hover" : "background.paper" }}
    >
      <Button
        fullWidth
        onClick={() => setExpanded((prev) => !prev)}
        startIcon={<HelpOutlineIcon color="primary" />}
        sx={{
          justifyContent: "flex-start",
          textTransform: "none",
          fontWeight: 600,
          py: 1.5,
          color: "text.primary",
        }}
      >
        {question}
      </Button>
      {expanded && (
        <Typography variant="body2" color="text.secondary" sx={{ px: 2.5, pb: 2, lineHeight: 1.8 }}>
          {answer}
        </Typography>
      )}
    </Card>
  );
};

const BlogCard = ({ post }) => (
  <Card
    component="a"
    href={post.href}
    target="_blank"
    rel="noopener noreferrer"
    elevation={1}
    sx={{
      height: "100%",
      display: "flex",
      flexDirection: "column",
      borderRadius: 3,
      textDecoration: "none",
      color: "inherit",
      transition: "transform 0.2s ease, box-shadow 0.2s ease",
      "&:hover": { transform: "translateY(-4px)", boxShadow: 6 },
    }}
  >
    <CardContent sx={{ p: 3, flexGrow: 1 }}>
      <Stack direction="row" spacing={1} sx={{ mb: 1.5 }} alignItems="center">
        <Chip label={post.category} size="small" color="primary" variant="outlined" />
        <Stack direction="row" spacing={0.5} alignItems="center" color="text.secondary">
          <AccessTimeIcon fontSize="inherit" sx={{ fontSize: 14 }} />
          <Typography variant="caption">{post.readingTime}</Typography>
        </Stack>
      </Stack>
      <Typography variant="subtitle1" fontWeight={700} sx={{ mb: 1 }}>
        {post.title}
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.7 }}>
        {post.excerpt}
      </Typography>
    </CardContent>
  </Card>
);

const EmployerInfoPage = () => {
  const { pathname } = useLocation();
  const page = employerInfoPages[normalizePath(pathname)];

  if (!page) {
    return <NotFoundPage />;
  }

  TabTitle(page.tabTitle);

  return (
    <Box sx={{ pb: 6 }}>
      <Hero {...page.hero} />

      {(page.sections || []).map((section) => (
        <Section key={section.heading} {...section} />
      ))}

      {page.plans && (
        <Box sx={{ mb: 5 }}>
          <Grid container spacing={3}>
            {page.plans.map((plan) => (
              <Grid item xs={12} md={4} key={plan.name}>
                <PlanCard plan={plan} />
              </Grid>
            ))}
          </Grid>
        </Box>
      )}

      {page.faqs && (
        <Box sx={{ mb: 5 }}>
          <Typography variant="h5" component="h2" fontWeight={700} sx={{ mb: 2 }}>
            Frequently asked questions
          </Typography>
          {page.faqs.map((faq) => (
            <FaqItem key={faq.q} question={faq.q} answer={faq.a} />
          ))}
        </Box>
      )}

      {page.posts && (
        <Box sx={{ mb: 5 }}>
          <Grid container spacing={3}>
            {page.posts.map((post) => (
              <Grid item xs={12} sm={6} md={4} key={post.title}>
                <BlogCard post={post} />
              </Grid>
            ))}
          </Grid>
        </Box>
      )}
    </Box>
  );
};

export default EmployerInfoPage;
