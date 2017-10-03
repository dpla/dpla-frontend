import React from "react";
import fetch from "isomorphic-fetch";

import MainLayout from "components/MainLayout";
import ContentPagesSidebar from "components/shared/ContentPagesSidebar";
import {
  classNames as contentClasses,
  stylesheet as contentStyles
} from "css/pages/content-pages-wysiwyg.css";
import {
  ABOUT_US_ENDPOINT,
  CONTENT_PAGE_NAMES,
  GUIDES_ENDPOINT
} from "constants/content-pages";
import { classNames as utilClassNames } from "css/utils.css";

const AboutUs = ({ url, content, guides }) =>
  <MainLayout route={url}>
    <div>
      <div
        className={`${utilClassNames.container}
        ${contentClasses.sidebarAndContentWrapper}`}
      >
        <ContentPagesSidebar
          route={url}
          guides={guides}
          page={CONTENT_PAGE_NAMES.ABOUT_US}
        />
        <div className={contentClasses.content}>
          <div dangerouslySetInnerHTML={{ __html: content.content.rendered }} />
        </div>
      </div>
    </div>
    <style dangerouslySetInnerHTML={{ __html: contentStyles }} />
  </MainLayout>;

AboutUs.getInitialProps = async () => {
  const res = await fetch(ABOUT_US_ENDPOINT);
  const json = await res.json();

  const guidesRes = await fetch(GUIDES_ENDPOINT);
  const guidesJson = await guidesRes.json();
  const guides = guidesJson.map(guide =>
    Object.assign({}, guide, {
      displayTitle: guide.acf.display_title
    })
  );

  return { content: json, guides };
};

export default AboutUs;
