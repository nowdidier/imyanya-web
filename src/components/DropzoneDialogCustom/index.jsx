import React from 'react';
import { DropzoneDialog } from 'mui-file-dropzone';
import {
  IconButton,
  Typography,
  Stack,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const DropzoneDialogCustom = (props) => {
  const { open, setOpen, handleUpload, title = 'Title' } = props;

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
      submitButtonText="Upload"
      cancelButtonText="Cancel"
      maxFileSize={5000000}
      open={open}
      onClose={() => setOpen(false)}
      onSave={(files) => {
        setOpen(false);

        handleUpload(files);
      }}
      showPreviews={true}
      showFileNamesInPreview={false}
      dropzoneText="Drag and drop files here or click"
      previewText="Preview"
      getFileLimitExceedMessage={(number) =>
        `Upload limit is ${number} files.`
      }
      getFileAddedMessage={(fileName) =>
        `File ${fileName} was added successfully.`
      }
      getFileRemovedMessage={(fileName) => `File ${fileName} was removed`}
      {...props}
    />
  );
};

export default DropzoneDialogCustom;
