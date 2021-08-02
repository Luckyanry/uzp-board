import React from "react";
import ReactDOM from "react-dom";

import App from "./App";

import reportWebVitals from "./reportWebVitals";

import "./index.css";

import themes from "devextreme/ui/themes";
themes.initialized(() =>
  ReactDOM.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
    document.getElementById("root")
  )
);

reportWebVitals();
