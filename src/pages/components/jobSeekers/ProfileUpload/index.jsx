import React from "react";
import { useDispatch, useSelector } from "react-redux";

import { Box, Button, Divider, Grid, Stack, Typography } from "@mui/material";
import PublishIcon from "@mui/icons-material/Publish";

import { CV_TYPES, SVG_IMAGES } from "../../../../configs/constants";
import toastMessages from "../../../../utils/toastMessages";
import errorHandling from "../../../../utils/errorHandling";
import BackdropLoading from "../../../../components/loading/BackdropLoading";
import FormPopup from "../../../../components/controls/FormPopup";
import ProfileUploadForm from "../ProfileUploadForm";

import jobSeekerProfileService from "../../../../services/jobSeekerProfileService";
import resumeService from "../../../../services/resumeService";
import ProfileUploadCard from "../../../../components/ProfileUploadCard";
import { confirmModal } from "../../../../utils/sweetalert2Modal";
import NoDataCard from "../../../../components/NoDataCard";

import { reloadResume } from "../../../../redux/profileSlice";

const ProfileUpload = ({ title }) => {
  const dispatch = useDispatch();
  const {
    resume: { isReloadResume },
  } = useSelector((state) => state.profile);
  const { currentUser } = useSelector((state) => state.user);
  const [isLoadingResumes, setIsLoadingResumes] = React.useState(false);
  const [resumes, setResumes] = React.useState([]);

  const [openPopup, setOpenPopup] = React.useState(false);
  const [isSuccess, setIsSuccess] = React.useState(false);
  const [isFullScreenLoading, setIsFullScreenLoading] = React.useState(false);

  React.useEffect(() => {
    const getOnlineProfile = async (jobSeekerProfileId, params) => {
      setIsLoadingResumes(true);
      try {
        const resData = await jobSeekerProfileService.getResumes(
          jobSeekerProfileId,
          params
        );

        setResumes(resData.data);
      } catch (error) {
        errorHandling(error);
      } finally {
        setIsLoadingResumes(false);
      }
    };

    getOnlineProfile(currentUser?.jobSeekerProfileId, {
      resumeType: CV_TYPES.cvUpload,
    });
  }, [currentUser, isSuccess, isReloadResume]);

  const handleAdd = (data) => {
    const addResumeUpload = async (formData) => {
      setIsFullScreenLoading(true);
      try {
        await resumeService.addResume(formData);

        setOpenPopup(false);
        setIsSuccess(!isSuccess);
        toastMessages.success("Upload CV successfully.");
      } catch (error) {
        errorHandling(error);
      } finally {
        setIsFullScreenLoading(false);
      }
    };

    var formData = new FormData();
    for (var key in data) {
      formData.append(key, data[key]);
    }
    addResumeUpload(formData);
  };

  const handleDelete = (slug) => {
    const del = async (slug) => {
      try {
        await resumeService.deleteResume(slug);

        setIsSuccess(!isSuccess);
        toastMessages.success("Delete successfully.");
      } catch (error) {
        errorHandling(error);
      } finally {
        setIsFullScreenLoading(false);
      }
    };

    confirmModal(
      () => del(slug),
      "Delete attached CV",
      "This CV will be permanently deleted and cannot be recovered. Are you sure?",
      "warning"
    );
  };

  const handleActive = (slug) => {
    const activeResume = async (resumeSlug) => {
      setIsFullScreenLoading(true);
      try {
        await resumeService.activeResume(resumeSlug);

        dispatch(reloadResume());
        toastMessages.success("Change resume status successfully.");
      } catch (error) {
        errorHandling(error);
      } finally {
        setIsFullScreenLoading(false);
      }
    };

    activeResume(slug);
  };

  return (
    <>
      <Stack>
        <Box>
          <Typography variant="h5">
            {title} (<span style={{ color: "red" }}>{resumes.length}</span>)
          </Typography>
        </Box>
        <Divider sx={{ mt: 2, mb: 3, borderColor: 'grey.500' }} />
        <Box sx={{ px: 1 }}>
          <Box>
            <Box>
              {isLoadingResumes ? (
                <Grid container spacing={2}>
                  {Array.from(Array(3).keys()).map((value, index) => (
                    <Grid key={index} item xs={12} sm={12} md={6} lg={4} xl={4}>
                      <ProfileUploadCard.Loading />
                    </Grid>
                  ))}
                </Grid>
              ) : resumes.length === 0 ? (
                <NoDataCard
                  title="You have not uploaded any CV"
                  imgComponentSgv={<SVG_IMAGES.ImageSvg2 />}
                />
              ) : (
                <Grid container spacing={2}>
                  {resumes.map((value) => (
                    <Grid
                      item
                      xs={12}
                      sm={12}
                      md={6}
                      lg={4}
                      xl={4}
                      key={value.id}
                    >
                      <ProfileUploadCard
                        resumeImage={value?.imageUrl}
                        fileUrl={value?.fileUrl}
                        title={value?.title}
                        updateAt={value?.updateAt}
                        slug={value.slug}
                        id={value.id}
                        isActive={value.isActive}
                        handleDelete={handleDelete}
                        handleActive={handleActive}
                      />
                    </Grid>
                  ))}
                </Grid>
              )}
            </Box>
            <Stack sx={{ pt: 5 }} direction="row" justifyContent="center">
              <Button
                variant="contained"
                startIcon={<PublishIcon />}
                onClick={() => setOpenPopup(true)}
                sx={{
                  px: 4,
                  py: 1.5,
                  background: (theme) => theme.palette.primary.gradient,
                  "&:hover": {
                    background: (theme) => theme.palette.primary.gradient,
                    opacity: 0.9,
                  },
                }}
              >
                Upload CV
              </Button>
            </Stack>
          </Box>
        </Box>
      </Stack>
      {/* Start: form  */}
      <FormPopup
        title="Resume information"
        openPopup={openPopup}
        setOpenPopup={setOpenPopup}
      >
        <ProfileUploadForm handleAdd={handleAdd} />
      </FormPopup>
      {/* End: form */}

      {/* Start: full screen loading */}
      {isFullScreenLoading && <BackdropLoading />}
      {/* End: full screen loading */}
    </>
  );
};

export default ProfileUpload;
