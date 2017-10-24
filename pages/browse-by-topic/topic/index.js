import React from "react";
import fetch from "isomorphic-fetch";

import { extractSourceSetSlug } from "utilFunctions/";
import BreadcrumbsAndNav from "../../../components/TopicBrowseComponents/BreadcrumbsAndNav";
import MainContent from "../../../components/TopicBrowseComponents/Topic/MainContent";
import Suggestions from "../../../components/TopicBrowseComponents/Topic/Suggestions";
import MainLayout from "../../../components/MainLayout";
import { API_ENDPOINT_ALL_TOPICS_100_PER_PAGE } from "constants/topicBrowse";
import {
  EXHIBIT_PAGES_ENDPOINT,
  EXHIBITS_ENDPOINT,
  FILES_ENDPOINT
} from "constants/exhibitions";
import { getCurrentUrl } from "utilFunctions";
const markdownit = require("markdown-it")({ html: true });

const Topic = ({ url, topic, subtopics, suggestions }) =>
  <MainLayout route={url} pageTitle={topic.name}>
    <BreadcrumbsAndNav
      breadcrumbs={[
        {
          title: "Browse by Topic",
          url: "/browse-by-topic"
        },
        {
          title: topic.name
        }
      ]}
    />
    <MainContent topic={topic} />
    {topic.acf.related_content &&
      topic.acf.related_content.length > 0 &&
      <Suggestions suggestions={suggestions} />}
  </MainLayout>;

Topic.getInitialProps = async ({ query, req }) => {
  const currentUrl = getCurrentUrl(req);
  const topicsRes = await fetch(API_ENDPOINT_ALL_TOPICS_100_PER_PAGE);
  const topicsJson = await topicsRes.json();
  const currentTopic = topicsJson.find(topic => topic.slug === query.topic);
  const subtopics = topicsJson
    .filter(topic => topic.parent === currentTopic.id)
    .sort((a, b) => a.acf.order - b.acf.order)
    .map(subtopic =>
      Object.assign({}, subtopic, { thumbnailUrl: subtopic.acf.category_image })
    );
  const suggestions = await Promise.all(
    currentTopic.acf.related_content.map(async item => {
      if (item.related_content_type === "Exhibition") {
        const exhibitionsRes = await fetch(`${currentUrl}${EXHIBITS_ENDPOINT}`);
        const exhibitionsJson = await exhibitionsRes.json();
        const exhibition = exhibitionsJson.find(
          exhibition =>
            parseInt(exhibition.id, 10) === parseInt(item.exhibition_id, 10)
        );
        const exhibitPageRes = await fetch(
          `${currentUrl}${EXHIBIT_PAGES_ENDPOINT}?exhibit=${item.exhibition_id}`
        );
        const exhibitPageJson = await exhibitPageRes.json();
        const homePage =
          exhibitPageJson.find(
            exhibit =>
              exhibit.slug === "home-page" || exhibit.slug === "homepage"
          ) || exhibitPageJson[0];
        const { item: homePageItem } = homePage.page_blocks[0].attachments[0];
        const filesRes = await fetch(
          `${currentUrl}${FILES_ENDPOINT}?item=${homePageItem.id}`
        );
        const filesJson = await filesRes.json();

        const title = exhibition.title;
        const thumbnailUrl = filesJson[0].file_urls.fullsize;
        const slug = exhibition.slug;
        if (!slug) {
          return null;
        }
        const href = `/exhibitions/exhibition?exhibition=${slug}`;
        const as = `/exhibitions/${slug}`;
        return {
          title,
          thumbnailUrl,
          as,
          href,
          type: "Exhibition"
        };
      } else if (item.related_content_type === "Primary Source Set") {
        const setId = item.primary_source_set_id.replace(" ", "");
        const sourceSetRes = await fetch(`${setId}.json`);
        const sourceSetJson = await sourceSetRes.json();
        const slug = extractSourceSetSlug(sourceSetJson["@id"]);
        return {
          title: markdownit.render(sourceSetJson.name),
          thumbnailUrl: sourceSetJson.thumbnailUrl,
          as: `/primary-source-sets/${slug}`,
          href: `/primary-source-sets/set?set=${slug}`,
          type: "Primary Source Set"
        };
      } else {
        return null;
      }
    })
  );
  return {
    topic: Object.assign({}, currentTopic, { subtopics }),
    suggestions: suggestions.filter(suggestion => !!suggestion)
  };
};

export default Topic;
