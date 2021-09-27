import React from "react";
import ReactMarkdown from "react-markdown";

import css from "./LocalIntro.module.scss";
import utils from "stylesheets/utils.module.scss"

const LocalIntro = ({ content }) =>
  <div className={`${css.wrapper} ${utils.siteMaxWidth}`}>
    <ReactMarkdown className={css.intro} source={content} />
  </div>;

export default LocalIntro;
