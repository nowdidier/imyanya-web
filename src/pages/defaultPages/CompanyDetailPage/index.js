import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import dayjs from "dayjs";
import {
  Avatar,
  Box,
  Card,
  Chip,
  Grid,
  IconButton,
  Link,
  Stack,
  Typography,
  Button,
  Skeleton,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBriefcase,
  faUsers,
  faCalendarDays,
  faGlobe,
  faEnvelope,
  faPhoneVolume,
  faHashtag,
  faLocationDot,
} from "@fortawesome/free-solid-svg-icons";

import { QRCode } from "antd";

import { TabTitle } from "../../../utils/generalFunction";
import { ICONS, IMAGES, ROLES_NAME, ROUTES } from "../../../configs/constants";
import { sampleCompanies } from "../../../data/content/companies";
import errorHandling from "../../../utils/errorHandling";
import toastMessages from "../../../utils/toastMessages";
import Map from "../../../components/Map";
import SocialNetworkSharingPopup from "../../../components/SocialNetworkSharingPopup/SocialNetworkSharingPopup";
import ShareIcon from "@mui/icons-material/Share";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import MuiImageCustom from "../../../components/MuiImageCustom";
import RichHtmlContent from "../../../components/controls/RichHtmlContent";
import SeoBreadcrumbs from "../../../components/SeoBreadcrumbs";
import ClaimOrganisationButton from "../../../components/ClaimOrganisationButton";
import NoDataCard from "../../../components/NoDataCard";
import ImageGalleryCustom from "../../../components/ImageGalleryCustom";
import companyService from "../../../services/companyService";
import { buildCompanyShareData } from "../../../utils/shareUtils";
import { setContentNoindex } from "../../../components/SeoManager/contentFlag";
import { setCompanySeo } from "../../../components/SeoManager/companySeoFlag";
import CompanyOpenInfo from "../../../components/CompanyOpenInfo";

import FilterJobPostCard from "../../components/defaults/FilterJobPostCard";
import HiringCTA from "../../../components/HiringCTA";

const LoadingComponent = () => {
  return (
    <Stack>
      <Card>
        <Box height={250}>
          <Skeleton variant="rounded" width={"100%"} height={"100%"} />
        </Box>
        <Box sx={{ p: 3, pt: 1 }}>
          <Stack
            direction={{
              xs: "column",
              sm: "column",
              md: "row",
              lg: "row",
              xl: "row",
            }}
            spacing={2}
            alignItems="center"
          >
            <Box>
              <Skeleton variant="rounded" width={120} height={120} />
            </Box>
            <Stack flex={1} spacing={2}>
              <Skeleton variant="rounded" />
              <Stack
                direction={{
                  xs: "column",
                  sm: "row",
                  md: "row",
                  lg: "row",
                  xl: "row",
                }}
                spacing={{ xs: 0.5, sm: 2, md: 3, lg: 3, xl: 3 }}
              >
                <Skeleton variant="rounded" width={"100%"} />
                <Skeleton variant="rounded" width={"100%"} />
                <Skeleton variant="rounded" width={"100%"} />
              </Stack>
            </Stack>
            <Skeleton height={80} width={80} variant="rounded" />
          </Stack>
        </Box>
      </Card>
      <Grid container spacing={2} sx={{ mt: 1 }}>
        <Grid item xs={12} sm={12} md={8} lg={8} xl={8}>
          <Card sx={{ p: { xs: 2, sm: 2, md: 3, lg: 3, xl: 3 } }}>
            <Stack spacing={2}>
              <Skeleton variant="rounded" />
              <Skeleton height={150} variant="rounded" />
              <Skeleton variant="rounded" />
              <Skeleton height={300} variant="rounded" />
            </Stack>
          </Card>
        </Grid>
        <Grid item xs={12} sm={12} md={4} lg={4} xl={4}>
          <Card sx={{ p: { xs: 2, sm: 2, md: 3, lg: 3, xl: 3 } }}>
            <Stack spacing={3}>
              <Box>
                <Skeleton variant="rounded" />
                <Box sx={{ mt: 1 }}>
                  <Skeleton variant="rounded" />
                </Box>
              </Box>
              <Box>
                <Skeleton variant="rounded" />
                <Box sx={{ mt: 1 }}>
                  <Skeleton variant="rounded" />
                </Box>
              </Box>
              <Box>
                <Skeleton variant="rounded" />
                <Box sx={{ mt: 1 }}>
                  <Skeleton variant="rounded" />
                </Box>
                <Box sx={{ mt: 1 }}>
                  <Skeleton variant="rounded" />
                </Box>
                <Box sx={{ mt: 1 }}>
                  <Skeleton variant="rounded" />
                </Box>
                <Box sx={{ mt: 1 }}>
                  <Skeleton variant="rounded" />
                </Box>
              </Box>
              <Box>
                <Skeleton variant="rounded" />
                <Box sx={{ mt: 1, height: 200 }}>
                  <Skeleton variant="rounded" height="100%" />
                </Box>
              </Box>
            </Stack>
          </Card>
        </Grid>
      </Grid>
    </Stack>
  );
};

const stripHtml = (html = "") =>
  String(html || "")
    .replace(/<[^>]*>/g, " ")
    .replace(/\s+/g, " ")
    .trim();

const toDateOnly = (value) => {
  if (!value) return null;
  const date = dayjs(value);
  if (!date.isValid()) return null;
  return date.format("YYYY-MM-DD");
};

const upsertSchema = (id, data) => {
  let element = document.getElementById(id);

  if (!element) {
    element = document.createElement("script");
    element.id = id;
    element.type = "application/ld+json";
    document.head.appendChild(element);
  }

  element.textContent = JSON.stringify(data);
};

const removeSchema = (id) => {
  const element = document.getElementById(id);
  if (element) {
    element.remove();
  }
};

const normalizeSlug = (value) => String(value || "").trim().toLowerCase();

const findDirectoryCompany = (companySlug) => {
  const needle = normalizeSlug(companySlug);
  if (!needle) return null;
  return (
    (sampleCompanies || []).find(
      (c) =>
        normalizeSlug(c.slug) === needle || normalizeSlug(c.id) === needle
    ) || null
  );
};

// Profile for organisations found on the map that haven't created an
// Imyanya profile yet: shows the curated culture snapshot, but the jobs
// section tells the visitor to come back soon. Related places link back to
// /companies and the career-guide map so every page meets.
const DirectoryCompanyView = ({ company }) => {
  const nav = useNavigate();
  const hq = company.headquarters || {};
  const reviews = company.employeeReviews || {};
  const initials = String(company.companyName || "")
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();
  const related = React.useMemo(() => {
    const district = hq.district || hq.city || "";
    const industry = company.industry || "";
    return (sampleCompanies || [])
      .filter((c) => c.slug !== company.slug)
      .filter(
        (c) =>
          (industry && c.industry === industry) ||
          (district &&
            (c.headquarters?.district === district ||
              c.headquarters?.city === district))
      )
      .slice(0, 3);
  }, [company, hq.district, hq.city]);

  return (
    <Box>
      <SeoBreadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "Companies in Rwanda", href: "/companies" },
          { label: company.companyName },
        ]}
      />
      <Stack spacing={2}>
        <Card sx={{ overflow: "visible", boxShadow: (theme) => theme.customShadows.medium }}>
          <Box>
            <MuiImageCustom
              src={IMAGES.coverImageDefault}
              sx={{ maxHeight: 250, minHeight: 200 }}
              duration={1500}
              width="100%"
              fit="cover"
            />
          </Box>
          <Box sx={{ p: 3, pt: 1 }}>
            <Stack direction={{ xs: "column", md: "row" }} spacing={3} alignItems="center">
              <Avatar
                sx={{
                  width: 120,
                  height: 120,
                  mt: -7,
                  bgcolor: "primary.main",
                  color: "white",
                  fontWeight: 800,
                  fontSize: 40,
                  border: "4px solid #fff",
                  boxShadow: (theme) => theme.customShadows.small,
                }}
                variant="rounded"
              >
                {initials || "?"}
              </Avatar>
              <Stack flex={1} spacing={1}>
                <Typography variant="h4" fontWeight={800}>
                  {company.companyName}
                </Typography>
                {company.tagline && (
                  <Typography color="text.secondary">{company.tagline}</Typography>
                )}
                <Stack direction="row" spacing={1} sx={{ flexWrap: "wrap" }}>
                  {company.industry && <Chip label={company.industry} color="primary" size="small" />}
                  <Chip label="No Imyanya profile yet" size="small" sx={{ bgcolor: "#441da0", color: "white", fontWeight: 700 }} />
                </Stack>
                <Typography variant="body2" color="text.secondary">
                  {[hq.address, hq.city, "Rwanda"].filter(Boolean).join(", ")}
                  {company.companySize ? ` • ${company.companySize} employees` : ""}
                  {company.foundedYear ? ` • Founded ${company.foundedYear}` : ""}
                </Typography>
              </Stack>
            </Stack>
          </Box>
        </Card>

        <Grid container spacing={2}>
          <Grid item xs={12} md={8}>
            <Card sx={{ p: { xs: 2, md: 3 } }}>
              <Stack spacing={3}>
                {company.description && (
                  <Box>
                    <Typography variant="h5" gutterBottom sx={{ color: "primary.main", fontWeight: 600 }}>
                      About
                    </Typography>
                    <Typography sx={{ textAlign: "justify", color: "text.secondary", lineHeight: 1.8 }}>
                      <RichHtmlContent html={company.description} />
                    </Typography>
                  </Box>
                )}
                {company.cultureDescription && (
                  <Box>
                    <Typography variant="h5" gutterBottom sx={{ color: "primary.main", fontWeight: 600 }}>
                      Company culture
                    </Typography>
                    <Typography sx={{ textAlign: "justify", color: "text.secondary", lineHeight: 1.8 }}>
                      <RichHtmlContent html={company.cultureDescription} />
                    </Typography>
                  </Box>
                )}
                {reviews.overallRating && (
                  <Box>
                    <Typography variant="h5" gutterBottom sx={{ color: "primary.main", fontWeight: 600 }}>
                      Employee snapshot
                    </Typography>
                    <Typography color="text.secondary" sx={{ mb: 1 }}>
                      Rated {reviews.overallRating}/5 from {reviews.reviewCount || "—"} reviews.
                    </Typography>
                    {(reviews.pros || []).length > 0 && (
                      <Stack spacing={0.5}>
                        {(reviews.pros || []).slice(0, 4).map((pro) => (
                          <Typography key={pro} variant="body2" color="text.secondary">
                            • {pro}
                          </Typography>
                        ))}
                      </Stack>
                    )}
                  </Box>
                )}
                <Box
                  sx={{
                    p: 3,
                    borderRadius: 2,
                    bgcolor: "#faf9ff",
                    border: "1px solid #e6defc",
                    textAlign: "center",
                  }}
                >
                  <Typography variant="h5" fontWeight={800} gutterBottom>
                    Come back soon
                  </Typography>
                  <Typography color="text.secondary" sx={{ lineHeight: 1.75, mb: 2 }}>
                    {company.companyName} hasn&apos;t created its Imyanya profile yet,
                    so there are no positions to show right now. When this organisation
                    posts a job, its open roles will appear here.
                  </Typography>
                  <Stack direction={{ xs: "column", sm: "row" }} spacing={1.5} justifyContent="center">
                    <Button
                      variant="contained"
                      onClick={() => nav(`/${ROUTES.JOB_SEEKER.JOBS_EN}`)}
                    >
                      Browse open jobs
                    </Button>
                    <Button
                      variant="outlined"
                      onClick={() => nav(`/${ROUTES.JOB_SEEKER.COMPANY_EN}`)}
                    >
                      View all companies
                    </Button>
                  </Stack>
                  <Box sx={{ mt: 2, display: "flex", justifyContent: "center" }}>
                    <ClaimOrganisationButton
                      companyName={company.companyName}
                      address={hq.address}
                      lat={hq.latitude}
                      lng={hq.longitude}
                      variant="outlined"
                    />
                  </Box>
                </Box>
              </Stack>
            </Card>
          </Grid>
          <Grid item xs={12} md={4}>
            <Card sx={{ p: 3, boxShadow: (theme) => theme.customShadows.small, mb: 2 }}>
              <Typography variant="h6" sx={{ color: "primary.main", mb: 2 }}>
                Location
              </Typography>
              <Map
                title={company.companyName}
                subTitle={[hq.address, hq.city].filter(Boolean).join(", ")}
                latitude={hq.latitude}
                longitude={hq.longitude}
                fallbackQuery={[hq.address, hq.district, hq.city]
                  .filter(Boolean)
                  .join(" ")}
                height={220}
              />
            </Card>
            {company.website && (
              <Card sx={{ p: 3, boxShadow: (theme) => theme.customShadows.small, mb: 2 }}>
                <Typography variant="h6" sx={{ color: "primary.main", mb: 1 }}>
                  Website
                </Typography>
                <Link href={company.website} target="_blank" rel="noopener noreferrer">
                  {company.website}
                </Link>
              </Card>
            )}
            <Card sx={{ p: 3, boxShadow: (theme) => theme.customShadows.small }}>
              <Typography variant="h6" sx={{ color: "primary.main", mb: 1 }}>
                Explore more
              </Typography>
              <Stack spacing={1}>
                <Button
                  variant="text"
                  onClick={() => nav(`/${ROUTES.JOB_SEEKER.COMPANY_EN}`)}
                  sx={{ textTransform: "none", fontWeight: 700, justifyContent: "flex-start", p: 0 }}
                >
                  View all companies hiring in Rwanda →
                </Button>
                <Button
                  variant="text"
                  onClick={() =>
                    nav(
                      `/${ROUTES.JOB_SEEKER.CAREER_GUIDE}?q=${encodeURIComponent(company.companyName || "")}`
                    )
                  }
                  sx={{ textTransform: "none", fontWeight: 700, justifyContent: "flex-start", p: 0 }}
                >
                  Find {company.companyName} on the career map →
                </Button>
                {related.map((rel) => (
                  <Typography
                    key={rel.slug}
                    component={Link}
                    onClick={() => nav(`/companies/${rel.slug}`)}
                    variant="body2"
                    sx={{ color: "primary.main", cursor: "pointer", textDecoration: "none" }}
                  >
                    • {rel.companyName}
                  </Typography>
                ))}
              </Stack>
            </Card>
          </Grid>
        </Grid>
      </Stack>
    </Box>
  );
};

const CompanyDetailPage = () => {
  const { slug } = useParams();
  const { allConfig } = useSelector((state) => state.config);
  const { isAuthenticated, currentUser } = useSelector((state) => state.user);
  const [openSharePopup, setOpenSharePopup] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(true);
  const [isLoadingFollow, setIsLoadingFollow] = React.useState(false);
  const [companyDetail, setCompanyDetail] = React.useState(null);
  const [directoryCompany, setDirectoryCompany] = React.useState(null);
  const [imageList, setImageList] = React.useState([]);
  const shareUrl = typeof window !== "undefined" ? window.location.href : "";
  const shareData = React.useMemo(
    () =>
      buildCompanyShareData({
        url: shareUrl,
        companyName: companyDetail?.companyName,
        fieldOperation: companyDetail?.fieldOperation,
        locationName:
          companyDetail?.location?.address ||
          allConfig?.cityDict[companyDetail?.location?.city] ||
          "",
        jobPostNumber: companyDetail?.jobPostNumber,
      }),
    [allConfig, companyDetail, shareUrl]
  );

  React.useEffect(() => {
    const getCompanyDetail = async (companySlug) => {
      try {
        const resData = await companyService.getCompanyDetailById(companySlug);
        const data = resData.data;
        const companyImages = data?.companyImages || [];

        setCompanyDetail(data);
        TabTitle(data?.companyName);

        if (!data) {
          // Fall back to the curated map directory so pinned organisations
          // without an Imyanya profile still get a culture page.
          // Directory pages carry a curated description/culture snapshot, so
          // they stay indexable; only truly unknown slugs are noindexed.
          const directory = findDirectoryCompany(companySlug);
          setDirectoryCompany(directory);
          if (directory) {
            TabTitle(directory.companyName);
            setContentNoindex(null);
            // Full SEO so Google indexes the directory culture page:
            // title, meta description, keywords and canonical come from
            // this, and the JSON-LD below adds Organization + breadcrumbs.
            const dirHq = directory.headquarters || {};
            setCompanySeo({
              companyName: directory.companyName,
              slug: directory.slug,
              description: stripHtml(
                directory.description ||
                  directory.cultureDescription ||
                  directory.tagline ||
                  ""
              ),
              location:
                [dirHq.address, dirHq.city].filter(Boolean).join(", ") ||
                "Rwanda",
              imageUrl: null,
              websiteUrl: directory.website || null,
            });
          } else {
            setContentNoindex("not-found");
            setCompanySeo(null);
          }
        } else {
          const plainDescription = stripHtml(data.description);
          const hasDescription = plainDescription.length > 0;
          const hasJobs = Number(data.jobPostNumber || 0) > 0;

          // Thin profiles (no description + no open jobs) stay out of Google.
          setContentNoindex(!hasDescription && !hasJobs ? "thin-company" : null);

          const cityName =
            data.location?.address ||
            allConfig?.cityDict?.[data.location?.city] ||
            "Rwanda";

          setCompanySeo({
            companyName: data.companyName,
            slug: companySlug,
            description: plainDescription,
            location: cityName,
            imageUrl:
              data.companyImageUrl || data.companyCoverImageUrl || null,
            websiteUrl: data.websiteUrl || null,
          });
        }

        var imagelistNew = [];
        for (let i = 0; i < companyImages.length; i++) {
          imagelistNew.push({
            original: companyImages[i].imageUrl,
            thumbnail: companyImages[i].imageUrl,
          });
        }
        setImageList(imagelistNew);
      } catch (error) {
        console.error(error);
        const directory = findDirectoryCompany(slug);
        setDirectoryCompany(directory);
        if (directory) {
          TabTitle(directory.companyName);
          setContentNoindex(null);
          const dirHq = directory.headquarters || {};
          setCompanySeo({
            companyName: directory.companyName,
            slug: directory.slug,
            description: stripHtml(
              directory.description ||
                directory.cultureDescription ||
                directory.tagline ||
                ""
            ),
            location:
              [dirHq.address, dirHq.city].filter(Boolean).join(", ") ||
              "Rwanda",
            imageUrl: null,
            websiteUrl: directory.website || null,
          });
        } else {
          setContentNoindex("not-found");
          setCompanySeo(null);
        }
      } finally {
        setIsLoading(false);
      }
    };

    getCompanyDetail(slug);

    return () => {
      setCompanySeo(null);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slug]);

  // Organization + breadcrumb structured data so Google understands
  // this page as an employer offering jobs on Imyanya.
  React.useEffect(() => {
    if (!companyDetail) {
      return undefined;
    }

    const canonicalUrl = `https://imyanya.rw/companies/${slug}`;
    const cityName =
      companyDetail.location?.address ||
      allConfig?.cityDict?.[companyDetail.location?.city] ||
      "Rwanda";
    const plainDescription = stripHtml(companyDetail.description);
    const sameAs = [
      companyDetail.websiteUrl,
      companyDetail.facebookUrl,
      companyDetail.youtubeUrl,
      companyDetail.linkedinUrl,
    ].filter(Boolean);

    upsertSchema("imyanya-company-schema", {
      "@context": "https://schema.org",
      "@type": "Organization",
      "@id": canonicalUrl,
      name: companyDetail.companyName,
      url: canonicalUrl,
      ...(companyDetail.companyImageUrl
        ? { logo: companyDetail.companyImageUrl }
        : {}),
      ...(companyDetail.companyCoverImageUrl || companyDetail.companyImageUrl
        ? {
            image:
              companyDetail.companyCoverImageUrl ||
              companyDetail.companyImageUrl,
          }
        : {}),
      ...(plainDescription
        ? { description: plainDescription.slice(0, 500) }
        : {}),
      ...(sameAs.length > 0 ? { sameAs } : {}),
      address: {
        "@type": "PostalAddress",
        addressLocality: cityName,
        addressCountry: "RW",
        ...(companyDetail.location?.address
          ? { streetAddress: companyDetail.location.address }
          : {}),
      },
      ...(toDateOnly(companyDetail.since)
        ? { foundingDate: toDateOnly(companyDetail.since) }
        : {}),
    });

    upsertSchema("imyanya-company-breadcrumb-schema", {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: "https://imyanya.rw/",
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "Companies in Rwanda",
          item: "https://imyanya.rw/companies",
        },
        {
          "@type": "ListItem",
          position: 3,
          name: companyDetail.companyName,
          item: canonicalUrl,
        },
      ],
    });

    return () => {
      removeSchema("imyanya-company-schema");
      removeSchema("imyanya-company-breadcrumb-schema");
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [companyDetail, slug]);

  // Organization + breadcrumb structured data for directory-only
  // organisations, so Google indexes them as real employer entities
  // (name, location, website) even before they claim a profile.
  React.useEffect(() => {
    if (!directoryCompany) {
      return undefined;
    }

    const hq = directoryCompany.headquarters || {};
    const canonicalUrl = `https://imyanya.rw/companies/${directoryCompany.slug}`;
    const locality =
      [hq.address, hq.city].filter(Boolean).join(", ") || "Rwanda";
    const plainDescription = stripHtml(
      directoryCompany.description ||
        directoryCompany.cultureDescription ||
        directoryCompany.tagline ||
        ""
    );

    upsertSchema("imyanya-directory-company-schema", {
      "@context": "https://schema.org",
      "@type": "Organization",
      "@id": canonicalUrl,
      name: directoryCompany.companyName,
      url: canonicalUrl,
      ...(plainDescription
        ? { description: plainDescription.slice(0, 500) }
        : {}),
      ...(directoryCompany.website
        ? { sameAs: [directoryCompany.website] }
        : {}),
      address: {
        "@type": "PostalAddress",
        addressLocality: locality,
        addressCountry: "RW",
        ...(hq.address ? { streetAddress: hq.address } : {}),
      },
      ...(directoryCompany.foundedYear
        ? { foundingDate: String(directoryCompany.foundedYear) }
        : {}),
    });

    upsertSchema("imyanya-directory-company-breadcrumb-schema", {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: "https://imyanya.rw/",
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "Companies in Rwanda",
          item: "https://imyanya.rw/companies",
        },
        {
          "@type": "ListItem",
          position: 3,
          name: directoryCompany.companyName,
          item: canonicalUrl,
        },
      ],
    });

    return () => {
      removeSchema("imyanya-directory-company-schema");
      removeSchema("imyanya-directory-company-breadcrumb-schema");
    };
  }, [directoryCompany]);

  const handleFollow = () => {
    const follow = async () => {
      setIsLoadingFollow(true);
     try {
        const resData = await companyService.followCompany(slug);
        const isFollowed = resData.data.isFollowed;
        setCompanyDetail({
          ...companyDetail,
          isFollowed: isFollowed,
          followNumber: isFollowed
            ? companyDetail.followNumber + 1
            : companyDetail.followNumber - 1,
        });
        toastMessages.success(
          isFollowed ? "Follow successfully." : "Cancel follow successfully."
        );
      } catch (error) {
        console.error(error);
        errorHandling(error);
      } finally {
        setIsLoadingFollow(false);
      }
    };

    follow();
  };

  return isLoading ? (
    <LoadingComponent />
  ) : companyDetail === null ? (
    directoryCompany ? (
      <DirectoryCompanyView company={directoryCompany} />
    ) : (
      <NoDataCard />
    )
  ) : (
    <>
      <SeoBreadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "Companies in Rwanda", href: "/companies" },
          { label: companyDetail?.companyName || "Company profile" },
        ]}
      />
      <Box>
        <Stack spacing={2}>
          <Card
            sx={{
              overflow: "hidden",
              boxShadow: (theme) => theme.customShadows.glow,
              border: "1px solid rgba(109, 40, 217, 0.16)",
            }}
          >
            <Box sx={{ position: "relative" }}>
              <MuiImageCustom
                src={
                  companyDetail?.companyCoverImageUrl ||
                  IMAGES.coverImageDefault
                }
                sx={{
                  maxHeight: 250,
                  minHeight: 200,
                }}
                duration={1500}
                width="100%"
                fit="cover"
              />
              <Box
                sx={{
                  position: "absolute",
                  inset: 0,
                  background:
                    "linear-gradient(180deg, rgba(47,21,120,0) 40%, rgba(47,21,120,0.45) 100%)",
                  pointerEvents: "none",
                }}
              />
            </Box>
            <Box sx={{ p: 3, pt: 1 }}>
              <Stack
                direction={{
                  xs: "column",
                  sm: "column",
                  md: "row",
                  lg: "row",
                  xl: "row",
                }}
                spacing={3}
                alignItems="center"
              >
                <Box sx={{ position: "relative", zIndex: 1 }}>
                  <MuiImageCustom
                    src={companyDetail.companyImageUrl}
                    sx={{
                      borderRadius: 3,
                      mt: -7,
                      p: 0.5,
                      bgcolor: "white",
                      background:
                        "linear-gradient(#fff, #fff) padding-box, linear-gradient(135deg, #441da0, #8b5cf6, #ff9800) border-box",
                      border: "3px solid transparent",
                      boxShadow: (theme) => theme.customShadows.glow,
                    }}
                    duration={1500}
                    width={120}
                    height={120}
                  />
                </Box>
                <Box flex={1}>
                  <Box>
                    <Typography
                      variant="h4"
                      gutterBottom
                      sx={{
                        textAlign: {
                          xs: "center",
                          sm: "center",
                          md: "left",
                        },
                        color: "primary.main",
                        fontWeight: 600,
                      }}
                    >
                      {companyDetail.companyName}
                    </Typography>
                  </Box>
                  <Stack
                    direction={{
                      xs: "column",
                      sm: "row",
                    }}
                    spacing={3}
                    sx={{
                      "& .MuiTypography-root": {
                        color: "text.secondary",
                        display: "flex",
                        alignItems: "center",
                        gap: 1,
                        "& svg": {
                          color: "primary.main",
                          fontSize: "1.2rem",
                        },
                      },
                    }}
                  >
                    <Typography variant="subtitle1">
                      <FontAwesomeIcon icon={faBriefcase} />
                      {companyDetail.fieldOperation}
                    </Typography>
                    <Typography variant="subtitle1">
                      <FontAwesomeIcon icon={faUsers} />
                      {allConfig?.employeeSizeDict[
                        companyDetail.employeeSize
                      ] || (
                        <span
                          style={{
                            color: "#e0e0e0",
                            fontStyle: "italic",
                            fontSize: 13,
                          }}
                        >
                          Not updated
                        </span>
                      )}
                    </Typography>
                    <Typography variant="subtitle1">
                      <FontAwesomeIcon icon={faCalendarDays} />
                      {dayjs(companyDetail?.since).format("DD/MM/YYYY")}
                    </Typography>
                  </Stack>
                </Box>
                <Box sx={{ pt: 1 }}>
                  <QRCode
                    value={shareUrl || "-"}
                    size={75}
                    style={{
                      padding: "8px",
                      background: "#fff",
                      borderRadius: "8px",
                      boxShadow: (theme) => theme.customShadows.small,
                    }}
                  />
                </Box>
                <Stack spacing={1.5} justifyContent="center">
                  {isAuthenticated &&
                    currentUser?.roleName === ROLES_NAME.JOB_SEEKER && (
                      <LoadingButton
                        onClick={handleFollow}
                        startIcon={
                          companyDetail.isFollowed ? (
                            <BookmarkIcon />
                          ) : (
                            <BookmarkBorderIcon />
                          )
                        }
                        loading={isLoadingFollow}
                        loadingPosition="start"
                        variant={
                          companyDetail.isFollowed ? "contained" : "outlined"
                        }
                        color="primary"
                        sx={{
                          minWidth: 160,
                          borderRadius: 2,
                          boxShadow: "none",
                        }}
                      >
                        <span>
                          {companyDetail.isFollowed
                            ? "Following"
                            : "Follow"}{" "}
                          ({companyDetail.followNumber})
                        </span>
                      </LoadingButton>
                    )}
                  <Button
                    variant="contained"
                    color="primary"
                    startIcon={<ShareIcon />}
                    onClick={() => setOpenSharePopup(true)}
                    sx={{
                      minWidth: 160,
                      borderRadius: 999,
                      px: 2.5,
                      fontWeight: 700,
                      background: "linear-gradient(45deg, #441da0 30%, #6b45c9 90%)",
                      boxShadow: "0 12px 24px rgba(68,29,160,0.22)",
                      "&:hover": {
                        background: "linear-gradient(45deg, #2f1578 30%, #5a39b1 90%)",
                        boxShadow: "0 14px 28px rgba(68,29,160,0.28)",
                        transform: "translateY(-1px)",
                      },
                    }}
                  >
                    Share company
                  </Button>
                </Stack>
              </Stack>
            </Box>
          </Card>

          <Box>
            <Grid container spacing={3}>
              <Grid item xs={12} md={8}>
                <Card
                  sx={{
                    p: 3,
                    boxShadow: (theme) => theme.customShadows.small,
                  }}
                >
                  <Stack spacing={4}>
                    <Box>
                      <Typography
                        variant="h5"
                        gutterBottom
                        sx={{
                          color: "primary.main",
                          fontWeight: 600,
                          mb: 3,
                        }}
                      >
                        About the Company
                      </Typography>
                      <Box
                        sx={{
                          p: 2.5,
                          borderRadius: 2,
                          bgcolor: "grey.50",
                        }}
                      >
                        <Typography
                          sx={{
                            textAlign: "justify",
                            color: "text.secondary",
                            lineHeight: 1.8,
                          }}
                        >
                          {companyDetail?.description ? (
                            <RichHtmlContent html={companyDetail?.description} />
                          ) : (
                            <span
                              style={{
                                color: "#e0e0e0",
                                fontStyle: "italic",
                                fontSize: 13,
                              }}
                            >
                              Not updated
                            </span>
                          )}
                        </Typography>
                      </Box>
                    </Box>

                    <CompanyOpenInfo
                      companyName={companyDetail?.companyName}
                      websiteUrl={companyDetail?.websiteUrl}
                      locationName={
                        companyDetail?.location?.address ||
                        allConfig?.cityDict?.[companyDetail?.location?.city] ||
                        ""
                      }
                    />

                    <Box>
                      <Typography
                        variant="h5"
                        gutterBottom
                        sx={{
                          color: "primary.main",
                          fontWeight: 600,
                          mb: 3,
                        }}
                      >
                        Jobs hiring
                      </Typography>
                      <FilterJobPostCard
                        params={{
                          companyId: companyDetail.id,
                        }}
                      />
                    </Box>
                  </Stack>
                </Card>
              </Grid>

              <Grid item xs={12} md={4}>
                <Box sx={{ mb: 2 }}>
                  <HiringCTA variant="card" />
                </Box>
                <Card
                  sx={{
                    p: 3,
                    boxShadow: (theme) => theme.customShadows.small,
                  }}
                >
                  <Stack spacing={3}>
                    <Box>
                      <Typography
                        variant="h6"
                        sx={{
                          color: "primary.main",
                          mb: 2,
                        }}
                      >
                        Website
                      </Typography>
                      <Typography
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          gap: 1,
                          color: "text.secondary",
                          "& svg": {
                            color: "primary.main",
                          },
                        }}
                      >
                        <FontAwesomeIcon icon={faGlobe} />
                        {companyDetail.websiteUrl ? (
                          <Link
                            target="_blank"
                            href={companyDetail.websiteUrl}
                            sx={{
                              color: "primary.main",
                              textDecoration: "none",
                              "&:hover": {
                                textDecoration: "underline",
                              },
                            }}
                          >
                            {companyDetail.websiteUrl}
                          </Link>
                        ) : (
                          <span
                            style={{
                              color: "#e0e0e0",
                              fontStyle: "italic",
                              fontSize: 13,
                            }}
                          >
                            Not updated
                          </span>
                        )}
                      </Typography>
                    </Box>

                    {/* Social Media Links */}
                    <Box>
                      <Typography
                        variant="h6"
                        sx={{
                          color: "primary.main",
                          mb: 2,
                        }}
                      >
                        Follow on
                      </Typography>
                      <Stack
                        direction="row"
                        spacing={1}
                        sx={{
                          "& .MuiIconButton-root": {
                            bgcolor: "grey.50",
                           transition: "all 0.2s",
                            "&:hover": {
                             transform: "translateY(-2px)",
                            },
                          },
                        }}
                      >
                        {companyDetail?.facebookUrl && (
                          <IconButton color="primary" aria-label="facebook">
                            <img width="30" src={ICONS.FACEBOOK} alt="" />
                          </IconButton>
                        )}
                        {companyDetail?.youtubeUrl && (
                          <IconButton color="primary" aria-label="youtube">
                            <img width="30" src={ICONS.YOUTUBE} alt="" />
                          </IconButton>
                        )}
                        {companyDetail?.linkedinUrl && (
                          <IconButton color="primary" aria-label="linked">
                            <img width="30" src={ICONS.LINKEDIN} alt="" />
                          </IconButton>
                        )}
                      </Stack>
                    </Box>

                    {/* Company Info */}
                    <Box>
                      <Typography
                        variant="h6"
                        sx={{
                          color: "primary.main",
                          mb: 2,
                        }}
                      >
                        General Information
                      </Typography>
                      <Stack
                        spacing={2}
                        sx={{
                          "& .MuiTypography-root": {
                            display: "flex",
                            alignItems: "center",
                            gap: 1,
                            color: "text.secondary",
                            "& svg": {
                              color: "primary.main",
                            },
                          },
                        }}
                      >
                        <Typography>
                          <FontAwesomeIcon
                            icon={faEnvelope}
                            style={{ marginRight: 6 }}
                          />{" "}
                          {companyDetail.companyEmail}
                        </Typography>
                        <Typography sx={{ mt: 1 }}>
                          <FontAwesomeIcon
                            icon={faPhoneVolume}
                            style={{ marginRight: 6 }}
                          />{" "}
                          {companyDetail.companyPhone}
                        </Typography>
                        <Typography sx={{ mt: 1 }}>
                          <FontAwesomeIcon
                            icon={faHashtag}
                            style={{ marginRight: 6 }}
                          />{" "}
                          {companyDetail.taxCode}
                        </Typography>
                        <Typography sx={{ mt: 1 }}>
                          <FontAwesomeIcon
                            icon={faLocationDot}
                            style={{ marginRight: 6 }}
                          />{" "}
                          {companyDetail.location?.address || (
                            <span
                              style={{
                                color: "#e0e0e0",
                                fontStyle: "italic",
                                fontSize: 13,
                              }}
                            >
                              Not updated
                            </span>
                          )}
                        </Typography>
                      </Stack>
                    </Box>

                    {/* Map */}
                    <Box>
                      <Typography
                        variant="h6"
                        sx={{
                          color: "primary.main",
                          mb: 2,
                        }}
                      >
                        Map
                      </Typography>
                      <Box
                        sx={{
                          borderRadius: 2,
                          overflow: "hidden",
                          border: "1px solid",
                          borderColor: "grey.200",
                        }}
                      >
                        <Map
                          title={companyDetail?.companyName}
                          subTitle={companyDetail?.location?.address}
                          latitude={companyDetail?.location?.lat}
                          longitude={companyDetail?.location?.lng}
                          addressForGeocode={companyDetail?.location?.address || ""}
                          fallbackQuery={[
                            companyDetail?.location?.address,
                            allConfig?.cityDict?.[companyDetail?.location?.city],
                          ]
                            .filter(Boolean)
                            .join(" ")}
                        />
                      </Box>
                    </Box>

                    {/* Image Gallery */}
                    {imageList.length > 0 && (
                      <Box>
                        <Typography
                          variant="h6"
                          sx={{
                            color: "primary.main",
                            mb: 2,
                          }}
                        >
                          Images
                        </Typography>
                        <Box
                          sx={{
                            borderRadius: 2,
                            overflow: "hidden",
                            border: "1px solid",
                            borderColor: "grey.200",
                          }}
                        >
                          <ImageGalleryCustom images={imageList} />
                        </Box>
                      </Box>
                    )}
                  </Stack>
                </Card>
              </Grid>
            </Grid>
          </Box>
        </Stack>
      </Box>

      {/* Start: SocialNetworkSharingPopup */}
      <SocialNetworkSharingPopup
        open={openSharePopup}
        onClose={() => setOpenSharePopup(false)}
        shareData={shareData}
      />
      {/* End: SocialNetworkSharingPopup */}
    </>
  );
};

export default CompanyDetailPage;
