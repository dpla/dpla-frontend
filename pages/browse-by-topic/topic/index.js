import React from "react";

import { extractSourceSetSlug, loadExhibitionList } from "lib";
import BreadcrumbsAndNav from "components/TopicBrowseComponents/BreadcrumbsAndNav";
import MainContent from "components/TopicBrowseComponents/Topic/MainContent";
import Suggestions from "components/TopicBrowseComponents/Topic/Suggestions";
import MainLayout from "components/MainLayout";

import {
  API_ENDPOINT_ALL_TOPICS,
  API_ENDPOINT_SUBTOPICS_FOR_TOPIC,
} from "constants/topicBrowse";

import { washObject } from "lib/washObject";

const sanitizeSourceSetId = (id) => {
  let sanitized = id.replace(" ", "");
  if (sanitized[sanitized.length - 1] === "/") {
    sanitized = sanitized.slice(0, sanitized.length - 1);
  }
  return sanitized.substring(26);
};

function Topic(props) {
  const { topic, suggestions } = props;
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

export const getServerSideProps = async ({ query }) => {
  const topicsRes = await fetch(
    API_ENDPOINT_ALL_TOPICS + "?slug=" + query.topic,
  );
  const topicsJson = await topicsRes.json();
  const currentTopic = topicsJson[0];

  const subtopicsRes = await fetch(
    API_ENDPOINT_SUBTOPICS_FOR_TOPIC + "?parent=" + currentTopic.term_id,
  );
  const subtopicsJson = await subtopicsRes.json();
  const subtopics = subtopicsJson.map((subtopic) => ({
    ...subtopic,
    thumbnailUrl: subtopic.acf.category_image,
  }));

  const exhibitions = await loadExhibitionList();

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
            const setId = sanitizeSourceSetId(item.primary_source_set_id);
            const sourceSetRes = await fetch(
              `${process.env.API_URL}/pss/sets/${setId}?api_key=${process.env.API_KEY}`,
            );
            const sourceSetJson = await sourceSetRes.json();
            const slug = extractSourceSetSlug(sourceSetJson["@id"]);
            return {
              title: sourceSetJson.name,
              thumbnailUrl: sourceSetJson.thumbnailUrl,
              as: `/primary-source-sets/${slug}`,
              href: `/primary-source-sets/set?set=${slug}`,
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
