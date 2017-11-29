import React from "react";
import fetch from "isomorphic-fetch";

import MainLayout from "components/MainLayout";
import ContentPagesSidebar from "components/shared/ContentPagesSidebar";
import GuideLink from "components/shared/GuideLink";
import { classNames, stylesheet } from "css/pages/guides.css";
import { GUIDES_ENDPOINT, ABOUT_MENU_ENDPOINT } from "constants/content-pages";
import { classNames as utilClassNames } from "css/utils.css";
import {
  classNames as contentClasses,
  stylesheet as contentStyles
} from "css/pages/content-pages-wysiwyg.css";
import { TITLE } from "constants/guides";

const Guides = ({ url, guides, sidebarItems, activeItemId }) =>
  <MainLayout route={url} pageTitle={TITLE}>
    <div
      className={`
        ${utilClassNames.container}
        ${contentClasses.sidebarAndContentWrapper}
      `}
    >
      <div className="row">
        <ContentPagesSidebar
          route={url}
          items={sidebarItems}
          activeItemId={activeItemId}
        />
        <div id="main" className={`${classNames.wrapper} col-xs-12 col-md-8`}>
          <ul className="row">
            {guides.map((guide, i) =>
              <li
                key={i}
                className={`col-xs-12 col-md-6 col-lg-4 ${classNames.itemColumn}`}
              >
                <GuideLink guide={guide} />
              </li>
            )}
          </ul>
        </div>
      </div>
    </div>
    <style dangerouslySetInnerHTML={{ __html: stylesheet }} />
    <style dangerouslySetInnerHTML={{ __html: contentStyles }} />
  </MainLayout>;

Guides.getInitialProps = async () => {
  const aboutMenuRes = await fetch(ABOUT_MENU_ENDPOINT);
  const aboutMenuJson = await aboutMenuRes.json();
  const indexPageItem = aboutMenuJson.items.find(
    item => item.url === GUIDES_ENDPOINT
  );
  const guides = await Promise.all(
    aboutMenuJson.items
      .filter(item => item.menu_item_parent === indexPageItem.object_id)
      .map(async guide => {
        const guideRes = await fetch(guide.url);
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
