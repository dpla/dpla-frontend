import React from "react";

import css from "./Alert.scss";

const Alert = ({ showMessage }) =>
  <div
    role="alert"
    className={`${css.alert} ${showMessage === "" ? "" : css.open}`}
  >
    {showMessage}
  </div>;

export default Alert;
