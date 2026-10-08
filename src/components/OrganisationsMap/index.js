import "leaflet/dist/leaflet.css";
import "./styles.css";
import * as React from "react";
import { Link as RouterLink } from "react-router-dom";
import {
  Box,
  Button,
  Card,
  Chip,
  Divider,
  FormControlLabel,
  Grid,
  InputAdornment,
  MenuItem,
  Skeleton,
  Stack,
  Switch,
  TextField,
  Typography,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import BusinessIcon from "@mui/icons-material/Business";
import WorkOutlineIcon from "@mui/icons-material/WorkOutline";
import MyLocationIcon from "@mui/icons-material/MyLocation";
import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";
import L from "leaflet";

import jobService from "../../services/jobService";
import { IMAGES } from "../../configs/constants";
import ClaimOrganisationButton, { buildClaimUrl } from "../ClaimOrganisationButton";
import useOrganisations, { colorFor } from "./useOrganisations";
import useOrgFilters from "./useOrgFilters";

const RWANDA_CENTER = [-1.9441, 30.0619];

const escapeAttr = (value = "") => String(value || "").replace(/"/g, "&quot;");

const initialsOf = (name = "") =>
  String(name || "")
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase() || "IM";

// Pro pin: logo in a ring coloured by sector + open-roles badge +
// Imyanya profile badge (profiled employers carry the green check).
const orgPin = (org) => {
  const color = colorFor(org.sector);
  const badge =
    org.jobPostNumber > 0
      ? `<span class="org-pin-badge">${org.jobPostNumber > 9 ? "9+" : org.jobPostNumber}</span>`
      : "";
  const profileBadge = org.hasProfile
    ? `<span class="org-pin-profile">✓</span>`
    : "";
  // Sample directory logos are placeholder paths that may not ship in
  // public/ — render initials underneath and hide a broken img gracefully.
  const hasLogo = Boolean(org.logo);
  const inner =
    `<span class="org-pin-initials">${escapeAttr(initialsOf(org.companyName))}</span>` +
    (hasLogo
      ? `<img src="${escapeAttr(org.logo)}" alt="${escapeAttr(org.companyName)}" loading="lazy" onerror="this.style.display='none'" />`
      : "");
  return L.divIcon({
    className: "org-pin",
    html:
      `<div class="org-pin-circle" style="--pin:${color}">` +
      inner +
      `</div>` +
      `<div class="org-pin-tail" style="--pin:${color}"></div>` +
      badge +
      profileBadge,
    iconSize: [46, 56],
    iconAnchor: [23, 52],
    popupAnchor: [0, -52],
  });
};

// Green briefcase pin for individual job opportunities posted with a
// pinned address — shops and self-employers included.
const jobSpotPin = (spot) => {
  const count = spot.jobs.length;
  const badge = count > 1 ? `<span class="org-pin-badge">${count > 9 ? "9+" : count}</span>` : "";
  return L.divIcon({
    className: "org-pin job-pin",
    html:
      `<div class="org-pin-circle job-pin-circle">` +
      `<svg viewBox="0 0 24 24" width="20" height="20" fill="#fff"><path d="M20 6h-3V4a2 2 0 0 0-2-2H9a2 2 0 0 0-2 2v2H4a2 2 0 0 0-2 2v11a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2zM9 4h6v2H9V4zm11 15H4V8h3v2h2V8h6v2h2V8h3v11z"/></svg>` +
      `</div>` +
      `<div class="org-pin-tail" style="--pin:#137333"></div>` +
      badge,
    iconSize: [46, 56],
    iconAnchor: [23, 52],
    popupAnchor: [0, -52],
  });
};

// Popup for a job spot: every opportunity posted at that address.
const JobSpotPopup = ({ spot }) => (
  <Box sx={{ minWidth: 230, maxWidth: 280 }}>
    <Typography fontWeight={800} sx={{ color: "#1a1a2e" }}>
      {spot.jobs.length > 1 ? `${spot.jobs.length} opportunities here` : spot.jobs[0]?.jobName}
    </Typography>
    <Typography
      variant="caption"
      sx={{ display: "flex", alignItems: "center", gap: 0.5, color: "#5f6368", mt: 0.25 }}
    >
      <LocationOnIcon sx={{ fontSize: 14 }} />
      {spot.address || `${spot.cityName}, Rwanda`}
    </Typography>
    <Stack spacing={0.5} sx={{ mt: 1, mb: 0.5 }}>
      {spot.jobs.slice(0, 4).map((job) => (
        <Box key={job.slug}>
          <Typography
            component={RouterLink}
            to={`/viec-lam/${job.slug}`}
            variant="body2"
            fontWeight={700}
            sx={{ color: "#1a73e8", textDecoration: "none", "&:hover": { textDecoration: "underline" } }}
          >
            {job.jobName}
          </Typography>
          <Typography
            variant="caption"
            color="text.secondary"
            sx={{ display: "block" }}
          >
            {job.companySlug ? (
              <Typography
                component={RouterLink}
                to={`/companies/${job.companySlug}`}
                variant="caption"
                sx={{ color: "#137333", textDecoration: "none", fontWeight: 700 }}
              >
                {job.companyName}
              </Typography>
            ) : (
              job.companyName
            )}
          </Typography>
        </Box>
      ))}
      {spot.jobs.length > 4 && (
        <Typography variant="caption" color="text.secondary">
          + {spot.jobs.length - 4} more at this address
        </Typography>
      )}
    </Stack>
  </Box>
);

const FitPins = ({ pins, resetKey }) => {
  const map = useMap();
  const flyingRef = React.useRef(null);

  const fitAll = React.useCallback(() => {
    if (pins.length === 0) {
      map.setView(RWANDA_CENTER, 8, { animate: true });
      return;
    }
    if (pins.length === 1) {
      map.flyTo([pins[0].lat, pins[0].lng], 13, { duration: 0.8 });
      return;
    }
    const bounds = L.latLngBounds(pins.map((p) => [p.lat, p.lng]));
    map.flyToBounds(bounds.pad(0.22), { duration: 0.8 });
  }, [map, pins]);

  React.useEffect(() => {
    fitAll();
  }, [fitAll, resetKey]);

  React.useEffect(() => {
    flyingRef.current = fitAll;
    map.fitAllPins = fitAll;
    return () => {
      if (map.fitAllPins === flyingRef.current) delete map.fitAllPins;
    };
  }, [fitAll, map]);

  return null;
};

const FlyController = ({ target }) => {
  const map = useMap();
  React.useEffect(() => {
    if (target) map.flyTo([target.lat, target.lng], 13, { duration: 0.8 });
  }, [map, target]);
  return null;
};

// Lazy active roles per pin so the map stays fast with 50+ orgs.
const OrgPinPopup = ({ org }) => {
  const [jobs, setJobs] = React.useState([]);
  const [loading, setLoading] = React.useState(Boolean(org.id));

  React.useEffect(() => {
    let mounted = true;
    if (!org.id) {
      setLoading(false);
      return undefined;
    }
    jobService
      .getJobPosts({ companyId: org.id, page: 1, pageSize: 3 })
      .then((res) => {
        if (!mounted) return;
        const results = res?.data?.results || res?.data || res?.results || [];
        setJobs(Array.isArray(results) ? results : []);
      })
      .catch(() => {})
      .finally(() => {
        if (mounted) setLoading(false);
      });
    return () => {
      mounted = false;
    };
  }, [org.id]);

  return (
    <Box sx={{ minWidth: 230, maxWidth: 280 }}>
      <Stack direction="row" spacing={1.2} alignItems="center">
        <Box
          component="img"
          src={org.logo}
          alt={org.companyName}
          loading="lazy"
          sx={{
            width: 40,
            height: 40,
            borderRadius: "50%",
            objectFit: "cover",
            border: `2px solid ${colorFor(org.sector)}`,
            bgcolor: "#fff",
          }}
          onError={(e) => {
            e.currentTarget.style.display = "none";
          }}
        />
        <Box sx={{ minWidth: 0 }}>
          <Typography fontWeight={800} noWrap sx={{ color: "#1a1a2e" }}>
            {org.companyName}
          </Typography>
          <Stack direction="row" spacing={0.5} sx={{ flexWrap: "wrap", rowGap: 0.5 }}>
            <Chip
              label={org.sector}
              size="small"
              sx={{
                height: 20,
                fontSize: 11,
                fontWeight: 700,
                bgcolor: `${colorFor(org.sector)}14`,
                color: colorFor(org.sector),
                border: `1px solid ${colorFor(org.sector)}33`,
              }}
            />
            <Chip
              label={org.hasProfile ? "✓ On Imyanya" : "No profile yet"}
              size="small"
              sx={{
                height: 20,
                fontSize: 11,
                fontWeight: 700,
                bgcolor: org.hasProfile ? "#13733314" : "#441da014",
                color: org.hasProfile ? "#137333" : "#441da0",
                border: `1px solid ${org.hasProfile ? "#13733333" : "#441da033"}`,
              }}
            />
          </Stack>
        </Box>
      </Stack>
      <Typography
        variant="caption"
        sx={{ display: "flex", alignItems: "center", gap: 0.5, color: "#5f6368", mt: 1 }}
      >
        <LocationOnIcon sx={{ fontSize: 14 }} />
        {org.address || `${org.cityName}, Rwanda`}
      </Typography>
      <Typography variant="caption" fontWeight={800} sx={{ display: "block", mt: 0.75, color: "#441da0" }}>
        {org.jobPostNumber > 0
          ? `${org.jobPostNumber} open role${org.jobPostNumber === 1 ? "" : "s"}`
          : "Explore employer profile"}
      </Typography>
      {loading ? (
        <Skeleton variant="text" width="75%" />
      ) : (
        jobs.length > 0 && (
          <Stack spacing={0.25} sx={{ mt: 0.5, mb: 0.5 }}>
            {jobs.map((job) => (
              <Typography
                key={job.slug || job.id}
                component={RouterLink}
                to={`/viec-lam/${job.slug}`}
                variant="caption"
                noWrap
                sx={{ color: "#1a73e8", textDecoration: "none", "&:hover": { textDecoration: "underline" } }}
              >
                • {job.jobName}
              </Typography>
            ))}
          </Stack>
        )
      )}
      <Button
        component={RouterLink}
        to={`/companies/${org.slug}`}
        size="small"
        variant="contained"
        fullWidth
        sx={{ mt: 1, textTransform: "none", fontWeight: 700, borderRadius: 2, bgcolor: "#441da0" }}
      >
        View organisation & roles
      </Button>
      {!org.hasProfile && (
        <Box sx={{ mt: 1.5, pt: 1.5, borderTop: "1px dashed #dadce0" }}>
          <ClaimOrganisationButton
            companyName={org.companyName}
            address={org.address}
            lat={org.lat}
            lng={org.lng}
            fullWidth
          />
        </Box>
      )}
    </Box>
  );
};

const OrganisationsMap = ({ title, subtitle, compact = false, hideHeader = false, defaultShow = "all" }) => {
  const { orgs, jobSpots, isLoading, isLoadingJobs } = useOrganisations();
  // Shared URL-synced filters so /companies and /rwanda-career-guide
  // always meet on the same query/sector/district/hiring state.
  const {
    query,
    draftQuery,
    setDraftQuery,
    setQuery,
    sector,
    setSector,
    district,
    setDistrict,
    hiringOnly,
    setHiringOnly,
    show,
    setShow,
    reset: resetSharedFilters,
  } = useOrgFilters({ defaultShow });
  const [flyTarget, setFlyTarget] = React.useState(null);
  const [resetKey, setResetKey] = React.useState(0);
  const mapCardRef = React.useRef(null);

  // Debounce typing -> URL so both pages stay in sync without
  // pushing a history entry per keystroke.
  const commitTimer = React.useRef(null);
  const handleQueryChange = (value) => {
    setDraftQuery(value);
    if (commitTimer.current) clearTimeout(commitTimer.current);
    commitTimer.current = setTimeout(() => setQuery(value), 350);
  };
  React.useEffect(
    () => () => {
      if (commitTimer.current) clearTimeout(commitTimer.current);
    },
    []
  );

  const handleReset = () => {
    if (commitTimer.current) clearTimeout(commitTimer.current);
    resetSharedFilters();
    setFlyTarget(null);
    setResetKey((k) => k + 1);
  };

  const flyToOrg = (org) => {
    setFlyTarget({ lat: org.lat, lng: org.lng, key: org.key });
    mapCardRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  const sectors = React.useMemo(() => {
    const set = new Set(orgs.map((o) => o.sector).filter(Boolean));
    return ["All", ...Array.from(set).sort()];
  }, [orgs]);

  const districts = React.useMemo(() => {
    const set = new Set(orgs.map((o) => o.cityName || o.district).filter(Boolean));
    return ["All", ...Array.from(set).sort()];
  }, [orgs]);

  const filtered = React.useMemo(() => {
    const q = query.trim().toLowerCase();
    return orgs.filter((o) => {
      if (sector !== "All" && o.sector !== sector) return false;
      if (district !== "All" && (o.cityName !== district && o.district !== district)) return false;
      if (hiringOnly && !(o.jobPostNumber > 0)) return false;
      if (!q) return true;
      return [o.companyName, o.sector, o.cityName, o.district, o.address]
        .join(" ")
        .toLowerCase()
        .includes(q);
    });
  }, [orgs, query, sector, district, hiringOnly]);

  const jobCount = React.useMemo(() => jobSpots.reduce((sum, s) => sum + s.jobs.length, 0), [jobSpots]);

  const filteredJobs = React.useMemo(() => {
    const q = query.trim().toLowerCase();
    return jobSpots.filter((spot) => {
      if (district !== "All" && (spot.cityName !== district && spot.district !== district)) return false;
      if (!q) return true;
      const haystack = [
        spot.address,
        spot.cityName,
        spot.district,
        ...spot.jobs.flatMap((j) => [j.jobName, j.companyName]),
      ]
        .join(" ")
        .toLowerCase();
      return haystack.includes(q);
    });
  }, [jobSpots, query, district]);

  const visibleOrgs = show === "jobs" ? [] : filtered;
  const visibleJobs = show === "orgs" ? [] : filteredJobs;
  const visiblePins = [
    ...visibleOrgs.map((o) => ({ lat: o.lat, lng: o.lng })),
    ...visibleJobs.map((s) => ({ lat: s.lat, lng: s.lng })),
  ];
  const showingJobs = show !== "orgs";

  return (
    <Box>
      {!hideHeader && (
      <Stack direction={{ xs: "column", sm: "row" }} spacing={1} alignItems={{ sm: "flex-end" }} justifyContent="space-between" sx={{ mb: 1.5 }}>
        <Box>
          <Typography
            variant="h4"
            component="h2"
            fontWeight={800}
            gutterBottom
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1,
              background: "linear-gradient(120deg, #2f1578 20%, #6d28d9 60%, #b45309 110%)",
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
              color: "transparent",
            }}
          >
            <LocationOnIcon color="primary" sx={{ color: "#6d28d9" }} />
            {title || "Explore Organisations on the Map"}
          </Typography>
          <Typography color="text.secondary" sx={{ maxWidth: 760, lineHeight: 1.7 }}>
            {subtitle ||
              "Every pin is a real opportunity place in Rwanda — organisations, shops and self-employers. Search, filter by sector, then click a pin to see open roles."}
          </Typography>
        </Box>
        <Stack direction="row" spacing={1} sx={{ flexWrap: "wrap" }}>
          <Chip icon={<BusinessIcon />} label={`${orgs.length} places`} color="primary" variant="outlined" />
          <Chip icon={<WorkOutlineIcon />} label={`${jobCount} jobs pinned`} color="success" variant={jobCount > 0 ? "filled" : "outlined"} />
        </Stack>
      </Stack>
      )}

      <Card
        variant="outlined"
        sx={{
          borderRadius: 3,
          p: { xs: 1.5, md: 2 },
          mb: 2,
          bgcolor: "linear-gradient(180deg, #fbfaff 0%, #f6f1ff 100%)",
          borderColor: "rgba(109, 40, 217, 0.22)",
          boxShadow: "0 8px 28px -12px rgba(109, 40, 217, 0.35)",
        }}
      >
        <Grid container spacing={1.5} alignItems="center">
          <Grid item xs={12} md={3}>
            <TextField
              fullWidth
              size="small"
              placeholder="Search place, job, sector, district…"
              value={draftQuery}
              onChange={(e) => handleQueryChange(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon fontSize="small" />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
          <Grid item xs={6} md={2}>
            <TextField fullWidth size="small" select label="Show" value={show} onChange={(e) => setShow(e.target.value)}>
              <MenuItem value="all">Places + jobs</MenuItem>
              <MenuItem value="orgs">Organisations</MenuItem>
              <MenuItem value="jobs">Jobs</MenuItem>
            </TextField>
          </Grid>
          <Grid item xs={6} md={2.5}>
            <TextField fullWidth size="small" select label="Sector" value={sector} onChange={(e) => setSector(e.target.value)} disabled={show === "jobs"}>
              {sectors.map((s) => (
                <MenuItem key={s} value={s}>
                  {s}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid item xs={6} md={2.5}>
            <TextField fullWidth size="small" select label="District / City" value={district} onChange={(e) => setDistrict(e.target.value)}>
              {districts.map((d) => (
                <MenuItem key={d} value={d}>
                  {d}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid item xs={6} md={2}>
            <FormControlLabel
              control={<Switch checked={hiringOnly} onChange={(e) => setHiringOnly(e.target.checked)} color="success" />}
              label="Hiring only"
            />
          </Grid>
          <Grid item xs={6} md={1}>
            <Button
              fullWidth
              variant="outlined"
              startIcon={<MyLocationIcon />}
              onClick={handleReset}
              sx={{ textTransform: "none", fontWeight: 700 }}
            >
              Reset
            </Button>
          </Grid>
        </Grid>
      </Card>

      <Card
        ref={mapCardRef}
        variant="outlined"
        sx={{
          borderRadius: 4,
          overflow: "hidden",
          height: compact ? 480 : 620,
          border: "1px solid rgba(109, 40, 217, 0.2)",
          boxShadow: (theme) => theme.customShadows.glow,
          scrollMarginTop: 80,
        }}
      >
        {(isLoading || isLoadingJobs) && visiblePins.length === 0 ? (
          <Skeleton variant="rectangular" width="100%" height="100%" />
        ) : (
          <MapContainer center={RWANDA_CENTER} zoom={8} scrollWheelZoom={false} style={{ height: "100%", width: "100%" }}>
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <FitPins pins={visiblePins} resetKey={resetKey} />
            <FlyController target={flyTarget} />
            {visibleOrgs.map((org) => (
              <Marker key={org.key} position={[org.lat, org.lng]} icon={orgPin(org)}>
                <Popup>
                  <OrgPinPopup org={org} />
                </Popup>
              </Marker>
            ))}
            {visibleJobs.map((spot) => (
              <Marker key={spot.key} position={[spot.lat, spot.lng]} icon={jobSpotPin(spot)}>
                <Popup>
                  <JobSpotPopup spot={spot} />
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        )}
      </Card>
      <Stack direction="row" spacing={1} sx={{ mt: 1.5, flexWrap: "wrap" }} alignItems="center">
        <Typography variant="caption" color="text.secondary" fontWeight={700}>
          Legend:
        </Typography>
        {sectors.slice(1, 7).map((s) => (
          <Chip
            key={s}
            label={s}
            size="small"
            sx={{
              height: 22,
              fontSize: 11,
              fontWeight: 700,
              color: colorFor(s),
              border: `1px solid ${colorFor(s)}44`,
              bgcolor: `${colorFor(s)}0f`,
              ".MuiChip-label": { px: 1 },
            }}
          />
        ))}
        <Chip
          label="✓ Imyanya profile"
          size="small"
          sx={{
            height: 22,
            fontSize: 11,
            fontWeight: 700,
            color: "#137333",
            border: "1px solid #13733344",
            bgcolor: "#1373330f",
            ".MuiChip-label": { px: 1 },
          }}
        />
        <Typography variant="caption" color="text.secondary" sx={{ ml: "auto" }}>
          Showing {visibleOrgs.length} places + {visibleJobs.length} job spots
          {(visibleOrgs.length !== orgs.length || visibleJobs.length !== jobSpots.length) ? " — zoom auto-fits your filter" : ""}
        </Typography>
      </Stack>

      <Card variant="outlined" sx={{ borderRadius: 3, mt: 2, overflow: "hidden" }}>
        <Box sx={{ p: 2, pb: 1 }}>
          <Typography fontWeight={800}>
            {showingJobs && visibleOrgs.length === 0
              ? `Job opportunities (${filteredJobs.reduce((n, s) => n + s.jobs.length, 0)})`
              : `Organisations ${filtered.length > 0 ? `(${filtered.length})` : ""}`}
          </Typography>
          <Typography variant="caption" color="text.secondary">
            Click a place to fly the map to its pin.
          </Typography>
        </Box>
        <Divider />
        <Box sx={{ p: 1.5 }}>
          {showingJobs && visibleOrgs.length === 0 ? (
            <>
              {filteredJobs.length === 0 && (
                <Box sx={{ p: 3, textAlign: "center" }}>
                  <WorkOutlineIcon sx={{ fontSize: 36, color: "grey.300" }} />
                  <Typography color="text.secondary" sx={{ mt: 1 }}>
                    No jobs match your filter. Try clearing search or district.
                  </Typography>
                </Box>
              )}
              <Grid container spacing={1.5}>
                {filteredJobs.slice(0, 30).map((spot) => (
                  <Grid item xs={12} sm={6} md={4} key={spot.key}>
                    <Card
                      variant="outlined"
                      sx={{
                        height: "100%",
                        borderRadius: 2,
                        cursor: "pointer",
                        borderColor: flyTarget?.key === spot.key ? "#137333" : "grey.200",
                        boxShadow: flyTarget?.key === spot.key ? "0 4px 16px #13733333" : 0,
                        "&:hover": { borderColor: "#137333", boxShadow: "0 4px 16px #13733322" },
                      }}
                      onClick={() => flyToOrg(spot)}
                    >
                      <Stack spacing={0.75} sx={{ p: 1.5 }}>
                        <Stack direction="row" spacing={1} alignItems="center">
                          <Box
                            sx={{
                              width: 36,
                              height: 36,
                              borderRadius: "50%",
                              bgcolor: "#137333",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              color: "#fff",
                              fontWeight: 800,
                              flexShrink: 0,
                            }}
                          >
                            {spot.jobs.length}
                          </Box>
                          <Box sx={{ minWidth: 0 }}>
                            <Typography fontWeight={700} noWrap sx={{ fontSize: 14 }}>
                              {spot.jobs.length > 1
                                ? `${spot.jobs.length} jobs at this address`
                                : spot.jobs[0]?.jobName}
                            </Typography>
                            <Typography variant="caption" color="text.secondary" noWrap sx={{ display: "flex", alignItems: "center", gap: 0.4 }}>
                              <LocationOnIcon sx={{ fontSize: 12 }} />
                              {spot.address || `${spot.cityName}, Rwanda`}
                            </Typography>
                          </Box>
                        </Stack>
                        <Stack spacing={0.25}>
                          {spot.jobs.slice(0, 3).map((job) => (
                            <Typography
                              key={job.slug}
                              component={RouterLink}
                              to={`/viec-lam/${job.slug}`}
                              variant="caption"
                              noWrap
                              sx={{ color: "#1a73e8", textDecoration: "none", "&:hover": { textDecoration: "underline" } }}
                            >
                              • {job.jobName} — {job.companyName}
                            </Typography>
                          ))}
                        </Stack>
                      </Stack>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </>
          ) : (
          <>
          {filtered.length === 0 && (
            <Box sx={{ p: 3, textAlign: "center" }}>
              <BusinessIcon sx={{ fontSize: 36, color: "grey.300" }} />
              <Typography color="text.secondary" sx={{ mt: 1 }}>
                No organisations match your filter. Try clearing search or sector.
              </Typography>
            </Box>
          )}
          <Grid container spacing={1.5}>
              {filtered.slice(0, 60).map((org) => (
                <Grid item xs={12} sm={6} md={4} key={org.key}>
                <Card
                  variant="outlined"
                  sx={{
                    height: "100%",
                    borderRadius: 2,
                    cursor: "pointer",
                    borderColor: flyTarget?.key === org.key ? colorFor(org.sector) : "grey.200",
                    boxShadow: flyTarget?.key === org.key ? `0 4px 16px ${colorFor(org.sector)}33` : 0,
                    "&:hover": { borderColor: colorFor(org.sector), boxShadow: `0 4px 16px ${colorFor(org.sector)}22` },
                  }}
                  onClick={() => flyToOrg(org)}
                >
                  <Stack direction="row" spacing={1.2} sx={{ p: 1.2 }} alignItems="center">
                    <Box
                      component="img"
                      src={org.logo}
                      alt={org.companyName}
                      loading="lazy"
                      sx={{ width: 44, height: 44, borderRadius: "50%", objectFit: "cover", border: `2px solid ${colorFor(org.sector)}`, flexShrink: 0, bgcolor: "#fff" }}
                      onError={(e) => {
                        e.currentTarget.src = IMAGES.coverImageDefault;
                      }}
                    />
                    <Box sx={{ minWidth: 0, flex: 1 }}>
                      <Typography fontWeight={700} noWrap sx={{ fontSize: 14 }}>
                        {org.companyName}
                      </Typography>
                      <Typography variant="caption" color="text.secondary" noWrap sx={{ display: "flex", alignItems: "center", gap: 0.4 }}>
                        <LocationOnIcon sx={{ fontSize: 12 }} />
                        {org.address || `${org.cityName}, Rwanda`}
                      </Typography>
                      <Stack direction="row" spacing={0.75} sx={{ mt: 0.5, flexWrap: "wrap", rowGap: 0.5 }} alignItems="center">
                        <Chip label={org.sector} size="small" sx={{ height: 20, fontSize: 10.5, fontWeight: 700, bgcolor: `${colorFor(org.sector)}14`, color: colorFor(org.sector) }} />
                        {org.hasProfile ? (
                          <Chip label="✓ On Imyanya" size="small" sx={{ height: 20, fontSize: 10.5, fontWeight: 700, bgcolor: "#13733314", color: "#137333", border: "1px solid #13733333" }} />
                        ) : (
                          <Chip label="No profile yet" size="small" sx={{ height: 20, fontSize: 10.5, fontWeight: 700, bgcolor: "#441da014", color: "#441da0", border: "1px solid #441da033" }} />
                        )}
                        {org.jobPostNumber > 0 ? (
                          <Chip label={`${org.jobPostNumber} role${org.jobPostNumber === 1 ? "" : "s"}`} size="small" color="success" sx={{ height: 20, fontSize: 10.5, fontWeight: 700 }} />
                        ) : (
                          <>
                          <Typography variant="caption" color="text.secondary">
                            {org.cityName}
                          </Typography>
                          {!org.hasProfile && (
                            <Button
                              component="a"
                              href={buildClaimUrl({
                                companyName: org.companyName,
                                address: org.address,
                                lat: org.lat,
                                lng: org.lng,
                              })}
                              target="_blank"
                              rel="noopener noreferrer"
                              onClick={(e) => e.stopPropagation()}
                              variant="outlined"
                              size="small"
                              fullWidth
                              sx={{ mt: 0.75, textTransform: 'none', fontWeight: 700 }}
                            >
                              Own this? Create profile
                            </Button>
                          )}
                          </>
                        )}
                      </Stack>
                    </Box>
                  </Stack>
                </Card>
                </Grid>
              ))}
              {filtered.length > 60 && (
                <Grid item xs={12}>
                <Typography variant="caption" color="text.secondary" sx={{ display: "block", textAlign: "center", py: 1 }}>
                  Showing first 60 — refine search to narrow down.
                </Typography>
                </Grid>
              )}
          </Grid>
          </>
          )}
        </Box>
            <Divider />
            <Box sx={{ p: 1.5 }}>
              <Button component={RouterLink} to="/companies" variant="text" fullWidth sx={{ textTransform: "none", fontWeight: 700 }}>
                View all companies hiring in Rwanda →
              </Button>
            </Box>
          </Card>
    </Box>
  );
};

export default OrganisationsMap;
