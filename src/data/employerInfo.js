import { APP_NAME, HOST_NAME, ROUTES } from "../configs/constants";
import careerArticles from "./rwandaCareerArticles";

const EMPLOYER_ORIGIN = `https://${HOST_NAME.EMPLOYER_MYJOB}`;
const ARTICLES_ORIGIN = `https://${HOST_NAME.MYJOB}/${ROUTES.JOB_SEEKER.CAREER_ARTICLE.split("/:")[0]}`;

// Real articles that help employers understand how candidates in Rwanda
// are assessed, paid, and interviewed. Opened on the job-seeker site.
const BLOG_CATEGORIES = [
  "Interview Preparation",
  "Salary & Benefits",
  "CV & Cover Letters",
  "Career Advice",
];

const blogPosts = careerArticles
  .filter((article) => BLOG_CATEGORIES.includes(article.category))
  .slice(0, 9)
  .map((article) => ({
    title: article.title,
    excerpt: article.excerpt,
    category: article.category,
    readingTime: article.readingTime,
    href: `${ARTICLES_ORIGIN}/${article.slug}`,
  }));

const employerInfoPages = {
  [ROUTES.EMPLOYER.INTRODUCE]: {
    tabTitle: `About Imyanya for Employers | ${APP_NAME}`,
    hero: {
      title: "About Imyanya for Employers",
      subtitle:
        "Imyanya is a Rwandan hiring platform built for the way recruitment actually works in Rwanda — from Kigali startups to district offices and regional NGOs.",
    },
    sections: [
      {
        heading: "Who we are",
        paragraphs: [
          "Imyanya connects employers with job seekers across Rwanda. Our job-seeker platform serves candidates in Kigali, the Northern, Southern, Eastern and Western provinces, and across every career field — IT, finance, NGO and development work, hospitality, government and more.",
          "Everything we build is designed around one goal: help a hiring manager publish a vacancy, reach the right candidates, and start reviewing applications quickly.",
        ],
      },
      {
        heading: "Why employers choose Imyanya",
        bullets: [
          "A Rwandan-focused audience — candidates who live, study and work here.",
          "Vacancies published in minutes, with applications delivered to one dashboard.",
          "Filters for career, city, experience level and education so you see relevant profiles first.",
          "Direct chat with candidates once you shortlist them.",
          "Career content and employer branding pages that keep your company visible between hires.",
        ],
      },
      {
        heading: "How it works",
        bullets: [
          "Create your employer account and add your company profile.",
          "Post your job with the salary range, location and requirements.",
          "Review incoming applications, save profiles and shortlist candidates.",
          "Chat with candidates and move the conversation to an interview.",
        ],
      },
    ],
  },

  [ROUTES.EMPLOYER.SERVICE]: {
    tabTitle: "Recruitment Services for Employers in Rwanda | Imyanya",
    hero: {
      title: "Recruitment Services",
      subtitle:
        "Post a vacancy yourself, or let us run the whole search for you. Both options draw from the same pool of active Rwandan candidates.",
    },
    sections: [
      {
        heading: "Self-service job posting",
        paragraphs: [
          "Publish your vacancy, manage applications, and shortlist candidates from your dashboard. Best for teams that already know exactly who they need and want to move fast.",
        ],
        bullets: [
          "Unlimited draft vacancies and full editing before publishing.",
          "Application tracking with status updates for every candidate.",
          "Saved candidate profiles you can revisit for future roles.",
        ],
      },
      {
        heading: "Managed sourcing",
        paragraphs: [
          "We help you define the role, write a clear job description, and surface matching profiles from our database — useful when hiring for hard-to-fill or senior positions.",
        ],
        bullets: [
          "Role briefing and job description review.",
          "Shortlist of matched candidates delivered to your inbox.",
          "Support through screening, interviews and offer stage.",
        ],
      },
      {
        heading: "Employer branding",
        paragraphs: [
          "Your company page showcases your sector, size, locations and open roles. Candidates who discover your brand can follow it and see every vacancy you publish.",
        ],
        bullets: [
          "Company profile with logo, cover image and description.",
          "All your active vacancies grouped on one page.",
          "Updates to your followers when you publish a new role.",
        ],
      },
      {
        heading: "Hiring support",
        paragraphs: [
          "Questions about pricing, account setup or a vacancy that is not performing? Our support team replies in English and Kinyarwanda on working days.",
        ],
      },
    ],
  },

  [ROUTES.EMPLOYER.PRICING]: {
    tabTitle: "Pricing for Employers | Imyanya",
    hero: {
      title: "Simple, transparent pricing",
      subtitle:
        "Start free, upgrade when you need more reach. No hidden fees and no per-application charges.",
    },
    sections: [
      {
        heading: "How billing works",
        paragraphs: [
          "Every plan is billed for a fixed period and includes application tracking, candidate chat and your company page. You can change plan at any time from your account settings.",
        ],
      },
    ],
    plans: [
      {
        name: "Starter",
        price: "Free",
        period: "",
        highlight: false,
        description: "For small teams making their first hire on Imyanya.",
        features: [
          "1 active job posting",
          "Company profile page",
          "Application tracking",
          "Candidate chat",
        ],
        cta: "Post a job",
        href: `${EMPLOYER_ORIGIN}/${ROUTES.EMPLOYER.JOB_POST}`,
      },
      {
        name: "Growth",
        price: "Paid",
        period: "per month",
        highlight: true,
        description: "For employers hiring regularly across several roles.",
        features: [
          "Up to 5 active job postings",
          "Priority placement in search results",
          "Saved candidate profiles",
          "Hiring dashboard and statistics",
        ],
        cta: "Contact sales",
        href: `${EMPLOYER_ORIGIN}/${ROUTES.EMPLOYER.SUPPORT}`,
      },
      {
        name: "Enterprise",
        price: "Custom",
        period: "",
        highlight: false,
        description: "For large organisations, NGOs and public institutions.",
        features: [
          "Unlimited job postings",
          "Managed sourcing and shortlists",
          "Multiple hiring team members",
          "Dedicated account support",
        ],
        cta: "Request a quote",
        href: `${EMPLOYER_ORIGIN}/${ROUTES.EMPLOYER.SUPPORT}`,
      },
    ],
  },

  [ROUTES.EMPLOYER.SUPPORT]: {
    tabTitle: "Employer Support | Imyanya",
    hero: {
      title: "Support for employers",
      subtitle:
        "Answers to the questions we hear most often, plus how to reach the Imyanya team.",
    },
    sections: [
      {
        heading: "Contact us",
        bullets: [
          "WhatsApp: use the green contact button on any page for a fast reply.",
          "Email: myjob.contact00000@gmail.com for account, billing and vacancy questions.",
          "Support hours: Monday to Friday, 08:00 to 18:00 CAT.",
        ],
      },
    ],
    faqs: [
      {
        q: "How do I post a job?",
        a: "Create an employer account, complete your company profile, then open Job Postings and choose New vacancy. Fill in the title, location, salary range and requirements, and publish. Your vacancy appears in search immediately.",
      },
      {
        q: "How long does a vacancy stay active?",
        a: "Vacancies remain active until the deadline you set, or until you close them manually. You can extend or re-publish a closed vacancy at any time.",
      },
      {
        q: "Where do I see applications?",
        a: "Every application lands in your dashboard under Applied Profiles. You can filter by status, save promising candidates, and update each application as it progresses.",
      },
      {
        q: "Can I message candidates directly?",
        a: "Yes. Open a candidate profile or an application and start a chat. Both sides see the conversation in the chat area of Imyanya.",
      },
      {
        q: "Can I edit a published vacancy?",
        a: "Yes. Open the job posting, choose Edit, make your changes and save. Candidates who already saw the listing see the updated version.",
      },
      {
        q: "What if I need help with a vacancy that gets few applications?",
        a: "Contact support with the vacancy link. We will review the salary range, job title and requirements — these three factors account for most low-response vacancies.",
      },
    ],
  },

  [ROUTES.EMPLOYER.BLOG]: {
    tabTitle: "Recruitment Blog for Employers | Imyanya",
    hero: {
      title: "Recruitment Blog",
      subtitle:
        "Practical reading for hiring managers — how candidates in Rwanda write CVs, prepare for interviews and negotiate salary, so you can run better conversations.",
    },
    posts: blogPosts,
  },
};

export default employerInfoPages;
