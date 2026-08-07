import { Box } from '@mui/material';
import { SMARTLINK_URL } from './adConfig';

const Smartlink = ({ children, sx }) => {
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
