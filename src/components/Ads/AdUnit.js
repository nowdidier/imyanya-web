import { useEffect, useRef } from 'react';
import { Box } from '@mui/material';
import { AD_UNITS } from './adConfig';

const SCRIPT_CLOSE = '<' + '/script>';

const AdUnit = ({ size, sx }) => {
  const iframeRef = useRef(null);
  const config = AD_UNITS[size];

  useEffect(() => {
    if (!config) return;
    const iframe = iframeRef.current;
    if (!iframe) return;

    const doc = iframe.contentDocument || iframe.contentWindow.document;
    doc.open();
    doc.write([
      '<!DOCTYPE html><html><head>',
      '<script>',
      'window.atOptions = ' + JSON.stringify(config.atOptions) + ';',
      SCRIPT_CLOSE,
      '<script src="' + config.invokeSrc + '" async>',
      SCRIPT_CLOSE,
      '</head><body style="margin:0;padding:0;overflow:hidden;"></body></html>',
    ].join(''));
    doc.close();
  }, [config]);

  if (!config) return null;

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden',
        ...sx,
      }}
    >
      <iframe
        ref={iframeRef}
        width={config.width}
        height={config.height}
        style={{ border: 0, display: 'block', maxWidth: '100%' }}
        title={`ad-${size}`}
        scrolling="no"
      />
    </Box>
  );
};

export default AdUnit;
