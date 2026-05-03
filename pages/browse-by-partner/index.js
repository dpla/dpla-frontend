import React from "react";

import MainLayout from "components/MainLayout";
import FeatureHeader from "shared/FeatureHeader";
import PartnerBrowseContent from "components/PartnerBrowseComponents";

import { DESCRIPTION, TITLE } from "constants/browse-by-partner";
import { LOCALS } from "constants/local";

import css from "components/PartnerBrowseComponents/PartnerBrowseContent.module.scss";
import { washObject } from "lib/washObject";
import { safeFetch, checkResponseForSSRSafe, upstreamUnavailable, isUpstreamUnavailable, safeJson } from "lib/safeFetch";
import ServiceUnavailable from "components/shared/ServiceUnavailable";

function PartnerBrowse({ partners, temporarilyUnavailable }) {
  if (temporarilyUnavailable) return <ServiceUnavailable />;
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

export const getServerSideProps = async ({ res }) => {
  const siteEnv = process.env.NEXT_PUBLIC_SITE_ENV;
  const localId = process.env.NEXT_PUBLIC_LOCAL_ID;

  let apiQuery;
  let facetName;
  let linkParam = "";

  const apiUrlBase = `${process.env.API_URL}/items?api_key=${process.env.API_KEY}&facet_size=1000`;

  if (siteEnv === "local") {
    const local = LOCALS[localId] ?? {};

    const filtersParam = (local.filters ?? []).map((x) => `&filter=${x}`).join("");
    const tagsParam = (local.tags ?? []).map((x) => `&tags=${x}`).join("");

    apiQuery = `${apiUrlBase}&facets=dataProvider${filtersParam}${tagsParam}`;
    facetName = "dataProvider";
    linkParam = "provider";
  } else {
    apiQuery = `${apiUrlBase}&facets=provider.name`;
    facetName = "provider.name";
    linkParam = "partner";
  }

  const fetchRes = await safeFetch(apiQuery);
  if (isUpstreamUnavailable(fetchRes)) {
    return upstreamUnavailable(res, fetchRes);
  }
  const resError = checkResponseForSSRSafe(fetchRes, "Partner browse");
  if (resError) return resError;
  const json = await safeJson(fetchRes);
  if (json === null) return upstreamUnavailable(context.res);
  const terms = json?.facets?.[facetName]?.terms;
  if (!Array.isArray(terms)) {
    return { notFound: true };
  }

  const partners = washObject(
    terms.map((partner) => ({
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
