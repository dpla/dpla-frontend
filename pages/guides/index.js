import React from "react";
import Link from "next/link";
import fetch from "isomorphic-fetch";

import MainLayout from "components/MainLayout";
import ContentPagesSidebar from "components/shared/ContentPagesSidebar";
import GuideLink from "components/shared/GuideLink";
import { classNames, stylesheet } from "css/pages/guides.css";
import { GUIDES_ENDPOINT, CONTENT_PAGE_NAMES } from "constants/content-pages";
import { classNames as utilClassNames } from "css/utils.css";

const Guides = ({ url, guides }) =>
  <MainLayout route={url}>
    <div>
      <div
        className={[
          utilClassNames.module,
          classNames.sidebarAndContentWrapper
        ].join(" ")}
      >
        <ContentPagesSidebar route={url} guides={guides} page={CONTENT_PAGE_NAMES.GUIDES} />
        <div className={classNames.content}>
          <h1 className={classNames.header}>
            How can I use DPLA?
          </h1>
          <ul className={`${classNames.links} row`}>
            {guides.map((guide, i) =>
              <li
                key={i}
                className={`col-xs-12 col-md-6 col-lg-4 ${classNames.itemColumn}`}
              >
                <GuideLink guide={guide} route={url} />
              </li>
            )}
          </ul>
        </div>
      </div>
    </div>
    <style dangerouslySetInnerHTML={{ __html: stylesheet }} />
  </MainLayout>;

Guides.getInitialProps = async () => {
  const res = await fetch(GUIDES_ENDPOINT);
  const json = await res.json();
  const guides = json.map(guide =>
    Object.assign({}, guide, {
      summary: guide.acf.summary,
      title: guide.title.rendered,
      color: guide.acf.color,
      illustration: guide.acf.illustration
    })
  );

  return { guides };
};

export default Guides;
