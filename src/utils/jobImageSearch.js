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

// First <img src="..."> inside rich text content, if any.
const extractFirstImage = (html) => {
  const match = /<img[^>]+src=["']([^"']+)["']/i.exec(String(html || ''));
  return match ? match[1] : null;
};

export { searchJobImage, extractFirstImage };
