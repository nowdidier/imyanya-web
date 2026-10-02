import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Chip, Pagination, Stack, Typography } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

import { ImageSvg3 } from '../../../../configs/constants';
import JobPostLarge from '../../../../components/JobPostLarge';
import NoDataCard from '../../../../components/NoDataCard';
import HiringCTA from '../../../../components/HiringCTA';
import jobService from '../../../../services/jobService';
import { setContentNoindex } from '../../../../components/SeoManager/contentFlag';
import { searchJobPost } from '../../../../redux/filterSlice';

const MainJobPostCard = () => {
  const { jobPostFilter } = useSelector((state) => state.filter);
  const { allConfig } = useSelector((state) => state.config);
  const dispatch = useDispatch();
  const { pageSize } = jobPostFilter;
  const [isLoading, setIsLoading] = React.useState(true);
  const [jobPosts, setJobPosts] = React.useState([]);
  const [page, setPage] = React.useState(1);
  const [count, setCount] = React.useState(0);

  const popularCareers = React.useMemo(
    () => (allConfig?.careerOptions || []).slice(0, 6),
    [allConfig]
  );

  const handleSuggestion = (careerId) => {
    dispatch(
      searchJobPost({
        ...jobPostFilter,
        kw: '',
        careerId: careerId,
        page: 1,
      })
    );
  };

  React.useEffect(() => {
    const getJobPosts = async () => {
      setIsLoading(true);
     try {
        const resData = await jobService.getJobPosts({
          ...jobPostFilter,
          page: page,
        });

        const data = resData.data;

        setCount(data.count);
        setJobPosts(data?.results || []);
        setContentNoindex(
          (data?.results || []).length === 0 ? "empty-jobs" : null
        );
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    getJobPosts();
  }, [jobPostFilter, page]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  return (
    <>
      <Box 
        sx={{ 
          pt: 3, 
          pb: 2,
          display: 'flex',
          alignItems: 'center',
          borderBottom: '1px solid',
          borderColor: 'divider',
          mb: 2,
        }}
      >
        <Typography 
          variant="h5" 
          sx={{
            color: 'text.primary',
            fontWeight: 600,
            display: 'flex',
            alignItems: 'center',
            gap: 1
          }}
        >
          Search Results
          <Box 
            component="span"
            sx={{
              color: 'primary.main',
              fontWeight: 600,
              backgroundColor: 'primary.background',
              padding: '4px 12px',
              borderRadius: '20px',
              fontSize: '0.9em'
            }}
          >
            {count.toLocaleString()} postings
          </Box>
        </Typography>
      </Box>
      <Stack spacing={2}>
        {isLoading ? (
          Array.from(Array(10).keys()).map((value) => (
            <Box key={value}>
              <JobPostLarge.Loading />
            </Box>
          ))
        ) : jobPosts.length === 0 ? (
          <>
            <NoDataCard
              title="No jobs matching your criteria were found"
              imgComponentSgv={<ImageSvg3 />}
            />
            {popularCareers.length > 0 && (
              <Stack spacing={1.5} sx={{ alignItems: 'center', pt: 1, pb: 2 }}>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}
                >
                  <SearchIcon fontSize="small" />
                  Try browsing popular job categories:
                </Typography>
                <Stack direction="row" spacing={1} sx={{ flexWrap: 'wrap', justifyContent: 'center', gap: 1 }}>
                  {popularCareers.map((career) => (
                    <Chip
                      key={career.id}
                      label={career.name}
                      variant="outlined"
                      color="primary"
                      onClick={() => handleSuggestion(career.id)}
                      sx={{ cursor: 'pointer' }}
                    />
                  ))}
                </Stack>
              </Stack>
            )}
          </>
        ) : (
          <>
            {jobPosts.map((value, index) => (
              <React.Fragment key={value.id}>
                <JobPostLarge
                  id={value.id}
                  slug={value.slug}
                  companyImageUrl={value?.companyDict.companyImageUrl}
                  companyName={value?.companyDict.companyName}
                  jobName={value?.jobName}
                  cityId={value?.locationDict?.city}
                  deadline={value?.deadline}
                  isUrgent={value?.isUrgent}
                  isHot={value?.isHot}
                  salaryMin={value.salaryMin}
                  salaryMax={value.salaryMax}
                  imageUrl={value?.imageUrl}
                  jobDescription={value?.jobDescription}
                />
                {(index + 1) % 5 === 0 && <HiringCTA variant="inline" />}
              </React.Fragment>
            ))}
            <Stack sx={{ pt: 2 }}>
              {Math.ceil(count / pageSize) > 1 && (
                <Pagination
                  color="primary"
                  size="medium"
                  variant="text"
                  sx={{ margin: '0 auto' }}
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

export default MainJobPostCard;
