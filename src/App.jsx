import React, { Suspense, useEffect } from "react";
import { ToastContainer } from "react-toastify";
import { BrowserRouter as Router, Navigate, Route, Routes } from "react-router-dom";
import pages, { Error404, dashboardPages } from "pages";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.css";

import "./App.scss";
import { useDispatch, useSelector } from "react-redux";
import { AutoAuthenticate } from "store/Actions/AuthActions";
import SignIn from "pages/sign-in/SignIn.page";

function App() {
  // const Authtoken = useSelector((state) => state.auth.token);
  const isLoggedIn = useSelector(state=>state.auth.isLoggedIn)
  const dispatch = useDispatch();
  useEffect(()=>{
    AutoAuthenticate(dispatch)
  },[dispatch])
  return (
    <div className="App bg-custom-main flex items-center content-center">
      <ToastContainer />
      <Suspense fallback={<>Loading...</>}>
        <Router>
          <Routes>
            <Route path="/client/sign-in" element={isLoggedIn? <Navigate to="/client/dashboard"/>: <SignIn/> }/>
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
                  element={<Component />}
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
