
import React from 'react';
import { useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { Box, Grid, Stack, Typography } from '@mui/material';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faLocationDot,
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

const AppliedResumeFilterForm = ({ handleFilter, filterData }) => {
  const { allConfig } = useSelector((state) => state.config);
  const { control, handleSubmit, reset } = useForm();

  React.useEffect(() => {
    reset((formValues) => ({
      ...formValues,
      ...filterData,
    }));
  }, [filterData, reset]);

  return (
    <>
      <form id="modal-form" onSubmit={handleSubmit(handleFilter)}>
        <Grid item xs={12}>
          <Stack spacing={2}>
            <Stack spacing={1}>
              <Box>
                <Typography variant="subtitle2">
                  <FontAwesomeIcon
                    icon={faLocationDot}
                    style={{ marginRight: 3 }}
                  />{' '}
                </Typography>
              </Box>
              <SingleSelectCustom
                name="cityId"
                control={control}
                options={allConfig?.cityOptions || []}
                showRequired={true}
              />
            </Stack>
            <Stack spacing={1}>
              <Box>
                <Typography variant="subtitle2">
                  <FontAwesomeIcon
                    icon={faBriefcase}
                    style={{ marginRight: 3 }}
                  />{' '}
                </Typography>
              </Box>
              <SingleSelectCustom
                name="careerId"
                control={control}
                options={allConfig?.careerOptions || []}
              />
            </Stack>
            <Stack spacing={1}>
              <Box>
                <Typography variant="subtitle2">
                  <FontAwesomeIcon
                    icon={faMagicWandSparkles}
                    style={{ marginRight: 3 }}
                  />{' '}
                </Typography>
              </Box>
              <SingleSelectCustom
                name="experienceId"
                control={control}
                options={allConfig?.experienceOptions || []}
              />
            </Stack>
            <Stack spacing={1}>
              <Box>
                <Typography variant="subtitle2">
                  <FontAwesomeIcon icon={faUsers} style={{ marginRight: 3 }} />{' '}
                </Typography>
              </Box>
              <SingleSelectCustom
                name="positionId"
                control={control}
                options={allConfig?.positionOptions || []}
              />
            </Stack>
            <Stack spacing={1}>
              <Box>
                <Typography variant="subtitle2">
                  <FontAwesomeIcon
                    icon={faGraduationCap}
                    style={{ marginRight: 3 }}
                  />{' '}
                </Typography>
              </Box>
              <SingleSelectCustom
                name="academicLevelId"
                control={control}
                options={allConfig?.academicLevelOptions || []}
              />
            </Stack>
            <Stack spacing={1}>
              <Box>
                <Typography variant="subtitle2">
                  <FontAwesomeIcon
                    icon={faBuilding}
                    style={{ marginRight: 3 }}
                  />{' '}
                </Typography>
              </Box>
              <SingleSelectCustom
                name="typeOfWorkplaceId"
                control={control}
                options={allConfig?.typeOfWorkplaceOptions || []}
              />
            </Stack>
            <Stack spacing={1}>
              <Box>
                <Typography variant="subtitle2">
                  <FontAwesomeIcon
                    icon={faPersonDigging}
                    style={{ marginRight: 3 }}
                  />{' '}
                </Typography>
              </Box>
              <SingleSelectCustom
                name="jobTypeId"
                control={control}
                options={allConfig?.jobTypeOptions || []}
              />
            </Stack>
            <Stack spacing={1}>
              <Box>
                <Typography variant="subtitle2">
                  <FontAwesomeIcon
                    icon={faVenusMars}
                    style={{ marginRight: 3 }}
                  />{' '}
                </Typography>
              </Box>
              <SingleSelectCustom
                name="genderId"
                control={control}
                options={allConfig?.genderOptions || []}
              />
            </Stack>
            <Stack spacing={1}>
              <Box>
                <Typography variant="subtitle2">
                  <FontAwesomeIcon
                    icon={faPeopleRoof}
                    style={{ marginRight: 3 }}
                  />{' '}
                </Typography>
              </Box>
              <SingleSelectCustom
                name="maritalStatusId"
                control={control}
                options={allConfig?.maritalStatusOptions || []}
              />
            </Stack>
          </Stack>
        </Grid>
      </form>
    </>
  );
};

export default AppliedResumeFilterForm;
