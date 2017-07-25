import React from "react";
import { render } from "react-dom";
import App from "./screens/App";
import registerServiceWorker from "./registerServiceWorker";
import "./index.css";
import { Provider } from "react-redux";
import { createStore } from "redux";
import app from "./reducers";

const store = createStore(app);

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
registerServiceWorker();
