import 'swiper/css';
import 'swiper/css/grid';
import 'swiper/css/pagination';

import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper';
import { Box, Link } from '@mui/material';

import HomeSearch from '../../../../pages/components/defaults/HomeSearch';
import MuiImageCustom from '../../../../components/MuiImageCustom';
import myjobService from '../../../../services/myjobService';
import { BANNER_TYPES } from '../../../../configs/constants';

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

const RenderItem = ({ item }) => {
  return (
    <MuiImageCustom
      width="100%"
      height={320}
      src={item.imageUrl}
      fit="cover"
    />
  );
};

const TopSlide = () => {
  const [banners, setBanners] = React.useState([]);

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

  return (
    <Box
      className="justify-content-center"
      style={{ height: 320, position: 'relative' }}
      sx={{
        borderRadius: 4,
        overflow: "hidden",
        // Gradient fallback so the hero always looks finished,
        // even before banners load or if none are published.
        backgroundImage:
          "linear-gradient(120deg, #2f1578 0%, #441da0 45%, #6d28d9 75%, #b45309 130%)",
        boxShadow: "0 18px 50px -16px rgba(47, 21, 120, 0.55)",
        border: "1px solid rgba(255, 255, 255, 0.14)",
      }}
    >
      <Box sx={styles}>
        <Swiper
          spaceBetween={30}
          pagination={{
            clickable:true,
            dynamicBullets:true,
          }}
          autoplay={{
            delay: 6000,
            disableOnInteraction: false,
          }}
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
      {/* Legibility gradient under the search + pagination */}
      <Box
        sx={{
          position: 'absolute',
          left: 0,
          right: 0,
          bottom: 0,
          height: 120,
          background:
            'linear-gradient(180deg, rgba(47,21,120,0) 0%, rgba(47,21,120,0.45) 100%)',
          pointerEvents: 'none',
          zIndex: 5,
        }}
      />
      <Box
        sx={{
          position: 'absolute',
          left: 0,
          right: 0,
          top: {
            xs: 0,
            sm: '20%',
            md: '20%',
            lg: '20%',
            xl: '20%',
          },
          display: 'flex',
          justifyContent: 'center',
          paddingLeft: {
            xs: 2,
            sm: '5%',
            md: '5%',
            lg: '5%',
            xl: '5%',
          },
          paddingRight: {
            xs: 2,
            sm: '5%',
            md: '5%',
            lg: '5%',
            xl: '5%',
          },
          zIndex: 10,
        }}
      >
        <Box sx={{ width: '100%', maxWidth: 760 }}>
          <HomeSearch />
        </Box>
      </Box>
    </Box>
  );
};

export default TopSlide;
