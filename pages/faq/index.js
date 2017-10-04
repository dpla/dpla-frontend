import React from "react";
import fetch from "isomorphic-fetch";

import MainLayout from "components/MainLayout";
import ContentPagesSidebar from "components/shared/ContentPagesSidebar";
import {
  classNames as contentClasses,
  stylesheet as contentStyles
} from "css/pages/content-pages-wysiwyg.css";
import {
  FAQ_ENDPOINT,
  CONTENT_PAGE_NAMES,
  GUIDES_ENDPOINT
} from "constants/content-pages";
import { classNames as utilClassNames } from "css/utils.css";

const Faq = ({ url, faq, guides }) =>
  <MainLayout route={url}>
    <div
      className={`
        ${utilClassNames.container}
        ${contentClasses.sidebarAndContentWrapper}
      `}
    >
      <div className="row">
        <ContentPagesSidebar
          route={url}
          guides={guides}
          page={CONTENT_PAGE_NAMES.FAQ}
        />
        <div className="col-xs-12 col-md-7">
          <div
            className={contentClasses.content}
            dangerouslySetInnerHTML={{ __html: faq.content.rendered }}
          />
        </div>
      </div>
    </div>
    <style dangerouslySetInnerHTML={{ __html: contentStyles }} />
  </MainLayout>;

Faq.getInitialProps = async () => {
  const faqRes = await fetch(FAQ_ENDPOINT);
  const faqJson = await faqRes.json();

  const guidesRes = await fetch(GUIDES_ENDPOINT);
  const guidesJson = await guidesRes.json();
  const guides = guidesJson.map(guide =>
    Object.assign({}, guide, {
      displayTitle: guide.acf.display_title
    })
  );

  return { faq: faqJson, guides };
};

export default Faq;
