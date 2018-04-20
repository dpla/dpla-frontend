import React from "react";
import fetch from "isomorphic-fetch";

import MainLayout from "components/MainLayout";
import FeatureHeader from "components/shared/FeatureHeader";
import PartnerBrowseContent from "components/PartnerBrowseComponents";

import { getCurrentUrl } from "lib";
import { API_ENDPOINT } from "constants/items";
import { TITLE, DESCRIPTION } from "constants/browse-by-partner";

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
  const res = await fetch(`${currentUrl}${API_ENDPOINT}?facets=provider.name`);
  const json = await res.json();
  const partners = json.facets["provider.name"].terms.map(partner => ({
    name: partner.term,
    itemCount: partner.count
  }));
  return { partners };
};

export default PartnerBrowse;
