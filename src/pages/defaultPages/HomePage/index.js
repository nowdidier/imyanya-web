import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import {
  Avatar,
  Box,
  Card,
  CardContent,
  CardHeader,
  Stack,
  Typography,
  Button,
} from '@mui/material';

import AccessTimeIcon from '@mui/icons-material/AccessTime';
import TipsAndUpdatesIcon from '@mui/icons-material/TipsAndUpdates';
import SearchIcon from '@mui/icons-material/Search';

import { TabTitle } from '../../../utils/generalFunction';
import { HOME_FILTER_CAREER, ROLES_NAME } from '../../../configs/constants';
import TopCompanyCarousel from '../../../components/TopCompanyCarousel';
import CareerCarousel from '../../../components/CareerCarousel';
import FeedbackCarousel from '../../../components/FeedbackCarousel';
import JobByCategory from '../../components/defaults/JobByCategory';
import FilterJobPostCard from '../../components/defaults/FilterJobPostCard';
import SuggestedJobPostCard from '../../components/defaults/SuggestedJobPostCard';

export default function HomePage() {
  TabTitle("Shakisha akazi vuba, tombora abakozi bakora neza ku IMYANYA")
  const { isAuthenticated, currentUser } = useSelector((state) => state.user);
  const nav = useNavigate()

  return (
    <>
      <Box sx={{ mt: 6 }}>
        {/* Start: Top companies */}
        <Typography variant="h5" sx={{ mb: 3 }} gutterBottom>
          Ibigo bikomeye
        </Typography>
        <TopCompanyCarousel />
        {/* End: Top companies */}
      </Box>

      <Box sx={{ mt: 10 }}>
        {/* Start: Urgent job openings */}
        <Card variant="outlined">
          <CardHeader
            avatar={
              <Avatar sx={{ bgcolor: 'white' }} aria-label="recipe">
                <AccessTimeIcon color="secondary" />
              </Avatar>
            }
            title={
              <Typography variant="h5" sx={{ color: 'white' }}>
                Imyanya y'akazi yihutirwa vuba vuba 
              </Typography>
            }
            sx={{
              backgroundColor: '#182642',
              p: { xs: 0.75, sm: 1, md: 1.5, lg: 1.5, xl: 1.5 },
            }}
          />
          <CardContent>
            <Box sx={{ p: { xs: 0, sm: 0, md: 0, lg: 2, xl: 2 } }}>
              <FilterJobPostCard
                params={{
                  isUrgent: true,
                }}
              />
            </Box>
          </CardContent>
        </Card>
        {/* End: Urgent job openings */}
      </Box>

      <Box sx={{ mt: 10 }}>
        {/* Start: Job categories */}
        <Typography variant="h5" sx={{ mb: 3 }} gutterBottom>
          Shakisha imyanya y' akazi vuba
        </Typography>
        <CareerCarousel />
        {/* End: Job categories */}
      </Box>

      {isAuthenticated && currentUser?.roleName === ROLES_NAME.JOB_SEEKER && (
        <Box sx={{ mt: 10 }}>
          {/* Start: Recommended jobs */}
          <Card variant="outlined">
            <CardHeader
              avatar={
                <Avatar sx={{ bgcolor: 'white' }} aria-label="recipe">
                  <TipsAndUpdatesIcon color="secondary" />
                </Avatar>
              }
              title={
                <Typography variant="h5" sx={{ color: '#182642' }}>
                  Imirimo igushishikaje
                </Typography>
              }
              sx={{
                backgroundImage: `url('${require('../../../assets/images/banner-explore.png')}')`,
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat',
                p: { xs: 0.75, sm: 1, md: 1.5, lg: 1.5, xl: 1.5 },
              }}
            />
            <CardContent sx={{ backgroundColor: '#e0f0ff' }}>
              <Box sx={{ p: { xs: 0, sm: 0, md: 0, lg: 2, xl: 2 } }}>
                {/* Start: SuggestedJobPostCard */}
                <SuggestedJobPostCard />
                {/* End: SuggestedJobPostCard */}
              </Box>
            </CardContent>
          </Card>
          {/* End: Recommended jobs */}
        </Box>
      )}

      <Box
        sx={{
          borderRadius: 1,
          p: 4,
          mt: 6,
          backgroundImage: `url('${require('../../../assets/images/banner-explore-pc.png')}')`,
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
        }}
      >
        <Stack
          direction={{
            xs: 'column',
            sm: 'row',
            md: 'row',
            lg: 'row',
            xl: 'row',
          }}
          justifyContent="space-between"
          spacing={2}
        >
          <Box>
            <Typography fontSize={32} fontWeight="bold" color="white">
              Wifuza kubona akazi kaguhwanye?
            </Typography>
          </Box>
          <Box>
            <Button
              variant="contained"
              color="primary"
              size="large"
              startIcon={<SearchIcon />}
              onClick={() => nav('/viec-lam')}
            >
              Tangira gushakashaka
            </Button>
          </Box>
        </Stack>
      </Box>

      <Box sx={{ mt: 6 }}>
        {/* Start: Jobs by industry */}
        <Card variant="outlined">
          <CardHeader
            avatar={
              <Avatar sx={{ bgcolor: 'white' }} aria-label="recipe">
                {HOME_FILTER_CAREER[0].titleIcon}
              </Avatar>
            }
            title={
              <Typography variant="h5" sx={{ color: 'white' }}>
                {`Akazi k' ingandah ${HOME_FILTER_CAREER[0].name}`}
              </Typography>
            }
            sx={{
              backgroundColor: '#182642',
              p: { xs: 0.75, sm: 1, md: 1.5, lg: 1.5, xl: 1.5 },
            }}
          />
          <CardContent>
            <Box sx={{ p: { xs: 0, sm: 0, md: 0, lg: 2, xl: 2 } }}>
              <FilterJobPostCard
                params={{
                  careerId: HOME_FILTER_CAREER[0].id,
                }}
              />
            </Box>
          </CardContent>
        </Card>
        {/* End: Jobs by industry */}
      </Box>

      <Box sx={{ mt: 10 }}>
        {/* Start: Jobs by industry */}
        <Card variant="outlined">
          <CardHeader
            avatar={
              <Avatar sx={{ bgcolor: 'white' }} aria-label="recipe">
                {HOME_FILTER_CAREER[1].titleIcon}
              </Avatar>
            }
            title={
              <Typography variant="h5" sx={{ color: 'white' }}>
                {`Akazi k' ingandah ${HOME_FILTER_CAREER[1].name}`}
              </Typography>
            }
            sx={{
              backgroundColor: '#182642',
              p: { xs: 0.75, sm: 1, md: 1.5, lg: 1.5, xl: 1.5 },
            }}
          />
          <CardContent>
            <Box sx={{ p: { xs: 0, sm: 0, md: 0, lg: 2, xl: 2 } }}>
              <FilterJobPostCard
                params={{
                  careerId: HOME_FILTER_CAREER[1].id,
                }}
              />
            </Box>
          </CardContent>
        </Card>
        {/* End: Jobs by industry */}
      </Box>

      <Box sx={{ mt: 10 }}>
        {/* Start: Feedback */}
        <Typography variant="h5" sx={{ mb: 3 }} gutterBottom>
          User reviews
        </Typography>
        <FeedbackCarousel />
        {/* End: Feedback */}
      </Box>

      <Box sx={{ mt: 10 }}>
        {/* Start: Job by category */}
        <Card sx={{ boxShadow: 0 }}>
          <CardContent>
            <Box
              sx={{
                py: { xs: 1, sm: 1, md: 2, lg: 4, xl: 4 },
                px: { xs: 1, sm: 1, md: 2, lg: 6, xl: 6 },
              }}
            >
              <JobByCategory />
            </Box>
          </CardContent>
        </Card>
        {/* End: Job by category */}
      </Box>
    </>
  );
}
