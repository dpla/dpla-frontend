import React from "react";
import { useRouter } from "next/router";

import MainLayout from "components/MainLayout";
import PSSFooter from "components/PrimarySourceSetsComponents/PSSFooter";
import BreadcrumbsModule from "components/PrimarySourceSetsComponents/BreadcrumbsModule";
import SourceSetInfo from "components/PrimarySourceSetsComponents/SingleSet/SourceSetInfo";
import RelatedSets from "components/PrimarySourceSetsComponents/SingleSet/RelatedSets";
import ResourcesTabs from "components/PrimarySourceSetsComponents/SingleSet/ResourcesTabs";
import SourceSetSources from "components/PrimarySourceSetsComponents/SingleSet/SourceSetSources";

import { removeQueryParams } from "lib";
import { washObject } from "lib/washObject";

const videoIcon = "/static/placeholderImages/Video.svg";
const audioIcon = "/static/placeholderImages/Sound.svg";

function SingleSet({ set }) {
  const router = useRouter();
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
      <SourceSetInfo set={set} openDescription={false} />
      <ResourcesTabs currentTab="sourceSet" set={set}>
        <SourceSetSources
          sources={set.hasPart.filter(
            (item) => item.disambiguatingDescription === "source",
          )}
        />
      </ResourcesTabs>
      <RelatedSets sets={set.isRelatedTo} />
      <PSSFooter />
    </MainLayout>
  );
}

export async function getServerSideProps(context) {
  const set = context.params?.set;
  const api = await fetch(
    `${process.env.API_URL}/pss/sets/${encodeURIComponent(set)}?api_key=${process.env.API_KEY}`,
  );

  if (!api.ok) {
    // treating all errors as 404 due to API bug
    return { notFound: true };
  }

  const json = await api.json();

  const parts = json.hasPart.map((part) => {
    let thumbnailUrl = part.thumbnailUrl;
    let useDefaultImage = false;
    const type =
      part.mainEntity && part.mainEntity[0] && part.mainEntity[0]["@type"];
    if (type === "AudioObject") {
      thumbnailUrl = audioIcon;
      useDefaultImage = true;
    } else if (type === "VideoObject") {
      thumbnailUrl = videoIcon;
      useDefaultImage = true;
    }
    return { ...part, thumbnailUrl, useDefaultImage };
  });

  const props = washObject({
    set: { ...json, hasPart: parts },
  });

  return {
    props: props,
  };
}

export default SingleSet;
