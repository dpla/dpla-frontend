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
import { safeFetch, checkResponseForSSR, wpAuthFetchOptions } from "lib/safeFetch";

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
                          <li key={`${tag.id}-${tag.name}`}>
                            <Link
                              href={`/news?tag=${tag.name
                                .toLowerCase()
                                .replace(" ", "-")}`}
                              title={`View more posts under ${tag.name}`}
                            >
                              {tag.name}
                            </Link>
                          </li>
                        ) : null;
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

export async function getServerSideProps(context) {
  const siteEnv = process.env.NEXT_PUBLIC_SITE_ENV;
  const wordpressUrl = process.env.NEXT_PUBLIC_WORDPRESS_URL;
  const { draftMode } = context;
  const authOptions = wpAuthFetchOptions(draftMode);

  // fetch sidebar menu and post in parallel (independent)
  const slug = context.params?.slug;
  // In draft mode, include unpublished posts and authenticate the request.
  // Always try slug lookup first; fall back to ID lookup for numeric slugs
  // only if the slug query returns no results (drafts have no slug in WP).
  const postParams = draftMode
    ? `?slug=${slug}&status=any&context=edit`
    : `?slug=${slug}`;

  // DEBUG: log preview state (remove after diagnosis)
  console.error(`[preview-debug] slug=${slug} draftMode=${draftMode} hasAuth=${!!authOptions} postParams=${postParams}`);

  const [menuResponse, postRes] = await Promise.all([
    safeFetch(siteEnv === "user" ? ABOUT_MENU_ENDPOINT : PRO_MENU_ENDPOINT),
    safeFetch(`${NEWS_ENDPOINT}${postParams}`, authOptions),
  ]);

  console.error(`[preview-debug] postRes status=${postRes?.status} ok=${postRes?.ok}`);

  const menuError = checkResponseForSSR(menuResponse);
  if (menuError) return menuError;
  const postError = checkResponseForSSR(postRes);
  if (postError) {
    console.error(`[preview-debug] postError returned notFound for slug=${slug}`);
    return postError;
  }

  const [menuJson, initialPostJson] = await Promise.all([
    menuResponse.json(),
    postRes.json(),
  ]);

  console.error(`[preview-debug] initialPostJson.length=${initialPostJson.length}`);

  // If slug lookup returned nothing and the slug is numeric, try ID lookup —
  // this handles draft posts which have no slug yet in WordPress.
  let postJson = initialPostJson;
  if (postJson.length === 0 && draftMode && /^\d+$/.test(slug)) {
    const byIdRes = await safeFetch(
      `${NEWS_ENDPOINT}?include=${slug}&status=any&context=edit`,
      authOptions,
    );
    console.error(`[preview-debug] byId fallback status=${byIdRes?.status} ok=${byIdRes?.ok}`);
    const byIdError = checkResponseForSSR(byIdRes);
    if (byIdError) {
      console.error(`[preview-debug] byId fallback returned notFound for slug=${slug}`);
      return byIdError;
    }
    postJson = await byIdRes.json();
    console.error(`[preview-debug] byId fallback postJson.length=${postJson.length}`);
  }

  if (postJson.length === 0) {
    console.error(`[preview-debug] final notFound for slug=${slug} draftMode=${draftMode}`);
    return {
      notFound: true,
    };
  }

  // get author info
  const authorRes = await safeFetch(
    `${wordpressUrl}/wp-json/wp/v2/users/${postJson[0].author}`,
  );

  const authorError = checkResponseForSSR(authorRes);
  if (authorError) return authorError;

  const authorJson = await authorRes.json();

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
