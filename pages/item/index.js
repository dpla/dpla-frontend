import React from "react";
import fetch from "isomorphic-fetch";

import MainLayout from "components/MainLayout";
import BreadcrumbsModule from "components/ItemComponents/BreadcrumbsModule";
import Content from "components/ItemComponents/Content";
import FaveAndCiteButtons from "components/shared/FaveAndCiteButtons";
import { API_ENDPOINT } from "constants/items";
import { getCurrentUrl } from "utilFunctions";
import { classNames as utilClassNames } from "css/utils.css";
import {
  classNames,
  stylesheet
} from "components/ItemComponents/itemComponent.css";
import { removeQueryParams, joinIfArray } from "utilFunctions";

const ItemDetail = ({ url, item }) =>
  <MainLayout route={url}>
    <BreadcrumbsModule
      breadcrumbs={[
        {
          title: url.query.q ? `Search for “${url.query.q}”` : "Search",
          url: {
            pathname: "/search/",
            query: removeQueryParams(url.query, ["itemId"])
          }
        },
        { title: joinIfArray(item.title), search: "" }
      ]}
      route={url}
    />
    <div
      className={[utilClassNames.module, classNames.contentWrapper].join(" ")}
    >
      <Content item={item} />
      <div className={classNames.faveAndCiteButtons}>
        <FaveAndCiteButtons toCite="item" />
      </div>
    </div>
    <style dangerouslySetInnerHTML={{ __html: stylesheet }} />
  </MainLayout>;

ItemDetail.getInitialProps = async ({ query, req }) => {
  const currentUrl = getCurrentUrl(req);
  const res = await fetch(`${currentUrl}${API_ENDPOINT}/${query.itemId}`);
  const json = await res.json();

  return {
    item: Object.assign({}, json.docs[0].sourceResource, {
      thumbnailUrl: json.docs[0].object,
      contributor: json.docs[0].dataProvider,
      partner: json.docs[0].provider.name,
      sourceUrl: json.docs[0].isShownAt
    })
  };
};
export default ItemDetail;
