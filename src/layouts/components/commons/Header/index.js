import * as React from "react";

import {
  Link,
  NavLink,
  useLocation,
  useNavigate,
} from "react-router-dom";

import { useSelector } from "react-redux";

import { useTheme } from "@mui/material/styles";

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
  useMediaQuery,
} from "@mui/material";

import MenuIcon from "@mui/icons-material/Menu";

import {
  HOST_NAME,
  IMAGES,
  ROUTES,
  getCanonicalHostName,
} from "../../../../configs/constants";

import UserMenu from "../UserMenu";
import LeftDrawer from "../LeftDrawer";
import AccountSwitchMenu from "../AccountSwitchMenu";

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
      path: `/${ROUTES.JOB_SEEKER.JOBS}`,
    },
    {
      id: 2,
      label: "Company",
      path: `/${ROUTES.JOB_SEEKER.COMPANY}`,
    },
    {
      id: 3,
      label: "About Us",
      path: `/${ROUTES.JOB_SEEKER.ABOUT_US}`,
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

const Header = (props) => {
  const theme = useTheme();

  const isSmall = useMediaQuery(
    theme.breakpoints.down("md")
  );

  const location = useLocation();

  // Normalize hostname
  const hostName =
    getCanonicalHostName(
      window.location.hostname
    );

  const nav = useNavigate();

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
        sx={{ boxShadow: 0 }}
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
                }}
                variant="square"
                alt="LOGO"
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
                alt="LOGO"
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
                  (page) => (
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
                (page) => (
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
                        color: "white",
                        display: "block",
                        backgroundColor:
                          location?.pathname?.startsWith(
                            page.path
                          )
                            ? "rgba(255, 255, 255, 0.1)"
                            : null,
                      }}
                    >
                      {page.label}
                    </Button>
                  </Link>
                )
              )}
            </Box>

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

            {/* Account Switch */}
            {!isSmall && (
              <>
                <Divider
                  orientation="vertical"
                  flexItem
                  variant="middle"
                  sx={{
                    mx: 2,
                    borderColor:
                      "lightgray",
                  }}
                />

                <AccountSwitchMenu />
              </>
            )}
          </Toolbar>
        </Container>
      </AppBar>

      {/* Mobile Drawer */}
      <Box component="nav">
        <LeftDrawer
          pages={pages[hostName] || []}
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