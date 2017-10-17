import React from "react";
import fetch from "isomorphic-fetch";
import Router from "next/router";

import MainLayout from "components/MainLayout";
import ContentPagesSidebar from "components/shared/ContentPagesSidebar";
import {
  classNames as contentClasses,
  stylesheet as contentStyles
} from "css/pages/content-pages-wysiwyg.css";
import { ABOUT_MENU_ENDPOINT, GUIDES_ENDPOINT } from "constants/content-pages";
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

AboutMenuPage.getInitialProps = async ({ req, query, res }) => {
  const pageName = query.subsection || query.section;
  const response = await fetch(ABOUT_MENU_ENDPOINT);
  const json = await response.json();

  const pageItem = json.items.find(item => item.post_name === pageName);
  console.log(pageItem);
  if (pageItem.url === GUIDES_ENDPOINT) {
    res.redirect("/guides");
    return {};
  }
  const pageRes = await fetch(pageItem.url);
  const pageJson = await pageRes.json();
  return { content: pageJson, items: json.items };
};

export default AboutMenuPage;
