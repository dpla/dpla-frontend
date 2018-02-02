import React from "react";
import fetch from "isomorphic-fetch";
import Link from "next/link";

import MainLayout from "components/MainLayout";
import FeatureHeader from "shared/FeatureHeader";
import ContentPagesSidebar from "components/shared/ContentPagesSidebar";
import Pagination from "components/shared/Pagination";
import TagList from "components/NewsComponents/TagList";

import { SITE_ENV } from "constants/env";
import {
  TITLE,
  DESCRIPTION,
  ANNOUNCEMENTS_TAG_ID,
  CONTENT_SHOWCASE_TAG_ID,
  NEWS_TAGS
} from "constants/news";
import {
  PRO_MENU_ENDPOINT,
  ABOUT_MENU_ENDPOINT,
  NEWS_ENDPOINT,
  TAGS_ENDPOINT,
  SEO_TYPE
} from "constants/content-pages";
import { DEFAULT_PAGE_SIZE } from "constants/search";

import {
  classNames as contentClasses,
  stylesheet as contentStyles
} from "css/pages/content-pages-wysiwyg.css";
import { classNames as utilClassNames } from "css/utils.css";
import { classNames, stylesheet } from "css/pages/news.css";

const NewsPage = ({
  url,
  menuItems,
  newsItems,
  pageItem,
  newsCount,
  newsPageCount,
  currentTag,
  currentPage
}) =>
  <MainLayout route={url} pageTitle={pageItem.title} seoType={SEO_TYPE}>
    <FeatureHeader title={TITLE} description={DESCRIPTION} />
    <div
      className={`${utilClassNames.container}
      ${contentClasses.sidebarAndContentWrapper}`}
    >
      <div className="row">
        <ContentPagesSidebar
          route={url}
          items={menuItems}
          activeItemId={pageItem.id}
          className={contentClasses.sidebar}
          rootPath="wp"
        />
        <div className="col-xs-12 col-md-7">
          <div id="main" className={contentClasses.content}>
            <h1>News Archive</h1>
            <TagList currentTag={currentTag} url={url} />
            {newsItems.map((item, index) => {
              return (
                <div key={index} className={classNames.newsItem}>
                  <h2>
                    <Link
                      as={`/news/${item.slug}`}
                      href={`/news/post?slug=${item.slug}`}
                    >
                      <a
                        dangerouslySetInnerHTML={{
                          __html: item.title.rendered
                        }}
                      />
                    </Link>
                  </h2>
                  <div
                    dangerouslySetInnerHTML={{ __html: item.excerpt.rendered }}
                  />
                </div>
              );
            })}
            <Pagination
              route={url}
              itemsPerPage={DEFAULT_PAGE_SIZE}
              currentPage={parseInt(currentPage, 10)}
              totalItems={newsCount}
              pageCount={newsPageCount}
            />
          </div>
        </div>
      </div>
    </div>
    <style dangerouslySetInnerHTML={{ __html: contentStyles }} />
    <style dangerouslySetInnerHTML={{ __html: stylesheet }} />
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

  // fetch news
  const page = query.page || 1;
  const tags = query.tag ? [query.tag] : [];
  // if it is user, it must be constrained to only announcements and content showcase
  if (SITE_ENV === "user") {
    tags.push(ANNOUNCEMENTS_TAG_ID, CONTENT_SHOWCASE_TAG_ID);
  }
  const filter = tags.length > 0 ? `&tags=${tags.join(",")}` : "";
  const url = `${NEWS_ENDPOINT}?per_page=${DEFAULT_PAGE_SIZE}&page=${page}${filter}`;
  const newsRes = await fetch(url);
  console.log(url);
  const newsItems = await newsRes.json();
  const newsCount = newsRes.headers.get("X-WP-Total");
  const newsPageCount = newsRes.headers.get("X-WP-TotalPages");

  return {
    menuItems: menuJson.items,
    newsItems: newsItems,
    pageItem: pageItem,
    currentPage: page,
    newsCount: newsCount,
    currentTag: query.tag,
    newsPageCount: newsPageCount
  };
};

export default NewsPage;
