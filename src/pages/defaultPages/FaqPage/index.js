import React from "react";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Container,
  Stack,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";

import { TabTitle } from "../../../utils/generalFunction";
import { APP_NAME, HELP_TO_APPLY_CONFIG } from "../../../configs/constants";
import { useHelpToApply } from "../../../components/HelpToApply";

const services = Object.values(HELP_TO_APPLY_CONFIG.SERVICES);

const helpPriceLabel = (value) =>
  `${Number(value || 0).toLocaleString("en-US")} RWF`;

const servicesText = services
  .map((service) => `${service.label} (${helpPriceLabel(service.price)})`)
  .join(", ");

const faqs = [
  {
    question:
      "How do I apply for a job? (Nkeneye ubufasha bwo gusaba — can someone apply for me?)",
    answer: `Yes. Imyanya offers a paid help-to-apply service: ${servicesText}. Send the fee to our MoMo number, then send the payment screenshot on WhatsApp; our team prepares or submits your documents and sends you proof of submission. The fee covers our service only — it is not a guarantee that you will get the job.`,
    helpCta: true,
  },
  {
    question: "What kind of jobs can I find on Imyanya?",
    answer:
      "Imyanya focuses on jobs in Rwanda, including roles in Kigali and other districts. Candidates can search for full-time jobs, internships, part-time roles, remote opportunities, and positions across technology, finance, sales, hospitality, health, education, operations, and NGO work.",
  },
  {
    question: "How should I improve my profile before applying?",
    answer:
      "Use a clear role title, update your phone and email, list recent work or training, and describe achievements instead of only responsibilities. A good profile should help an employer quickly understand what you can do, where you can work, and why your background fits the role.",
  },
  {
    question: "Does Imyanya guarantee that I will get a job?",
    answer:
      "No. Imyanya helps candidates discover opportunities and helps employers manage recruitment, but final hiring decisions are made by employers. Candidates should evaluate each listing carefully and apply only when the role is a real fit.",
  },
  {
    question: "How can employers publish better job posts?",
    answer:
      "A strong job post includes the role title, location, work type, core responsibilities, must-have skills, application deadline, salary guidance when available, and a transparent application process. Clear posts usually attract better candidates and fewer unqualified applications.",
  },
  {
    question: "How do I report suspicious content?",
    answer:
      "Contact us by email with the job title, company name, page link, and a short explanation. Be cautious with any listing that asks applicants to pay money, share sensitive identity documents too early, or move the process to an unclear channel.",
  },
  {
    question: "Why do some pages include job-search references?",
    answer:
      "Some public pages include job-search starting points, category notes, and career guidance for discovery. We add Rwanda-specific context and application advice so visitors can compare opportunities instead of seeing empty directory pages.",
  },
];

const FaqPage = () => {
  TabTitle(`FAQ | ${APP_NAME} Rwanda Jobs Help`);
  const { openHelp } = useHelpToApply();

  const handleOpenHelp = () =>
    openHelp({
      source: "faq",
    });

  return (
    <Container maxWidth="md">
      <Box sx={{ py: { xs: 4, md: 7 } }}>
        <Stack spacing={2} sx={{ mb: 4 }}>
          <Typography variant="h3" component="h1" fontWeight={800}>
            Frequently Asked Questions
          </Typography>
          <Typography variant="h6" color="text.secondary" sx={{ lineHeight: 1.75 }}>
            Answers for job seekers and employers using Imyanya to find,
            compare, post, and manage Rwanda job opportunities.
          </Typography>
        </Stack>

        {faqs.map((item) => (
          <Accordion key={item.question} disableGutters>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography fontWeight={700}>{item.question}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography color="text.secondary" sx={{ lineHeight: 1.75 }}>
                {item.answer}
              </Typography>
              {item.helpCta && (
                <Button
                  variant="contained"
                  size="small"
                  startIcon={<WhatsAppIcon />}
                  onClick={handleOpenHelp}
                  sx={{
                    mt: 1.5,
                    textTransform: "none",
                    fontWeight: 700,
                    color: "#fff",
                    backgroundColor: "#25D366",
                    "&:hover": { backgroundColor: "#1ebe5d" },
                  }}
                >
                  Nkeneye ubufasha bwo gusaba
                </Button>
              )}
            </AccordionDetails>
          </Accordion>
        ))}
      </Box>
    </Container>
  );
};

export default FaqPage;
