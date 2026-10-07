import React from 'react';
import { Box, Button, Skeleton, Stack, Typography } from '@mui/material';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import ImageSearchIcon from '@mui/icons-material/ImageSearch';

import { searchImagesMulti } from '../../utils/jobImageSearch';

const buildGoogleImagesUrl = (query) =>
  `https://www.google.com/search?tbm=isch&q=${encodeURIComponent(query)}`;

/**
 * Small preview strip with images of an organisation (contact person name).
 * Thumbnails link to the Wikimedia Commons file page for attribution,
 * while the header button opens the full result set on Google Images,
 * since Google's own results page cannot be embedded inside this site.
 */
const OrganisationImagesCard = ({ name = '', secondaryName = '', maxImages = 4, employerImages = [] }) => {
  const [images, setImages] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);

  const query = String(name || '').trim();
  const secondaryQuery = String(secondaryName || '').trim();
  const employerList = React.useMemo(
    () =>
      Array.isArray(employerImages)
        ? employerImages.filter((image) => image && image.thumbUrl)
        : [],
    [employerImages]
  );

  React.useEffect(() => {
    let isMounted = true;

    if (!query) {
      setImages([]);
      setIsLoading(false);
      return () => {
        isMounted = false;
      };
    }

    setIsLoading(true);
    searchImagesMulti([query, secondaryQuery], maxImages)
      .then((results) => {
        if (isMounted) setImages(Array.isArray(results) ? results : []);
      })
      .finally(() => {
        if (isMounted) setIsLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, [query, secondaryQuery, maxImages]);

  // Employer-uploaded images first, then related images from the search
  // engine (deduplicated), so the strip is never empty when the employer
  // provided a logo or cover.
  const combined = React.useMemo(() => {
    const seen = new Set();
    const list = [];
    for (const image of [...employerList, ...images]) {
      if (image && image.thumbUrl && !seen.has(image.thumbUrl)) {
        seen.add(image.thumbUrl);
        list.push(image);
      }
    }
    return list;
  }, [employerList, images]);

  // Drops a thumbnail that fails to load (deleted/moved Commons file).
  const handleImageError = (thumbUrl) => {
    setImages((current) =>
      current.filter((image) => image.thumbUrl !== thumbUrl)
    );
  };

  const googleUrl = buildGoogleImagesUrl(query);
  const safeMaxImages = Math.min(Math.max(Number(maxImages) || 4, 1), 10);

  return (
    <Box
      sx={{
        border: "1px dashed",
        borderColor: "grey.300",
        borderRadius: 2,
        p: 1.5,
        bgcolor: "grey.50",
        width: "100%",
      }}
    >
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        spacing={1}
        sx={{ mb: 1 }}
      >
        <Typography
          variant="subtitle2"
          sx={{ display: "flex", alignItems: "center", gap: 0.75 }}
        >
          <ImageSearchIcon fontSize="small" color="primary" />
          {query
            ? `Images related to ${query}${secondaryQuery ? ` & ${secondaryQuery}` : ""}`
            : "Organisation images"}
        </Typography>
        <Button
          size="small"
          component="a"
          href={googleUrl}
          target="_blank"
          rel="noopener noreferrer"
          endIcon={<OpenInNewIcon sx={{ fontSize: 14 }} />}
          sx={{ textTransform: "none", fontWeight: 600 }}
        >
          Google Images
        </Button>
      </Stack>

      {isLoading ? (
        <Stack direction="row" spacing={1} sx={{ flexWrap: "wrap", rowGap: 1 }}>
          {Array.from({ length: safeMaxImages }).map((_, index) => (
            <Skeleton
              key={index}
              variant="rounded"
              width={{ xs: 64, sm: 72 }}
              height={{ xs: 48, sm: 56 }}
            />
          ))}
        </Stack>
      ) : combined.length > 0 ? (
        <Stack direction="row" spacing={1} sx={{ flexWrap: "wrap", rowGap: 1 }}>
          {combined.map((image) => (
            <Box
              key={image.thumbUrl}
              component="a"
              href={image.pageUrl || googleUrl}
              target="_blank"
              rel="noopener noreferrer"
              title={`${query} — preview image`}
              sx={{
                display: "block",
                lineHeight: 0,
                borderRadius: 1,
                overflow: "hidden",
                border: "1px solid",
                borderColor: "grey.200",
                "&:hover": { boxShadow: 1 },
              }}
            >
              <Box
                component="img"
                src={image.thumbUrl}
                alt={query}
                loading="lazy"
                onError={() => handleImageError(image.thumbUrl)}
                sx={{
                  width: { xs: 64, sm: 72 },
                  height: { xs: 48, sm: 56 },
                  objectFit: "cover",
                  display: "block",
                }}
              />
            </Box>
          ))}
        </Stack>
      ) : (
        <Typography variant="caption" color="text.secondary">
          {query
            ? `No preview images found for “${query}” yet — open Google Images for the full web result.`
            : "Open Google Images for the full web result."}
        </Typography>
      )}

      {combined.length > 0 && (
        <Typography
          variant="caption"
          color="text.secondary"
          sx={{ display: "block", mt: 0.75 }}
        >
          Related to {query ? `“${query}”` : "this job"}
          {secondaryQuery ? ` and “${secondaryQuery}”` : ""} — previews from
          free libraries (Wikimedia Commons, Openverse).
          Thumbnail clicks open the original file page.
        </Typography>
      )}
    </Box>
  );
};

export default OrganisationImagesCard;
