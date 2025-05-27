import React from 'react';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { Grid, Button, Stack, Tooltip, IconButton } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import RefreshIcon from '@mui/icons-material/Refresh';

import TextFieldCustom from '../../../../components/controls/TextFieldCustom';
import SingleSelectCustom from '../../../../components/controls/SingleSelectCustom';

const JobPostFilterForm = ({ handleFilter }) => {
  const { allConfig } = useSelector((state) => state.config);
  const {
    control,
    handleSubmit,
    reset,
    formState: { defaultValues },
  } = useForm({
    defaultValues: {
      kw: '',
      isUrgent: '',
      statusId: '',
    },
  });

  return (
    <form onSubmit={handleSubmit(handleFilter)}>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={12} md={5} lg={5} xl={5}>
          <TextFieldCustom
            name="kw"
            placeholder="Enter job post name"
            control={control}
          />
        </Grid>
        <Grid item flex={1}>
          <SingleSelectCustom
            name="isUrgent"
            control={control}
            options={[
              { id: 1, name: 'Urgent' },
              { id: 2, name: 'Not urgent' },
            ]}
            showRequired={true}
            placeholder="Recruitment status"
          />
        </Grid>
        <Grid item flex={1}>
          <SingleSelectCustom
            name="statusId"
            control={control}
            options={allConfig?.jobPostStatusOptions || []}
            showRequired={true}
            placeholder="Approval status"
          />
        </Grid>
        <Grid item>
          <Stack
            direction="row"
            spacing={2}
            justifyContent={{
              xs: 'flex-end',
              sm: 'center',
              md: 'center',
              lg: 'center',
              xl: 'center',
            }}
          >
            <Tooltip title="Reset" arrow>
              <IconButton
                aria-label="refresh"
                onClick={() => {
                  reset();
                  handleSubmit(handleFilter(defaultValues));
                }}
              >
                <RefreshIcon />
              </IconButton>
            </Tooltip>
            <Button
              sx={{ color: 'white' }}
              variant="contained"
              color="secondary"
              type="submit"
              startIcon={<SearchIcon />}
            >
              Search
            </Button>
          </Stack>
        </Grid>
      </Grid>
    </form>
  );
};

export default JobPostFilterForm;
