import React from 'react';

import { searchJobImage, extractFirstImage } from '../utils/jobImageSearch';

const normalize = (title) => String(title || '').replace(/\s+/g, ' ').trim();

// Resolves the image to show for a job post:
//   1. the cover image set by the employer (imageUrl)
//   2. the first image pasted into the text editor content
//   3. an image matched automatically with the job title
// Returns null when nothing is found so callers can fall back
// (e.g. to the company logo).
const useJobImage = ({ title, coverImageUrl, description } = {}) => {
  const existing = coverImageUrl || extractFirstImage(description);
  const query = existing ? '' : normalize(title);
  const [matched, setMatched] = React.useState('');

  React.useEffect(() => {
    if (!query) {
      setMatched('');
      return undefined;
    }

    let cancelled = false;
    setMatched('');

    searchJobImage(query)
      .then((url) => {
        if (!cancelled && url) setMatched(url);
      })
      .catch(() => {});

    return () => {
      cancelled = true;
    };
  }, [query]);

  return existing || matched || null;
};

export default useJobImage;
