import React from "react";

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
      <OptionsBar route={url} />
      <MainContent
        route={url}
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
  const q = query.q || "";
  const page_size = query.page_size || 20;
  const res = await fetch(
    `https://api.dp.la/v2/items?q=${q}&page_size=${page_size}&api_key=${API_KEY}`
  );

  const json = await res.json();
  return { results: json };
};
export default Search;
