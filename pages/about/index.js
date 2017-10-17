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

const AboutMenuPage = ({ url, content, items }) =>
  <MainLayout route={url}>
    <div
      className={`${utilClassNames.container}
      ${contentClasses.sidebarAndContentWrapper}`}
    >
      <div className="row">
        <ContentPagesSidebar
          route={url}
          items={items}
          activeItemId={content.id}
        />
        <div className="col-xs-12 col-md-7">
          <div
            className={contentClasses.content}
            dangerouslySetInnerHTML={{ __html: content.content.rendered }}
          />
        </div>
      </div>
    </div>
    <style dangerouslySetInnerHTML={{ __html: contentStyles }} />
  </MainLayout>;

AboutMenuPage.getInitialProps = async ({ req, query }) => {
  const url = query.section + query.subsection ? query.subsection : "";
  const res = await fetch(
    "https://dpla.wpengine.com/wp-json/menus/v1/menus/about-us"
  );
  const json = await res.json();
  const regex = new RegExp(url + "/$");
  const pageItem = json.items.find(item => item.url.match(regex));
  const pageRes = await fetch(pageItem.url);
  const pageJson = await pageRes.json();
  return { content: pageJson, items: json.items };
};

export default AboutMenuPage;
