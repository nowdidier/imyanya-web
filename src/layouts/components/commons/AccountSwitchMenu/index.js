import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Stack, Typography, Button, Menu } from '@mui/material';

import { confirmModal } from '../../../../utils/sweetalert2Modal';
import { ROLES_NAME } from '../../../../configs/constants';
import tokenService from '../../../../services/tokenService';
import { removeUserInfo } from '../../../../redux/userSlice';
import errorHandling from '../../../../utils/errorHandling';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faArrowRight,
  faBriefcase,
  faUsers,
} from '@fortawesome/free-solid-svg-icons';
import {
  resetSearchCompany,
  resetSearchJobPostFilter,
  resetSearchResume,
} from '../../../../redux/filterSlice';


const AccountSwitchMenu = ({ isShowButton = false }) => {
  const nav = useNavigate();
  const dispatch = useDispatch();
  const { isAuthenticated, currentUser } = useSelector((state) => state.user);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = (path) => {
    const accessToken = tokenService.getAccessTokenFromCookie();
    const backend = tokenService.getProviderFromCookie();
    dispatch(removeUserInfo({accessToken, backend}))
      .unwrap()
      .then(() => {
        dispatch(resetSearchJobPostFilter());
        dispatch(resetSearchCompany());
        dispatch(resetSearchResume());

        nav(path);
      })
      .catch((error) => {
        errorHandling(error);
      });
  };

  const handleLogin = () => {
    let path = '/dang-nhap-umwubatsi-wa-gahunda';

    if (isAuthenticated) {
      let title = '';
      let text =
        'Gahunda isanzwe yinjiye izasohokanywa. Urashaka gukomeza?';
      let path = '';
      switch (currentUser?.roleName) {
        case ROLES_NAME.JOB_SEEKER:
          title = 'Kwinjira umwubatsi wa gahunda';
          path = '/dang-nhap-umwubatsi-wa-gahunda';
          break;
        case ROLES_NAME.EMPLOYER:
          title = 'Kwinjira uwushakamwuga';
          path = '/dang-nhap-uwushakamwuga';
          break;
        default:
          break;
      }

      handleClose();
      confirmModal(() => handleLogout(path), title, text, 'warning');
    } else {
      handleClose();
      nav(path);
    }
  };

  const handleSignUp = () => {
    let path = '/dang-ky-gahunda-umwubatsi-wa-gahunda';

    if (isAuthenticated) {
      let title = '';
      let text =
        'Gahunda isanzwe yinjiye izasohokanywa. Urashaka gukomeza?';
      let path = '';
      switch (currentUser?.roleName) {
        case ROLES_NAME.JOB_SEEKER:
          title = 'Kwiyandikisha umwubatsi wa gahunda';
          path = '/dang-ky-gahunda-umwubatsi-wa-gahunda';
          break;
        case ROLES_NAME.EMPLOYER:
          title = 'Kwiyandikisha uwushakamwuga';
          path = '/dang-ky-gahunda-uwushakamwuga';
          break;
        default:
          break;
      }

      handleClose();
      confirmModal(() => handleLogout(path), title, text, 'warning');
    } else {
      handleClose();
      nav(path);
    }
  };

  const title = React.useMemo(() => {
    return currentUser?.roleName === ROLES_NAME.JOB_SEEKER ? (
      <Stack direction="row" alignItems="center">
        <FontAwesomeIcon
          color="#2c95ff"
          icon={faBriefcase}
          fontSize={25}
          style={{ marginRight: 8 }}
        />
        <Stack direction="column">
          <Typography>Umwubatsi wa gahunda</Typography>
          <Typography variant="caption" sx={{ fontSize: 11 }}>
            Kwandika inzira ku buntu
          </Typography>
        </Stack>
      </Stack>
    ) : currentUser?.roleName === ROLES_NAME.EMPLOYER ? (
      <Stack direction="row" alignItems="center">
        <FontAwesomeIcon
          color="#2c95ff"
          icon={faUsers}
          fontSize={25}
          style={{ marginRight: 8 }}
        />
        <Stack direction="column">
          <Typography>Uwushakamwuga</Typography>
          <Typography variant="caption" sx={{ fontSize: 11 }}>
            <FontAwesomeIcon icon={faArrowRight} /> Guhindura
          </Typography>
        </Stack>
      </Stack>
    ) : (
      <Stack direction="row" alignItems="center">
        <FontAwesomeIcon
          color="#2c95ff"
          icon={faBriefcase}
          fontSize={25}
          style={{ marginRight: 8 }}
        />
        <Stack direction="column">
          <Typography>Umwubatsi wa gahunda</Typography>
          <Typography variant="caption" sx={{ fontSize: 11 }}>
            Kwandika inzira ku buntu
          </Typography>
        </Stack>
      </Stack>
    );
  }, [currentUser]);

  return (
    <div>
      {isShowButton ? (
        <Stack spacing={1} sx={{ px: 2 }}>
          <Button
            variant="outlined"
            fullWidth
            color="inherit"
            onClick={handleLogin}
            size="small"
            sx={{ textTransform: 'inherit' }}
          >
            {currentUser?.roleName === ROLES_NAME.EMPLOYER
              ? 'Kwinjira uwushakamwuga'
              : 'Kwinjira umwubatsi wa gahunda'}
          </Button>
          <Button
            variant="outlined"
            fullWidth
            size="small"
            color="inherit"
            sx={{ textTransform: 'inherit' }}
            onClick={handleSignUp}
          >
            {currentUser?.roleName === ROLES_NAME.EMPLOYER
              ? 'Kwiyandikisha uwushakamwuga'
              : 'Kwiyandikisha umwubatsi wa gahunda'}
          </Button>
        </Stack>
      ) : (
        <>
          <Typography sx={{ ml: 1, cursor: 'pointer' }} onClick={handleClick}>
            {title}
          </Typography>
          <Menu
            id="account-switch-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            PaperProps={{
              elevation: 0,
              sx: {
                overflow: 'visible',
                filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                mt: 1.5,
                '& .MuiAvatar-root': {
                  width: 32,
                  height: 32,
                  ml: -0.5,
                  mr: 1,
                },
                '&:before': {
                  content: '""',
                  display: 'block',
                  position: 'absolute',
                  top: 0,
                  right: 14,
                  width: 10,
                  height: 10,
                  bgcolor: 'background.paper',
                  transform: 'translateY(-50%) rotate(45deg)',
                  zIndex: 0,
                },
              },
            }}
            transformOrigin={{ horizontal: 'right', vertical: 'top' }}
            anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
          >
            <Stack spacing={1} sx={{ p: 1 }}>
              <Button
                variant="contained"
                fullWidth
                onClick={handleLogin}
                sx={{ color: 'white' }}
              >
                Kwinjira
              </Button>
              <Button
                variant="contained"
                fullWidth
                color="warning"
                sx={{ color: 'white' }}
                onClick={handleSignUp}
              >
                Iyandikishe
              </Button>
            </Stack>
          </Menu>{' '}
        </>
      )}
    </div>
  );
};

export default React.memo(AccountSwitchMenu);
