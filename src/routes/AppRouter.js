import { Suspense } from "react";
import {
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import {
  HOST_NAME,
  getCanonicalHostName,
} from "../configs/constants";

import PageLoading from "../components/PageLoading";
import routesConfig from "../configs/routesConfig";

// ==============================
// PRIVATE ROUTE
// ==============================

const PrivateRoute = ({
  element: Element,
  checkCondition,
  redirectUrl,
  settings,
}) => {
  if (
    checkCondition &&
    !checkCondition(settings)
  ) {
    return (
      <Navigate
        to={redirectUrl}
        replace
      />
    );
  }

  return Element;
};

// ==============================
// RENDER ROUTES
// ==============================

const renderRoutes = (
  routes = [],
  settings
) => {
  return routes.map((route, index) => {
    const {
      path,
      element: Element,
      layouts: Layout,
      checkCondition,
      redirectUrl,
      children,
      index: isIndex,
    } = route;

    let routeElement;

    // Route with component
    if (Element) {
      const content = (
        <Suspense fallback={<PageLoading />}>
          <Element />
        </Suspense>
      );

      routeElement = Layout ? (
        <Layout>
          {content}
        </Layout>
      ) : (
        content
      );
    }
    // Route with layout only
    else if (Layout) {
      routeElement = <Layout />;
    }

    // Protected Route
    if (checkCondition) {
      return (
        <Route
          key={index}
          {...(isIndex
            ? { index: true }
            : { path })}
          element={
            <PrivateRoute
              element={routeElement}
              checkCondition={
                checkCondition
              }
              settings={settings}
              redirectUrl={redirectUrl}
            />
          }
        >
          {children &&
            renderRoutes(
              children,
              settings
            )}
        </Route>
      );
    }

    // Normal Route
    return (
      <Route
        key={index}
        {...(isIndex
          ? { index: true }
          : { path })}
        element={routeElement}
      >
        {children &&
          renderRoutes(
            children,
            settings
          )}
      </Route>
    );
  });
};

// ==============================
// APP ROUTES
// ==============================

const AppRoutes = ({ settings }) => {
  // Normalize hostname
  const hostName =
    getCanonicalHostName(
      window.location.hostname
    );

  // Safe fallback routes
  const routes =
    routesConfig[hostName] ||
    routesConfig[HOST_NAME.MYJOB] ||
    [];

  return (
    <Routes>
      {renderRoutes(routes, settings)}
    </Routes>
  );
};

export default AppRoutes;