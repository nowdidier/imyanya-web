import httpRequest from '../utils/httpRequest';
import { AUTH_CONFIG } from '../configs/constants';

const normalizeEmail = (email = '') => String(email).trim().toLowerCase();

const authService = {
  getToken: (email, password, role_name) => {
    const url = 'auth/token/';

    const data = {
      grant_type: AUTH_CONFIG.PASSWORD_KEY,
      client_id: AUTH_CONFIG.CLIENT_ID,
      client_secret: AUTH_CONFIG.CLIENT_SECRET,
      username: normalizeEmail(email),
      password: password,
      role_name: role_name,
    };

    return httpRequest.post(url, data);
  },
  convertToken: (clientId, clientSecret, provider, token) => {
    const url = 'auth/convert-token/';

    const data = {
      grant_type: AUTH_CONFIG.CONVERT_TOKEN_KEY,
      client_id: clientId,
      client_secret: clientSecret,
      backend: provider,
      token: token,
    };

    return httpRequest.post(url, data);
  },
  revokeToken: (accessToken, backend) => {
    const url = 'auth/revoke-token/';

    const data = {
      client_id: AUTH_CONFIG.CLIENT_ID,
      client_secret: AUTH_CONFIG.CLIENT_SECRET,
      token: accessToken,
      backend: backend
    };

    return httpRequest.post(url, data);
  },
  checkCreds: (email, roleName) => {
    const url = 'auth/check-creds/';

    const data = {
      email: normalizeEmail(email),
      roleName: roleName,
    };

    return httpRequest.post(url, data);
  },
  jobSeekerRegister: (data) => {
    const url = 'auth/job-seeker/register/';

    return httpRequest.post(url, {
      ...data,
      email: normalizeEmail(data.email),
    });
  },
  employerRegister: (data) => {
    const url = 'auth/employer/register/';

    return httpRequest.post(url, {
      ...data,
      email: normalizeEmail(data.email),
    });
  },
  resendVerificationEmail: (data) => {
    const url = 'auth/resend-verification-email/';

    return httpRequest.post(url, {
      ...data,
      email: normalizeEmail(data.email),
    });
  },
  getUserInfo: () => {
    const url = 'auth/user-info/';

    return httpRequest.get(url);
  },
  updateUser: (data) => {
    const url = 'auth/update-user/';

    return httpRequest.patch(url, data);
  },
  updateAvatar: (data) => {
    const url = 'auth/avatar/';

    return httpRequest.put(url, data, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  },
  deleteAvatar: () => {
    const url = 'auth/avatar/';

    return httpRequest.delete(url);
  },
  changePassword: (data) => {
    const url = 'auth/change-password/';

    return httpRequest.put(url, data);
  },
  forgotPassword: (data) => {
    const url = 'auth/forgot-password/';

    return httpRequest.post(url, {
      ...data,
      email: normalizeEmail(data.email),
    });
  },
  resetPassword: (data) => {
    const url = 'auth/reset-password/';

    return httpRequest.post(url, data);
  },
  getUserSettings: () => {
    const url = 'auth/settings/';

    return httpRequest.get(url);
  },
  updateUserSettings: (data) => {
    const url = 'auth/settings/';

    return httpRequest.put(url, data);
  }
};

export default authService;
