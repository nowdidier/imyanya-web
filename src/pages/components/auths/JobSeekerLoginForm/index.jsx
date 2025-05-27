

import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Box, Button, Stack, styled, Divider } from "@mui/material";
import LoginIcon from "@mui/icons-material/Login";
import FacebookIcon from "@mui/icons-material/Facebook";
import GoogleIcon from "@mui/icons-material/Google";
import { LoginSocialFacebook } from "reactjs-social-login";
import { useGoogleLogin } from "@react-oauth/google";
import TextFieldCustom from "../../../../components/controls/TextFieldCustom";
import PasswordTextFieldCustom from "../../../../components/controls/PasswordTextFieldCustom";
import { AUTH_CONFIG } from "../../../../configs/constants";

const StyledButton = styled(Button)(({ theme }) => ({
  padding: "8px 16px",
  borderRadius: "8px",
  fontSize: "14px",
  fontWeight: 500,
  textTransform: "none",
  boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
  transition: "all 0.2s ease",
  "&:hover": {
    transform: "translateY(-1px)",
    boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
  },
}));

const StyledSocialButton = styled(Button)(({ theme }) => ({
  padding: "8px 16px",
  borderRadius: "8px",
  fontSize: "14px",
  fontWeight: 500,
  textTransform: "none",
  boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
  transition: "all 0.2s ease",
  "&:hover": {
    transform: "translateY(-1px)",
    boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
  },
}));

const StyledDivider = styled(Divider)({
  margin: "20px 0",
  "&::before, &::after": {
    borderColor: "rgba(0, 0, 0, 0.2)",
  },
  "& .MuiDivider-wrapper": {
    padding: "0 16px",
    fontSize: "13px",
    color: "rgba(0, 0, 0, 0.6)",
  },
});

const JobSeekerLoginForm = ({ onLogin, onFacebookLogin, onGoogleLogin }) => {
  const schema = yup.object().shape({
    email: yup
      .string()
      .required("Email is required!")
      .email("Invalid email format"),
    password: yup
      .string()
      .required("Password is required!")
      .min(8, "Password must be at least 8 characters.")
      .max(128, "Password exceeds maximum length.")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
        "Must contain uppercase, lowercase, number and special character"
      ),
  });

  const { control, handleSubmit } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: yupResolver(schema),
  });

  const googleLogin = useGoogleLogin({
    onSuccess: onGoogleLogin,
    flow: "auth-code",
  });

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(onLogin)}
      sx={{
        width: "100%",
        "& .MuiTextField-root": {
          borderRadius: "10px",
        },
      }}
    >
      <Stack spacing={2.5} sx={{ mb: 3 }}>
        <TextFieldCustom
          name="email"
          control={control}
          title="Email"
          placeholder="Enter your email"
          showRequired={true}
          sx={{
            "& .MuiOutlinedInput-root": {
              borderRadius: "10px",
              backgroundColor: "rgba(255, 255, 255, 0.8)",
            },
          }}
        />
        <PasswordTextFieldCustom
          name="password"
          control={control}
          title="Password"
          placeholder="Enter your password"
          showRequired={true}
          sx={{
            "& .MuiOutlinedInput-root": {
              borderRadius: "10px",
              backgroundColor: "rgba(255, 255, 255, 0.8)",
            },
          }}
        />
      </Stack>
      <StyledButton
        fullWidth
        variant="contained"
        type="submit"
        startIcon={<LoginIcon />}
      >
        Login
      </StyledButton>

      <StyledDivider>Or login with</StyledDivider>

      <Stack
        direction="row"
        spacing={2}
        sx={{
          width: "100%",
          "& > *": {
            flex: 1,
          },
        }}
      >
        <LoginSocialFacebook
          appId={AUTH_CONFIG.FACEBOOK_CLIENT_ID}
          scope="email,public_profile"
          fieldsProfile={"id"}
          isOnlyGetToken={true}
          ux_mode="popup"
          onResolve={onFacebookLogin}
          onReject={(err) => {
            console.log(err);
          }}
        >
          <StyledSocialButton
            fullWidth
            variant="outlined"
            onClick={onFacebookLogin}
            startIcon={<FacebookIcon />}
            sx={{
              borderColor: "#4267B2",
              color: "#4267B2",
              "&:hover": {
                borderColor: "#4267B2",
                backgroundColor: "rgba(66, 103, 178, 0.04)",
              },
            }}
          >
            Facebook
          </StyledSocialButton>
        </LoginSocialFacebook>

        <StyledSocialButton
          fullWidth
          variant="outlined"
          onClick={() => googleLogin()}
          startIcon={<GoogleIcon />}
          sx={{
            borderColor: "#DB4437",
            color: "#DB4437",
            "&:hover": {
              borderColor: "#DB4437",
              backgroundColor: "rgba(219, 68, 55, 0.04)",
            },
          }}
        >
          Google
        </StyledSocialButton>
      </Stack>
    </Box>
  );
};

export default JobSeekerLoginForm;
