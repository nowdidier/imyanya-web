import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Avatar,
  Box,
  Button,
  CircularProgress,
  Stack,
  Typography,
} from "@mui/material";

import statisticService from "../../../../services/statisticService";
import { ROUTES } from "../../../../configs/constants";

const SidebarViewTotal = () => {
  const nav = useNavigate();
  const [isLoading, setIsLoading] = React.useState(true);
  const [data, setData] = React.useState(null);

  React.useEffect(() => {
    const statistics = async () => {
      setIsLoading(true);
      try {
        const resData = await statisticService.jobSeekerTotalView();

        setData(resData.data);
      } catch (error) {
        console.error("Error: ", error);
      } finally {
        setIsLoading(false);
      }
    };

    statistics();
  }, []);

  return (
    <Box>
      <Box>
        <Typography variant="h6" sx={{ mb: 1 }}>
          Is your CV good enough?
        </Typography>
        <Typography variant="caption">
          How many employers are interested in your profile?
        </Typography>
      </Box>
      <Box sx={{ pt: 2 }}>
        <Stack direction="row" spacing={2}>
          <Box
            sx={{
              position: "relative",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Box
              sx={{
                position: "absolute",
                width: 100,
                height: 100,
                borderRadius: "50%",
                background: (theme) => theme.palette.primary.background,
                animation: "pulse 2s infinite",
              }}
            />
            <Avatar
              sx={{
                width: 80,
                height: 80,
                background: (theme) => theme.palette.primary.gradient,
                fontSize: "1.75rem",
                fontWeight: 700,
              }}
            >
              {isLoading ? (
                <CircularProgress color="secondary" />
              ) : data === null ? (
                "---"
              ) : (
                data?.totalView
              )}
            </Avatar>
          </Box>
          <Box>
            <Typography variant="body1">
              Each time an employer views your CV brings you closer to finding your
              ideal job.
            </Typography>
          </Box>
        </Stack>
      </Box>
      <Stack sx={{ pt: 3 }} direction="row" justifyContent="flex-end">
        <Button
          variant="contained"
          size="medium"
          onClick={() => nav(`/${ROUTES.JOB_SEEKER.JOBS}`)}
          sx={{
            background: (theme) => theme.palette.primary.gradient,
            px: 3,
            "&:hover": {
              background: (theme) => theme.palette.primary.gradient,
              opacity: 0.9,
              transform: "translateY(-1px)",
              transition: "all 0.2s",
            },
          }}
        >
          Explore now
        </Button>
      </Stack>
    </Box>
  );
};

export default SidebarViewTotal;
