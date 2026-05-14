import React from 'react';
import { useForm } from 'react-hook-form';
import { Box, Button, Stack, Typography } from '@mui/material';

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
import SingleSelectCustom from '../../../../components/controls/SingleSelectCustom';
import { useSelector } from 'react-redux';
import MultiSelectCustom from '../../../../components/controls/MultiSelectCustom';

const AdvanceProfileSearchForm = () => {
  const { allConfig } = useSelector((state) => state.config);

  const { control, watch, reset, handleSubmit } = useForm({
    defaultValues: {
      name: '',
    },
  });
  const a = watch();
  console.log(a);

  return (
    <Stack spacing={2}>
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Typography variant="h6">Advanced Filters: </Typography>
        <Button
          variant="outlined"
          color="error"
          size="small"
          onClick={() => reset()}
        >
          Clear filters
        </Button>
      </Stack>
      <Stack spacing={1}>
        <Box>
          <Typography variant="subtitle2">
            <FontAwesomeIcon icon={faBriefcase} style={{ marginRight: 3 }} />{' '}
            Career
          </Typography>
        </Box>
        <MultiSelectCustom
          name="careers"
          control={control}
          options={allConfig?.careerOptions || []}
          placeholder="All industries"
        />
      </Stack>
      <Stack spacing={1}>
        <Box>
          <Typography variant="subtitle2">
            <FontAwesomeIcon
              icon={faMagicWandSparkles}
              style={{ marginRight: 3 }}
            />{' '}
            Experience
          </Typography>
        </Box>
        <MultiSelectCustom
          name="experiences"
          control={control}
          options={allConfig?.experienceOptions || []}
          placeholder="All experience levels"
        />
      </Stack>
      <Stack spacing={1}>
        <Box>
          <Typography variant="subtitle2">
            <FontAwesomeIcon icon={faUsers} style={{ marginRight: 3 }} /> Level
          </Typography>
        </Box>
        <MultiSelectCustom
          name="positions"
          control={control}
          options={allConfig?.positionOptions || []}
          placeholder="All levels"
        />
      </Stack>
      <Stack spacing={1}>
        <Box>
          <Typography variant="subtitle2">
            <FontAwesomeIcon
              icon={faGraduationCap}
              style={{ marginRight: 3 }}
            />{' '}
            Education
          </Typography>
        </Box>
        <MultiSelectCustom
          name="academicsLevel"
          control={control}
          options={allConfig?.academicLevelOptions || []}
          placeholder="All education levels"
        />
      </Stack>
      <Stack spacing={1}>
        <Box>
          <Typography variant="subtitle2">
            <FontAwesomeIcon icon={faBuilding} style={{ marginRight: 3 }} /> Workplace
          </Typography>
        </Box>
        <MultiSelectCustom
          name="typeOfWorkPlaces"
          control={control}
          options={allConfig?.typeOfWorkplaceOptions || []}
          placeholder="All work locations"
        />
      </Stack>
      <Stack spacing={1}>
        <Box>
          <Typography variant="subtitle2">
            <FontAwesomeIcon
              icon={faPersonDigging}
              style={{ marginRight: 3 }}
            />{' '}
            Job Type
          </Typography>
        </Box>
        <MultiSelectCustom
          name="jobTypes"
          control={control}
          options={allConfig?.jobTypeOptions || []}
          placeholder="All employment types"
        />
      </Stack>
      <Stack spacing={1}>
        <Box>
          <Typography variant="subtitle2">
            <FontAwesomeIcon icon={faVenusMars} style={{ marginRight: 3 }} />{' '}
            Gender
          </Typography>
        </Box>
        <SingleSelectCustom
          name="gender"
          control={control}
          options={allConfig?.genderOptions || []}
          placeholder="All genders"
        />
      </Stack>
      <Stack spacing={1}>
        <Box>
          <Typography variant="subtitle2">
            <FontAwesomeIcon icon={faPeopleRoof} style={{ marginRight: 3 }} />{' '}
            Marital Status
          </Typography>
        </Box>
        <SingleSelectCustom
          name="maritalStatus"
          control={control}
          options={allConfig?.maritalStatusOptions || []}
          placeholder="All marital status"
        />
      </Stack>
    </Stack>
  );
};

export default AdvanceProfileSearchForm;
