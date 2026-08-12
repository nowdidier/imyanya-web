import axios from "axios";
import queryString from "query-string";

import tokenService from "../services/tokenService";
import { AUTH_CONFIG } from "../configs/constants";

// ==============================
// PUBLIC ENDPOINTS
// ==============================

// API endpoints that do not require authentication
const notAuthenticationURL = [
  "auth/token/",
  "auth/convert-token/",
  "auth/check-creds/",
  "auth/job-seeker/register/",
  "auth/employer/register/",
  "auth/resend-verification-email/",
  "auth/forgot-password/",
  "auth/reset-password/",
];

// ==============================
// API PREFIX
// ==============================

const prefix = "api";

// ==============================
// BASE URL
// ==============================

// Local CRACO, Vercel, and Cloudflare all proxy /api
// to the backend, avoiding browser CORS.
//
// Dev:
//   React → CRACO Proxy → Backend
//
// Production:
//   Vercel Rewrite → Backend
//
// Cloudflare uses public/_worker.js for the same /api path.
const baseURL = `/${prefix}/`;

// ==============================
// AXIOS INSTANCE
// ==============================

const httpRequest = axios.create({
  baseURL,

  headers: {
    "Content-Type": "application/json",
  },

  paramsSerializer: {
    serialize: (params) => {
      return queryString.stringify(
        params,
        {
          arrayFormat: "bracket",
        }
      );
    },
  },

  withCredentials: true,

  timeout: 30000,
});

// ==============================
// REQUEST INTERCEPTOR
// ==============================

httpRequest.interceptors.request.use(
  (config) => {
    const accessToken =
      tokenService.getAccessTokenFromCookie();

    const requestURL =
      config.url?.replace(/^\/+/, "") || "";

    // Attach token only for protected routes
    if (
      accessToken &&
      !notAuthenticationURL.includes(
        requestURL
      )
    ) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }

    return config;
  },

  (error) => {
    return Promise.reject(error);
  }
);

// ==============================
// RESPONSE INTERCEPTOR
// ==============================

let isRefreshing = false;
let refreshPromise = null;

// Exchange the refresh token for a new access token.
// Returns the new access token, or null when refresh fails.
const refreshAccessToken = async () => {
  const refreshToken = tokenService.getRefreshTokenFromCookie();
  if (!refreshToken) {
    return null;
  }

  try {
    const res = await axios.post(
      `${baseURL}auth/token/`,
      {
        grant_type: "refresh_token",
        client_id: AUTH_CONFIG.CLIENT_ID,
        client_secret: AUTH_CONFIG.CLIENT_SECRET,
        refresh_token: refreshToken,
      },
      {
        headers: { "Content-Type": "application/json" },
      }
    );

    const data = res.data?.data || {};
    if (!data.access_token) {
      return null;
    }

    tokenService.saveAccessTokenAndRefreshTokenToCookie(
      data.access_token,
      data.refresh_token || refreshToken,
      data.backend || tokenService.getProviderFromCookie() || "0"
    );

    return data.access_token;
  } catch (error) {
    return null;
  }
};

const handleUnauthorized = async (error) => {
  const config = error?.config || {};

  // Never try to refresh when the token request itself fails,
  // or when this request already retried once.
  if (config._authRetried) {
    tokenService.removeAccessTokenAndRefreshTokenFromCookie();
    return Promise.reject(error);
  }

  // Queue concurrent 401s behind a single refresh call.
  if (isRefreshing) {
    if (!refreshPromise) {
      return Promise.reject(error);
    }

    const newToken = await refreshPromise.catch(() => null);
    if (!newToken) {
      return Promise.reject(error);
    }

    config._authRetried = true;
    config.headers = config.headers || {};
    config.headers.Authorization = `Bearer ${newToken}`;

    return httpRequest(config);
  }

  // Only refresh when a refresh token actually exists
  const hasRefreshToken = Boolean(tokenService.getRefreshTokenFromCookie());
  if (!hasRefreshToken) {
    tokenService.removeAccessTokenAndRefreshTokenFromCookie();
    return Promise.reject(error);
  }

  isRefreshing = true;
  refreshPromise = refreshAccessToken();

  try {
    const newToken = await refreshPromise;
    if (!newToken) {
      tokenService.removeAccessTokenAndRefreshTokenFromCookie();
      return Promise.reject(error);
    }

    config._authRetried = true;
    config.headers = config.headers || {};
    config.headers.Authorization = `Bearer ${newToken}`;

    return httpRequest(config);
  } finally {
    isRefreshing = false;
    refreshPromise = null;
  }
};

httpRequest.interceptors.response.use(
  (response) => {
    return response.data;
  },

  async (error) => {
    // Access token expired or invalid -> try to refresh once
    if (error?.response?.status === 401) {
      return handleUnauthorized(error);
    }

    return Promise.reject(error);
  }
);

export default httpRequest;
