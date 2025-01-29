import React from "react";

import { withRouter } from "next/router";

import MainLayout from "components/MainLayout";
import ContentPagesSidebar from "shared/ContentPagesSidebar";
import HeadingRule from "shared/HeadingRule";
import BreadcrumbsModule from "shared/BreadcrumbsModule";

import { getMenuItemUrl, wordpressLinks } from "lib";

import { ABOUT_MENU_ENDPOINT, SEO_TYPE } from "constants/content-pages";

import contentCss from "stylesheets/content-pages.module.scss";
import css from "stylesheets/guides.module.scss";
import utils from "stylesheets/utils.module.scss";
import { washObject } from "lib/washObject";

class Guides extends React.Component {
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
    const { sidebarItems, breadcrumbs, guide } = this.props;
    return (
      <MainLayout pageTitle={guide.title} seoType={SEO_TYPE}>
        <BreadcrumbsModule breadcrumbs={breadcrumbs} />
        <div
          className={`${utils.container} ${contentCss.sidebarAndContentWrapper}`}
          data-cy={"content"}
        >
          <div className={utils.row}>
            <ContentPagesSidebar
              items={sidebarItems}
              activeItemId={guide.slug}
              className={contentCss.sidebar}
            />
            <div className={`${utils.colXs12} ${utils.colMd7}`}>
              <div
                id="main"
                role="main"
                className={`${css.content} ${contentCss.content}`}
              >
                <img
                  src={guide.bannerImage}
                  alt=""
                  className={css.bannerImage}
                />
                <h1 className={css.guideTitle}>{guide.title}</h1>
                <HeadingRule />
                <div dangerouslySetInnerHTML={{ __html: guide.content }} />
              </div>
            </div>
          </div>
        </div>
      </MainLayout>
    );
  }
}

export async function getServerSideProps({ query }) {
  const menuItemsRes = await fetch(ABOUT_MENU_ENDPOINT);
  const menuItemsJson = await menuItemsRes.json();
  const guideSlug = query.guide;
  const guide = menuItemsJson.items.find(
    (item) => item.post_name === guideSlug,
  );
  const guideRes = await fetch(getMenuItemUrl(guide));
  const guideJson = await guideRes.json();

  let breadcrumbs = [];

  breadcrumbs.push({
    title: "Guides",
    url: "/guides",
  });

  breadcrumbs.push({ title: guideJson.title.rendered });

  const props = washObject({
    sidebarItems: menuItemsJson.items,
    breadcrumbs: breadcrumbs,
    guide: {
      ...guideJson,
      slug: guide.url,
      summary: guideJson.acf.summary,
      title: guideJson.title.rendered,
      color: guideJson.acf.color,
      bannerImage: guideJson.acf.banner_image,
      content: guideJson.content.rendered,
    },
  });

  return {
    props: props,
  };
}

export default withRouter(Guides);
