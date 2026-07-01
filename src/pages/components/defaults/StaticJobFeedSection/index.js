import React from 'react';
import { Grid, Stack, Typography } from '@mui/material';

import JobPost from '../../../../components/JobPost';
import NoDataCard from '../../../../components/NoDataCard';

const StaticJobFeedSection = ({
  jobs = [],
  sourceNote,
  emptyTitle = 'No featured jobs available right now',
}) => {
  if (jobs.length === 0) {
    return <NoDataCard title={emptyTitle} />;
  }

  return (
    <Stack spacing={2.5}>
      {sourceNote && (
        <Typography variant="body2" color="text.secondary">
          {sourceNote}
        </Typography>
      )}

      <Grid container spacing={2}>
        {jobs.map((job) => (
          <Grid item xs={12} sm={6} lg={4} key={job.id}>
            <JobPost {...job} />
          </Grid>
        ))}
      </Grid>
    </Stack>
  );
};

export default StaticJobFeedSection;
