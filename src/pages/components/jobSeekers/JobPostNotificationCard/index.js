import React from 'react';
import { useSelector } from 'react-redux';
import {
  Box,
  Button,
  Divider,
  IconButton,
  Pagination,
  Skeleton,
  Stack,
  Switch,
  Typography,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBriefcase,
  faCalendarAlt,
  faCircleDollarToSlot,
  faLocationDot,
} from '@fortawesome/free-solid-svg-icons';

import { ImageSvg10 } from '../../../../configs/constants';
import toastMessages from '../../../../utils/toastMessages';
import BackdropLoading from '../../../../components/loading/BackdropLoading';
import { confirmModal } from '../../../../utils/sweetalert2Modal';
import { convertMoney } from '../../../../utils/customData';
import NoDataCard from '../../../../components/NoDataCard';
import MuiImageCustom from '../../../../components/MuiImageCustom';
import FormPopup from '../../../../components/controls/FormPopup';
import JobPostNotificationForm from '../JobPostNotificationForm';
import errorHandling from '../../../../utils/errorHandling';
import jobPostNotificationService from '../../../../services/jobPostNotificationService';

const ItemLoading = () => {
  const [parentWidth, setParentWidth] = React.useState(0);
  const [stackDirection, setStackDirection] = React.useState('column');

  React.useEffect(() => {
    const handleResize = () => {
      const newWidth = document.getElementById(
        'job-post-notification-loading'
      ).offsetWidth;
      setParentWidth(newWidth);
    };

    handleResize();

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  React.useEffect(() => {
    if (parentWidth < 600) {
      setStackDirection('column');
    } else {
      setStackDirection('row');
    }
  }, [parentWidth]);

  return (
    <div id="job-post-notification-loading">
      <Box>
        <Stack direction="row" spacing={3} alignItem="center">
          <Box flex={1}>
            <Stack spacing={1}>
              <Box>
                <Typography fontSize={18} fontWeight={'bold'}>
                  <Skeleton />
                </Typography>
              </Box>
              <Stack direction={stackDirection} spacing={3}>
                <Box>
                  <Typography fontWeight="bold" color="GrayText" fontSize={14}>
                    <Skeleton width={100} />
                  </Typography>
                </Box>
                <Box>
                  <Typography fontWeight="bold" color="GrayText" fontSize={14}>
                    <Skeleton width={100} />
                  </Typography>
                </Box>
                <Box>
                  <Typography fontWeight="bold" color="GrayText" fontSize={14}>
                    <Skeleton width={100} />
                  </Typography>
                </Box>
                <Box>
                  <Typography fontWeight="bold" color="GrayText" fontSize={14}>
                    <Skeleton width={100} />
                  </Typography>
                </Box>
              </Stack>
            </Stack>
          </Box>
          <Stack direction="row" spacing={1} alignItems="center">
            <Box>
              <Skeleton width={50} height={40} />
            </Box>
            <Box>
              <Skeleton width={50} height={40} />
            </Box>
            <Box>
              <Skeleton width={50} height={40} />
            </Box>
          </Stack>
        </Stack>
      </Box>
    </div>
  );
};

const ActiveButtonComponent = ({ id, isActive }) => {
  const [checked, setChecked] = React.useState(isActive);
  const [isFullScreenLoading, setIsFullScreenLoading] = React.useState(false);

  const handleUpdateActive = () => {
    const updateJobPostNotification = async (id) => {
      setIsFullScreenLoading(true);
      try {
        const resData = await jobPostNotificationService.active(id);
        const data = resData.data;

        setChecked(data.isActive);
      } catch (error) {
        errorHandling(error);
      } finally {
        setIsFullScreenLoading(false);
      }
    };

    updateJobPostNotification(id);
  };

  return (
    <>
      <Switch checked={checked} onChange={handleUpdateActive} />
      {/* Start: full screen loading */}
      {isFullScreenLoading && <BackdropLoading />}
      {/* End: full screen loading */}
    </>
  );
};

const ItemComponent = ({
  id,
  jobName,
  salary,
  frequency,
  isActive,
  career,
  city,
  handleShowUpdate,
  handleDelete,
}) => {
  const { allConfig } = useSelector((state) => state.config);
  const [parentWidth, setParentWidth] = React.useState(0);
  const [stackDirection, setStackDirection] = React.useState('column');

  React.useEffect(() => {
    const handleResize = () => {
      const newWidth = document.getElementById(
        'job-post-notification'
      ).offsetWidth;
      setParentWidth(newWidth);
    };

    handleResize();

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  React.useEffect(() => {
    if (parentWidth < 600) {
      setStackDirection('column');
    } else {
      setStackDirection('row');
    }
  }, [parentWidth]);

  return (
    <div id="job-post-notification">
      <Box>
        <Stack direction="row" spacing={3} alignItem="center">
          <Box flex={1}>
            <Stack spacing={1}>
              <Box>
                <Typography fontSize={16} fontWeight={'bold'}>
                  {jobName}
                </Typography>
              </Box>
              <Stack
                direction={stackDirection}
                spacing={stackDirection === 'column' ? 1 : 2}
              >
                <Box>
                  <Typography fontWeight="bold" color="#e0e0e0" fontSize={14}>
                    <FontAwesomeIcon
                      icon={faCircleDollarToSlot}
                      style={{ marginRight: 5 }}
                    />

                    {salary ? (
                      <span style={{ color: 'orange' }}>
                        {convertMoney(salary)}
                      </span>
                    ) : (
                      <span
                        style={{
                          color: '#e0e0e0',
                          fontStyle: 'italic',
                          fontSize: 13,
                        }}
                      >
                        Ntarasurwa
                      </span>
                    )}
                  </Typography>
                </Box>
                <Box>
                  <Typography fontWeight="bold" color="#e0e0e0" fontSize={14}>
                    <FontAwesomeIcon
                      icon={faLocationDot}
                      style={{ marginRight: 5 }}
                    />
                    {allConfig?.cityDict[city] ? (
                      <span style={{ color: 'black', fontWeight: 'normal' }}>
                        {allConfig?.cityDict[city]}
                      </span>
                    ) : (
                      <span
                        style={{
                          color: '#e0e0e0',
                          fontStyle: 'italic',
                          fontSize: 13,
                        }}
                      >
                        Ntarasurwa
                      </span>
                    )}
                  </Typography>
                </Box>
                <Box>
                  <Typography fontWeight="bold" color="#e0e0e0" fontSize={14}>
                    <FontAwesomeIcon
                      icon={faBriefcase}
                      style={{ marginRight: 5 }}
                    />
                    {allConfig?.careerDict[career] ? (
                      <span style={{ color: 'black', fontWeight: 'normal' }}>
                        {allConfig?.careerDict[career]}
                      </span>
                    ) : (
                      <span
                        style={{
                          color: '#e0e0e0',
                          fontStyle: 'italic',
                          fontSize: 13,
                        }}
                      >
                        Ntarasurwa
                      </span>
                    )}
                  </Typography>
                </Box>
                <Box>
                  <Typography fontWeight="bold" color="#e0e0e0" fontSize={14}>
                    <FontAwesomeIcon
                      icon={faCalendarAlt}
                      style={{ marginRight: 5 }}
                    />
                    {allConfig?.frequencyNotificationDict[frequency] ? (
                      <span style={{ color: 'black', fontWeight: 'normal' }}>
                        {allConfig?.frequencyNotificationDict[frequency]}
                      </span>
                    ) : (
                      <span
                        style={{
                          color: '#e0e0e0',
                          fontStyle: 'italic',
                          fontSize: 13,
                        }}
                      >
                        Ntarasurwa
                      </span>
                    )}
                  </Typography>
                </Box>
              </Stack>
            </Stack>
          </Box>
          <Stack direction="row" spacing={1} alignItems="center">
            <Box>
              {/* Start: ActiveButtonComponent */}
              <ActiveButtonComponent id={id} isActive={isActive} />
              {/* End: ActiveButtonComponent */}
            </Box>
            <Box>
              <IconButton
                aria-label="edit"
                color="warning"
                onClick={() => handleShowUpdate(id)}
              >
                <EditIcon />
              </IconButton>
            </Box>
            <Box>
              <IconButton
                aria-label="delete"
                color="error"
                onClick={() => handleDelete(id)}
              >
                <DeleteIcon />
              </IconButton>
            </Box>
          </Stack>
        </Stack>
      </Box>
    </div>
  );
};

const JobPostNotificationList = () => {
  const { allConfig } = useSelector((state) => state.config);
  const [page, setPage] = React.useState(1);
  const [list, setList] = React.useState([]);
  const [totalPages, setTotalPages] = React.useState(1);
  const [isLoading, setIsLoading] = React.useState(true);
  const [isLoadingUpdate, setIsLoadingUpdate] = React.useState(false);
  const [openPopup, setOpenPopup] = React.useState(false);
  const [updateId, setUpdateId] = React.useState(null);

  React.useEffect(() => {
    const fetchJobPostNotifications = async () => {
      setIsLoading(true);
      try {
        const resData = await jobPostNotificationService.getAll(page);
        const data = resData.data;
        setList(data.items);
        setTotalPages(data.totalPages);
      } catch (error) {
        errorHandling(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchJobPostNotifications();
  }, [page]);

  const handleChangePage = (event, value) => {
    setPage(value);
  };

  const handleShowUpdate = (id) => {
    setUpdateId(id);
    setOpenPopup(true);
  };

  const handleDelete = async (id) => {
    const confirm = await confirmModal(
      'Delete Job Post Notification',
      'Are you sure you want to delete this job post notification?'
    );
    if (!confirm.isConfirmed) return;

    setIsLoadingUpdate(true);

    try {
      await jobPostNotificationService.delete(id);
      setList((prevList) => prevList.filter((item) => item.id !== id));
      toastMessages.success('Deleted successfully');
    } catch (error) {
      errorHandling(error);
    } finally {
      setIsLoadingUpdate(false);
    }
  };

  const handlePopupClose = () => {
    setOpenPopup(false);
    setUpdateId(null);
  };

  const handlePopupSave = () => {
    setOpenPopup(false);
    setUpdateId(null);
    setPage(1);
  };

  return (
    <Box>
      <Stack direction="row" spacing={1} alignItems="center" mb={3}>
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          onClick={() => setOpenPopup(true)}
        >
          Add New Notification
        </Button>
      </Stack>
      <Divider />
      <Stack spacing={3} mt={3}>
        {isLoading ? (
          <>
            <ItemLoading />
            <ItemLoading />
            <ItemLoading />
          </>
        ) : list.length === 0 ? (
          <NoDataCard
            title="No Job Post Notifications Found"
            imgComponentSgv={<ImageSvg10 width="100%" height={300} />}
          />
        ) : (
          list.map((item) => (
            <ItemComponent
              key={item.id}
              id={item.id}
              jobName={item.jobName}
              salary={item.salary}
              frequency={item.frequency}
              isActive={item.isActive}
              career={item.career}
              city={item.city}
              handleShowUpdate={handleShowUpdate}
              handleDelete={handleDelete}
            />
          ))
        )}
      </Stack>
      {totalPages > 1 && (
        <Box mt={3} display="flex" justifyContent="center">
          <Pagination
            count={totalPages}
            page={page}
            onChange={handleChangePage}
            color="primary"
          />
        </Box>
      )}
      {/* Start: FormPopup */}
      <FormPopup
        open={openPopup}
        onClose={handlePopupClose}
        title={
          updateId ? 'Update Job Post Notification' : 'Add Job Post Notification'
        }
      >
        <JobPostNotificationForm
          id={updateId}
          onClose={handlePopupClose}
          onSave={handlePopupSave}
        />
      </FormPopup>
      {/* End: FormPopup */}
      {/* Start: full screen loading */}
      {isLoadingUpdate && <BackdropLoading />}
      {/* End: full screen loading */}
    </Box>
  );
};

export default JobPostNotificationList;
