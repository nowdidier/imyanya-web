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

import { MyJobChatBot } from "./chatbot";
import Feedback from "./components/Feedback";
import ScrollToTop from "./components/ScrollToTop";

import { ROLES_NAME, ROUTES } from "./configs/constants";

function App() {
  const dispatch = useDispatch();
  const location = useLocation();

  const [isInitializing, setIsInitializing] =
    React.useState(true);

  const { isAllowVerifyEmail } = useSelector(
    (state) => state.auth || {}
  );

  const {
    isAuthenticated = false,
    currentUser = null,
  } = useSelector((state) => state.user || {});

  // Hide chatbot on chat pages
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
    const initializeApp = async () => {
      try {
        // Load public config first
        await dispatch(getAllConfig()).unwrap();

        // Try to authenticate user
        try {
          await dispatch(getUserInfo()).unwrap();

          console.log("User authenticated");
        } catch (authError) {
          console.warn(
            "User not authenticated",
            authError
          );
        }

        console.log("App initialized");
      } catch (err) {
        console.error(
          "Initialization failed:",
          err
        );
      } finally {
        setIsInitializing(false);

        const loader =
          document.getElementById(
            "initial-loader"
          );

        if (loader) {
          requestAnimationFrame(() => {
            loader.classList.add(
              "fade-out"
            );

            setTimeout(() => {
              loader.remove();
            }, 500);
          });
        }
      }
    };

    initializeApp();
  }, [dispatch]);

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

          {/* Routes */}
          <AppRoutes settings={settings} />

          {/* Toast */}
          <ToastContainer autoClose={1300} />

          {/* Chatbot + Feedback */}
          {!hideChatFeatures && (
            <>
              {isAuthenticated && (
                <Feedback />
              )}

              <MyJobChatBot />
            </>
          )}
        </ThemeProvider>
      </ConfigProvider>

      <ScrollToTop />
    </>
  );
}

export default App;

