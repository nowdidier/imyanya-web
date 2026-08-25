import 'swiper/css';
import 'swiper/css/pagination';

import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Pagination, Autoplay } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Box, Card, IconButton, Skeleton, Stack, Typography } from '@mui/material';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

import MuiImageCustom from '../MuiImageCustom';
import companyService from '../../services/companyService';
import { ROUTES } from '../../configs/constants';
import { formatRoute } from '../../utils/funcUtils';

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

const Loading = () => {
  return (
    <>
      <div id="top-company-carousel-loading">
        <Card
          sx={{
            alignItems: 'center',
            boxShadow: 0,
            p: 2,
            mb: 0.5,
            minHeight: 165,
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
      </div>
    </>
  );
};

const TopCompanyCarousel = () => {
  const nav = useNavigate();
  const [isLoading, setIsLoading] = React.useState(true);
  const [companies, setCompanies] = React.useState([]);
  const [swiperInstance, setSwiperInstance] = React.useState(null);

  React.useEffect(() => {
    const getTopCompanies = async () => {
      setIsLoading(true);
     try {
        const resData = await companyService.getTopCompanies();

        setCompanies(resData?.data || []);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    getTopCompanies();
  }, []);

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
          clickable:true,
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
        {isLoading
          ? Array.from(Array(10).keys()).map((value) => (
              <SwiperSlide key={value}>
                <Loading />
              </SwiperSlide>
            ))
          : companies.map((value) => (
              <SwiperSlide key={value.id}>
                <Card
                  sx={{
                    boxShadow: 0,
                    alignItems: 'center',
                    p: 2,
                    mb: 0.5,
                    mt: 1,
                    cursor: 'pointer',
                    minHeight: 165,
                    borderRadius: 3,
                   transition: 'all 0.3s ease',
                    border: '1px solid',
                    borderColor: 'grey.200',
                    bgcolor: 'background.paper',
                    '&:hover': {
                     transform: 'translateY(-4px)',
                      boxShadow: (theme) => theme.customShadows.medium,
                      borderColor: 'primary.main',
                      '& .company-name': {
                        color: 'primary.main',
                      }
                    },
                  }}
                  onClick={() => nav(`/${formatRoute(ROUTES.JOB_SEEKER.COMPANY_DETAIL, value.slug)}`)}
                >
                  <Stack direction="row" justifyContent="center">
                    <MuiImageCustom
                      width={120}
                      height={120}
                      src={value?.companyImageUrl}
                      loading="lazy"
                      duration={1500}
                      sx={{
                        margin: '0 auto',
                        borderRadius: 2,
                        p: 1,
                        bgcolor: 'grey.50'
                      }}
                    />
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
                    {value?.companyName}
                  </Typography>
                </Card>
              </SwiperSlide>
            ))}
      </Swiper>
    </Box>
  );
};

export default TopCompanyCarousel;
