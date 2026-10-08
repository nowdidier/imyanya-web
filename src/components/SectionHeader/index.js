import * as React from "react";
import { Box, Chip, Stack, Typography } from "@mui/material";

// Shared modern-gradient section header: small glow eyebrow chip +
// gradient-ink title + subtitle. Keeps every page on the same look.
const SectionHeader = ({
  eyebrow,
  title,
  subtitle,
  action,
  align = "left",
  sx = {},
}) => (
  <Box sx={{ mb: 3, ...sx }}>
    <Stack
      direction={{ xs: "column", sm: "row" }}
      spacing={1.5}
      alignItems={{ xs: align === "center" ? "center" : "flex-start", sm: "flex-end" }}
      justifyContent="space-between"
    >
      <Box sx={{ textAlign: align, maxWidth: 760 }}>
        {eyebrow && (
          <Chip
            label={eyebrow}
            size="small"
            sx={{
              mb: 1,
              fontWeight: 800,
              fontSize: 11,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              color: "#fff",
              border: "none",
              backgroundImage:
                "linear-gradient(135deg, #441da0 0%, #6d28d9 60%, #8b5cf6 100%)",
              boxShadow: "0 4px 12px -4px rgba(109, 40, 217, 0.5)",
            }}
          />
        )}
        <Typography
          variant="h4"
          component="h2"
          fontWeight={800}
          gutterBottom
          sx={{
            background: "linear-gradient(120deg, #2f1578 20%, #6d28d9 60%, #b45309 110%)",
            backgroundClip: "text",
            WebkitBackgroundClip: "text",
            color: "transparent",
            letterSpacing: "-0.01em",
          }}
        >
          {title}
        </Typography>
        {subtitle && (
          <Typography color="text.secondary" sx={{ lineHeight: 1.7 }}>
            {subtitle}
          </Typography>
        )}
      </Box>
      {action && <Box sx={{ flexShrink: 0 }}>{action}</Box>}
    </Stack>
  </Box>
);

export default SectionHeader;
