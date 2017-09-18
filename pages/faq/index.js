import React from "react";
import fetch from "isomorphic-fetch";

import MainLayout from "components/MainLayout";
import ContentPagesSidebar from "components/shared/ContentPagesSidebar";
import { classNames, stylesheet } from "css/pages/faq.css";
import { FAQ_ENDPOINT, CONTENT_PAGE_NAMES } from "constants/content-pages";
import { classNames as utilClassNames } from "css/utils.css";

const Faq = ({ url, faq }) =>
  <MainLayout
    route={url}
    headLinks={
      <link
        rel="stylesheet"
        href="https://unpkg.com/material-components-web@latest/dist/material-components-web.min.css"
      />
    }
  >
    <div>
      <div
        className={[
          utilClassNames.module,
          classNames.sidebarAndContentWrapper
        ].join(" ")}
      >
        <ContentPagesSidebar page={CONTENT_PAGE_NAMES.FAQ} />
        <div className={classNames.content}>
          <div dangerouslySetInnerHTML={{ __html: faq.content.rendered }} />
        </div>
      </div>
    </div>
    <style dangerouslySetInnerHTML={{ __html: stylesheet }} />
  </MainLayout>;

Faq.getInitialProps = async () => {
  const res = await fetch(FAQ_ENDPOINT);
  const json = await res.json();

  return { faq: json };
};

export default Faq;
