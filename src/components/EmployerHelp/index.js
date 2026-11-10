import React from "react";
import { Box, Button, Card, Stack, Typography } from "@mui/material";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import SupportAgentOutlinedIcon from "@mui/icons-material/SupportAgentOutlined";

import { useEmployerHelp } from "../HelpToApply";

export const EMPLOYER_HELP_DEFAULT_LABEL =
  "Dukeneye gufashwa gushaka umukozi";

export const EmployerHelpButton = ({
  source = "employer-page",
  label = EMPLOYER_HELP_DEFAULT_LABEL,
  company = "",
  jobTitle = "",
  jobUrl = "",
  preselectService = "",
  startIcon,
  variant = "contained",
  color = "secondary",
  size = "medium",
  fullWidth = false,
  sx,
  ...rest
}) => {
  const { openEmployerHelp } = useEmployerHelp();

  const handleClick = () => {
    openEmployerHelp({
      source,
      company,
      jobTitle,
      jobUrl,
      preselectService,
    });
  };

  const icon = startIcon === undefined ? <WhatsAppIcon /> : startIcon;

  return (
    <Button
      variant={variant}
      color={color}
      size={size}
      fullWidth={fullWidth}
      startIcon={icon}
      onClick={handleClick}
      sx={{ textTransform: "none", fontWeight: 700, ...sx }}
      {...rest}
    >
      {label}
    </Button>
  );
};

export const EmployerHelpCard = ({
  source = "employer-page",
  title = "Ntushobora kuyuzuza? Tuyigufashemo.",
  description = "Send us the details and we post the job for you, write the description, or send you a shortlist. Fixed prices start at 5,000 RWF.",
  buttonLabel = EMPLOYER_HELP_DEFAULT_LABEL,
  company = "",
  jobTitle = "",
  jobUrl = "",
  preselectService = "",
  sx,
}) => {
  return (
    <Card
      variant="outlined"
      sx={{
        borderRadius: 3,
        borderColor: "#d9cff2",
        bgcolor: "#f8f5fe",
        p: { xs: 2, sm: 3 },
        ...sx,
      }}
    >
      <Stack
        direction={{ xs: "column", sm: "row" }}
        spacing={2}
        alignItems={{ xs: "flex-start", sm: "center" }}
        justifyContent="space-between"
      >
        <Stack direction="row" spacing={1.5} alignItems="flex-start">
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: 40,
              height: 40,
              flexShrink: 0,
              borderRadius: "50%",
              bgcolor: "#441da0",
              color: "#fff",
            }}
          >
            <SupportAgentOutlinedIcon fontSize="small" />
          </Box>
          <Box>
            <Typography variant="subtitle1" fontWeight={800}>
              {title}
            </Typography>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ lineHeight: 1.6 }}
            >
              {description}
            </Typography>
          </Box>
        </Stack>

        <EmployerHelpButton
          source={source}
          label={buttonLabel}
          company={company}
          jobTitle={jobTitle}
          jobUrl={jobUrl}
          preselectService={preselectService}
          sx={{ flexShrink: 0, width: { xs: "100%", sm: "auto" } }}
        />
      </Stack>
    </Card>
  );
};

export default EmployerHelpButton;
