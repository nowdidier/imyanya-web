import * as React from "react";
import { useLocation, useNavigate } from "react-router-dom";

import Box from "@mui/material/Box";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";

import DashboardIcon from "@mui/icons-material/Dashboard";
import AssignmentIndIcon from "@mui/icons-material/AssignmentInd";
import WorkIcon from "@mui/icons-material/Work";
import ApartmentIcon from "@mui/icons-material/Apartment";
import CircleNotificationsIcon from "@mui/icons-material/CircleNotifications";
import ManageAccountsOutlinedIcon from "@mui/icons-material/ManageAccountsOutlined";

const tabItems = [
  { id: 1, label: "My MyJob", icon: <DashboardIcon />, path: "/job-seeker" },
  {
    id: 2,
    label: "Job Resume",
    icon: <AssignmentIndIcon />,
    path: "/job-seeker/resume",
  },
  {
    id: 3,
    label: "My Jobs",
    icon: <WorkIcon />,
    path: "/job-seeker/my-jobs",
  },
  {
    id: 4,
    label: "My Companies",
    icon: <ApartmentIcon />,
    path: "/job-seeker/my-companies",
  },
  {
    id: 5,
    label: "MyJob Notifications",
    icon: <CircleNotificationsIcon />,
    path: "/job-seeker/notifications",
  },
  {
    id: 6,
    label: "Account & Settings",
    icon: <ManageAccountsOutlinedIcon />,
    path: "/job-seeker/account",
  },
];

const TabBar = () => {
  const location = useLocation();
  const activeTabIndex = tabItems.findLastIndex((tab) =>
    location.pathname.includes(tab.path)
  );
  const nav = useNavigate();
  const [value, setValue] = React.useState(activeTabIndex);

  React.useEffect(() => {
    setValue(activeTabIndex);
  }, [activeTabIndex]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Tabs
        value={value}
        onChange={handleChange}
        variant="scrollable"
        scrollButtons
        allowScrollButtonsMobile
        aria-label="nav tabs job seeker"
      >
        {tabItems.map((tab) => (
          <Tab
            onClick={() => nav(tab.path)}
            classes={{ selected: true }}
            key={tab.id}
            icon={tab.icon}
            iconPosition="start"
            label={tab.label}
          />
        ))}
      </Tabs>
    </Box>
  );
};

export default TabBar;
