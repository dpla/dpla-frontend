import React from "react";
import fetch from "isomorphic-fetch";

import MainLayout from "components/MainLayout";
import ContentPagesSidebar from "components/shared/ContentPagesSidebar";
import HeadingRule from "components/shared/HeadingRule";
import BreadcrumbsModule from "shared/BreadcrumbsModule";
import WPEdit from "shared/WPEdit";

import { getMenuItemUrl } from "utilFunctions";

import { ABOUT_MENU_ENDPOINT, SEO_TYPE } from "constants/content-pages";

import { classNames, stylesheet } from "css/pages/guide.css";
import {
  classNames as contentClasses,
  stylesheet as contentStyles
} from "css/pages/content-pages-wysiwyg.css";
import { classNames as utilClassNames } from "css/utils.css";

const Guides = ({ url, sidebarItems, breadcrumbs, guide }) =>
  <MainLayout route={url} pageTitle={guide.title} seoType={SEO_TYPE}>
    <BreadcrumbsModule breadcrumbs={breadcrumbs} route={url} />
    <div
      className={`
        ${utilClassNames.container}
        ${contentClasses.sidebarAndContentWrapper}
      `}
    >
      <div className="row">
        <ContentPagesSidebar
          route={url}
          items={sidebarItems}
          activeItemId={guide.slug}
          className={contentClasses.sidebar}
        />
        <div className="col-xs-12 col-md-7">
          <div
            id="main"
            role="main"
            className={[classNames.content, contentClasses.content].join(" ")}
          >
            <WPEdit page={guide} url={url} />
            <img
              src={guide.bannerImage}
              alt=""
              className={classNames.bannerImage}
            />
            <h1 className={classNames.guideTitle}>{guide.title}</h1>
            <HeadingRule />
            <div dangerouslySetInnerHTML={{ __html: guide.content }} />
          </div>
        </div>
      </div>
    </div>
    <style dangerouslySetInnerHTML={{ __html: stylesheet }} />
    <style dangerouslySetInnerHTML={{ __html: contentStyles }} />
  </MainLayout>;

Guides.getInitialProps = async ({ query }) => {
  const menuItemsRes = await fetch(ABOUT_MENU_ENDPOINT);
  const menuItemsJson = await menuItemsRes.json();
  const guideSlug = query.guide;
  const guide = menuItemsJson.items.find(item => item.post_name === guideSlug);
  const guideRes = await fetch(getMenuItemUrl(guide));
  const guideJson = await guideRes.json();

  let breadcrumbs = [];
  breadcrumbs.push({
    title: "Guides",
    url: "/guides"
  });
  breadcrumbs.push({ title: guideJson.title.rendered });

  return {
    sidebarItems: menuItemsJson.items,
    breadcrumbs: breadcrumbs,
    guide: Object.assign({}, guideJson, {
      slug: guide.url,
      summary: guideJson.acf.summary,
      title: guideJson.title.rendered,
      color: guideJson.acf.color,
      bannerImage: guideJson.acf.banner_image,
      content: guideJson.content.rendered
    })
  };
};

export default Guides;
