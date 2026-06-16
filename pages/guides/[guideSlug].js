import React from "react";

import { withRouter } from "next/router";

import MainLayout from "components/MainLayout";
import ContentPagesSidebar from "shared/ContentPagesSidebar";
import HeadingRule from "shared/HeadingRule";
import BreadcrumbsModule from "shared/BreadcrumbsModule";

import { getMenuItemUrl, wordpressLinks } from "lib/index";

import { ABOUT_MENU_ENDPOINT, PAGES_ENDPOINT, SEO_TYPE } from "constants/content-pages";

import contentCss from "stylesheets/content-pages.module.css";
import css from "stylesheets/guides.module.css";
import utils from "stylesheets/utils.module.css";
import { washObject } from "lib/washObject";
import { safeFetch, checkResponseForSSRSafe, wpAuthFetchOptions, wpDraftUrl, upstreamUnavailable, isUpstreamUnavailable, safeJson } from "lib/safeFetch";
import { cachedSafeFetch } from "lib/wpCache";
import { upgradeWordPressUrls } from "lib/upgradeWordPressUrls";
import ServiceUnavailable from "components/shared/ServiceUnavailable";

class Guides extends React.Component {
  refreshExternalLinks() {
    const main = document.getElementById("main");
    if (!main) return;
    const links = main.getElementsByTagName("a");
    wordpressLinks(links);
  }

  componentDidMount() {
    this.refreshExternalLinks();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.guide !== this.props.guide) {
      this.refreshExternalLinks();
    }
  }

  render() {
    const { sidebarItems, breadcrumbs, guide, temporarilyUnavailable } = this.props;
    if (temporarilyUnavailable) return <ServiceUnavailable />;
    if (!guide) return null;
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
                {guide.bannerImage && (
                  <img
                    src={guide.bannerImage}
                    alt=""
                    className={css.bannerImage}
                  />
                )}
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

export async function getServerSideProps(context) {
  const { draftMode } = context;
  const guideSlug = context.params.guideSlug;
  const authOptions = wpAuthFetchOptions(draftMode);

  const menuItemsRes = await cachedSafeFetch(ABOUT_MENU_ENDPOINT);
  if (isUpstreamUnavailable(menuItemsRes)) {
    return upstreamUnavailable(context.res, menuItemsRes);
  }
  const menuError = checkResponseForSSRSafe(menuItemsRes, "Guides menu");
  if (menuError) return menuError;
  const menuItemsJson = await safeJson(menuItemsRes);
  if (menuItemsJson === null) return upstreamUnavailable(context.res, menuItemsRes);

  // Falls back to a WP slug query when post_name diverges from the page slug (e.g. WP page was renamed).
  let guide = menuItemsJson.items.find((item) => item.post_name === guideSlug);
  let guideJson;

  if (guide) {
    const guideUrl = draftMode ? wpDraftUrl(getMenuItemUrl(guide)) : getMenuItemUrl(guide);
    const guideRes = await safeFetch(guideUrl, authOptions);
    if (isUpstreamUnavailable(guideRes)) return upstreamUnavailable(context.res, guideRes);
    const guideError = checkResponseForSSRSafe(guideRes, "Guide page");
    if (guideError) return guideError;
    guideJson = await safeJson(guideRes);
    if (guideJson === null) return upstreamUnavailable(context.res, guideRes);
  } else {
    const slugUrl = `${PAGES_ENDPOINT}?slug=${encodeURIComponent(guideSlug)}`;
    const slugRes = await safeFetch(
      draftMode ? wpDraftUrl(slugUrl) : slugUrl,
      authOptions,
    );
    if (isUpstreamUnavailable(slugRes)) return upstreamUnavailable(context.res, slugRes);
    if (!slugRes?.ok) return { notFound: true };
    const pages = await safeJson(slugRes);
    if (pages === null) return upstreamUnavailable(context.res, slugRes);
    if (!pages.length) return { notFound: true };
    guideJson = pages[0];
    guide = menuItemsJson.items.find(
      (item) => {
        const menuItemUrl = getMenuItemUrl(item);
        return (
          String(item.object_id) === String(guideJson.id) ||
          menuItemUrl.endsWith(`/${guideJson.id}`)
        );
      },
    );
    if (!guide) return { notFound: true };
  }

  const breadcrumbs = [
    {
      title: "Guides",
      url: "/guides",
    },
    { title: guideJson.title.rendered },
  ];

  const props = washObject({
    sidebarItems: menuItemsJson.items,
    breadcrumbs: breadcrumbs,
    guide: {
      ...guideJson,
      slug: guide.url,
      summary: guideJson.acf?.summary,
      title: guideJson.title.rendered,
      color: guideJson.acf?.color,
      bannerImage: guideJson.acf?.banner_image,
      content: upgradeWordPressUrls(guideJson.content?.rendered),
    },
  });

  return {
    props: props,
  };
}

export default withRouter(Guides);
