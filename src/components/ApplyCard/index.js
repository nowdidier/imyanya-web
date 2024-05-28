import React from 'react';
import { Typography } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';

import toastMessages from '../../utils/toastMessages';
import errorHandling from '../../utils/errorHandling';
import BackdropLoading from '../loading/BackdropLoading';
import FormPopup from '../controls/FormPopup';
import ApplyForm from '../ApplyForm';
import jobPostActivityService from '../../services/jobPostActivityService';

const ApplyCard = ({
  title = '',
  jobPostId,
  openPopup,
  setOpenPopup,
  setIsApplySuccess,
}) => {
  const [isFullScreenLoading, setIsFullScreenLoading] = React.useState(false);

  const handleApplyJob = (data) => {
    const applyJob = async (data) => {
      setIsFullScreenLoading(true);
      try {
        await jobPostActivityService.applyJob(data);

        toastMessages.success('Application successful.');
        setIsApplySuccess(true);
        setOpenPopup(false);
      } catch (error) {
        errorHandling(error);
      } finally {
        setIsFullScreenLoading(false);
      }
    };

    applyJob({ ...data, job_post: jobPostId });
  };

  return (
    <>
      <FormPopup
        title={
          <>
            <Typography color="gray">phoneiganira kuruyu Mwanya </Typography>
            <span>{title}</span>
          </>
        }
        buttonText="Apply"
        buttonIcon={<SendIcon />}
        openPopup={openPopup}
        setOpenPopup={setOpenPopup}
      >
        <ApplyForm handleApplyJob={handleApplyJob} />
      </FormPopup>

      {/* Start: full screen loading */}
      {isFullScreenLoading && <BackdropLoading />}
      {/* End: full screen loading */}
    </>
  );
};

export default ApplyCard;
