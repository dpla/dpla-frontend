import React from "react";
import ReactMarkdown from "react-markdown";

import css from "./LocalIntro.scss";

const LocalIntro = ({ content }) =>
  <div className={`${css.wrapper} site-max-width`}>
    <ReactMarkdown source={content} />
  </div>;

export default LocalIntro;
