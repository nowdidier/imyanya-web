import { useEffect } from 'react';
import { Box } from '@mui/material';
import { NATIVE_AD } from './adConfig';

const NativeBanner = ({ sx }) => {
  useEffect(() => {
    if (document.getElementById(NATIVE_AD.containerId)) return;

    const script = document.createElement('script');
    script.src = NATIVE_AD.scriptSrc;
    script.async = true;
    script.dataset.cfasync = 'false';
    document.body.appendChild(script);

    return () => {
      script.remove();
    };
  }, []);

  return <Box id={NATIVE_AD.containerId} sx={sx} />;
};

export default NativeBanner;
