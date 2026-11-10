import React from "react";
import { Box, Card, Divider, Typography } from "@mui/material";

import { TabTitle } from "../../../utils/generalFunction";
import { EmployerHelpCard } from "../../../components/EmployerHelp";
import ProfileCard from "../../components/employers/ProfileCard";

const ProfilePage = () => {
  TabTitle("Search candidate");

  return (
    <Card sx={{ p: 3, pt: 4 }}>
      <Typography
        variant="h5"
        sx={{
          fontWeight: 600,
          background: "primary.gradient",
          WebkitBackgroundClip: "text",
          fontSize: { xs: "1.25rem", sm: "1.5rem" },
        }}
      >
        Search candidate
      </Typography>

      <Divider sx={{ mt: 2, mb: 3 }} />
      <EmployerHelpCard
        source="candidate-search"
        title="Dushakire abakandida."
        description="We search the Imyanya candidate pool, screen the CVs and send you up to 5 shortlisted profiles for 25,000 RWF."
        sx={{ mb: 3 }}
      />
      <Box>
        {/* Start: Profile card */}
        <ProfileCard />
        {/* End: Profile card */}
      </Box>
    </Card>
  );
};

export default ProfilePage;
