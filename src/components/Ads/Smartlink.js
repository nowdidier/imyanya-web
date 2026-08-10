import { Box } from '@mui/material';
import { SMARTLINK_URL } from './adConfig';
import useShouldShowAds from '../../hooks/useShouldShowAds';

const Smartlink = ({ children, sx }) => {
  const shouldShowAds = useShouldShowAds();

  if (!shouldShowAds) return null;

  return (
    <Box sx={{ textAlign: 'center', ...sx }}>
      <a
        href={SMARTLINK_URL}
        target="_blank"
        rel="noopener noreferrer"
        style={{ color: 'inherit', textDecoration: 'none' }}
      >
        {children || 'Sponsored'}
      </a>
    </Box>
  );
};

export default Smartlink;
