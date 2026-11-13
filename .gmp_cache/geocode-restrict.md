# Restrict or Bias Geocoding Requests to Specific Regions, Countries, or Postal Codes

This workflow details how to constrain or influence a Geocoding API v4 request
to return results within a specific country, region, viewport, or postal code.

## Overview

In Geocoding API v4, restricting or biasing results to a specific geographic
area is achieved through three primary mechanisms:

1.  **Structured Address Components (`PostalAddress`):** Use query parameters
    such as `address.postalCode`, `address.regionCode`, `address.locality`, and
    `address.administrativeArea` to explicitly restrict forward geocoding
    searches to specific address components.
2.  **Region Biasing (`regionCode`):** Pass a two-character CLDR region code to
    bias forward geocoding results toward a specific country/region, or to
    format addresses according to regional conventions in reverse and place
    geocoding.
3.  **Location Biasing (`locationBias`):** Define a rectangular bounding box
    (`Viewport`) using southwest (`low`) and northeast (`high`)
    latitude/longitude coordinates to bias results toward a specific geographic
    area.

> **Important Note on Restrictions vs. Biasing:** In Geocoding API v4,
> `regionCode` and `locationBias` act as strong biases rather than strict
> filters. They instruct the service to prefer results within the specified
> region or viewport, though results outside the area may still be returned if
> an explicit location in the query overrides the bias. To strictly target
> specific postal codes or administrative areas, pass a structured
> `PostalAddress` in your query parameters.

--------------------------------------------------------------------------------

## 1. Restrict by Postal Code or Country (Structured Address)

When you need to restrict a forward geocoding request to a specific postal code,
locality, administrative area, or country, use the structured address endpoint
(`https://geocode.googleapis.com/v4/geocode/address?STRUCTURED_ADDRESS`) and
pass
[`PostalAddress`](https://developers.google.com/maps/documentation/geocoding/reference/rest/Shared.Types/PostalAddress)
fields as query parameters.

### Supported `PostalAddress` Query Parameters

*   `address.postalCode`: Restricts the search to a specific postal or ZIP code
    (e.g., `01062`).
*   `address.regionCode`: Restricts the structured address to a two-character
    CLDR country/region code (e.g., `US`, `ES`).
*   `address.administrativeArea`: Specifies the state, province, or region
    (e.g., `CA`).
*   `address.locality`: Specifies the city or town (e.g., `Mountain View`).
*   `address.addressLines`: Specifies the street address line (e.g., `1600
    Amphitheatre Pkwy`).

### Example: Restrict to a Specific Postal Code

```bash
curl -X GET \
  -H "X-Goog-Api-Key: YOUR_API_KEY" \
  -H "X-Goog-Maps-Solution-ID: gmp_git_agentskills_v1" \
  -H "X-Goog-FieldMask: results.placeId,results.formattedAddress,results.location" \
  "https://geocode.googleapis.com/v4/geocode/address?address.postalCode=01062&address.regionCode=US"
```

### Example: Combine Street Address with City and State Constraints

```bash
curl -X GET \
  -H "X-Goog-Api-Key: YOUR_API_KEY" \
  -H "X-Goog-Maps-Solution-ID: gmp_git_agentskills_v1" \
  -H "X-Goog-FieldMask: results.placeId,results.formattedAddress,results.location,results.postalAddress" \
  "https://geocode.googleapis.com/v4/geocode/address?address.addressLines=1600+Amphitheatre+Pkwy&address.locality=Mountain+View&address.administrativeArea=CA&address.postalCode=94043&address.regionCode=US"
```

--------------------------------------------------------------------------------

## 2. Bias by Country or Region (`regionCode`)

Use the `regionCode` parameter to instruct the Geocoding service to prefer
results within a particular country or territory.

*   **Parameter:** `regionCode`
*   **Format:** Two-character
    [CLDR code](https://www.unicode.org/cldr/charts/latest/supplemental/territory_language_information.html)
    (mostly identical to ISO 3166-1 alpha-2 codes, such as `us`, `es`, `gb`).
*   **Behavior in Forward Geocoding:** Influences the service to return results
    within the specified region (e.g., searching for `"Toledo"` with
    `regionCode=es` returns Toledo, Spain instead of Toledo, Ohio, USA).
*   **Behavior in Reverse & Place Geocoding:** Formats the returned
    `formattedAddress` according to the conventions of the specified region and
    applicable local laws.

### Example: Geocode an Ambiguous City Name with Region Biasing

Without `regionCode`, a query for `Toledo` returns both Toledo, OH, USA and
Toledo, Spain. Adding `regionCode=es` restricts the returned results to Spain:

```bash
curl -X GET \
  -H "X-Goog-Api-Key: YOUR_API_KEY" \
  -H "X-Goog-Maps-Solution-ID: gmp_git_agentskills_v1" \
  -H "X-Goog-FieldMask: results.placeId,results.formattedAddress,results.location" \
  "https://geocode.googleapis.com/v4/geocode/address/Toledo?regionCode=es"
```

--------------------------------------------------------------------------------

## 3. Bias to a Specific Geographic Viewport (`locationBias`)

Use the `locationBias` parameter to prefer results within a rectangular bounding
box (`Viewport`).

### Viewport Rules and Constraints

*   **Southwest Corner (`low`):** Defined by
    `locationBias.rectangle.low.latitude` and
    `locationBias.rectangle.low.longitude`.
*   **Northeast Corner (`high`):** Defined by
    `locationBias.rectangle.high.latitude` and
    `locationBias.rectangle.high.longitude`.
*   **Latitude Range:** Must be between `-90` and `90` degrees inclusive.
    `low.latitude` cannot be greater than `high.latitude` (which would result in
    an empty range error).
*   **Longitude Range:** Must be between `-180` and `180` degrees inclusive. If
    `low.longitude` > `high.longitude`, the viewport is inverted and crosses the
    180-degree meridian.
*   **Non-Empty Requirement:** Both `low` and `high` points must be populated,
    and the box cannot be empty.
*   **Override Behavior:** If the unstructured address string contains an
    explicit location outside the viewport (e.g., `"Barcelona, Spain"`),
    `locationBias` is ignored.

### Example: Bias a Request Using a Rectangular Bounding Box

A query for `"Washington"` normally returns both Washington, D.C. and the US
State of Washington. By applying a `locationBias` bounding box around the
Northeast US, the response resolves strictly to Washington, D.C.:

```bash
curl -X GET \
  -H "X-Goog-Api-Key: YOUR_API_KEY" \
  -H "X-Goog-Maps-Solution-ID: gmp_git_agentskills_v1" \
  -H "X-Goog-FieldMask: results.placeId,results.formattedAddress,results.location,results.viewport" \
  "https://geocode.googleapis.com/v4/geocode/address/Washington?locationBias.rectangle.low.latitude=36.47&locationBias.rectangle.low.longitude=-84.72&locationBias.rectangle.high.latitude=43.39&locationBias.rectangle.high.longitude=-65.90"
```

--------------------------------------------------------------------------------

## 4. Programmatic Implementation (JavaScript / Node.js)

The following example demonstrates how to construct properly URL-encoded
Geocoding API v4 requests in JavaScript using structured postal codes,
`regionCode`, and `locationBias`.

```javascript
const API_KEY = process.env.GOOGLE_MAPS_API_KEY;
const BASE_URL = 'https://geocode.googleapis.com/v4/geocode/address';

/**
 * Geocode using a structured PostalAddress (e.g., restrict to postalCode and regionCode)
 */
async function geocodeByPostalCode(postalCode, regionCode) {
  const params = new URLSearchParams({
    'address.postalCode': postalCode,
    'address.regionCode': regionCode,
  });

  const response = await fetch(`${BASE_URL}?${params.toString()}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'X-Goog-Api-Key': API_KEY,
      'X-Goog-Maps-Solution-ID': 'gmp_git_agentskills_v1',
      'X-Goog-FieldMask': 'results.placeId,results.formattedAddress,results.location,results.postalAddress',
    },
  });

  if (!response.ok) {
    throw new Error(`Geocoding error: ${response.status} ${response.statusText}`);
  }

  return response.json();
}

/**
 * Geocode an unstructured address with regionCode and rectangular locationBias
 */
async function geocodeWithRegionAndViewport(address, regionCode, viewport) {
  const encodedAddress = encodeURIComponent(address);
  const params = new URLSearchParams({
    regionCode: regionCode,
    'locationBias.rectangle.low.latitude': viewport.low.latitude.toString(),
    'locationBias.rectangle.low.longitude': viewport.low.longitude.toString(),
    'locationBias.rectangle.high.latitude': viewport.high.latitude.toString(),
    'locationBias.rectangle.high.longitude': viewport.high.longitude.toString(),
  });

  const response = await fetch(`${BASE_URL}/${encodedAddress}?${params.toString()}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'X-Goog-Api-Key': API_KEY,
      'X-Goog-Maps-Solution-ID': 'gmp_git_agentskills_v1',
      'X-Goog-FieldMask': 'results.placeId,results.formattedAddress,results.location,results.types',
    },
  });

  if (!response.ok) {
    throw new Error(`Geocoding error: ${response.status} ${response.statusText}`);
  }

  return response.json();
}
```

--------------------------------------------------------------------------------

## 5. Client-Side Post-Filtering for Strict Restrictions

Because `regionCode` and `locationBias` act as biases rather than hard filters
on unstructured queries, applications that require strict containment (e.g.,
guaranteeing a result is inside a specific country or postal code) should
inspect the `postalAddress` or `addressComponents` fields in the
`GeocodeAddressResponse` and filter out non-matching entries:

````javascript
function filterResultsByRegionAndPostalCode(geocodeResponse, expectedRegionCode, expectedPostalCode) {
  if (!geocodeResponse.results) return [];

  return geocodeResponse.results.filter((result) => {
    const postal = result.postalAddress;
    if (!postal) return false;

    const matchesRegion = expectedRegionCode
      ? postal.regionCode?.toUpperCase() === expectedRegionCode.toUpperCase()
      : true;

    const matchesPostalCode = expectedPostalCode
      ? postal.postalCode === expectedPostalCode
      : true;

    return matchesRegion && matchesPostalCode;
  });
}
``` Ensure `results.postalAddress` is included in your `X-Goog-FieldMask` header when performing client-side verification.
````
