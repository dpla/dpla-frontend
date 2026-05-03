import React from "react";
import BreadcrumbsAndNav from "components/TopicBrowseComponents/BreadcrumbsAndNav";
import ItemList from "components/TopicBrowseComponents/SubtopicItemsList/ItemList";
import MainLayout from "components/MainLayout";
import Sidebar from "components/TopicBrowseComponents/SubtopicItemsList/Sidebar";

import { decodeHTMLEntities, extractItemId, getDataProviderName, getItemThumbnail } from "lib";
import { safeFetch, safeJson } from "lib/safeFetch";

import {
  API_ENDPOINT_ALL_ITEMS_100_PER_PAGE,
  API_ENDPOINT_ALL_TOPICS,
  API_ENDPOINT_SUBTOPICS_FOR_TOPIC,
} from "constants/topicBrowse";
import { DPLA_ITEM_ID_REGEX } from "constants/items";

import css from "components/TopicBrowseComponents/SubtopicItemsList/SubtopicItemsList.module.scss";
import utils from "stylesheets/utils.module.scss";
import { washObject } from "lib/washObject";

function SubtopicItemsList(props) {
  const { topic, subtopic, previousSubtopic, nextSubtopic, items } = props;
  if (!topic || !subtopic) return null;
  return (
    <MainLayout pageTitle={subtopic.name} pageImage={subtopic.thumbnailUrl}>
      <BreadcrumbsAndNav
        breadcrumbs={[
          {
            title: "Browse by Topic",
            url: "/browse-by-topic",
          },
          {
            title: topic.name,
            url: `/browse-by-topic/${topic.slug}`,
          },
          {
            title: subtopic.name,
            url: "",
          },
        ]}
        previousSubtopic={previousSubtopic}
        nextSubtopic={nextSubtopic}
        topic={topic}
      />
      <div
        id="main"
        role="main"
        className={`${css.sidebarAndItemList} ${utils.container}`}
      >
        <Sidebar
          title={subtopic.name}
          description={subtopic.description}
          image={subtopic.thumbnailUrl}
        />
        <ItemList items={items} />
      </div>
      <BreadcrumbsAndNav
        breadcrumbs={[
          {
            title: "Browse by Topic",
            url: "/browse-by-topic",
          },
          {
            title: topic.name,
            url: `/browse-by-topic/${topic.slug}`,
          },
          {
            title: subtopic.name,
            url: "",
          },
        ]}
        previousSubtopic={previousSubtopic}
        nextSubtopic={nextSubtopic}
        topic={topic}
      />
    </MainLayout>
  );
}

export const getServerSideProps = async (context) => {
  const topicSlug = context.params?.topicSlug;
  const subtopicSlug = context.params?.subtopicSlug;

  const topicsRes = await safeFetch(API_ENDPOINT_ALL_TOPICS + "?slug=" + topicSlug);

  if (!topicsRes?.ok) {
    return { notFound: true };
  }

  const topicsJson = await safeJson(topicsRes);
  if (topicsJson === null) return { notFound: true };
  const currentTopic = topicsJson[0];
  if (!currentTopic) {
    return {
      notFound: true,
    };
  }

  const subtopicsRes = await safeFetch(
    API_ENDPOINT_SUBTOPICS_FOR_TOPIC + "?parent=" + currentTopic.term_id,
  );

  if (!subtopicsRes?.ok) {
    return { notFound: true };
  }

  const subtopicsJson = await safeJson(subtopicsRes);
  if (subtopicsJson === null) return { notFound: true };
  const subtopics = subtopicsJson.map((subtopic) => ({
    ...subtopic,
    thumbnailUrl: subtopic.acf.category_image,
  }));
  const currentSubtopic = subtopics.find(
    (topic) => topic.slug === subtopicSlug,
  );

  if (!currentSubtopic) {
    return {
      notFound: true,
    };
  }

  const currentSubtopicIdx = subtopics.findIndex(
    (topic) => topic.term_id === currentSubtopic.term_id,
  );

  // TODO: add support for cross-topic navigation (advancing past the last/first subtopic into the adjacent topic)
  const previousSubtopicIdx = currentSubtopicIdx > 0 ? currentSubtopicIdx - 1 : null;
  const nextSubtopicIdx = currentSubtopicIdx + 1 < subtopics.length ? currentSubtopicIdx + 1 : null;

  const itemsRes = await safeFetch(
    `${API_ENDPOINT_ALL_ITEMS_100_PER_PAGE}&categories=${currentSubtopic.term_id}`,
  );

  if (!itemsRes?.ok) {
    return { notFound: true };
  }

  const itemsJson = await safeJson(itemsRes);
  if (itemsJson === null) return { notFound: true };

  const fetchItem = async (item) => {
    const itemDplaId = extractItemId(item.acf.dpla_url);
    if (!itemDplaId || !DPLA_ITEM_ID_REGEX.test(itemDplaId)) return null;
    const itemUrl =
      `${process.env.API_URL}/items/${itemDplaId}` +
      `?api_key=${process.env.API_KEY}`;
    const itemRes = await safeFetch(itemUrl);
    if (!itemRes?.ok) {
      return null;
    }
    const itemJson = await safeJson(itemRes);
    const doc = itemJson?.docs?.[0];
    if (!doc) {
      return null;
    }
    const dataProvider = getDataProviderName(doc.dataProvider);
    return {
      ...item,
      title: decodeHTMLEntities(item.title.rendered),
      linkHref: `/item/${itemDplaId}`,
      linkAs: `/item/${itemDplaId}`,
      type: doc.sourceResource?.type,
      thumbnailUrl: getItemThumbnail(doc),
      sourceUrl: doc.isShownAt,
      date: doc.sourceResource?.date,
      creator: doc.sourceResource?.creator,
      description: doc.sourceResource?.description,
      dataProvider: dataProvider,
      useDefaultImage: !doc.object,
      itemDplaId: itemDplaId,
      provider: doc.provider?.name,
    };
  };

  // Fetch in batches of 20 to avoid saturating the ES concurrency pool.
  // The DPLA API has no multi-ID endpoint, so individual fetches are required.
  const BATCH_SIZE = 20;
  const allItems = [];
  for (let i = 0; i < itemsJson.length; i += BATCH_SIZE) {
    const batch = await Promise.all(itemsJson.slice(i, i + BATCH_SIZE).map(fetchItem));
    allItems.push(...batch);
  }

  const filteredItems = allItems.filter((item) => item);

  const props = washObject({
    topic: currentTopic,
    subtopic: {
      ...currentSubtopic,
      thumbnailUrl: currentSubtopic.acf.category_image,
    },
    items: filteredItems.sort((a, b) => a.acf.order - b.acf.order),
    previousSubtopic: subtopics[previousSubtopicIdx],
    nextSubtopic: subtopics[nextSubtopicIdx],
  });

  return { props };
};

export default SubtopicItemsList;
