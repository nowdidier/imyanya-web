// Lightweight pub/sub store that lets data-fetching components tell the
// SeoManager whether the current page has indexable content.
//
// Listing/detail pages fetch from the API. When the API returns no results
// (or a record is not found) those pages are thin and should be noindexed so
// AdSense / Google don't index low-value empty pages.

let noindexReason = null;
const listeners = new Set();

export const setContentNoindex = (reason) => {
  const next = reason || null;

  if (next === noindexReason) return;

  noindexReason = next;
  listeners.forEach((listener) => listener());
};

export const getContentNoindex = () => noindexReason;

export const subscribeContentNoindex = (callback) => {
  listeners.add(callback);

  return () => {
    listeners.delete(callback);
  };
};
