import React from "react";
import fetch from "isomorphic-fetch";
import Link from "next/link";

import MainLayout from "components/MainLayout";
import FeatureHeader from "shared/FeatureHeader";
import ContentPagesSidebar from "components/shared/ContentPagesSidebar";

import { SITE_ENV } from "constants/env";
import { TITLE, DESCRIPTION } from "constants/news.js";
import {
  PRO_MENU_ENDPOINT,
  ABOUT_MENU_ENDPOINT,
  NEWS_ENDPOINT,
  SEO_TYPE
} from "constants/content-pages";

import {
  classNames as contentClasses,
  stylesheet as contentStyles
} from "css/pages/content-pages-wysiwyg.css";
import { classNames as utilClassNames } from "css/utils.css";

const NewsPage = ({ url, content, menuItems, newsItems, pageTitle }) =>
  <MainLayout route={url} pageTitle={pageTitle} seoType={SEO_TYPE}>
    <FeatureHeader title={TITLE} description={DESCRIPTION} />
    <div
      className={`${utilClassNames.container}
      ${contentClasses.sidebarAndContentWrapper}`}
    >
      <div className="row">
        <ContentPagesSidebar
          route={url}
          items={menuItems}
          activeItemId={content.id}
          rootPath="wp"
        />
        <div className="col-xs-12 col-md-7">
          <div id="main" className={contentClasses.content}>
            <h1>News Archive</h1>
            {newsItems.map((item, index) => {
              return (
                <div key={index}>
                  <h2>
                    <Link href={`/news/${item.slug}`}>
                      <a>{item.title.rendered}</a>
                    </Link>
                  </h2>
                  <div
                    dangerouslySetInnerHTML={{ __html: item.excerpt.rendered }}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
    <style dangerouslySetInnerHTML={{ __html: contentStyles }} />
  </MainLayout>;

NewsPage.getInitialProps = async ({ req, query, res }) => {
  // sidebar menu fetch
  const menuResponse = await fetch(
    SITE_ENV === "user" ? ABOUT_MENU_ENDPOINT : PRO_MENU_ENDPOINT
  );
  const menuJson = await menuResponse.json();
  const pageItem = menuJson.items.find(
    item => item.post_name.indexOf("news") === 0
  );

  // fetch “page content” (in this case nothing but needed for page title)
  const pageRes = await fetch(pageItem.url);
  const pageJson = await pageRes.json();

  // fetch news
  const newsRes = await fetch(NEWS_ENDPOINT);
  const newsItems = await newsRes.json();

  return {
    content: pageJson,
    menuItems: menuJson.items,
    newsItems: newsItems,
    pageTitle: pageItem.title
  };
};

export default NewsPage;
