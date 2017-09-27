import React from "react";
import fetch from "isomorphic-fetch";

import MainLayout from "components/MainLayout";
import FeatureHeader from "components/shared/FeatureHeader";
import PartnerBrowseContent from "components/PartnerBrowseComponents";
import { API_ENDPOINT } from "constants/items";
import { getCurrentUrl } from "utilFunctions";
import { TITLE, DESCRIPTION } from "constants/browse-by-partner";
import { classNames } from "components/PartnerBrowseComponents/PartnerBrowseContent.css";

const PartnerBrowse = ({ partners, url }) =>
  <div>
    <MainLayout route={url}>
      <FeatureHeader
        titleClassName={classNames.featureTitle}
        title={TITLE}
        description={DESCRIPTION}
      />
      <PartnerBrowseContent partners={partners} />
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
