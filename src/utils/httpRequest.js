import axios from "axios";
import queryString from "query-string";

import tokenService from "../services/tokenService";

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

httpRequest.interceptors.response.use(
  (response) => {
    return response.data;
  },

  async (error) => {
    // Access token expired or invalid
    if (
      error?.response?.status === 401
    ) {
      tokenService.removeAccessTokenAndRefreshTokenFromCookie();

      // Optional refresh token logic
      // can be added here later.
    }

    return Promise.reject(error);
  }
);

export default httpRequest;
