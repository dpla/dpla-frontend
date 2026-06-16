import React from "react";
import Markdown from "react-markdown";
import rehypeRaw from "rehype-raw";

import css from "./LocalIntro.module.css";
import utils from "stylesheets/utils.module.css";

function LocalIntro({ content }) {
  const localId = process.env.NEXT_PUBLIC_LOCAL_ID;
  return (
    <div className={`${css.wrapper} ${utils.siteMaxWidth}`}>
      <div id={`${localId}-intro`} className={css.intro}>
        <Markdown rehypePlugins={[rehypeRaw]} skipHtml={false}>
          {content}
        </Markdown>
      </div>
    </div>
  );
}

export default LocalIntro;
