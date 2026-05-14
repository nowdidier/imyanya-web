const DEFAULT_BACKEND = "https://philosophical-ariel-novarwa-4fd2a870.koyeb.app";

const HOP_BY_HOP_HEADERS = new Set([
  "connection",
  "content-length",
  "host",
  "keep-alive",
  "proxy-authenticate",
  "proxy-authorization",
  "te",
  "trailer",
  "transfer-encoding",
  "upgrade",
]);

const copyHeaders = (headers) => {
  const nextHeaders = new Headers();

  for (const [key, value] of headers.entries()) {
    if (!HOP_BY_HOP_HEADERS.has(key.toLowerCase())) {
      nextHeaders.set(key, value);
    }
  }

  return nextHeaders;
};

const proxyApiRequest = async (request, env) => {
  const requestUrl = new URL(request.url);
  const backend = env.BACKEND_URL || DEFAULT_BACKEND;
  const apiPath = requestUrl.pathname.replace(/^\/api\/?/, "");
  const targetUrl = new URL(`/api/${apiPath}${requestUrl.search}`, backend);
  const headers = copyHeaders(request.headers);

  headers.delete("host");
  headers.set("x-forwarded-host", requestUrl.host);
  headers.set("x-forwarded-proto", requestUrl.protocol.replace(":", ""));

  try {
    const upstream = await fetch(targetUrl, {
      method: request.method,
      headers,
      body: ["GET", "HEAD"].includes(request.method) ? null : request.body,
      redirect: "manual",
    });

    return new Response(upstream.body, {
      status: upstream.status,
      headers: copyHeaders(upstream.headers),
    });
  } catch (error) {
    return Response.json(
      {
        error: "API proxy request failed",
        message: error instanceof Error ? error.message : String(error),
      },
      { status: 502 }
    );
  }
};

const serveStaticAsset = async (request, env) => {
  const response = await env.ASSETS.fetch(request);
  const acceptsHtml = request.headers.get("accept")?.includes("text/html");

  if (response.status !== 404 || !acceptsHtml) {
    return response;
  }

  const url = new URL(request.url);
  url.pathname = "/index.html";

  return env.ASSETS.fetch(new Request(url, request));
};

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (url.pathname === "/api" || url.pathname.startsWith("/api/")) {
      return proxyApiRequest(request, env);
    }

    return serveStaticAsset(request, env);
  },
};
