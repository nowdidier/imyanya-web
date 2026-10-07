const DEFAULT_BACKEND = "https://philosophical-ariel-novarwa-4fd2a870.koyeb.app";
const SITE_ORIGIN = "https://imyanya.rw";
const PAGE_SIZE = 100;
const MAX_PAGES = 50;

const escapeXml = (value = "") =>
  String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");

const toIsoDate = (value) => {
  if (!value) return null;
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return null;
  return date.toISOString();
};

const fetchJobUrls = async (backend, request) => {
  const urls = [];

  for (let page = 1; page <= MAX_PAGES; page += 1) {
    const target = new URL(
      `/api/job/web/job-posts/?page=${page}&pageSize=${PAGE_SIZE}`,
      backend
    );

    const upstream = await fetch(target, {
      headers: {
        accept: "application/json",
        "user-agent": request.headers.get("user-agent") || "Imyanya-Sitemap",
      },
    });

    if (!upstream.ok) break;

    const data = await upstream.json();
    // Tolerate both {results,count} and {data:{results,count}} shapes.
    const payload = data?.results ? data : data?.data || {};
    const results = Array.isArray(payload?.results) ? payload.results : [];

    for (const job of results) {
      if (!job?.slug) continue;

      const lastmod =
        toIsoDate(job.updateAt || job.update_at) ||
        toIsoDate(job.createAt || job.create_at) ||
        toIsoDate(job.deadline);

      urls.push({ slug: job.slug, lastmod });
    }

    const count = Number(payload?.count) || 0;
    if (results.length === 0 || page * PAGE_SIZE >= count) break;
  }

  return urls;
};

export async function onRequestGet({ request, env = {} }) {
  const backend = env.BACKEND_URL || DEFAULT_BACKEND;

  const header = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`;
  const footer = `</urlset>`;

  try {
    const jobUrls = await fetchJobUrls(backend, request);

    const entries = jobUrls
      .map(({ slug, lastmod }) => {
        const loc = escapeXml(`${SITE_ORIGIN}/viec-lam/${slug}`);
        const last = lastmod ? `\n    <lastmod>${lastmod}</lastmod>` : "";
        return `  <url>\n    <loc>${loc}</loc>${last}\n    <changefreq>weekly</changefreq>\n    <priority>0.8</priority>\n  </url>`;
      })
      .join("\n");

    return new Response(`${header}\n${entries}\n${footer}`, {
      status: 200,
      headers: {
        "content-type": "application/xml; charset=utf-8",
        "cache-control": "public, max-age=3600",
      },
    });
  } catch (error) {
    return new Response(`${header}\n${footer}`, {
      status: 200,
      headers: {
        "content-type": "application/xml; charset=utf-8",
        "cache-control": "public, max-age=600",
      },
    });
  }
}
