import React, { Suspense, useEffect } from "react";
import { ToastContainer } from "react-toastify";
import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";
import pages, { Error404, dashboardPages } from "pages";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.css";

import "./App.scss";
import { useDispatch, useSelector } from "react-redux";
import {
  AutoAuthenticate,
  checkMultiFactorAuth,
  maintenanceStatus,
} from "store/Actions/AuthActions";
const SignIn = React.lazy(() => import("pages/sign-in/SignIn.page"));
const SignUp = React.lazy(() => import("pages/sign-up/SignUp.page"));
const UnderMaintenance = React.lazy(() =>
  import("pages/under-maintenance/UnderMaintenance.page")
);

function App() {
  const { user } = useSelector((state) => state.auth);
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const { maintenance, is2faEnabled } = useSelector((state) => state.settings);
  const dispatch = useDispatch();
  useEffect(() => {
    AutoAuthenticate(dispatch);
    dispatch(maintenanceStatus());
  }, [dispatch]);

  useEffect(() => {
    dispatch(checkMultiFactorAuth(user && user.id));
  }, [user, dispatch]);
  
  return (
    <div className="App bg-custom-main flex items-center content-center">
      <ToastContainer />
      <Suspense fallback={<>Loading...</>}>
        <Router>
          <Routes>
            <Route path="/" element={<Navigate to="/client/sign-in" />} />
            <Route
              path="/under-maintenance"
              element={
                maintenance ? (
                  <UnderMaintenance />
                ) : isLoggedIn ? (
                  <Navigate to="/client/dashboard" />
                ) : (
                  <Navigate to="/client/sign-in" />
                )
              }
            />
            <Route
              path="/client/sign-in"
              element={
                maintenance ? (
                  <Navigate to="/under-maintenance" />
                ) : is2faEnabled ? (
                  <Navigate to="/client/one-time-password" />
                ) : isLoggedIn ? (
                  <Navigate to="/client/dashboard" />
                ) : (
                  <SignIn />
                )
              }
            />
            <Route
              path="/client/sign-up"
              element={
                isLoggedIn ? <Navigate to="/client/dashboard" /> : <SignUp />
              }
            />
            {pages.map(({ path, Component }) => (
              <Route
                key={path}
                path={`/client${path}`}
                element={<Component />}
                exact
              />
            ))}
            <Route path="/client/dashboard">
              {dashboardPages.map(({ path, Component }) => (
                <Route
                  key={path}
                  path={`/client${path}`}
                  element={
                    maintenance ? (
                      <Navigate to="/under-maintenance" />
                    ) : !isLoggedIn ? (
                      <Navigate to="/client/sign-in" />
                    ) : (
                      <Component />
                    )
                  }
                  exact
                />
              ))}
            </Route>
            <Route path="*" element={<Error404 />} />
          </Routes>
        </Router>
      </Suspense>
    </div>
  );
}

export default App;
