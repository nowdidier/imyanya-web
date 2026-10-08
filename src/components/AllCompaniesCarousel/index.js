import 'swiper/css';
import 'swiper/css/pagination';

import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Pagination, Autoplay } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Avatar, Box, Button, Card, Chip, IconButton, Skeleton, Stack, Typography } from '@mui/material';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

import useOrganisations from '../OrganisationsMap/useOrganisations';
import companyService from '../../services/companyService';
import { buildClaimUrl } from '../ClaimOrganisationButton';

const styles = {
  ".swiper-pagination": {
    bottom: "-5px !important",
  },
  ".swiper-wrapper": {
    paddingBottom: "30px",
    paddingTop: "4px",
  },
  ".swiper-pagination-bullet": {
    width: 12,
    height: 12,
    opacity: 0.5,
    backgroundColor: (theme) => theme.palette.primary.main,
    transition: "all 0.3s ease",
  },
  ".swiper-pagination-bullet-active": {
    width: 24,
    height: 12,
    opacity: 1,
    borderRadius: "6px",
  },
};

const NAV_BUTTON_STYLES = {
  position: "absolute",
  top: "38%",
  zIndex: 10,
  width: { xs: 34, md: 42 },
  height: { xs: 34, md: 42 },
  color: "#441da0",
  bgcolor: "background.paper",
  boxShadow: (theme) => theme.customShadows.small,
  border: "1px solid",
  borderColor: "divider",
  transition: "all 0.2s ease",
  "&:hover": {
    bgcolor: "#441da0",
    color: "white",
  },
};

const initialsOf = (name = "") =>
  String(name || "")
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase() || "?";

const Loading = () => {
  return (
    <Card
      sx={{
        alignItems: 'center',
        boxShadow: 0,
        p: 2,
        mb: 0.5,
        minHeight: 185,
        borderRadius: 3,
        bgcolor: 'background.paper',
      }}
    >
      <Stack direction="row" justifyContent="center">
        <Skeleton
          variant="rounded"
          width={100}
          height={100}
          style={{ margin: '0 auto' }}
        />
      </Stack>
      <Typography
        variant="h6"
        component="h6"
        gutterBottom={true}
        sx={{
          textAlign: 'center',
          mt: 1,
        }}
      >
        <Skeleton />
      </Typography>
    </Card>
  );
};

// Single mixed slides row: EVERY place on the map (registered employers
// plus directory-only organisations) with spotlight "top employers" first —
// using the same shared dataset as OrganisationsMap and the /companies list.
const AllCompaniesCarousel = () => {
  const nav = useNavigate();
  const { orgs, isLoading } = useOrganisations();
  const [swiperInstance, setSwiperInstance] = React.useState(null);
  const [topSlugs, setTopSlugs] = React.useState(() => new Set());

  // Spotlight list so top employers keep their mark inside the mixed row.
  React.useEffect(() => {
    let isMounted = true;
    companyService
      .getTopCompanies()
      .then((resData) => {
        if (!isMounted) return;
        const list = resData?.data || [];
        setTopSlugs(new Set(list.map((c) => c?.slug).filter(Boolean)));
      })
      .catch(() => {});
    return () => {
      isMounted = false;
    };
  }, []);

  // Top employers first (spotlight order kept), then hiring, then alphabetical.
  const slides = React.useMemo(() => {
    const rank = (o) => (topSlugs.has(o.slug) ? 0 : 1);
    return [...orgs].sort((a, b) => {
      const top = rank(a) - rank(b);
      if (top !== 0) return top;
      const hiring = Number(b.jobPostNumber > 0) - Number(a.jobPostNumber > 0);
      if (hiring !== 0) return hiring;
      return String(a.companyName).localeCompare(String(b.companyName));
    });
  }, [orgs, topSlugs]);

  return (
    <Box sx={{ position: 'relative', ...styles }}>
      <IconButton
        aria-label="Previous companies"
        onClick={() => swiperInstance?.slidePrev()}
        sx={{ ...NAV_BUTTON_STYLES, left: { xs: -8, sm: -14, md: -20 } }}
      >
        <ArrowBackIosNewIcon sx={{ fontSize: { xs: 14, md: 18 }, ml: 0.5 }} />
      </IconButton>

      <IconButton
        aria-label="Next companies"
        onClick={() => swiperInstance?.slideNext()}
        sx={{ ...NAV_BUTTON_STYLES, right: { xs: -8, sm: -14, md: -20 } }}
      >
        <ArrowForwardIosIcon sx={{ fontSize: { xs: 14, md: 18 } }} />
      </IconButton>

      <Swiper
        onSwiper={setSwiperInstance}
        slidesPerView={2}
        spaceBetween={15}
        rewind={true}
        pagination={{
          clickable: true,
        }}
        autoplay={{
          delay: 4000,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
        breakpoints={{
          600: {
            slidesPerView: 3,
          },
          900: {
            slidesPerView: 4,
          },
          1200: {
            slidesPerView: 5,
          },
        }}
        modules={[Pagination, Autoplay]}
      >
        {isLoading && slides.length === 0
          ? Array.from(Array(10).keys()).map((value) => (
              <SwiperSlide key={value}>
                <Loading />
              </SwiperSlide>
            ))
          : slides.map((org) => {
              const isTop = topSlugs.has(org.slug);
              const badgeBg = isTop
                ? 'rgba(230,178,0,0.95)'
                : org.hasProfile
                  ? 'rgba(19,115,51,0.9)'
                  : 'rgba(68,29,160,0.9)';
              const badgeColor = isTop ? '#3a2b00' : 'white';
              const badgeLabel = isTop
                ? '★ Top employer'
                : org.hasProfile
                  ? '✓ On Imyanya'
                  : 'No profile yet';
              return (
              <SwiperSlide key={org.key}>
                <Card
                  sx={{
                    position: 'relative',
                    boxShadow: 0,
                    alignItems: 'center',
                    p: 2,
                    mb: 0.5,
                    mt: 1,
                    cursor: 'pointer',
                    minHeight: 185,
                    borderRadius: 3,
                    transition: 'all 0.3s ease',
                    border: '1px solid',
                    borderColor: isTop ? '#e6c200' : org.hasProfile ? 'grey.200' : 'primary.light',
                    borderStyle: org.hasProfile ? 'solid' : 'dashed',
                    bgcolor: isTop ? '#fffdf2' : org.hasProfile ? 'background.paper' : '#faf9ff',
                    '&:hover': {
                      transform: 'translateY(-4px)',
                      boxShadow: (theme) => theme.customShadows.glow,
                      borderColor: 'primary.main',
                      '& .company-name': {
                        color: 'primary.main',
                      }
                    },
                  }}
                  onClick={() => nav(`/companies/${org.slug}`)}
                >
                  <Box
                    sx={{
                      position: 'absolute',
                      top: 8,
                      right: 8,
                      bgcolor: badgeBg,
                      color: badgeColor,
                      borderRadius: 2,
                      px: 1,
                      py: 0.25,
                      zIndex: 1,
                    }}
                  >
                    <Typography variant="caption" sx={{ fontWeight: isTop ? 800 : 700, fontSize: 10 }}>
                      {badgeLabel}
                    </Typography>
                  </Box>
                  <Stack direction="row" justifyContent="center">
                    <Box sx={{ position: 'relative', width: 120, height: 120 }}>
                      <Avatar
                        variant="rounded"
                        sx={{
                          width: 120,
                          height: 120,
                          bgcolor: 'primary.main',
                          color: 'white',
                          fontWeight: 700,
                          fontSize: 36,
                          borderRadius: 2,
                        }}
                      >
                        {initialsOf(org.companyName)}
                      </Avatar>
                      {org.logo && (
                        <Box
                          component="img"
                          src={org.logo}
                          alt={org.companyName}
                          loading="lazy"
                          onError={(e) => {
                            e.currentTarget.style.display = 'none';
                          }}
                          sx={{
                            position: 'absolute',
                            inset: 0,
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                            borderRadius: 2,
                            p: 1,
                            bgcolor: 'grey.50',
                          }}
                        />
                      )}
                    </Box>
                  </Stack>
                  <Typography
                    variant="h6"
                    component="h6"
                    className="company-name"
                    sx={{
                      textAlign: 'center',
                      fontWeight: 600,
                      fontSize: 16,
                      mt: 2,
                      color: 'grey.800',
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      transition: 'color 0.3s ease',
                    }}
                  >
                    {org.companyName}
                  </Typography>
                  <Stack direction="row" justifyContent="center" sx={{ mt: 1 }}>
                    {org.hasProfile ? (
                      <Chip
                        label={org.jobPostNumber > 0 ? `${org.jobPostNumber} open role${org.jobPostNumber === 1 ? '' : 's'}` : 'On Imyanya'}
                        size="small"
                        color={org.jobPostNumber > 0 ? 'success' : 'primary'}
                        sx={{ fontWeight: 700, fontSize: 11 }}
                      />
                    ) : (
                      <Chip
                        label="Come back soon"
                        size="small"
                        variant="outlined"
                        sx={{ fontWeight: 700, fontSize: 11, borderStyle: 'dashed' }}
                      />
                    )}
                  </Stack>
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
                      sx={{ mt: 1, textTransform: 'none', fontWeight: 700 }}
                    >
                      Own this? Create profile
                    </Button>
                  )}
                </Card>
              </SwiperSlide>
              );
            })}
      </Swiper>
    </Box>
  );
};

export default AllCompaniesCarousel;
