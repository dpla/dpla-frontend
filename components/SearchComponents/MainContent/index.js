import React from "react";
import { useRouter } from "next/router";

import ListView from "shared/ListView";
import Pagination from "shared/Pagination";
import Sidebar from "./Sidebar";
import AboutLocal from "./AboutLocal";

import { addLinkInfoToResults } from "lib";

import css from "./MainContent.module.scss";
import contentCss from "stylesheets/content-pages.module.scss";
import utils from "stylesheets/utils.module.scss";

function MainContent({
  results,
  facets,
  paginationInfo,
  hideSidebar,
  aboutness,
}) {
  const siteEnv = process.env.NEXT_PUBLIC_SITE_ENV;
  const router = useRouter();
  return (
    <div className={css.wrapper}>
      <div className={`${utils.container} ${css.mainContent}`}>
        {results.length > 0 && (
          <div className={`${!hideSidebar ? css.isOpen : ""} ${css.sidebar}`}>
            <Sidebar facets={facets} />
          </div>
        )}
        <main id="main" role="main" className={css.resultsAndPagination}>
          {results.length > 0 && (
            <ListView
              items={addLinkInfoToResults(results)}
              viewMode={router.query.list_view}
              behavior={"search"}
            />
          )}
          {results.length === 0 && (
            <div className={`${css.noResults} ${contentCss.content}`}>
              <p>Your search did not match any items.</p>
              <p>Some suggestions:</p>
              <ul>
                <li>make sure spelling is correct</li>
                <li>try different keywords</li>
                <li>try more general keywords</li>
                <li>try removing filters</li>
              </ul>
            </div>
          )}
          <Pagination
            itemsPerPage={paginationInfo.pageSize}
            currentPage={parseInt(paginationInfo.currentPage, 10)}
            totalItems={paginationInfo.pageCount}
            pageCount={Math.ceil(
              paginationInfo.pageCount / paginationInfo.pageSize,
            )}
          />
        </main>
      </div>
      {siteEnv === "local" && aboutness.docs && aboutness.docs.length > 0 && (
        <AboutLocal
          items={aboutness.docs}
          count={aboutness.count}
          query={router.query}
        />
      )}
    </div>
  );
}

export default MainContent;
