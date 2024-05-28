import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import {
  Box,
  Button,
  Card,
  Grid,
  IconButton,
  Stack,
  Typography,
} from '@mui/material';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import FilterAltOffIcon from '@mui/icons-material/FilterAltOff';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import ClearIcon from '@mui/icons-material/Clear';

import InputBaseSearchHomeCustom from '../../../../components/controls/InputBaseSearchHomeCustom';
import SingleSelectSearchCustom from '../../../../components/controls/SingleSelectSearchCustom';

import {
  resetSearchJobPostFilter,
  searchJobPost,
} from '../../../../redux/filterSlice';

const JobPostSearch = () => {
  const dispatch = useDispatch();
  const { allConfig } = useSelector((state) => state.config);
  const { jobPostFilter } = useSelector((state) => state.filter);
  const [showAdvanceFilter, setShowAdvanceFilter] = React.useState(false);

  const { control, handleSubmit, reset } = useForm();

  React.useEffect(() => {
    reset((formValues) => ({
      ...formValues,
      ...jobPostFilter,
    }));
  }, [jobPostFilter, reset]);

  const handleChangeShowFilter = () => {
    setShowAdvanceFilter(!showAdvanceFilter);
  };

  const handleSaveKeywordLocalStorage = (kw) => {
    try {
      if (kw) {
        const keywordListStr = localStorage.getItem('amateka_y\'akazi');

        if (
          keywordListStr !== null &&
          keywordListStr !== undefined &&
          keywordListStr !== ''
        ) {
          const keywordList = JSON.parse(keywordListStr);

          if (!keywordList.includes(kw)) {
            if (keywordList.length >= 5) {
              localStorage.setItem(
                'amateka_y\'akazi',
                JSON.stringify([
                  kw,
                  ...keywordList.slice(0, keywordList.length - 1),
                ])
              );
            } else {
              localStorage.setItem(
                'amateka_y\'akazi',
                JSON.stringify([kw, ...keywordList])
              );
            }
          }
        } else {
          localStorage.setItem('amateka_y\'akazi', JSON.stringify([kw]));
        }
      }
    } catch (error) {
      console.error('Ikosa ryo kubika kw muri local storage: ', error);
    }
  };

  const handleFilter = (data) => {
    handleSaveKeywordLocalStorage(data?.kw);

    dispatch(searchJobPost(data));
  };

  const handleReset = () => {
    dispatch(resetSearchJobPostFilter());
  };

  return (
    <Box component="form" onSubmit={handleSubmit(handleFilter)}>
      <Card sx={{ p: 3, boxShadow: 0, backgroundColor: '#182642' }}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={12} md={6} lg={4} xl={4}>
            <InputBaseSearchHomeCustom
              name="kw"
              placeholder="Shakisha amahirwe y'akazi"
              control={control}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3} lg={3} xl={3}>
            <SingleSelectSearchCustom
              name="careerId"
              placeholder="Imyuga yose"
              control={control}
              options={allConfig?.careerOptions || []}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3} lg={2} xl={2}>
            <SingleSelectSearchCustom
              name="cityId"
              placeholder="Intara zose"
              control={control}
              options={allConfig?.cityOptions || []}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={3} xl={3}>
            <Stack
              spacing={2}
              direction={{
                xs: 'column',
                sm: 'row',
                md: 'row',
                lg: 'row',
                xl: 'row',
              }}
              justifyContent={{ sm: 'flex-end', lg: 'center' }}
            >
              <Button
                variant="contained"
                color="info"
                sx={{ py: 1 }}
                type="submit"
              >
                Shakisha
              </Button>
              <Button
                variant="contained"
                sx={{ py: 1, color: 'white' }}
                startIcon={
                  showAdvanceFilter ? <FilterAltOffIcon /> : <FilterAltIcon />
                }
                color="secondary"
                onClick={handleChangeShowFilter}
              >
                hishura byinshi
              </Button>
            </Stack>
          </Grid>
        </Grid>
      </Card>
      <Card
        sx={{
          p: 2,
          boxShadow: 3,
          mt: -1,
          display: showAdvanceFilter ? 'block' : 'none',
        }}
      >
        <Grid container spacing={2}>
          <Grid item xs={12} sm={12} md={12} lg={1} xl={1}>
            <Typography
              variant="subtitle2"
              sx={{ pt: 0.5, fontSize: 16 }}
              color="GrayText"
            >
              hishura byinshi
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={2} xl={2}>
            <SingleSelectSearchCustom
              name="positionId"
              placeholder="Imyanya yose"
              control={control}
              options={allConfig?.positionOptions || []}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={2} xl={2}>
            <SingleSelectSearchCustom
              name="experienceId"
              placeholder="Uburambe bwose"
              control={control}
              options={allConfig?.experienceOptions || []}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={2} xl={2}>
            <SingleSelectSearchCustom
              name="jobTypeId"
              placeholder="Ubukorikori bwose"
              control={control}
              options={allConfig?.jobTypeOptions || []}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={2} xl={2}>
            <SingleSelectSearchCustom
              name="typeOfWorkplaceId"
              placeholder="Ubukorikori bwose"
              control={control}
              options={allConfig?.typeOfWorkplaceOptions || []}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={2} xl={2}>
            <SingleSelectSearchCustom
              name="genderId"
              placeholder="Igitsina cyose"
              control={control}
              options={allConfig?.genderOptions || []}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={1} xl={1}>
            <Stack
              direction="row"
              justifyContent={{ xs: 'flex-end', lg: 'center', xl: 'center' }}
            >
              <IconButton
                color="primary"
                aria-label="add to shopping cart"
                onClick={handleReset}
              >
                <DeleteForeverIcon color="secondary" />
              </IconButton>
              <IconButton
                color="primary"
                aria-label="add to shopping cart"
                onClick={handleChangeShowFilter}
              >
                <ClearIcon color="error" />
              </IconButton>
            </Stack>
          </Grid>
        </Grid>
      </Card>
    </Box>
  );
};

export default JobPostSearch;
