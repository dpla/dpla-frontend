import React from "react";
import fetch from "isomorphic-fetch";
import Link from "next/link";

import MainLayout from "components/MainLayout";
import FeatureHeader from "shared/FeatureHeader";
import ContentPagesSidebar from "components/shared/ContentPagesSidebar";
import Pagination from "components/shared/Pagination";
import TagList from "components/NewsComponents/TagList";
import Button from "shared/Button";

import { SITE_ENV } from "constants/env";
import { TITLE, DESCRIPTION, NEWS_TAGS } from "constants/news";
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

class NewsPage extends React.Component {
  state = {
    keywords: ""
  };

  handleKeyword(e) {
    this.setState({
      keywords: e.target.value
    });
  }

  render() {
    const {
      url,
      menuItems,
      newsItems,
      pageItem,
      newsCount,
      newsPageCount,
      currentTag,
      currentPage,
      keywords
    } = this.props;

    return (
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
              <div id="main" role="main" className={contentClasses.content}>
                <h1>News Archive</h1>
                <form action="/news" method="get" className={classNames.search}>
                  <input
                    type="text"
                    name="k"
                    className={classNames.keywordsInput}
                    defaultValue={keywords}
                    onChange={e => this.handleKeyword(e)}
                  />
                  <input type="hidden" name="tag" value={currentTag} />
                  <Button
                    type="secondary"
                    size="medium"
                    className={classNames.searchButton}
                    mustSubmit={true}
                  >
                    Search news
                  </Button>
                </form>
                <TagList
                  currentTag={currentTag}
                  url={url}
                  keywords={keywords}
                />
                {newsItems.length === 0 &&
                  <div>
                    No news found{keywords ? " for “" + keywords + "”" : ""}.
                  </div>}
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
                        dangerouslySetInnerHTML={{
                          __html: item.excerpt.rendered
                        }}
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
      </MainLayout>
    );
  }
}
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
  const keywords = query.k ? `&search=${query.k}` : "";
  const page = query.page || 1;
  const tags = query.tag
    ? [
        NEWS_TAGS.filter(
          tag => tag.name.toLowerCase().replace(" ", "-") === query.tag
        )[0].id
      ]
    : [];

  const filter = tags.length > 0 ? `&tags=${tags.join(",")}` : "";
  const url = `${NEWS_ENDPOINT}?per_page=${DEFAULT_PAGE_SIZE}&page=${page}${filter}${keywords}`;
  const newsRes = await fetch(url);

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
    newsPageCount: newsPageCount,
    keywords: query.k
  };
};

export default NewsPage;
