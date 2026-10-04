import React from 'react';
import { Box, Dialog, DialogContent, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const RichHtmlContent = ({ html, sx = {} }) => {
  const rootRef = React.useRef(null);
  const [previewImage, setPreviewImage] = React.useState(null);

  React.useEffect(() => {
    const root = rootRef.current;
    if (!root) return undefined;

    const images = root.querySelectorAll('img');

    images.forEach((img) => {
      const src = img.getAttribute('src') || '';

      // Browsers block http:// images on https pages, so upgrade the scheme.
      if (window.location.protocol === 'https:' && /^http:\/\//i.test(src)) {
        img.setAttribute('src', src.replace(/^http:\/\//i, 'https://'));
      }

      if (!img.hasAttribute('loading')) img.setAttribute('loading', 'lazy');
      if (!img.hasAttribute('decoding')) img.setAttribute('decoding', 'async');
      if (!img.hasAttribute('alt')) img.setAttribute('alt', '');
    });

    // View linked images in an in-page lightbox so readers never leave
    // the website while browsing related images.
    const handleImageClick = (event) => {
      const target = event.target;
      if (!(target instanceof window.HTMLImageElement)) return;

      event.preventDefault();

      const src = target.currentSrc || target.src;
      if (src) setPreviewImage({ src, alt: target.alt || '' });
    };

    root.addEventListener('click', handleImageClick);

    return () => root.removeEventListener('click', handleImageClick);
  }, [html]);

  return (
    <>
    <Box
      component="div"
      ref={rootRef}
      dangerouslySetInnerHTML={{ __html: html }}
      sx={{
        fontSize: 15,
        lineHeight: 1.7,
        color: 'text.primary',
        wordBreak: 'break-word',
        '& p': {
          mb: 1.5,
        },
        '& h1, & h2, & h3, & h4, & h5, & h6': {
          mt: 2.5,
          mb: 1,
          fontWeight: 700,
          lineHeight: 1.3,
        },
        '& h1': { fontSize: '1.75rem' },
        '& h2': { fontSize: '1.5rem' },
        '& h3': { fontSize: '1.3rem' },
        '& h4': { fontSize: '1.15rem' },
        '& h5': { fontSize: '1.05rem' },
        '& h6': { fontSize: '1rem' },
        '& ul, & ol': {
          pl: 3,
          mb: 1.5,
          listStylePosition: 'outside',
        },
        '& li': {
          mb: 0.5,
        },
        '& img': {
          maxWidth: '100%',
          height: 'auto',
          borderRadius: 1,
          my: 1,
          cursor: 'zoom-in',
        },
        '& a': {
          color: 'primary.main',
        },
        '& blockquote': {
          borderLeft: '4px solid',
          borderColor: 'primary.light',
          bgcolor: 'rgba(156,39,176,0.04)',
          px: 2,
          py: 1,
          my: 1.5,
          fontStyle: 'italic',
          color: 'text.secondary',
        },
        '& pre': {
          bgcolor: 'grey.100',
          p: 2,
          borderRadius: 1.5,
          overflowX: 'auto',
          my: 1.5,
          whiteSpace: 'pre-wrap',
          wordBreak: 'break-word',
        },
        '& code': {
          bgcolor: 'grey.100',
          px: 0.5,
          py: 0.25,
          borderRadius: 0.5,
          fontFamily: 'Consolas, Monaco, monospace',
          fontSize: '0.92em',
        },
        '& pre code': {
          bgcolor: 'transparent',
          p: 0,
          fontSize: '0.92em',
        },
        '& table': {
          width: '100%',
          maxWidth: '100%',
          borderCollapse: 'collapse',
          my: 1.5,
          overflowX: 'auto',
          display: 'block',
        },
        '& th, & td': {
          border: '1px solid',
          borderColor: 'grey.300',
          p: 1,
          textAlign: 'left',
        },
        '& th': {
          bgcolor: 'grey.100',
          fontWeight: 700,
        },
        '& iframe': {
          maxWidth: '100%',
          border: 0,
          borderRadius: 1,
          my: 1,
        },
        '& video': {
          maxWidth: '100%',
          height: 'auto',
          borderRadius: 1,
          my: 1,
        },
        '& hr': {
          border: 0,
          borderTop: '1px solid',
          borderColor: 'grey.300',
          my: 2,
        },
        ...sx,
      }}
    />

      <Dialog
        open={Boolean(previewImage)}
        onClose={() => setPreviewImage(null)}
        maxWidth="lg"
        fullWidth
        PaperProps={{
          sx: {
            bgcolor: 'transparent',
            boxShadow: 'none',
            overflow: 'visible',
          },
        }}
      >
        <IconButton
          onClick={() => setPreviewImage(null)}
          aria-label="Close image preview"
          sx={{
            position: 'absolute',
            top: 8,
            right: 8,
            zIndex: 1,
            bgcolor: 'rgba(0,0,0,0.55)',
            color: 'white',
            '&:hover': { bgcolor: 'rgba(0,0,0,0.75)' },
          }}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent sx={{ p: 0 }}>
          <Box
            component="img"
            src={previewImage?.src}
            alt={previewImage?.alt}
            sx={{
              display: 'block',
              width: '100%',
              maxHeight: '85vh',
              objectFit: 'contain',
              borderRadius: 2,
            }}
          />
        </DialogContent>
      </Dialog>
    </>
  );
};

export default RichHtmlContent;
