import React from "react";
import Link from "next/link";

import MainLayout from "components/MainLayout";
import FeatureHeader from "shared/FeatureHeader";
import ContentPagesSidebar from "shared/ContentPagesSidebar";
import Pagination from "shared/Pagination";
import TagList from "components/NewsComponents/TagList";
import Button from "shared/Button";

import { formatDate } from "lib";

import { DESCRIPTION, NEWS_TAGS, TITLE } from "constants/news";
import {
  ABOUT_MENU_ENDPOINT,
  NEWS_ENDPOINT,
  PRO_MENU_ENDPOINT,
  SEO_TYPE,
} from "constants/content-pages";

import { DEFAULT_PAGE_SIZE } from "constants/search";

import contentCss from "stylesheets/content-pages.module.scss";
import css from "stylesheets/news.module.scss";
import utils from "stylesheets/utils.module.scss";
import { washObject } from "lib/washObject";

function NewsPage({
  menuItems,
  newsItems,
  pageItem,
  newsCount,
  newsPageCount,
  currentPage,
  currentTag,
  keywords,
  author,
}) {
  const resultSummary =
    `${author ? " by " + author.name : ""}` +
    `${currentTag ? " under " + currentTag.name : ""}` +
    `${keywords ? " with keywords “" + keywords + "”" : ""}`;

  return (
    <MainLayout pageTitle={pageItem.title} seoType={SEO_TYPE}>
      <FeatureHeader title={TITLE} description={DESCRIPTION} />
      <div
        className={`${utils.container} ${contentCss.sidebarAndContentWrapper}`}
      >
        <div className={utils.row}>
          <ContentPagesSidebar
            items={menuItems}
            activeItemId={pageItem.id}
            className={contentCss.sidebar}
            rootPath="wp"
          />
          <div className={`${utils.colXs12} ${utils.colMd7}`}>
            <div id="main" role="main" className={contentCss.content}>
              <h1>News Archive</h1>
              <form action="/news" method="get" className={css.search}>
                <input
                  type="text"
                  name="k"
                  aria-label="search news"
                  className={css.keywordsInput}
                  defaultValue={keywords}
                />
                {currentTag && (
                  <input type="hidden" name="tag" value={currentTag.slug} />
                )}
                {author && <input type="hidden" name="author" value={author} />}
                <Button
                  type="secondary"
                  size="medium"
                  className={css.searchButton}
                  mustSubmit={true}
                >
                  Search news
                </Button>
              </form>
              <TagList
                currentTag={currentTag}
                keywords={keywords}
                author={author}
              />
              <div className={css.resultSummary}>
                {newsCount === 0 && <p>No posts found{resultSummary}.</p>}
                {newsCount > 0 && (
                  <p>
                    {newsCount} post{newsCount !== 1 ? "s" : ""} found
                    {resultSummary}. Showing page {currentPage} of{" "}
                    {newsPageCount}.
                  </p>
                )}
              </div>
              {Array.isArray(newsItems) &&
                newsItems.map((item) => (
                  <article key={item.slug} className={css.newsItem}>
                    <h2 className={css.title}>
                      <Link
                        href={`/news/${item.slug}`}
                        dangerouslySetInnerHTML={{
                          __html: item.title.rendered,
                        }}
                      ></Link>
                    </h2>
                    <div
                      dangerouslySetInnerHTML={{
                        __html: item.excerpt.rendered,
                      }}
                    />
                    <div className={css.date}>{formatDate(item.date)}</div>
                  </article>
                ))}
              <Pagination
                itemsPerPage={DEFAULT_PAGE_SIZE}
                currentPage={parseInt(currentPage, 10)}
                totalItems={newsCount}
                pageCount={newsPageCount}
              />
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}

export async function getServerSideProps({ query }) {
  const siteEnv = process.env.NEXT_PUBLIC_SITE_ENV;
  const wordPressUrl = process.env.NEXT_PUBLIC_WORDPRESS_URL;

  // sidebar menu fetch
  const menuResponse = await fetch(
    siteEnv === "user" ? ABOUT_MENU_ENDPOINT : PRO_MENU_ENDPOINT,
  );
  if (!menuResponse.ok) {
    if (menuResponse.status === 404) {
      return {
        notFound: true,
      };
    }
    throw new Error("Couldn't load menu.");
  }
  const menuJson = await menuResponse.json();
  const pageItem = menuJson.items.find(
    (item) => item.post_name.indexOf("news") === 0,
  );

  // get author info
  const authorId =
    query.author && /[0-9]+/.test(query.author) ? query.author : "";
  const authorFilter = authorId !== "" ? `&author=${authorId}` : "";
  let authorJson = null;
  if (authorId !== "") {
    const authorRes = await fetch(
      `${wordPressUrl}/wp-json/wp/v2/users/${authorId}`,
    );
    if (!authorRes.ok) {
      if (authorRes.status === 404) {
        return {
          notFound: true,
        };
      }
      throw new Error("Couldn't load author.");
    }
    authorJson = await authorRes.json();
  }

  // fetch news
  const keywords = query.k ? `&search=${encodeURIComponent(query.k)}` : "";
  let page = query.page && /[0-9]+/.test(query.page) ? +query.page : 1;
  const tag =
    query.tag && query.tag !== ""
      ? NEWS_TAGS.filter((tag) => tag.slug === query.tag)?.[0]
      : null;
  let error = true;
  let maxRetries = 2;
  let retries = 0;
  let newsItems = [];
  let newsCount = 0;
  let newsPageCount = 0;
  // because people mess up with the query string and WP doesnt provide a proper fallback with page
  while (error && retries < maxRetries) {
    const tagFilter = tag ? `&tags=${tag.id}` : "";
    const url = `${NEWS_ENDPOINT}?per_page=${DEFAULT_PAGE_SIZE}&page=${page}${tagFilter}${keywords}${authorFilter}`;
    const newsRes = await fetch(url);
    newsItems = await newsRes.json();
    newsCount = newsRes.headers.get("X-WP-Total");
    newsPageCount = newsRes.headers.get("X-WP-TotalPages");
    error = newsItems.code !== undefined;
    if (error) page = 1;
    retries++;
  }

  const props = washObject({
    menuItems: menuJson.items,
    newsItems: newsItems,
    pageItem: pageItem,
    currentPage: page,
    newsCount: Number(newsCount),
    currentTag: tag,
    newsPageCount: Number(newsPageCount),
    keywords: query.k,
    author: authorJson || "",
  });

  return { props };
}

export default NewsPage;
