import React from "react";
import fetch from "isomorphic-fetch";

import {extractSourceSetSlug} from "lib";
import {exhibitFilesHelper} from "lib/exhibitions/exhibitFilesHelper";
import BreadcrumbsAndNav from "components/TopicBrowseComponents/BreadcrumbsAndNav";
import MainContent from "components/TopicBrowseComponents/Topic/MainContent";
import Suggestions from "components/TopicBrowseComponents/Topic/Suggestions";
import MainLayout from "components/MainLayout";

import {
    API_ENDPOINT_ALL_TOPICS,
    API_ENDPOINT_SUBTOPICS_FOR_TOPIC
} from "constants/topicBrowse";

import {washObject} from "lib/washObject";

const sanitizeSourceSetId = id => {
    let sanitized = id.replace(" ", "");
    if (sanitized[sanitized.length - 1] === "/") {
        sanitized = sanitized.slice(0, sanitized.length - 1);
    }
    return sanitized;
};

const Topic = ({topic, subtopics, suggestions}) =>
    <MainLayout pageTitle={topic.name}>
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
        <div id="main" role="main" data-cy={'topic-home'}>
            <MainContent topic={topic}/>
            {topic.acf.related_content &&
            topic.acf.related_content.length > 0 &&
            <Suggestions suggestions={suggestions}/>}
        </div>
    </MainLayout>;

export const getServerSideProps = async ({query, req}) => {
    const currentUrl = `${req.protocol}://${req.get("host")}`;
    const topicsRes = await fetch(
        API_ENDPOINT_ALL_TOPICS + "?slug=" + query.topic
    );
    const topicsJson = await topicsRes.json();
    const currentTopic = topicsJson[0];

    const subtopicsRes = await fetch(
        API_ENDPOINT_SUBTOPICS_FOR_TOPIC + "?parent=" + currentTopic.term_id
    );
    const subtopicsJson = await subtopicsRes.json();
    const subtopics = subtopicsJson.map(subtopic =>
        Object.assign({}, subtopic, {thumbnailUrl: subtopic.acf.category_image})
    );

    const suggestions = !currentTopic.acf.related_content
        ? []
        : await Promise.all(
            currentTopic.acf.related_content.map(async item => {
                if (item.related_content_type === "Exhibition") {
                    const exhibitionsRes = await fetch(
                        `${process.env.OMEKA_URL}/api/exhibits`
                    );
                    const exhibitionsJson = await exhibitionsRes.json();
                    const exhibition = exhibitionsJson.find(
                        exhibition =>
                            parseInt(exhibition.id, 10) === parseInt(item.exhibition_id, 10)
                    );
                    const exhibitPageRes = await fetch(
                        `${process.env.OMEKA_URL}/api/exhibit_pages?exhibit=${item.exhibition_id}`
                    );
                    const exhibitPageJson = await exhibitPageRes.json();
                    // skip a nil exhibit
                    if (exhibitPageJson.length === 0) return;
                    // end skip nil exhibit
                    const homePage =
                        exhibitPageJson.find(
                            exhibit =>
                                exhibit.slug === "home-page" || exhibit.slug === "homepage"
                        ) || exhibitPageJson[0];
                    const {
                        item: homePageItem
                    } = homePage.page_blocks[0].attachments[0];
                    const filesRes = await fetch(
                        `${process.env.OMEKA_URL}/api/files?item=${homePageItem.id}`
                    );
                    const filesJson = await filesRes.json();
                    const title = exhibition.title;
                    const originalThumbnailUrl =  filesJson[0].file_urls.fullsize;

                    const thumbnailUrl = exhibitFilesHelper(
                        originalThumbnailUrl,
                        currentUrl
                    );

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
                    const setId = sanitizeSourceSetId(item.primary_source_set_id);
                    const sourceSetRes = await fetch(`${setId}.json`);
                    const sourceSetJson = await sourceSetRes.json();
                    const slug = extractSourceSetSlug(sourceSetJson["@id"]);
                    return {
                        title: sourceSetJson.name,
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

    const props = washObject({
        topic: Object.assign({}, currentTopic, {subtopics}),
        suggestions: suggestions.filter(suggestion => !!suggestion)
    });

    return {
        props: props
    };
};

export default Topic;
