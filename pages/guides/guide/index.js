import React from "react";
import fetch from "isomorphic-fetch";
import { withRouter } from "next/router";

import MainLayout from "components/MainLayout";
import ContentPagesSidebar from "shared/ContentPagesSidebar";
import HeadingRule from "shared/HeadingRule";
import BreadcrumbsModule from "shared/BreadcrumbsModule";

import { getMenuItemUrl, wordpressLinks } from "lib";

import { ABOUT_MENU_ENDPOINT, SEO_TYPE } from "constants/content-pages";

import contentCss from "stylesheets/content-pages.module.scss";
import css from "stylesheets/guides.module.scss";
import utils from "stylesheets/utils.module.scss"

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
    const { router, sidebarItems, breadcrumbs, guide } = this.props;
    return (
      <MainLayout route={router} pageTitle={guide.title} seoType={SEO_TYPE}>
        <BreadcrumbsModule breadcrumbs={breadcrumbs} route={router} />
        <div
          className={`${utils.container} ${contentCss.sidebarAndContentWrapper}`}
        >
          <div className={utils.row}>
            <ContentPagesSidebar
              route={router}
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

Guides.getInitialProps = async ({ query }) => {
  const menuItemsRes = await fetch(ABOUT_MENU_ENDPOINT);
  const menuItemsJson = await menuItemsRes.json();
  const guideSlug = query.guide;
  const guide = menuItemsJson.items.find(item => item.post_name === guideSlug);
  const guideRes = await fetch(getMenuItemUrl(guide));
  const guideJson = await guideRes.json();

  let breadcrumbs = [];
  breadcrumbs.push({
    title: "Guides",
    url: "/guides"
  });
  breadcrumbs.push({ title: guideJson.title.rendered });

  return {
    sidebarItems: menuItemsJson.items,
    breadcrumbs: breadcrumbs,
    guide: Object.assign({}, guideJson, {
      slug: guide.url,
      summary: guideJson.acf.summary,
      title: guideJson.title.rendered,
      color: guideJson.acf.color,
      bannerImage: guideJson.acf.banner_image,
      content: guideJson.content.rendered
    })
  };
};

export default withRouter(Guides);
