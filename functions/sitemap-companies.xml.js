// Dynamic sitemap of employer profiles so Google discovers every
// /companies/<slug> page (company jobs & profiles on Imyanya).
// Mirrors functions/sitemap-jobs.xml.js, paginating the public companies API.
const DEFAULT_BACKEND = "https://philosophical-ariel-novarwa-4fd2a870.koyeb.app";
const SITE_ORIGIN = "https://imyanya.rw";
const PAGE_SIZE = 100;
const MAX_PAGES = 50;

// Slugs of directory-only organisations (no API profile yet).
// Source of truth: src/data/content/companies/index.js (sampleCompanies).
const DIRECTORY_COMPANY_SLUGS = [
  "bank-of-kigali",
  "mtn-rwanda",
  "bk-tec-house",
  "getit-rwanda",
  "kasha-rwanda",
  "airtel-rwanda",
  "radisson-blu-kigali",
  "kigali-marriott-hotel",
  "serena-hotel-kigali",
  "ubumwe-grande-hotel",
  "rdb-tourism",
  "bralirwa",
  "inyange-industries",
  "sulfo-rwanda",
  "skol-brewery",
  "africa-improved-foods",
  "partners-in-health-rwanda",
  "one-accre-fund-rwanda",
  "world-bank-rwanda",
  "undp-rwanda",
  "usaid-rwanda",
  "giz-rwanda",
  "rwanda-revenue-authority",
  "rwanda-biomedical-centre",
  "rssb",
  "rwandair",
  "bollore-transport-logistics",
  "sonarwa",
  "radiant-health-insurance",
  "prime-insurance",
  "pwc-rwanda",
  "ey-rwanda",
  "deloitte-rwanda",
  "simba-supermarket",
  "t-2000-supermarket",
  "m-2000-supermarket",
  "equity-bank-rwanda",
  "access-bank-rwanda",
  "umurenge-sacco",
  "bk-capital-markets",
  "african-exim-bank-rwanda",
  "isango-star-microfinance",
  "ral-finance-corp",
  "exuus",
  "zorabots",
  "andela-rwanda",
  "vuba-vuba",
  "norrsken-house-kigali",
  "igf-rwanda",
  "alu-school-business",
];

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

const fetchCompanyUrls = async (backend, request) => {
  const urls = [];

  for (let page = 1; page <= MAX_PAGES; page += 1) {
    const target = new URL(
      `/api/info/web/companies/?page=${page}&pageSize=${PAGE_SIZE}`,
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

    for (const company of results) {
      if (!company?.slug) continue;

      const lastmod =
        toIsoDate(company.updateAt || company.update_at) ||
        toIsoDate(company.createAt || company.create_at);

      urls.push({ slug: company.slug, lastmod });
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
    const companyUrls = await fetchCompanyUrls(backend, request);
    const knownSlugs = new Set(companyUrls.map((entry) => entry.slug));

    // Directory-only organisations (curated in
    // src/data/content/companies/index.js) have culture pages at the same
    // /companies/<slug> URLs but no API profile yet — list them too so
    // Google discovers every employer on Imyanya. KEEP IN SYNC with that
    // file when new directory places are added.
    for (const slug of DIRECTORY_COMPANY_SLUGS) {
      if (!slug || knownSlugs.has(slug)) continue;
      knownSlugs.add(slug);
      companyUrls.push({ slug, lastmod: null, directory: true });
    }

    const entries = companyUrls
      .map(({ slug, lastmod, directory }) => {
        const loc = escapeXml(`${SITE_ORIGIN}/companies/${slug}`);
        const last = lastmod ? `\n    <lastmod>${lastmod}</lastmod>` : "";
        const changefreq = directory ? "monthly" : "weekly";
        const priority = directory ? "0.7" : "0.8";
        return `  <url>\n    <loc>${loc}</loc>${last}\n    <changefreq>${changefreq}</changefreq>\n    <priority>${priority}</priority>\n  </url>`;
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
