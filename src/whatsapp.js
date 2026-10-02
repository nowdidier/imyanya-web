import React from "react";
import { Fab, Tooltip } from "@mui/material";
import { FaWhatsapp } from "react-icons/fa";

import { getWhatsAppContactUrl } from "./configs/constants";

export const WhatsAppContactButton = () => {
  const href = getWhatsAppContactUrl();

  if (!href) {
    return null;
  }

  return (
    <Tooltip title="Join our WhatsApp group" placement="left" arrow>
      <Fab
        component="a"
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Join our WhatsApp group"
        sx={{
          position: "fixed",
          right: { xs: 16, md: 24 },
          bottom: { xs: 16, md: 24 },
          zIndex: 2000,
          color: "common.white",
          backgroundColor: "#25D366",
          boxShadow: "0 10px 24px rgba(37, 211, 102, 0.35)",
          "&:hover": {
            backgroundColor: "#1ebe5d",
            transform: "translateY(-2px)",
            boxShadow: "0 14px 28px rgba(37, 211, 102, 0.42)",
          },
          transition: "all 0.2s ease-in-out",
        }}
      >
        <FaWhatsapp size={30} />
      </Fab>
    </Tooltip>
  );
};
