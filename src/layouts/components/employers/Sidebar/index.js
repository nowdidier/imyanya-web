import React from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import {
  Avatar,
  Box,
  Divider,
  Drawer,
  useTheme,
  Toolbar,
  Typography,
} from '@mui/material';
import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import TreeView from '@mui/lab/TreeView';
import TreeItem from '@mui/lab/TreeItem';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import GridViewIcon from '@mui/icons-material/GridView';
import ListAltOutlinedIcon from '@mui/icons-material/ListAltOutlined';
import FactCheckOutlinedIcon from '@mui/icons-material/FactCheckOutlined';
import BookmarkAddedOutlinedIcon from '@mui/icons-material/BookmarkAddedOutlined';
import ContentPasteSearchOutlinedIcon from '@mui/icons-material/ContentPasteSearchOutlined';
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';
import BusinessOutlinedIcon from '@mui/icons-material/BusinessOutlined';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';

import { IMAGES } from '../../../../configs/constants';

const StyledTreeItemRoot = styled(TreeItem)(({ theme }) => ({
  color: theme.palette.text.secondary,
  '& .css-6ubf1z-MuiTreeItem-content.Mui-selected': {
    backgroundColor: 'rgba(0,0,0,0)',
  },
  '& .MuiTreeItem-content': {
    color: theme.palette.text.secondary,
    borderTopRightRadius: theme.spacing(0.5),
    borderBottomRightRadius: theme.spacing(0.5),
    paddingRight: theme.spacing(1),
    fontWeight: theme.typography.fontWeightMedium,
    '&.Mui-expanded': {
      fontWeight: theme.typography.fontWeightRegular,
    },
    '&:hover': {
      backgroundColor: theme.palette.action.hover,
    },
    '& .MuiTreeItem-label': {
      fontWeight: 'inherit',
      color: 'inherit',
    },
  },
  '& .MuiTreeItem-group': {
    marginLeft: 0,
    '& .MuiTreeItem-content': {
      paddingLeft: theme.spacing(2),
    },
  },
}));

function StyledTreeItem(props) {
  const { labelIcon: LabelIcon, labelText, ...other } = props;

  return (
    <StyledTreeItemRoot
      label={
        <Box sx={{ display: 'flex', alignItems: 'center', py: 1, pr: 0 }}>
          <Box component={LabelIcon} color="inherit" sx={{ mr: 1 }} />
          <Typography
            variant="body2"
            sx={{ fontWeight: 'inherit', flexGrow: 1 }}
          >
            {labelText}
          </Typography>
        </Box>
      }
      {...other}
    />
  );
}

StyledTreeItem.propTypes = {
  bgColor: PropTypes.string,
  color: PropTypes.string,
  labelIcon: PropTypes.elementType.isRequired,
  labelInfo: PropTypes.string,
  labelText: PropTypes.string.isRequired,
};

const drawer = (location, theme) => (
  <div>
    <Toolbar>
      <Box component={Link} to="/nha-tuyen-dung">
        <Avatar
          src={IMAGES.getTextLogo(
            theme.palette.mode === 'light' ? 'dark' : 'light'
          )}
          sx={{
            height: 44,
            width: '100%',
            margin: '0 auto',
          }}
          variant="square"
          alt="LOGO"
        />
      </Box>
    </Toolbar>
    <Divider />
    <Box>
      <TreeView
        defaultExpanded={['1', '2', '3', '4', '5']}
        defaultCollapseIcon={<ArrowDropDownIcon />}
        defaultExpandIcon={<ArrowRightIcon />}
        defaultEndIcon={<div style={{ width: 24 }} />}
        sx={{ flexGrow: 1, maxWidth: 400, overflowY: 'auto' }}
      >
        <StyledTreeItem nodeId="1" labelText="Overview">
          <NavLink
            to="/employer"
            style={{
              textDecoration: 'none',
              display: 'block',
              backgroundColor:
                location.pathname === '/employer'
                  ? 'rgba(68, 29, 160, 0.08)'
                  : 'inherit',
            }}
          >
            <StyledTreeItem
              nodeId="6"
              labelText="Dashboard"
              labelIcon={GridViewIcon}
            />
          </NavLink>
        </StyledTreeItem>
        <StyledTreeItem nodeId="2" labelText="Job Posting Management">
          <NavLink
            to="/employer/job-posts"
            style={{
              textDecoration: 'none',
              display: 'block',
              backgroundColor:
                location.pathname === '/employer/job-posts'
                  ? 'rgba(68, 29, 160, 0.08)'
                  : 'inherit',
            }}
          >
            <StyledTreeItem
              nodeId="7"
              labelText="Job Posts List"
              labelIcon={ListAltOutlinedIcon}
            />
          </NavLink>
        </StyledTreeItem>
        <StyledTreeItem nodeId="3" labelText="Candidate Management">
          <NavLink
            to="/employer/applications"
            style={{
              textDecoration: 'none',
              display: 'block',
              backgroundColor:
                location.pathname === '/employer/applications'
                  ? 'rgba(68, 29, 160, 0.08)'
                  : 'inherit',
            }}
          >
            <StyledTreeItem
              nodeId="8"
              labelText="Job Applications"
              labelIcon={FactCheckOutlinedIcon}
            />
          </NavLink>
          <NavLink
            to="/employer/saved-resumes"
            style={{
              textDecoration: 'none',
              display: 'block',
              backgroundColor:
                location.pathname === '/employer/saved-resumes'
                  ? 'rgba(68, 29, 160, 0.08)'
                  : 'inherit',
            }}
          >
            <StyledTreeItem
              nodeId="9"
              labelText="Saved Resumes"
              labelIcon={BookmarkAddedOutlinedIcon}
            />
          </NavLink>
          <NavLink
            to="/employer/candidates"
            style={{
              textDecoration: 'none',
              display: 'block',
              backgroundColor:
                location.pathname === '/employer/candidates'
                  ? 'rgba(68, 29, 160, 0.08)'
                  : 'inherit',
            }}
          >
            <StyledTreeItem
              nodeId="10"
              labelText="Find New Candidates"
              labelIcon={ContentPasteSearchOutlinedIcon}
            />
          </NavLink>
        </StyledTreeItem>
        <StyledTreeItem nodeId="4" labelText="Notification Management">
          <NavLink
            to="/employer/notifications"
            style={{
              textDecoration: 'none',
              display: 'block',
              backgroundColor:
                location.pathname === '/employer/notifications'
                  ? 'rgba(68, 29, 160, 0.08)'
                  : 'inherit',
            }}
          >
            <StyledTreeItem
              nodeId="11"
              labelText="imyanya Notifications"
              labelIcon={NotificationsNoneOutlinedIcon}
            />
          </NavLink>
        </StyledTreeItem>
        <StyledTreeItem nodeId="5" labelText="Account Management">
          <NavLink
            to="/employer/company"
            style={{
              textDecoration: 'none',
              display: 'block',
              backgroundColor:
                location.pathname === '/employer/company'
                  ? 'rgba(68, 29, 160, 0.08)'
                  : 'inherit',
            }}
          >
            <StyledTreeItem
              nodeId="12"
              labelText="Company Information"
              labelIcon={BusinessOutlinedIcon}
            />
          </NavLink>
          <NavLink
            to="/employer/account"
            style={{
              textDecoration: 'none',
              display: 'block',
              backgroundColor:
                location.pathname === '/employer/account'
                  ? 'rgba(68, 29, 160, 0.08)'
                  : 'inherit',
            }}
          >
            <StyledTreeItem
              nodeId="13"
              labelText="Account"
              labelIcon={AccountCircleOutlinedIcon}
            />
          </NavLink>
          <NavLink
            to="/employer/settings"
            style={{
              textDecoration: 'none',
              display: 'block',
              backgroundColor:
                location.pathname === '/employer/settings'
                  ? 'rgba(68, 29, 160, 0.08)'
                  : 'inherit',
            }}
          >
            <StyledTreeItem
              nodeId="14"
              labelText="Settings"
              labelIcon={SettingsOutlinedIcon}
            />
          </NavLink>
        </StyledTreeItem>
      </TreeView>
    </Box>
  </div>
);

const Sidebar = ({ drawerWidth }) => {
  const location = useLocation();
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
        },
      }}
      open
    >
      {drawer(location, theme)}
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
  const location = useLocation();

  return (
    <Drawer
      container={container}
      variant="temporary"
      open={mobileOpen}
      onClose={handleDrawerToggle}
      ModalProps={{
        keepMounted: true,
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
        },
      }}
    >
      {drawer(location, theme)}
    </Drawer>
  );
};

Sidebar.MobileSidebar = MobileSidebar;

export default Sidebar;
