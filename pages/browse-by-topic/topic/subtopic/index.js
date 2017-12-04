import React from "react";
import fetch from "isomorphic-fetch";

import {
  classNames,
  stylesheet
} from "../../../../components/TopicBrowseComponents/SubtopicItemsList/SubtopicItemsList.css";
import BreadcrumbsAndNav from "../../../../components/TopicBrowseComponents/BreadcrumbsAndNav";
import ItemList from "../../../../components/TopicBrowseComponents/SubtopicItemsList/ItemList";
import MainLayout from "../../../../components/MainLayout";
import Sidebar from "../../../../components/TopicBrowseComponents/SubtopicItemsList/Sidebar";
import {
  decodeHTMLEntities,
  extractItemId,
  getCurrentUrl,
  getDefaultThumbnail
} from "utilFunctions";

import {
  API_ENDPOINT_ALL_TOPICS_100_PER_PAGE,
  API_ENDPOINT_ALL_ITEMS_100_PER_PAGE
} from "constants/topicBrowse";
import {
  API_ENDPOINT as DPLA_ITEM_ENDPOINT,
  THUMBNAIL_ENDPOINT
} from "constants/items";
import { classNames as utilClassNames } from "css/utils.css";

const { container } = utilClassNames;

const SubtopicItemsList = ({
  url,
  topic,
  subtopic,
  previousSubtopic,
  nextSubtopic,
  items
}) =>
  <MainLayout route={url} pageTitle={subtopic.name}>
    <BreadcrumbsAndNav
      breadcrumbs={[
        { title: "Browse by Topic", url: "/browse-by-topic" },
        {
          title: topic.name,
          as: `/browse-by-topic/${topic.slug}`,
          url: `/browse-by-topic/topic/?topic=${topic.slug}`
        },
        { title: subtopic.name, url: "" }
      ]}
      previousSubtopic={previousSubtopic}
      nextSubtopic={nextSubtopic}
      topic={topic}
      route={url}
    />
    <div className={[classNames.sidebarAndItemList, container].join(" ")}>
      <Sidebar
        title={subtopic.name}
        description={subtopic.description}
        image={subtopic.thumbnailUrl}
      />
      <ItemList route={url} items={items} />
    </div>
    <BreadcrumbsAndNav
      breadcrumbs={[
        { title: "Browse by Topic", url: "/browse-by-topic" },
        {
          title: topic.name,
          as: `/browse-by-topic/${topic.slug}`,
          url: `/browse-by-topic/topic/?topic=${topic.slug}`
        },
        { title: subtopic.name, url: "" }
      ]}
      previousSubtopic={previousSubtopic}
      nextSubtopic={nextSubtopic}
      topic={topic}
      route={url}
    />
    <style dangerouslySetInnerHTML={{ __html: stylesheet }} />
  </MainLayout>;

SubtopicItemsList.getInitialProps = async ({ query, req }) => {
  const currentUrl = getCurrentUrl(req);
  const topicsRes = await fetch(API_ENDPOINT_ALL_TOPICS_100_PER_PAGE);
  const topicsJson = await topicsRes.json();
  const currentSubtopic = topicsJson.find(
    topic => topic.slug === query.subtopic
  );
  const currentSubtopicIdx = topicsJson.findIndex(
    topic => topic.id === currentSubtopic.id
  );
  const subtopics = topicsJson.filter(
    topic => topic.parent === currentSubtopic.parent
  );
  const currentTopic = topicsJson.find(
    topic => topic.id === currentSubtopic.parent
  );
  const previousSubtopicIdx =
    currentSubtopicIdx - 1 >= 0 && currentSubtopicIdx - 1;
  const nextSubtopicIdx =
    currentSubtopicIdx + 1 < subtopics.length && currentSubtopicIdx + 1;

  const itemsRes = await fetch(
    `${API_ENDPOINT_ALL_ITEMS_100_PER_PAGE}&categories=${currentSubtopic.id}`
  );
  const itemsJson = await itemsRes.json();

  const items = await Promise.all(
    itemsJson.map(async item => {
      const itemDplaId = extractItemId(item.acf.dpla_url);
      const itemRes = await fetch(
        `${currentUrl}${DPLA_ITEM_ENDPOINT}/${itemDplaId}`
      );
      if (!itemRes.ok) {
        return null;
      }
      const itemJson = await itemRes.json();
      return Object.assign({}, item, {
        title: decodeHTMLEntities(item.title.rendered),
        linkHref: `/item?itemId=${itemDplaId}`,
        linkAs: `/item/${itemDplaId}`,
        type: itemJson.docs[0].sourceResource.type,
        thumbnailUrl: itemJson.docs[0].object
          ? `${currentUrl}${THUMBNAIL_ENDPOINT}/${itemDplaId}`
          : getDefaultThumbnail(itemJson.docs[0].sourceResource.type),
        sourceUrl: itemJson.docs[0].isShownAt,
        date: itemJson.docs[0].sourceResource.date,
        creator: itemJson.docs[0].sourceResource.creator,
        description: itemJson.docs[0].sourceResource.description,
        dataProvider: itemJson.docs[0].dataProvider,
        useDefaultImage: !itemJson.docs[0].object
      });
    })
  );

  const filteredItems = items.filter(item => item);

  return {
    topic: currentTopic,
    subtopic: Object.assign({}, currentSubtopic, {
      thumbnailUrl: currentSubtopic.acf.category_image
    }),
    items: filteredItems.sort((a, b) => a.acf.order - b.acf.order),
    previousSubtopic: subtopics[previousSubtopicIdx],
    nextSubtopic: subtopics[nextSubtopicIdx]
  };
};

export default SubtopicItemsList;
