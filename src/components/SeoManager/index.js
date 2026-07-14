import React from "react";
import { useLocation } from "react-router-dom";

const MAIN_ORIGIN = "https://imyanya.rw";
const EMPLOYER_ORIGIN = "https://employers.imyanya.rw";
const SHARE_IMAGE = `${MAIN_ORIGIN}/logo512.png`;

const MAIN_DEFAULT_SEO = {
  title: "Jobs in Rwanda | Kigali Vacancies, Job Categories & Employers | Imyanya",
  description:
    "Discover jobs in Rwanda by career, city, and job type. Find Kigali vacancies, internships, NGO jobs, remote roles, and employers hiring now on Imyanya.",
  keywords:
    "jobs in Rwanda, Kigali jobs, job categories Rwanda, job vacancies Rwanda, career opportunities Rwanda, internships Rwanda, NGO jobs Rwanda, remote jobs Rwanda, recruitment Rwanda",
};

const EMPLOYER_DEFAULT_SEO = {
  title: "Post Jobs in Rwanda | Hire by Category, City & Role | Imyanya",
  description:
    "Employers in Rwanda can post jobs, manage applications, search candidate profiles, and recruit qualified talent across Kigali and the rest of Rwanda with Imyanya.",
  keywords:
    "post jobs in Rwanda, recruitment Rwanda, hire in Rwanda, employers Rwanda, candidate search Rwanda, Kigali recruitment, talent hiring Rwanda",
};

const AUTH_PATH_PREFIXES = [
  "/dang-nhap",
  "/dang-ky",
  "/quen-mat-khau",
  "/cap-nhat-mat-khau",
  "/email-verification-required",
];

const PRIVATE_PATH_PREFIXES = [
  "/bang-dieu-khien",
  "/ho-so",
  "/ho-so-tung-buoc",
  "/ho-so-dinh-kem",
  "/viec-lam-cua-toi",
  "/cong-ty-cua-toi",
  "/thong-bao",
  "/tai-khoan",
  "/ket-noi-voi-nha-tuyen-dung",
];

const SEO_BY_PATH = {
  "/": MAIN_DEFAULT_SEO,
  "/viec-lam": {
    title: "Jobs in Rwanda | Kigali Jobs and Vacancies | Imyanya",
    description:
      "Search current jobs in Rwanda by category, including Kigali jobs, NGO vacancies, internships, remote jobs, and full-time opportunities.",
    canonicalPath: "/jobs-in-rwanda",
  },
  "/jobs": {
    title: "Jobs in Rwanda | Kigali Jobs and Vacancies | Imyanya",
    description:
      "Search current jobs in Rwanda by category, including Kigali jobs, NGO vacancies, internships, remote jobs, and full-time opportunities.",
    canonicalPath: "/jobs-in-rwanda",
  },
  "/jobs-in-rwanda": {
    title: "Jobs in Rwanda | Kigali Jobs and Vacancies | Imyanya",
    description:
      "Search current jobs in Rwanda by category, including Kigali jobs, NGO vacancies, internships, remote jobs, and full-time opportunities.",
  },
  "/job-vacancies-rwanda": {
    title: "Job Vacancies in Rwanda | Imyanya",
    description:
      "Browse job vacancies in Rwanda from trusted employers and apply to opportunities that match your skills and career goals.",
    canonicalPath: "/jobs-in-rwanda",
  },
  "/kigali-jobs": {
    title: "Kigali Jobs and Rwanda Vacancies | Imyanya",
    description:
      "Find Kigali jobs and job vacancies across Rwanda from companies, NGOs, and organizations hiring now.",
    canonicalPath: "/jobs-in-rwanda",
  },
  "/cong-ty": {
    title: "Companies Hiring in Rwanda | Imyanya",
    description:
      "Discover companies hiring in Rwanda and explore employer profiles, open vacancies, and recruitment opportunities.",
    canonicalPath: "/companies",
  },
  "/companies": {
    title: "Companies Hiring in Rwanda | Imyanya",
    description:
      "Discover companies hiring in Rwanda and explore employer profiles, open vacancies, and recruitment opportunities.",
  },
  "/employers": {
    title: "Employers and Companies in Rwanda | Imyanya",
    description:
      "Find employers in Rwanda, view company profiles, and explore active job openings on Imyanya.",
    canonicalPath: "/companies",
  },
  "/viec-lam-theo-nganh-nghe": {
    title: "Jobs by Career in Rwanda | Imyanya",
    description:
      "Browse Rwanda jobs by career field including technology, finance, operations, sales, education, and more.",
    canonicalPath: "/jobs-by-career",
  },
  "/jobs-by-career": {
    title: "Jobs by Career in Rwanda | Imyanya",
    description:
      "Browse Rwanda jobs by career field including technology, finance, operations, sales, education, and more.",
  },
  "/viec-lam-theo-tinh-thanh": {
    title: "Jobs by Location in Rwanda | Imyanya",
    description:
      "Search jobs by location in Rwanda, including Kigali and opportunities across every province.",
    canonicalPath: "/jobs-by-location",
  },
  "/jobs-by-location": {
    title: "Jobs by Location in Rwanda | Imyanya",
    description:
      "Search jobs by location in Rwanda, including Kigali and opportunities across every province.",
  },
  "/viec-lam-theo-hinh-thuc-lam-viec": {
    title: "Full-time, Part-time and Remote Jobs in Rwanda | Imyanya",
    description:
      "Browse Rwanda jobs by work type, including full-time jobs, part-time roles, internships, and remote work.",
    canonicalPath: "/jobs-by-type",
  },
  "/jobs-by-type": {
    title: "Full-time, Part-time and Remote Jobs in Rwanda | Imyanya",
    description:
      "Browse Rwanda jobs by work type, including full-time jobs, part-time roles, internships, and remote work.",
  },
  "/rwanda-career-guide": {
    title: "Rwanda Career Guide | CV, Job Search and Employer Advice | Imyanya",
    description:
      "Read practical Rwanda job-search guidance for CVs, applications, employer evaluation, location choices, internships, remote work, and career categories.",
  },
  "/career-guide": {
    title: "Rwanda Career Guide | CV, Job Search and Employer Advice | Imyanya",
    description:
      "Read practical Rwanda job-search guidance for CVs, applications, employer evaluation, location choices, internships, remote work, and career categories.",
    canonicalPath: "/rwanda-career-guide",
  },
  "/ve-chung-toi": {
    title: "About Imyanya | Rwanda Jobs and Recruitment",
    description:
      "Learn how Imyanya helps job seekers find opportunities and helps employers recruit qualified talent across Rwanda.",
    canonicalPath: "/about-us",
  },
  "/about": {
    title: "About Imyanya | Rwanda Jobs and Recruitment",
    description:
      "Learn how Imyanya helps job seekers find opportunities and helps employers recruit qualified talent across Rwanda.",
    canonicalPath: "/about-us",
  },
  "/about-us": {
    title: "About Imyanya | Rwanda Jobs and Recruitment",
    description:
      "Learn how Imyanya helps job seekers find opportunities and helps employers recruit qualified talent across Rwanda.",
  },
  "/contact": {
    title: "Contact Imyanya | Rwanda Job Platform Support",
    description:
      "Contact Imyanya for job seeker support, employer recruitment support, account help, privacy requests, and suspicious job post reports.",
  },
  "/faq": {
    title: "FAQ | Imyanya Rwanda Jobs Help",
    description:
      "Find answers about Rwanda job search, candidate profiles, employer job posts, suspicious listings, applications, and job-search guidance on Imyanya.",
  },
  "/quy-dinh-bao-mat": {
    title: "Privacy Policy | Imyanya",
    description:
      "Read the Imyanya privacy policy for information about account data, job seeker profiles, employer recruitment data, and authentication.",
    canonicalPath: "/privacy-policy",
  },
  "/privacy-policy": {
    title: "Privacy Policy | Imyanya",
    description:
      "Read the Imyanya privacy policy for information about account data, recruitment data, advertising cookies, third-party ad serving, and authentication.",
  },
  "/thoa-thuan-su-dung": {
    title: "Terms of Use | Imyanya",
    description:
      "Read the Imyanya terms of use for job seekers and employers using the recruitment platform.",
    canonicalPath: "/terms-of-use",
  },
  "/terms-of-use": {
    title: "Terms of Use | Imyanya",
    description:
      "Read the Imyanya terms of use for job seekers, employers, recruitment content, third-party links, and advertising on public pages.",
  },
};

const normalizePath = (pathname) => {
  if (!pathname || pathname === "/") {
    return "/";
  }

  return pathname.replace(/\/+$/, "");
};

const isEmployerHost = () =>
  window.location.hostname.toLowerCase().startsWith("employers.");

const getOrigin = () => (isEmployerHost() ? EMPLOYER_ORIGIN : MAIN_ORIGIN);

const getSeoForPath = (pathname) => {
  const path = normalizePath(pathname);
  const isAuthRoute = AUTH_PATH_PREFIXES.some((prefix) =>
    path.startsWith(prefix)
  );
  const isPrivateRoute = PRIVATE_PATH_PREFIXES.some((prefix) =>
    path.startsWith(prefix)
  );

  if (isEmployerHost()) {
    return {
      ...EMPLOYER_DEFAULT_SEO,
      noindex: true,
    };
  }

  if (SEO_BY_PATH[path]) {
    const seo = SEO_BY_PATH[path];

    return isAuthRoute || isPrivateRoute
      ? {
          ...seo,
          noindex: true,
        }
      : seo;
  }

  if (path.startsWith("/viec-lam/") || path.startsWith("/jobs/")) {
    return {
      title: "Job Details in Rwanda | Imyanya",
      description:
        "View job details, requirements, deadline, company information, and apply for this Rwanda job on Imyanya.",
    };
  }

  if (path.startsWith("/cong-ty/") || path.startsWith("/companies/")) {
    return {
      title: "Company Profile in Rwanda | Imyanya",
      description:
        "View company details, open vacancies, and hiring information from this Rwanda employer on Imyanya.",
    };
  }

  if (isAuthRoute) {
    return {
      title: "Login | Imyanya",
      description:
        "Sign in to Imyanya to manage your job applications, post vacancies, and update your account.",
      noindex: true,
    };
  }

  if (isPrivateRoute) {
    return {
      title: "Dashboard | Imyanya",
      description:
        "Access your Imyanya dashboard to manage jobs, applications, profiles, notifications, and account settings.",
      noindex: true,
    };
  }

  return MAIN_DEFAULT_SEO;
};

const upsertMeta = (selector, attributes) => {
  let element = document.head.querySelector(selector);

  if (!element) {
    element = document.createElement("meta");
    document.head.appendChild(element);
  }

  Object.entries(attributes).forEach(([key, value]) => {
    element.setAttribute(key, value);
  });
};

const upsertLink = (selector, attributes) => {
  let element = document.head.querySelector(selector);

  if (!element) {
    element = document.createElement("link");
    document.head.appendChild(element);
  }

  Object.entries(attributes).forEach(([key, value]) => {
    element.setAttribute(key, value);
  });
};

const upsertJsonLd = (id, data) => {
  let element = document.getElementById(id);

  if (!element) {
    element = document.createElement("script");
    element.id = id;
    element.type = "application/ld+json";
    document.head.appendChild(element);
  }

  element.textContent = JSON.stringify(data);
};

const SeoManager = () => {
  const location = useLocation();

  React.useEffect(() => {
    const seo = getSeoForPath(location.pathname);
    const origin = getOrigin();
    const canonicalPath = seo.canonicalPath || normalizePath(location.pathname);
    const canonicalUrl = `${origin}${canonicalPath === "/" ? "/" : canonicalPath}`;
    const robots = seo.noindex
      ? "noindex, follow"
      : "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1";

    document.documentElement.lang = "en-RW";
    document.title = seo.title;

    upsertMeta('meta[name="description"]', {
      name: "description",
      content: seo.description,
    });
    upsertMeta('meta[name="keywords"]', {
      name: "keywords",
      content: seo.keywords || MAIN_DEFAULT_SEO.keywords,
    });
    upsertMeta('meta[name="robots"]', { name: "robots", content: robots });
    upsertMeta('meta[name="googlebot"]', {
      name: "googlebot",
      content: robots,
    });
    upsertMeta('meta[name="geo.region"]', { name: "geo.region", content: "RW" });
    upsertMeta('meta[name="geo.placename"]', {
      name: "geo.placename",
      content: "Rwanda",
    });

    upsertLink('link[rel="canonical"]', {
      rel: "canonical",
      href: canonicalUrl,
    });
    upsertLink('link[rel="alternate"][hreflang="en-RW"]', {
      rel: "alternate",
      hreflang: "en-RW",
      href: canonicalUrl,
    });
    upsertLink('link[rel="alternate"][hreflang="rw-RW"]', {
      rel: "alternate",
      hreflang: "rw-RW",
      href: canonicalUrl,
    });
    upsertLink('link[rel="alternate"][hreflang="x-default"]', {
      rel: "alternate",
      hreflang: "x-default",
      href: canonicalUrl,
    });

    upsertMeta('meta[property="og:type"]', {
      property: "og:type",
      content: "website",
    });
    upsertMeta('meta[property="og:site_name"]', {
      property: "og:site_name",
      content: "Imyanya",
    });
    upsertMeta('meta[property="og:title"]', {
      property: "og:title",
      content: seo.title,
    });
    upsertMeta('meta[property="og:description"]', {
      property: "og:description",
      content: seo.description,
    });
    upsertMeta('meta[property="og:url"]', {
      property: "og:url",
      content: canonicalUrl,
    });
    upsertMeta('meta[property="og:image"]', {
      property: "og:image",
      content: SHARE_IMAGE,
    });
    upsertMeta('meta[name="twitter:card"]', {
      name: "twitter:card",
      content: "summary_large_image",
    });
    upsertMeta('meta[name="twitter:title"]', {
      name: "twitter:title",
      content: seo.title,
    });
    upsertMeta('meta[name="twitter:description"]', {
      name: "twitter:description",
      content: seo.description,
    });
    upsertMeta('meta[name="twitter:image"]', {
      name: "twitter:image",
      content: SHARE_IMAGE,
    });

    upsertJsonLd("imyanya-organization-schema", {
      "@context": "https://schema.org",
      "@type": "Organization",
      name: "Imyanya",
      url: MAIN_ORIGIN,
      logo: SHARE_IMAGE,
      sameAs: [
        "https://www.facebook.com/profile.php?id=61560204704738",
        "https://www.linkedin.com/company/imyanya/",
        "https://x.com/imyanya_rw",
        "https://www.instagram.com/imyanya.rw/",
      ],
    });

    upsertJsonLd("imyanya-website-schema", {
      "@context": "https://schema.org",
      "@type": "WebSite",
      name: "Imyanya",
      url: MAIN_ORIGIN,
      description: MAIN_DEFAULT_SEO.description,
      inLanguage: ["en-RW", "rw-RW"],
      areaServed: {
        "@type": "Country",
        name: "Rwanda",
      },
      potentialAction: {
        "@type": "SearchAction",
        target: `${MAIN_ORIGIN}/jobs-in-rwanda?kw={search_term_string}`,
        "query-input": "required name=search_term_string",
      },
    });
  }, [location.pathname]);

  return null;
};

export default SeoManager;
