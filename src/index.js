import React from "react";
import { render } from "react-dom";
import App from "./screens/App";
import registerServiceWorker from "./registerServiceWorker";
import "./index.css";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";

import app from "./reducers";

// Note: this API requires redux@>=3.1.0
const store = createStore(app, applyMiddleware(thunk));
render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
registerServiceWorker();
