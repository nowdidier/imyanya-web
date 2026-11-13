export const CLUSTER_ANIMATION_OPTIONS = {
  animate: true,
  animateAddingMarkers: true,
  spiderfyOnMaxZoom: true,
  showCoverageOnHover: false,
  zoomToBoundsOnClick: true,
  removeOutsideVisibleBounds: true,
  maxClusterRadius: 52,
  spiderfyDistanceMultiplier: 1.35,
  chunkedLoading: false,
};

export const getClusterTier = (count = 0) => {
  const numeric = Number(count) || 0;
  if (numeric >= 25) return "large";
  if (numeric >= 10) return "medium";
  return "small";
};

export const getClusterIconSize = (tier) => {
  if (tier === "large") return [56, 56];
  if (tier === "medium") return [48, 48];
  return [40, 40];
};

export const formatClusterCount = (count = 0) => {
  const numeric = Math.max(0, Math.floor(Number(count) || 0));
  return numeric > 99 ? "99+" : String(numeric);
};

export const summarizeClusterMarkers = (markers = []) => {
  const list = Array.isArray(markers) ? markers : [];
  let orgCount = 0;
  let jobSpotCount = 0;
  let openRolesCount = 0;
  const colorCounts = new Map();

  for (const marker of list) {
    const meta = marker?.options?.pinMeta || marker?.pinMeta || {};
    if (meta.kind === "job") {
      jobSpotCount += 1;
    } else {
      orgCount += 1;
    }
    const roles = Number(meta.openRoles || 0);
    if (Number.isFinite(roles) && roles > 0) {
      openRolesCount += roles;
    }
    if (meta.color) {
      colorCounts.set(meta.color, (colorCounts.get(meta.color) || 0) + 1);
    }
  }

  let dominantColor = "#441da0";
  let topColorCount = 0;
  for (const [color, hits] of colorCounts.entries()) {
    if (hits > topColorCount) {
      topColorCount = hits;
      dominantColor = color;
    }
  }

  const total = list.length;
  const tier = getClusterTier(total);

  return {
    total,
    tier,
    orgCount,
    jobSpotCount,
    openRolesCount,
    hasHiring: openRolesCount > 0,
    onlyJobs: total > 0 && jobSpotCount === total,
    dominantColor,
  };
};

export const buildClusterAriaLabel = (summary) => {
  const { total = 0, openRolesCount = 0, onlyJobs = false } = summary || {};
  const noun = onlyJobs ? "job spot" : "map pin";
  const countPart = `${total} ${noun}${total === 1 ? "" : "s"}`;
  const rolesPart =
    openRolesCount > 0
      ? `, ${openRolesCount} open role${openRolesCount === 1 ? "" : "s"}`
      : "";
  return `${countPart}${rolesPart} — click to zoom in`;
};

export const buildClusterIconHtml = (summary) => {
  const {
    total = 0,
    tier = "small",
    openRolesCount = 0,
    onlyJobs = false,
    dominantColor = "#441da0",
  } = summary || {};

  const countLabel = formatClusterCount(total);
  const ariaLabel = buildClusterAriaLabel(summary).replace(/"/g, "&quot;");
  const toneClass = onlyJobs ? "org-cluster-jobs" : "org-cluster-orgs";
  const rolesBadge =
    openRolesCount > 0
      ? `<span class="org-cluster-roles-badge" title="${openRolesCount} open roles">${
          openRolesCount > 99 ? "99+" : openRolesCount
        }</span>`
      : "";

  return (
    `<div class="org-cluster-inner org-cluster-${tier} ${toneClass}" style="--cluster-accent:${dominantColor}" aria-label="${ariaLabel}" role="button">` +
    `<span class="org-cluster-halo"></span>` +
    `<span class="org-cluster-core">` +
    `<span class="org-cluster-count">${countLabel}</span>` +
    `</span>` +
    rolesBadge +
    `</div>`
  );
};

export const triggerClusterRipple = (containerEl, durationMs = 480) => {
  if (!containerEl) return false;
  const inner = containerEl.classList?.contains("org-cluster-inner")
    ? containerEl
    : containerEl.querySelector?.(".org-cluster-inner");
  if (!inner || !inner.classList) return false;

  inner.classList.remove("is-rippling");
  void inner.offsetWidth;
  inner.classList.add("is-rippling");

  if (inner._rippleTimer) {
    clearTimeout(inner._rippleTimer);
  }
  inner._rippleTimer = setTimeout(() => {
    inner.classList.remove("is-rippling");
    inner._rippleTimer = null;
  }, durationMs);

  return true;
};
