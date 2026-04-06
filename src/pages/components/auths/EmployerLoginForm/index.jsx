
import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Box, Button, Stack, styled } from '@mui/material';
import LoginIcon from '@mui/icons-material/Login';

import TextFieldCustom from '../../../../components/controls/TextFieldCustom';
import PasswordTextFieldCustom from '../../../../components/controls/PasswordTextFieldCustom';

const StyledButton = styled(Button)(({ theme }) => ({
  padding: '8px 16px',
  borderRadius: '8px',
  fontSize: '14px',
  fontWeight: 500,
  textTransform: 'none',
  boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
  transition: 'all 0.2s ease',
  '&:hover': {
    transform: 'translateY(-1px)',
    boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
  },
}));

const EmployerLoginForm = ({ onLogin }) => {
  const schema = yup.object().shape({
  email: yup
    .string()
    .email('Invalid email')
    .required('Email is required'),
  password: yup
    .string()
    .required('Password is required')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
      'Password must have 8+ chars, upper, lower, number and special character'
    ),
});

  const { control, handleSubmit } = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
    resolver: yupResolver(schema),
  });

  return (
    <Box 
      component="form" 
      onSubmit={handleSubmit(onLogin)}
      sx={{
        width: '100%',
        '& .MuiTextField-root': {
          borderRadius: '10px',
        },
      }}
    >
      <Stack spacing={2.5} sx={{ mb: 3 }}>
        <TextFieldCustom
          name="email"
          control={control}
          title="Email"
          showRequired={true}
          sx={{
            '& .MuiOutlinedInput-root': {
              borderRadius: '10px',
              backgroundColor: 'rgba(255, 255, 255, 0.8)',
            }
          }}
        />
        <PasswordTextFieldCustom
          name="password"
          control={control}
         
          showRequired={true}
          sx={{
            '& .MuiOutlinedInput-root': {
              borderRadius: '10px',
              backgroundColor: 'rgba(255, 255, 255, 0.8)',
            }
          }}
        />
      </Stack>
      <StyledButton 
        fullWidth 
        variant="contained" 
        type="submit"
        startIcon={<LoginIcon />}
      >
      </StyledButton>
    </Box>
  );
};

export default EmployerLoginForm;
