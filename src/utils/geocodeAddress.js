import goongService from "../services/goongService";

// Forward-geocodes a free-text address (e.g. "33, KK 40 Avenue, Kicukiro")
// into rooftop coordinates using the Goong key the posting forms already
// use. Results are cached (memory + localStorage) so each unique address
// costs API quota only once; failures are remembered for 7 days.
const LS_KEY = "imyanya-geocode-cache-v1";
const FAIL_TTL_MS = 7 * 24 * 60 * 60 * 1000;
const mem = new Map();
const inflight = new Map();

const normalize = (address = "") =>
  String(address || "").trim().replace(/\s+/g, " ").toLowerCase();

try {
  const raw = localStorage.getItem(LS_KEY);
  if (raw) {
    const parsed = JSON.parse(raw);
    if (parsed && typeof parsed === "object") {
      Object.entries(parsed).forEach(([key, entry]) => {
        if (entry && typeof entry.lat === "number") mem.set(key, entry);
      });
    }
  }
} catch (error) {
  // storage unavailable — memory cache still works for the session
}

const persist = () => {
  try {
    const obj = {};
    mem.forEach((entry, key) => {
      obj[key] = entry;
    });
    localStorage.setItem(LS_KEY, JSON.stringify(obj));
  } catch (error) {
    // ignore quota/privacy errors
  }
};

const pickLocation = (detail) => {
  const loc =
    detail?.result?.geometry?.location ||
    detail?.data?.result?.geometry?.location ||
    null;
  const lat = Number(loc?.lat);
  const lng = Number(loc?.lng);
  if (!Number.isFinite(lat) || !Number.isFinite(lng)) return null;
  if (lat === 0 && lng === 0) return null;
  return { lat, lng };
};

export const geocodeAddress = (address) => {
  const key = normalize(address);
  if (!key) return Promise.resolve(null);

  const cached = mem.get(key);
  if (cached) {
    if (cached.ok) return Promise.resolve({ lat: cached.lat, lng: cached.lng });
    if (Date.now() - (cached.ts || 0) < FAIL_TTL_MS) return Promise.resolve(null);
  }
  if (inflight.has(key)) return inflight.get(key);

  const task = (async () => {
    try {
      const autoComplete =
        (await goongService.getPlaces(address)) || {};
      const predictions =
        autoComplete.predictions || autoComplete.data?.predictions || [];
      const placeId =
        predictions[0]?.place_id || predictions[0]?.placeId || null;
      if (!placeId) throw new Error("no-prediction");

      const detail = (await goongService.getPlaceDetailByPlaceId(placeId)) || {};
      const point = pickLocation(detail);
      if (!point) throw new Error("no-geometry");

      mem.set(key, { ...point, ok: true, ts: Date.now() });
      persist();
      return point;
    } catch (error) {
      mem.set(key, { ok: false, ts: Date.now() });
      persist();
      return null;
    } finally {
      inflight.delete(key);
    }
  })();

  inflight.set(key, task);
  return task;
};

// Resolves many addresses: cached hits return free, at most `limit` new
// ones hit the API. Returns Map(address -> {lat,lng}).
export const geocodeAddresses = async (addresses = [], limit = 10) => {
  const out = new Map();
  const toFetch = [];
  const seen = new Set();
  for (const address of addresses) {
    const key = normalize(address);
    if (!key || seen.has(key)) continue;
    seen.add(key);
    const cached = mem.get(key);
    if (cached?.ok) {
      out.set(address, { lat: cached.lat, lng: cached.lng });
      continue;
    }
    if (cached && Date.now() - (cached.ts || 0) < FAIL_TTL_MS) continue;
    toFetch.push(address);
    if (toFetch.length >= limit) break;
  }

  const settled = await Promise.allSettled(
    toFetch.map((address) =>
      geocodeAddress(address).then((point) => ({ address, point }))
    )
  );
  for (const result of settled) {
    if (result.status === "fulfilled" && result.value?.point) {
      out.set(result.value.address, result.value.point);
    }
  }
  return out;
};
