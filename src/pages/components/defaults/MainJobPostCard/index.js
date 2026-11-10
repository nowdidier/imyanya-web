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
  const dispatch = useDispatch();
  const { jobPostFilter } = useSelector((state) => state.filter);
  const { allConfig } = useSelector((state) => state.config);
  const pageSize = jobPostFilter?.pageSize || 10;
  const [isLoading, setIsLoading] = React.useState(true);
  const [jobPosts, setJobPosts] = React.useState([]);
  const [page, setPage] = React.useState(1);
  const [count, setCount] = React.useState(0);

  const filterKey = React.useMemo(
    () => JSON.stringify({ ...jobPostFilter, page: undefined }),
    [jobPostFilter]
  );

  React.useEffect(() => {
    setPage(1);
  }, [filterKey]);

  const popularCareers = React.useMemo(
    () => (allConfig?.careerOptions || []).slice(0, 6),
    [allConfig]
  );

  const handleSuggestion = (careerId) => {
    dispatch(
      searchJobPost({
        ...jobPostFilter,
        kw: '',
        careerId,
        page: 1,
      })
    );
  };

  React.useEffect(() => {
    let isActive = true;
    const getJobPosts = async () => {
      setIsLoading(true);
      try {
        const resData = await jobService.getJobPosts({
          ...jobPostFilter,
          page,
        });
        if (!isActive) return;
        const data = resData.data || {};
        const results = data?.results || [];
        setCount(data.count || 0);
        setJobPosts(results);
        setContentNoindex(results.length === 0 ? 'empty-jobs' : null);
      } catch (error) {
        if (isActive) {
          setJobPosts([]);
          setCount(0);
          console.error(error);
        }
      } finally {
        if (isActive) setIsLoading(false);
      }
    };

    getJobPosts();
    return () => {
      isActive = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filterKey, page]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
    window.scrollTo({ top: 0, behavior: 'smooth' });
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
            flexWrap: 'wrap',
            gap: 1,
          }}
        >
          Search results
          <Box
            component="span"
            sx={{
              color: 'primary.main',
              fontWeight: 600,
              backgroundColor: 'primary.background',
              padding: '4px 12px',
              borderRadius: '20px',
              fontSize: '0.9em',
            }}
          >
            {count.toLocaleString()} jobs
          </Box>
        </Typography>
      </Box>
      <Stack spacing={2}>
        {isLoading ? (
          Array.from({ length: 6 }).map((_, idx) => (
            <Box key={idx}>
              <JobPostLarge.Loading />
            </Box>
          ))
        ) : jobPosts.length === 0 ? (
          <>
            <NoDataCard
              title="No jobs matched your search"
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
                  Try a popular job category:
                </Typography>
                <Stack
                  direction="row"
                  sx={{ flexWrap: 'wrap', justifyContent: 'center', gap: 1 }}
                >
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
              <React.Fragment key={value.id || value.slug || index}>
                <JobPostLarge
                  id={value.id}
                  slug={value.slug}
                  companyImageUrl={value?.companyDict?.companyImageUrl}
                  companyName={value?.companyDict?.companyName}
                  jobName={value?.jobName}
                  cityId={value?.locationDict?.city}
                  deadline={value?.deadline}
                  isUrgent={value?.isUrgent}
                  isHot={value?.isHot}
                  salaryMin={value.salaryMin}
                  salaryMax={value.salaryMax}
                  imageUrl={value?.imageUrl}
                  applyUrl={
                    value?.websiteUrl ||
                    value?.website_url ||
                    value?.companyWebsiteUrl ||
                    value?.companyWebsite ||
                    value?.company_website_url ||
                    value?.applicationUrl ||
                    value?.application_url ||
                    value?.applyUrl ||
                    value?.apply_url ||
                    value?.externalApplyUrl ||
                    value?.external_apply_url ||
                    value?.externalUrl ||
                    value?.external_url ||
                    value?.jobUrl ||
                    value?.job_url ||
                    value?.companyDict?.websiteUrl ||
                    value?.companyDict?.website_url ||
                    value?.company?.websiteUrl ||
                    value?.company?.website_url
                  }
                />
                {(index + 1) % 6 === 0 && <HiringCTA variant="inline" />}
              </React.Fragment>
            ))}
            {Math.ceil(count / pageSize) > 1 && (
              <Stack sx={{ pt: 2 }}>
                <Pagination
                  color="primary"
                  size="medium"
                  variant="text"
                  sx={{ margin: '0 auto' }}
                  count={Math.ceil(count / pageSize)}
                  page={page}
                  onChange={handleChangePage}
                />
              </Stack>
            )}
          </>
        )}
      </Stack>
    </>
  );
};

export default MainJobPostCard;
