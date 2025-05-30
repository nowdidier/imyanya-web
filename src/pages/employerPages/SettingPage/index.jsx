import React from "react";
import { Card, Grid, Stack, Typography } from "@mui/material";
import SettingCard from "../../components/settings/SettingCard";

const SettingPage = () => {
  return (
    <Stack spacing={3}>
      <Card>
        <Grid container>
          <Grid item xs={12} sm={12} md={6} lg={5} xl={5}>
            {/* Start: Setting card */}
            <SettingCard
              title={
                <Typography
                  variant="h5"
                  sx={{
                    fontWeight: 600,
                    background: "primary.gradient",
                    WebkitBackgroundClip: "text",
                    fontSize: { xs: "1.25rem", sm: "1.5rem" },
                  }}
                >
                  Settings
                </Typography>
              }
              sx={{ boxShadow: 0 }}
            />
            {/* End: Setting card */}
          </Grid>
        </Grid>
      </Card>
    </Stack>
  );
};

export default SettingPage;
