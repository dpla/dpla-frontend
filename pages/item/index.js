import React from "react";
import fetch from "isomorphic-fetch";

import MainLayout from "components/MainLayout";
import BreadcrumbsModule from "components/ItemComponents/BreadcrumbsModule";
// import {
//   classNames,
//   stylesheet
// } from "components/ItemComponents/ItemComponents.css";

const ItemDetail = ({ url, result }) =>
  <MainLayout route={url}>
    <BreadcrumbsModule
      breadcrumbs={[
        {
          title: url.query.q ? `Search for “${url.query.q}”` : "Search",
          url: {
            pathname: "/search/",
            query: url.query
          }
        },
        { title: "New York, New York", search: "" }
      ]}
      route={url}
    />
    <div>
      Hey
    </div>
  </MainLayout>;

// TODO: better API key storage?
const API_KEY = "fb4132db4a42b89f14effa41bf280672";
ItemDetail.getInitialProps = async ({ query }) => {
  const res = await fetch(`https://api.dp.la/v2/items?api_key=${API_KEY}`);

  const json = await res.json();
  return { result: json };
};
export default ItemDetail;
