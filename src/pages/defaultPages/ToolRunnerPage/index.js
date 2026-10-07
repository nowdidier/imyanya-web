import React from "react";
import { Link as RouterLink, useParams } from "react-router-dom";
import dayjs from "dayjs";
import {
  Alert,
  Box,
  Breadcrumbs,
  Button,
  Card,
  CardContent,
  Checkbox,
  Chip,
  Container,
  Divider,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  IconButton,
  LinearProgress,
  MenuItem,
  Radio,
  RadioGroup,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import AddIcon from "@mui/icons-material/Add";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

import { TabTitle } from "../../../utils/generalFunction";
import toastMessages from "../../../utils/toastMessages";
import { APP_NAME, ROUTES } from "../../../configs/constants";
import NoDataCard from "../../../components/NoDataCard";
import { getRelatedTools, getToolBySlug } from "../../../data/content/tools";
import { computeToolResults, fmtInt, fmtPct, fmtRwf, hasRequiredInputs, num } from "../../../utils/toolEngines";

const storeKey = (slug) => `imyanya-tool:${slug}`;

const loadStored = (slug) => {
  try {
    const raw = window.localStorage.getItem(storeKey(slug));
    return raw ? JSON.parse(raw) : {};
  } catch (error) {
    return {};
  }
};

const formatNumber = (output, value) => {
  const number = Number(value) || 0;
  switch (output.format) {
    case "RWF currency":
      return fmtRwf(number);
    case "percentage":
      return fmtPct(number);
    case "count":
      return `${Math.round(number)}`;
    case "days":
    case "days per year":
      return `${Math.round(number)} days`;
    case "consecutive days":
      return `${Math.round(number)} consecutive days`;
    case "weeks":
      return `${Math.round(number)} weeks`;
    case "months":
      return `${Math.round(number * 10) / 10} months`;
    case "score":
      return `${Math.round(number)}`;
    case "out of 100":
      return `${Math.round(number)} / 100`;
    case "percentile":
      return `${Math.round(number)}th percentile`;
    case "countdown":
      return typeof value === "number" ? `${value} days` : String(value);
    case "date":
      return dayjs(value).isValid() ? dayjs(value).format("DD MMM YYYY") : "—";
    default:
      return Number.isInteger(number) ? fmtInt(number) : `${Math.round(number * 10) / 10}`;
  }
};

const MetricCard = ({ label, display }) => (
  <Box
    sx={{
      p: 2,
      borderRadius: 2,
      border: "1px solid #e8eaed",
      bgcolor: "#f8f9fa",
      height: "100%",
    }}
  >
    <Typography variant="caption" color="text.secondary" sx={{ display: "block", mb: 0.5 }}>
      {label}
    </Typography>
    <Typography variant="h6" fontWeight={800} sx={{ color: "#202124", wordBreak: "break-word" }}>
      {display}
    </Typography>
  </Box>
);

const BarsBlock = ({ label, items }) => {
  const max = Math.max(1, ...items.map((item) => Number(item.value) || 0));
  return (
    <Box sx={{ mb: 3 }}>
      <Typography variant="subtitle1" fontWeight={700} gutterBottom>
        {label}
      </Typography>
      <Stack spacing={1.25}>
        {items.map((item, index) => (
          <Box key={index}>
            <Stack direction="row" justifyContent="space-between" spacing={1}>
              <Typography variant="body2" sx={{ textTransform: "capitalize" }}>
                {item.label}
              </Typography>
              <Typography variant="body2" fontWeight={700}>
                {item.display ?? fmtInt(item.value)}
              </Typography>
            </Stack>
            <LinearProgress
              variant="determinate"
              value={Math.max(2, (Number(item.value) / max) * 100)}
              sx={{ height: 8, borderRadius: 4, mt: 0.5, bgcolor: "#e8eaed" }}
            />
          </Box>
        ))}
      </Stack>
    </Box>
  );
};

const DataTable = ({ label, columns, rows }) => (
  <Box sx={{ mb: 3 }}>
    <Typography variant="subtitle1" fontWeight={700} gutterBottom>
      {label}
    </Typography>
    <TableContainer sx={{ border: "1px solid #e8eaed", borderRadius: 2 }}>
      <Table size="small">
        <TableHead>
          <TableRow sx={{ bgcolor: "#f8f9fa" }}>
            {columns.map((column, index) => (
              <TableCell key={index} sx={{ fontWeight: 700 }}>
                {column}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, index) => (
            <TableRow key={index}>
              {row.map((cell, cellIndex) => (
                <TableCell key={cellIndex} sx={{ whiteSpace: "pre-line" }}>
                  {cell}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  </Box>
);

const ToolRunnerPage = () => {
  const { slug } = useParams();
  const tool = getToolBySlug(slug);

  const [values, setValues] = React.useState(() => loadStored(slug).values || {});
  const [checked, setChecked] = React.useState(() => loadStored(slug).checked || []);
  const [answers, setAnswers] = React.useState(() => loadStored(slug).answers || {});
  const [entries, setEntries] = React.useState(() => loadStored(slug).entries || []);
  const [draft, setDraft] = React.useState({});

  React.useEffect(() => {
    try {
      window.localStorage.setItem(storeKey(slug), JSON.stringify({ values, checked, answers, entries }));
    } catch (error) {
      // Private mode etc. — tool still works for the session.
    }
  }, [slug, values, checked, answers, entries]);

  React.useEffect(() => {
    const stored = loadStored(slug);
    setValues(stored.values || {});
    setChecked(stored.checked || []);
    setAnswers(stored.answers || {});
    setEntries(stored.entries || {});
    setDraft({});
  }, [slug]);

  if (!tool) {
    TabTitle(`Career Tools | ${APP_NAME}`);
    return (
      <Container maxWidth="lg">
        <Box sx={{ py: 6 }}>
          <NoDataCard title="Tool not found" />
          <Box sx={{ textAlign: "center", mt: 2 }}>
            <Button component={RouterLink} to={`/${ROUTES.JOB_SEEKER.CAREER_TOOLS}`} variant="outlined" sx={{ textTransform: "none", borderRadius: "20px" }}>
              Back to Career Tools
            </Button>
          </Box>
        </Box>
      </Container>
    );
  }

  TabTitle(`${tool.metaTitle || `${tool.name} | ${APP_NAME}`}`);

  const setValue = (id) => (event) => {
    const value = event?.target?.value ?? "";
    setValues((prev) => ({ ...prev, [id]: value }));
  };

  const toggleChecked = (id) =>
    setChecked((prev) => (prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]));

  const copyText = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      toastMessages.success("Copied to clipboard.");
    } catch (error) {
      toastMessages.warn("Copy failed. Please copy manually.");
    }
  };

  const extraInputs = (tool.outputs || []).filter((output) => output.placeholder);
  const results = computeToolResults(tool, values, { checked, entries, answers });
  const ready = hasRequiredInputs(tool, values);

  // ---- interactive derivations -------------------------------------------
  const checklistCats = Array.isArray(tool.categories) && tool.categories[0]?.items ? tool.categories : null;
  const scoreCats = Array.isArray(tool.categories) && tool.categories[0]?.questions ? tool.categories : null;

  let checklistStats = null;
  if (checklistCats) {
    const all = checklistCats.flatMap((cat) => cat.items.map((item) => ({ ...item, category: cat.name })));
    const done = all.filter((item) => checked.includes(item.id));
    const byCat = checklistCats.map((cat) => {
      const items = cat.items || [];
      const hit = items.filter((item) => checked.includes(item.id)).length;
      return { label: cat.name, value: items.length > 0 ? Math.round((hit / items.length) * 100) : 0, display: `${hit}/${items.length}` };
    });
    checklistStats = {
      total: all.length,
      done: done.length,
      pct: all.length > 0 ? Math.round((done.length / all.length) * 100) : 0,
      missing: all.filter((item) => !checked.includes(item.id)),
      byCat,
    };
  }

  let scoreStats = null;
  if (scoreCats) {
    const perCat = scoreCats.map((cat) => {
      const qs = cat.questions || [];
      const sum = qs.reduce((acc, q) => acc + num(answers[q.id], 0), 0);
      const avg = qs.length > 0 ? sum / qs.length : 0;
      return { name: cat.name, avg, pct: Math.round((avg / 3) * 100), weight: Number(cat.weight) || 0 };
    });
    const total = Math.round(perCat.reduce((acc, c) => acc + (c.avg / 3) * c.weight, 0));
    const band = (tool.ratingRanges || []).find((r) => total >= r.min && total <= r.max);
    scoreStats = {
      total,
      perCat,
      band,
      strengths: perCat.filter((c) => c.avg >= 2),
      areas: perCat.filter((c) => c.avg < 2),
    };
  }

  let countdown = null;
  if (Array.isArray(tool.preparationDays)) {
    const target = dayjs(values["interview-date"]);
    const daysLeft = target.isValid() ? target.startOf("day").diff(dayjs().startOf("day"), "day") : null;
    const visible = tool.preparationDays.filter((d) => daysLeft === null || daysLeft < 0 || d.day >= -daysLeft);
    const tasks = visible.flatMap((d) => d.tasks || []);
    const done = tasks.filter((t) => checked.includes(t.id)).length;
    const today = tool.preparationDays.find((d) => d.day === (daysLeft !== null ? -daysLeft : null));
    countdown = { daysLeft, visible, tasks, done, today };
  }

  let quiz = null;
  if (Array.isArray(tool.questions)) {
    const totals = {};
    let answered = 0;
    for (const q of tool.questions) {
      const opt = (q.options || []).find((o) => String(o.value) === String(answers[q.id]));
      if (opt) {
        answered += 1;
        for (const [track, points] of Object.entries(opt.score || {})) {
          totals[track] = (totals[track] || 0) + Number(points);
        }
      }
    }
    const ranked = (tool.results || [])
      .map((result) => {
        const reqs = Object.entries(result.minScore || {});
        const best = reqs.reduce(
          (acc, [track, threshold]) => {
            const score = totals[track] || 0;
            const ratio = Number(threshold) > 0 ? score / Number(threshold) : 0;
            return ratio > acc.ratio ? { ratio, score, track } : acc;
          },
          { ratio: 0, score: 0, track: "" }
        );
        return { result, ...best };
      })
      .sort((a, b) => b.ratio - a.ratio);
    quiz = { totals, answered, total: tool.questions.length, ranked };
  }

  // ---- output rendering ----------------------------------------------------
  const renderResult = (output) => {
    // Interactive outputs first.
    if (output.id === "total-items" && checklistStats) {
      return <MetricCard key={output.id} label={output.label} display={`${checklistStats.total}`} />;
    }
    if ((output.id === "completed-items" || output.id === "completed-tasks") && (checklistStats || countdown)) {
      const done = checklistStats ? checklistStats.done : countdown.done;
      return <MetricCard key={output.id} label={output.label} display={`${done}`} />;
    }
    if ((output.id === "completion-percentage" || output.id === "research-score") && checklistStats) {
      return (
        <Box key={output.id} sx={{ mb: 3 }}>
          <Stack direction="row" justifyContent="space-between" alignItems="baseline">
            <Typography variant="subtitle1" fontWeight={700}>{output.label}</Typography>
            <Typography variant="h6" fontWeight={800} color="primary">{checklistStats.pct}%</Typography>
          </Stack>
          <LinearProgress variant="determinate" value={checklistStats.pct} sx={{ height: 10, borderRadius: 5, mt: 1 }} />
        </Box>
      );
    }
    if (output.id === "missing-items" && checklistStats) {
      return (
        <DataTable
          key={output.id}
          label={output.label}
          columns={["Category", "Item", "Importance"]}
          rows={checklistStats.missing.map((item) => [item.category, item.label, item.importance || "—"])}
        />
      );
    }
    if (output.id === "category-scores" && checklistStats) {
      return <BarsBlock key={output.id} label={output.label} items={checklistStats.byCat} />;
    }
    if (output.id === "total-score" && scoreStats) {
      return (
        <Box key={output.id} sx={{ mb: 3 }}>
          <Stack direction="row" justifyContent="space-between" alignItems="baseline">
            <Typography variant="subtitle1" fontWeight={700}>{output.label}</Typography>
            <Typography variant="h6" fontWeight={800} color="primary">{scoreStats.total} / 100</Typography>
          </Stack>
          <LinearProgress variant="determinate" value={scoreStats.total} sx={{ height: 10, borderRadius: 5, mt: 1 }} />
          {scoreStats.band && (
            <Alert severity="info" sx={{ mt: 1.5, borderRadius: 2 }}>
              <strong>{scoreStats.band.label}:</strong> {scoreStats.band.description}
            </Alert>
          )}
        </Box>
      );
    }
    if (output.id === "overall-rating" && scoreStats) {
      return <MetricCard key={output.id} label={output.label} display={scoreStats.band ? `${scoreStats.band.label}` : "Answer all questions"} />;
    }
    if (output.id === "strengths" && scoreStats) {
      return (
        <DataTable
          key={output.id}
          label={output.label}
          columns={["Strength", "Score"]}
          rows={scoreStats.strengths.length > 0 ? scoreStats.strengths.map((c) => [c.name, `${c.pct}%`]) : [["—", "Answer the questions to reveal strengths"]]}
        />
      );
    }
    if (output.id === "areas-to-improve" && scoreStats) {
      return (
        <DataTable
          key={output.id}
          label={output.label}
          columns={["Area", "Score"]}
          rows={scoreStats.areas.length > 0 ? scoreStats.areas.map((c) => [c.name, `${c.pct}%`]) : [["—", "Nothing flagged yet — great progress"]]}
        />
      );
    }
    if (output.id === "recommendations" && scoreStats) {
      const recs = scoreStats.areas.map((c) => `Focus your next practice round on ${c.name} (currently ${c.pct}%).`);
      return (
        <Box key={output.id} sx={{ mb: 3 }}>
          <Typography variant="subtitle1" fontWeight={700} gutterBottom>{output.label}</Typography>
          {(recs.length > 0 ? recs : ["Keep practicing to maintain your strong performance."]).map((rec, i) => (
            <Typography key={i} variant="body2" color="text.secondary" sx={{ mb: 0.75 }}>• {rec}</Typography>
          ))}
        </Box>
      );
    }
    if (output.id === "total-tasks" && countdown) {
      return <MetricCard key={output.id} label={output.label} display={`${countdown.tasks.length}`} />;
    }
    if (output.id === "progress" && countdown) {
      const pct = countdown.tasks.length > 0 ? Math.round((countdown.done / countdown.tasks.length) * 100) : 0;
      return (
        <Box key={output.id} sx={{ mb: 3 }}>
          <Stack direction="row" justifyContent="space-between" alignItems="baseline">
            <Typography variant="subtitle1" fontWeight={700}>{output.label}</Typography>
            <Typography variant="h6" fontWeight={800} color="primary">{pct}%</Typography>
          </Stack>
          <LinearProgress variant="determinate" value={pct} sx={{ height: 10, borderRadius: 5, mt: 1 }} />
        </Box>
      );
    }
    if (output.id === "daily-focus" && countdown) {
      return (
        <Alert key={output.id} severity="info" sx={{ mb: 3, borderRadius: 2 }}>
          <strong>Today&apos;s focus:</strong>{" "}
          {countdown.today ? `${countdown.today.title} — ${countdown.today.focusArea}. Tip: ${countdown.today.tip}` : "Work through the plan below, one day at a time."}
        </Alert>
      );
    }
    if ((output.id === "total-score" || output.id === "primary-path" || output.id === "secondary-path" || output.id === "sector-match" || output.id === "skill-gaps" || output.id === "recommended-roles" || output.id === "action-plan") && quiz) {
      if (quiz.answered < quiz.total) {
        return (
          <Alert key={output.id} severity="info" sx={{ mb: 3, borderRadius: 2 }}>
            Answer all {quiz.total} questions below ({quiz.answered}/{quiz.total} done) to reveal your result.
          </Alert>
        );
      }
      const [first, second] = quiz.ranked;
      const totalScore = Object.values(quiz.totals).reduce((a, b) => a + b, 0);
      if (output.id === "total-score") return <MetricCard key={output.id} label={output.label} display={`${totalScore} points`} />;
      if (output.id === "primary-path") {
        return (
          <Card key={output.id} variant="outlined" sx={{ mb: 3, borderRadius: 2, borderColor: "#1a73e8", bgcolor: "#f6fafe" }}>
            <CardContent>
              <Typography variant="subtitle1" fontWeight={800}>{first?.result.title}</Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>{first?.result.description}</Typography>
            </CardContent>
          </Card>
        );
      }
      if (output.id === "secondary-path") {
        return (
          <Card key={output.id} variant="outlined" sx={{ mb: 3, borderRadius: 2 }}>
            <CardContent>
              <Typography variant="subtitle1" fontWeight={700}>Also consider: {second?.result.title}</Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>{second?.result.description}</Typography>
            </CardContent>
          </Card>
        );
      }
      if (output.id === "sector-match") {
        return <MetricCard key={output.id} label={output.label} display={(first?.result.sectors || []).slice(0, 2).join(" • ") || "—"} />;
      }
      if (output.id === "skill-gaps") {
        return <DataTable key={output.id} label={output.label} columns={["Skill to build"]} rows={(first?.result.skillGaps || []).map((s) => [s])} />;
      }
      if (output.id === "recommended-roles") {
        return <DataTable key={output.id} label={output.label} columns={["Recommended role"]} rows={(first?.result.recommendedRoles || []).map((s) => [s])} />;
      }
      if (output.id === "action-plan") {
        return (
          <Box key={output.id} sx={{ mb: 3 }}>
            <Typography variant="subtitle1" fontWeight={700} gutterBottom>{output.label}</Typography>
            {(first?.result.actionSteps || []).map((step, i) => (
              <Typography key={i} variant="body2" color="text.secondary" sx={{ mb: 0.75 }}>{i + 1}. {step}</Typography>
            ))}
          </Box>
        );
      }
    }

    const result = results[output.id];
    if (result === null || result === undefined || result === "") return null;
    if (typeof result === "number" || typeof result === "string") {
      if (output.type === "number") {
        return <MetricCard key={output.id} label={output.label} display={formatNumber(output, result)} />;
      }
      const paragraphs = String(result).split("\n").map((p) => p.trim()).filter(Boolean);
      const copyable = ["email template", "verbal script", "follow-up", "example"].includes(output.format);
      return (
        <Box key={output.id} sx={{ mb: 3 }}>
          <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 1 }}>
            <Typography variant="subtitle1" fontWeight={700}>{output.label}</Typography>
            {copyable && (
              <IconButton size="small" onClick={() => copyText(String(result))} sx={{ border: "1px solid #dadce0", borderRadius: 2 }} aria-label={`Copy ${output.label}`}>
                <ContentCopyIcon sx={{ fontSize: 16 }} />
              </IconButton>
            )}
          </Stack>
          {paragraphs.map((para, i) => (
            <Typography key={i} variant="body2" color="text.secondary" sx={{ mb: 1, whiteSpace: "pre-line", lineHeight: 1.75 }}>
              {para}
            </Typography>
          ))}
        </Box>
      );
    }
    if (Array.isArray(result)) {
      return (
        <Box key={output.id} sx={{ mb: 3 }}>
          <Typography variant="subtitle1" fontWeight={700} gutterBottom>{output.label}</Typography>
          {result.map((item, i) => (
            <Typography key={i} variant="body2" color="text.secondary" sx={{ mb: 0.75 }}>• {item}</Typography>
          ))}
        </Box>
      );
    }
    if (result.kind === "table") {
      return <DataTable key={output.id} label={output.label} columns={result.columns} rows={result.rows} />;
    }
    if (result.kind === "bars") {
      return <BarsBlock key={output.id} label={output.label} items={result.items} />;
    }
    if (result.kind === "progress") {
      return (
        <Box key={output.id} sx={{ mb: 3 }}>
          <Stack direction="row" justifyContent="space-between" alignItems="baseline">
            <Typography variant="subtitle1" fontWeight={700}>{output.label}</Typography>
            <Typography variant="h6" fontWeight={800} color="primary">{Math.round(result.value)}%</Typography>
          </Stack>
          <LinearProgress variant="determinate" value={Math.max(0, Math.min(100, result.value))} sx={{ height: 10, borderRadius: 5, mt: 1 }} />
        </Box>
      );
    }
    if (result.kind === "kanban") {
      const colors = { gray: "#9aa0a6", blue: "#1a73e8", yellow: "#f9ab00", orange: "#fa903e", purple: "#9334e6", green: "#188038", "dark-green": "#0d652d", red: "#d93025" };
      return (
        <Box key={output.id} sx={{ mb: 3 }}>
          <Typography variant="subtitle1" fontWeight={700} gutterBottom>{output.label}</Typography>
          <Grid container spacing={1.5}>
            {(result.columns || []).map((col, i) => (
              <Grid item xs={12} sm={6} md={4} key={i}>
                <Box sx={{ border: "1px solid #e8eaed", borderRadius: 2, p: 1.5, height: "100%" }}>
                  <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 1 }}>
                    <Box sx={{ width: 10, height: 10, borderRadius: "50%", bgcolor: colors[col.color] || "#9aa0a6" }} />
                    <Typography variant="subtitle2" fontWeight={700}>{col.name} ({col.items.length})</Typography>
                  </Stack>
                  {col.items.map((item, j) => (
                    <Typography key={j} variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>• {item}</Typography>
                  ))}
                </Box>
              </Grid>
            ))}
          </Grid>
        </Box>
      );
    }
    return null;
  };

  const renderField = (input) => {
    const value = values[input.id] ?? "";
    if (input.type === "number") {
      return (
        <TextField
          fullWidth
          size="small"
          type="number"
          label={input.label}
          placeholder={input.placeholder}
          value={value}
          onChange={setValue(input.id)}
          inputProps={{ min: input.min, max: input.max, step: input.step }}
        />
      );
    }
    if (input.type === "select") {
      return (
        <TextField fullWidth size="small" select label={input.label} value={value} onChange={setValue(input.id)}>
          {(input.options || []).map((opt) => (
            <MenuItem key={String(opt.value)} value={opt.value}>
              {opt.label}
            </MenuItem>
          ))}
        </TextField>
      );
    }
    if (input.type === "radio") {
      return (
        <FormControl component="fieldset">
          <FormLabel component="legend" sx={{ fontSize: 13, mb: 0.5 }}>{input.label}</FormLabel>
          <RadioGroup row value={String(value)} onChange={setValue(input.id)}>
            {(input.options || []).map((opt) => (
              <FormControlLabel key={String(opt.value)} value={String(opt.value)} control={<Radio size="small" />} label={opt.label} />
            ))}
          </RadioGroup>
        </FormControl>
      );
    }
    if (input.type === "date" || (input.type === "text" && /date/i.test(input.id))) {
      return (
        <TextField
          fullWidth
          size="small"
          type="date"
          label={input.label}
          value={value}
          onChange={setValue(input.id)}
          InputLabelProps={{ shrink: true }}
        />
      );
    }
    return (
      <TextField
        fullWidth
        size="small"
        label={input.label}
        placeholder={input.placeholder}
        value={value}
        onChange={setValue(input.id)}
      />
    );
  };

  const related = getRelatedTools(tool.slug, 3);

  return (
    <Container maxWidth="lg">
      <Box sx={{ py: { xs: 4, md: 6 } }}>
        <Breadcrumbs sx={{ mb: 2, fontSize: 13 }}>
          <Typography component={RouterLink} to={`/${ROUTES.JOB_SEEKER.CAREER_TOOLS}`} sx={{ color: "#1a73e8", textDecoration: "none" }}>
            Career Tools
          </Typography>
          <Typography color="text.secondary">{tool.name}</Typography>
        </Breadcrumbs>

        <Stack spacing={1.5} sx={{ maxWidth: 900, mb: 4 }}>
          <Chip label={tool.category} color="primary" variant="outlined" sx={{ alignSelf: "flex-start", fontWeight: 700 }} />
          <Typography variant="h3" component="h1" fontWeight={800}>
            {tool.name}
          </Typography>
          <Typography color="text.secondary" sx={{ lineHeight: 1.7 }}>
            {tool.description}
          </Typography>
          {tool.logicDescription && (
            <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.7 }}>
              <strong>How it works:</strong> {tool.logicDescription}
            </Typography>
          )}
        </Stack>

        <Grid container spacing={3} alignItems="flex-start">
          <Grid item xs={12} md={5}>
            <Card variant="outlined" sx={{ borderRadius: 3, borderColor: "#dadce0", position: { md: "sticky" }, top: 16 }}>
              <CardContent sx={{ p: { xs: 2, md: 3 } }}>
                <Typography variant="h6" fontWeight={700} gutterBottom>
                  Your details
                </Typography>
                <Stack spacing={2}>
                  {(tool.inputs || []).map((input) => (
                    <Box key={input.id}>{renderField(input)}</Box>
                  ))}
                  {extraInputs.map((output) => (
                    <TextField
                      key={output.id}
                      fullWidth
                      size="small"
                      type="number"
                      label={`${output.label} (optional)`}
                      placeholder={output.placeholder}
                      value={values[output.id] ?? ""}
                      onChange={setValue(output.id)}
                    />
                  ))}
                </Stack>
                {!ready && (
                  <Alert severity="info" sx={{ mt: 2, borderRadius: 2 }}>
                    Fill the required fields to personalize your results.
                  </Alert>
                )}
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={7}>
            <Card variant="outlined" sx={{ borderRadius: 3, borderColor: "#dadce0" }}>
              <CardContent sx={{ p: { xs: 2, md: 3 } }}>
                <Typography variant="h6" fontWeight={700} gutterBottom>
                  Your results
                </Typography>
                <Divider sx={{ mb: 2 }} />
                {(tool.outputs || []).map((output) => renderResult(output))}
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {checklistCats && (
          <Card variant="outlined" sx={{ mt: 3, borderRadius: 3, borderColor: "#dadce0" }}>
            <CardContent sx={{ p: { xs: 2, md: 3 } }}>
              <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 1 }}>
                <Typography variant="h6" fontWeight={700}>Interactive checklist</Typography>
                <Chip label={`${checklistStats.done}/${checklistStats.total} done`} color={checklistStats.pct === 100 ? "success" : "primary"} variant="outlined" />
              </Stack>
              <LinearProgress variant="determinate" value={checklistStats.pct} sx={{ height: 8, borderRadius: 4, mb: 2 }} />
              {checklistCats.map((cat) => (
                <Box key={cat.name} sx={{ mb: 2.5 }}>
                  <Typography variant="subtitle1" fontWeight={700} sx={{ mb: 1 }}>{cat.name}</Typography>
                  <Stack spacing={1}>
                    {(cat.items || []).map((item) => (
                      <Box
                        key={item.id}
                        onClick={() => toggleChecked(item.id)}
                        sx={{
                          display: "flex",
                          gap: 1.5,
                          p: 1.5,
                          borderRadius: 2,
                          border: "1px solid",
                          borderColor: checked.includes(item.id) ? "#1a73e8" : "#e8eaed",
                          bgcolor: checked.includes(item.id) ? "#f6fafe" : "white",
                          cursor: "pointer",
                        }}
                      >
                        <Checkbox size="small" checked={checked.includes(item.id)} tabIndex={-1} disableRipple sx={{ p: 0, mt: 0.25 }} />
                        <Box>
                          <Typography variant="body2" fontWeight={600}>
                            {item.label}
                            {item.importance && (
                              <Chip label={item.importance} size="small" variant="outlined" sx={{ ml: 1, height: 20, fontSize: 11 }} />
                            )}
                          </Typography>
                          {(item.description || item.source) && (
                            <Typography variant="caption" color="text.secondary">
                              {[item.description, item.source ? `Where: ${item.source}` : ""].filter(Boolean).join(" • ")}
                            </Typography>
                          )}
                        </Box>
                      </Box>
                    ))}
                  </Stack>
                </Box>
              ))}
            </CardContent>
          </Card>
        )}

        {scoreCats && (
          <Card variant="outlined" sx={{ mt: 3, borderRadius: 3, borderColor: "#dadce0" }}>
            <CardContent sx={{ p: { xs: 2, md: 3 } }}>
              <Typography variant="h6" fontWeight={700} gutterBottom>
                Rate yourself honestly
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                For each statement, pick the option that matches you best. Your score updates live above.
              </Typography>
              {scoreCats.map((cat) => (
                <Box key={cat.name} sx={{ mb: 2 }}>
                  <Typography variant="subtitle1" fontWeight={700} sx={{ mb: 1 }}>
                    {cat.name} <Typography component="span" variant="caption" color="text.secondary">(weight {cat.weight}%)</Typography>
                  </Typography>
                  <Stack spacing={1.5}>
                    {(cat.questions || []).map((q) => (
                      <Box key={q.id} sx={{ p: 1.5, border: "1px solid #e8eaed", borderRadius: 2 }}>
                        <Typography variant="body2" fontWeight={600} sx={{ mb: 1 }}>{q.text}</Typography>
                        <RadioGroup value={String(answers[q.id] ?? "")} onChange={(e) => setAnswers((prev) => ({ ...prev, [q.id]: e.target.value }))}>
                          {(q.options || []).map((opt) => (
                            <FormControlLabel key={opt.value} value={String(opt.value)} control={<Radio size="small" />} label={<Typography variant="body2">{opt.label}</Typography>} />
                          ))}
                        </RadioGroup>
                      </Box>
                    ))}
                  </Stack>
                </Box>
              ))}
            </CardContent>
          </Card>
        )}

        {quiz && (
          <Card variant="outlined" sx={{ mt: 3, borderRadius: 3, borderColor: "#dadce0" }}>
            <CardContent sx={{ p: { xs: 2, md: 3 } }}>
              <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 1 }}>
                <Typography variant="h6" fontWeight={700}>Assessment questions</Typography>
                <Chip label={`${quiz.answered}/${quiz.total} answered`} color="primary" variant="outlined" />
              </Stack>
              <LinearProgress variant="determinate" value={quiz.total > 0 ? (quiz.answered / quiz.total) * 100 : 0} sx={{ height: 8, borderRadius: 4, mb: 2 }} />
              <Stack spacing={2}>
                {(tool.questions || []).map((q, qi) => (
                  <Box key={q.id} sx={{ p: 1.5, border: "1px solid #e8eaed", borderRadius: 2 }}>
                    <Typography variant="body2" fontWeight={700} sx={{ mb: 1 }}>{qi + 1}. {q.text}</Typography>
                    <RadioGroup value={String(answers[q.id] ?? "")} onChange={(e) => setAnswers((prev) => ({ ...prev, [q.id]: e.target.value }))}>
                      {(q.options || []).map((opt) => (
                        <FormControlLabel key={opt.value} value={String(opt.value)} control={<Radio size="small" />} label={<Typography variant="body2">{opt.label}</Typography>} />
                      ))}
                    </RadioGroup>
                  </Box>
                ))}
              </Stack>
            </CardContent>
          </Card>
        )}

        {countdown && (
          <Card variant="outlined" sx={{ mt: 3, borderRadius: 3, borderColor: "#dadce0" }}>
            <CardContent sx={{ p: { xs: 2, md: 3 } }}>
              <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 1 }}>
                <Typography variant="h6" fontWeight={700}>Day-by-day plan</Typography>
                <Chip
                  label={countdown.daysLeft === null ? "Set interview date" : countdown.daysLeft < 0 ? "Interview passed" : `${countdown.daysLeft} days left`}
                  color="primary"
                  variant="outlined"
                />
              </Stack>
              {countdown.visible.map((day) => (
                <Box key={day.day} sx={{ mb: 2 }}>
                  <Typography variant="subtitle1" fontWeight={700} sx={{ mb: 1 }}>{day.title}</Typography>
                  <Stack spacing={1}>
                    {(day.tasks || []).map((task) => (
                      <Box
                        key={task.id}
                        onClick={() => toggleChecked(task.id)}
                        sx={{
                          display: "flex",
                          gap: 1.5,
                          p: 1.5,
                          borderRadius: 2,
                          border: "1px solid",
                          borderColor: checked.includes(task.id) ? "#1a73e8" : "#e8eaed",
                          bgcolor: checked.includes(task.id) ? "#f6fafe" : "white",
                          cursor: "pointer",
                        }}
                      >
                        <Checkbox size="small" checked={checked.includes(task.id)} tabIndex={-1} disableRipple sx={{ p: 0, mt: 0.25 }} />
                        <Box sx={{ flex: 1 }}>
                          <Typography variant="body2" fontWeight={600} sx={checked.includes(task.id) ? { textDecoration: "line-through", color: "text.secondary" } : {}}>
                            {task.label}
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            {task.duration}{task.duration && task.priority ? " • " : ""}{task.priority} priority
                          </Typography>
                        </Box>
                      </Box>
                    ))}
                  </Stack>
                </Box>
              ))}
            </CardContent>
          </Card>
        )}

        {tool.slug === "job-search-tracker" && (
          <Card variant="outlined" sx={{ mt: 3, borderRadius: 3, borderColor: "#dadce0" }}>
            <CardContent sx={{ p: { xs: 2, md: 3 } }}>
              <Typography variant="h6" fontWeight={700} gutterBottom>
                My applications ({entries.length})
              </Typography>
              <Grid container spacing={1.5} sx={{ mb: 2 }}>
                {(tool.applicationFields || []).map((field) => (
                  <Grid item xs={12} sm={6} md={4} key={field.id}>
                    {field.type === "select" ? (
                      <TextField fullWidth size="small" select label={field.label} value={draft[field.id] ?? ""} onChange={(e) => setDraft((prev) => ({ ...prev, [field.id]: e.target.value }))}>
                        {(field.options || []).map((opt) => (
                          <MenuItem key={opt} value={opt}>{opt}</MenuItem>
                        ))}
                      </TextField>
                    ) : field.type === "date" ? (
                      <TextField fullWidth size="small" type="date" label={field.label} value={draft[field.id] ?? ""} onChange={(e) => setDraft((prev) => ({ ...prev, [field.id]: e.target.value }))} InputLabelProps={{ shrink: true }} />
                    ) : (
                      <TextField fullWidth size="small" label={field.label} value={draft[field.id] ?? ""} onChange={(e) => setDraft((prev) => ({ ...prev, [field.id]: e.target.value }))} />
                    )}
                  </Grid>
                ))}
                <Grid item xs={12}>
                  <Button
                    variant="outlined"
                    startIcon={<AddIcon />}
                    onClick={() => {
                      if (!draft.company && !draft.role) {
                        toastMessages.warn("Enter at least a company or role.");
                        return;
                      }
                      setEntries((prev) => [...prev, { ...draft, id: Date.now() }]);
                      setDraft({});
                    }}
                    sx={{ textTransform: "none", fontWeight: 600, borderRadius: "20px" }}
                  >
                    Add application
                  </Button>
                </Grid>
              </Grid>
              {entries.length === 0 ? (
                <Typography variant="body2" color="text.secondary">
                  No applications tracked yet — add your first one above. Everything is saved in this browser.
                </Typography>
              ) : (
                <TableContainer sx={{ border: "1px solid #e8eaed", borderRadius: 2 }}>
                  <Table size="small">
                    <TableHead>
                      <TableRow sx={{ bgcolor: "#f8f9fa" }}>
                        <TableCell sx={{ fontWeight: 700 }}>Company</TableCell>
                        <TableCell sx={{ fontWeight: 700 }}>Role</TableCell>
                        <TableCell sx={{ fontWeight: 700 }}>Date</TableCell>
                        <TableCell sx={{ fontWeight: 700 }}>Channel</TableCell>
                        <TableCell sx={{ fontWeight: 700 }}>Stage</TableCell>
                        <TableCell sx={{ fontWeight: 700 }}>Next step</TableCell>
                        <TableCell />
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {entries.map((entry) => (
                        <TableRow key={entry.id}>
                          <TableCell>{entry.company || "—"}</TableCell>
                          <TableCell>{entry.role || "—"}</TableCell>
                          <TableCell>{entry["date-applied"] ? dayjs(entry["date-applied"]).format("DD MMM YYYY") : "—"}</TableCell>
                          <TableCell>{entry.channel || "—"}</TableCell>
                          <TableCell>
                            <Chip label={entry.stage || "Applied"} size="small" variant="outlined" />
                          </TableCell>
                          <TableCell>{entry["next-step"] || "—"}</TableCell>
                          <TableCell>
                            <IconButton size="small" color="error" aria-label="Remove application" onClick={() => setEntries((prev) => prev.filter((e) => e.id !== entry.id))}>
                              <DeleteOutlineIcon fontSize="small" />
                            </IconButton>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              )}
              {Array.isArray(tool.weeklyPlan) && (
                <Box sx={{ mt: 3 }}>
                  <Typography variant="subtitle1" fontWeight={700} gutterBottom>
                    Suggested weekly rhythm
                  </Typography>
                  <TableContainer sx={{ border: "1px solid #e8eaed", borderRadius: 2 }}>
                    <Table size="small">
                      <TableHead>
                        <TableRow sx={{ bgcolor: "#f8f9fa" }}>
                          <TableCell sx={{ fontWeight: 700 }}>Day</TableCell>
                          <TableCell sx={{ fontWeight: 700 }}>Activities</TableCell>
                          <TableCell sx={{ fontWeight: 700 }}>Focus</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {tool.weeklyPlan.map((day) => (
                          <TableRow key={day.day}>
                            <TableCell sx={{ fontWeight: 700 }}>{day.day}</TableCell>
                            <TableCell>{(day.activities || []).join(" • ")}</TableCell>
                            <TableCell>{day.focus}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Box>
              )}
            </CardContent>
          </Card>
        )}

        {Array.isArray(tool.tips) && tool.tips.length > 0 && (
          <Card variant="outlined" sx={{ mt: 3, borderRadius: 3, borderColor: "#dadce0", bgcolor: "#f6fafe" }}>
            <CardContent sx={{ p: { xs: 2, md: 3 } }}>
              <Typography variant="h6" fontWeight={700} gutterBottom>
                Tips for Rwanda
              </Typography>
              {tool.tips.map((tip, index) => (
                <Typography key={index} variant="body2" color="text.secondary" sx={{ mb: 0.75 }}>
                  <CheckCircleIcon sx={{ fontSize: 14, color: "#188038", mr: 0.75, verticalAlign: "middle" }} />
                  {tip}
                </Typography>
              ))}
            </CardContent>
          </Card>
        )}

        {related.length > 0 && (
          <Box sx={{ mt: 4 }}>
            <Typography variant="h6" fontWeight={700} gutterBottom>
              Related tools
            </Typography>
            <Grid container spacing={2}>
              {related.map((item) => (
                <Grid item xs={12} sm={4} key={item.slug}>
                  <Card variant="outlined" sx={{ height: "100%", borderRadius: 3, borderColor: "#dadce0" }}>
                    <CardContent>
                      <Typography variant="subtitle1" fontWeight={700}>{item.name}</Typography>
                      <Typography variant="body2" color="text.secondary" sx={{ mb: 1.5 }}>
                        {item.description?.slice(0, 110)}{item.description && item.description.length > 110 ? "…" : ""}
                      </Typography>
                      <Button
                        component={RouterLink}
                        to={`/${ROUTES.JOB_SEEKER.CAREER_TOOLS}/${item.slug}`}
                        size="small"
                        endIcon={<ArrowForwardIcon />}
                        sx={{ textTransform: "none", fontWeight: 700 }}
                      >
                        Open tool
                      </Button>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Box>
        )}
      </Box>
    </Container>
  );
};

export default ToolRunnerPage;
