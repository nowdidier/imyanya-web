// Registers /service-worker.js in production so the app is installable
// (PWA) and keeps an offline shell. API calls are never cached.
const isProduction = process.env.NODE_ENV === "production";

export function register() {
  if (!isProduction) return;
  if (!("serviceWorker" in navigator)) return;

  window.addEventListener("load", () => {
    const swUrl = `${process.env.PUBLIC_URL || ""}/service-worker.js`;
    navigator.serviceWorker.register(swUrl).catch((error) => {
      console.error("Service worker registration failed:", error);
    });
  });
}

export function unregister() {
  if (!("serviceWorker" in navigator)) return;
  navigator.serviceWorker.ready
    .then((registration) => registration.unregister())
    .catch(() => {});
}
