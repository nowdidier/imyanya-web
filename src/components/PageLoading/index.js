import React from "react";
import { Stack, CircularProgress, Typography } from "@mui/material";

const PageLoading = () => {
  return (
    <Stack
      alignItems="center"
      justifyContent="center"
      spacing={2}
      sx={{ minHeight: "50vh", width: "100%", py: 6 }}
    >
      <CircularProgress color="secondary" size={36} />
      <Typography variant="caption" color="text.secondary">
        Loading...
      </Typography>
    </Stack>
  );
};

export default PageLoading;
