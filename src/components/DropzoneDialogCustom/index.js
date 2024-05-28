import React from 'react';
import { DropzoneDialog } from 'mui-file-dropzone';
import {
  IconButton,
  Typography,
  Stack,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const DropzoneDialogCustom = (props) => {
  const { open, setOpen, handleUpload, title = 'Igitekerezo' } = props;

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
      submitButtonText="Emeza"
      cancelButtonText="Siba"
      maxFileSize={5000000}
      open={open}
      onClose={() => setOpen(false)}
      onSave={(files) => {
        setOpen(false);

        handleUpload(files);
      }}
      showPreviews={true}
      showFileNamesInPreview={false}
      dropzoneText="Kuvugurura akarango hano cyangwa gukomeza"
      previewText="Ikimenyetso"
      getFileLimitExceedMessage={(number) =>
        `Igikomezo cyo kuvugurura ni ${number} cyarangiye.`
      }
      getFileAddedMessage={(fileName) =>
        `Igikorwa cyo kuvugurura têri ${fileName} cyakozwe neza.`
      }
      getFileRemovedMessage={(fileName) => `Igikorwa cyo kuvugurura têri ${fileName} cyakozwe`}
      {...props}
    />
  );
};

export default DropzoneDialogCustom;
