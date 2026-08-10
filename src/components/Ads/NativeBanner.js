import { useEffect } from 'react';
import { Box } from '@mui/material';
import { NATIVE_AD } from './adConfig';
import useShouldShowAds from '../../hooks/useShouldShowAds';

const NativeBanner = ({ sx }) => {
  const shouldShowAds = useShouldShowAds();

  useEffect(() => {
    if (!shouldShowAds) return;
    if (document.getElementById(NATIVE_AD.containerId)) return;

    const script = document.createElement('script');
    script.src = NATIVE_AD.scriptSrc;
    script.async = true;
    script.dataset.cfasync = 'false';
    document.body.appendChild(script);

    return () => {
      script.remove();
    };
  }, [shouldShowAds]);

  if (!shouldShowAds) return null;

  return <Box id={NATIVE_AD.containerId} sx={sx} />;
};

export default NativeBanner;
