const getAuthErrorMessage = (
  error,
  fallback = 'Unable to sign in. Please check your details and try again.'
) => {
  const res = error?.response;

  if (!res) {
    return 'Unable to reach the authentication server. Please check your connection and try again.';
  }

  const errors = res.data?.errors;
  const errorMessage = errors?.errorMessage;

  if (Array.isArray(errorMessage)) {
    return errorMessage.join(' ');
  }

  if (typeof errorMessage === 'string') {
    return errorMessage;
  }

  if (errors && typeof errors === 'object') {
    const fieldMessages = Object.values(errors)
      .flat()
      .filter(Boolean);

    if (fieldMessages.length > 0) {
      return fieldMessages.join(' ');
    }
  }

  if (typeof res.data?.detail === 'string') {
    return res.data.detail;
  }

  if (res.status >= 500) {
    return 'The authentication server is temporarily unavailable. Please try again in a moment.';
  }

  if (typeof res.data === 'string') {
    if (/<html[\s>]/i.test(res.data) || /<!doctype html/i.test(res.data)) {
      return 'The authentication server returned a server error. Please try again in a moment.';
    }

    if (res.data.includes('Bad Request')) {
      return 'The authentication server rejected this domain. Please check backend ALLOWED_HOSTS, CSRF, and CORS settings.';
    }

    return res.data;
  }

  if (res.status === 400) {
    return 'The authentication request was rejected. Please check the login details and backend auth configuration.';
  }

  if (res.status === 401) {
    return 'The email or password is incorrect, or this account is not allowed to sign in here.';
  }

  if (res.status === 403) {
    return 'The authentication server blocked this request. Please check CSRF/CORS trusted origins for this domain.';
  }

  return fallback;
};

// Configuration sanity checks for social sign-in providers.
// Returns a human-readable problem, or null when the config looks valid.
export const getSocialAuthConfigIssue = (provider, config = {}) => {
  if (provider === 'facebook') {
    const appId = String(config.facebookAppId || '').trim();

    if (!appId) {
      return 'Facebook sign-in is not configured (missing App ID).';
    }

    if (!/^\d+$/.test(appId)) {
      return 'Facebook sign-in is misconfigured: the App ID must be numeric (e.g. 123456789012345). Please set the real Facebook App ID in REACT_APP_FACEBOOK_CLIENT_ID.';
    }
  }

  if (provider === 'google') {
    const clientId = String(config.googleClientId || '').trim();

    if (!clientId) {
      return 'Google sign-in is not configured (missing Client ID).';
    }

    if (!clientId.endsWith('.apps.googleusercontent.com')) {
      return 'Google sign-in is misconfigured: REACT_APP_GOOGLE_CLIENT_ID must be a Web client ID ending in .apps.googleusercontent.com.';
    }
  }

  return null;
};

// Friendly messages for errors raised by the social login popup/SDK.
export const getSocialLoginErrorMessage = (
  error,
  fallback = 'Social sign-in was not completed. Please try again or use your email and password.'
) => {
  const raw =
    error?.data ??
    error?.error ??
    error?.error_description ??
    error?.message ??
    error;

  const text = typeof raw === 'string' ? raw : JSON.stringify(raw || '');
  const lower = text.toLowerCase();

  if (!text || text === '{}' || text === 'null' || text === 'undefined') {
    return 'The sign-in popup was closed before finishing. Please try again and allow popups for this site.';
  }

  if (lower.includes('popup') && (lower.includes('block') || lower.includes('closed'))) {
    return 'The sign-in popup was blocked or closed. Please allow popups for this site and try again.';
  }

  if (lower.includes('origin') && lower.includes('allow')) {
    return 'Google rejected this website origin. Add this exact URL to "Authorized JavaScript origins" in your Google Cloud OAuth client settings.';
  }

  if (lower.includes('invalid app id') || lower.includes('app not active')) {
    return 'Facebook rejected the App ID. Set the real numeric Facebook App ID in REACT_APP_FACEBOOK_CLIENT_ID and activate the app.';
  }

  if (lower.includes("fb isn't loaded") || lower.includes('sdk isn') || lower.includes('not loaded')) {
    return 'The social SDK failed to load. Check your connection, disable ad-blockers for this page, and try again.';
  }

  if (lower.includes('idpiframe') || lower.includes('gapi') || lower.includes('gis')) {
    return 'Google sign-in failed to initialize. Verify the Google Client ID and that this domain is listed in "Authorized JavaScript origins".';
  }

  if (lower.includes('access_denied') || lower.includes('denied') || lower.includes('cancelled') || lower.includes('canceled')) {
    return 'Sign-in was cancelled. Please try again if this was not intentional.';
  }

  if (lower.includes('convert') || lower.includes('invalid_grant') || lower.includes('invalid token')) {
    return 'The sign-in token was rejected by the server. Make sure the backend has this Google/Facebook app credentials configured.';
  }

  if (error?.status >= 500 || lower.includes('server')) {
    return 'The authentication server is temporarily unavailable. Please try again in a moment.';
  }

  if (typeof raw === 'string' && raw.length < 300) {
    return raw;
  }

  return fallback;
};

export default getAuthErrorMessage;

