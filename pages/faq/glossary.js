import React from "react";
import fetch from "isomorphic-fetch";

import MainLayout from "components/MainLayout";
import ContentPagesSidebar from "components/shared/ContentPagesSidebar";
import { classNames, stylesheet } from "css/pages/glossary.css";
import {
  GLOSSARY_ENDPOINT,
  CONTENT_PAGE_NAMES,
  GUIDES_ENDPOINT
} from "constants/content-pages";
import { classNames as utilClassNames } from "css/utils.css";

const Glossary = ({ url, glossary, guides }) =>
  <MainLayout route={url}>
    <div>
      <div
        className={[
          utilClassNames.module,
          classNames.sidebarAndContentWrapper
        ].join(" ")}
      >
        <ContentPagesSidebar
          route={url}
          guides={guides}
          page={CONTENT_PAGE_NAMES.GLOSSARY}
        />
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
  const glossaryRes = await fetch(GLOSSARY_ENDPOINT);
  const glossaryJson = await glossaryRes.json();

  const guidesRes = await fetch(GUIDES_ENDPOINT);
  const guidesJson = await guidesRes.json();

  const guides = guidesJson.map(guide =>
    Object.assign({}, guide, {
      displayTitle: guide.acf.display_title
    })
  );

  return { glossary: glossaryJson, guides };
};

export default Glossary;
