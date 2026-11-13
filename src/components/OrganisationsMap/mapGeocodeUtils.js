import { getRwandaCoords } from "../../data/rwandaDistricts.js";

export const RWANDA_GEOCODE_ENDPOINT =
  "https://geocode.googleapis.com/v4/geocode/address";
export const RWANDA_GEOCODE_LEGACY_ENDPOINT =
  "https://maps.googleapis.com/maps/api/geocode/json";

export const GMP_ATTRIBUTION_ID = "gmp_mcp_codeassist_v1_aistudio";

// Rectangular bounding box covering Rwanda for Geocoding API v4 locationBias.
export const RWANDA_BOUNDING_BOX = {
  low: { latitude: -2.84, longitude: 28.85 },
  high: { latitude: -1.04, longitude: 30.9 },
};

const RWANDA_STRICT_BOUNDS = {
  minLat: -2.95,
  maxLat: -0.95,
  minLng: 28.75,
  maxLng: 31.0,
};

export const isWithinRwandaBounds = (lat, lng) => {
  const numLat = Number(lat);
  const numLng = Number(lng);
  if (!Number.isFinite(numLat) || !Number.isFinite(numLng)) return false;
  return (
    numLat >= RWANDA_STRICT_BOUNDS.minLat &&
    numLat <= RWANDA_STRICT_BOUNDS.maxLat &&
    numLng >= RWANDA_STRICT_BOUNDS.minLng &&
    numLng <= RWANDA_STRICT_BOUNDS.maxLng
  );
};

export const getGoogleMapsApiKey = () =>
  String(process.env.REACT_APP_GOOGLE_MAPS_API_KEY || "").trim();

export const buildRwandaGeocodeRequest = (query, apiKey) => {
  const trimmedQuery = String(query || "").trim();
  const trimmedKey = String(apiKey || "").trim();
  if (!trimmedQuery || !trimmedKey) return null;

  const params = new URLSearchParams({
    regionCode: "rw",
    languageCode: "en",
    "locationBias.rectangle.low.latitude": String(
      RWANDA_BOUNDING_BOX.low.latitude
    ),
    "locationBias.rectangle.low.longitude": String(
      RWANDA_BOUNDING_BOX.low.longitude
    ),
    "locationBias.rectangle.high.latitude": String(
      RWANDA_BOUNDING_BOX.high.latitude
    ),
    "locationBias.rectangle.high.longitude": String(
      RWANDA_BOUNDING_BOX.high.longitude
    ),
  });

  const url = `${RWANDA_GEOCODE_ENDPOINT}/${encodeURIComponent(
    trimmedQuery
  )}?${params.toString()}`;

  return {
    url,
    headers: {
      "Content-Type": "application/json",
      "X-Goog-Api-Key": trimmedKey,
      "X-Goog-Maps-Solution-ID": GMP_ATTRIBUTION_ID,
      "X-Goog-FieldMask":
        "results.placeId,results.formattedAddress,results.location,results.viewport,results.postalAddress,results.types",
    },
  };
};

export const buildRwandaGeocodeJsonUrl = (query, apiKey) => {
  const trimmedQuery = String(query || "").trim();
  const trimmedKey = String(apiKey || "").trim();
  if (!trimmedQuery || !trimmedKey) return null;

  const params = new URLSearchParams({
    address: trimmedQuery,
    components: "country:RW",
    region: "rw",
    language: "en",
    bounds: `${RWANDA_BOUNDING_BOX.low.latitude},${RWANDA_BOUNDING_BOX.low.longitude}|${RWANDA_BOUNDING_BOX.high.latitude},${RWANDA_BOUNDING_BOX.high.longitude}`,
    key: trimmedKey,
  });

  return `${RWANDA_GEOCODE_LEGACY_ENDPOINT}?${params.toString()}`;
};

const parseViewport = (viewport) => {
  const lowLat = Number(viewport?.low?.latitude ?? viewport?.southwest?.lat);
  const lowLng = Number(viewport?.low?.longitude ?? viewport?.southwest?.lng);
  const highLat = Number(viewport?.high?.latitude ?? viewport?.northeast?.lat);
  const highLng = Number(viewport?.high?.longitude ?? viewport?.northeast?.lng);
  if (
    !Number.isFinite(lowLat) ||
    !Number.isFinite(lowLng) ||
    !Number.isFinite(highLat) ||
    !Number.isFinite(highLng)
  ) {
    return null;
  }
  return {
    low: { latitude: lowLat, longitude: lowLng },
    high: { latitude: highLat, longitude: highLng },
  };
};

const isDistrictOrCityResult = (types = []) => {
  if (!Array.isArray(types)) return false;
  return types.some((t) =>
    [
      "locality",
      "administrative_area_level_1",
      "administrative_area_level_2",
      "administrative_area_level_3",
      "sublocality",
    ].includes(t)
  );
};

export const parseGeocodeV4Response = (payload, rawQuery = "") => {
  const results = Array.isArray(payload?.results) ? payload.results : [];
  if (results.length === 0) return null;

  // Client-side post-filtering: prefer results explicitly in Rwanda (RW),
  // falling back to Rwanda coordinate bounds if postalAddress is omitted.
  const rwandaMatch =
    results.find(
      (item) =>
        String(item?.postalAddress?.regionCode || "").toUpperCase() === "RW" &&
        Number.isFinite(Number(item?.location?.latitude)) &&
        Number.isFinite(Number(item?.location?.longitude))
    ) ||
    results.find((item) =>
      isWithinRwandaBounds(
        item?.location?.latitude,
        item?.location?.longitude
      )
    );

  if (!rwandaMatch) return null;

  const lat = Number(rwandaMatch.location.latitude);
  const lng = Number(rwandaMatch.location.longitude);
  if (!Number.isFinite(lat) || !Number.isFinite(lng)) return null;

  const viewport = parseViewport(rwandaMatch.viewport);
  const formattedAddress =
    String(rwandaMatch.formattedAddress || "").trim() ||
    `${String(rawQuery || "").trim()}, Rwanda`;

  return {
    lat,
    lng,
    viewport,
    zoom: isDistrictOrCityResult(rwandaMatch.types) ? 12 : 14,
    formattedAddress,
    placeId: rwandaMatch.placeId || null,
    source: "google",
  };
};

export const parseGeocodeJsonResponse = (payload, rawQuery = "") => {
  const results = Array.isArray(payload?.results) ? payload.results : [];
  if (results.length === 0) return null;

  const rwandaMatch =
    results.find((item) => {
      const comps = Array.isArray(item?.address_components)
        ? item.address_components
        : [];
      const hasRwCountry = comps.some(
        (c) =>
          Array.isArray(c?.types) &&
          c.types.includes("country") &&
          String(c.short_name || "").toUpperCase() === "RW"
      );
      const loc = item?.geometry?.location;
      return (
        hasRwCountry &&
        Number.isFinite(Number(loc?.lat)) &&
        Number.isFinite(Number(loc?.lng))
      );
    }) ||
    results.find((item) =>
      isWithinRwandaBounds(
        item?.geometry?.location?.lat,
        item?.geometry?.location?.lng
      )
    );

  if (!rwandaMatch) return null;

  const lat = Number(rwandaMatch.geometry.location.lat);
  const lng = Number(rwandaMatch.geometry.location.lng);
  if (!Number.isFinite(lat) || !Number.isFinite(lng)) return null;

  const viewport = parseViewport(rwandaMatch.geometry?.viewport);
  const formattedAddress =
    String(rwandaMatch.formatted_address || "").trim() ||
    `${String(rawQuery || "").trim()}, Rwanda`;

  return {
    lat,
    lng,
    viewport,
    zoom: isDistrictOrCityResult(rwandaMatch.types) ? 12 : 14,
    formattedAddress,
    placeId: rwandaMatch.place_id || null,
    source: "google",
  };
};

const formatDistrictLabel = (query = "") => {
  const cleaned = String(query || "")
    .trim()
    .replace(/\s+/g, " ");
  if (!cleaned) return "Rwanda";
  const cased = cleaned
    .split(" ")
    .map((w) => (w ? w[0].toUpperCase() + w.slice(1).toLowerCase() : ""))
    .join(" ");
  return /\brwanda\b/i.test(cased) ? cased : `${cased}, Rwanda`;
};

const tryDistrictFallback = (query, fallbackLookup) => {
  if (typeof fallbackLookup !== "function") return null;
  const localPoint = fallbackLookup(query);
  if (
    localPoint &&
    Number.isFinite(localPoint.lat) &&
    Number.isFinite(localPoint.lng)
  ) {
    return {
      ok: true,
      lat: localPoint.lat,
      lng: localPoint.lng,
      viewport: null,
      zoom: 12,
      formattedAddress: formatDistrictLabel(query),
      placeId: null,
      source: "district-fallback",
    };
  }
  return null;
};

export const geocodeRwandaLocation = async (
  query,
  {
    apiKey = getGoogleMapsApiKey(),
    fetchImpl = typeof fetch === "function" ? fetch : null,
    fallbackLookup = getRwandaCoords,
    signal,
  } = {}
) => {
  const trimmed = String(query || "").trim();
  if (!trimmed) {
    return {
      ok: false,
      code: "EMPTY_QUERY",
      message: "Enter a city or district in Rwanda (e.g. Kigali, Musanze, Huye).",
    };
  }

  const trimmedKey = String(apiKey || "").trim();
  if (!trimmedKey) {
    const fallbackResult = tryDistrictFallback(trimmed, fallbackLookup);
    if (fallbackResult) return fallbackResult;
    return {
      ok: false,
      code: "NO_API_KEY",
      message:
        "Configure REACT_APP_GOOGLE_MAPS_API_KEY to geocode any address, or search one of Rwanda's 30 districts (e.g. Kigali, Musanze, Huye).",
    };
  }

  if (typeof fetchImpl !== "function") {
    return {
      ok: false,
      code: "NETWORK_ERROR",
      message: "Unable to perform location search in this browser environment.",
    };
  }

  const req = buildRwandaGeocodeRequest(trimmed, trimmedKey);
  try {
    const response = await fetchImpl(req.url, {
      method: "GET",
      headers: req.headers,
      signal,
    });

    let payload = null;
    try {
      payload = await response.json();
    } catch (e) {
      payload = null;
    }

    const errorStatus = String(payload?.error?.status || "").toUpperCase();

    if (response.status === 429 || errorStatus === "RESOURCE_EXHAUSTED") {
      return {
        ok: false,
        code: "QUOTA_EXCEEDED",
        message:
          "Location search quota is currently exhausted. Please try again later.",
      };
    }

    // If Geocoding API v4 returns 401/403 (e.g. key only enables standard Geocoding REST API or is not enabled for v4),
    // try the standard Geocoding JSON endpoint before falling back to local districts.
    if (
      response.status === 401 ||
      response.status === 403 ||
      errorStatus === "PERMISSION_DENIED"
    ) {
      const legacyUrl = buildRwandaGeocodeJsonUrl(trimmed, trimmedKey);
      if (legacyUrl) {
        try {
          const jsonRes = await fetchImpl(legacyUrl, { method: "GET", signal });
          const jsonPayload = await jsonRes.json().catch(() => null);
          const jsonStatus = String(jsonPayload?.status || "").toUpperCase();

          if (jsonStatus === "OK") {
            const parsedJson = parseGeocodeJsonResponse(jsonPayload, trimmed);
            if (parsedJson) return { ok: true, ...parsedJson };
            return {
              ok: false,
              code: "NOT_FOUND",
              message: `No location matching "${trimmed}" was found in Rwanda.`,
            };
          }
          if (jsonStatus === "ZERO_RESULTS") {
            return {
              ok: false,
              code: "NOT_FOUND",
              message: `No location matching "${trimmed}" was found in Rwanda.`,
            };
          }
          if (jsonRes.status === 429 || jsonStatus === "OVER_QUERY_LIMIT") {
            return {
              ok: false,
              code: "QUOTA_EXCEEDED",
              message:
                "Location search quota is currently exhausted. Please try again later.",
            };
          }
        } catch (err) {
          if (err?.name === "AbortError") {
            return { ok: false, code: "ABORTED", message: "" };
          }
        }
      }

      const fallbackResult = tryDistrictFallback(trimmed, fallbackLookup);
      if (fallbackResult) return fallbackResult;

      return {
        ok: false,
        code: "REQUEST_DENIED",
        message:
          "Unable to verify Google Maps Geocoding access. Check your API key and Geocoding API settings.",
      };
    }

    if (!response.ok) {
      return {
        ok: false,
        code: "API_ERROR",
        message:
          payload?.error?.message ||
          "Unable to look up that location right now. Please try again.",
      };
    }

    const parsed = parseGeocodeV4Response(payload, trimmed);
    if (!parsed) {
      return {
        ok: false,
        code: "NOT_FOUND",
        message: `No location matching "${trimmed}" was found in Rwanda.`,
      };
    }

    return { ok: true, ...parsed };
  } catch (error) {
    if (error?.name === "AbortError") {
      return { ok: false, code: "ABORTED", message: "" };
    }
    const fallbackResult = tryDistrictFallback(trimmed, fallbackLookup);
    if (fallbackResult) return fallbackResult;
    return {
      ok: false,
      code: "NETWORK_ERROR",
      message:
        "Unable to reach the geocoding service. Check your connection and try again.",
    };
  }
};
