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
                  Intara/Umujyi
                </Typography>
              </Box>
              <SingleSelectCustom
                name="cityId"
                control={control}
                options={allConfig?.cityOptions || []}
                showRequired={true}
                placeholder="Hitamo Intara/Umujyi"
              />
            </Stack>
            <Stack spacing={1}>
              <Box>
                <Typography variant="subtitle2">
                  <FontAwesomeIcon
                    icon={faBriefcase}
                    style={{ marginRight: 3 }}
                  />{' '}
                  Umurimo
                </Typography>
              </Box>
              <SingleSelectCustom
                name="careerId"
                control={control}
                options={allConfig?.careerOptions || []}
                placeholder="Umurimo wose"
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
                  Urwego rw'akazi
                </Typography>
              </Box>
              <SingleSelectCustom
                name="positionId"
                control={control}
                options={allConfig?.positionOptions || []}
                placeholder="Urwego rw'akazi rwose"
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
                  <FontAwesomeIcon
                    icon={faBuilding}
                    style={{ marginRight: 3 }}
                  />{' '}
                  Aho akazi gakorerwa
                </Typography>
              </Box>
              <SingleSelectCustom
                name="typeOfWorkplaceId"
                control={control}
                options={allConfig?.typeOfWorkplaceOptions || []}
                placeholder="Aho akazi gakorerwa hose"
              />
            </Stack>
            <Stack spacing={1}>
              <Box>
                <Typography variant="subtitle2">
                  <FontAwesomeIcon
                    icon={faPersonDigging}
                    style={{ marginRight: 3 }}
                  />{' '}
                  Ubwoko bw'akazi
                </Typography>
              </Box>
              <SingleSelectCustom
                name="jobTypeId"
                control={control}
                options={allConfig?.jobTypeOptions || []}
                placeholder="Ubwoko bw'akazi bwose"
              />
            </Stack>
            <Stack spacing={1}>
              <Box>
                <Typography variant="subtitle2">
                  <FontAwesomeIcon
                    icon={faVenusMars}
                    style={{ marginRight: 3 }}
                  />{' '}
                  Ibitsina
                </Typography>
              </Box>
              <SingleSelectCustom
                name="genderId"
                control={control}
                options={allConfig?.genderOptions || []}
                placeholder="Ibitsina byose"
              />
            </Stack>
            <Stack spacing={1}>
              <Box>
                <Typography variant="subtitle2">
                  <FontAwesomeIcon
                    icon={faPeopleRoof}
                    style={{ marginRight: 3 }}
                  />{' '}
                  Ubumenyi bw'isezerano
                </Typography>
              </Box>
              <SingleSelectCustom
                name="maritalStatusId"
                control={control}
                options={allConfig?.maritalStatusOptions || []}
                placeholder="Ubumenyi bw'isezerano bwose"
              />
            </Stack>
          </Stack>
        </Grid>
      </form>
    </>
  );
};

export default AppliedResumeFilterForm;
