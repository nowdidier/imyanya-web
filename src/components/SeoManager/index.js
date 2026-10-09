import React from "react";
import { useSyncExternalStore } from "react";
import { useLocation } from "react-router-dom";
import {
  getContentNoindex,
  setContentNoindex,
  subscribeContentNoindex,
} from "./contentFlag";
import {
  getJobSeo,
  subscribeJobSeo,
} from "./jobSeoFlag";
import {
  getCompanySeo,
  subscribeCompanySeo,
} from "./companySeoFlag";
import careerArticles from "../../data/rwandaCareerArticles";
import { getToolBySlug } from "../../data/content/tools";

const MAIN_ORIGIN = "https://imyanya.rw";
const EMPLOYER_ORIGIN = "https://employers.imyanya.rw";
const SHARE_IMAGE = `${MAIN_ORIGIN}/logo512.png`;

const MAIN_DEFAULT_SEO = {
  title: "#1 Jobs in Rwanda | Kigali Vacancies, NGOs, Internships | Imyanya",
  description:
    "Imyanya (Imyanya y'akazi) — Rwanda's #1 job portal. Daily jobs in Rwanda by career, city & type: Kigali vacancies, NGO jobs, internships, remote & government roles. Free CV builder.",
  keywords:
    "jobs in Rwanda, #1 jobs Rwanda, Kigali jobs, imyanya, imyanya y'akazi, job vacancies Rwanda, NGO jobs Rwanda, internships Rwanda, remote jobs Rwanda, government jobs Rwanda, recruitment Rwanda",
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
    title: "#1 Jobs in Rwanda | Kigali Jobs and Vacancies | Imyanya",
    description:
      "Search Rwanda's #1 job board: current jobs in Rwanda by category — Kigali jobs, NGO vacancies, internships, remote jobs & full-time opportunities. Free apply.",
    canonicalPath: "/jobs-in-rwanda",
  },
  "/jobs": {
    title: "#1 Jobs in Rwanda | Kigali Jobs and Vacancies | Imyanya",
    description:
      "Search Rwanda's #1 job board: current jobs in Rwanda by category — Kigali jobs, NGO vacancies, internships, remote jobs & full-time opportunities. Free apply.",
    canonicalPath: "/jobs-in-rwanda",
  },
  "/jobs-in-rwanda": {
    title: "#1 Jobs in Rwanda | Kigali Jobs, NGO Vacancies & Internships | Imyanya",
    description:
      "Rwanda's #1 job portal — search current jobs in Rwanda: Kigali jobs, NGO vacancies, internships, remote & full-time roles. New vacancies daily. Apply free.",
  },
  "/job-vacancies-rwanda": {
    title: "Job Vacancies in Rwanda | #1 Portal Imyanya",
    description:
      "Browse verified job vacancies in Rwanda from trusted employers. Kigali & nationwide roles — apply free to opportunities matching your skills.",
    canonicalPath: "/jobs-in-rwanda",
  },
  "/kigali-jobs": {
    title: "Kigali Jobs & Rwanda Vacancies | #1 Portal Imyanya",
    description:
      "Find Kigali jobs and vacancies across Rwanda from companies, NGOs & government hiring now. Daily updates, free CV builder, 1-click apply.",
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
  "/rwanda-career-advice": {
    title: "Career Advice Rwanda | Articles on CVs, Interviews, Salary & More | Imyanya",
    description:
      "Original career advice articles for Rwandan job seekers, covering CV writing, interview preparation, salary negotiation, remote work, certifications, and more.",
  },
  "/career-advice": {
    title: "Career Advice Rwanda | Articles on CVs, Interviews, Salary & More | Imyanya",
    description:
      "Original career advice articles for Rwandan job seekers, covering CV writing, interview preparation, salary negotiation, remote work, certifications, and more.",
    canonicalPath: "/rwanda-career-advice",
  },
  "/career-tools": {
    title: "CV yo mu Rwanda — Free CV & Cover Letter Builders (Word & PDF) | Imyanya",
    description:
      "Build a professional CV or cover letter online and download it as Word (.docx) or PDF. Free career tools for Rwandan job seekers.",
  },
  "/career-tools/cv-builder": {
    title: "CV yo mu Rwanda — Free CV Builder (Word & PDF Download) | Imyanya",
    description:
      "Load your Imyanya profile and download a clean, recruiter-ready CV as Word or PDF. Free, no account needed to build.",
  },
  "/career-tools/cover-letter-builder": {
    title: "Free Cover Letter Builder — Download as Word (.docx) | Imyanya",
    description:
      "Write a tailored cover letter and download it as a Word file. Free, no account needed.",
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
  "/editorial-policy": {
    title: "Editorial Policy | Imyanya",
    description:
      "Learn how Imyanya creates, reviews, and maintains original career content for Rwandan job seekers.",
  },
  "/correction-policy": {
    title: "Correction Policy | Imyanya",
    description:
      "Learn how Imyanya handles errors, corrections, and updates in its editorial content and job listings.",
  },
  "/verification-policy": {
    title: "Content Verification Policy | Imyanya",
    description:
      "Learn how Imyanya approaches the accuracy and reliability of job listings and platform content.",
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
  "/places-for-sale": {
    title: "Places and Plots for Sale in Rwanda | Imyanya",
    description:
      "Watch Imyanya property videos for plots, houses, land, and places for sale in Rwanda. Contact Imyanya for buyer introductions and commission details.",
  },
  "/youtube-videos": {
    title: "Places and Plots for Sale Videos | Imyanya",
    description:
      "Watch Imyanya YouTube property videos for places and plots for sale in Rwanda, with social sharing and direct contact options.",
    canonicalPath: "/places-for-sale",
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
    const jobSeoData = getJobSeo();

    if (jobSeoData) {
      return {
        title: `${jobSeoData.jobName} at ${jobSeoData.companyName} | Imyanya`,
        description: jobSeoData.description
          ? jobSeoData.description.slice(0, 160)
          : `Apply for ${jobSeoData.jobName} at ${jobSeoData.companyName} in ${jobSeoData.location || "Rwanda"}. ${jobSeoData.salaryLabel || ""}`,
        canonicalPath: path,
        noindex: false,
        jobSeo: jobSeoData,
      };
    }

    return {
      title: "Job Details in Rwanda | Imyanya",
      description:
        "View job details, requirements, deadline, company information, and apply for this Rwanda job on Imyanya.",
    };
  }

  if (path.startsWith("/rwanda-career-advice/") || path.startsWith("/career-advice/")) {
    const slug = path.split("/").pop();
    const article = careerArticles.find((a) => a.slug === slug);
    if (article) {
      return {
        title: `${article.title} | Imyanya`,
        description: article.excerpt,
      };
    }
    return {
      title: "Career Advice Rwanda | Imyanya",
      description:
        "Original career advice articles for Rwandan job seekers.",
    };
  }

  if (path.startsWith("/career-tools/")) {
    const slug = path.split("/").pop();
    const tool = getToolBySlug(slug);
    if (tool) {
      return {
        title: tool.metaTitle || `${tool.name} | Imyanya`,
        description: tool.metaDescription || tool.description,
      };
    }
    return {
      title: "Career Tools Rwanda | Imyanya",
      description:
        "Free career tools for Rwandan job seekers: calculators, checklists, planners and CV builders.",
    };
  }

  if (path.startsWith("/cong-ty/") || path.startsWith("/companies/")) {
    // List pages keep the generic SEO defined in SEO_BY_PATH above.
    const segments = path.split("/").filter(Boolean);
    if (segments.length < 2 || !segments[1]) {
      return MAIN_DEFAULT_SEO;
    }

    const companySeoData = getCompanySeo();

    if (companySeoData) {
      return {
        title: `${companySeoData.companyName} Jobs & Company Profile in Rwanda | Imyanya`,
        description: companySeoData.description
          ? companySeoData.description.slice(0, 160)
          : `Explore ${companySeoData.companyName} jobs, vacancies, company profile and hiring information in Rwanda on Imyanya.`,
        canonicalPath: `/companies/${companySeoData.slug}`,
        noindex: false,
        companySeo: companySeoData,
      };
    }

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
  const contentNoindex = useSyncExternalStore(
    subscribeContentNoindex,
    getContentNoindex
  );
  const jobSeoData = useSyncExternalStore(
    subscribeJobSeo,
    getJobSeo
  );
  const companySeoData = useSyncExternalStore(
    subscribeCompanySeo,
    getCompanySeo
  );

  // Reset the content flag on navigation so a new page starts as indexable.
  // Data-fetching components re-assert noindex if their results are empty.
  React.useEffect(() => {
    setContentNoindex(null);
  }, [location.pathname]);

  React.useEffect(() => {
    const seo = getSeoForPath(location.pathname);
    const origin = getOrigin();
    const canonicalPath = seo.canonicalPath || normalizePath(location.pathname);
    const canonicalUrl = `${origin}${canonicalPath === "/" ? "/" : canonicalPath}`;
    const robots =
      seo.noindex || contentNoindex
        ? "noindex, follow"
        : "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1";

    const isJobDetail =
      location.pathname.startsWith("/viec-lam/") ||
      location.pathname.startsWith("/jobs/");

    const isCompanyDetail =
      (location.pathname.startsWith("/cong-ty/") ||
        location.pathname.startsWith("/companies/")) &&
      location.pathname.split("/").filter(Boolean).length >= 2;

    const ogImage =
      isJobDetail && jobSeoData?.imageUrl
        ? jobSeoData.imageUrl
        : isCompanyDetail && companySeoData?.imageUrl
          ? companySeoData.imageUrl
          : SHARE_IMAGE;

    const ogTitle =
      isJobDetail && jobSeoData?.jobName
        ? `${jobSeoData.jobName} at ${jobSeoData.companyName} | Imyanya`
        : seo.title;

    const ogDescription =
      isJobDetail && jobSeoData?.description
        ? jobSeoData.description.slice(0, 200)
        : seo.description;

    document.documentElement.lang = "en-RW";
    document.title = ogTitle;

    upsertMeta('meta[name="description"]', {
      name: "description",
      content: ogDescription,
    });
    upsertMeta('meta[name="keywords"]', {
      name: "keywords",
      content:
        isJobDetail && jobSeoData?.jobName
          ? `${jobSeoData.jobName}, ${jobSeoData.companyName}, jobs in Rwanda, ${jobSeoData.location || "Rwanda"}`
          : isCompanyDetail && companySeoData?.companyName
            ? `${companySeoData.companyName}, ${companySeoData.companyName} jobs, ${companySeoData.companyName} vacancies Rwanda, ${companySeoData.location || "Rwanda"} jobs, hiring in Rwanda`
            : seo.keywords || MAIN_DEFAULT_SEO.keywords,
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
      content: isJobDetail ? "job posting" : "website",
    });
    upsertMeta('meta[property="og:site_name"]', {
      property: "og:site_name",
      content: "Imyanya",
    });
    upsertMeta('meta[property="og:title"]', {
      property: "og:title",
      content: ogTitle,
    });
    upsertMeta('meta[property="og:description"]', {
      property: "og:description",
      content: ogDescription,
    });
    upsertMeta('meta[property="og:url"]', {
      property: "og:url",
      content: canonicalUrl,
    });
    upsertMeta('meta[property="og:image"]', {
      property: "og:image",
      content: ogImage,
    });
    upsertMeta('meta[property="og:locale"]', {
      property: "og:locale",
      content: "en_RW",
    });
    upsertMeta('meta[name="twitter:card"]', {
      name: "twitter:card",
      content: "summary_large_image",
    });
    upsertMeta('meta[name="twitter:title"]', {
      name: "twitter:title",
      content: ogTitle,
    });
    upsertMeta('meta[name="twitter:description"]', {
      name: "twitter:description",
      content: ogDescription,
    });
    upsertMeta('meta[name="twitter:image"]', {
      name: "twitter:image",
      content: ogImage,
    });

    upsertJsonLd("imyanya-organization-schema", {
      "@context": "https://schema.org",
      "@type": "Organization",
      name: "Imyanya",
      alternateName: "Imyanya y'akazi",
      url: MAIN_ORIGIN,
      logo: SHARE_IMAGE,
      description: MAIN_DEFAULT_SEO.description,
      areaServed: { "@type": "Country", name: "Rwanda" },
      sameAs: [
        "https://www.facebook.com/profile.php?id=61560204704738",
        "https://www.linkedin.com/company/imyanya/",
        "https://x.com/imyanya_rw",
        "https://www.instagram.com/imyanya.rw/",
        "https://www.youtube.com/@imyanyarw",
      ],
    });

    upsertJsonLd("imyanya-website-schema", {
      "@context": "https://schema.org",
      "@type": "WebSite",
      name: "Imyanya — #1 Jobs in Rwanda",
      alternateName: "Imyanya y'akazi",
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

    // Homepage FAQ rich-result: targets "best job portal in Rwanda" featured snippets.
    // Canonical intentionally ignores ?ref= / utm_* so referral shares never
    // create duplicate-content URLs for Google.
    if (normalizePath(location.pathname) === "/") {
      upsertJsonLd("imyanya-home-faq-schema", {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: [
          {
            "@type": "Question",
            name: "What is the #1 job portal in Rwanda?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Imyanya (Imyanya y'akazi) is Rwanda's #1 job portal — daily Kigali vacancies, NGO jobs, internships, remote and government roles with a free CV builder.",
            },
          },
          {
            "@type": "Question",
            name: "Is Imyanya free for job seekers?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Yes — creating an account, building a CV, getting job alerts and applying on Imyanya is 100% free.",
            },
          },
          {
            "@type": "Question",
            name: "How do I unlock features by sharing?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Share your Imyanya referral link: 1 share unlocks job alerts, 3 unlock salary insights, 5 unlock CV Spotlight. No money needed.",
            },
          },
        ],
      });
    } else {
      document.getElementById("imyanya-home-faq-schema")?.remove();
    }
  }, [location.pathname, contentNoindex, jobSeoData, companySeoData]);

  return null;
};

export default SeoManager;
