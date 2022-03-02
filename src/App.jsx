import React, { Suspense } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import pages, { Error404, dashboardPages } from 'pages';
import 'bootstrap/dist/css/bootstrap.min.css';

import './App.scss';

function App() {
  return (
    <div className="App bg-custom-main flex items-center content-center">
      <Suspense fallback={<>Loading...</>}>
        <Router>
          <Routes>
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
