import React from "react";
import fetch from "isomorphic-fetch";

import MainLayout from "components/MainLayout";
import OptionsBar from "components/SearchComponents/OptionsBar";
import MainContent from "components/SearchComponents/MainContent";
import {
  classNames,
  stylesheet
} from "components/SearchComponents/SearchComponents.css";

const Search = ({ url, results }) =>
  <MainLayout>
    <div className={classNames.wrapper}>
      <OptionsBar route={url} itemCount={results.count} />
      <MainContent
        paginationInfo={{
          pageCount: results.count,
          pageSize: url.query.page_size || 10,
          currentPage: url.query.page || 1
        }}
        route={url}
        facets={results.facets}
        results={results.docs.map(doc =>
          Object.assign({}, doc.sourceResource, {
            thumbnailUrl: Array.isArray(doc.object)
              ? doc.object[0]
              : doc.object,
            sourceUrl: doc.isShownAt
          })
        )}
      />
    </div>
    <style dangerouslySetInnerHTML={{ __html: stylesheet }} />
  </MainLayout>;

const API_KEY = "fb4132db4a42b89f14effa41bf280672";
Search.getInitialProps = async ({ query }) => {
  // TODO: clean this up
  const facets = [
    "sourceResource.type",
    "sourceResource.subject.name",
    "sourceResource.spatial.name",
    "sourceResource.language.name",
    "dataProvider",
    "provider.name"
  ];

  const q = query.q || "";
  const page_size = query.page_size || 20;
  const page = query.page || 1;
  let sort_by = "";
  if (query.sort_by === "title") {
    sort_by = "sourceResource.title";
  } else if (query.sort_by === "created") {
    sort_by = "sourceResource.date.begin";
  }
  const sort_order = query.sort_order || "";

  const facetQueries = facets
    .map(facet => (query[facet] ? `${[facet]}=${query[facet]}` : ""))
    .filter(facetQuery => facetQuery !== "")
    .join("&");

  const res = await fetch(
    `https://api.dp.la/v2/items?q=${q}&page=${page}&page_size=${page_size}&sort_order=${sort_order}&sort_by=${sort_by}&api_key=${API_KEY}&facets=${facets.join(
      ","
    )}&${facetQueries}`
  );

  const json = await res.json();
  return { results: json };
};
export default Search;
