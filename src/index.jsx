import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import store from "./store/index";
import App from "./App";
import { CookiesProvider } from "react-cookie";

import "./index.scss";

ReactDOM.render(
  <CookiesProvider>
    <Provider store={store}>
        <App />
    </Provider>
  </CookiesProvider>,
  document.getElementById("root")
);
