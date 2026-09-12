import React from "react";

import MainLayout from "components/MainLayout";
import ContentPagesSidebar from "shared/ContentPagesSidebar";
import GuideLink from "shared/GuideLink";
import ServiceUnavailable from "components/shared/ServiceUnavailable";

import { flattenMenuItems, getMenuItemSlug, getMenuItemUrl, isMenuChildOf } from "lib";

import { ABOUT_MENU_ENDPOINT, GUIDES_ENDPOINT } from "constants/content-pages";
import { TITLE } from "constants/guides";

import contentCss from "stylesheets/content-pages.module.css";
import css from "stylesheets/guides.module.css";
import utils from "stylesheets/utils.module.css";
import { washObject } from "lib/washObject";
import {
  safeFetch,
  wpAuthFetchOptions,
  wpAcfUrl,
  wpDraftUrl,
  isUpstreamUnavailable,
  upstreamUnavailable,
  safeJson,
} from "lib/safeFetch";
import { cachedSafeFetch } from "lib/wpCache";

function Guides(props) {
  const { guides, sidebarItems, activeItemId, temporarilyUnavailable } = props;
  if (temporarilyUnavailable) return <ServiceUnavailable />;
  if (!Array.isArray(guides)) return null;
  return (
    <MainLayout pageTitle={TITLE}>
      <div
        className={`
        ${utils.container}
        ${contentCss.sidebarAndContentWrapper}
      `}
        data-cy={"content"}
      >
        <div className={utils.row}>
          <ContentPagesSidebar
            items={sidebarItems}
            activeItemId={activeItemId}
            className={contentCss.sidebar}
          />
          <div
            id="main"
            role="main"
            className={`${css.wrapper} ${utils.colXs12} ${utils.colMd8}`}
          >
            <ul className={utils.row}>
              {guides.map((guide, i) => (
                <li
                  key={i}
                  className={`${utils.colXs12} ${utils.colMd6} ${utils.colLg4} ${css.itemColumn}`}
                >
                  <GuideLink guide={guide} />
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}

export async function getServerSideProps(context) {
  const { draftMode } = context;
  const authOptions = wpAuthFetchOptions(draftMode);

  const aboutMenuRes = await cachedSafeFetch(ABOUT_MENU_ENDPOINT);

  if (isUpstreamUnavailable(aboutMenuRes)) {
    return upstreamUnavailable(context.res, aboutMenuRes);
  }
  if (!aboutMenuRes.ok) {
    return { notFound: true };
  }

  const aboutMenuJson = await safeJson(aboutMenuRes);
  if (aboutMenuJson === null) return upstreamUnavailable(context.res, aboutMenuRes);
  aboutMenuJson.items = flattenMenuItems(aboutMenuJson.items);
  const indexPageItem = aboutMenuJson.items.find(
    (item) => item.url === GUIDES_ENDPOINT,
  );

  if (!indexPageItem) {
    return { notFound: true };
  }

  const guides = (
    await Promise.all(
      aboutMenuJson.items
        .filter((item) => isMenuChildOf(item, indexPageItem))
        .map(async (guide) => {
          const menuUrl = wpAcfUrl(getMenuItemUrl(guide));
          const guideUrl = draftMode ? wpDraftUrl(menuUrl) : menuUrl;
          const guideRes = await safeFetch(guideUrl, authOptions);
          if (!guideRes?.ok) return null;
          const guideJson = await safeJson(guideRes);
          if (guideJson === null) return null;
          return {
            ...guide,
            slug: guideJson.slug ?? getMenuItemSlug(guide),
            summary: guideJson.acf.summary,
            title: guideJson.title.rendered,
            displayTitle: guideJson.acf.display_title,
            color: guideJson.acf.color,
            illustration: guideJson.acf.illustration,
          };
        }),
    )
  ).filter(Boolean);

  const props = washObject({
    guides,
    sidebarItems: aboutMenuJson.items,
    activeItemId: indexPageItem.url,
  });

  return {
    props: props,
  };
}

export default Guides;
