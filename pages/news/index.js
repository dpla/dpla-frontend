import React from "react";
import fetch from "isomorphic-fetch";
import Link from "next/link";

import MainLayout from "components/MainLayout";
import FeatureHeader from "shared/FeatureHeader";
import ContentPagesSidebar from "shared/ContentPagesSidebar";
import Pagination from "shared/Pagination";
import TagList from "components/NewsComponents/TagList";
import Button from "shared/Button";

import {formatDate} from "lib";

import {SITE_ENV, WORDPRESS_URL} from "constants/env";
import {DESCRIPTION, NEWS_TAGS, TITLE} from "constants/news";
import {ABOUT_MENU_ENDPOINT, NEWS_ENDPOINT, PRO_MENU_ENDPOINT, SEO_TYPE} from "constants/content-pages";

import {DEFAULT_PAGE_SIZE} from "constants/search";

import contentCss from "stylesheets/content-pages.module.scss";
import css from "stylesheets/news.module.scss";
import utils from "stylesheets/utils.module.scss"
import {washObject} from "lib/washObject";

class NewsPage extends React.Component {


    render() {
        const {
            menuItems,
            newsItems,
            pageItem,
            newsCount,
            newsPageCount,
            currentPage,
            currentTag,
            keywords,
            author
        } = this.props;

        const resultSummary = `${author
            ? " by " + author
            : ""}${currentTag
            ? " under " +
            NEWS_TAGS.filter(
                tag => tag.name.toLowerCase().replace(" ", "-") === currentTag
            )[0].name
            : ""}${keywords
            ? " with keywords “" + keywords + "”"
            : ""}`;

        return (
            <MainLayout pageTitle={pageItem.title} seoType={SEO_TYPE}>
                <FeatureHeader title={TITLE} description={DESCRIPTION}/>
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
                                <form
                                    action="/news"
                                    method="get"
                                    className={css.search}
                                >
                                    <input
                                        type="text"
                                        name="k"
                                        aria-label="search news"
                                        className={css.keywordsInput}
                                        defaultValue={keywords}
                                    />
                                    {currentTag !== "" &&
                                        <input type="hidden" name="tag" value={currentTag}/>}
                                    {author &&
                                        <input
                                            type="hidden"
                                            name="author"
                                            value={author}
                                        />}
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
                                    {newsCount === 0 &&
                                        <p>
                                            No posts found{resultSummary}.
                                        </p>}
                                    {newsCount > 0 &&
                                        <p>
                                            {newsCount} post{newsCount !== 1 ? "s" : ""} found{resultSummary}.
                                            Showing page {currentPage} of {newsPageCount}.
                                        </p>}
                                </div>
                                {newsItems.map((item, index) => {
                                    return (
                                        <article key={index} className={css.newsItem}>
                                            <h2 className={css.title}>
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
                                            <div className={css.date}>{formatDate(item.date)}</div>
                                        </article>
                                    );
                                })}
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
}

export const getServerSideProps = async ({query}) => {
    // sidebar menu fetch
    const menuResponse = await fetch(
        SITE_ENV === "user" ? ABOUT_MENU_ENDPOINT : PRO_MENU_ENDPOINT
    );
    const menuJson = await menuResponse.json();
    const pageItem = menuJson.items.find(
        item => item.post_name.indexOf("news") === 0
    );

    // get author info
    const author = query.author ? `&author=${query.author}` : "";
    let authorJson = null;
    if (author !== "") {
        const authorRes = await fetch(
            `${WORDPRESS_URL}/wp-json/wp/v2/users/${query.author}`
        );
        authorJson = await authorRes.json();
    }

    // fetch news
    const keywords = query.k ? `&search=${query.k}` : "";
    let page = query.page || 1;
    const tags = query.tag
        ? [
            NEWS_TAGS.filter(
                tag => tag.name.toLowerCase().replace(" ", "-") === query.tag
            )[0].id
        ]
        : [];

    let error = true;
    let maxRetries = 2;
    let retries = 0;
    let newsItems = [];
    let newsCount = 0;
    let newsPageCount = 0;
    // because people mess up with the query string and WP doesnt provide a proper fallback with page
    while (error && retries < maxRetries) {
        const filter = tags.length > 0 ? `&tags=${tags.join(",")}` : "";
        const url = `${NEWS_ENDPOINT}?per_page=${DEFAULT_PAGE_SIZE}&page=${page}${filter}${keywords}${author}`;
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
        currentTag: query.tag ? query.tag : "",
        newsPageCount: Number(newsPageCount),
        keywords: query.k ? query.k : "",
        author: authorJson ? authorJson : ""
    });


    return {props};
};

export default NewsPage;
