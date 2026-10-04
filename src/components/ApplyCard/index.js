import React from 'react';
import { Typography } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';

import toastMessages from '../../utils/toastMessages';
import errorHandling from '../../utils/errorHandling';
import {
  buildJobApplicationMessage,
  buildMailtoUrl,
  buildWhatsAppUrl,
} from '../../utils/funcUtils';
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
  contactPhone = '',
  contactEmail = '',
  jobUrl = '',
}) => {
  const [isFullScreenLoading, setIsFullScreenLoading] = React.useState(false);

  const handleApplyJob = (data) => {
    const applyJob = async (data) => {
      setIsFullScreenLoading(true);
     try {
        await jobPostActivityService.applyJob(data);

        toastMessages.success('Apply successfully.');
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

  const buildApplicationMessage = (data, resume) =>
    buildJobApplicationMessage({
      jobTitle: title,
      jobUrl,
      fullName: data.fullName,
      email: data.email,
      phone: data.phone,
      resumeTitle: resume?.title,
    });

  const handleApplyViaWhatsApp = (data, resume) => {
    const url = buildWhatsAppUrl(
      contactPhone,
      buildApplicationMessage(data, resume)
    );

    if (!url) {
      toastMessages.warn(
        'This job has no contact phone number for WhatsApp applications.'
      );
      return;
    }

    window.open(url, '_blank', 'noopener,noreferrer');
    toastMessages.info(
      'WhatsApp opened with your application details. Press send to finish.'
    );
  };

  const handleApplyViaEmail = (data, resume) => {
    const url = buildMailtoUrl(
      contactEmail,
      `Job application: ${title || 'this job'}`,
      buildApplicationMessage(data, resume)
    );

    if (!url) {
      toastMessages.warn(
        'This job has no contact email address for email applications.'
      );
      return;
    }

    window.location.href = url;
  };

  return (
    <>
      <FormPopup
        title={
          <>
            <Typography color="gray">Apply position </Typography>
            <span>{title}</span>
          </>
        }
        buttonText="Apply"
        buttonIcon={<SendIcon />}
        openPopup={openPopup}
        setOpenPopup={setOpenPopup}
      >
        <ApplyForm
          handleApplyJob={handleApplyJob}
          onWhatsAppApply={handleApplyViaWhatsApp}
          onEmailApply={handleApplyViaEmail}
          showWhatsApp={Boolean(contactPhone)}
          showEmail={Boolean(contactEmail)}
        />
      </FormPopup>

      {/* Start: full screen loading */}
      {isFullScreenLoading && <BackdropLoading />}
      {/* End: full screen loading */}
    </>
  );
};

export default ApplyCard;
