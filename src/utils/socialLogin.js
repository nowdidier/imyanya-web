const getSocialLoginRedirectUri = () => {
  if (typeof window === "undefined") {
    return "/";
  }

  return `${window.location.origin}${window.location.pathname}`;
};

const getSocialLoginToken = (result) => {
  return (
    result?.data?.access_token ??
    result?.data?.accessToken ??
    result?.data?.credential ??
    result?.data?.id_token ??
    result?.data?.idToken ??
    null
  );
};

export { getSocialLoginRedirectUri, getSocialLoginToken };
