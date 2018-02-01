import React from "react";
import fetch from "isomorphic-fetch";
import Link from "next/link";

import MainLayout from "components/MainLayout";
import BreadcrumbsModule from "shared/BreadcrumbsModule";
import ContentPagesSidebar from "components/shared/ContentPagesSidebar";
import WPEdit from "shared/WPEdit";

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

const { container } = utilClassNames;

const PostPage = ({ url, content, menuItems }) =>
  <MainLayout route={url} pageTitle={content.title.rendered} seoType={SEO_TYPE}>
    <BreadcrumbsModule
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
            <WPEdit page={content} url={url} />
            <h1
              dangerouslySetInnerHTML={{
                __html: content.title.rendered
              }}
            />
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
  const postJson = await postRes.json();

  return {
    content: postJson[0], // endpoint returns array (WP doesnt allow duplicate slugs anyway)
    menuItems: menuJson.items
  };
};

export default PostPage;
