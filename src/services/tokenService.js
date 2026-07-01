import Cookies from 'js-cookie';
import { AUTH_CONFIG } from '../configs/constants';

const getCookieOptions = () => {
  const isSecureContext =
    typeof window !== 'undefined' &&
    window.location?.protocol === 'https:';

  return {
    expires: 365,
    path: '/',
    sameSite: 'Lax',
    secure: isSecureContext,
  };
};

const readCookie = (key) => {
  try {
    const value = Cookies.get(key);
    if (value && value !== undefined) {
      return value;
    }

    return null;
  } catch (error) {
    return null;
  }
};

const tokenService = {
  getAccessTokenFromCookie: () => {
    return readCookie(AUTH_CONFIG.ACCESS_TOKEN_KEY);
  },
  getRefreshTokenFromCookie: () => {
    return readCookie(AUTH_CONFIG.REFRESH_TOKEN_KEY);
  },
  getProviderFromCookie: () => {
    return readCookie(AUTH_CONFIG.BACKEND_KEY);
  },
  saveAccessTokenAndRefreshTokenToCookie: (
    accessToken,
    refreshToken,
    provider
  ) => {
    try {
      if (!accessToken || !refreshToken || !provider) {
        return false;
      }

      const cookieOptions = getCookieOptions();

      Cookies.set(AUTH_CONFIG.ACCESS_TOKEN_KEY, accessToken, cookieOptions);
      Cookies.set(AUTH_CONFIG.REFRESH_TOKEN_KEY, refreshToken, cookieOptions);
      Cookies.set(AUTH_CONFIG.BACKEND_KEY, provider, cookieOptions);

      return true;
    } catch (error) {
      return false;
    }
  },
  removeAccessTokenAndRefreshTokenFromCookie: () => {
    try {
      const cookieOptions = { path: '/' };

      Cookies.remove(AUTH_CONFIG.ACCESS_TOKEN_KEY, cookieOptions);
      Cookies.remove(AUTH_CONFIG.REFRESH_TOKEN_KEY, cookieOptions);
      Cookies.remove(AUTH_CONFIG.BACKEND_KEY, cookieOptions);

      return true;
    } catch (error) {
      return false;
    }
  },
};

export default tokenService;
