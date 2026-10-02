import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Box, Button, Stack, styled, Divider } from "@mui/material";
import LoginIcon from "@mui/icons-material/Login";
import FacebookIcon from "@mui/icons-material/Facebook";
import GoogleIcon from "@mui/icons-material/Google";
import { LoginSocialFacebook, LoginSocialGoogle } from "reactjs-social-login";

import TextFieldCustom from "../../../../components/controls/TextFieldCustom";
import PasswordTextFieldCustom from "../../../../components/controls/PasswordTextFieldCustom";
import { AUTH_CONFIG } from "../../../../configs/constants";
import { getSocialAuthConfigIssue } from "../../../../utils/authErrorMessage";
import toastMessages from "../../../../utils/toastMessages";
import { getSocialLoginRedirectUri } from "../../../../utils/socialLogin";

const StyledButton = styled(Button)(() => ({
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

const StyledSocialButton = styled(Button)(() => ({
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

const JobSeekerLoginForm = ({
  onLogin,
  onInvalid,
  onFacebookLogin,
  onGoogleLogin,
  onSocialReject,
}) => {
  const socialRedirectUri = getSocialLoginRedirectUri();

  const facebookIssue = getSocialAuthConfigIssue('facebook', {
    facebookAppId: AUTH_CONFIG.FACEBOOK_CLIENT_ID,
  });
  const googleIssue = getSocialAuthConfigIssue('google', {
    googleClientId: AUTH_CONFIG.GOOGLE_CLIENT_ID,
  });

  const guardClick = (issue) => (event) => {
    if (issue) {
      event.stopPropagation();
      if (onSocialReject) {
        onSocialReject({ data: issue });
      } else {
        toastMessages.error(issue);
      }
    }
  };

  const schema = yup.object().shape({
    email: yup
      .string()
      .required('Email is required!')
      .email('Invalid email format'),
    password: yup
      .string()
      .required("Password is required!"),
  });

  const { control, handleSubmit } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: yupResolver(schema),
  });

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(onLogin, onInvalid)}
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

      <StyledDivider>Fastest: sign in with Google or Facebook — no password needed</StyledDivider>

      <Stack 
        direction="row" 
        spacing={2} 
        sx={{
          width: '100%',
          '& > *': {
            flex: 1,
          }
        }}
      >
        <LoginSocialFacebook
          appId={AUTH_CONFIG.FACEBOOK_CLIENT_ID}
          scope="email,public_profile"
          fieldsProfile={"id"}
          isOnlyGetToken={true}
          redirect_uri={socialRedirectUri}
          ux_mode="popup"
          onResolve={onFacebookLogin}
          onReject={onSocialReject}
        >
          <StyledSocialButton
            fullWidth
            variant="outlined"
            startIcon={<FacebookIcon />}
            onClick={guardClick(facebookIssue)}
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

        <LoginSocialGoogle
          client_id={AUTH_CONFIG.GOOGLE_CLIENT_ID}
          isOnlyGetToken={true}
          typeResponse="accessToken"
          scope="openid profile email"
          onResolve={onGoogleLogin}
          onReject={onSocialReject}
          ux_mode="popup"
        >
          <StyledSocialButton
            fullWidth
            variant="outlined"
            startIcon={<GoogleIcon />}
            onClick={guardClick(googleIssue)}
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
        </LoginSocialGoogle>
      </Stack>
    </Box>
  );
};

export default JobSeekerLoginForm;
