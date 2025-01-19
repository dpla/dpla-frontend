import React from "react";
import Markdown from "react-markdown";

import css from "./LocalIntro.module.scss";
import utils from "stylesheets/utils.module.scss"

const LocalIntro = ({ content }) =>
  <div className={`${css.wrapper} ${utils.siteMaxWidth}`}>
      <Markdown className={css.intro} skipHtml={false}>{content}</Markdown>
  </div>;

export default LocalIntro;
