import test from "node:test";
import assert from "node:assert/strict";
import {
  CLUSTER_ANIMATION_OPTIONS,
  buildClusterAriaLabel,
  buildClusterIconHtml,
  formatClusterCount,
  getClusterIconSize,
  getClusterTier,
  summarizeClusterMarkers,
  triggerClusterRipple,
} from "./clusterUtils";

test("CLUSTER_ANIMATION_OPTIONS enables smooth cluster zoom animations", () => {
  assert.equal(CLUSTER_ANIMATION_OPTIONS.animate, true);
  assert.equal(CLUSTER_ANIMATION_OPTIONS.animateAddingMarkers, true);
  assert.equal(CLUSTER_ANIMATION_OPTIONS.spiderfyOnMaxZoom, true);
  assert.equal(CLUSTER_ANIMATION_OPTIONS.zoomToBoundsOnClick, true);
});

test("getClusterTier maps marker counts to small, medium, and large tiers", () => {
  assert.equal(getClusterTier(2), "small");
  assert.equal(getClusterTier(9), "small");
  assert.equal(getClusterTier(10), "medium");
  assert.equal(getClusterTier(24), "medium");
  assert.equal(getClusterTier(25), "large");
  assert.equal(getClusterTier(120), "large");
});

test("getClusterIconSize scales with cluster tier", () => {
  assert.deepEqual(getClusterIconSize("small"), [40, 40]);
  assert.deepEqual(getClusterIconSize("medium"), [48, 48]);
  assert.deepEqual(getClusterIconSize("large"), [56, 56]);
});

test("formatClusterCount caps display above 99", () => {
  assert.equal(formatClusterCount(4), "4");
  assert.equal(formatClusterCount(99), "99");
  assert.equal(formatClusterCount(100), "99+");
});

test("summarizeClusterMarkers aggregates orgs, job spots, roles, and dominant color", () => {
  const markers = [
    { options: { pinMeta: { kind: "org", openRoles: 3, color: "#441da0" } } },
    { options: { pinMeta: { kind: "org", openRoles: 0, color: "#441da0" } } },
    { options: { pinMeta: { kind: "job", openRoles: 2, color: "#137333" } } },
  ];

  const summary = summarizeClusterMarkers(markers);

  assert.equal(summary.total, 3);
  assert.equal(summary.tier, "small");
  assert.equal(summary.orgCount, 2);
  assert.equal(summary.jobSpotCount, 1);
  assert.equal(summary.openRolesCount, 5);
  assert.equal(summary.hasHiring, true);
  assert.equal(summary.onlyJobs, false);
  assert.equal(summary.dominantColor, "#441da0");
});

test("summarizeClusterMarkers marks job-only clusters accurately", () => {
  const markers = [
    { options: { pinMeta: { kind: "job", openRoles: 1, color: "#137333" } } },
    { options: { pinMeta: { kind: "job", openRoles: 4, color: "#137333" } } },
  ];

  const summary = summarizeClusterMarkers(markers);

  assert.equal(summary.onlyJobs, true);
  assert.equal(summary.openRolesCount, 5);
  assert.equal(
    buildClusterAriaLabel(summary),
    "2 job spots, 5 open roles — click to zoom in"
  );
});

test("buildClusterIconHtml includes count, tier class, and optional open roles badge", () => {
  const html = buildClusterIconHtml({
    total: 14,
    tier: "medium",
    openRolesCount: 6,
    onlyJobs: false,
    dominantColor: "#6d28d9",
  });

  assert.match(html, /org-cluster-medium/);
  assert.match(html, /org-cluster-orgs/);
  assert.match(html, />14</);
  assert.match(html, /org-cluster-roles-badge/);
  assert.match(html, />6</);

  const noRolesHtml = buildClusterIconHtml({
    total: 3,
    tier: "small",
    openRolesCount: 0,
    onlyJobs: true,
    dominantColor: "#137333",
  });
  assert.match(noRolesHtml, /org-cluster-jobs/);
  assert.doesNotMatch(noRolesHtml, /org-cluster-roles-badge/);
});

test("triggerClusterRipple adds is-rippling class and cleans up after duration", async () => {
  const classes = new Set();
  const inner = {
    offsetWidth: 48,
    classList: {
      contains: (c) => c === "org-cluster-inner" || classes.has(c),
      add: (c) => classes.add(c),
      remove: (c) => classes.delete(c),
    },
  };
  const wrapper = {
    classList: { contains: () => false },
    querySelector: (selector) => (selector === ".org-cluster-inner" ? inner : null),
  };

  assert.equal(triggerClusterRipple(null), false);
  assert.equal(triggerClusterRipple(wrapper, 20), true);
  assert.equal(classes.has("is-rippling"), true);

  await new Promise((resolve) => setTimeout(resolve, 40));
  assert.equal(classes.has("is-rippling"), false);
});
