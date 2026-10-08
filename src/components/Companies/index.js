import React from "react";
import { useSelector } from "react-redux";
import { Box, Grid, Pagination, Stack, Typography } from "@mui/material";

import { ImageSvg4 } from "../../configs/constants";
import NoDataCard from "../NoDataCard";
import Company from "../Company";
import companyService from "../../services/companyService";
import useOrganisations from "../OrganisationsMap/useOrganisations";
import useOrgFilters from "../OrganisationsMap/useOrgFilters";
import { setContentNoindex } from "../SeoManager/contentFlag";

const isUsableImage = (url) =>
  typeof url === "string" &&
  (url.startsWith("http://") || url.startsWith("https://") || url.startsWith("data:"));

const Companies = ({ setNoindex = true, showDirectoryExtras = true }) => {
  const { companyFilter } = useSelector((state) => state.filter);
  const { pageSize } = companyFilter;
  const [isLoading, setIsLoading] = React.useState(true);
  const [companies, setCompanies] = React.useState([]);
  const [page, setPage] = React.useState(1);
  const [count, setCount] = React.useState(0);
  const [refreshKey, setRefreshKey] = React.useState(0);
  const { orgs: mapOrgs } = useOrganisations();
  // Same shared filters as OrganisationsMap (URL ?q=&sector=&district=)
  // so /companies directory extras always meet the career-guide map data.
  const shared = useOrgFilters();
  const sharedQuery = shared.query;
  const sharedSector = shared.sector;
  const sharedDistrict = shared.district;
  const sharedHiringOnly = shared.hiringOnly;
  const sharedShow = shared.show;

  // Always update: refetch when the tab regains focus so newly
  // registered companies appear without a manual reload.
  React.useEffect(() => {
    const onFocus = () => setRefreshKey((k) => k + 1);
    window.addEventListener("focus", onFocus);
    return () => window.removeEventListener("focus", onFocus);
  }, []);

  React.useEffect(() => {
    const getCompanies = async () => {
      setIsLoading(true);
     try {
        const resData = await companyService.getCompanies({
          ...companyFilter,
          page: page,
        });

        const data = resData.data;

        setCount(data.count);
        setCompanies(data?.results || []);
        // Only the canonical /companies list controls the empty-companies
        // noindex flag; embedded previews (e.g. on career-guide) must not
        // noindex their host page when the API happens to be empty.
        if (setNoindex) {
          setContentNoindex(
            (data?.results || []).length === 0 ? "empty-companies" : null
          );
        }
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    getCompanies();
  }, [companyFilter, page, refreshKey, setNoindex]);

  // New search -> back to page 1 so results never strand on an empty page.
  React.useEffect(() => {
    setPage(1);
  }, [companyFilter]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
    // Jump back to the top of the list so the new page of cards is visible.
    listTopRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  // Organisations found on the map that haven't created an Imyanya
  // profile yet (directory-only). Shown on page 1 so Explore Company
  // Culture covers every pinned place, not just registered employers.
  // Filters meet the career-guide map: URL ?q=&sector=&district=&hiring=
  // &view= plus the redux kw from CompanySearch.
  const directoryExtras = React.useMemo(() => {
    if (!showDirectoryExtras) return [];
    if (page !== 1) return [];
    // City filter is id-based and can't be matched to directory names.
    if (companyFilter.cityId) return [];
    // Hiring-only shows only orgs with open roles; directory-only
    // places have none, so they meet the map by hiding here too.
    if (sharedHiringOnly) return [];
    // Jobs view hides organisation pins on the map — hide directory
    // extras here too so both sections meet on the same state.
    if (sharedShow === "jobs") return [];
    const apiSlugs = new Set(companies.map((c) => c.slug));
    const kw = (sharedQuery || companyFilter.kw || "").trim().toLowerCase();
    return mapOrgs.filter((o) => {
      if (o.hasProfile) return false;
      if (apiSlugs.has(o.slug)) return false;
      if (sharedSector !== "All" && o.sector !== sharedSector) return false;
      if (
        sharedDistrict !== "All" &&
        o.cityName !== sharedDistrict &&
        o.district !== sharedDistrict
      )
        return false;
      if (!kw) return true;
      return [o.companyName, o.sector, o.cityName, o.district, o.address]
        .join(" ")
        .toLowerCase()
        .includes(kw);
    });
  }, [mapOrgs, companies, page, companyFilter, sharedQuery, sharedSector, sharedDistrict, sharedHiringOnly, sharedShow, showDirectoryExtras]);

  const hasResults = companies.length > 0 || directoryExtras.length > 0;
  const listTopRef = React.useRef(null);
  // Only one page of cards loads at a time — spell out which slice of the
  // total is visible so "145 companies" never looks like a broken list.
  const totalPages = Math.max(1, Math.ceil(count / pageSize));
  const rangeStart = count === 0 ? 0 : (page - 1) * pageSize + 1;
  const rangeEnd = (page - 1) * pageSize + companies.length;

  return (
    <>
      <Stack
        ref={listTopRef}
        direction={{
          xs: "column",
          sm: "row",
          md: "row",
          lg: "row",
          xl: "row",
        }}
        sx={{ pb: 1, scrollMarginTop: 80 }}
        justifyContent="space-between"
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            mb: 2,
          }}
        >
          <Typography
            variant="h5"
            sx={{
              color: "text.primary",
              fontWeight: 600,
              display: "flex",
              alignItems: "center",
              gap: 1,
            }}
          >
            Company featured
            <Box
              component="span"
              sx={{
                color: "#fff",
                fontWeight: 700,
                backgroundImage:
                  "linear-gradient(135deg, #441da0 0%, #6d28d9 60%, #8b5cf6 100%)",
                boxShadow: "0 4px 12px -4px rgba(109, 40, 217, 0.5)",
                padding: "4px 12px",
                borderRadius: "20px",
                fontSize: "0.9em",
              }}
            >
              {count + directoryExtras.length} companies
            </Box>
          </Typography>
        </Box>
      </Stack>
      {!isLoading && hasResults && (
        <Typography variant="body2" color="text.secondary" sx={{ pb: 2 }}>
          Showing {rangeStart}–{rangeEnd} of {count} registered employers
          {directoryExtras.length > 0 &&
            ` + ${directoryExtras.length} map-only places`}
          {` • Page ${page} of ${totalPages} — use the pages below to see them all`}
        </Typography>
      )}

      <Stack spacing={2}>
        {isLoading ? (
          <Grid container spacing={2}>
            {Array.from(Array(12).keys()).map((value) => (
              <Grid item xs={12} sm={12} md={6} lg={4} xl={4} key={value.id}>
                <Company.Loading />
              </Grid>
            ))}
          </Grid>
        ) : !hasResults ? (
          <NoDataCard
            title="No companies match your current search criteria"
            imgComponentSgv={<ImageSvg4 />}
          />
        ) : (
          <>
            <Grid container spacing={2}>
              {companies.map((value) => (
                <Grid item xs={12} sm={12} md={6} lg={4} xl={4} key={value.id}>
                  <Company
                    id={value.id}
                    slug={value.slug}
                    companyImageUrl={value.companyImageUrl}
                    companyCoverImageUrl={value.companyCoverImageUrl}
                    companyName={value.companyName}
                    employeeSize={value.employeeSize}
                    fieldOperation={value.fieldOperation}
                    city={value.locationDict?.city}
                    followNumber={value.followNumber}
                    jobPostNumber={value.jobPostNumber}
                    isFollowed={value.isFollowed}
                  />
                </Grid>
              ))}
            </Grid>
            {directoryExtras.length > 0 && (
              <Box sx={{ mt: 4 }}>
                <Typography variant="h6" fontWeight={700} gutterBottom>
                  More places on the map — no Imyanya profile yet
                </Typography>
                <Typography color="text.secondary" sx={{ mb: 2 }}>
                  These organisations are pinned on our map but haven&apos;t
                  created their Imyanya profile. Come back soon — their jobs
                  will appear here once they post.
                </Typography>
                <Grid container spacing={2}>
                  {directoryExtras.map((org) => (
                    <Grid item xs={12} sm={12} md={6} lg={4} xl={4} key={org.key}>
                      <Company
                        slug={org.slug}
                        companyImageUrl={isUsableImage(org.logo) ? org.logo : null}
                        companyName={org.companyName}
                        fieldOperation={org.sector}
                        city={null}
                        cityName={org.cityName}
                        sizeName={org.district ? `${org.district} district` : null}
                        claimAddress={org.address}
                        claimLat={org.lat}
                        claimLng={org.lng}
                        jobPostNumber={0}
                        isDirectory
                      />
                    </Grid>
                  ))}
                </Grid>
              </Box>
            )}
            <Stack sx={{ py: 2 }}>
              {Math.ceil(count / pageSize) > 1 && (
                <Pagination
                  color="primary"
                  size="medium"
                  variant="text"
                  sx={{ margin: "0 auto" }}
                  count={Math.ceil(count / pageSize)}
                  page={page}
                  onChange={handleChangePage}
                />
              )}
            </Stack>
          </>
        )}
      </Stack>
    </>
  );
};

export default Companies;
