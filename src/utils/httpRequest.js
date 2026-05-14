import axios from 'axios';
import queryString from 'query-string';
import tokenService from '../services/tokenService';

const prefix = 'api';

// Dev: relative path → CRACO proxy forwards to Koyeb (avoids CORS in browser)
// Prod: full URL → Cloudflare Workers has no proxy, so we need the absolute backend URL
const baseURL = `/${prefix}/`;

// These URLs are relative to baseURL, so no 'api/' prefix needed
const notAuthenticationURL = ['auth/token/', 'auth/convert-token/'];

const httpRequest = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
  paramsSerializer: {
    serialize: (params) => queryString.stringify(params, { arrayFormat: 'bracket' }),
  },
  withCredentials: true,
  timeout: 30000,
});

httpRequest.interceptors.request.use(
  (config) => {
    const accessToken = tokenService.getAccessTokenFromCookie();
    if (accessToken && !notAuthenticationURL.includes(config.url)) {
      config.headers['Authorization'] = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

httpRequest.interceptors.response.use(
  (response) => {
    const contentType = response.headers?.['content-type'] || '';

    if (
      contentType.includes('text/html') &&
      typeof response.data === 'string'
    ) {
      return Promise.reject(
        new Error(
          `API request returned HTML instead of JSON: ${response.config?.url || 'unknown URL'}`
        )
      );
    }

    return response.data;
  },
  (error) => {
    if (error.response?.status === 401) {
      tokenService.removeAccessTokenAndRefreshTokenFromCookie();
    }
    return Promise.reject(error);
  }
);

export default httpRequest;
