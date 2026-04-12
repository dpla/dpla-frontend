import React from "react";

import { extractSourceSetSlug } from "lib/index";
import { loadExhibitionList } from "lib/exhibitionsStatic";
import BreadcrumbsAndNav from "components/TopicBrowseComponents/BreadcrumbsAndNav";
import MainContent from "components/TopicBrowseComponents/Topic/MainContent";
import Suggestions from "components/TopicBrowseComponents/Topic/Suggestions";
import MainLayout from "components/MainLayout";

import {
  API_ENDPOINT_ALL_TOPICS,
  API_ENDPOINT_SUBTOPICS_FOR_TOPIC,
} from "constants/topicBrowse";

import { washObject } from "lib/washObject";
import { safeFetch, checkResponseForSSRSafe, upstreamUnavailable } from "lib/safeFetch";
import ServiceUnavailable from "components/shared/ServiceUnavailable";

const sanitizeSourceSetId = (id) => {
  let sanitized = id.replace(" ", "");
  if (sanitized[sanitized.length - 1] === "/") {
    sanitized = sanitized.slice(0, sanitized.length - 1);
  }
  return sanitized.substring(26);
};

function Topic(props) {
  const { topic, suggestions, temporarilyUnavailable } = props;
  if (temporarilyUnavailable) return <ServiceUnavailable />;
  if (!topic) return null;
  return (
    <MainLayout pageTitle={topic.name}>
      <BreadcrumbsAndNav
        breadcrumbs={[
          {
            title: "Browse by Topic",
            url: "/browse-by-topic",
          },
          {
            title: topic.name,
          },
        ]}
      />
      <div id="main" role="main" data-cy={"topic-home"}>
        <MainContent topic={topic} />
        {topic.acf.related_content && topic.acf.related_content.length > 0 && (
          <Suggestions suggestions={suggestions} />
        )}
      </div>
    </MainLayout>
  );
}

export const getServerSideProps = async (context) => {
  const topicSlug = context.params?.topicSlug;
  const topicsRes = await safeFetch(API_ENDPOINT_ALL_TOPICS + "?slug=" + topicSlug);
  if (!topicsRes) {
    return upstreamUnavailable(context.res);
  }
  const topicsError = checkResponseForSSRSafe(topicsRes, "Topic");
  if (topicsError) return topicsError;

  const topicsJson = await topicsRes.json();
  const currentTopic = topicsJson[0];

  if (!currentTopic) {
    return {
      notFound: true,
    };
  }

  const [subtopicsRes, exhibitions] = await Promise.all([
    safeFetch(API_ENDPOINT_SUBTOPICS_FOR_TOPIC + "?parent=" + currentTopic.term_id),
    loadExhibitionList(),
  ]);

  if (!subtopicsRes) {
    return upstreamUnavailable(context.res);
  }
  const subtopicsError = checkResponseForSSRSafe(subtopicsRes, "Topic subtopics");
  if (subtopicsError) return subtopicsError;

  const subtopicsJson = await subtopicsRes.json();
  const subtopics = subtopicsJson.map((subtopic) => ({
    ...subtopic,
    thumbnailUrl: subtopic.acf.category_image,
  }));

  const suggestions = !currentTopic.acf.related_content
    ? []
    : await Promise.all(
        currentTopic.acf.related_content.map(async (item) => {
          if (item.related_content_type === "Exhibition") {
            // load exhibit
            const exhibition = exhibitions.exhibitions.find(
              (exhibition) => exhibition.slug === item.exhibition_id,
            );
            // skip a nil exhibit
            if (!exhibition) return;
            const href = `/exhibitions/${exhibition.slug}`;
            const as = `/exhibitions/${exhibition.slug}`;
            return {
              title: exhibition.title,
              thumbnailUrl: exhibition.thumbnailUrl,
              as,
              href,
              type: "Exhibition",
            };
          } else if (item.related_content_type === "Primary Source Set") {
            if (!item.primary_source_set_id) return null;
            const setId = sanitizeSourceSetId(item.primary_source_set_id);
            const sourceSetRes = await safeFetch(
              `${process.env.API_URL}/pss/sets/${setId}?api_key=${process.env.API_KEY}`,
            );
            if (!sourceSetRes?.ok) return null;
            const sourceSetJson = await sourceSetRes.json();
            const slug = extractSourceSetSlug(sourceSetJson["@id"]);
            if (!slug) return null;
            return {
              title: sourceSetJson.name,
              thumbnailUrl: sourceSetJson.thumbnailUrl,
              href: `/primary-source-sets/${slug}`,
              type: "Primary Source Set",
            };
          } else {
            return null;
          }
        }),
      );

  const props = washObject({
    topic: { ...currentTopic, subtopics },
    suggestions: suggestions.filter((suggestion) => !!suggestion),
  });

  return {
    props: props,
  };
};

export default Topic;
