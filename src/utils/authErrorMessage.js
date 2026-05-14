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

  if (res.status >= 500) {
    return 'The authentication server is temporarily unavailable. Please try again in a moment.';
  }

  return fallback;
};

export default getAuthErrorMessage;
