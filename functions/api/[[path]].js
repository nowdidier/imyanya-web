const BACKEND = "https://philosophical-ariel-novarwa-4fd2a870.koyeb.app";

const HOP_BY_HOP = new Set([
  "connection", "content-length", "host", "keep-alive",
  "proxy-authenticate", "proxy-authorization",
  "te", "trailer", "transfer-encoding", "upgrade",
]);

export async function onRequest({ request, params }) {
  const url = new URL(request.url);
  const pathSegments = params.path ?? [];
  const target = new URL(
    "/api/" + pathSegments.join("/") + url.search,
    BACKEND
  );

  const headers = new Headers();
  for (const [k, v] of request.headers.entries()) {
    if (!HOP_BY_HOP.has(k.toLowerCase())) headers.set(k, v);
  }
  headers.delete("host");

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