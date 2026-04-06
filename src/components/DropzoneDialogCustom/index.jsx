
import React from 'react';
import { DropzoneDialog } from 'mui-file-dropzone';
import {
  IconButton,
  Typography,
  Stack,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const DropzoneDialogCustom = (props) => {

  const dialogTitle = (title) => (
    <>
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Typography variant="h5">{title}</Typography>
        <IconButton color="error" onClick={() => setOpen(false)}>
          <CloseIcon />
        </IconButton>
      </Stack>
    </>
  );

  return (
    <DropzoneDialog
      dialogTitle={dialogTitle(title)}
      acceptedFiles={['image/*']}
      maxFileSize={5000000}
      open={open}
      onClose={() => setOpen(false)}
      onSave={(files) => {
        setOpen(false);

        handleUpload(files);
      }}
      showPreviews={true}
      showFileNamesInPreview={false}
      getFileLimitExceedMessage={(number) => `File limit exceeded: ${number}`}
      getFileAddedMessage={(fileName) => `${fileName} added`}
      {...props}
    />
  );
};

export default DropzoneDialogCustom;
