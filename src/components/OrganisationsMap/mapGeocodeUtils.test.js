import test from "node:test";
import assert from "node:assert/strict";

import {
  GMP_ATTRIBUTION_ID,
  RWANDA_GEOCODE_ENDPOINT,
  RWANDA_GEOCODE_LEGACY_ENDPOINT,
  buildRwandaGeocodeJsonUrl,
  buildRwandaGeocodeRequest,
  geocodeRwandaLocation,
  isWithinRwandaBounds,
  parseGeocodeJsonResponse,
  parseGeocodeV4Response,
} from "./mapGeocodeUtils.js";

test("buildRwandaGeocodeRequest and buildRwandaGeocodeJsonUrl construct Rwanda-scoped Geocoding requests", () => {
  const req = buildRwandaGeocodeRequest("Musanze", "test-key-123");
  assert.ok(req);
  assert.ok(req.url.startsWith(`${RWANDA_GEOCODE_ENDPOINT}/Musanze?`));
  assert.match(req.url, /regionCode=rw/);
  assert.match(req.url, /locationBias\.rectangle\.low\.latitude=-2\.84/);
  assert.equal(req.headers["X-Goog-Api-Key"], "test-key-123");
  assert.equal(req.headers["X-Goog-Maps-Solution-ID"], GMP_ATTRIBUTION_ID);
  assert.match(req.headers["X-Goog-FieldMask"], /results\.location/);
  assert.equal(buildRwandaGeocodeRequest("   ", "test-key-123"), null);
  assert.equal(buildRwandaGeocodeRequest("Kigali", ""), null);

  const jsonUrl = buildRwandaGeocodeJsonUrl("Huye", "test-key-123");
  assert.ok(jsonUrl);
  assert.ok(jsonUrl.startsWith(`${RWANDA_GEOCODE_LEGACY_ENDPOINT}?`));
  assert.match(jsonUrl, /components=country%3ARW/);
  assert.match(jsonUrl, /region=rw/);
});

test("parseGeocodeV4Response and parseGeocodeJsonResponse select Rwanda match with viewport", () => {
  const v4Payload = {
    results: [
      {
        placeId: "outside",
        formattedAddress: "Random Outside, UG",
        location: { latitude: 0.3476, longitude: 32.5825 },
        postalAddress: { regionCode: "UG" },
      },
      {
        placeId: "musanze-id",
        formattedAddress: "Musanze, Rwanda",
        location: { latitude: -1.4998, longitude: 29.6349 },
        viewport: {
          low: { latitude: -1.55, longitude: 29.58 },
          high: { latitude: -1.45, longitude: 29.69 },
        },
        postalAddress: { regionCode: "RW" },
        types: ["locality", "political"],
      },
    ],
  };

  const parsedV4 = parseGeocodeV4Response(v4Payload, "Musanze");
  assert.ok(parsedV4);
  assert.equal(parsedV4.placeId, "musanze-id");
  assert.equal(parsedV4.formattedAddress, "Musanze, Rwanda");
  assert.equal(parsedV4.lat, -1.4998);
  assert.equal(parsedV4.lng, 29.6349);
  assert.equal(parsedV4.zoom, 12);
  assert.equal(parsedV4.viewport.low.latitude, -1.55);
  assert.equal(parsedV4.source, "google");

  const jsonPayload = {
    status: "OK",
    results: [
      {
        place_id: "huye-json",
        formatted_address: "Butare, Rwanda",
        geometry: {
          location: { lat: -2.5967, lng: 29.7394 },
          viewport: {
            southwest: { lat: -2.63, lng: 29.7 },
            northeast: { lat: -2.56, lng: 29.77 },
          },
        },
        address_components: [{ short_name: "RW", types: ["country"] }],
        types: ["locality"],
      },
    ],
  };

  const parsedJson = parseGeocodeJsonResponse(jsonPayload, "Huye");
  assert.ok(parsedJson);
  assert.equal(parsedJson.placeId, "huye-json");
  assert.equal(parsedJson.lat, -2.5967);
  assert.equal(parsedJson.viewport.high.latitude, -2.56);
});

test("parseGeocodeV4Response rejects results outside Rwanda bounds", () => {
  const payload = {
    results: [
      {
        placeId: "paris",
        formattedAddress: "Paris, France",
        location: { latitude: 48.8566, longitude: 2.3522 },
        postalAddress: { regionCode: "FR" },
      },
    ],
  };
  assert.equal(parseGeocodeV4Response(payload, "Paris"), null);
  assert.equal(isWithinRwandaBounds(-1.9441, 30.0619), true);
  assert.equal(isWithinRwandaBounds(48.8566, 2.3522), false);
});

test("geocodeRwandaLocation executes Geocoding v4 and falls back to Geocoding JSON on v4 403", async () => {
  const calls = [];
  const mockFetch = async (url) => {
    calls.push(url);
    if (url.includes("geocode.googleapis.com/v4")) {
      return {
        ok: false,
        status: 403,
        json: async () => ({ error: { status: "PERMISSION_DENIED" } }),
      };
    }
    return {
      ok: true,
      status: 200,
      json: async () => ({
        status: "OK",
        results: [
          {
            place_id: "huye-place",
            formatted_address: "Butare, Rwanda",
            geometry: { location: { lat: -2.5967, lng: 29.7394 } },
            address_components: [{ short_name: "RW", types: ["country"] }],
            types: ["locality"],
          },
        ],
      }),
    };
  };

  const result = await geocodeRwandaLocation("Huye", {
    apiKey: "fake-api-key",
    fetchImpl: mockFetch,
  });

  assert.equal(calls.length, 2);
  assert.equal(result.ok, true);
  assert.equal(result.formattedAddress, "Butare, Rwanda");
  assert.equal(result.source, "google");
});

test("geocodeRwandaLocation handles HTTP 429, ZERO_RESULTS, denied non-district, and Rwanda district fallback cleanly", async () => {
  const quotaRes = await geocodeRwandaLocation("Kigali", {
    apiKey: "k",
    fetchImpl: async () => ({
      ok: false,
      status: 429,
      json: async () => ({ error: { status: "RESOURCE_EXHAUSTED" } }),
    }),
  });
  assert.equal(quotaRes.ok, false);
  assert.equal(quotaRes.code, "QUOTA_EXCEEDED");

  const deniedNonDistrict = await geocodeRwandaLocation("UnknownStreet999", {
    apiKey: "k",
    fetchImpl: async () => ({
      ok: false,
      status: 403,
      json: async () => ({ error: { status: "PERMISSION_DENIED" } }),
    }),
  });
  assert.equal(deniedNonDistrict.ok, false);
  assert.equal(deniedNonDistrict.code, "REQUEST_DENIED");

  const deniedDistrict = await geocodeRwandaLocation("Musanze", {
    apiKey: "k",
    fetchImpl: async () => ({
      ok: false,
      status: 403,
      json: async () => ({ error: { status: "PERMISSION_DENIED" } }),
    }),
  });
  assert.equal(deniedDistrict.ok, true);
  assert.equal(deniedDistrict.source, "district-fallback");
  assert.equal(deniedDistrict.formattedAddress, "Musanze, Rwanda");

  const emptyRes = await geocodeRwandaLocation("NowhereInRwanda", {
    apiKey: "k",
    fetchImpl: async () => ({
      ok: true,
      status: 200,
      json: async () => ({ results: [] }),
    }),
  });
  assert.equal(emptyRes.ok, false);
  assert.equal(emptyRes.code, "NOT_FOUND");

  const fallbackHit = await geocodeRwandaLocation("rubavu", { apiKey: "" });
  assert.equal(fallbackHit.ok, true);
  assert.equal(fallbackHit.source, "district-fallback");
  assert.equal(fallbackHit.formattedAddress, "Rubavu, Rwanda");
  assert.ok(isWithinRwandaBounds(fallbackHit.lat, fallbackHit.lng));
});
