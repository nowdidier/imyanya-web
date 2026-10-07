// Finds a title-matched image for a job post without any API key or backend
// changes, using the free Wikimedia Commons search API (CORS enabled).
// Results are cached in memory + sessionStorage and fetched through a small
// concurrency queue so a job list does not fire dozens of requests at once.

const API_URL = 'https://commons.wikimedia.org/w/api.php';
const CACHE_PREFIX = 'job-image-search:v1:';
const CACHE_TTL = 7 * 24 * 60 * 60 * 1000;
const MAX_CONCURRENT = 3;

const memoryCache = new Map();
const inflight = new Map();
const queue = [];
let activeCount = 0;

const normalizeQuery = (title) => String(title || '').replace(/\s+/g, ' ').trim();

const cacheKey = (query) => CACHE_PREFIX + query.toLowerCase();

const readCache = (key) => {
  if (memoryCache.has(key)) return memoryCache.get(key);

  try {
    const raw = window.sessionStorage.getItem(key);
    if (!raw) return null;

    const parsed = JSON.parse(raw);
    if (!parsed || Date.now() - parsed.ts > CACHE_TTL) {
      window.sessionStorage.removeItem(key);
      return null;
    }

    memoryCache.set(key, parsed);
    return parsed;
  } catch (error) {
    return null;
  }
};

const writeCache = (key, url) => {
  const entry = { url, ts: Date.now() };
  memoryCache.set(key, entry);

  try {
    window.sessionStorage.setItem(key, JSON.stringify(entry));
  } catch (error) {
    // storage full / unavailable -> memory cache still works
  }
};

const IMAGES_CACHE_PREFIX = 'image-search:list:v1:';
const imagesMemoryCache = new Map();
const imagesInflight = new Map();

const readImagesCache = (key) => {
  if (imagesMemoryCache.has(key)) return imagesMemoryCache.get(key);

  try {
    const raw = window.sessionStorage.getItem(key);
    if (!raw) return null;

    const parsed = JSON.parse(raw);
    if (!parsed || Date.now() - parsed.ts > CACHE_TTL) {
      window.sessionStorage.removeItem(key);
      return null;
    }

    imagesMemoryCache.set(key, parsed);
    return parsed;
  } catch (error) {
    return null;
  }
};

const writeImagesCache = (key, urls) => {
  const entry = { urls, ts: Date.now() };
  imagesMemoryCache.set(key, entry);

  try {
    window.sessionStorage.setItem(key, JSON.stringify(entry));
  } catch (error) {
    // storage full / unavailable -> memory cache still works
  }
};

const scorePages = (pages, query) => {
  const tokens = query.toLowerCase().split(' ').filter(Boolean);

  return pages
    .map((page) => {
      const info = page?.imageinfo?.[0] || {};
      const mime = info.mime || '';
      const thumbUrl = info.thumburl || info.url;
      const fileTitle = String(page?.title || '').toLowerCase();

      if (!/^image\/(jpeg|jpg|png|webp)$/.test(mime) || !thumbUrl) {
        return null;
      }

      const score =
        tokens.filter((token) => fileTitle.includes(token)).length * 10 -
        (page.index || 0) * 0.01;

      return {
        thumbUrl: thumbUrl.split('?')[0],
        pageUrl: info.descriptionurl || '',
        score,
      };
    })
    .filter(Boolean);
};

// Several images matching a query (used to preview an organisation online).
const fetchImageUrls = async (query, limit) => {
  const safeLimit = Math.min(Math.max(Number(limit) || 4, 1), 10);

  const params = new URLSearchParams({
    action: 'query',
    generator: 'search',
    gsrsearch: `${query} filetype:bitmap`,
    gsrnamespace: '6',
    gsrlimit: '30',
    prop: 'imageinfo',
    iiprop: 'url|mime|size',
    iiurlwidth: '400',
    format: 'json',
    origin: '*',
  });

  const response = await fetch(`${API_URL}?${params.toString()}`);
  if (!response.ok) {
    throw new Error(`Image search failed with status ${response.status}`);
  }

  const data = await response.json();
  const pages = Object.values(data?.query?.pages || {});
  const candidates = scorePages(pages, query);

  candidates.sort((a, b) => b.score - a.score);

  return candidates.slice(0, safeLimit);
};

const fetchMatchedUrl = async (query) => {
  const params = new URLSearchParams({
    action: 'query',
    generator: 'search',
    gsrsearch: `${query} filetype:bitmap`,
    gsrnamespace: '6',
    gsrlimit: '20',
    prop: 'imageinfo',
    iiprop: 'url|mime|size',
    iiurlwidth: '800',
    format: 'json',
    origin: '*',
  });

  const response = await fetch(`${API_URL}?${params.toString()}`);
  if (!response.ok) {
    throw new Error(`Image search failed with status ${response.status}`);
  }

  const data = await response.json();
  const pages = Object.values(data?.query?.pages || {});

  const tokens = query.toLowerCase().split(' ').filter(Boolean);

  const candidates = pages
    .map((page) => {
      const info = page?.imageinfo?.[0] || {};
      const mime = info.mime || '';
      const thumbUrl = info.thumburl || info.url;
      const fileTitle = String(page?.title || '').toLowerCase();

      if (!/^image\/(jpeg|jpg|png|webp)$/.test(mime) || !thumbUrl) {
        return null;
      }

      // Prefer files whose name actually mentions the job title.
      const score =
        tokens.filter((token) => fileTitle.includes(token)).length * 10 -
        (page.index || 0) * 0.01;

      return { thumbUrl: thumbUrl.split('?')[0], score };
    })
    .filter(Boolean);

  candidates.sort((a, b) => b.score - a.score);

  return candidates.length > 0 ? candidates[0].thumbUrl : null;
};

const drainQueue = () => {
  if (activeCount >= MAX_CONCURRENT || queue.length === 0) return;

  const job = queue.shift();
  activeCount += 1;

  job
    .run()
    .then(job.resolve, job.reject)
    .finally(() => {
      activeCount -= 1;
      drainQueue();
    });

  drainQueue();
};

const enqueue = (run) =>
  new Promise((resolve, reject) => {
    queue.push({ run, resolve, reject });
    drainQueue();
  });

const searchJobImage = (title) => {
  const query = normalizeQuery(title);
  if (!query) return Promise.resolve(null);

  const key = cacheKey(query);

  const cached = readCache(key);
  if (cached) return Promise.resolve(cached.url || null);

  if (inflight.has(key)) return inflight.get(key);

  const promise = enqueue(() => fetchMatchedUrl(query))
    .then((url) => {
      writeCache(key, url);
      return url;
    })
    .catch(() => {
      // do not cache failures, but keep them out of the way
      return null;
    })
    .finally(() => {
      inflight.delete(key);
    });

  inflight.set(key, promise);
  return promise;
};

// Words that add no meaning when searching images on their own.
const IMAGE_STOPWORDS = new Set([
  'the', 'and', 'for', 'with', 'from', 'into', 'this', 'that',
  'are', 'was', 'were', 'job', 'jobs', 'role', 'roles', 'vacancy',
  'vacancies', 'hiring', 'wanted', 'needed', 'new',
]);

// Significant keywords of a query, longest first (e.g.
// "Senior Accountant Kigali" -> ["accountant", "kigali", "senior"]).
// Used as fallback searches when the full query finds nothing, so the
// card almost never ends up empty while Google has plenty.
const buildFallbackQueries = (query) => {
  const tokens = String(query || '')
    .toLowerCase()
    .split(' ')
    .map((token) => token.replace(/[^a-z0-9]/g, ''))
    .filter((token) => token.length > 2 && !IMAGE_STOPWORDS.has(token));

  const unique = [...new Set(tokens)];
  unique.sort((a, b) => b.length - a.length);
  return unique.slice(0, 3);
};

// Openverse aggregates openly-licensed images from many providers
// (Flickr, etc.) — a much bigger pool than Commons alone. Free, no API key,
// CORS-enabled. Only used when Commons finds too little, to respect its
// anonymous rate limit (~200/day). Google Images itself offers no free API
// and blocks cross-site embedding, so this is the closest keyless option.
const OPENVERSE_URL = 'https://api.openverse.org/v1/images/';
const OPENVERSE_CACHE_PREFIX = 'openverse:list:v1:';

const fetchOpenverseImageUrls = async (query, limit) => {
  const safeLimit = Math.min(Math.max(Number(limit) || 4, 1), 10);

  const params = new URLSearchParams({
    q: query,
    page_size: String(Math.min(safeLimit * 2, 20)),
    filter_dead: 'false',
    license_type: 'all',
  });

  const response = await fetch(`${OPENVERSE_URL}?${params.toString()}`, {
    headers: { Accept: 'application/json' },
  });
  if (!response.ok) {
    throw new Error(`Openverse search failed with status ${response.status}`);
  }

  const data = await response.json();
  const results = Array.isArray(data?.results) ? data.results : [];

  return results
    .filter((item) => item && !item.mature && (item.thumbnail || item.url))
    .map((item) => ({
      // thumbnail is proxied by Openverse: reliable hotlinking.
      thumbUrl: item.thumbnail || item.url,
      pageUrl: item.foreign_landing_url || '',
      title: item.title || '',
    }))
    .slice(0, safeLimit);
};

const fetchSingleOpenverseQuery = (query, limit) => {
  const key = `${OPENVERSE_CACHE_PREFIX}${limit}:${query.toLowerCase()}`;

  const cached = readImagesCache(key);
  if (cached) {
    return Promise.resolve(Array.isArray(cached.urls) ? cached.urls : []);
  }

  if (imagesInflight.has(key)) return imagesInflight.get(key);

  const promise = enqueue(() => fetchOpenverseImageUrls(query, limit))
    .then((results) => {
      const safeResults = Array.isArray(results)
        ? results.filter((item) => item && item.thumbUrl)
        : [];
      writeImagesCache(key, safeResults);
      return safeResults;
    })
    .catch(() => [])
    .finally(() => {
      imagesInflight.delete(key);
    });

  imagesInflight.set(key, promise);
  return promise;
};

const fetchSingleImageQuery = (query, limit) => {
  const key = `${IMAGES_CACHE_PREFIX}${limit}:${query.toLowerCase()}`;

  const cached = readImagesCache(key);
  if (cached) {
    return Promise.resolve(Array.isArray(cached.urls) ? cached.urls : []);
  }

  if (imagesInflight.has(key)) return imagesInflight.get(key);

  const promise = enqueue(() => fetchImageUrls(query, limit))
    .then((results) => {
      const safeResults = Array.isArray(results)
        ? results.filter((item) => item && item.thumbUrl)
        : [];
      writeImagesCache(key, safeResults);
      return safeResults;
    })
    .catch(() => [])
    .finally(() => {
      imagesInflight.delete(key);
    });

  imagesInflight.set(key, promise);
  return promise;
};

// Returns up to `limit` images matching a query (organisation name...).
// Each item: { thumbUrl, pageUrl } where pageUrl is the Wikimedia Commons
// file page (used for attribution linking). When the full query finds
// nothing, significant keywords are tried so related images still show.
const searchImages = async (query, limit = 4) => {
  const normalized = normalizeQuery(query);
  if (!normalized) return [];

  const safeLimit = Math.min(Math.max(Number(limit) || 4, 1), 10);
  const seen = new Set();
  const merged = [];

  const pushAll = (items) => {
    for (const image of items || []) {
      if (image && image.thumbUrl && !seen.has(image.thumbUrl)) {
        seen.add(image.thumbUrl);
        merged.push(image);
      }
    }
  };

  pushAll(await fetchSingleImageQuery(normalized, safeLimit));

  if (merged.length < safeLimit) {
    for (const fallback of buildFallbackQueries(normalized)) {
      if (merged.length >= safeLimit) break;
      pushAll(await fetchSingleImageQuery(fallback, safeLimit));
    }
  }

  // Still short? Ask Openverse (Flickr & co.) with the full query.
  if (merged.length < safeLimit) {
    pushAll(await fetchSingleOpenverseQuery(normalized, safeLimit - merged.length));
  }

  return merged.slice(0, safeLimit);
};

// Merges image results for several queries (e.g. job title + company /
// contact person), deduplicated in priority order. Each query keeps its own
// keyword + Openverse fallback logic.
const searchImagesMulti = async (queries, limit = 4) => {
  const normalized = (Array.isArray(queries) ? queries : [queries])
    .map((item) => normalizeQuery(item))
    .filter(Boolean);

  if (normalized.length === 0) return [];

  const safeLimit = Math.min(Math.max(Number(limit) || 4, 1), 10);
  const perQuery = await Promise.all(
    normalized.map((item) => searchImages(item, safeLimit))
  );

  const seen = new Set();
  const merged = [];
  for (const list of perQuery) {
    for (const image of list || []) {
      if (image && image.thumbUrl && !seen.has(image.thumbUrl)) {
        seen.add(image.thumbUrl);
        merged.push(image);
      }
    }
  }

  return merged.slice(0, safeLimit);
};

// First <img src="..."> inside rich text content, if any.
const extractFirstImage = (html) => {
  const match = /<img[^>]+src=["']([^"']+)["']/i.exec(String(html || ''));
  return match ? match[1] : null;
};

export { searchJobImage, searchImages, searchImagesMulti, extractFirstImage };
