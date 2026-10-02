import { lazy } from "react";
import { Outlet } from "react-router-dom";
import { HOST_NAME, ROUTES } from "./constants";
import {
  HomeLayout,
  DefaultLayout,
  JobSeekerLayout,
  EmployerLayout,
  ChatLayout,
} from "../layouts";

// Pages are code-split per route so the initial bundle stays small.
const EmailVerificationRequiredPage = lazy(() =>
  import("../pages/authPages/EmailVerificationRequiredPage")
);
const EmployerLogin = lazy(() =>
  import("../pages/authPages/EmployerLogin")
);
const EmployerSignUp = lazy(() =>
  import("../pages/authPages/EmployerSignUp")
);
const ForgotPasswordPage = lazy(() =>
  import("../pages/authPages/ForgotPasswordPage")
);
const JobSeekerLogin = lazy(() =>
  import("../pages/authPages/JobSeekerLogin")
);
const JobSeekerSignUp = lazy(() =>
  import("../pages/authPages/JobSeekerSignUp")
);
const ResetPasswordPage = lazy(() =>
  import("../pages/authPages/ResetPasswordPage")
);
const ChatPage = lazy(() => import("../pages/chatPages/ChatPage"));

const AboutUsPage = lazy(() => import("../pages/defaultPages/AboutUsPage"));
const CareerAdvicePage = lazy(() =>
  import("../pages/defaultPages/CareerAdvicePage")
);
const CareerArticlePage = lazy(() =>
  import("../pages/defaultPages/CareerArticlePage")
);
const CareerGuidePage = lazy(() =>
  import("../pages/defaultPages/CareerGuidePage")
);
const CompanyDetailPage = lazy(() =>
  import("../pages/defaultPages/CompanyDetailPage")
);
const CompanyPage = lazy(() => import("../pages/defaultPages/CompanyPage"));
const ContactPage = lazy(() => import("../pages/defaultPages/ContactPage"));
const CorrectionPolicyPage = lazy(() =>
  import("../pages/defaultPages/CorrectionPolicyPage")
);
const EditorialPolicyPage = lazy(() =>
  import("../pages/defaultPages/EditorialPolicyPage")
);
const FaqPage = lazy(() => import("../pages/defaultPages/FaqPage"));
const HomePage = lazy(() => import("../pages/defaultPages/HomePage"));
const JobDetailPage = lazy(() =>
  import("../pages/defaultPages/JobDetailPage")
);
const JobPage = lazy(() => import("../pages/defaultPages/JobPage"));
const JobsByCareerPage = lazy(() =>
  import("../pages/defaultPages/JobsByCareerPage")
);
const JobsByCityPage = lazy(() =>
  import("../pages/defaultPages/JobsByCityPage")
);
const JobsByJobTypePage = lazy(() =>
  import("../pages/defaultPages/JobsByJobTypePage")
);
const NotificationPage = lazy(() =>
  import("../pages/defaultPages/NotificationPage")
);
const PrivacyPolicyPage = lazy(() =>
  import("../pages/defaultPages/PrivacyPolicyPage")
);
const TermsOfUsePage = lazy(() =>
  import("../pages/defaultPages/TermsOfUsePage")
);
const VerificationPolicyPage = lazy(() =>
  import("../pages/defaultPages/VerificationPolicyPage")
);
const YouTubeVideosPage = lazy(() =>
  import("../pages/defaultPages/YouTubeVideosPage")
);

const AccountPage = lazy(() =>
  import("../pages/jobSeekerPages/AccountPage")
);
const AttachedProfilePage = lazy(() =>
  import("../pages/jobSeekerPages/AttachedProfilePage")
);
const DashboardPage = lazy(() =>
  import("../pages/jobSeekerPages/DashboardPage")
);
const MyCompanyPage = lazy(() =>
  import("../pages/jobSeekerPages/MyCompanyPage")
);
const MyJobPage = lazy(() => import("../pages/jobSeekerPages/MyJobPage"));
const OnlineProfilePage = lazy(() =>
  import("../pages/jobSeekerPages/OnlineProfilePage")
);
const ProfilePage = lazy(() =>
  import("../pages/jobSeekerPages/ProfilePage")
);

const EmployerAccountPage = lazy(() =>
  import("../pages/employerPages/AccountPage")
);
const EmployerCompanyPage = lazy(() =>
  import("../pages/employerPages/CompanyPage")
);
const EmployerDashboardPage = lazy(() =>
  import("../pages/employerPages/DashboardPage")
);
const EmployerJobPostPage = lazy(() =>
  import("../pages/employerPages/JobPostPage")
);
const EmployerProfileAppliedPage = lazy(() =>
  import("../pages/employerPages/ProfileAppliedPage")
);
const EmployerProfileDetailPage = lazy(() =>
  import("../pages/employerPages/ProfileDetailPage")
);
const EmployerProfilePage = lazy(() =>
  import("../pages/employerPages/ProfilePage")
);
const EmployerSavedProfilePage = lazy(() =>
  import("../pages/employerPages/SavedProfilePage")
);
const EmployerSettingPage = lazy(() =>
  import("../pages/employerPages/SettingPage")
);
const EmployerInfoPage = lazy(() =>
  import("../pages/employerPages/InfoPage")
);

const ForbiddenPage = lazy(() =>
  import("../pages/errorsPage/ForbiddenPage")
);
const NotFoundPage = lazy(() => import("../pages/errorsPage/NotFoundPage"));

const routesConfig = {
  [HOST_NAME.MYJOB]: [
    {
      path: ROUTES.JOB_SEEKER.HOME,
      layouts: Outlet,
      children: [
        {
          layouts: HomeLayout,
          children: [
            {
              index: true,
              element: HomePage,
            },
          ],
        },
        {
          layouts: DefaultLayout,
          children: [
            {
              path: ROUTES.JOB_SEEKER.JOBS,
              element: JobPage,
            },
            {
              path: ROUTES.JOB_SEEKER.JOBS_EN,
              element: JobPage,
            },
            {
              path: "jobs",
              element: JobPage,
            },
            {
              path: "job-vacancies-rwanda",
              element: JobPage,
            },
            {
              path: "kigali-jobs",
              element: JobPage,
            },
            {
              path: ROUTES.JOB_SEEKER.JOB_DETAIL,
              element: JobDetailPage,
            },
            {
              path: ROUTES.JOB_SEEKER.COMPANY,
              element: CompanyPage,
            },
            {
              path: ROUTES.JOB_SEEKER.COMPANY_EN,
              element: CompanyPage,
            },
            {
              path: "employers",
              element: CompanyPage,
            },
            {
              path: ROUTES.JOB_SEEKER.COMPANY_DETAIL,
              element: CompanyDetailPage,
            },
            {
              path: ROUTES.JOB_SEEKER.ABOUT_US,
              element: AboutUsPage,
            },
            {
              path: ROUTES.JOB_SEEKER.ABOUT_US_EN,
              element: AboutUsPage,
            },
            {
              path: "about",
              element: AboutUsPage,
            },
            {
              path: ROUTES.JOB_SEEKER.CAREER_GUIDE,
              element: CareerGuidePage,
            },
            {
              path: "career-guide",
              element: CareerGuidePage,
            },
            {
              path: ROUTES.JOB_SEEKER.CAREER_ADVICE,
              element: CareerAdvicePage,
            },
            {
              path: "career-advice",
              element: CareerAdvicePage,
            },
            {
              path: ROUTES.JOB_SEEKER.CAREER_ARTICLE,
              element: CareerArticlePage,
            },
            {
              path: ROUTES.JOB_SEEKER.CONTACT,
              element: ContactPage,
            },
            {
              path: ROUTES.JOB_SEEKER.FAQ,
              element: FaqPage,
            },
            {
              path: ROUTES.JOB_SEEKER.EDITORIAL_POLICY,
              element: EditorialPolicyPage,
            },
            {
              path: ROUTES.JOB_SEEKER.CORRECTION_POLICY,
              element: CorrectionPolicyPage,
            },
            {
              path: ROUTES.JOB_SEEKER.VERIFICATION_POLICY,
              element: VerificationPolicyPage,
            },
            {
              path: ROUTES.JOB_SEEKER.PRIVACY_POLICY,
              element: PrivacyPolicyPage,
            },
            {
              path: ROUTES.JOB_SEEKER.PRIVACY_POLICY_EN,
              element: PrivacyPolicyPage,
            },
            {
              path: ROUTES.JOB_SEEKER.TERMS_OF_USE,
              element: TermsOfUsePage,
            },
            {
              path: ROUTES.JOB_SEEKER.TERMS_OF_USE_EN,
              element: TermsOfUsePage,
            },
            {
              path: ROUTES.JOB_SEEKER.JOBS_BY_CAREER,
              element: JobsByCareerPage,
            },
            {
              path: ROUTES.JOB_SEEKER.JOBS_BY_CAREER_EN,
              element: JobsByCareerPage,
            },
            {
              path: ROUTES.JOB_SEEKER.JOBS_BY_CITY,
              element: JobsByCityPage,
            },
            {
              path: ROUTES.JOB_SEEKER.JOBS_BY_CITY_EN,
              element: JobsByCityPage,
            },
            {
              path: ROUTES.JOB_SEEKER.JOBS_BY_TYPE,
              element: JobsByJobTypePage,
            },
            {
              path: ROUTES.JOB_SEEKER.JOBS_BY_TYPE_EN,
              element: JobsByJobTypePage,
            },
            {
              path: ROUTES.JOB_SEEKER.PLACES_FOR_SALE,
              element: YouTubeVideosPage,
            },
            {
              path: ROUTES.JOB_SEEKER.YOUTUBE_VIDEOS,
              element: YouTubeVideosPage,
            },
          ],
        },
        {
          path: ROUTES.JOB_SEEKER.DASHBOARD,
          layouts: JobSeekerLayout,
          checkCondition: (settings) =>
            settings.isAuthenticated && settings.isJobSeekerRole,
          redirectUrl: "/" + ROUTES.AUTH.LOGIN,
          children: [
            {
              index: true,
              element: DashboardPage,
            },
            {
              path: ROUTES.JOB_SEEKER.PROFILE,
              element: ProfilePage,
            },
            {
              path: ROUTES.JOB_SEEKER.STEP_PROFILE,
              element: OnlineProfilePage,
            },
            {
              path: ROUTES.JOB_SEEKER.ATTACHED_PROFILE,
              element: AttachedProfilePage,
            },
            {
              path: ROUTES.JOB_SEEKER.MY_JOB,
              element: MyJobPage,
            },
            {
              path: ROUTES.JOB_SEEKER.MY_COMPANY,
              element: MyCompanyPage,
            },
            {
              path: ROUTES.JOB_SEEKER.NOTIFICATION,
              element: NotificationPage,
            },
            {
              path: ROUTES.JOB_SEEKER.ACCOUNT,
              element: AccountPage,
            },
          ],
        },
        {
          layouts: DefaultLayout,
          checkCondition: (settings) => !settings.isAuthenticated,
          redirectUrl: "/" + ROUTES.JOB_SEEKER.HOME,
          children: [
            {
              path: ROUTES.AUTH.EMAIL_VERIFICATION,
              checkCondition: (settings) => settings.isAllowVerifyEmail,
              redirectUrl: "/" + ROUTES.AUTH.LOGIN,
              element: EmailVerificationRequiredPage,
            },
            {
              path: ROUTES.AUTH.FORGOT_PASSWORD,
              element: ForgotPasswordPage,
            },
            {
              path: ROUTES.AUTH.RESET_PASSWORD,
              element: ResetPasswordPage,
            },
            {
              path: ROUTES.AUTH.LOGIN,
              element: JobSeekerLogin,
            },
            {
              path: ROUTES.AUTH.REGISTER,
              element: JobSeekerSignUp,
            },
          ],
        },
        {
          path: ROUTES.JOB_SEEKER.CHAT,
          layouts: ChatLayout,
          checkCondition: (settings) =>
            settings.isAuthenticated && settings.isJobSeekerRole,
          redirectUrl: "/" + ROUTES.AUTH.LOGIN,
          children: [
            {
              index: true,
              element: ChatPage,
            },
          ],
        },
      ],
    },
    {
      path: ROUTES.ERROR.FORBIDDEN,
      element: ForbiddenPage,
    },
    {
      path: ROUTES.ERROR.NOT_FOUND,
      element: NotFoundPage,
    },
  ],
  [HOST_NAME.EMPLOYER_MYJOB]: [
    {
      path: ROUTES.EMPLOYER.DASHBOARD,
      layouts: EmployerLayout,
      checkCondition: (settings) =>
        settings.isAuthenticated && settings.isEmployerRole,
      redirectUrl: "/" + ROUTES.AUTH.LOGIN,
      children: [
        {
          index: true,
          element: EmployerDashboardPage,
        },
        {
          path: ROUTES.EMPLOYER.JOB_POST,
          element: EmployerJobPostPage,
        },
        {
          path: ROUTES.EMPLOYER.APPLIED_PROFILE,
          element: EmployerProfileAppliedPage,
        },
        {
          path: ROUTES.EMPLOYER.SAVED_PROFILE,
          element: EmployerSavedProfilePage,
        },
        {
          path: ROUTES.EMPLOYER.PROFILE,
          element: EmployerProfilePage,
        },
        {
          path: ROUTES.EMPLOYER.PROFILE_DETAIL,
          element: EmployerProfileDetailPage,
        },
        {
          path: ROUTES.EMPLOYER.COMPANY,
          element: EmployerCompanyPage,
        },
        {
          path: ROUTES.EMPLOYER.NOTIFICATION,
          element: NotificationPage,
        },
        {
          path: ROUTES.EMPLOYER.ACCOUNT,
          element: EmployerAccountPage,
        },
        {
          path: ROUTES.EMPLOYER.SETTING,
          element: EmployerSettingPage,
        },
      ],
    },
    {
      layouts: DefaultLayout,
      checkCondition: (settings) => !settings.isAuthenticated,
      redirectUrl: "/" + ROUTES.EMPLOYER.DASHBOARD,
      children: [
        {
          path: ROUTES.AUTH.EMAIL_VERIFICATION,
          checkCondition: (settings) => settings.isAllowVerifyEmail,
          redirectUrl: "/" + ROUTES.AUTH.LOGIN,
          element: EmailVerificationRequiredPage,
        },
        {
          path: ROUTES.AUTH.FORGOT_PASSWORD,
          element: ForgotPasswordPage,
        },
        {
          path: ROUTES.AUTH.RESET_PASSWORD,
          element: ResetPasswordPage,
        },
        {
          path: ROUTES.AUTH.LOGIN,
          element: EmployerLogin,
        },
        {
          path: ROUTES.AUTH.REGISTER,
          element: EmployerSignUp,
        },
      ],
    },
    {
      // Public employer information pages — reachable whether or not the
      // employer is signed in, so the header links never dead-end.
      layouts: DefaultLayout,
      children: [
        {
          path: ROUTES.EMPLOYER.INTRODUCE,
          element: EmployerInfoPage,
        },
        {
          path: ROUTES.EMPLOYER.SERVICE,
          element: EmployerInfoPage,
        },
        {
          path: ROUTES.EMPLOYER.PRICING,
          element: EmployerInfoPage,
        },
        {
          path: ROUTES.EMPLOYER.SUPPORT,
          element: EmployerInfoPage,
        },
        {
          path: ROUTES.EMPLOYER.BLOG,
          element: EmployerInfoPage,
        },
      ],
    },
    {
      path: ROUTES.EMPLOYER.CHAT,
      layouts: ChatLayout,
      checkCondition: (settings) =>
        settings.isAuthenticated && settings.isEmployerRole,
      redirectUrl: "/" + ROUTES.AUTH.LOGIN,
      children: [
        {
          index: true,
          element: ChatPage,
        },
      ],
    },
    {
      path: ROUTES.ERROR.FORBIDDEN,
      element: ForbiddenPage,
    },
    {
      path: ROUTES.ERROR.NOT_FOUND,
      element: NotFoundPage,
    },
  ],
};

export default routesConfig;
