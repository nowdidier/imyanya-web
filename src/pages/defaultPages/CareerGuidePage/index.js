import React from "react";
import { Link as RouterLink, useLocation, useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Divider,
  Grid,
  List,
  ListItem,
  ListItemText,
  Stack,
  Typography,
} from "@mui/material";
import ArticleOutlinedIcon from "@mui/icons-material/ArticleOutlined";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import WorkOutlineIcon from "@mui/icons-material/WorkOutline";

import { TabTitle } from "../../../utils/generalFunction";
import { APP_NAME, ROUTES } from "../../../configs/constants";
import {
  rwandaApplicationChecklist,
  rwandaCareerCategoryGuides,
  rwandaJobMarketHighlights,
  rwandaJobSearchSteps,
  rwandaLocationGuides,
  rwandaWorkTypeGuides,
} from "../../../data/rwandaCareerContent";
import OrganisationsMap from "../../../components/OrganisationsMap";
import SeoBreadcrumbs from "../../../components/SeoBreadcrumbs";

const GuideCard = ({ title, body }) => (
  <Card variant="outlined" sx={{ height: "100%", borderRadius: 1 }}>
    <CardContent>
      <Typography variant="h6" component="h3" fontWeight={700} gutterBottom>
        {title}
      </Typography>
      <Typography color="text.secondary" sx={{ lineHeight: 1.75 }}>
        {body}
      </Typography>
    </CardContent>
  </Card>
);

const Section = ({ icon, title, intro, items }) => (
  <Box sx={{ mt: 7 }}>
    <Stack direction="row" spacing={1.5} alignItems="center" sx={{ mb: 1 }}>
      {icon}
      <Typography variant="h4" component="h2" fontWeight={700}>
        {title}
      </Typography>
    </Stack>
    <Typography color="text.secondary" sx={{ maxWidth: 860, mb: 3, lineHeight: 1.75 }}>
      {intro}
    </Typography>
    <Grid container spacing={2.5}>
      {items.map((item) => (
        <Grid item xs={12} md={4} key={item.title}>
          <GuideCard {...item} />
        </Grid>
      ))}
    </Grid>
  </Box>
);

const CareerGuidePage = () => {
  TabTitle(`Rwanda Career Guide | Job Search Advice | ${APP_NAME}`);
  const nav = useNavigate();
  const location = useLocation();
  // Preserve shared ?q=&sector=&district=&hiring=&view= when jumping to
  // /companies so the list there meets the filtered map here.
  const preservedSearch = location.search || "";

  return (
    <Container maxWidth="lg">
      <SeoBreadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "Rwanda Career Guide" },
        ]}
      />
      <Box sx={{ py: { xs: 2, md: 4 } }}>
        <Stack spacing={2} sx={{ maxWidth: 920 }}>
          <Typography variant="h3" component="h1" fontWeight={800}>
            Rwanda Career Guide
          </Typography>
          <Typography variant="h6" color="text.secondary" sx={{ lineHeight: 1.75 }}>
            Practical job-search guidance for candidates comparing opportunities in
            Kigali and across Rwanda — plus a live map of hiring organisations.
            Filter by sector or district and click any pin to see open roles.
          </Typography>
          <Stack direction={{ xs: "column", sm: "row" }} spacing={1.5}>
            <Button
              variant="contained"
              onClick={() => nav(`/${ROUTES.JOB_SEEKER.JOBS_EN}`)}
            >
              Browse Jobs
            </Button>
            <Button
              variant="outlined"
              onClick={() => nav(`/${ROUTES.JOB_SEEKER.COMPANY_EN}${preservedSearch}`)}
            >
              Explore Employers
            </Button>
          </Stack>
        </Stack>

        <Box sx={{ mt: 5 }}>
          <OrganisationsMap
            title="Where Organisations Are Hiring"
            subtitle="Every pin is an employer place in Rwanda. Filter by sector, spot who is hiring now, and click a pin to see open roles."
          />
        </Box>

        {/* SEO guide content — kept below the interactive map so search
            engines and readers still get the full career advice. */}
        <Section
          icon={<ArticleOutlinedIcon color="primary" />}
          title="Rwanda Job Market Notes"
          intro="A useful job search starts with context. The strongest candidates understand where hiring is active, what recruiters compare, and how to make each application feel intentional."
          items={rwandaJobMarketHighlights}
        />

        <Section
          icon={<WorkOutlineIcon color="primary" />}
          title="A Better Application Process"
          intro="These steps help turn a broad job search into a repeatable weekly routine. They are written for job seekers who want quality applications rather than volume alone."
          items={rwandaJobSearchSteps}
        />

        <Box sx={{ mt: 7 }}>
          <Stack direction="row" spacing={1.5} alignItems="center" sx={{ mb: 1 }}>
            <CheckCircleOutlineIcon color="primary" />
            <Typography variant="h4" component="h2" fontWeight={700}>
              Application Checklist
            </Typography>
          </Stack>
          <Typography color="text.secondary" sx={{ maxWidth: 860, mb: 2, lineHeight: 1.75 }}>
            Before sending a CV or profile, check the details that usually decide
            whether an application moves forward.
          </Typography>
          <Card variant="outlined" sx={{ borderRadius: 1 }}>
            <List>
              {rwandaApplicationChecklist.map((item, index) => (
                <React.Fragment key={item}>
                  <ListItem alignItems="flex-start">
                    <ListItemText
                      primary={item}
                      primaryTypographyProps={{ sx: { lineHeight: 1.65 } }}
                    />
                  </ListItem>
                  {index < rwandaApplicationChecklist.length - 1 && <Divider />}
                </React.Fragment>
              ))}
            </List>
          </Card>
        </Box>

        <Section
          icon={<WorkOutlineIcon color="primary" />}
          title="Career Field Advice"
          intro="Different roles need different evidence. Use these notes to decide what to place near the top of your profile — then browse matching roles by career field."
          items={rwandaCareerCategoryGuides}
        />
        <Box sx={{ mt: 2 }}>
          <Button
            component={RouterLink}
            to={`/${ROUTES.JOB_SEEKER.JOBS_BY_CAREER_EN}`}
            variant="outlined"
            sx={{ textTransform: "none", fontWeight: 700 }}
          >
            Browse jobs by career →
          </Button>
        </Box>

        <Section
          icon={<LocationOnOutlinedIcon color="primary" />}
          title="Location and Work Type"
          intro="Location, travel, and work format affect hiring decisions. State your availability clearly so employers can compare you fairly."
          items={[...rwandaLocationGuides, ...rwandaWorkTypeGuides]}
        />
        <Stack direction={{ xs: "column", sm: "row" }} spacing={1.5} sx={{ mt: 3 }}>
          <Button
            component={RouterLink}
            to={`/${ROUTES.JOB_SEEKER.JOBS_BY_CITY_EN}`}
            variant="outlined"
            sx={{ textTransform: "none", fontWeight: 700 }}
          >
            Browse jobs by location →
          </Button>
          <Button
            component={RouterLink}
            to={`/${ROUTES.JOB_SEEKER.JOBS_BY_TYPE_EN}`}
            variant="outlined"
            sx={{ textTransform: "none", fontWeight: 700 }}
          >
            Browse jobs by work type →
          </Button>
        </Stack>
      </Box>
    </Container>
  );
};

export default CareerGuidePage;
