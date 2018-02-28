import React from "react";
import fetch from "isomorphic-fetch";

import MainLayout from "components/MainLayout";
import ContentPagesSidebar from "shared/ContentPagesSidebar";
import IconComponent from "shared/IconComponent";

import {
  PRO_MENU_ENDPOINT,
  PAGES_ENDPOINT,
  SEO_TYPE
} from "constants/content-pages";
import { getBreadcrumbs, getItemWithId, getItemWithName } from "utilFunctions";

import {
  classNames as contentClasses,
  stylesheet as contentStyles
} from "css/pages/content-pages-wysiwyg.css";
import { classNames as utilClassNames } from "css/utils.css";

const HubsPage = ({ url, page, items, pageTitle }) =>
  <MainLayout route={url} pageTitle={pageTitle} seoType={SEO_TYPE}>
    <div
      className={`${utilClassNames.container}
      ${contentClasses.sidebarAndContentWrapper}`}
    >
      <div className="row">
        <IconComponent name="network" />
        <div id="main" className={contentClasses.content}>
          <h1>{page.title.rendered}</h1>
          <div dangerouslySetInnerHTML={{ __html: page.content.rendered }} />
        </div>
      </div>
    </div>
    <style dangerouslySetInnerHTML={{ __html: contentStyles }} />
  </MainLayout>;

HubsPage.getInitialProps = async ({ req, query, res }) => {
  const menuResponse = await fetch(PRO_MENU_ENDPOINT);
  const menuJson = await menuResponse.json();
  const menuItems = menuJson.items;
  const hubItem = menuItems.find(item => item.post_name === "hubs");
  const hubRes = await fetch(hubItem.url);
  const hubJson = await hubRes.json();

  const children = menuItems.filter(
    item => item.menu_item_parent === hubItem.object_id
  );

  return {
    page: hubJson,
    items: menuItems,
    children: children,
    pageTitle: hubItem.title
  };
};

export default HubsPage;
