import * as React from "react";

import {
  Link,
  NavLink,
  useLocation,
  useNavigate,
} from "react-router-dom";

import { useSelector } from "react-redux";

import {
  AppBar,
  Avatar,
  Box,
  Button,
  Card,
  Container,
  Divider,
  IconButton,
  Menu,
  MenuItem,
  Stack,
  Toolbar,
  Typography,
} from "@mui/material";

import MenuIcon from "@mui/icons-material/Menu";
import PostAddIcon from "@mui/icons-material/PostAdd";

import {
  HOST_NAME,
  IMAGES,
  ROUTES,
  getCanonicalHostName,
} from "../../../../configs/constants";

import UserMenu from "../UserMenu";
import LeftDrawer from "../LeftDrawer";

import NotificationCard from "../../../../components/NotificationCard";
import ChatCard from "../../../../components/ChatCard";

// ==============================
// NAVIGATION PAGES
// ==============================

const pages = {
  [HOST_NAME.MYJOB]: [
    {
      id: 1,
      label: "Jobs",
      path: `/${ROUTES.JOB_SEEKER.JOBS_EN}`,
    },
    {
      id: 2,
      label: "Company",
      path: `/${ROUTES.JOB_SEEKER.COMPANY_EN}`,
    },
    {
      id: 3,
      label: "Career Guide",
      path: `/${ROUTES.JOB_SEEKER.CAREER_GUIDE}`,
    },
    {
      id: 4,
      label: "Make CV & CL",
      path: `/${ROUTES.JOB_SEEKER.CAREER_TOOLS}`,
    },
    {
      id: 5,
      label: "About Us",
      path: `/${ROUTES.JOB_SEEKER.ABOUT_US_EN}`,
    },
    {
      id: 6,
      label: "Book Events",
      href: "https://tickets.imyanya.rw/",
    },
  ],

  [HOST_NAME.EMPLOYER_MYJOB]: [
    {
      id: 1,
      label: "About",
      path: `/${ROUTES.EMPLOYER.INTRODUCE}`,
    },
    {
      id: 2,
      label: "Services",
      path: `/${ROUTES.EMPLOYER.SERVICE}`,
    },
    {
      id: 3,
      label: "Pricing",
      path: `/${ROUTES.EMPLOYER.PRICING}`,
    },
    {
      id: 4,
      label: "Support",
      path: `/${ROUTES.EMPLOYER.SUPPORT}`,
    },
    {
      id: 5,
      label: "Recruitment Blog",
      path: `/${ROUTES.EMPLOYER.BLOG}`,
    },
  ],
};

const Header = () => {
  const location = useLocation();

  // Normalize hostname
  const hostName =
    getCanonicalHostName(
      window.location.hostname
    );

  const nav = useNavigate();

  const employerJobPostUrl =
    hostName === HOST_NAME.EMPLOYER_MYJOB
      ? `/${ROUTES.EMPLOYER.JOB_POST}`
      : `https://${HOST_NAME.EMPLOYER_MYJOB}/${ROUTES.EMPLOYER.JOB_POST}`;

  const {
    currentUser,
    isAuthenticated,
  } = useSelector((state) => state.user);

  const [anchorElNav, setAnchorElNav] =
    React.useState(null);

  const [anchorElUser, setAnchorElUser] =
    React.useState(null);

  const [mobileOpen, setMobileOpen] =
    React.useState(false);

  // ==============================
  // HANDLERS
  // ==============================

  const handleDrawerToggle = () => {
    setMobileOpen(
      (prevState) => !prevState
    );
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleOpenUserMenu = (
    event
  ) => {
    setAnchorElUser(
      event.currentTarget
    );
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleLogin = () => {
    nav(`/${ROUTES.AUTH.LOGIN}`);
  };

  const handleSignUp = () => {
    nav(`/${ROUTES.AUTH.REGISTER}`);
  };

  // ==============================
  // AUTH AREA
  // ==============================

  const authArea = isAuthenticated ? (
    <Box sx={{ flexGrow: 0, ml: 1 }}>
      <Card
        variant="outlined"
        onClick={handleOpenUserMenu}
        sx={{
          p: 0.5,
          borderRadius: 50,
          backgroundColor: "transparent",
          borderColor: "#7e57c2",
          cursor: "pointer",
        }}
      >
        <Stack
          direction="row"
          justifyContent="center"
          alignItems="center"
        >
          <Avatar
            alt="User Avatar"
            src={currentUser?.avatarUrl}
          />

          <Typography
            variant="subtitle1"
            sx={{
              px: 1,
              color: "white",
              display: {
                xs: "none",
                sm: "block",
              },
            }}
          >
            {currentUser?.fullName}
          </Typography>
        </Stack>
      </Card>

      {/* User Menu */}
      <UserMenu
        anchorElUser={anchorElUser}
        open={Boolean(anchorElUser)}
        handleCloseUserMenu={
          handleCloseUserMenu
        }
      />
    </Box>
  ) : (
    <Box
      sx={{
        ml: 3,
        display: "block",
      }}
    >
      <Stack
        direction="row"
        spacing={1}
      >
        <Button
          variant="outlined"
          color="inherit"
          sx={{ color: "white" }}
          onClick={handleLogin}
        >
          Login
        </Button>

        <Button
          variant="outlined"
          color="inherit"
          sx={{
            color: "white",
            display: {
              xs: "none",
              sm: "block",
            },
          }}
          onClick={handleSignUp}
        >
          Register
        </Button>
      </Stack>
    </Box>
  );

  return (
    <>
      <AppBar
        position="sticky"
        sx={{
          boxShadow: "0 4px 24px -8px rgba(68, 29, 160, 0.35)",
          backgroundColor: "rgba(68, 29, 160, 0.85)",
          backgroundImage:
            "linear-gradient(120deg, rgba(47,21,120,0.9) 0%, rgba(68,29,160,0.85) 50%, rgba(109,40,217,0.85) 100%)",
          backdropFilter: "blur(14px) saturate(160%)",
          WebkitBackdropFilter: "blur(14px) saturate(160%)",
          borderBottom: "1px solid rgba(255, 255, 255, 0.12)",
          "&:before": {
            content: '""',
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: 3,
            background:
              "linear-gradient(90deg, #ff9800 0%, #6d28d9 50%, #8b5cf6 100%)",
            zIndex: 1301,
          },
        }}
        id="common-header"
      >
        <Container maxWidth="lg">
          <Toolbar disableGutters>
            {/* Logo */}
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="space-between"
              component={Link}
              to="/"
            >
              <Avatar
                src={IMAGES.getTextLogo(
                  "light"
                )}
                sx={{
                  display: {
                    xs: "none",
                    md: "flex",
                  },
                  mr: 1,
                  width: "100%",
                  height: 42,
                  pb: 0.5,
                  filter:
                    "drop-shadow(0 2px 10px rgba(255, 255, 255, 0.35))",
                  transition: "filter 0.2s ease",
                  "&:hover": {
                    filter:
                      "drop-shadow(0 2px 16px rgba(255, 213, 79, 0.55))",
                  },
                }}
                variant="square"
                alt="Imyanya logo"
              />
            </Stack>

            <Divider
              orientation="vertical"
              flexItem
              variant="middle"
              sx={{
                mx: 2,
                borderColor: "lightgray",
                display: {
                  xs: "none",
                  md: "flex",
                },
              }}
            />

            {/* Mobile Menu Button */}
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{
                mr: 2,
                display: {
                  md: "none",
                },
              }}
            >
              <MenuIcon />
            </IconButton>

            {/* Mobile Logo */}
            <Box
              sx={{
                flexGrow: 1,
                display: {
                  xs: "flex",
                  md: "none",
                },
              }}
            >
              <Avatar
                src={IMAGES.getLogo(
                  "medium",
                  "light"
                )}
                sx={{
                  mr: 1,
                  width: 40,
                  height: 40,
                }}
                variant="square"
                alt="Imyanya logo"
              />

              {/* Mobile Navigation */}
              <Menu
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
                transformOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
                keepMounted
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: {
                    xs: "block",
                    md: "none",
                  },
                }}
              >
                {pages[hostName]?.map(
                  (page) =>
                    page.href ? (
                      <MenuItem
                        key={page.id}
                        onClick={handleCloseNavMenu}
                        component="a"
                        href={page.href}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Typography textAlign="center">
                          {page.label}
                        </Typography>
                      </MenuItem>
                    ) : (
                      <MenuItem
                        key={page.id}
                        onClick={
                          handleCloseNavMenu
                        }
                        component={NavLink}
                        to={page.path}
                      >
                        <Typography textAlign="center">
                          {page.label}
                        </Typography>
                      </MenuItem>
                    )
                )}
              </Menu>
            </Box>

            {/* Desktop Navigation */}
            <Box
              sx={{
                flexGrow: 1,
                display: {
                  xs: "none",
                  md: "flex",
                },
              }}
            >
              {pages[hostName]?.map(
                (page) =>
                  page.href ? (
                    <a
                      href={page.href}
                      key={page.id}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={handleCloseNavMenu}
                    >
                      <Button
                        color="primary"
                        sx={{
                          my: 2,
                          mr: 1,
                          color: "white",
                          display: "block",
                          borderRadius: "999px",
                          px: 2,
                          transition: "all 0.2s ease",
                          "&:hover": {
                            backgroundColor: "rgba(255, 255, 255, 0.16)",
                            boxShadow: "0 4px 14px -4px rgba(0, 0, 0, 0.4)",
                          },
                        }}
                      >
                        {page.label}
                      </Button>
                    </a>
                  ) : (
                    <Link
                      to={page.path}
                      key={page.id}
                      onClick={
                        handleCloseNavMenu
                      }
                    >
                      <Button
                        color="primary"
                        sx={{
                          my: 2,
                          mr: 1,
                          display: "block",
                          borderRadius: "999px",
                          px: 2,
                          fontWeight: location?.pathname?.startsWith(page.path)
                            ? 800
                            : 600,
                          color: location?.pathname?.startsWith(page.path)
                            ? "#441da0"
                            : "white",
                          backgroundColor: "transparent",
                          backgroundImage: location?.pathname?.startsWith(
                            page.path
                          )
                            ? "linear-gradient(135deg, #ffffff 0%, #ede9fe 100%)"
                            : "none",
                          boxShadow: location?.pathname?.startsWith(page.path)
                            ? "0 4px 14px -4px rgba(0, 0, 0, 0.45)"
                            : "none",
                          transition: "all 0.2s ease",
                          "&:hover": {
                            backgroundColor: "rgba(255, 255, 255, 0.16)",
                          },
                        }}
                      >
                        {page.label}
                      </Button>
                    </Link>
                  )
              )}
            </Box>

            {/* Notification */}
            <Button
              component="a"
              href={employerJobPostUrl}
              variant="contained"
              color="warning"
              aria-label="Post a job and reach qualified candidates"
              title="Post a job and reach qualified candidates"
              sx={{
                mr: { md: 0.5, lg: 1 },
                minWidth: { md: 44, lg: "auto" },
                px: { md: 1.1, lg: 2 },
                py: 1,
                borderRadius: "999px",
                color: "#2f1578",
                fontWeight: 800,
                whiteSpace: "nowrap",
                boxShadow: "0 5px 14px -5px rgba(0, 0, 0, 0.55)",
                display: { xs: "none", md: "inline-flex" },
                "&:hover": {
                  backgroundColor: "#ffb300",
                  transform: "translateY(-1px)",
                  boxShadow: "0 8px 18px -6px rgba(0, 0, 0, 0.6)",
                },
              }}
            >
              <PostAddIcon fontSize="small" />
              <Box component="span" sx={{ display: { md: "none", lg: "inline" }, ml: 0.75 }}>
                Post a Job
              </Box>
            </Button>

            {/* Notification */}
            {isAuthenticated && (
              <NotificationCard />
            )}

            {/* Chat */}
            {isAuthenticated && (
              <ChatCard />
            )}

            {/* Auth Area */}
            {authArea}
          </Toolbar>
        </Container>
      </AppBar>

      {/* Mobile Drawer */}
      <Box component="nav">
        <LeftDrawer
          pages={pages[hostName] || []}
          postJobUrl={employerJobPostUrl}
          mobileOpen={mobileOpen}
          handleDrawerToggle={
            handleDrawerToggle
          }
        />
      </Box>
    </>
  );
};

export default Header;
