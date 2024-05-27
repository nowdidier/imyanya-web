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
            placeholder="Andika izina ry'itangazo"
            control={control}
          />
        </Grid>
        <Grid item flex={1}>
          <SingleSelectCustom
            name="isUrgent"
            control={control}
            options={[
              { id: 1, name: 'Akazi kihutirwa' },
              { id: 2, name: 'Akazi katihutirwa' },
            ]}
            showRequired={true}
            placeholder="Imimerere y'akazi"
          />
        </Grid>
        <Grid item flex={1}>
          <SingleSelectCustom
            name="statusId"
            control={control}
            options={allConfig?.jobPostStatusOptions || []}
            showRequired={true}
            placeholder="Imimerere yo gusuzuma"
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
            <Tooltip title="Subiza uko byari" arrow>
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
              Shaka
            </Button>
          </Stack>
        </Grid>
      </Grid>
    </form>
  );
};

export default JobPostFilterForm;
