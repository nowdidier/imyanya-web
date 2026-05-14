import * as React from 'react';
import { Stack, Typography, Button } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faBriefcase, faUsers } from '@fortawesome/free-solid-svg-icons';
import { HOST_NAME, ROUTES, getCanonicalHostName } from '../../../../configs/constants';
import { buildURL } from '../../../../utils/funcUtils';

const AccountSwitchMenu = ({ isShowButton = false }) => {
  const hostName = getCanonicalHostName(window.location.hostname);
  const isEmployer = hostName === HOST_NAME.EMPLOYER_MYJOB;

  const targetHost = isEmployer ? HOST_NAME.MYJOB : HOST_NAME.EMPLOYER_MYJOB;

  const handleClick = () => {
    window.open(buildURL(targetHost), '_blank');
  };

  const handleClickAuth = (isLogin = false) => {
    const path = isLogin ? ROUTES.AUTH.LOGIN : ROUTES.AUTH.REGISTER;
    window.open(`${buildURL(targetHost)}/${path}`, '_blank');
  };

  const title = React.useMemo(() => (
    <Stack direction="row" alignItems="center">
      <FontAwesomeIcon
        color="#2c95ff"
        icon={isEmployer ? faUsers : faBriefcase}
        fontSize={25}
        style={{ marginRight: 8 }}
      />
      <Stack direction="column">
        <Typography>{isEmployer ? 'Job Seeker' : 'Employer'}</Typography>
        <Typography variant="caption" sx={{ fontSize: 11 }}>
          {isEmployer
            ? <><FontAwesomeIcon icon={faArrowRight} /> Switch</>
            : 'Post a Job for Free'}
        </Typography>
      </Stack>
    </Stack>
  ), [isEmployer]);

  return (
    <div>
      {isShowButton ? (
        <Stack spacing={1} sx={{ px: 2 }}>
          <Button
            variant="outlined"
            fullWidth
            color="inherit"
            size="small"
            sx={{ textTransform: 'inherit' }}
            onClick={() => handleClickAuth(true)}
          >
            {isEmployer ? 'Login candidate' : 'Login employers'}
          </Button>
          <Button
            variant="outlined"
            fullWidth
            color="inherit"
            size="small"
            sx={{ textTransform: 'inherit' }}
            onClick={() => handleClickAuth(false)}
          >
            {isEmployer ? 'Register candidate' : 'Register employers'}
          </Button>
        </Stack>
      ) : (
        <Typography sx={{ ml: 1, cursor: 'pointer' }} onClick={handleClick}>
          {title}
        </Typography>
      )}
    </div>
  );
};

export default React.memo(AccountSwitchMenu);