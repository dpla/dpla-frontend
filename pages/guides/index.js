import React from "react";
import fetch from "isomorphic-fetch";

import MainLayout from "components/MainLayout";
import ContentPagesSidebar from "shared/ContentPagesSidebar";
import GuideLink from "shared/GuideLink";

import { getMenuItemUrl } from "lib";

import { PAGES_ENDPOINT, ABOUT_MENU_ENDPOINT } from "constants/content-pages";
import { API_SETTINGS_ENDPOINT } from "constants/site";
import { TITLE } from "constants/guides";

import contentCss from "stylesheets/content-pages.module.scss";
import css from "stylesheets/guides.module.scss";
import utils from "stylesheets/utils.module.scss"

const Guides = ({ guides, sidebarItems, activeItemId }) =>
  <MainLayout pageTitle={TITLE}>
    <div
      className={`
        ${utils.container}
        ${contentCss.sidebarAndContentWrapper}
      `}
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
            {guides.map((guide, i) =>
              <li
                key={i}
                className={`${utils.colXs12} ${utils.colMd6} ${utils.colLg4} ${css.itemColumn}`}
              >
                <GuideLink guide={guide} />
              </li>
            )}
          </ul>
        </div>
      </div>
    </div>
  </MainLayout>;

Guides.getInitialProps = async () => {
  // fetch page info
  // 1. fetch the settings from WP
  const settingsRes = await fetch(API_SETTINGS_ENDPOINT);
  const settingsJson = await settingsRes.json();
  // 2. get the corresponding value
  const endpoint = `${PAGES_ENDPOINT}/${settingsJson.acf.guides_endpoint}`;

  const aboutMenuRes = await fetch(ABOUT_MENU_ENDPOINT);
  const aboutMenuJson = await aboutMenuRes.json();
  const indexPageItem = aboutMenuJson.items.find(item => item.url === endpoint);

  const guides = await Promise.all(
    aboutMenuJson.items
      .filter(item => item.menu_item_parent === indexPageItem.object_id)
      .map(async guide => {
        const guideRes = await fetch(getMenuItemUrl(guide));
        const guideJson = await guideRes.json();
        return Object.assign({}, guide, {
          slug: guide.post_name,
          summary: guideJson.acf.summary,
          title: guideJson.title.rendered,
          displayTitle: guideJson.acf.display_title,
          color: guideJson.acf.color,
          illustration: guideJson.acf.illustration
        });
      })
  );

  return {
    guides,
    sidebarItems: aboutMenuJson.items,
    activeItemId: indexPageItem.url
  };
};

export default Guides;
