import * as React from "react";
import { useSearchParams } from "react-router-dom";

// Shared filter state for /companies <-> career-guide ("meets data").
// Both pages read/write the same URL params (?q=, ?sector=, ?district=,
// ?hiring=, ?view=) so a search on one page is preserved when the user
// navigates to the other, and both sections on the same page stay in sync.
//
// URL is the source of truth; local state mirrors it for responsive typing.
const PARAM_KEYS = {
  query: "q",
  sector: "sector",
  district: "district",
  hiring: "hiring",
  show: "view",
};

export const parseHiringParam = (value) =>
  value === "1" || value === "true" || value === "only";

export const buildOrgSearchParams = ({
  query = "",
  sector = "All",
  district = "All",
  hiringOnly = false,
  show = "all",
} = {}) => {
  const params = new URLSearchParams();
  if (query.trim()) params.set(PARAM_KEYS.query, query.trim());
  if (sector && sector !== "All") params.set(PARAM_KEYS.sector, sector);
  if (district && district !== "All") params.set(PARAM_KEYS.district, district);
  if (hiringOnly) params.set(PARAM_KEYS.hiring, "1");
  if (show && show !== "all") params.set(PARAM_KEYS.show, show);
  return params;
};

// Single hook used by OrganisationsMap, Companies (directory extras) and
// CompanySearch so /companies and /rwanda-career-guide always meet on the
// same dataset + same filters. defaultShow lets a page (e.g. /jobs-in-rwanda)
// open the map on the jobs view until the user picks another.
const useOrgFilters = ({ defaultShow = "all" } = {}) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const query = searchParams.get(PARAM_KEYS.query) || "";
  const sector = searchParams.get(PARAM_KEYS.sector) || "All";
  const district = searchParams.get(PARAM_KEYS.district) || "All";
  const hiringOnly = parseHiringParam(searchParams.get(PARAM_KEYS.hiring));
  const show = searchParams.get(PARAM_KEYS.show) || defaultShow;

  // Local draft for the text input so typing doesn't push a history
  // entry per keystroke; committed on change (debounced in caller).
  const [draftQuery, setDraftQuery] = React.useState(query);
  React.useEffect(() => {
    setDraftQuery(query);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams.toString()]);

  const patchParams = React.useCallback(
    (patch) => {
      const next = new URLSearchParams(searchParams);
      const apply = (key, value, { removeWhen = null } = {}) => {
        if (value === removeWhen || value === "" || value == null) {
          next.delete(key);
        } else {
          next.set(key, value);
        }
      };
      if ("query" in patch) apply(PARAM_KEYS.query, String(patch.query || "").trim(), { removeWhen: "" });
      if ("sector" in patch) apply(PARAM_KEYS.sector, patch.sector, { removeWhen: "All" });
      if ("district" in patch) apply(PARAM_KEYS.district, patch.district, { removeWhen: "All" });
      if ("hiringOnly" in patch) apply(PARAM_KEYS.hiring, patch.hiringOnly ? "1" : "", { removeWhen: "" });
      if ("show" in patch) apply(PARAM_KEYS.show, patch.show, { removeWhen: "all" });
      setSearchParams(next, { replace: true });
    },
    [searchParams, setSearchParams]
  );

  const setQuery = React.useCallback(
    (value) => {
      setDraftQuery(value);
      patchParams({ query: value });
    },
    [patchParams]
  );

  const setSector = React.useCallback(
    (value) => patchParams({ sector: value }),
    [patchParams]
  );
  const setDistrict = React.useCallback(
    (value) => patchParams({ district: value }),
    [patchParams]
  );
  const setHiringOnly = React.useCallback(
    (value) => patchParams({ hiringOnly: Boolean(value) }),
    [patchParams]
  );
  const setShow = React.useCallback(
    (value) => patchParams({ show: value }),
    [patchParams]
  );

  const reset = React.useCallback(() => {
    setDraftQuery("");
    setSearchParams(new URLSearchParams(), { replace: true });
  }, [setSearchParams]);

  return {
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
    reset,
  };
};

export default useOrgFilters;
