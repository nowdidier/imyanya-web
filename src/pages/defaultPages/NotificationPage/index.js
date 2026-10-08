import React from "react";
import { Card, Typography } from "@mui/material";

import { TabTitle } from "../../../utils/generalFunction";
import NotificationCard from "../../components/defaults/NotificationCard";
import { APP_NAME } from "../../../configs/constants";

const NotificationPage = () => {
  TabTitle(`Notifications | ${APP_NAME}`);

  return (
    <Card sx={{ p: { xs: 2, sm: 2, md: 2, lg: 3, xl: 3 } }}>
      {/* Start: NotificationCard */}
      <NotificationCard
        title={
          <Typography
            variant="h5"
            sx={{
              fontWeight: 800,
              background:
                "linear-gradient(120deg, #2f1578 20%, #6d28d9 60%, #b45309 110%)",
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
              color: "transparent",
              fontSize: { xs: "1.25rem", sm: "1.5rem" },
            }}
          >
            {`${APP_NAME} notifications`}
          </Typography>
        }
      />

      {/* End: NotificationCard  */}
    </Card>
  );
};

export default NotificationPage;
