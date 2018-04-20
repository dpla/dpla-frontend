import React from "react";
import fetch from "isomorphic-fetch";

import MainLayout from "components/MainLayout";
import ContentPagesSidebar from "components/shared/ContentPagesSidebar";
import HeadingRule from "components/shared/HeadingRule";
import FeatureHeader from "shared/FeatureHeader";
import BreadcrumbsModule from "shared/BreadcrumbsModule";
import WPEdit from "shared/WPEdit";

import { PRO_MENU_ENDPOINT, SEO_TYPE } from "constants/content-pages";

import {
  endsWith,
  getBreadcrumbs,
  getItemWithId,
  getItemWithName,
  getMenuItemUrl
} from "lib";

import utils from "stylesheets/utils.scss";
import contentCss from "stylesheets/content-pages.scss";

const ProMenuPage = ({
  url,
  page,
  items,
  breadcrumbs,
  pageTitle,
  illustration
}) =>
  <MainLayout route={url} pageTitle={pageTitle} seoType={SEO_TYPE}>
    {breadcrumbs.length > 0 &&
      <BreadcrumbsModule breadcrumbs={breadcrumbs} route={url} />}
    {breadcrumbs.length === 0 &&
      !illustration &&
      <FeatureHeader title={pageTitle} description={""} />}
    <div
      className={`${utils.container}
      ${contentCss.sidebarAndContentWrapper}`}
    >
      <div className="row">
        <ContentPagesSidebar
          className={contentCss.sidebar}
          route={url}
          items={items}
          activeItemId={page.id}
          rootPath="wp"
        />
        <div className="col-xs-12 col-md-7">
          <div id="main" role="main" className={contentCss.content}>
            <WPEdit page={page} url={url} />
            {/* fancy pages (with illustrations) get special heading */}
            {illustration &&
              <div>
                <img
                  src={illustration.url}
                  alt=""
                  className={contentCss.bannerImage}
                />
                <HeadingRule />
                <h1
                  className={contentCss.title}
                  dangerouslySetInnerHTML={{ __html: page.title.rendered }}
                />
              </div>}
            {/* for non fancy pages, a normal heading */}
            {!illustration &&
              breadcrumbs.length !== 0 &&
              <h1 dangerouslySetInnerHTML={{ __html: page.title.rendered }} />}
            <div dangerouslySetInnerHTML={{ __html: page.content.rendered }} />
          </div>
        </div>
      </div>
    </div>
  </MainLayout>;

ProMenuPage.getInitialProps = async ({ req, query, res }) => {
  const pageName = query.subsection || query.section;
  const menuResponse = await fetch(PRO_MENU_ENDPOINT);
  const menuJson = await menuResponse.json();
  const menuItems = menuJson.items;
  const pageItem = menuItems.find(item => item.post_name === pageName);
  const pageRes = await fetch(getMenuItemUrl(pageItem));
  const pageJson = await pageRes.json();

  // for the breadcrumbs
  const breadcrumbObject = getBreadcrumbs({
    items: menuItems,
    leafId: pageItem.object_id
  });

  let breadcrumbs = [];

  if (JSON.stringify(breadcrumbObject) !== "{}") {
    Object.values(breadcrumbObject).map(crumb => {
      let slug = "/";
      let url = "/pro/wp?section=" + crumb.post_name;
      // if this is a child item the url is /:topsection/:thisitem
      if (crumb.menu_item_parent !== "0") {
        const parent = getItemWithId({
          items: menuItems,
          id: crumb.menu_item_parent
        });
        slug = slug + parent.post_name + "/";
      }
      // hubs homepage has different template
      if (crumb.post_name === "hubs") {
        url = "/pro/wp/hubs";
      }
      breadcrumbs.push({
        title: crumb.title,
        url: url,
        as: slug + crumb.post_name
      });
    });
    breadcrumbs.push({ title: pageItem.title });
  }

  return {
    page: pageJson,
    items: menuItems,
    pageTitle: pageItem.title,
    breadcrumbs: breadcrumbs,
    illustration: pageJson.acf.illustration
  };
};

export default ProMenuPage;
