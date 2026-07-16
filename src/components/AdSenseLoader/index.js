import React from "react";
import { useLocation } from "react-router-dom";

const ADSENSE_CLIENT_ID = "ca-pub-1257502818810103";
const ADSENSE_SCRIPT_ID = "imyanya-adsense-script";

const AD_ELIGIBLE_PATHS = new Set([
  "/",
  "/viec-lam",
  "/jobs-in-rwanda",
  "/jobs",
  "/job-vacancies-rwanda",
  "/kigali-jobs",
  "/cong-ty",
  "/companies",
  "/employers",
  "/viec-lam-theo-nganh-nghe",
  "/jobs-by-career",
  "/viec-lam-theo-tinh-thanh",
  "/jobs-by-location",
  "/viec-lam-theo-hinh-thuc-lam-viec",
  "/jobs-by-type",
  "/rwanda-career-guide",
  "/career-guide",
  "/rwanda-career-advice",
  "/career-advice",
  "/ve-chung-toi",
  "/about",
  "/about-us",
  "/contact",
  "/faq",
]);

const AD_ELIGIBLE_PREFIXES = [
  "/viec-lam/",
  "/cong-ty/",
  "/rwanda-career-advice/",
  "/career-advice/",
];

const AD_BLOCKED_PREFIXES = [
  "/dang-nhap",
  "/dang-ky",
  "/quen-mat-khau",
  "/cap-nhat-mat-khau",
  "/email-verification-required",
  "/bang-dieu-khien",
  "/ho-so",
  "/ho-so-tung-buoc",
  "/ho-so-dinh-kem",
  "/viec-lam-cua-toi",
  "/cong-ty-cua-toi",
  "/thong-bao",
  "/tai-khoan",
  "/ket-noi-voi-nha-tuyen-dung",
  "/quy-dinh-bao-mat",
  "/privacy-policy",
  "/thoa-thuan-su-dung",
  "/terms-of-use",
  "/editorial-policy",
  "/correction-policy",
  "/verification-policy",
  "/forbidden",
];

const normalizePath = (pathname) => {
  if (!pathname || pathname === "/") return "/";
  return pathname.replace(/\/+$/, "");
};

const isEmployerHost = () =>
  window.location.hostname.toLowerCase().startsWith("employers.");

const canLoadAds = (pathname) => {
  const path = normalizePath(pathname);

  if (isEmployerHost()) return false;
  if (AD_BLOCKED_PREFIXES.some((prefix) => path.startsWith(prefix))) return false;
  if (AD_ELIGIBLE_PATHS.has(path)) return true;

  return AD_ELIGIBLE_PREFIXES.some((prefix) => path.startsWith(prefix));
};

const AdSenseLoader = () => {
  const location = useLocation();

  React.useEffect(() => {
    if (!canLoadAds(location.pathname)) return;
    if (document.getElementById(ADSENSE_SCRIPT_ID)) return;

    const script = document.createElement("script");
    script.id = ADSENSE_SCRIPT_ID;
    script.async = true;
    script.crossOrigin = "anonymous";
    script.src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_CLIENT_ID}`;
    document.head.appendChild(script);
  }, [location.pathname]);

  return null;
};

export default AdSenseLoader;
