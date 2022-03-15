import React, { Suspense, useEffect } from 'react';
import { ToastContainer } from 'react-toastify';
import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes,
} from 'react-router-dom';
import pages, { Error404, dashboardPages } from 'pages';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';

import './App.scss';
import { useDispatch, useSelector } from 'react-redux';
import {
  AutoAuthenticate,
  maintenanceStatus,
} from 'store/Actions/AuthActions';

const SignIn = React.lazy(() => import('pages/sign-in/SignIn.page'));
const SignUp = React.lazy(() => import('pages/sign-up/SignUp.page'));
const ResetPassword = React.lazy(() =>
  import('pages/reset-password/ResetPassword.page')
);
const ForgotPassword = React.lazy(() =>
  import('pages/forgot-password/ForgotPassword.page')
);
const EmailVerification = React.lazy(() =>
  import('pages/email-verification/EmailVerification.page')
);
const ConfirmOtp = React.lazy(() =>
  import('pages/one-time-password/OneTimePassword.page')
);
const UnderMaintenance = React.lazy(() =>
  import('pages/under-maintenance/UnderMaintenance.page')
);
const SuspendedAccount = React.lazy(() =>
  import('pages/account-suspended/AccountSuspended.page')
);

function App() {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const { maintenance, suspended } = useSelector((state) => state.settings);
  const dispatch = useDispatch();
  useEffect(() => {
    AutoAuthenticate(dispatch);
    dispatch(maintenanceStatus());
  }, [dispatch]);

  return (
    <div className="App bg-custom-main flex items-center content-center">
      <ToastContainer />
      <Suspense fallback={<>Loading...</>}>
        <Router>
          <Routes>
            <Route path="/" element={<Navigate to="/client/sign-in" />} />
            <Route
              path="/client/account-suspended"
              element={
                !suspended ? (
                  <Navigate to="/client/sign-in" />
                ) : (
                  <SuspendedAccount />
                )
              }
            />
            <Route
              path="/client/verify-email/:userId"
              element={
                suspended ? (
                  <Navigate to="/client/account-suspended" />
                ) : isLoggedIn ? (
                  <Navigate to="/client/dashboard" />
                ) : (
                  <EmailVerification />
                )
              }
            />
            <Route
              path="/client/reset-password"
              element={
                suspended ? (
                  <Navigate to="/client/account-suspended" />
                ) : isLoggedIn ? (
                  <Navigate to="/client/dashboard" />
                ) : (
                  <ResetPassword />
                )
              }
            />
            <Route
              path="/client/forgot-password"
              element={
                suspended ? (
                  <Navigate to="/client/account-suspended" />
                ) : isLoggedIn ? (
                  <Navigate to="/client/dashboard" />
                ) : (
                  <ForgotPassword />
                )
              }
            />
            <Route
              path="/client/one-time-password"
              element={
                suspended ? (
                  <Navigate to="/client/account-suspended" />
                ) : isLoggedIn ? (
                  <Navigate to="/client/dashboard" />
                ) : (
                  <ConfirmOtp />
                )
              }
            />
            <Route
              path="/client/under-maintenance"
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
                  <Navigate to="/client/under-maintenance" />
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
                    suspended ? (
                      <Navigate to="/client/account-suspended" />
                    ) : maintenance ? (
                      <Navigate to="/client/under-maintenance" />
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
