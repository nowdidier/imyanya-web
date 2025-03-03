import React from 'react';
import { useDropzone } from 'react-dropzone';
import { Controller } from 'react-hook-form';
import { Stack, Box, Typography, Button } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faArrowUpFromBracket,
  faCircleExclamation,
} from '@fortawesome/free-solid-svg-icons';


const FileDropzone = ({ accept, onDrop, values }) => {
  const { getRootProps, getInputProps } = useDropzone({
    accept,
    onDrop,
  });

  return (
    <Box
      sx={{
        borderStyle: 'dashed',
        borderColor: '#bdbdbd',
        py: 10,
        borderRadius: 2,
        cursor: 'pointer',
      }}
      {...getRootProps({ className: 'dropzone' })}
    >
      <input {...getInputProps()} />
      <Stack
        direction="column"
        alignItems="center"
        spacing={2}
        sx={{ color: 'gray' }}
      >
        {!values ? (
          <>
            <Box>
              <FontAwesomeIcon icon={faArrowUpFromBracket} fontSize={50} />
            </Box>
            <Typography variant="h5">Drag your resume here</Typography>
            <Typography>Or you can</Typography>
            <Button
              variant="contained"
              size="small"
              color="warning"
              sx={{ color: 'white' }}
            >
              Choose file from computer
            </Button>
            <Typography variant="caption">Supports .pdf format</Typography>
          </>
        ) : (
          <>
            <Typography>{values.length >= 0 && values[0].name}</Typography>
            <Button
              variant="contained"
              size="small"
              color="warning"
              sx={{ color: 'white' }}
            >
              Change file
            </Button>
          </>
        )}
      </Stack>
    </Box>
  );
};

const BasicDropzone = ({ control, name, title = '', showRequired = false }) => {
  return (
    <div>
      {title && (
        <Typography variant="subtitle2" gutterBottom>
          {title} {showRequired && <span style={{ color: 'red' }}>*</span>}
        </Typography>
      )}
      <Stack spacing={1} direction="column"></Stack>
      <Controller
        name={name}
        control={control}
        render={({ field, fieldState }) => (
          <>
            <FileDropzone
              name="file"
              accept="image/*"
              onDrop={field.onChange}
              values={field.value}
            />
            {fieldState.invalid && (
              <span
                style={{
                  color: 'red',
                  fontSize: 13,
                  marginTop: 1,
                  marginLeft: 1,
                }}
              >
                <FontAwesomeIcon icon={faCircleExclamation} />{' '}
                {fieldState.error?.message}
              </span>
            )}
          </>
        )}
      />
    </div>
  );
};

export default BasicDropzone;
