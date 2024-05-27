import React from 'react';
import { useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { Grid, Button, Stack, IconButton, Tooltip } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import RefreshIcon from '@mui/icons-material/Refresh';

import TextFieldCustom from '../../../../components/controls/TextFieldCustom';
import SingleSelectCustom from '../../../../components/controls/SingleSelectCustom';

const SavedResumeFilterForm = ({ handleFilter }) => {
  const { allConfig } = useSelector((state) => state.config);

  const {
    control,
    reset,
    handleSubmit,
    formState: { defaultValues },
  } = useForm({
    defaultValues: {
      kw: '',
      salaryMax: '',
      experienceId: '',
      cityId: '',
    },
  });

  return (
    <form onSubmit={handleSubmit(handleFilter)}>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={12} md={7} lg={3} xl={3}>
          <TextFieldCustom
            name="kw"
            placeholder="Injiza izina ry'itangazo cyangwa izina ry'umukandida"
            control={control}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={5} lg={2} xl={2}>
          <TextFieldCustom
            name="salaryMax"
            placeholder="Injiza umushahara ntarengwa"
            control={control}
            type="number"
          />
        </Grid>
        <Grid item xs={12} sm={12} md={5} lg={2} xl={2}>
          <SingleSelectCustom
            name="experienceId"
            control={control}
            options={allConfig?.experienceOptions || []}
            placeholder="Hitamo uburambe"
          />
        </Grid>
        <Grid item xs={12} sm={12} md={4} lg={2} xl={2}>
          <SingleSelectCustom
            name="cityId"
            control={control}
            options={allConfig?.cityOptions || []}
            placeholder="Hitamo aho uherereye"
          />
        </Grid>
        <Grid item xs={12} sm={12} md={3} lg={3} xl={3}>
          <Stack direction="row" spacing={2}>
            <Tooltip title="Subiramo" arrow>
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
              Shakisha
            </Button>
          </Stack>
        </Grid>
      </Grid>
    </form>
  );
};

export default SavedResumeFilterForm;
