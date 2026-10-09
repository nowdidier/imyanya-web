import 'swiper/css';
import 'swiper/css/grid';
import 'swiper/css/pagination';

import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper';
import { Box, Chip, Link, Stack, Typography } from '@mui/material';
import BoltIcon from '@mui/icons-material/Bolt';
import VerifiedIcon from '@mui/icons-material/Verified';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';

import HomeSearch from '../../../../pages/components/defaults/HomeSearch';
import MuiImageCustom from '../../../../components/MuiImageCustom';
import myjobService from '../../../../services/myjobService';
import { BANNER_TYPES, ROUTES } from '../../../../configs/constants';
import { searchJobPost } from '../../../../redux/filterSlice';

const styles = {
  ".swiper-pagination-bullet": {
    width: 10,
    height: 10,
    opacity: 0.5,
    backgroundColor: "#c4b5fd",
  },
  ".swiper-pagination-bullet-active": {
    width: 28,
    height: 10,
    opacity: 1,
    borderRadius: 999,
    backgroundImage:
      "linear-gradient(90deg, #ff9800 0%, #8b5cf6 100%)",
    boxShadow: "0 2px 10px rgba(139, 92, 246, 0.7)",
  },
};

const TRENDING = [
  "Kigali jobs",
  "NGO jobs",
  "Internships",
  "Remote jobs",
  "Accounting",
  "Teaching",
];

const TRUST = ["100% Free", "Verified employers", "New jobs daily"];

const RenderItem = ({ item }) => {
  return (
    <MuiImageCustom
      width="100%"
      height={420}
      src={item.imageUrl}
      fit="cover"
    />
  );
};

const TopSlide = () => {
  const [banners, setBanners] = React.useState([]);
  const dispatch = useDispatch();
  const nav = useNavigate();

  React.useEffect(() => {
    const getBanners = async () => {
     try {
        const resData = await myjobService.getBanners({type: BANNER_TYPES.HOME});

        const data = resData?.data || [];

        setBanners(data);
      } catch (error) {
        console.error(error);
      }
    };

    getBanners();
  }, []);

  const handleTrending = (kw) => {
    dispatch(searchJobPost({ kw, cityId: "", careerId: "" }));
    try {
      localStorage.setItem("myjob_search_history", JSON.stringify([kw]));
    } catch (e) {
      // ignore
    }
    nav(`/${ROUTES.JOB_SEEKER.JOBS_EN}`);
  };

  return (
    <Box
      component="section"
      aria-label="Find jobs in Rwanda — search"
      className="justify-content-center"
      style={{ minHeight: 420, position: 'relative' }}
      sx={{
        borderRadius: 4,
        overflow: "hidden",
        backgroundImage:
          "linear-gradient(120deg, #1e0b4d 0%, #2f1578 30%, #441da0 55%, #6d28d9 80%, #b45309 135%)",
        boxShadow: "0 18px 50px -16px rgba(47, 21, 120, 0.55)",
        border: "1px solid rgba(255, 255, 255, 0.14)",
      }}
    >
      {/* Decorative glows — pure visual attention, zero layout cost */}
      <Box sx={{ position: "absolute", inset: 0, pointerEvents: "none", zIndex: 1 }}>
        <Box sx={{ position: "absolute", top: -80, right: -60, width: 320, height: 320, borderRadius: "50%", background: "radial-gradient(circle, rgba(255,152,0,0.35), transparent 65%)" }} />
        <Box sx={{ position: "absolute", bottom: -100, left: -60, width: 360, height: 360, borderRadius: "50%", background: "radial-gradient(circle, rgba(139,92,246,0.4), transparent 65%)" }} />
      </Box>

      {/* Banner slideshow stays behind the search overlay */}
      {banners.length > 0 && (
        <Box sx={{ position: "absolute", inset: 0, opacity: 0.35, zIndex: 0 }}>
          <Box sx={styles}>
            <Swiper
              spaceBetween={30}
              pagination={{ clickable:true, dynamicBullets:true }}
              autoplay={{ delay: 6000, disableOnInteraction: false }}
              modules={[Autoplay, Pagination]}
              className="mySwiper"
              style={{ height: '100%' }}
            >
              {banners.map((value) => (
                <Box key={value.id}>
                  <SwiperSlide style={{ cursor: 'pointer' }}>
                    <Link href={value?.buttonLink} target="_blank">
                      <RenderItem item={value} />{' '}
                    </Link>
                  </SwiperSlide>
                </Box>
              ))}
            </Swiper>
          </Box>
        </Box>
      )}

      {/* Legibility gradient under the search + pagination */}
      <Box
        sx={{
          position: 'absolute',
          left: 0, right: 0, bottom: 0, height: 140,
          background: 'linear-gradient(180deg, rgba(30,11,77,0) 0%, rgba(30,11,77,0.55) 100%)',
          pointerEvents: 'none', zIndex: 5,
        }}
      />

      <Box
        sx={{
          position: 'relative', zIndex: 10,
          display: 'flex', justifyContent: 'center',
          px: { xs: 2, sm: 4, md: 6 }, py: { xs: 4, sm: 5, md: 6 },
        }}
      >
        <Box sx={{ width: '100%', maxWidth: 860, textAlign: "center" }}>
          <Chip
            icon={<BoltIcon sx={{ fontSize: 14 }} />}
            label="LIVE • RWANDA'S #1 JOB PORTAL"
            size="small"
            sx={{
              bgcolor: "rgba(255,152,0,0.16)", color: "#ffd54f",
              border: "1px solid rgba(255,152,0,0.5)", fontWeight: 800,
              letterSpacing: 1.1, fontSize: 11, mb: 1.5,
              animation: "heroGlow 2.4s ease-in-out infinite",
              "@keyframes heroGlow": {
                "0%,100%": { boxShadow: "0 0 0 0 rgba(255,152,0,0.45)" },
                "50%": { boxShadow: "0 0 0 8px rgba(255,152,0,0)" },
              },
            }}
          />
          {/* THE H1 — critical for ranking #1 on "jobs in Rwanda" */}
          <Typography
            component="h1"
            variant="h1"
            sx={{
              color: "white", fontWeight: 800, lineHeight: 1.12,
              fontSize: { xs: 30, sm: 40, md: 48 }, letterSpacing: "-0.02em",
              textShadow: "0 4px 30px rgba(0,0,0,0.4)",
            }}
          >
            Find Jobs in Rwanda{" "}
            <Box component="span" sx={{ backgroundImage: "linear-gradient(90deg,#ffb74d,#ff9800)", WebkitBackgroundClip: "text", backgroundClip: "text", color: "transparent" }}>
              — Imyanya y&apos;akazi
            </Box>
          </Typography>
          <Typography
            variant="body1"
            sx={{ color: "rgba(255,255,255,0.88)", mt: 1.5, mb: 2.5, fontSize: { xs: 15, sm: 17 }, lineHeight: 1.65, maxWidth: 680, mx: "auto" }}
          >
            Daily <strong>Kigali vacancies</strong>, <strong>NGO jobs</strong>, internships & remote roles.
            Build a free CV, get alerts before deadlines — and apply in 1 click.
          </Typography>

          <Box sx={{ textAlign: "left" }}>
            <HomeSearch />
          </Box>

          <Stack direction="row" spacing={1} alignItems="center" justifyContent="center" sx={{ mt: 2, flexWrap: "wrap", rowGap: 1 }}>
            <Typography variant="caption" sx={{ color: "rgba(255,255,255,0.7)", fontWeight: 700, display: "flex", alignItems: "center", gap: 0.5 }}>
              <TrendingUpIcon sx={{ fontSize: 14 }} /> Trending:
            </Typography>
            {TRENDING.map((kw) => (
              <Chip
                key={kw}
                label={kw}
                size="small"
                clickable
                onClick={() => handleTrending(kw)}
                sx={{
                  bgcolor: "rgba(255,255,255,0.12)", color: "white",
                  border: "1px solid rgba(255,255,255,0.22)", fontWeight: 600,
                  "&:hover": { bgcolor: "rgba(255,255,255,0.22)" },
                }}
              />
            ))}
          </Stack>

          <Stack direction="row" spacing={1} justifyContent="center" sx={{ mt: 1.5, flexWrap: "wrap", rowGap: 1 }}>
            {TRUST.map((t) => (
              <Chip
                key={t}
                icon={<VerifiedIcon sx={{ fontSize: 14, color: "#4caf50 !important" }} />}
                label={t}
                size="small"
                sx={{ bgcolor: "rgba(255,255,255,0.95)", fontWeight: 700, color: "#2f1578" }}
              />
            ))}
            <Chip
              component={RouterLink}
              to={`/${ROUTES.AUTH.REGISTER}`}
              label="Join free in 60s →"
              size="small"
              clickable
              sx={{ bgcolor: "#ff9800", color: "#2f1578", fontWeight: 800, "&:hover": { bgcolor: "#ffb74d" } }}
            />
          </Stack>
        </Box>
      </Box>
    </Box>
  );
};

export default TopSlide;
