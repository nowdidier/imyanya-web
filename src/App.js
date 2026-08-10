// App.js

import "sweetalert2/src/sweetalert2.scss";
import "./App.css";

import * as React from "react";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { getUserInfo } from "./redux/userSlice";
import { getAllConfig } from "./redux/configSlice";

import { createTheme, ThemeProvider } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";
import { viVN } from "@mui/material/locale";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import defaultTheme from "./themeConfigs/defaultTheme";
import { ConfigProvider } from "antd";

import AppRoutes from "./routes/AppRouter";

import AdSenseLoader from "./components/AdSenseLoader";
import { Popunder, SocialBar, AdsRemovalAlert } from "./components/Ads";
import SeoManager from "./components/SeoManager";
import { WhatsAppContactButton } from "./whatsapp";
import Feedback from "./components/Feedback";
import ScrollToTop from "./components/ScrollToTop";

import { ROLES_NAME, ROUTES } from "./configs/constants";
import { isEmployerHost } from "./configs/constants";

const PUBLIC_BOOTSTRAP_TIMEOUT_MS = 2500;
const PRIVATE_BOOTSTRAP_TIMEOUT_MS = 12000;

const BLOCKING_ROUTE_PREFIXES = [
  `/${ROUTES.JOB_SEEKER.DASHBOARD}`,
  `/${ROUTES.JOB_SEEKER.PROFILE}`,
  `/${ROUTES.JOB_SEEKER.STEP_PROFILE.split("/:")[0]}`,
  `/${ROUTES.JOB_SEEKER.ATTACHED_PROFILE.split("/:")[0]}`,
  `/${ROUTES.JOB_SEEKER.MY_JOB}`,
  `/${ROUTES.JOB_SEEKER.MY_COMPANY}`,
  `/${ROUTES.JOB_SEEKER.NOTIFICATION}`,
  `/${ROUTES.JOB_SEEKER.ACCOUNT}`,
  `/${ROUTES.JOB_SEEKER.CHAT}`,
  `/${ROUTES.EMPLOYER.JOB_POST}`,
  `/${ROUTES.EMPLOYER.APPLIED_PROFILE}`,
  `/${ROUTES.EMPLOYER.SAVED_PROFILE}`,
  `/${ROUTES.EMPLOYER.PROFILE}`,
  `/${ROUTES.EMPLOYER.PROFILE_DETAIL.split("/:")[0]}`,
  `/${ROUTES.EMPLOYER.NOTIFICATION}`,
  `/${ROUTES.EMPLOYER.ACCOUNT}`,
  `/${ROUTES.EMPLOYER.SETTING}`,
  `/${ROUTES.EMPLOYER.CHAT}`,
];

const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const isBlockingRoute = (pathname = "") =>
  BLOCKING_ROUTE_PREFIXES.some((prefix) => pathname.startsWith(prefix));

const removeInitialLoader = () => {
  const loader = document.getElementById("initial-loader");

  if (loader) {
    requestAnimationFrame(() => {
      loader.classList.add("fade-out");

      setTimeout(() => {
        loader.remove();
      }, 500);
    });
  }
};

function App() {
  const dispatch = useDispatch();
  const location = useLocation();

  const [isInitializing, setIsInitializing] =
    React.useState(true);
  const bootstrapStartedRef =
    React.useRef(false);

  const { isAllowVerifyEmail } = useSelector(
    (state) => state.auth || {}
  );

  const {
    isAuthenticated = false,
    currentUser = null,
  } = useSelector((state) => state.user || {});

  // Hide floating contact widgets on chat pages
  const hideChatFeatures =
    location.pathname.startsWith(
      `/${ROUTES.JOB_SEEKER.CHAT}`
    ) ||
    location.pathname.startsWith(
      `/${ROUTES.EMPLOYER.CHAT}`
    );

  const settings = {
    isAuthenticated,

    isJobSeekerRole:
      currentUser?.roleName ===
      ROLES_NAME.JOB_SEEKER,

    isEmployerRole:
      currentUser?.roleName ===
      ROLES_NAME.EMPLOYER,

    isAllowVerifyEmail,
  };

  const theme = React.useMemo(
    () => createTheme(defaultTheme, viVN),
    []
  );

  React.useEffect(() => {
    if (bootstrapStartedRef.current) {
      return undefined;
    }

    bootstrapStartedRef.current = true;
    let isMounted = true;

    const finishInitializing = () => {
      if (!isMounted) return;
      setIsInitializing(false);
      removeInitialLoader();
    };

    const initializeApp = async () => {
      try {
        await dispatch(getAllConfig()).unwrap();

        try {
          await dispatch(getUserInfo()).unwrap();
        } catch (authError) {
          console.warn(
            "User not authenticated",
            authError
          );
        }
      } catch (err) {
        console.error(
          "Initialization failed:",
          err
        );
      }
    };

    const bootstrapPromise = initializeApp();
    const maxWait = isBlockingRoute(location.pathname)
      ? PRIVATE_BOOTSTRAP_TIMEOUT_MS
      : PUBLIC_BOOTSTRAP_TIMEOUT_MS;

    Promise.race([bootstrapPromise, wait(maxWait)]).finally(finishInitializing);
    bootstrapPromise.finally(finishInitializing);

    return () => {
      isMounted = false;
    };
  }, [dispatch, location.pathname]);

  // Prevent white screen during initialization
  if (isInitializing) {
    return null;
  }

  return (
    <>
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: "#441da0",
          },
        }}
      >
        <ThemeProvider theme={theme}>
          <CssBaseline enableColorScheme />

          <SeoManager />
          <AdsRemovalAlert />
          {!isEmployerHost() && (
            <>
              <AdSenseLoader />
              <Popunder />
              <SocialBar />
            </>
          )}

          {/* Routes */}
          <AppRoutes settings={settings} />

          {/* Toast */}
          <ToastContainer autoClose={1300} />

          {/* Contact widgets + Feedback */}
          {!hideChatFeatures && (
            <>
              {isAuthenticated && (
                <Feedback />
              )}

              <WhatsAppContactButton />
            </>
          )}
        </ThemeProvider>
      </ConfigProvider>

      <ScrollToTop />
    </>
  );
}

export default App;
