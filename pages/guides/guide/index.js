import React from "react";
import fetch from "isomorphic-fetch";

import MainLayout from "components/MainLayout";
import ContentPagesSidebar from "components/shared/ContentPagesSidebar";
import { classNames, stylesheet } from "css/pages/guide.css";
import {
  classNames as contentClasses,
  stylesheet as contentStyles
} from "css/pages/content-pages-wysiwyg.css";
import { GUIDES_ENDPOINT } from "constants/content-pages";
import { classNames as utilClassNames } from "css/utils.css";

const Guides = ({ url, guides, guide }) =>
  <MainLayout route={url}>
    <div>
      <div
        className={[
          utilClassNames.module,
          contentClasses.sidebarAndContentWrapper
        ].join(" ")}
      >
        <ContentPagesSidebar route={url} guides={guides} />
        <div className={[classNames.content, contentClasses.content].join(" ")}>
          <img
            src={guide.illustration}
            alt=""
            className={classNames.illustration}
          />
          <h1 className={classNames.guideTitle}>{guide.title}</h1>
          <div className={classNames.divider} />
          <div dangerouslySetInnerHTML={{ __html: guide.content }} />
        </div>
      </div>
    </div>
    <style dangerouslySetInnerHTML={{ __html: stylesheet }} />
    <style dangerouslySetInnerHTML={{ __html: contentStyles }} />
  </MainLayout>;

Guides.getInitialProps = async ({ query }) => {
  const res = await fetch(GUIDES_ENDPOINT);
  const json = await res.json();
  const guides = json.map(guide =>
    Object.assign({}, guide, {
      displayTitle: guide.acf.display_title
    })
  );
  const guide = json.find(guide => guide.slug === query.guide);

  return {
    guides,
    guide: Object.assign({}, guide, {
      summary: guide.acf.summary,
      title: guide.title.rendered,
      color: guide.acf.color,
      illustration: guide.acf.illustration,
      content: guide.content.rendered
    })
  };
};

export default Guides;
