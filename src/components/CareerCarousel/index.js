import "swiper/css";
import "swiper/css/pagination";

import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Pagination, Autoplay } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import {
  Box,
  Card,
  IconButton,
  Skeleton,
  Stack,
  Typography,
} from "@mui/material";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

import commonService from "../../services/commonService";
import MuiImageCustom from "../MuiImageCustom";
import { searchJobPost } from "../../redux/filterSlice";
import { ROUTES } from "../../configs/constants";

// Update pagination styles
const styles = {
  ".swiper-pagination": {
    bottom: "-5px !important",
  },
  ".swiper-wrapper": {
    paddingBottom: "35px",
  },
  ".swiper-pagination-bullet": {
    width: 8,
    height: 8,
    opacity: 0.5,
    backgroundColor: (theme) => theme.palette.primary.main,
   transition: "all 0.3s ease",
  },
  ".swiper-pagination-bullet-active": {
    width: 24,
    height: 8,
    opacity: 1,
    borderRadius: "4px",
  },
};

// Update component Loading
const Loading = (
  <Card
    sx={{
      alignItems: "center",
      p: 2,
      mb: 0.5,
      boxShadow: 0,
      backgroundColor: (theme) => theme.palette.background.paper,
     transition: "transform 0.2s ease-in-out",
      borderRadius: "16px",
    }}
  >
    <Skeleton
      variant="rounded"
      width={72}
      height={72}
      style={{ margin: "0 auto", borderRadius: "12px" }}
    />
    <Typography variant="h6" sx={{ mt: 2, mb: 1 }}>
      <Skeleton width="80%" style={{ margin: "0 auto" }} />
    </Typography>
    <Typography variant="caption">
      <Skeleton width="60%" style={{ margin: "0 auto" }} />
    </Typography>
  </Card>
);

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

const CareerCarousel = () => {
  const dispatch = useDispatch();
  const nav = useNavigate();
  const { jobPostFilter } = useSelector((state) => state.filter);
  const [isLoading, setIsLoading] = React.useState(true);
  const [topCareers, setTopCareers] = React.useState([]);
  const [swiperInstance, setSwiperInstance] = React.useState(null);

  React.useEffect(() => {
    const getTopCarreers = async () => {
      setIsLoading(true);

     try {
        const resData = await commonService.getTop10Careers();

        setTopCareers(resData.data);
      } catch (error) {
        console.error("Failed to load top careers:", error);
      } finally {
        setIsLoading(false);
      }
    };

    getTopCarreers();
  }, []);

  const handleFilter = (id) => {
    dispatch(searchJobPost({ ...jobPostFilter, careerId: id }));
    nav(`/${ROUTES.JOB_SEEKER.JOBS_EN}`);
  };

  return (
    <Box sx={{ position: "relative", ...styles }}>
      <IconButton
        aria-label="Previous categories"
        onClick={() => swiperInstance?.slidePrev()}
        sx={{ ...NAV_BUTTON_STYLES, left: { xs: -8, sm: -14, md: -20 } }}
      >
        <ArrowBackIosNewIcon sx={{ fontSize: { xs: 14, md: 18 }, ml: 0.5 }} />
      </IconButton>

      <IconButton
        aria-label="Next categories"
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
        {isLoading
          ? Array.from(Array(10).keys()).map((value) => (
              <SwiperSlide key={value}>{Loading}</SwiperSlide>
            ))
          : topCareers.map((value) => (
              <SwiperSlide key={value.id}>
                <Card
                  variant="outlined"
                  sx={{
                    alignItems: "center",
                    p: 2,
                    mb: 0.5,
                    cursor: "pointer",
                    boxShadow: 0,
                    backgroundColor: (theme) => theme.palette.background.paper,
                    borderRadius: "16px",
                    borderColor: "grey.200",
                    transition: "all 0.3s ease",
                    "&:hover": {
                     transform: "translateY(-4px)",
                      boxShadow: (theme) => theme.customShadows.glow,
                      borderColor: "rgba(109, 40, 217, 0.35)",
                      "& .career-icon": {
                        transform: "scale(1.05)",
                      },
                      "& .career-name": {
                        color: (theme) => theme.palette.primary.main,
                      },
                    },
                  }}
                  onClick={() => handleFilter(value.id)}
                >
                  <Stack
                    direction="row"
                    justifyContent="center"
                    sx={{
                      p: 2,
                      "& .career-icon": {
                       transition: "transform 0.3s ease",
                      },
                    }}
                  >
                    <MuiImageCustom
                      width={72}
                      height={72}
                      src={value?.iconUrl}
                      className="career-icon"
                      sx={{
                        borderRadius: "12px",
                        p: 1,
                        backgroundColor: (theme) => theme.palette.primary.background,
                      }}
                    />
                  </Stack>
                  <Typography
                    className="career-name"
                    variant="h6"
                    component="h6"
                    gutterBottom={true}
                    sx={{
                      textAlign: "center",
                      fontWeight: "bold",
                      fontSize: "1rem",
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                     transition: "color 0.3s ease",
                      px: 1,
                    }}
                  >
                    {value?.name}
                  </Typography>
                  <Typography
                    variant="caption"
                    display="block"
                    gutterBottom
                    sx={{
                      textAlign: "center",
                      color: (theme) => theme.palette.text.secondary,
                      backgroundColor: (theme) => theme.palette.primary.background,
                      px: 2,
                      py: 0.5,
                      borderRadius: "20px",
                      fontSize: "0.75rem",
                    }}
                  >
                    {value.jobPostTotal} Jobs
                  </Typography>
                </Card>
              </SwiperSlide>
            ))}
      </Swiper>
    </Box>
  );
};

export default CareerCarousel;
