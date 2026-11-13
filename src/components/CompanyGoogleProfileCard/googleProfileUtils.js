import {
  sanitizeEmployerLogoUrl,
  stripJobHtml,
} from "../JobsInRwandaExplorer/jobsExplorerUtils.js";

const cleanText = (value) => String(value || "").replace(/\s+/g, " ").trim();

const normalizeWebsiteUrl = (url) => {
  const raw = cleanText(url);
  if (!raw) return null;
  if (/^https?:\/\//i.test(raw)) return raw;
  if (/^[a-z0-9.-]+\.[a-z]{2,}(\/.*)?$/i.test(raw)) {
    return `https://${raw}`;
  }
  return null;
};

const formatDisplayHost = (url) => {
  if (!url) return null;
  try {
    const parsed = new URL(url);
    return parsed.hostname.replace(/^www\./i, "");
  } catch (e) {
    return url;
  }
};

export const buildGoogleProfileUrls = ({
  companyName,
  address,
  city,
  district,
  lat,
  lng,
  websiteUrl,
  industry,
} = {}) => {
  const name = cleanText(companyName);
  const placeParts = [cleanText(city), cleanText(district), "Rwanda"]
    .filter(Boolean)
    .filter((part, idx, arr) => arr.indexOf(part) === idx);
  const locationSuffix = placeParts.length > 0 ? placeParts.join(", ") : "Rwanda";

  const profileQuery = name
    ? `${name} ${cleanText(city) || "Rwanda"}`
    : "companies in Rwanda";
  const mapsQuery =
    lat !== undefined &&
    lat !== null &&
    lng !== undefined &&
    lng !== null &&
    String(lat).trim() !== "" &&
    String(lng).trim() !== "" &&
    Number.isFinite(Number(lat)) &&
    Number.isFinite(Number(lng))
      ? `${name ? `${name}, ` : ""}${Number(lat)},${Number(lng)}`
      : [name, cleanText(address), locationSuffix].filter(Boolean).join(", ");

  const reviewsQuery = name
    ? `${name} ${cleanText(city) || "Rwanda"} reviews`
    : "companies in Rwanda reviews";
  const photosQuery = name
    ? `${name} ${cleanText(city) || "Kigali"} Rwanda`
    : "Rwanda business";
  const jobsQuery = name
    ? `${name} jobs ${cleanText(city) || "Rwanda"}`
    : `jobs near Rwanda ${cleanText(industry)}`.trim();

  return {
    profileSearchUrl: `https://www.google.com/search?q=${encodeURIComponent(
      profileQuery
    )}&hl=en&gl=rw`,
    directionsUrl: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
      mapsQuery
    )}`,
    reviewsUrl: `https://www.google.com/search?q=${encodeURIComponent(
      reviewsQuery
    )}&hl=en&gl=rw`,
    photosUrl: `https://www.google.com/search?tbm=isch&q=${encodeURIComponent(
      photosQuery
    )}`,
    jobsUrl: `https://www.google.com/search?q=${encodeURIComponent(
      jobsQuery
    )}&udm=8&jbr=sep:0&hl=en&gl=rw`,
    websiteUrl: normalizeWebsiteUrl(websiteUrl),
    websiteHost: formatDisplayHost(normalizeWebsiteUrl(websiteUrl)),
  };
};

export const sanitizeCoverImageUrl = (url) => {
  const safe = sanitizeEmployerLogoUrl(url);
  if (!safe) return null;
  if (/company_cover_image_default\.(png|jpg|jpeg|webp)$/i.test(safe)) {
    return null;
  }
  return safe;
};

const buildCleanLocation = ({ address = "", district = "", city = "" } = {}) => {
  const addr = cleanText(address);
  const dist = cleanText(district);
  const cty = cleanText(city);
  const addrLower = addr.toLowerCase();

  const parts = [];
  if (addr) parts.push(addr);

  if (dist && !addrLower.includes(dist.toLowerCase())) {
    parts.push(dist);
  }

  if (cty) {
    const cityCore = cty.replace(/^city of\s+/i, "").trim().toLowerCase();
    const alreadyHasCity =
      addrLower.includes(cty.toLowerCase()) ||
      (cityCore && addrLower.includes(cityCore));
    if (!alreadyHasCity) {
      parts.push(cty);
    }
  }

  const joined = parts.join(", ");
  if (!joined) return "Rwanda";
  if (/\brwanda\b/i.test(joined)) return joined;
  return `${joined}, Rwanda`;
};

export const normalizeCompanyForGoogleProfile = ({
  companyDetail = null,
  directoryCompany = null,
  cityName = "",
  employeeSizeLabel = "",
} = {}) => {
  if (companyDetail) {
    const loc = companyDetail.location || {};
    const resolvedCity =
      cleanText(cityName) ||
      cleanText(companyDetail.locationDict?.cityName) ||
      "";
    const resolvedAddress = cleanText(loc.address);
    const fullLocation = buildCleanLocation({
      address: resolvedAddress,
      city: resolvedCity,
    });

    const rawImages = Array.isArray(companyDetail.companyImages)
      ? companyDetail.companyImages
          .map((img) => img?.imageUrl)
          .filter((u) => Boolean(sanitizeEmployerLogoUrl(u)))
      : [];
    const safeCover = sanitizeCoverImageUrl(companyDetail.companyCoverImageUrl);
    const safeLogo = sanitizeEmployerLogoUrl(companyDetail.companyImageUrl);

    return {
      companyName: cleanText(companyDetail.companyName) || "Employer in Rwanda",
      slug: cleanText(companyDetail.slug),
      category: cleanText(companyDetail.fieldOperation) || "Employer in Rwanda",
      tagline: "",
      descriptionText: stripJobHtml(companyDetail.description || ""),
      address: resolvedAddress,
      city: resolvedCity,
      district: "",
      fullLocation,
      lat: loc.lat ?? null,
      lng: loc.lng ?? null,
      phone: cleanText(companyDetail.companyPhone),
      email: cleanText(companyDetail.companyEmail),
      websiteUrl: normalizeWebsiteUrl(companyDetail.websiteUrl),
      sizeLabel: cleanText(employeeSizeLabel),
      foundedLabel: cleanText(companyDetail.since)
        ? String(companyDetail.since).slice(0, 4)
        : "",
      rating: null,
      reviewCount: null,
      pros: [],
      jobPostNumber: Number(companyDetail.jobPostNumber || 0),
      logoUrl: safeLogo,
      coverUrl: safeCover,
      images: rawImages,
      isRegistered: true,
    };
  }

  if (directoryCompany) {
    const hq = directoryCompany.headquarters || {};
    const reviews = directoryCompany.employeeReviews || {};
    const resolvedCity = cleanText(hq.city) || cleanText(cityName);
    const resolvedDistrict = cleanText(hq.district);
    const resolvedAddress = cleanText(hq.address);
    const fullLocation = buildCleanLocation({
      address: resolvedAddress,
      district: resolvedDistrict,
      city: resolvedCity,
    });

    return {
      companyName: cleanText(directoryCompany.companyName) || "Organisation in Rwanda",
      slug: cleanText(directoryCompany.slug || directoryCompany.id),
      category: cleanText(directoryCompany.industry) || "Organisation in Rwanda",
      tagline: cleanText(directoryCompany.tagline),
      descriptionText: stripJobHtml(
        directoryCompany.description || directoryCompany.cultureDescription || ""
      ),
      address: resolvedAddress,
      city: resolvedCity,
      district: resolvedDistrict,
      fullLocation,
      lat: hq.latitude ?? null,
      lng: hq.longitude ?? null,
      phone: cleanText(directoryCompany.phone),
      email: cleanText(directoryCompany.email),
      websiteUrl: normalizeWebsiteUrl(directoryCompany.website),
      sizeLabel: cleanText(directoryCompany.companySize)
        ? `${cleanText(directoryCompany.companySize)} employees`
        : "",
      foundedLabel: directoryCompany.foundedYear
        ? String(directoryCompany.foundedYear)
        : "",
      rating:
        typeof reviews.overallRating === "number" ? reviews.overallRating : null,
      reviewCount:
        typeof reviews.reviewCount === "number" ? reviews.reviewCount : null,
      pros: Array.isArray(reviews.pros) ? reviews.pros.slice(0, 3) : [],
      jobPostNumber: 0,
      logoUrl: null,
      coverUrl: null,
      images: [],
      isRegistered: false,
    };
  }

  return null;
};
