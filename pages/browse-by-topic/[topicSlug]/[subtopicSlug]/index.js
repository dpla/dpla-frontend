import React from "react";
import BreadcrumbsAndNav from "components/TopicBrowseComponents/BreadcrumbsAndNav";
import ItemList from "components/TopicBrowseComponents/SubtopicItemsList/ItemList";
import MainLayout from "components/MainLayout";
import Sidebar from "components/TopicBrowseComponents/SubtopicItemsList/Sidebar";

import { decodeHTMLEntities, extractItemId, getItemThumbnail } from "lib";

import {
  API_ENDPOINT_ALL_ITEMS_100_PER_PAGE,
  API_ENDPOINT_ALL_TOPICS,
  API_ENDPOINT_SUBTOPICS_FOR_TOPIC,
} from "constants/topicBrowse";

import css from "components/TopicBrowseComponents/SubtopicItemsList/SubtopicItemsList.module.scss";
import utils from "stylesheets/utils.module.scss";
import { washObject } from "lib/washObject";

function SubtopicItemsList(props) {
  const { topic, subtopic, previousSubtopic, nextSubtopic, items } = props;
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

  const topicsRes = await fetch(API_ENDPOINT_ALL_TOPICS + "?slug=" + topicSlug);

  if (!topicsRes.ok) {
    if (topicsRes.status === 404) {
      return {
        notFound: true,
      };
    }
    throw new Error("Couldn't load topics.");
  }

  const topicsJson = await topicsRes.json();
  const currentTopic = topicsJson[0];
  if (!currentTopic) {
    return {
      notFound: true,
    };
  }

  const subtopicsRes = await fetch(
    API_ENDPOINT_SUBTOPICS_FOR_TOPIC + "?parent=" + currentTopic.term_id,
  );

  if (!subtopicsRes.ok) {
    if (subtopicsRes.status === 404) {
      return {
        notFound: true,
      };
    }
    throw new Error("Couldn't load subtopics.");
  }

  const subtopicsJson = await subtopicsRes.json();
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

  // TODO: add support going to next/previous topic
  const previousSubtopicIdx =
    currentSubtopicIdx - 1 >= 0 && currentSubtopicIdx - 1;
  const nextSubtopicIdx =
    currentSubtopicIdx + 1 < subtopics.length && currentSubtopicIdx + 1;

  const itemsRes = await fetch(
    `${API_ENDPOINT_ALL_ITEMS_100_PER_PAGE}&categories=${currentSubtopic.term_id}`,
  );

  if (!itemsRes.ok) {
    if (itemsRes.status === 404) {
      return {
        notFound: true,
      };
    }
    throw new Error("Couldn't load items.");
  }

  const itemsJson = await itemsRes.json();

  const items = await Promise.all(
    itemsJson.map(async (item) => {
      const itemDplaId = extractItemId(item.acf.dpla_url);
      const itemUrl =
        `${process.env.API_URL}/items/${itemDplaId}` +
        `?api_key=${process.env.API_KEY}`;
      const itemRes = await fetch(itemUrl);
      if (!itemRes.ok) {
        return null;
      }
      const itemJson = await itemRes.json();
      const dataProvider = itemJson.docs[0].dataProvider?.name
        ? itemJson.docs[0].dataProvider.name
        : itemJson.docs[0].dataProvider;

      return {
        ...item,
        title: decodeHTMLEntities(item.title.rendered),
        linkHref: `/item/${itemDplaId}`,
        linkAs: `/item/${itemDplaId}`,
        type: itemJson.docs[0].sourceResource.type,
        thumbnailUrl: getItemThumbnail(itemJson.docs[0]),
        sourceUrl: itemJson.docs[0].isShownAt,
        date: itemJson.docs[0].sourceResource.date,
        creator: itemJson.docs[0].sourceResource.creator,
        description: itemJson.docs[0].sourceResource.description,
        dataProvider: dataProvider,
        useDefaultImage: !itemJson.docs[0].object,
        itemDplaId: itemDplaId,
        provider:
          itemJson.docs &&
          itemJson.docs[0] &&
          itemJson.docs[0].provider &&
          itemJson.docs[0].provider.name,
      };
    }),
  );

  const filteredItems = items.filter((item) => item);

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
