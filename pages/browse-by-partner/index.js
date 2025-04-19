import React from "react";

import MainLayout from "components/MainLayout";
import FeatureHeader from "shared/FeatureHeader";
import PartnerBrowseContent from "components/PartnerBrowseComponents";

import { DESCRIPTION, TITLE } from "constants/browse-by-partner";
import { LOCALS } from "constants/local";
import { LOCAL_ID, SITE_ENV } from "constants/env";

import css from "components/PartnerBrowseComponents/PartnerBrowseContent.module.scss";
import { washObject } from "lib/washObject";

function PartnerBrowse(props) {
  const { partners } = props;
  return (
    <div>
      <MainLayout pageTitle={TITLE}>
        <div id="main" role="main">
          <FeatureHeader
            titleClassName={css.featureTitle}
            title={TITLE}
            description={DESCRIPTION}
          />
          <PartnerBrowseContent partners={partners} />
        </div>
      </MainLayout>
    </div>
  );
}

export const getServerSideProps = async () => {
  let apiQuery;
  let facetName;
  let linkParam = "";

  const apiUrlBase = `${process.env.API_URL}/items?api_key=${process.env.API_KEY}&facet_size=1000`;

  if (SITE_ENV === "local") {
    const local = LOCALS[LOCAL_ID];

    const filtersParam = local.filters
      ? local.filters.map((x) => `&filter=${x}`).join("")
      : [];

    const tagsParam = local.tags
      ? local.tags.map((x) => `&tags=${x}`).join("")
      : [];

    apiQuery = `${apiUrlBase}&facets=dataProvider${filtersParam}${tagsParam}`;
    facetName = "dataProvider";
    linkParam = "provider";
  } else {
    apiQuery = `${apiUrlBase}&facets=provider.name`;
    facetName = "provider.name";
    linkParam = "partner";
  }

  const res = await fetch(apiQuery);
  if (!res.ok) {
    if (res.status === 404) {
      return {
        notFound: true,
      };
    }
    throw new Error(`Response status: ${res.status}`);
  }
  const json = await res.json();

  const partners = washObject(
    json.facets[facetName].terms.map((partner) => ({
      name: partner.term,
      facet: linkParam,
      itemCount: partner.count,
    })),
  );

  return {
    props: {
      partners,
    },
  };
};

export default PartnerBrowse;
