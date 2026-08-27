const getSocialLoginRedirectUri = () => {
  if (typeof window === "undefined") {
    return "/";
  }

  // Keep a single stable URL per host so providers only need one
  // whitelisted redirect/origin entry (no per-route paths).
  return `${window.location.origin}/`;
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
