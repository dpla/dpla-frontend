import React from "react";
import fetch from "isomorphic-fetch";
import Link from "next/link";
import striptags from "striptags";
import { withRouter } from "next/router";

import MainLayout from "components/MainLayout";
import BreadcrumbsModule from "shared/BreadcrumbsModule";
import ContentPagesSidebar from "shared/ContentPagesSidebar";
import WPEdit from "shared/WPEdit";

import { formatDate, decodeHTMLEntities } from "lib";

import { SITE_ENV } from "constants/env";
import { TITLE, DESCRIPTION, NEWS_TAGS } from "constants/news";
import {
  PRO_MENU_ENDPOINT,
  ABOUT_MENU_ENDPOINT,
  NEWS_ENDPOINT,
  SEO_TYPE
} from "constants/content-pages";
import { wordpressLinks } from "lib/externalLinks";
import { WORDPRESS_URL } from "constants/env";

import utils from "stylesheets/utils.scss";
import contentCss from "stylesheets/content-pages.scss";
import css from "stylesheets/news.scss";

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
    const { router, content, menuItems, author, pageDescription } = this.props;
    let hasTags = false;
    NEWS_TAGS.forEach(tag => {
      if (content.tags.indexOf(tag.id) !== -1) {
        hasTags = true;
        return;
      }
    });
    return (
      <MainLayout
        route={router}
        pageTitle={content.title.rendered}
        seoType={SEO_TYPE}
        pageDescription={pageDescription}
      >
        <BreadcrumbsModule
          breadcrumbs={[
            {
              title: "News",
              router: "/news",
              as: "/news"
            },
            { title: content.title.rendered }
          ]}
          route={router}
        />
        <div
          className={`${utils.container}
      ${contentCss.sidebarAndContentWrapper}`}
        >
          <div className="row">
            <ContentPagesSidebar
              route={router}
              items={menuItems}
              activeItemId={content.id}
              className={contentCss.sidebar}
              rootPath="wp"
            />
            <div className="col-xs-12 col-md-7">
              <div id="main" role="main" className={contentCss.content}>
                <WPEdit page={content} url={router} />
                <h1
                  dangerouslySetInnerHTML={{
                    __html: content.title.rendered
                  }}
                />
                <div className={css.resultSummary}>
                  <p>
                    Posted by{" "}
                    <Link
                      prefetch
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
                    </Link>{" "}
                    in {formatDate(content.date)}.
                  </p>
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
                                prefetch
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
    content: postJson[0], // endpoint returns array (WP doesnt allow duplicate slugs anyway)
    pageDescription: pageDescription,
    menuItems: menuJson.items,
    author: authorJson
  };
};

export default withRouter(PostPage);
