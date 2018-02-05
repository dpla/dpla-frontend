import React from "react";
import fetch from "isomorphic-fetch";
import Router from "next/router";

import MainLayout from "components/MainLayout";
import ContentPagesSidebar from "components/shared/ContentPagesSidebar";
import FeatureHeader from "shared/FeatureHeader";
import BreadcrumbsModule from "shared/BreadcrumbsModule";
import WPEdit from "shared/WPEdit";

import {
  ABOUT_MENU_ENDPOINT,
  GUIDES_ENDPOINT,
  SEO_TYPE
} from "constants/content-pages";
import { getBreadcrumbs, getItemWithId, getItemWithName } from "utilFunctions";

import {
  classNames as contentClasses,
  stylesheet as contentStyles
} from "css/pages/content-pages-wysiwyg.css";
import { classNames as utilClassNames } from "css/utils.css";

const AboutMenuPage = ({ url, content, items, breadcrumbs, pageTitle }) =>
  <MainLayout route={url} pageTitle={pageTitle} seoType={SEO_TYPE}>
    {breadcrumbs.length > 0 &&
      <BreadcrumbsModule breadcrumbs={breadcrumbs} route={url} />}
    {breadcrumbs.length === 0 &&
      <FeatureHeader title={pageTitle} description={""} />}
    <div
      className={`${utilClassNames.container}
      ${contentClasses.sidebarAndContentWrapper}`}
    >
      <div className="row">
        <ContentPagesSidebar
          route={url}
          items={items}
          activeItemId={content.id}
          className={contentClasses.sidebar}
        />
        <div className="col-xs-12 col-md-7">
          <div id="main" role="main" className={contentClasses.content}>
            <WPEdit page={content} url={url} />
            <h1>{content.title.rendered}</h1>
            <div
              dangerouslySetInnerHTML={{ __html: content.content.rendered }}
            />
          </div>
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
  const guidesPageItem = json.items.find(item => item.url === GUIDES_ENDPOINT);
  if (pageItem === guidesPageItem) {
    if (res) {
      res.redirect("/guides");
    } else {
      Router.push("/guides");
    }
    return {};
  } else if (pageItem.menu_item_parent === guidesPageItem.object_id) {
    if (res) {
      res.redirect(`/guides/guide?guide=${pageItem.post_name}`);
    } else {
      Router.push(
        `/guides/guide?guide=${pageItem.post_name}`,
        `/guides/${pageItem.post_name}`
      );
    }
    return {};
  }

  // for the breadcrumbs
  const breadcrumbObject = getBreadcrumbs({
    items: json.items,
    leafId: pageItem.object_id
  });

  let breadcrumbs = [];

  if (JSON.stringify(breadcrumbObject) !== "{}") {
    Object.values(breadcrumbObject).map(crumb => {
      let slug = "/";
      let url = "/about?section=" + crumb.post_name;
      // if this is a child item the url is /:topsection/:thisitem
      if (crumb.menu_item_parent !== "0") {
        const parent = getItemWithId({
          items: json.items,
          id: crumb.menu_item_parent
        });
        slug = slug + parent.post_name + "/";
      }
      breadcrumbs.push({
        title: crumb.title,
        url: url,
        as: slug + crumb.post_name
      });
    });
    breadcrumbs.push({ title: pageItem.title });
  }

  const pageRes = await fetch(pageItem.url);
  const pageJson = await pageRes.json();
  return {
    content: pageJson,
    items: json.items,
    breadcrumbs: breadcrumbs,
    pageTitle: pageItem.title
  };
};

export default AboutMenuPage;
