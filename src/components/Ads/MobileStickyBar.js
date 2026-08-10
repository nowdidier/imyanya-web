import { Box, useMediaQuery, useTheme } from '@mui/material';
import AdUnit from './AdUnit';
import useShouldShowAds from '../../hooks/useShouldShowAds';

const MobileStickyBar = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const shouldShowAds = useShouldShowAds();

  if (!isMobile || !shouldShowAds) return null;

  return (
    <Box
      sx={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 1200,
        display: 'flex',
        justifyContent: 'center',
        bgcolor: 'rgba(255,255,255,0.95)',
        boxShadow: '0 -2px 8px rgba(0,0,0,0.1)',
        py: 0.5,
      }}
    >
      <AdUnit size="320x50" />
    </Box>
  );
};

export default MobileStickyBar;
