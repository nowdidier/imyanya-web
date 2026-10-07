import * as React from "react";
import {
  Box,
  Card,
  Link,
  Skeleton,
  Stack,
  Typography,
} from "@mui/material";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";

// Free, keyless open data: Wikipedia (CC BY-SA) summaries give readers
// background on well-known employers. Nothing is copied wholesale —
// we show a short extract with attribution and a link to read more.
const WIKI_API = "https://en.wikipedia.org/w/api.php";
const WIKI_SUMMARY_API = "https://en.wikipedia.org/api/rest_v1/page/summary";

const searchWikipediaTitle = async (name) => {
  const params = new URLSearchParams({
    action: "query",
    list: "search",
    srsearch: name,
    srnamespace: "0",
    srlimit: "3",
    format: "json",
    origin: "*",
  });

  const response = await fetch(`${WIKI_API}?${params.toString()}`);
  if (!response.ok) return null;

  const data = await response.json();
  const results = data?.query?.search || [];
  if (results.length === 0) return null;

  // Prefer an exact-ish title match so "BK" doesn't resolve to Burger King.
  const lowerName = String(name || "").toLowerCase().trim();
  const exact = results.find(
    (item) => String(item?.title || "").toLowerCase() === lowerName
  );

  return exact?.title || results[0]?.title || null;
};

const fetchWikipediaSummary = async (title) => {
  const response = await fetch(
    `${WIKI_SUMMARY_API}/${encodeURIComponent(title)}`
  );
  if (!response.ok) return null;

  const data = await response.json();
  // Skip disambiguation pages and missing entries.
  if (!data || data.type === "disambiguation" || data.type === "no-extract") {
    return null;
  }

  return {
    title: data.title,
    extract: data.extract,
    pageUrl:
      data?.content_urls?.desktop?.page ||
      `https://en.wikipedia.org/wiki/${encodeURIComponent(title)}`,
    thumbnail: data?.thumbnail?.source || null,
  };
};

const CompanyOpenInfo = ({ companyName, websiteUrl, locationName }) => {
  const [wiki, setWiki] = React.useState(null);
  const [isLoading, setIsLoading] = React.useState(false);

  React.useEffect(() => {
    if (!companyName) return undefined;

    let isMounted = true;
    setIsLoading(true);

    const load = async () => {
      try {
        const title = await searchWikipediaTitle(companyName);
        if (!title) return;

        const summary = await fetchWikipediaSummary(title);
        if (isMounted && summary?.extract) {
          setWiki(summary);
        }
      } catch (error) {
        // Open data is best-effort: fail silently, page works without it.
        console.error("CompanyOpenInfo fetch failed:", error);
      } finally {
        if (isMounted) setIsLoading(false);
      }
    };

    load();

    return () => {
      isMounted = false;
    };
  }, [companyName]);

  if (!isLoading && !wiki) {
    return null;
  }

  return (
    <Box sx={{ mt: 4 }}>
      <Typography
        variant="h5"
        gutterBottom
        sx={{
          color: "primary.main",
          fontWeight: 600,
          mb: 3,
        }}
      >
        More about this employer
      </Typography>
      <Card
        variant="outlined"
        sx={{
          p: 2.5,
          borderRadius: 2,
          bgcolor: "grey.50",
        }}
      >
        {isLoading && !wiki ? (
          <Stack spacing={1.5}>
            <Skeleton variant="rounded" height={24} width="40%" />
            <Skeleton variant="rounded" height={60} />
          </Stack>
        ) : (
          <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
            {wiki.thumbnail && (
              <Box
                component="img"
                src={wiki.thumbnail}
                alt={wiki.title}
                loading="lazy"
                sx={{
                  width: 120,
                  height: 120,
                  objectFit: "cover",
                  borderRadius: 2,
                  flexShrink: 0,
                }}
              />
            )}
            <Box sx={{ minWidth: 0 }}>
              <Stack
                direction="row"
                spacing={1}
                alignItems="center"
                sx={{ mb: 1 }}
              >
                <InfoOutlinedIcon fontSize="small" color="primary" />
                <Typography variant="subtitle1" fontWeight={700}>
                  {wiki.title}
                </Typography>
              </Stack>
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ lineHeight: 1.7, mb: 1.5 }}
              >
                {wiki.extract}
                {locationName ? ` Based in ${locationName}.` : ""}
              </Typography>
              <Stack direction="row" spacing={2} flexWrap="wrap">
                <Link
                  href={wiki.pageUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  sx={{
                    fontSize: 13,
                    fontWeight: 600,
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 0.5,
                  }}
                >
                  Read more on Wikipedia
                  <OpenInNewIcon sx={{ fontSize: 14 }} />
                </Link>
                {websiteUrl && (
                  <Link
                    href={websiteUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    sx={{
                      fontSize: 13,
                      fontWeight: 600,
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 0.5,
                    }}
                  >
                    Official website
                    <OpenInNewIcon sx={{ fontSize: 14 }} />
                  </Link>
                )}
              </Stack>
              <Typography
                variant="caption"
                color="text.secondary"
                sx={{ display: "block", mt: 1.5 }}
              >
                Background info from Wikipedia (open source, CC BY-SA).
              </Typography>
            </Box>
          </Stack>
        )}
      </Card>
    </Box>
  );
};

export default CompanyOpenInfo;
