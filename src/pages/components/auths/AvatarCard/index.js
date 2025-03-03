import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Stack, IconButton, Typography } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';

import { confirmModal } from '../../../../utils/sweetalert2Modal';
import BackdropLoading from '../../../../components/loading/BackdropLoading';
import toastMessages from '../../../../utils/toastMessages';
import MuiImageCustom from '../../../../components/MuiImageCustom';
import { deleteAvatar, updateAvatar } from '../../../../redux/userSlice';

import { Upload } from 'antd';
import ImgCrop from 'antd-img-crop';

const AvatarCard = () => {
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.user);
  const [isFullScreenLoading, setIsFullScreenLoading] = React.useState(false);

  const handleUpload = async (options) => {
    const { file } = options;
    var formData = new FormData();
    formData.append('file', file);

    setIsFullScreenLoading(true);

    dispatch(updateAvatar(formData))
      .unwrap()
      .then(() => {
        toastMessages.success('Avatar updated successfully.');
      })
      .catch(() => {
        toastMessages.error('An error occurred, please try again.');
      })
      .finally(() => setIsFullScreenLoading(false));
  };

  const handleDelete = () => {
    const del = async () => {
      setIsFullScreenLoading(true);

      dispatch(deleteAvatar())
        .unwrap()
        .then(() => {
          toastMessages.success('Xóa ảnh đại diện thành công.');
        })
        .catch((err) => {
          toastMessages.error();
        })
        .finally(() => setIsFullScreenLoading(false));
    };

    confirmModal(
      () => del(),
      'Delete Avatar',
      'This avatar will be deleted and cannot be recovered. Are you sure?',
      'warning'
    );
  };

  return (
    <>
      <Stack alignItems="center">
        <Box>
          <MuiImageCustom
            src={currentUser?.avatarUrl}
            width={120}
            height={120}
            sx={{ borderRadius: '50%' }}
          />
        </Box>
        <Box>
          <ImgCrop
            rotationSlider
            modalProps={{ zIndex: 2000 }}
            modalTitle="Edit Image"
            modalOk="Upload"
            modalCancel="Cancel"
            showReset={true}
            resetText="Reset"
          >
            <Upload
              listType="picture"
              maxCount={1}
              customRequest={handleUpload}
              showUploadList={false}
            >
              <IconButton color="warning" aria-label="upload" component="label">
                <EditIcon />
              </IconButton>
            </Upload>
          </ImgCrop>
          <IconButton
            color="error"
            aria-label="upload"
            component="label"
            onClick={handleDelete}
          >
            <HighlightOffIcon />
          </IconButton>
        </Box>
        <Typography variant="subtitle2" gutterBottom sx={{ mt: 1 }}>
          Avatar
        </Typography>
      </Stack>

      {/* Start: full screen loading */}
      {isFullScreenLoading && <BackdropLoading />}
      {/* End: full screen loading */}
    </>
  );
};

export default React.memo(AvatarCard);
