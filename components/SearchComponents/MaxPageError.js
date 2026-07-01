import React from "react";

import css from "./MaxPageError.module.css";
import utils from "stylesheets/utils.module.css";

function MaxPageError({ maxPage, requestedPage }) {
  return (
    <div className={`${utils.container} ${css.maxPageError}`}>
      <h1>Too Many Pages</h1>
      <p>
        Sorry, to avoid strain on our infrastructure, we
        <br />
        do not serve more than <strong>{maxPage}</strong> pages of results for
        any query.
        <br />
        <br />
        You asked for results starting from page{" "}
        <strong>{requestedPage}</strong>.
      </p>
    </div>
  );
}

export default MaxPageError;
