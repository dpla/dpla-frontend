import React from "react";

import MainLayout from "components/MainLayout";
import TopicsList from "components/TopicBrowseComponents/TopicsList";
import ServiceUnavailable from "components/shared/ServiceUnavailable";
import {
  API_ENDPOINT_ALL_TOPICS_100_PER_PAGE,
  TITLE,
} from "constants/topicBrowse";
import { washObject } from "lib/washObject";
import { safeFetch, isUpstreamUnavailable, upstreamUnavailable, safeJson } from "lib/safeFetch";

function TopicBrowse({ topics, temporarilyUnavailable }) {
  if (temporarilyUnavailable) return <ServiceUnavailable />;
  return (
    <div>
      <MainLayout pageTitle={TITLE}>
        <div id="main" role="main" data-cy={"topics-home"}>
          <TopicsList topics={topics} />
        </div>
      </MainLayout>
    </div>
  );
}

export const getServerSideProps = async (context) => {
  const res = await safeFetch(API_ENDPOINT_ALL_TOPICS_100_PER_PAGE);
  if (isUpstreamUnavailable(res)) return upstreamUnavailable(context.res, res);
  if (!res?.ok) {
    return { notFound: true };
  }
  const json = await safeJson(res);
  if (json === null) return upstreamUnavailable(context.res);
  const topics = washObject(
    json.filter((topic) => !topic.parent && topic.name !== "Uncategorized"),
  );

  return {
    props: {
      topics,
    },
  };
};

export default TopicBrowse;
