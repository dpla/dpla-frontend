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
import mockSubtopic from "../../../../components/TopicBrowseComponents/SubtopicItemsList/mockSubtopic";
import mockItems from "../../../../components/TopicBrowseComponents/SubtopicItemsList/mockItems";
import { classNames as utilClassNames } from "css/utils.css";

const { module } = utilClassNames;

const SubtopicItemsList = ({ url }) =>
  <MainLayout route={url}>
    <BreadcrumbsAndNav
      breadcrumbs={[
        { title: "Browse by Topic", url: "/browse-by-topic" },
        {
          title: mockSubtopic.topicTitle,
          as: `/browse-by-topic/${mockSubtopic.topicSlug}`,
          url: `/browse-by-topic/topic/?topic=${mockSubtopic.topicSlug}`
        },
        { title: mockSubtopic.title, url: "" }
      ]}
      showNavLinks={true}
      prevAndNextArrows={true}
    />
    <div className={[classNames.sidebarAndItemList, module].join(" ")}>
      <Sidebar
        title={mockSubtopic.title}
        description={mockSubtopic.description}
        image="http://lorempixel.com/300/200/food"
      />
      <ItemList route={url} items={mockItems} />
    </div>
    <BreadcrumbsAndNav
      breadcrumbs={[
        { title: "Browse by Topic", url: "/browse-by-topic" },
        {
          title: mockSubtopic.topicTitle,
          url: `/browse-by-topic/${mockSubtopic.topicSlug}`
        },
        { title: mockSubtopic.title, url: "" }
      ]}
      showNavLinks={true}
      prevAndNextArrows={true}
    />
    <style dangerouslySetInnerHTML={{ __html: stylesheet }} />
  </MainLayout>;

export default SubtopicItemsList;
