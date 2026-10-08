import * as React from "react";
import { useSelector } from "react-redux";

import companyService from "../../services/companyService";
import jobService from "../../services/jobService";
import { getRwandaCoords } from "../../data/rwandaDistricts";
import { sampleCompanies } from "../../data/content/companies";
import { IMAGES } from "../../configs/constants";

// Per-job exact positions hydrated from the detail endpoint (the list
// endpoint omits coordinates). Cached persistently — each job's detail is
// fetched once, then refreshed after 30 days.
const JOB_GEO_LS_KEY = "imyanya-job-geo-v1";
const JOB_GEO_GOOD_TTL_MS = 30 * 24 * 60 * 60 * 1000;
const JOB_GEO_EMPTY_TTL_MS = 7 * 24 * 60 * 60 * 1000;
const jobGeoCache = new Map();

try {
  const raw = localStorage.getItem(JOB_GEO_LS_KEY);
  if (raw) {
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed)) {
      parsed.slice(-500).forEach(([slug, entry]) => {
        if (slug && entry) jobGeoCache.set(slug, entry);
      });
    }
  }
} catch (error) {
  // storage unavailable — memory cache still works for the session
}

const persistJobGeo = () => {
  try {
    localStorage.setItem(
      JOB_GEO_LS_KEY,
      JSON.stringify(Array.from(jobGeoCache.entries()).slice(-500))
    );
  } catch (error) {
    // ignore quota/privacy errors
  }
};

const readJobGeo = (slug) => {
  const entry = jobGeoCache.get(slug);
  if (!entry) return undefined;
  const ttl = entry.ok ? JOB_GEO_GOOD_TTL_MS : JOB_GEO_EMPTY_TTL_MS;
  if (Date.now() - (entry.ts || 0) > ttl) {
    jobGeoCache.delete(slug);
    return undefined;
  }
  return entry;
};

// Same persistent hydration for companies: the list endpoint often omits
// coordinates (sometimes only a numeric city ID), so exact positions are
// hydrated once per company from its detail endpoint.
const COMPANY_GEO_LS_KEY = "imyanya-company-geo-v1";
const companyGeoCache = new Map();

try {
  const raw = localStorage.getItem(COMPANY_GEO_LS_KEY);
  if (raw) {
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed)) {
      parsed.slice(-500).forEach(([slug, entry]) => {
        if (slug && entry) companyGeoCache.set(slug, entry);
      });
    }
  }
} catch (error) {
  // storage unavailable — memory cache still works for the session
}

const persistCompanyGeo = () => {
  try {
    localStorage.setItem(
      COMPANY_GEO_LS_KEY,
      JSON.stringify(Array.from(companyGeoCache.entries()).slice(-500))
    );
  } catch (error) {
    // ignore quota/privacy errors
  }
};

const readCompanyGeo = (slug) => {
  const entry = companyGeoCache.get(slug);
  if (!entry) return undefined;
  const ttl = entry.ok ? JOB_GEO_GOOD_TTL_MS : JOB_GEO_EMPTY_TTL_MS;
  if (Date.now() - (entry.ts || 0) > ttl) {
    companyGeoCache.delete(slug);
    return undefined;
  }
  return entry;
};

export const SECTOR_COLORS = {
  Banking: "#441da0",
  Finance: "#6d28d9",
  Telecom: "#0288d1",
  Technology: "#00acc1",
  Health: "#d81b60",
  Education: "#43a047",
  NGO: "#2e7d32",
  Government: "#ef6c00",
  Hospitality: "#8d6e63",
  Logistics: "#546e7a",
  Retail: "#5c6bc0",
  Manufacturing: "#78909c",
  Agriculture: "#7cb342",
  Insurance: "#3949ab",
  default: "#441da0",
};

export const sectorOf = (company) => {
  const raw =
    company?.industry || company?.sector || company?.sectorName || "";
  const lower = String(raw).toLowerCase();
  if (lower.includes("bank")) return "Banking";
  if (lower.includes("financ") || lower.includes("insurance") || lower.includes("sacco") || lower.includes("capital"))
    return "Finance";
  if (lower.includes("telecom") || lower.includes("mtn") || lower.includes("airtel")) return "Telecom";
  if (lower.includes("tech") || lower.includes("software") || lower.includes("it ") || lower.includes("digital") || lower.includes("startup"))
    return "Technology";
  if (lower.includes("health") || lower.includes("hospital") || lower.includes("pharma")) return "Health";
  if (lower.includes("educ") || lower.includes("school") || lower.includes("university")) return "Education";
  if (lower.includes("ngo") || lower.includes("non-profit") || lower.includes("development") || lower.includes("humanitarian") || lower.includes("foundation"))
    return "NGO";
  if (lower.includes("govern") || lower.includes("ministry") || lower.includes("agency") || lower.includes("public"))
    return "Government";
  if (lower.includes("hotel") || lower.includes("hospitality") || lower.includes("tourism") || lower.includes("restaurant"))
    return "Hospitality";
  if (lower.includes("logist") || lower.includes("transport") || lower.includes("aviation") || lower.includes("airline"))
    return "Logistics";
  if (lower.includes("retail") || lower.includes("supermarket") || lower.includes("shop")) return "Retail";
  if (lower.includes("manufact") || lower.includes("brewery") || lower.includes("factory") || lower.includes("foods"))
    return "Manufacturing";
  if (lower.includes("agri") || lower.includes("farm")) return "Agriculture";
  return raw ? String(raw).split("&")[0].trim().slice(0, 22) : "Employer";
};

export const colorFor = (sector) => SECTOR_COLORS[sector] || SECTOR_COLORS.default;

// Strict coordinate parsing: empty strings become 0 under Number(""),
// which would pin places at Null Island (0,0) — treat them as missing.
const toCoord = (value) => {
  if (value === null || value === undefined || value === "") return null;
  const num = Number(value);
  return Number.isFinite(num) ? num : null;
};

const isNullIsland = (lat, lng) => lat === 0 && lng === 0;

const PAGE_SIZE = 100;
const MAX_PAGES = 20;

// Fetch every page so the map holds ALL available companies/jobs,
// not just the first page the API returns.
const fetchAllPages = async (fetchPage) => {
  const all = [];
  const seen = new Set();
  for (let page = 1; page <= MAX_PAGES; page += 1) {
    const res = await fetchPage(page);
    const results = res?.data?.results || res?.data || [];
    const list = Array.isArray(results) ? results : [];
    for (const item of list) {
      const key = item?.slug || item?.id;
      if (key && !seen.has(key)) {
        seen.add(key);
        all.push(item);
      }
    }
    const count = res?.data?.count;
    if (typeof count === "number" && all.length >= count) break;
    if (list.length < PAGE_SIZE) break;
  }
  return all;
};

export const toOrgsFromSamples = () =>
  (sampleCompanies || [])
    .filter((c) => c?.headquarters?.latitude && c?.headquarters?.longitude)
    .map((c) => {
      const sector = sectorOf(c);
      return {
        key: `sample-${c.slug || c.id}`,
        id: null,
        slug: c.slug || c.id,
        companyName: c.companyName,
        sector,
        hasProfile: false,
        cityName: c.headquarters.city,
        district: c.headquarters.district,
        address: c.headquarters.address,
        lat: Number(c.headquarters.latitude),
        lng: Number(c.headquarters.longitude),
        logo: c.logoUrl || IMAGES.coverImageDefault,
        jobPostNumber: 0,
        source: "directory",
      };
    });

// Module-level shared cache so /companies and /rwanda-career-guide
// (which both mount useOrganisations, sometimes twice on the same page)
// always meet on the same dataset instead of diverging between fetches.
let sharedOrgsCache = null;
let sharedJobSpotsCache = null;

const readSharedCache = () => ({
  orgs: sharedOrgsCache,
  jobSpots: sharedJobSpotsCache,
});

const writeSharedCache = ({ orgs, jobSpots }) => {
  if (orgs !== undefined) sharedOrgsCache = orgs;
  if (jobSpots !== undefined) sharedJobSpotsCache = jobSpots;
};

// Shared dataset: curated directory pins + live employers from the API
// (real coords when provided, district fallback otherwise) + every posted
// job as its own spot (exact pinned address when set, city/district center
// otherwise) — so shops and self-employers giving opportunities appear even
// without a big brand. Used by the map, the directory grid and Explore
// Company Culture so all sections always show the same places.
const useOrganisations = () => {
  const { allConfig } = useSelector((state) => state.config);
  const cached = readSharedCache();
  const [orgs, setOrgs] = React.useState(() => cached.orgs || toOrgsFromSamples());
  const [jobSpots, setJobSpots] = React.useState(() => cached.jobSpots || []);
  const [isLoading, setIsLoading] = React.useState(() => !cached.orgs);
  const [isLoadingJobs, setIsLoadingJobs] = React.useState(() => !cached.jobSpots);
  const [refreshKey, setRefreshKey] = React.useState(0);

  // Always refresh: poll for newly registered companies / posted jobs,
  // plus an instant refresh when the tab regains focus.
  React.useEffect(() => {
    const id = setInterval(() => setRefreshKey((k) => k + 1), 90000);
    const onFocus = () => setRefreshKey((k) => k + 1);
    window.addEventListener("focus", onFocus);
    return () => {
      clearInterval(id);
      window.removeEventListener("focus", onFocus);
    };
  }, []);

  React.useEffect(() => {
    let mounted = true;
    const loadCompanies = async () => {
      try {
        const list = await fetchAllPages((page) =>
          companyService.getCompanies({ page, pageSize: PAGE_SIZE })
        );
        if (!mounted) return;
        const cityCounters = {};
        const live = [];
        for (const company of list) {
          if (!company?.slug) continue;
          // Company registration saves the picked point as
          // location.{address, lat, lng} — read it first so every newly
          // registered company pins at its real address.
          const directLat = toCoord(
            company?.location?.lat ??
              company?.location?.latitude ??
              company?.locationDict?.latitude ??
              company?.latitude
          );
          const directLng = toCoord(
            company?.location?.lng ??
              company?.location?.longitude ??
              company?.locationDict?.longitude ??
              company?.longitude
          );
          // City/district arrive as option IDs on list items — resolve names.
          const rawCity =
            company?.locationDict?.cityName ??
            company?.locationDict?.city ??
            company?.cityName ??
            company?.location?.city ??
            "";
          const rawDistrict =
            company?.locationDict?.districtName ??
            company?.locationDict?.district ??
            company?.location?.district ??
            "";
          const cityName = String(
            allConfig?.cityDict?.[rawCity] ?? rawCity ?? ""
          );
          const districtName = String(
            allConfig?.cityDict?.[rawDistrict] ?? rawDistrict ?? ""
          );
          // Exact position, if the list item — or a previous detail
          // hydration — already carries coordinates.
          const cachedGeo = readCompanyGeo(company.slug);
          let lat = directLat;
          let lng = directLng;
          let address =
            company?.location?.address ||
            company?.locationDict?.address ||
            "";
          if (
            (lat === null || lng === null || isNullIsland(lat, lng)) &&
            cachedGeo?.ok &&
            cachedGeo.lat !== null &&
            cachedGeo.lng !== null
          ) {
            lat = cachedGeo.lat;
            lng = cachedGeo.lng;
            address = cachedGeo.address || address;
          }
          if (lat === null || lng === null || isNullIsland(lat, lng)) {
            const coords =
              getRwandaCoords(districtName) || getRwandaCoords(cityName);
            if (!coords) continue;
            const key = `${coords.lat},${coords.lng}`;
            cityCounters[key] = (cityCounters[key] || 0) + 1;
            const spread = cityCounters[key] - 1;
            const angle = spread * 1.1;
            const radius = 0.012 * Math.ceil(spread / 6);
            lat = coords.lat + Math.sin(angle) * radius;
            lng = coords.lng + Math.cos(angle) * radius;
          }
          live.push({
            key: `live-${company.slug}`,
            id: company.id,
            slug: company.slug,
            companyName: company.companyName || "Employer",
            sector: sectorOf(company),
            hasProfile: true,
            cityName: cityName || "Kigali",
            district: districtName || cityName || "Kigali",
            address,
            lat,
            lng,
            logo: company.companyImageUrl || IMAGES.coverImageDefault,
            jobPostNumber: Number(company.jobPostNumber || 0),
            source: "live",
          });
        }
        // Prefer live record when slug already exists in directory, and
        // drop stale live records so refreshes never show removed
        // companies or duplicate pins.
        const liveSlugs = new Set(live.map((o) => o.slug));
        if (!mounted) return;
        setOrgs((prev) => {
          const next = [
            ...live,
            ...prev.filter((o) => o.source !== "live" && !liveSlugs.has(o.slug)),
          ];
          writeSharedCache({ orgs: next });
          return next;
        });
        // Exact-position upgrade: the list endpoint often omits coordinates,
        // so hydrate each uncached company from its detail once (bounded per
        // refresh) and move its pin to the rooftop point.
        if (mounted) {
          const pending = [];
          for (const company of list) {
            if (!company?.slug || pending.length >= 10) continue;
            if (readCompanyGeo(company.slug) !== undefined) continue;
            pending.push(company.slug);
          }
          if (pending.length > 0) {
            Promise.allSettled(
              pending.map((slug) =>
                companyService.getCompanyDetailById(slug).then((res) => ({
                  slug,
                  loc: res?.data?.location || res?.location || {},
                }))
              )
            ).then((settled) => {
              if (!mounted) return;
              const geoBySlug = new Map();
              for (const result of settled) {
                if (result.status !== "fulfilled") continue;
                const { slug, loc } = result.value || {};
                if (!slug) continue;
                const lat = toCoord(loc.lat ?? loc.latitude);
                const lng = toCoord(loc.lng ?? loc.longitude);
                const address = String(loc.address || "").trim();
                if (lat !== null && lng !== null && !isNullIsland(lat, lng)) {
                  const entry = { ok: true, lat, lng, address, ts: Date.now() };
                  companyGeoCache.set(slug, entry);
                  geoBySlug.set(slug, entry);
                } else if (address) {
                  companyGeoCache.set(slug, {
                    ok: true,
                    lat: null,
                    lng: null,
                    address,
                    ts: Date.now(),
                  });
                } else {
                  companyGeoCache.set(slug, { ok: false, ts: Date.now() });
                }
              }
              persistCompanyGeo();
              if (geoBySlug.size === 0) return;
              setOrgs((prev) => {
                let moved = false;
                const next = prev.map((org) => {
                  if (org.source !== "live") return org;
                  const geo = geoBySlug.get(org.slug);
                  if (!geo || geo.lat === null || geo.lng === null) {
                    if (
                      geo &&
                      !org.address &&
                      geo.address
                    ) {
                      moved = true;
                      return { ...org, address: geo.address };
                    }
                    return org;
                  }
                  moved = true;
                  return {
                    ...org,
                    lat: geo.lat,
                    lng: geo.lng,
                    address: geo.address || org.address,
                  };
                });
                if (moved) writeSharedCache({ orgs: next });
                return moved ? next : prev;
              });
            });
          }
        }
      } catch (error) {
        // Keep the curated directory pins when the API is unreachable.
      } finally {
        if (mounted) setIsLoading(false);
      }
    };

    loadCompanies();
    return () => {
      mounted = false;
    };
    // allConfig (city names) may arrive after first paint — refetch then so
    // numeric city IDs resolve once names are known.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [refreshKey, allConfig]);

  // Every posted job becomes its own map spot, grouped when several jobs
  // share the same point (e.g. one shop hiring for multiple roles).
  // The list endpoint omits coordinates, so spots start at the
  // city/district center and are then upgraded to rooftop points hydrated
  // from each job's detail (bounded per refresh, cached persistently) —
  // no posted job is ever invisible.
  React.useEffect(() => {
    let mounted = true;
    const loadJobs = async () => {
      try {
        const list = await fetchAllPages((page) =>
          jobService.getJobPosts({ page, pageSize: PAGE_SIZE })
        );
        if (!mounted) return;
        const groups = new Map();
        const cityCounters = {};
        for (const job of list) {
          if (!job?.slug) continue;
          const loc = job?.location || {};
          const locDict = job?.locationDict || {};
          // location.city/district are option IDs (the list endpoint only
          // carries locationDict.city) — resolve display names for fallback.
          const rawCity = loc.city ?? locDict.city ?? "";
          const rawDistrict = loc.district ?? locDict.district ?? "";
          const cityName = String(
            allConfig?.cityDict?.[rawCity] ?? rawCity ?? ""
          );
          const districtName = String(
            allConfig?.cityDict?.[rawDistrict] ?? rawDistrict ?? ""
          );
          // Exact position, if the list item — or a previous detail
          // hydration — already carries coordinates.
          const cachedGeo = readJobGeo(job.slug);
          let lat = toCoord(loc.lat ?? loc.latitude);
          let lng = toCoord(loc.lng ?? loc.longitude);
          let exact = true;
          let address = loc.address || "";
          if (
            (lat === null || lng === null || isNullIsland(lat, lng)) &&
            cachedGeo?.ok &&
            cachedGeo.lat !== null &&
            cachedGeo.lng !== null
          ) {
            lat = cachedGeo.lat;
            lng = cachedGeo.lng;
            address = cachedGeo.address || address;
          }
          if (lat === null || lng === null || isNullIsland(lat, lng)) {
            exact = false;
            const coords =
              getRwandaCoords(districtName) || getRwandaCoords(cityName);
            if (!coords) continue;
            const spreadKey = `${coords.lat},${coords.lng}`;
            cityCounters[spreadKey] = (cityCounters[spreadKey] || 0) + 1;
            const spread = cityCounters[spreadKey] - 1;
            const angle = spread * 1.1;
            const radius = 0.012 * Math.ceil(spread / 6);
            lat = coords.lat + Math.sin(angle) * radius;
            lng = coords.lng + Math.cos(angle) * radius;
          }
          const key = `${lat.toFixed(4)},${lng.toFixed(4)}`;
          if (!groups.has(key)) {
            groups.set(key, {
              key: `job-spot-${key}`,
              kind: "job",
              lat,
              lng,
              exact,
              address: loc.address || "",
              cityName: cityName || districtName || "",
              district: districtName || cityName || "",
              jobs: [],
            });
          }
          const spot = groups.get(key);
          if (!spot.address && address) spot.address = address;
          spot.jobs.push({
            slug: job.slug,
            jobName: job.jobName || "Job opportunity",
            companyName: job?.companyDict?.companyName || "Employer",
            companySlug: job?.companyDict?.slug || null,
            logo: job?.companyDict?.companyImageUrl || null,
          });
        }
        if (mounted) {
          const spots = Array.from(groups.values());
          setJobSpots(spots);
          writeSharedCache({ jobSpots: spots });
        }
        // Exact-position upgrade: fetch each uncached job's detail once
        // (bounded per refresh) and move its spot to the rooftop point.
        if (mounted) {
          const pending = [];
          for (const job of list) {
            if (!job?.slug || pending.length >= 10) continue;
            if (readJobGeo(job.slug) !== undefined) continue;
            pending.push(job.slug);
          }
          if (pending.length > 0) {
            Promise.allSettled(
              pending.map((slug) =>
                jobService.getJobPostDetailById(slug).then((res) => ({
                  slug,
                  loc: res?.data?.location || res?.location || {},
                }))
              )
            ).then((settled) => {
              if (!mounted) return;
              const geoBySlug = new Map();
              for (const result of settled) {
                if (result.status !== "fulfilled") continue;
                const { slug, loc } = result.value || {};
                if (!slug) continue;
                const lat = toCoord(loc.lat ?? loc.latitude);
                const lng = toCoord(loc.lng ?? loc.longitude);
                const address = String(loc.address || "").trim();
                if (
                  lat !== null &&
                  lng !== null &&
                  !isNullIsland(lat, lng)
                ) {
                  const entry = { ok: true, lat, lng, address, ts: Date.now() };
                  jobGeoCache.set(slug, entry);
                  geoBySlug.set(slug, entry);
                } else if (address) {
                  jobGeoCache.set(slug, {
                    ok: true,
                    lat: null,
                    lng: null,
                    address,
                    ts: Date.now(),
                  });
                } else {
                  jobGeoCache.set(slug, { ok: false, ts: Date.now() });
                }
              }
              persistJobGeo();
              if (geoBySlug.size === 0) return;
              setJobSpots((prev) => {
                let moved = false;
                const next = prev.map((spot) => {
                  if (spot.kind !== "job" || spot.exact) return spot;
                  const hit = (spot.jobs || []).find((j) =>
                    geoBySlug.has(j.slug)
                  );
                  if (!hit) return spot;
                  const geo = geoBySlug.get(hit.slug);
                  if (geo.lat === null || geo.lng === null) {
                    if (!spot.address && geo.address) {
                      moved = true;
                      return { ...spot, address: geo.address };
                    }
                    return spot;
                  }
                  moved = true;
                  const newKey = `${geo.lat.toFixed(4)},${geo.lng.toFixed(4)}`;
                  return {
                    ...spot,
                    key: `job-spot-${newKey}`,
                    lat: geo.lat,
                    lng: geo.lng,
                    exact: true,
                    address: geo.address || spot.address,
                  };
                });
                if (moved) writeSharedCache({ jobSpots: next });
                return moved ? next : prev;
              });
            });
          }
        }
      } catch (error) {
        // Keep existing spots when a refresh fails.
      } finally {
        if (mounted) setIsLoadingJobs(false);
      }
    };

    loadJobs();
    return () => {
      mounted = false;
    };
    // allConfig (city names) may arrive after first paint — refetch then so
    // city-fallback pins resolve once names are known.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [refreshKey, allConfig]);

  return { orgs, jobSpots, isLoading, isLoadingJobs };
};

export default useOrganisations;
