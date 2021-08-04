import React from "react";
import ReactDOM from "react-dom";
// import {BrowserRouter} from "react-router-dom";
import {createStore, compose, applyMiddleware} from "redux";
import {Provider} from "react-redux";
import thunk from "redux-thunk";

import reportWebVitals from "./reportWebVitals";

import rootReducer from "./store/reducers/rootReducer";
import App from "./containers/App/App";

import "devextreme/dist/css/dx.common.css";
import "devextreme/dist/css/dx.light.css";
import "./index.css";

const composeEnhancers =
  typeof window === "object" && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
    : compose;

const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk))
);

const app = (
  <React.StrictMode>
    <Provider store={store}>
      {/* <BrowserRouter> */}
      <App />
      {/* </BrowserRouter> */}
    </Provider>
  </React.StrictMode>
);

ReactDOM.render(app, document.getElementById("root"));

reportWebVitals();
