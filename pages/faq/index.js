import React from "react";
import fetch from "isomorphic-fetch";

import MainLayout from "components/MainLayout";
import ContentPagesSidebar from "components/shared/ContentPagesSidebar";
import { classNames, stylesheet } from "css/pages/faq.css";
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
    <div>
      <div
        className={[
          utilClassNames.module,
          contentClasses.sidebarAndContentWrapper
        ].join(" ")}
      >
        <ContentPagesSidebar
          route={url}
          guides={guides}
          page={CONTENT_PAGE_NAMES.FAQ}
        />
        <div className={`${classNames.content} ${contentClasses.content}`}>
          <div dangerouslySetInnerHTML={{ __html: faq.content.rendered }} />
        </div>
      </div>
    </div>
    <style dangerouslySetInnerHTML={{ __html: stylesheet }} />
    <style dangerouslySetInnerHTML={{ __html: contentStyles }} />
  </MainLayout>;

Faq.getInitialProps = async () => {
  const faqRes = await fetch(FAQ_ENDPOINT);
  const faqJson = await faqRes.json();

  const guidesRes = await fetch(GUIDES_ENDPOINT);
  const guidesJson = await guidesRes.json();
  const guides = guidesJson.map(guide =>
    Object.assign({}, guide, {
      title: guide.title.rendered
    })
  );

  return { faq: faqJson, guides };
};

export default Faq;
