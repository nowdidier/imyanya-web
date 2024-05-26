import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { Box, Button, Grid, Stack, Typography } from '@mui/material';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBriefcase,
  faMagicWandSparkles,
  faUsers,
  faGraduationCap,
  faBuilding,
  faPersonDigging,
  faVenusMars,
  faPeopleRoof,
} from '@fortawesome/free-solid-svg-icons';
import SearchIcon from '@mui/icons-material/Search';
import RefreshIcon from '@mui/icons-material/Refresh';
import TextFieldCustom from '../../../../components/controls/TextFieldCustom';
import SingleSelectCustom from '../../../../components/controls/SingleSelectCustom';

import { resetSearchResume, searchResume } from '../../../../redux/filterSlice';

const ProfileSearch = () => {
  const dispatch = useDispatch();
  const { allConfig } = useSelector((state) => state.config);
  const { resumeFilter } = useSelector((state) => state.filter);

  const { control, reset, handleSubmit } = useForm();

  React.useEffect(() => {
    reset((formValues) => ({
      ...formValues,
      ...resumeFilter,
    }));
  }, [resumeFilter, reset]);

  const handleFilter = (data) => {
    dispatch(searchResume(data));
  };

  const handleReset = () => {
    dispatch(resetSearchResume());
  };

  return (
    <>
      <Grid item xs={12} component="form" onSubmit={handleSubmit(handleFilter)}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={12} md={5} lg={6} xl={6}>
            <TextFieldCustom
              name="kw"
              showRequired={true}
              placeholder="Andika ijambo ngenderwako"
              control={control}
              icon={<SearchIcon />}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={4} lg={4} xl={4}>
            <SingleSelectCustom
              name="cityId"
              control={control}
              options={allConfig?.cityOptions || []}
              showRequired={true}
              placeholder="Hitamo Intara/Umujyi"
            />
          </Grid>
          <Grid item xs={12} sm={12} md={3} lg={2} xl={2}>
            <Stack>
              <Button
                variant="contained"
                color="secondary"
                startIcon={<SearchIcon />}
                sx={{ color: 'white', height: '100%' }}
                type="submit"
              >
                Gushakisha
              </Button>
            </Stack>
          </Grid>
        </Grid>{' '}
      </Grid>
      <Grid
        item
        xs={12}
        sm={12}
        md={12}
        lg={3}
        xl={3}
        component="form"
        onSubmit={handleSubmit(handleFilter)}
      >
        <Stack spacing={2}>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <Typography variant="h6">Igisagara cy'ibanza: </Typography>
            <Button
              variant="text"
              color="error"
              size="small"
              startIcon={<RefreshIcon />}
              sx={{ textTransform: 'inherit' }}
              onClick={handleReset}
            >
              Gusiba ibyo wagatoranyije
            </Button>
          </Stack>
          <Stack spacing={1}>
            <Box>
              <Typography variant="subtitle2">
                <FontAwesomeIcon
                  icon={faBriefcase}
                  style={{ marginRight: 3 }}
                />{' '}
                Utanga
              </Typography>
            </Box>
            <SingleSelectCustom
              name="careerId"
              control={control}
              options={allConfig?.careerOptions || []}
              placeholder="Utanga twose"
            />
          </Stack>
          <Stack spacing={1}>
            <Box>
              <Typography variant="subtitle2">
                <FontAwesomeIcon
                  icon={faMagicWandSparkles}
                  style={{ marginRight: 3 }}
                />{' '}
                Ubunararibonye
              </Typography>
            </Box>
            <SingleSelectCustom
              name="experienceId"
              control={control}
              options={allConfig?.experienceOptions || []}
              placeholder="Ubunararibonye bwose"
            />
          </Stack>
          <Stack spacing={1}>
            <Box>
              <Typography variant="subtitle2">
                <FontAwesomeIcon icon={faUsers} style={{ marginRight: 3 }} />{' '}
                Ipeti
              </Typography>
            </Box>
            <SingleSelectCustom
              name="positionId"
              control={control}
              options={allConfig?.positionOptions || []}
              placeholder="Ipeti zose"
            />
          </Stack>
          <Stack spacing={1}>
            <Box>
              <Typography variant="subtitle2">
                <FontAwesomeIcon
                  icon={faGraduationCap}
                  style={{ marginRight: 3 }}
                />{' '}
                Amashuri
              </Typography>
            </Box>
            <SingleSelectCustom
              name="academicLevelId"
              control={control}
              options={allConfig?.academicLevelOptions || []}
              placeholder="Amashuri yose"
            />
          </Stack>
          <Stack spacing={1}>
            <Box>
              <Typography variant="subtitle2">
                <FontAwesomeIcon icon={faBuilding} style={{ marginRight: 3 }} />{' '}
                Aho ukorera
              </Typography>
            </Box>
            <SingleSelectCustom
              name="typeOfWorkplaceId"
              control={control}
              options={allConfig?.typeOfWorkplaceOptions || []}
              placeholder="Aho ukorera hose"
            />
          </Stack>
          <Stack spacing={1}>
            <Box>
              <Typography variant="subtitle2">
                <FontAwesomeIcon
                  icon={faPersonDigging}
                  style={{ marginRight: 3 }}
                />{' '}
                Uburyo bwo gukorera
              </Typography>
            </Box>
            <SingleSelectCustom
              name="jobTypeId"
              control={control}
              options={allConfig?.jobTypeOptions || []}
              placeholder="Uburyo bwose bwo gukorera"
            />
          </Stack>
          <Stack spacing={1}>
            <Box>
              <Typography variant="subtitle2">
                <FontAwesomeIcon
                  icon={faVenusMars}
                  style={{ marginRight: 3 }}
                />{' '}
                Igitsina
              </Typography>
            </Box>
            <SingleSelectCustom
              name="genderId"
              control={control}
              options={allConfig?.genderOptions || []}
              placeholder="Igitsina icyo aricyo cyose"
            />
          </Stack>
          <Stack spacing={1}>
            <Box>
              <Typography variant="subtitle2">
                <FontAwesomeIcon
                  icon={faPeopleRoof}
                  style={{ marginRight: 3 }}
                />{' '}
                Imiryango
              </Typography>
            </Box>
            <SingleSelectCustom
              name="maritalStatusId"
              control={control}
              options={allConfig?.maritalStatusOptions || []}
              placeholder="Imiryango yose"
            />
          </Stack>
        </Stack>
      </Grid>
    </>
  );
};

export default ProfileSearch;
