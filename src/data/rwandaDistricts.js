// Approximate centers of Rwanda's districts (WGS84, open data).
// Used to pin employer locations on the map when only a city/district
// name is known. Coordinates are approximate city centers.
const RWANDA_DISTRICT_COORDS = [
  // Kigali
  { names: ["gasabo"], lat: -1.92, lng: 30.1 },
  { names: ["kicukiro"], lat: -1.97, lng: 30.12 },
  { names: ["nyarugenge", "kigali"], lat: -1.9441, lng: 30.0619 },
  // Northern Province
  { names: ["musanze"], lat: -1.5, lng: 29.63 },
  { names: ["burera"], lat: -1.55, lng: 29.82 },
  { names: ["gakenke"], lat: -1.71, lng: 29.78 },
  { names: ["rulindo"], lat: -1.72, lng: 29.99 },
  { names: ["gicumbi"], lat: -1.62, lng: 30.1 },
  // Southern Province
  { names: ["huye", "butare"], lat: -2.6, lng: 29.75 },
  { names: ["muhanga", "gitarama"], lat: -2.08, lng: 29.73 },
  { names: ["ruhango"], lat: -2.23, lng: 29.78 },
  { names: ["nyanza"], lat: -2.35, lng: 29.75 },
  { names: ["gisagara"], lat: -2.65, lng: 29.85 },
  { names: ["nyaruguru"], lat: -2.75, lng: 29.55 },
  { names: ["kamonyi"], lat: -2.0, lng: 29.88 },
  // Eastern Province
  { names: ["bugesera"], lat: -2.3, lng: 30.03 },
  { names: ["rwamagana"], lat: -1.95, lng: 30.43 },
  { names: ["kayonza"], lat: -1.87, lng: 30.65 },
  { names: ["kirehe"], lat: -2.05, lng: 30.75 },
  { names: ["ngoma", "kibungo"], lat: -2.1, lng: 30.53 },
  { names: ["nyagatare"], lat: -1.65, lng: 30.32 },
  { names: ["gatsibo"], lat: -1.72, lng: 30.45 },
  // Western Province
  { names: ["rubavu", "gisenyi"], lat: -1.68, lng: 29.28 },
  { names: ["rusizi", "cyangugu"], lat: -2.48, lng: 28.91 },
  { names: ["karongi", "kibuye"], lat: -2.05, lng: 29.35 },
  { names: ["rutsiro"], lat: -1.93, lng: 29.32 },
  { names: ["ngororero"], lat: -1.85, lng: 29.63 },
  { names: ["nyabihu"], lat: -1.65, lng: 29.5 },
  { names: ["nyamasheke"], lat: -2.35, lng: 29.15 },
];

const normalize = (value = "") =>
  String(value || "")
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");

// Best-effort match of a city/district name to coordinates.
export const getRwandaCoords = (cityName) => {
  const normalized = normalize(cityName).trim();
  if (!normalized) return null;

  // Exact alias match first.
  for (const entry of RWANDA_DISTRICT_COORDS) {
    if (entry.names.includes(normalized)) {
      return { lat: entry.lat, lng: entry.lng };
    }
  }

  // Then containment match (e.g. "Musanze District" -> musanze).
  for (const entry of RWANDA_DISTRICT_COORDS) {
    if (entry.names.some((alias) => normalized.includes(alias))) {
      return { lat: entry.lat, lng: entry.lng };
    }
  }

  return null;
};

export default RWANDA_DISTRICT_COORDS;
