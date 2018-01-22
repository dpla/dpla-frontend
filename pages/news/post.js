import React from "react";
import fetch from "isomorphic-fetch";
import Link from "next/link";

import MainLayout from "components/MainLayout";
import Breadcrumbs from "components/Breadcrumbs";
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

import removeQueryParams from "/utilFunctions/removeQueryParams";

const { container } = utilClassNames;

const PostPage = ({ url, content, menuItems }) =>
  <MainLayout route={url} pageTitle={content.title} seoType={SEO_TYPE}>
    <div className={utilClassNames.breadcrumbsWrapper}>
      <div className={[container, utilClassNames.breadcrumbsModule].join(" ")}>
        <Breadcrumbs
          breadcrumbs={[
            {
              title: "News",
              url: "/news",
              as: "/news"
            },
            { title: content.title.rendered }
          ]}
          route={url}
        />
      </div>
    </div>
    <div
      className={`${utilClassNames.container}
      ${contentClasses.sidebarAndContentWrapper}`}
    >
      <div className="row">
        <ContentPagesSidebar
          route={url}
          items={menuItems}
          activeItemId={content.id}
          className={contentClasses.sidebar}
          rootPath="wp"
        />
        <div className="col-xs-12 col-md-7">
          <div id="main" className={contentClasses.content}>
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

PostPage.getInitialProps = async ({ req, query, res }) => {
  // sidebar menu fetch
  // TODO: feels odd to be querying this on every page that had the sidebar... refactor opportunity
  const menuResponse = await fetch(
    SITE_ENV === "user" ? ABOUT_MENU_ENDPOINT : PRO_MENU_ENDPOINT
  );
  const menuJson = await menuResponse.json();

  // get news post
  const slug = query.slug;
  const postRes = await fetch(`${NEWS_ENDPOINT}?slug=${slug}`);
  const postData = await postRes.json();

  return {
    content: postData[0], // endpoint returns array (WP doesnt allow duplicate slugs anyway)
    menuItems: menuJson.items
  };
};

export default PostPage;
