import React from "react";
import fetch from "isomorphic-fetch";

import MainLayout from "components/MainLayout";
import ContentPagesSidebar from "components/shared/ContentPagesSidebar";
import HeadingRule from "components/shared/HeadingRule";
import { classNames, stylesheet } from "css/pages/guide.css";
import {
  classNames as contentClasses,
  stylesheet as contentStyles
} from "css/pages/content-pages-wysiwyg.css";
import { ABOUT_MENU_ENDPOINT, SEO_TYPE } from "constants/content-pages";
import { classNames as utilClassNames } from "css/utils.css";

const Guides = ({ url, sidebarItems, guide }) =>
  <MainLayout route={url} pageTitle={guide.title} seoType={SEO_TYPE}>
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
        />
        <div className="col-xs-12 col-md-7">
          <div
            id="main"
            className={[classNames.content, contentClasses.content].join(" ")}
          >
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
  const guideRes = await fetch(guide.url);
  const guideJson = await guideRes.json();
  console.log(guideSlug);

  return {
    sidebarItems: menuItemsJson.items,
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
