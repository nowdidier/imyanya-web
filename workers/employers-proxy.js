const TARGET_ORIGIN = "https://imyanya.rw";
const EMPLOYER_ORIGIN = "https://employers.imyanya.rw";
const LAST_MOD = "2026-05-07";

const employerRoutes = [
  { path: "/", changefreq: "weekly", priority: "1.0" },
  { path: "/dang-nhap", changefreq: "monthly", priority: "0.6" },
  { path: "/dang-ky", changefreq: "monthly", priority: "0.6" },
];

const escapeXml = (value) =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");

const buildSitemap = () => `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${employerRoutes
  .map(
    ({ path, changefreq, priority }) => `  <url>
    <loc>${escapeXml(`${EMPLOYER_ORIGIN}${path}`)}</loc>
    <lastmod>${LAST_MOD}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`
  )
  .join("\n")}
</urlset>`;

const employerRobots = `User-agent: *
Allow: /

Sitemap: ${EMPLOYER_ORIGIN}/sitemap.xml
`;

const copyRequest = (request, targetUrl) => {
  const headers = new Headers(request.headers);
  headers.set("Host", new URL(TARGET_ORIGIN).host);

  return new Request(targetUrl, {
    method: request.method,
    headers,
    body: ["GET", "HEAD"].includes(request.method) ? undefined : request.body,
    redirect: "manual",
  });
};

export default {
  async fetch(request) {
    const incomingUrl = new URL(request.url);

    if (incomingUrl.pathname === "/robots.txt") {
      return new Response(employerRobots, {
        headers: {
          "Content-Type": "text/plain; charset=utf-8",
          "Cache-Control": "public, max-age=3600",
          "X-Content-Type-Options": "nosniff",
          "X-Employer-Portal-Proxy": "imyanya",
        },
      });
    }

    if (incomingUrl.pathname === "/sitemap.xml") {
      return new Response(buildSitemap(), {
        headers: {
          "Content-Type": "application/xml; charset=utf-8",
          "Cache-Control": "public, max-age=3600",
          "X-Content-Type-Options": "nosniff",
          "X-Employer-Portal-Proxy": "imyanya",
        },
      });
    }

    const targetUrl = new URL(
      incomingUrl.pathname + incomingUrl.search,
      TARGET_ORIGIN
    );

    const response = await fetch(copyRequest(request, targetUrl));
    const headers = new Headers(response.headers);

    headers.delete("content-security-policy");
    headers.set("X-Employer-Portal-Proxy", "imyanya");

    return new Response(response.body, {
      status: response.status,
      statusText: response.statusText,
      headers,
    });
  },
};
