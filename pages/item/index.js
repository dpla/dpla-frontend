import React from "react";
import fetch from "isomorphic-fetch";

import MainLayout from "components/MainLayout";
import BreadcrumbsModule from "components/ItemComponents/BreadcrumbsModule";
import Content from "components/ItemComponents/Content";
import FaveAndCiteButtons from "components/shared/FaveAndCiteButtons";
import { API_KEY } from "constants/search";
import { classNames as utilClassNames } from "css/utils.css";
import {
  classNames,
  stylesheet
} from "components/ItemComponents/itemComponent.css";

const ItemDetail = ({ url, item }) =>
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
        { title: item.title[0], search: "" }
      ]}
      route={url}
    />
    <div
      className={[utilClassNames.module, classNames.contentWrapper].join(" ")}
    >
      <Content item={item} />
      <div className={classNames.faveAndCiteButtons}>
        <FaveAndCiteButtons />
      </div>
    </div>
    <style dangerouslySetInnerHTML={{ __html: stylesheet }} />
  </MainLayout>;

ItemDetail.getInitialProps = async ({ query }) => {
  const res = await fetch(
    `https://api.dp.la/v2/items/${query.itemId}?api_key=${API_KEY}`
  );
  const json = await res.json();

  return {
    item: Object.assign({}, json.docs[0].sourceResource, {
      thumbnailUrl: json.docs[0].object,
      contributor: json.docs[0].dataProvider,
      partner: json.docs[0].provider.name
    })
  };
};
export default ItemDetail;
