import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';

import { Card, Grid, Button, Stack, IconButton, Box } from '@mui/material';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import InputBaseSearchCompanyCustom from '../../../../components/controls/InputBaseSearchCompanyCustom';
import SingleSelectSearchCustom from '../../../../components/controls/SingleSelectSearchCustom';
import {
  resetSearchCompany,
  searchCompany,
} from '../../../../redux/filterSlice';

const CompanySearch = () => {
  const dispatch = useDispatch();
  const { allConfig } = useSelector((state) => state.config);
  const { companyFilter } = useSelector((state) => state.filter);
  // Shared ?q= with the career-guide map so searches meet across pages.
  const [searchParams, setSearchParams] = useSearchParams();

  const { control, handleSubmit, reset, setValue } = useForm();
  const searchParamsString = searchParams.toString();

  React.useEffect(() => {
    reset((formValues) => ({
      ...formValues,
      ...companyFilter,
    }));
  }, [companyFilter, reset]);

  // Two-way meet with the map: the shared URL ?q= is the source of truth.
  // Adopt it into the redux company filter whenever it changes (landing with
  // ?q= from the career-guide map, or typing in the map search box), so the
  // API list and the map pins always show the same query.
  React.useEffect(() => {
    const q = searchParams.get("q") || "";
    const currentKw = companyFilter.kw || "";
    if (q !== currentKw) {
      dispatch(searchCompany({ ...companyFilter, kw: q }));
      setValue("kw", q, { shouldDirty: false });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParamsString]);

  const handleFilter = (data) => {
    dispatch(searchCompany(data));
    // Meet the map: mirror kw into shared ?q= (preserve sector/district).
    const next = new URLSearchParams(searchParams);
    const kw = String(data?.kw || "").trim();
    if (kw) next.set("q", kw);
    else next.delete("q");
    setSearchParams(next, { replace: true });
  };

  const handleReset = () => {
    dispatch(resetSearchCompany());
    const next = new URLSearchParams(searchParams);
    next.delete("q");
    setSearchParams(next, { replace: true });
  };

  return (
    <Card
      sx={{
        p: 2,
        backgroundImage:
          'linear-gradient(120deg, #2f1578 0%, #441da0 45%, #6d28d9 100%)',
        border: '1px solid rgba(255, 255, 255, 0.14)',
        boxShadow: '0 12px 32px -12px rgba(68, 29, 160, 0.55)',
        borderRadius: 3,
        width: { xs: '100%', sm: '100%', md: '100%', lg: '80%', xl: '80%' },
      }}
    >
      <Box component="form" onSubmit={handleSubmit(handleFilter)}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={12} md={7} lg={7} xl={7}>
            <InputBaseSearchCompanyCustom
              name="kw"
              placeholder="Enter company name or industry"
              control={control}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={3} lg={3} xl={3}>
            <SingleSelectSearchCustom
              name="cityId"
              placeholder="All provinces/cities"
              control={control}
              options={allConfig?.cityOptions || []}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={2} lg={2} xl={2}>
            <Stack direction="row" justifyContent="space-between">
              <Button
                variant="contained"
                color="info"
                sx={{ color: 'white' }}
                type="submit"
              >
                Search
              </Button>
              <IconButton aria-label="delete" onClick={handleReset}>
                <DeleteForeverIcon color="secondary" />
              </IconButton>
            </Stack>
          </Grid>
        </Grid>
      </Box>
    </Card>
  );
};

export default CompanySearch;
