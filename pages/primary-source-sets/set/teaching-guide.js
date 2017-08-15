import React from "react";

import MainLayout from "../../../components/MainLayout";
import PSSFooter from "../../../components/PrimarySourceSetsComponents/PSSFooter";
import BreadcrumbsModule from "../../../components/PrimarySourceSetsComponents/BreadcrumbsModule";
import SourceSetInfo from "../../../components/PrimarySourceSetsComponents/SingleSet/SourceSetInfo";
import RelatedSets from "../../../components/PrimarySourceSetsComponents/SingleSet/RelatedSets";
import ResourcesTabs from "../../../components/PrimarySourceSetsComponents/SingleSet/ResourcesTabs";
import TeachersGuide from "../../../components/PrimarySourceSetsComponents/SingleSet/TeachersGuide";

const mockSet = {
  title: "Civil War and Reconstruction",
  slug: "civil-war-and-reconstruction"
};

const SingleSet = props =>
  console.log(props.teachingGuide) ||
  <MainLayout>
    <BreadcrumbsModule
      breadcrumbs={[
        { title: "Primary Source Sets", url: "/primary-source-sets" },
        {
          title: mockSet.title,
          url: "",
          search: ""
        }
      ]}
      route={props.url}
    />
    <SourceSetInfo set={props.set} />
    <ResourcesTabs route={props.url} currentTab="teachingGuide" set={mockSet}>
      <TeachersGuide
        teachingGuide={props.teachingGuide}
        setName={props.set.name}
        route={props.url}
      />
    </ResourcesTabs>
    <RelatedSets />
    <PSSFooter />
  </MainLayout>;

SingleSet.getInitialProps = async ({ query }) => {
  const setRes = await fetch(
    `https://dp.la/primary-source-sets/sets/${query.set}.json`
  );

  const set = await setRes.json();
  const teachingGuideRes = await fetch(`${set.hasPart[0]["@id"]}.json`);
  const teachingGuide = await teachingGuideRes.json();
  return { set, teachingGuide };
};

export default SingleSet;
