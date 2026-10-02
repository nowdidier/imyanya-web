import React, { useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import {
  Avatar,
  Box,
  Divider,
  Drawer,
  useTheme,
  Toolbar,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemButton,
  Collapse,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import GridViewIcon from '@mui/icons-material/GridView';
import ListAltOutlinedIcon from '@mui/icons-material/ListAltOutlined';
import FactCheckOutlinedIcon from '@mui/icons-material/FactCheckOutlined';
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';
import BusinessOutlinedIcon from '@mui/icons-material/BusinessOutlined';

import { IMAGES, ROUTES, APP_NAME } from '../../../../configs/constants';

const StyledListItemButton = styled(ListItemButton)(({ theme }) => ({
  borderRadius: '8px',
  marginBottom: '2px',
  color: theme.palette.text.secondary,
  textDecoration: 'none',
  position: 'relative',
  '&:hover': {
    backgroundColor: theme.palette.primary.background,
    color: theme.palette.text.secondary,
    textDecoration: 'none',
  },
  '&.Mui-selected': {
    backgroundColor: theme.palette.primary.background,
    color: theme.palette.primary.main,
    fontWeight: 600,
    '&:hover': {
      backgroundColor: theme.palette.primary.background,
      color: theme.palette.primary.main,
    },
  },
  '& .MuiTypography-root': {
    color: 'inherit',
  },
  '& .MuiListItemIcon-root': {
    color: 'inherit',
  },
  '&.active': {
    backgroundColor: theme.palette.primary.background,
    color: theme.palette.primary.main,
    fontWeight: 600,
    '&:hover': {
      backgroundColor: theme.palette.primary.background,
      color: theme.palette.primary.main,
    },
  },
}));

const normalizePath = (pathname = '') => {
  if (!pathname || pathname === '/') {
    return '/';
  }

  const normalizedPath = pathname.replace(/\/+$/, '');
  return normalizedPath === '' ? '/' : normalizedPath;
};

const MenuItem = ({ icon: Icon, text, to, onClick, isSelected, isExpanded, hasChildren, isChild }) => {
  const linkProps = to
    ? {
        component: NavLink,
        end: true,
        to,
      }
    : {
        component: 'div',
      };

  return (
    <StyledListItemButton
      {...linkProps}
      onClick={onClick}
      selected={isSelected}
      sx={{ 
        pl: isChild ? 3 : 2,
        ...(hasChildren ? {} : { '& .MuiListItemIcon-root': { ml: 0 } })
      }}
    >
      {!isChild && Icon && (
        <ListItemIcon sx={{ minWidth: 35 }}>
          <Icon fontSize="small" />
        </ListItemIcon>
      )}
      {isChild && (
        <Box
          sx={{
            width: 4,
            height: 4,
            borderRadius: '50%',
            backgroundColor: 'text.secondary',
            mr: 1.5,
            ml: 1,
          }}
        />
      )}
      <ListItemText 
        primary={text} 
        primaryTypographyProps={{ 
          variant: 'body2',
          fontSize: '0.9rem',
        }}
      />
      {hasChildren && (
        <Box component="span" sx={{ ml: 'auto' }}>
          {isExpanded ? (
            <ArrowDropDownIcon fontSize="small" />
          ) : (
            <ArrowRightIcon fontSize="small" />
          )}
        </Box>
      )}
    </StyledListItemButton>
  );
};

const DrawerContent = () => {
  const location = useLocation();
  const theme = useTheme();
  const [expandedItems, setExpandedItems] = useState({
    candidates:true,
    account:true,
  });

  const handleExpand = (section) => {
    setExpandedItems(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const isSelectedPath = (path) =>
    normalizePath(location.pathname) === normalizePath(path);

  return (
    <div>
      <Toolbar sx={{ px: 2, py: 1.5 }}>
        <Box 
          component={Link} 
          to={`/${ROUTES.EMPLOYER.DASHBOARD}`}
          sx={{
            width: '100%',
            display: 'flex',
            justifyContent: 'center'
          }}
        >
          <Avatar
            src={IMAGES.getTextLogo(
              theme.palette.mode === 'light' ? 'dark' : 'light'
            )}
            sx={{
              height: 48,
              width: 'auto',
            }}
            variant="rounded"
            alt="LOGO"
          />
        </Box>
      </Toolbar>
      <Divider sx={{ borderColor: 'grey.500' }} />
      <Box sx={{ px: 1.5, py: 1.5 }}>
        <List component="nav" disablePadding>
          {/* Overview */}
          <ListItem disablePadding>
            <MenuItem
              icon={GridViewIcon}
              text="Dashboard"
              to={`/${ROUTES.EMPLOYER.DASHBOARD}`}
              isSelected={isSelectedPath(`/${ROUTES.EMPLOYER.DASHBOARD}`)}
            />
          </ListItem>

          {/* Job Posting Management */}
          <ListItem disablePadding>
            <MenuItem
              icon={ListAltOutlinedIcon}
              text="Job Postings"
              to={`/${ROUTES.EMPLOYER.JOB_POST}`}
              isSelected={isSelectedPath(`/${ROUTES.EMPLOYER.JOB_POST}`)}
            />
          </ListItem>

          {/* Candidate Management */}
          <ListItem disablePadding>
            <MenuItem
              icon={FactCheckOutlinedIcon}
              text="Candidate Management"
              hasChildren
              isExpanded={expandedItems.candidates}
              onClick={() => handleExpand('candidates')}
            />
          </ListItem>
          <Collapse in={expandedItems.candidates} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <MenuItem
                text="Applied Profiles"
                to={`/${ROUTES.EMPLOYER.APPLIED_PROFILE}`}
                isSelected={isSelectedPath(`/${ROUTES.EMPLOYER.APPLIED_PROFILE}`)}
                isChild
              />
              <MenuItem
                text="Saved Profiles"
                to={`/${ROUTES.EMPLOYER.SAVED_PROFILE}`}
                isSelected={isSelectedPath(`/${ROUTES.EMPLOYER.SAVED_PROFILE}`)}
                isChild
              />
              <MenuItem
                text="Find Candidates"
                to={`/${ROUTES.EMPLOYER.PROFILE}`}
                isSelected={isSelectedPath(`/${ROUTES.EMPLOYER.PROFILE}`)}
                isChild
              />
            </List>
          </Collapse>

          {/* Notification Management */}
          <ListItem disablePadding>
            <MenuItem
              icon={NotificationsNoneOutlinedIcon}
              text={`${APP_NAME} Notifications`}
              to={`/${ROUTES.EMPLOYER.NOTIFICATION}`}
              isSelected={isSelectedPath(`/${ROUTES.EMPLOYER.NOTIFICATION}`)}
            />
          </ListItem>

          {/* Account Management */}
          <ListItem disablePadding>
            <MenuItem
              icon={BusinessOutlinedIcon}
              text="Account Management"
              hasChildren
              isExpanded={expandedItems.account}
              onClick={() => handleExpand('account')}
            />
          </ListItem>
          <Collapse in={expandedItems.account} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <MenuItem
                text="Company Information"
                to={`/${ROUTES.EMPLOYER.COMPANY}`}
                isSelected={isSelectedPath(`/${ROUTES.EMPLOYER.COMPANY}`)}
                isChild
              />
              <MenuItem
                text="Account"
                to={`/${ROUTES.EMPLOYER.ACCOUNT}`}
                isSelected={isSelectedPath(`/${ROUTES.EMPLOYER.ACCOUNT}`)}
                isChild
              />
              <MenuItem
                text="Settings"
                to={`/${ROUTES.EMPLOYER.SETTING}`}
                isSelected={isSelectedPath(`/${ROUTES.EMPLOYER.SETTING}`)}
                isChild
              />
            </List>
          </Collapse>
        </List>
      </Box>
    </div>
  );
};

const Sidebar = ({ drawerWidth }) => {
  const theme = useTheme();

  return (
    <Drawer
      variant="permanent"
      sx={{
        display: {
          xs: 'none',
          sm: 'none',
          md: 'none',
          lg: 'none',
          xl: 'block',
        },
        '& .MuiDrawer-paper': {
          boxSizing: 'border-box',
          width: drawerWidth,
          borderRight: '0px',
          backgroundColor: theme.palette.background.paper,
          boxShadow: theme.customShadows.sidebar,
          borderRadius: '0px 10px 10px 0px',
        },
      }}
      open
    >
      <DrawerContent />
    </Drawer>
  );
};

const MobileSidebar = ({
  drawerWidth,
  container,
  mobileOpen,
  handleDrawerToggle,
}) => {
  const theme = useTheme();

  return (
    <Drawer
      container={container}
      variant="temporary"
      open={mobileOpen}
      onClose={handleDrawerToggle}
      ModalProps={{
        keepMounted:true,
      }}
      sx={{
        display: {
          xs: 'block',
          sm: 'block',
          md: 'block',
          lg: 'block',
          xl: 'none',
        },
        '& .MuiDrawer-paper': {
          boxSizing: 'border-box',
          width: drawerWidth,
          borderRight: '0px',
          backgroundColor: theme.palette.background.paper,
          boxShadow: theme.customShadows.sidebar,
          borderRadius: '0px 10px 10px 0px',
        },
      }}
    >
      <DrawerContent />
    </Drawer>
  );
};

Sidebar.MobileSidebar = MobileSidebar;

export default Sidebar;
