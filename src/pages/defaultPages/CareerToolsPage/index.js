import React from "react";
import { Link as RouterLink } from "react-router-dom";
import {
  Box,
  Button,
  Card,
  CardActionArea,
  CardContent,
  Chip,
  Container,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import CalculateOutlinedIcon from "@mui/icons-material/CalculateOutlined";
import ChecklistOutlinedIcon from "@mui/icons-material/ChecklistOutlined";
import TimerOutlinedIcon from "@mui/icons-material/TimerOutlined";
import QuestionAnswerOutlinedIcon from "@mui/icons-material/QuestionAnswerOutlined";
import AssignmentOutlinedIcon from "@mui/icons-material/AssignmentOutlined";
import PsychologyOutlinedIcon from "@mui/icons-material/PsychologyOutlined";
import TrackChangesOutlinedIcon from "@mui/icons-material/TrackChangesOutlined";
import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";
import BeachAccessOutlinedIcon from "@mui/icons-material/BeachAccessOutlined";
import DateRangeOutlinedIcon from "@mui/icons-material/DateRangeOutlined";
import SchoolOutlinedIcon from "@mui/icons-material/SchoolOutlined";
import ChatOutlinedIcon from "@mui/icons-material/ChatOutlined";
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
import ReceiptOutlinedIcon from "@mui/icons-material/ReceiptOutlined";
import CompareArrowsOutlinedIcon from "@mui/icons-material/CompareArrowsOutlined";
import TrendingUpOutlinedIcon from "@mui/icons-material/TrendingUpOutlined";
import HomeWorkOutlinedIcon from "@mui/icons-material/HomeWorkOutlined";
import BuildCircleOutlinedIcon from "@mui/icons-material/BuildCircleOutlined";

import { TabTitle } from "../../../utils/generalFunction";
import { APP_NAME, ROUTES } from "../../../configs/constants";
import { getAllTools, getCategories } from "../../../data/content/tools";

const TOOL_ICONS = {
  CalculateIcon: <CalculateOutlinedIcon sx={{ fontSize: 32, color: "#1a73e8" }} />,
  ChecklistIcon: <ChecklistOutlinedIcon sx={{ fontSize: 32, color: "#1a73e8" }} />,
  TimerIcon: <TimerOutlinedIcon sx={{ fontSize: 32, color: "#1a73e8" }} />,
  QuestionAnswerIcon: <QuestionAnswerOutlinedIcon sx={{ fontSize: 32, color: "#1a73e8" }} />,
  AssignmentIcon: <AssignmentOutlinedIcon sx={{ fontSize: 32, color: "#1a73e8" }} />,
  PsychologyIcon: <PsychologyOutlinedIcon sx={{ fontSize: 32, color: "#1a73e8" }} />,
  TrackChangesIcon: <TrackChangesOutlinedIcon sx={{ fontSize: 32, color: "#1a73e8" }} />,
  CalendarMonthIcon: <CalendarMonthOutlinedIcon sx={{ fontSize: 32, color: "#1a73e8" }} />,
  BeachAccessIcon: <BeachAccessOutlinedIcon sx={{ fontSize: 32, color: "#1a73e8" }} />,
  DateRangeIcon: <DateRangeOutlinedIcon sx={{ fontSize: 32, color: "#1a73e8" }} />,
  SchoolIcon: <SchoolOutlinedIcon sx={{ fontSize: 32, color: "#1a73e8" }} />,
  SwitchAccessShortcutIcon: <CompareArrowsOutlinedIcon sx={{ fontSize: 32, color: "#1a73e8" }} />,
  ChatIcon: <ChatOutlinedIcon sx={{ fontSize: 32, color: "#1a73e8" }} />,
  PeopleIcon: <PeopleOutlinedIcon sx={{ fontSize: 32, color: "#1a73e8" }} />,
  ReceiptIcon: <ReceiptOutlinedIcon sx={{ fontSize: 32, color: "#1a73e8" }} />,
  CompareArrowsIcon: <CompareArrowsOutlinedIcon sx={{ fontSize: 32, color: "#1a73e8" }} />,
  TrendingUpIcon: <TrendingUpOutlinedIcon sx={{ fontSize: 32, color: "#1a73e8" }} />,
  HomeWorkIcon: <HomeWorkOutlinedIcon sx={{ fontSize: 32, color: "#1a73e8" }} />,
  DescriptionIcon: <DescriptionOutlinedIcon sx={{ fontSize: 32, color: "#1a73e8" }} />,
  EmailIcon: <MailOutlineIcon sx={{ fontSize: 32, color: "#1a73e8" }} />,
};

const toolIcon = (name) => TOOL_ICONS[name] || <BuildCircleOutlinedIcon sx={{ fontSize: 32, color: "#1a73e8" }} />;

const TOOLS = [
  {
    title: "CV yo mu Rwanda",
    description:
      "Fill in your details — or load everything from your Imyanya profile — and download a clean, recruiter-ready CV as Word (.docx) or PDF.",
    to: `/${ROUTES.JOB_SEEKER.CV_BUILDER}`,
    icon: <DescriptionOutlinedIcon sx={{ fontSize: 36, color: "#1a73e8" }} />,
    points: ["Personal details", "Experience & education", "Skills"],
  },
  {
    title: "Cover Letter Builder",
    description:
      "Write a tailored cover letter for any job post and download it as a Word (.docx) file.",
    to: `/${ROUTES.JOB_SEEKER.COVER_LETTER_BUILDER}`,
    icon: <MailOutlineIcon sx={{ fontSize: 36, color: "#1a73e8" }} />,
    points: ["Recipient & role", "Letter body", "Closing"],
  },
];

const CareerToolsPage = () => {
  TabTitle(`CV yo mu Rwanda — Free CV & Cover Letter Builders (Word & PDF) | ${APP_NAME}`);
  const [category, setCategory] = React.useState("All");
  const categories = ["All", ...getCategories()];
  const visibleTools =
    category === "All" ? getAllTools() : getAllTools().filter((tool) => tool.category === category);

  return (
    <Container maxWidth="lg">
      <Box sx={{ py: { xs: 4, md: 7 } }}>
        <Stack spacing={2} sx={{ maxWidth: 920, mb: 2 }}>
          <Chip
            label="Free career tools"
            color="primary"
            variant="outlined"
            sx={{ alignSelf: "flex-start", fontWeight: 700 }}
          />
          <Typography variant="h3" component="h1" fontWeight={800}>
            Build it, don&apos;t just read about it
          </Typography>
          <Typography variant="h6" color="text.secondary" sx={{ lineHeight: 1.75 }}>
            Create a professional CV or cover letter in minutes and download it
            as a Word (.docx) file — free, no account needed, your data never
            leaves your browser.
          </Typography>
        </Stack>

        <Grid container spacing={3} sx={{ mt: 1 }}>
          {TOOLS.map((tool) => (
            <Grid item xs={12} md={6} key={tool.title}>
              <Card
                variant="outlined"
                sx={{
                  height: "100%",
                  borderRadius: 3,
                  borderColor: "#dadce0",
                  boxShadow: "none",
                }}
              >
                <CardContent sx={{ p: { xs: 2.5, md: 3.5 } }}>
                  <Stack spacing={2}>
                    {tool.icon}
                    <Typography variant="h5" component="h2" fontWeight={700}>
                      {tool.title}
                    </Typography>
                    <Typography color="text.secondary" sx={{ lineHeight: 1.7 }}>
                      {tool.description}
                    </Typography>
                    <Stack direction="row" spacing={1} sx={{ flexWrap: "wrap", rowGap: 1 }}>
                      {tool.points.map((point) => (
                        <Chip key={point} label={point} size="small" variant="outlined" />
                      ))}
                    </Stack>
                    <Box>
                      <Button
                        component={RouterLink}
                        to={tool.to}
                        variant="contained"
                        endIcon={<ArrowForwardIcon />}
                        sx={{
                          textTransform: "none",
                          fontWeight: 700,
                          borderRadius: "20px",
                          px: 3,
                          backgroundColor: "#1a73e8",
                          boxShadow: "none",
                          "&:hover": { backgroundColor: "#1b66c9", boxShadow: "none" },
                        }}
                      >
                        Open {tool.title}
                      </Button>
                    </Box>
                  </Stack>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        <Box sx={{ mt: 5, mb: 2 }}>
          <Typography variant="h4" component="h2" fontWeight={800} gutterBottom>
            All career tools
          </Typography>
          <Typography color="text.secondary" sx={{ mb: 2 }}>
            Salary and tax calculators, checklists, planners and guides — personalized for Rwanda.
            Your entries stay in this browser.
          </Typography>
          <Stack direction="row" spacing={1} sx={{ flexWrap: "wrap", rowGap: 1 }}>
            {categories.map((cat) => (
              <Chip
                key={cat}
                label={cat === "All" ? `All (${getAllTools().length})` : cat}
                clickable
                onClick={() => setCategory(cat)}
                color={category === cat ? "primary" : "default"}
                variant={category === cat ? "filled" : "outlined"}
                sx={{ fontWeight: 600 }}
              />
            ))}
          </Stack>
        </Box>

        <Grid container spacing={2.5}>
          {visibleTools.map((tool) => (
            <Grid item xs={12} sm={6} md={4} key={tool.slug}>
              <Card
                variant="outlined"
                sx={{
                  height: "100%",
                  borderRadius: 3,
                  borderColor: "#dadce0",
                  transition: "all 0.2s ease-in-out",
                  "&:hover": { borderColor: "#1a73e8", boxShadow: 1 },
                }}
              >
                <CardActionArea
                  component={RouterLink}
                  to={`/${ROUTES.JOB_SEEKER.CAREER_TOOLS}/${tool.slug}`}
                  sx={{ height: "100%", display: "flex", flexDirection: "column", alignItems: "stretch" }}
                >
                  <CardContent sx={{ flexGrow: 1, display: "flex", flexDirection: "column" }}>
                    <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 1.5 }}>
                      {toolIcon(tool.icon)}
                      <Chip label={tool.category} size="small" variant="outlined" />
                    </Stack>
                    <Typography variant="h6" component="h3" fontWeight={700} gutterBottom>
                      {tool.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.65, flexGrow: 1 }}>
                      {tool.description?.slice(0, 120)}{tool.description && tool.description.length > 120 ? "…" : ""}
                    </Typography>
                    <Stack direction="row" spacing={0.5} alignItems="center" sx={{ mt: 2, color: "primary.main" }}>
                      <Typography variant="body2" fontWeight={700}>Open tool</Typography>
                      <ArrowForwardIcon sx={{ fontSize: 16 }} />
                    </Stack>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
          ))}
        </Grid>

        <Card
          variant="outlined"
          sx={{ mt: 4, borderRadius: 3, borderColor: "#dadce0", bgcolor: "#f6fafe" }}
        >
          <CardContent sx={{ p: { xs: 2.5, md: 3 } }}>
            <Stack
              direction={{ xs: "column", sm: "row" }}
              spacing={2}
              alignItems={{ xs: "flex-start", sm: "center" }}
              justifyContent="space-between"
            >
              <Stack direction="row" spacing={1.5} alignItems="center">
                <DownloadOutlinedIcon color="primary" />
                <Typography color="text.secondary">
                  Prefer guidance first? Read the step-by-step articles, then come back and build.
                </Typography>
              </Stack>
              <Button
                component={RouterLink}
                to={`/${ROUTES.JOB_SEEKER.CAREER_ADVICE}`}
                variant="outlined"
                sx={{
                  textTransform: "none",
                  fontWeight: 600,
                  borderRadius: "20px",
                  borderColor: "#dadce0",
                  whiteSpace: "nowrap",
                }}
              >
                Browse Career Advice Articles
              </Button>
            </Stack>
          </CardContent>
        </Card>
      </Box>
    </Container>
  );
};

export default CareerToolsPage;
