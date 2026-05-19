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

  if (typeof res.data?.detail === 'string') {
    return res.data.detail;
  }

  if (typeof res.data === 'string') {
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

  if (res.status >= 500) {
    return 'The authentication server is temporarily unavailable. Please try again in a moment.';
  }

  return fallback;
};

export default getAuthErrorMessage;
