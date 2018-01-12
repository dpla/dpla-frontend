import React from "react";
import fetch from "isomorphic-fetch";

import MainLayout from "components/MainLayout";
import ContentPagesSidebar from "components/shared/ContentPagesSidebar";

import { PRO_MENU_ENDPOINT, SEO_TYPE } from "constants/content-pages";

import {
  classNames as contentClasses,
  stylesheet as contentStyles
} from "css/pages/content-pages-wysiwyg.css";
import { classNames as utilClassNames } from "css/utils.css";

const ProMenuPage = ({ url, content, items, pageTitle }) =>
  <MainLayout route={url} pageTitle={pageTitle} seoType={SEO_TYPE}>
    <div
      className={`${utilClassNames.container}
      ${contentClasses.sidebarAndContentWrapper}`}
    >
      <div className="row">
        <ContentPagesSidebar
          route={url}
          items={items}
          activeItemId={content.id}
          rootPath="wp"
        />
        <div className="col-xs-12 col-md-7">
          <div
            id="main"
            className={contentClasses.content}
            dangerouslySetInnerHTML={{ __html: content.content.rendered }}
          />
        </div>
      </div>
    </div>
    <style dangerouslySetInnerHTML={{ __html: contentStyles }} />
  </MainLayout>;

ProMenuPage.getInitialProps = async ({ req, query, res }) => {
  const pageName = query.subsection || query.section;
  const menuResponse = await fetch(PRO_MENU_ENDPOINT);
  const menuJson = await menuResponse.json();
  const pageItem = menuJson.items.find(item => item.post_name === pageName);
  const pageRes = await fetch(pageItem.url);
  const pageJson = await pageRes.json();

  return {
    content: pageJson,
    items: menuJson.items,
    pageTitle: pageItem.title
  };
};

export default ProMenuPage;
