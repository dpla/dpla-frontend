import React from "react";
import Link from "next/link";
import striptags from "striptags";

import MainLayout from "components/MainLayout";
import BreadcrumbsModule from "shared/BreadcrumbsModule";
import ContentPagesSidebar from "shared/ContentPagesSidebar";

import { formatDate, decodeHTMLEntities, wordpressLinks } from "lib";

import { NEWS_TAGS } from "constants/news";
import {
  PRO_MENU_ENDPOINT,
  ABOUT_MENU_ENDPOINT,
  NEWS_ENDPOINT,
  SEO_TYPE,
} from "constants/content-pages";

import utils from "stylesheets/utils.module.scss";
import contentCss from "stylesheets/content-pages.module.scss";
import css from "stylesheets/news.module.scss";
import { washObject } from "lib/washObject";

class PostPage extends React.Component {
  refreshExternalLinks() {
    const links = document.getElementById("main").getElementsByTagName("a");
    wordpressLinks(links);
  }

  componentDidMount() {
    this.refreshExternalLinks();
  }

  componentDidUpdate() {
    this.refreshExternalLinks();
  }

  render() {
    const { content, menuItems, author, pageDescription } = this.props;
    let hasTags = false;
    NEWS_TAGS.forEach((tag) => {
      if (content.tags.indexOf(tag.id) !== -1) {
        hasTags = true;
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
              as: "/news",
            },
            { title: content.title.rendered },
          ]}
        />
        <div
          className={`${utils.container} ${contentCss.sidebarAndContentWrapper}`}
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
                    __html: content.title.rendered,
                  }}
                />
                {author && (
                  <div className={css.resultSummary}>
                    By{" "}
                    <Link
                      href={{
                        pathname: "/news",
                        query: {
                          author: author.id,
                        },
                      }}
                      title={`View more posts by ${author.name}`}
                    >
                      {author.name}
                    </Link>
                    , {formatDate(content.date)}.
                  </div>
                )}
                {hasTags && (
                  <div className={css.tags}>
                    Published under:
                    <ul>
                      {content.tags.map((id) => {
                        const tag = NEWS_TAGS.filter((tag) => tag.id === id)[0];
                        return tag ? (
                          <li key={tag.id}>
                            <Link
                              href={`/news?tag=${tag.name
                                .toLowerCase()
                                .replace(" ", "-")}`}
                              title={`View more posts under ${tag.name}`}
                            >
                              {tag.name}
                            </Link>
                          </li>
                        ) : (
                          <></>
                        );
                      })}
                    </ul>
                  </div>
                )}
                <div
                  dangerouslySetInnerHTML={{ __html: content.content.rendered }}
                />
              </div>
            </div>
          </div>
        </div>
      </MainLayout>
    );
  }
}

export async function getServerSideProps({ query }) {
  const siteEnv = process.env.NEXT_PUBLIC_SITE_ENV;
  const wordpressUrl = process.env.NEXT_PUBLIC_WORDPRESS_URL;

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
    throw new Error("Couldn't load about menu.");
  }

  const menuJson = await menuResponse.json();

  // get news post
  const slug = query.slug;
  const postRes = await fetch(`${NEWS_ENDPOINT}?slug=${slug}`);
  if (!postRes.ok) {
    if (postRes.status === 404) {
      return {
        notFound: true,
      };
    }
    throw new Error("Couldn't load post.");
  }
  const postJson = await postRes.json();
  if (postJson.length === 0) {
    return {
      notFound: true,
    };
  }

  // get author info
  const authorRes = await fetch(
    `${wordpressUrl}/wp-json/wp/v2/users/${postJson[0].author}`,
  );

  if (!authorRes.ok) {
    if (authorRes.status === 404) {
      return {
        notFound: true,
      };
    }
    throw new Error("Couldn't load author.");
  }

  const authorJson = authorRes.ok ? await authorRes.json() : {};

  let pageDescription = "";
  if (postJson[0].excerpt && postJson[0].excerpt.rendered) {
    pageDescription = decodeHTMLEntities(
      striptags(postJson[0].excerpt.rendered.replace("[&hellip;]", "…")),
    );
  }

  const props = washObject({
    content: postJson[0], // endpoint returns array (WP doesnt allow duplicate slugs anyway)
    pageDescription: pageDescription,
    menuItems: menuJson.items,
    author: authorJson,
  });

  return {
    props: props,
  };
}

export default PostPage;
