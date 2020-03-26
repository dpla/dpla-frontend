import React from "react";
import fetch from "isomorphic-fetch";

import MainLayout from "components/MainLayout";
import FeatureHeader from "shared/FeatureHeader";
import PartnerBrowseContent from "components/PartnerBrowseComponents";

import { getCurrentUrl } from "lib";
import { API_ENDPOINT } from "constants/items";
import { TITLE, DESCRIPTION } from "constants/browse-by-partner";
import { LOCALS } from "constants/local";
import { SITE_ENV, LOCAL_ID } from "constants/env";

import css from "components/PartnerBrowseComponents/PartnerBrowseContent.scss";

const PartnerBrowse = ({ partners, url }) =>
  <div>
    <MainLayout route={url} pageTitle={TITLE}>
      <div id="main" role="main">
        <FeatureHeader
          titleClassName={css.featureTitle}
          title={TITLE}
          description={DESCRIPTION}
        />
        <PartnerBrowseContent partners={partners} />
      </div>
    </MainLayout>
  </div>;

PartnerBrowse.getInitialProps = async ({ query, req }) => {
  const currentUrl = getCurrentUrl(req);
  let apiQuery = "";
  let facetName = "";
  let linkParam = "";

  if (SITE_ENV === "local") {
    const filtersParam = LOCALS[LOCAL_ID].filters.map(x => `&filter=${x}`).join("");
    apiQuery = `${currentUrl}${API_ENDPOINT}?facets=dataProvider&facet_size=1000${filtersParam}`;
    facetName = "dataProvider";
    linkParam = "provider";
  } else {
    apiQuery = `${currentUrl}${API_ENDPOINT}?facets=provider.name`;
    facetName = "provider.name";
    linkParam = "partner";
  }

  const res = await fetch(apiQuery);
  const json = await res.json();
  const partners = json.facets[facetName].terms.map(partner => ({
    name: partner.term,
    facet: linkParam,
    itemCount: partner.count
  }));
  return { partners };
};

export default PartnerBrowse;
