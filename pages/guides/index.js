import React from "react";

import MainLayout from "components/MainLayout";
import ContentPagesSidebar from "shared/ContentPagesSidebar";
import GuideLink from "shared/GuideLink";
import ServiceUnavailable from "components/shared/ServiceUnavailable";

import { getMenuItemUrl } from "lib";

import { ABOUT_MENU_ENDPOINT, PAGES_ENDPOINT } from "constants/content-pages";
import { API_SETTINGS_ENDPOINT } from "constants/site";
import { TITLE } from "constants/guides";

import contentCss from "stylesheets/content-pages.module.scss";
import css from "stylesheets/guides.module.scss";
import utils from "stylesheets/utils.module.scss";
import { washObject } from "lib/washObject";
import {
  safeFetch,
  wpAuthFetchOptions,
  wpDraftUrl,
  isUpstreamUnavailable,
  upstreamUnavailable,
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

  const [settingsRes, aboutMenuRes] = await Promise.all([
    cachedSafeFetch(API_SETTINGS_ENDPOINT),
    cachedSafeFetch(ABOUT_MENU_ENDPOINT),
  ]);

  if (isUpstreamUnavailable(settingsRes) || isUpstreamUnavailable(aboutMenuRes)) {
    return upstreamUnavailable(context.res, settingsRes, aboutMenuRes);
  }
  if (!settingsRes.ok || !aboutMenuRes.ok) {
    return { notFound: true };
  }

  const settingsJson = await settingsRes.json();
  const endpoint = `${PAGES_ENDPOINT}/${settingsJson.acf.guides_endpoint}`;
  const aboutMenuJson = await aboutMenuRes.json();
  const indexPageItem = aboutMenuJson.items.find(
    (item) => item.url === endpoint,
  );

  const guides = (
    await Promise.all(
      aboutMenuJson.items
        .filter((item) => item.menu_item_parent === indexPageItem.object_id)
        .map(async (guide) => {
          const guideUrl = draftMode
            ? wpDraftUrl(getMenuItemUrl(guide))
            : getMenuItemUrl(guide);
          const guideRes = await safeFetch(guideUrl, authOptions);
          if (!guideRes?.ok) return null;
          const guideJson = await guideRes.json();
          return {
            ...guide,
            slug: guideJson.slug ?? guide.post_name,
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
