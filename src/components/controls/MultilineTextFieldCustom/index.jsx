import React from 'react';
import { Controller } from 'react-hook-form';
import { TextField, Typography, Box } from '@mui/material';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleExclamation } from '@fortawesome/free-solid-svg-icons';

const MultilineTextFieldCustom = ({
  name,
  control,
  title = null,
  showRequired = false,
  placeholder = '',
  disabled = false,
  maxRows = 10,
  minRows = 4
}) => {
  return (
    <Box>
      {title && (
        <Typography variant="subtitle2" gutterBottom>
           {title} {showRequired && <span style={{ color: 'red' }}>*</span>}
        </Typography>
      )}
      <Controller
        name={name}
        control={control}
        render={({ field, fieldState }) => (
          <>
            <TextField
              {...field} // Spread handles name, onChange, onBlur, and value automatically
              value={field.value || ''} // Fallback to '' prevents "uncontrolled to controlled" warning
              fullWidth
              id={field.name}
              placeholder={placeholder}
              error={fieldState.invalid}
              disabled={disabled}
              multiline
              maxRows={maxRows}
              minRows={minRows}
              variant="outlined"
            />
            {fieldState.invalid && (
              <Box
                component="span"
                sx={{
                  color: 'red',
                  fontSize: 13,
                  marginTop: '4px',
                  marginLeft: '4px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '5px'
                }}
              >
                <FontAwesomeIcon icon={faCircleExclamation} />
                {fieldState.error?.message}
              </Box>
            )}
          </>
        )}
      />
    </Box>
  );
};

export default MultilineTextFieldCustom;