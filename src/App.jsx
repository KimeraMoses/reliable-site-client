import React, { Suspense } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import pages from 'pages';
import Error404 from 'pages/error- 404/Error404.page';
import 'bootstrap/dist/css/bootstrap.min.css';

import './App.scss';

function App() {
  return (
    <div className="App bg-custom-main flex items-center content-center">
      <Suspense fallback={<>Loading...</>}>
        <Router>
          <Routes>
            {pages.map(({ path, Component }) => (
              <Route key={path} path={path} element={<Component />} exact />
            ))}
            <Route component={Error404} />
          </Routes>
        </Router>
      </Suspense>
    </div>
  );
}

export default App;
