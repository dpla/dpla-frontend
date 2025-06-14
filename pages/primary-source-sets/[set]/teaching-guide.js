import React from "react";
import { withRouter } from "next/router";

import MainLayout from "components/MainLayout";
import PSSFooter from "components/PrimarySourceSetsComponents/PSSFooter";
import BreadcrumbsModule from "components/PrimarySourceSetsComponents/BreadcrumbsModule";
import SourceSetInfo from "components/PrimarySourceSetsComponents/SingleSet/SourceSetInfo";
import ResourcesTabs from "components/PrimarySourceSetsComponents/SingleSet/ResourcesTabs";
import TeachersGuide from "components/PrimarySourceSetsComponents/SingleSet/TeachersGuide";

import { removeQueryParams } from "lib";
import { washObject } from "lib/washObject";

function SingleSet(props) {
  const { router, set, teachingGuide, currentFullUrl } = props;
  return (
    <MainLayout
      pageTitle={set.name.replace(/\*/g, "")}
      pageImage={set.repImageUrl || set.thumbnailUrl}
    >
      <BreadcrumbsModule
        breadcrumbs={[
          {
            title: "Primary Source Sets",
            url: {
              pathname: "/primary-source-sets",
              query: removeQueryParams(router.query, ["set"]),
            },
          },
          { title: set.name, search: "" },
        ]}
      />
      <SourceSetInfo set={set} currentFullUrl={currentFullUrl} />
      <ResourcesTabs currentTab="teachingGuide" set={set}>
        <TeachersGuide teachingGuide={teachingGuide} setName={set.name} />
      </ResourcesTabs>
      <PSSFooter />
    </MainLayout>
  );
}

export async function getServerSideProps({ query }) {
  const currentFullUrl = `${process.env.BASE_URL}/primary-source-sets/${query.set}`;
  const url = `${process.env.API_URL}/pss/sets/${encodeURIComponent(query.set)}?api_key=${process.env.API_KEY}`;
  const setRes = await fetch(url);
  if (!setRes.ok) {
    // treating all non-200 responses as 404 due to API bug
    return {
      notFound: true,
    };
  }
  const set = await setRes.json();

  const teachingGuide = set.hasPart.find(
    (item) => item.disambiguatingDescription === "guide",
  );

  const props = washObject({
    set,
    teachingGuide,
    currentFullUrl,
  });

  return {
    props: props,
  };
}

export default withRouter(SingleSet);
