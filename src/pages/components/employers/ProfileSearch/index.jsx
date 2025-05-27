import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { Button, Grid, Stack, Typography } from '@mui/material';

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
              placeholder="Enter keywords to search..."
              control={control}
              icon={<SearchIcon sx={{ color: 'grey.500' }} />}
              sx={{
                '& .MuiOutlinedInput-root': {
                  backgroundColor: 'background.paper',
                  borderRadius: '12px',
                  '&:hover': {
                    backgroundColor: 'grey.50',
                  },
                  '& fieldset': {
                    borderColor: 'grey.200',
                  },
                }
              }}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={4} lg={4} xl={4}>
            <SingleSelectCustom
              name="cityId"
              control={control}
              options={allConfig?.cityOptions || []}
              showRequired={true}
              placeholder="Select City/Province"
              sx={{
                '& .MuiOutlinedInput-root': {
                  backgroundColor: 'background.paper',
                  borderRadius: '12px',
                  '&:hover': {
                    backgroundColor: 'grey.50',
                  },
                  '& fieldset': {
                    borderColor: 'grey.200',
                  },
                }
              }}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={3} lg={2} xl={2}>
            <Stack>
              <Button
                variant="contained"
                color="secondary"
                startIcon={<SearchIcon />}
                sx={{
                  height: '100%',
                  borderRadius: '12px',
                  boxShadow: 'none',
                  background: (theme) => theme.palette.secondary.gradient,
                  '&:hover': {
                    boxShadow: (theme) => theme.customShadows.medium,
                  }
                }}
                type="submit"
              >
                Search
              </Button>
            </Stack>
          </Grid>
        </Grid>
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
        <Stack 
          spacing={2.5}
          sx={{
            backgroundColor: 'background.paper',
            borderRadius: '16px',
            padding: 3,
            border: '1px solid',
            borderColor: 'grey.100',
            boxShadow: (theme) => theme.customShadows.card
          }}
        >
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <Typography variant="h6" sx={{ fontWeight: 600 }}>Advanced Filter</Typography>
            <Button
              variant="text"
              color="error"
              size="small"
              startIcon={<RefreshIcon />}
              sx={{ 
                textTransform: 'inherit',
                '&:hover': {
                  backgroundColor: 'error.background'
                }
              }}
              onClick={handleReset}
            >
              Clear Filter
            </Button>
          </Stack>
          <Stack spacing={2}>
            <Stack spacing={1}>
              <Typography variant="subtitle2" sx={{ display: 'flex', alignItems: 'center', color: 'grey.700' }}>
                <FontAwesomeIcon icon={faBriefcase} style={{ marginRight: 8, color: '#441da0' }} />
                Industry
              </Typography>
              <SingleSelectCustom
                name="careerId"
                control={control}
                options={allConfig?.careerOptions || []}
                placeholder="All industries"
                sx={{
                  '& .MuiOutlinedInput-root': {
                    backgroundColor: 'background.paper',
                    borderRadius: '10px',
                    '&:hover': {
                      backgroundColor: 'grey.50',
                    },
                    '& fieldset': {
                      borderColor: 'grey.200',
                    }
                  }
                }}
              />
            </Stack>
            <Stack spacing={1}>
              <Typography variant="subtitle2" sx={{ display: 'flex', alignItems: 'center', color: 'grey.700' }}>
                <FontAwesomeIcon icon={faMagicWandSparkles} style={{ marginRight: 8, color: '#441da0' }} />
                Experience
              </Typography>
              <SingleSelectCustom
                name="experienceId"
                control={control}
                options={allConfig?.experienceOptions || []}
                placeholder="All experiences"
                sx={{
                  '& .MuiOutlinedInput-root': {
                    backgroundColor: 'background.paper',
                    borderRadius: '10px',
                    '&:hover': {
                      backgroundColor: 'grey.50',
                    },
                    '& fieldset': {
                      borderColor: 'grey.200',
                    }
                  }
                }}
              />
            </Stack>
            <Stack spacing={1}>
              <Typography variant="subtitle2" sx={{ display: 'flex', alignItems: 'center', color: 'grey.700' }}>
                <FontAwesomeIcon icon={faUsers} style={{ marginRight: 8, color: '#441da0' }} />
                Level
              </Typography>
              <SingleSelectCustom
                name="positionId"
                control={control}
                options={allConfig?.positionOptions || []}
                placeholder="All levels"
                sx={{
                  '& .MuiOutlinedInput-root': {
                    backgroundColor: 'background.paper',
                    borderRadius: '10px',
                    '&:hover': {
                      backgroundColor: 'grey.50',
                    },
                    '& fieldset': {
                      borderColor: 'grey.200',
                    }
                  }
                }}
              />
            </Stack>
            <Stack spacing={1}>
              <Typography variant="subtitle2" sx={{ display: 'flex', alignItems: 'center', color: 'grey.700' }}>
                <FontAwesomeIcon icon={faGraduationCap} style={{ marginRight: 8, color: '#441da0' }} />
                Education
              </Typography>
              <SingleSelectCustom
                name="academicLevelId"
                control={control}
                options={allConfig?.academicLevelOptions || []}
                placeholder="All education levels"
                sx={{
                  '& .MuiOutlinedInput-root': {
                    backgroundColor: 'background.paper',
                    borderRadius: '10px',
                    '&:hover': {
                      backgroundColor: 'grey.50',
                    },
                    '& fieldset': {
                      borderColor: 'grey.200',
                    }
                  }
                }}
              />
            </Stack>
            <Stack spacing={1}>
              <Typography variant="subtitle2" sx={{ display: 'flex', alignItems: 'center', color: 'grey.700' }}>
                <FontAwesomeIcon icon={faBuilding} style={{ marginRight: 8, color: '#441da0' }} />
                Workplace
              </Typography>
              <SingleSelectCustom
                name="typeOfWorkplaceId"
                control={control}
                options={allConfig?.typeOfWorkplaceOptions || []}
                placeholder="All workplaces"
                sx={{
                  '& .MuiOutlinedInput-root': {
                    backgroundColor: 'background.paper',
                    borderRadius: '10px',
                    '&:hover': {
                      backgroundColor: 'grey.50',
                    },
                    '& fieldset': {
                      borderColor: 'grey.200',
                    }
                  }
                }}
              />
            </Stack>
            <Stack spacing={1}>
              <Typography variant="subtitle2" sx={{ display: 'flex', alignItems: 'center', color: 'grey.700' }}>
                <FontAwesomeIcon icon={faPersonDigging} style={{ marginRight: 8, color: '#441da0' }} />
                Work form
              </Typography>
              <SingleSelectCustom
                name="jobTypeId"
                control={control}
                options={allConfig?.jobTypeOptions || []}
                placeholder="All work forms"
                sx={{
                  '& .MuiOutlinedInput-root': {
                    backgroundColor: 'background.paper',
                    borderRadius: '10px',
                    '&:hover': {
                      backgroundColor: 'grey.50',
                    },
                    '& fieldset': {
                      borderColor: 'grey.200',
                    }
                  }
                }}
              />
            </Stack>
            <Stack spacing={1}>
              <Typography variant="subtitle2" sx={{ display: 'flex', alignItems: 'center', color: 'grey.700' }}>
                <FontAwesomeIcon icon={faVenusMars} style={{ marginRight: 8, color: '#441da0' }} />
                Gender
              </Typography>
              <SingleSelectCustom
                name="genderId"
                control={control}
                options={allConfig?.genderOptions || []}
                placeholder="All genders"
                sx={{
                  '& .MuiOutlinedInput-root': {
                    backgroundColor: 'background.paper',
                    borderRadius: '10px',
                    '&:hover': {
                      backgroundColor: 'grey.50',
                    },
                    '& fieldset': {
                      borderColor: 'grey.200',
                    }
                  }
                }}
              />
            </Stack>
            <Stack spacing={1}>
              <Typography variant="subtitle2" sx={{ display: 'flex', alignItems: 'center', color: 'grey.700' }}>
                <FontAwesomeIcon icon={faPeopleRoof} style={{ marginRight: 8, color: '#441da0' }} />
                Marital status
              </Typography>
              <SingleSelectCustom
                name="maritalStatusId"
                control={control}
                options={allConfig?.maritalStatusOptions || []}
                placeholder="All marital statuses"
                sx={{
                  '& .MuiOutlinedInput-root': {
                    backgroundColor: 'background.paper',
                    borderRadius: '10px',
                    '&:hover': {
                      backgroundColor: 'grey.50',
                    },
                    '& fieldset': {
                      borderColor: 'grey.200',
                    }
                  }
                }}
              />
            </Stack>
          </Stack>
        </Stack>
      </Grid>
    </>
  );
};

export default ProfileSearch;
