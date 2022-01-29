import React from "react";
import fetch from "isomorphic-fetch";
import Link from "next/link";
import striptags from "striptags";

import MainLayout from "components/MainLayout";
import BreadcrumbsModule from "shared/BreadcrumbsModule";
import ContentPagesSidebar from "shared/ContentPagesSidebar";

import {formatDate, decodeHTMLEntities, wordpressLinks} from "lib";

import {SITE_ENV} from "constants/env";
import {NEWS_TAGS} from "constants/news";
import {
    PRO_MENU_ENDPOINT,
    ABOUT_MENU_ENDPOINT,
    NEWS_ENDPOINT,
    SEO_TYPE
} from "constants/content-pages";

import {WORDPRESS_URL} from "constants/env";

import utils from "stylesheets/utils.module.scss";
import contentCss from "stylesheets/content-pages.module.scss";
import css from "stylesheets/news.module.scss";

class PostPage extends React.Component {
    refreshExternalLinks() {
        var links = document.getElementById("main").getElementsByTagName("a");
        wordpressLinks(links);
    }

    componentDidMount() {
        this.refreshExternalLinks();
    }

    componentDidUpdate() {
        this.refreshExternalLinks();
    }

    render() {
        const {content, menuItems, author, pageDescription} = this.props;
        let hasTags = false;
        NEWS_TAGS.forEach(tag => {
            if (content.tags.indexOf(tag.id) !== -1) {
                hasTags = true;
                return (<></>);
            }
        });
        return (
            <MainLayout
                pageTitle={content.title.rendered}
                seoType={SEO_TYPE}
                pageDescription={pageDescription}
            >
                <BreadcrumbsModule
                    breadcrumbs={[
                        {
                            title: "News",
                            url: "/news",
                            as: "/news"
                        },
                        {title: content.title.rendered}
                    ]}
                />
                <div
                    className={`${utils.container}
      ${contentCss.sidebarAndContentWrapper}`}
                >
                    <div className={utils.row}>
                        <ContentPagesSidebar
                            items={menuItems}
                            activeItemId={content.id}
                            className={contentCss.sidebar}
                            rootPath="wp"
                        />
                        <div className={`${utils.colXs12} ${utils.colMd7}`}>
                            <div id="main" role="main" className={contentCss.content}>
                                <h1
                                    dangerouslySetInnerHTML={{
                                        __html: content.title.rendered
                                    }}
                                />
                                <div className={css.resultSummary}>
                                    By{" "}
                                    <Link
                                        href={{
                                            pathname: "/news",
                                            query: Object.assign(
                                                {},
                                                {
                                                    author: author.id
                                                }
                                            )
                                        }}
                                    >
                                        <a title={`View more posts by ${author.name}`}>
                                            {author.name}
                                        </a>
                                    </Link>,{" "}
                                    {formatDate(content.date)}.
                                </div>
                                {hasTags &&
                                <div className={css.tags}>
                                    Published under:
                                    <ul>
                                        {content.tags.map(id => {
                                            const tag = NEWS_TAGS.filter(tag => tag.id === id)[0];
                                            return tag
                                                ? <li key={tag.id}>
                                                    <Link
                                                        href={`/news?tag=${tag.name
                                                            .toLowerCase()
                                                            .replace(" ", "-")}`}
                                                    >
                                                        <a title={`View more posts under ${tag.name}`}>
                                                            {tag.name}
                                                        </a>
                                                    </Link>
                                                </li>
                                                : null;
                                        })}
                                    </ul>
                                </div>}
                                <div
                                    dangerouslySetInnerHTML={{__html: content.content.rendered}}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </MainLayout>
        );
    }
}

export const getServerSideProps = async ({req, query, res}) => {
    // sidebar menu fetch
    const menuResponse = await fetch(
        SITE_ENV === "user" ? ABOUT_MENU_ENDPOINT : PRO_MENU_ENDPOINT
    );
    const menuJson = await menuResponse.json();

    // get news post
    const slug = query.slug;
    const postRes = await fetch(`${NEWS_ENDPOINT}?slug=${slug}`);
    const postJson = await postRes.json();

    // get author info
    const authorRes = await fetch(
        `${WORDPRESS_URL}/wp-json/wp/v2/users/${postJson[0].author}`
    );
    const authorJson = await authorRes.json();

    let pageDescription = "";
    if (postJson[0].excerpt && postJson[0].excerpt.rendered) {
        pageDescription = decodeHTMLEntities(
            striptags(postJson[0].excerpt.rendered.replace("[&hellip;]", "…"))
        );
    }

    return {
        props: {
            content: postJson[0], // endpoint returns array (WP doesnt allow duplicate slugs anyway)
            pageDescription: pageDescription,
            menuItems: menuJson.items,
            author: authorJson
        }
    };
};

export default PostPage;
