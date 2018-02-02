import React from "react";
import fetch from "isomorphic-fetch";
import Link from "next/link";

import MainLayout from "components/MainLayout";
import BreadcrumbsModule from "shared/BreadcrumbsModule";
import ContentPagesSidebar from "components/shared/ContentPagesSidebar";
import WPEdit from "shared/WPEdit";

import { SITE_ENV } from "constants/env";
import { TITLE, DESCRIPTION, NEWS_TAGS } from "constants/news";
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
import { classNames, stylesheet } from "css/pages/news.css";

const { container } = utilClassNames;

const PostPage = ({ url, content, menuItems }) => {
  let hasTags = false;
  NEWS_TAGS.forEach(tag => {
    if (content.tags.indexOf(tag.id) !== -1) {
      hasTags = true;
      return;
    }
  });
  return (
    <MainLayout
      route={url}
      pageTitle={content.title.rendered}
      seoType={SEO_TYPE}
    >
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
              {hasTags &&
                <div className={classNames.tags}>
                  Published under:
                  <ul>
                    {content.tags.map(id => {
                      const tag = NEWS_TAGS.filter(tag => tag.id === id)[0];
                      return tag
                        ? <li key={tag.id}>
                            <Link
                              prefetch
                              as={`/news?tag=${tag.name
                                .toLowerCase()
                                .replace(" ", "-")}`}
                              href={`/news?tag=${tag.name
                                .toLowerCase()
                                .replace(" ", "-")}`}
                            >
                              <a>{tag.name}</a>
                            </Link>
                          </li>
                        : null;
                    })}
                  </ul>
                </div>}
              <div
                dangerouslySetInnerHTML={{ __html: content.content.rendered }}
              />
            </div>
          </div>
        </div>
      </div>
      <style dangerouslySetInnerHTML={{ __html: contentStyles }} />
      <style dangerouslySetInnerHTML={{ __html: stylesheet }} />
    </MainLayout>
  );
};

PostPage.getInitialProps = async ({ req, query, res }) => {
  // sidebar menu fetch
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
