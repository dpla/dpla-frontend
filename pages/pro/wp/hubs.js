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
import { stylesheet, classNames } from "css/pages/hubs.css";

const HubsPage = ({ url, page, items, children, pageTitle }) =>
  <MainLayout route={url} pageTitle={pageTitle} seoType={SEO_TYPE}>
    <div
      className={`${contentClasses.sidebarAndContentWrapper} ${classNames.pageWrapper}`}
    >
      <div className="row">
        <div
          id="main"
          className={`${classNames.sectionWrapper} site-max-width`}
        >
          <section>
            <IconComponent name="network" />
            <h1>{page.title.rendered}</h1>
            <ul>
              {children.map((child, index) => {
                return (
                  <li key={index} className={classNames.subsection}>
                    <h2>{child.post_title}</h2>
                  </li>
                );
              })}
            </ul>
            <div dangerouslySetInnerHTML={{ __html: page.content.rendered }} />
          </section>
        </div>
      </div>
    </div>
    <style dangerouslySetInnerHTML={{ __html: contentStyles }} />
    <style dangerouslySetInnerHTML={{ __html: stylesheet }} />
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
