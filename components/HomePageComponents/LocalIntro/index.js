import React from "react";
import Markdown from "react-markdown";
import rehypeRaw from "rehype-raw";

import css from "./LocalIntro.module.scss";
import utils from "stylesheets/utils.module.scss";

function LocalIntro({ content }) {
  const localId = process.env.NEXT_PUBLIC_LOCAL_ID;
  return (
    <div className={`${css.wrapper} ${utils.siteMaxWidth}`}>
      <Markdown
        id={`${localId}-intro`}
        rehypePlugins={[rehypeRaw]}
        className={css.intro}
        skipHtml={false}
      >
        {content}
      </Markdown>
    </div>
  );
}

export default LocalIntro;
