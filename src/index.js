import React, {StrictMode} from "react";
import ReactDOM from "react-dom";
// import {BrowserRouter} from "react-router-dom";
import {createStore, compose, applyMiddleware} from "redux";
import {Provider} from "react-redux";
import thunk from "redux-thunk";

import "./polyfills";
import reportWebVitals from "./reportWebVitals";

import rootReducer from "./store/reducers/rootReducer";
import App from "./App";

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
  <StrictMode>
    {/* <BrowserRouter> */}
    <Provider store={store}>
      <App />
    </Provider>
    {/* </BrowserRouter> */}
  </StrictMode>
);

ReactDOM.render(app, document.getElementById("root"));

reportWebVitals();
