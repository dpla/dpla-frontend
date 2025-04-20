import React from "react";

import css from "./Alert.module.scss";

function Alert({showMessage}) {
  const className = `${css.alert} ${showMessage === "" ? "" : css.open}`
  return (
    <div role="alert" className={className}>{showMessage}</div>
  );
}

export default Alert;
