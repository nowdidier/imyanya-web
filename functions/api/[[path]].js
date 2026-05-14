const DEFAULT_BACKEND = "https://philosophical-ariel-novarwa-4fd2a870.koyeb.app";

const HOP_BY_HOP = new Set([
  "connection", "content-length", "host", "keep-alive",
  "proxy-authenticate", "proxy-authorization",
  "te", "trailer", "transfer-encoding", "upgrade",
]);

export async function onRequest({ request, env = {} }) {
  const url = new URL(request.url);
  const backend = env.BACKEND_URL || DEFAULT_BACKEND;
  const apiPath = url.pathname.replace(/^\/api\/?/, "");
  const target = new URL(`/api/${apiPath}${url.search}`, backend);

  const headers = new Headers();
  for (const [k, v] of request.headers.entries()) {
    if (!HOP_BY_HOP.has(k.toLowerCase())) headers.set(k, v);
  }
  headers.delete("host");
  headers.set("x-forwarded-host", url.host);
  headers.set("x-forwarded-proto", url.protocol.replace(":", ""));

  const upstream = await fetch(target, {
    method: request.method,
    headers,
    body: ["GET", "HEAD"].includes(request.method) ? null : request.body,
    redirect: "manual",
  });

  const responseHeaders = new Headers();
  for (const [k, v] of upstream.headers.entries()) {
    if (!HOP_BY_HOP.has(k.toLowerCase())) responseHeaders.set(k, v);
  }

  return new Response(upstream.body, {
    status: upstream.status,
    headers: responseHeaders,
  });
}
