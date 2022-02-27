import React, { Suspense } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import pages from 'pages';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <div className="app">
      <Suspense fallback={<>Loading...</>}>
        <Router>
          <Routes>
            {pages.map(({ path, Component }) => (
              <Route key={path} path={path} element={<Component />} exact />
            ))}
            {/* <Route component={Error404} /> */}
          </Routes>
        </Router>
      </Suspense>
    </div>
  );
}

export default App;
