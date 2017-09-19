import React from "react";
import fetch from "isomorphic-fetch";

import MainLayout from "components/MainLayout";
import ContentPagesSidebar from "components/shared/ContentPagesSidebar";
import { classNames, stylesheet } from "css/pages/search-tips.css";
import {
  SEARCH_TIPS_ENDPOINT,
  CONTENT_PAGE_NAMES,
  GUIDES_ENDPOINT
} from "constants/content-pages";
import { classNames as utilClassNames } from "css/utils.css";

const SearchTips = ({ url, searchTips, guides }) =>
  <MainLayout route={url}>
    <div>
      <div
        className={[
          utilClassNames.module,
          classNames.sidebarAndContentWrapper
        ].join(" ")}
      >
        <ContentPagesSidebar
          route={url}
          guides={guides}
          page={CONTENT_PAGE_NAMES.SEARCH_TIPS}
        />
        <div className={classNames.content}>
          <div
            dangerouslySetInnerHTML={{ __html: searchTips.content.rendered }}
          />
        </div>
      </div>
    </div>
    <style dangerouslySetInnerHTML={{ __html: stylesheet }} />
  </MainLayout>;

SearchTips.getInitialProps = async () => {
  const searchTipsRes = await fetch(SEARCH_TIPS_ENDPOINT);
  const searchTipsJson = await searchTipsRes.json();

  const guidesRes = await fetch(GUIDES_ENDPOINT);
  const guidesJson = await guidesRes.json();
  const guides = guidesJson.map(guide =>
    Object.assign({}, guide, {
      title: guide.title.rendered
    })
  );

  return { searchTips: searchTipsJson, guides };
};

export default SearchTips;
