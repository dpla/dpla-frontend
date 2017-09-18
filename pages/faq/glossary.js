import React from "react";
import fetch from "isomorphic-fetch";

import MainLayout from "components/MainLayout";
import ContentPagesSidebar from "components/shared/ContentPagesSidebar";
import { classNames, stylesheet } from "css/pages/glossary.css";
import { GLOSSARY_ENDPOINT, CONTENT_PAGE_NAMES } from "constants/content-pages";
import { classNames as utilClassNames } from "css/utils.css";

const Glossary = ({ url, glossary }) =>
  <MainLayout route={url}>
    <div>
      <div
        className={[
          utilClassNames.module,
          classNames.sidebarAndContentWrapper
        ].join(" ")}
      >
        <ContentPagesSidebar page={CONTENT_PAGE_NAMES.GLOSSARY} />
        <div className={classNames.content}>
          <div
            dangerouslySetInnerHTML={{ __html: glossary.content.rendered }}
          />
        </div>
      </div>
    </div>
    <style dangerouslySetInnerHTML={{ __html: stylesheet }} />
  </MainLayout>;

Glossary.getInitialProps = async () => {
  const res = await fetch(GLOSSARY_ENDPOINT);
  const json = await res.json();

  return { glossary: json };
};

export default Glossary;
