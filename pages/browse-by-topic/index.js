import React from "react";
import fetch from "isomorphic-fetch";

import MainLayout from "components/MainLayout";
import TopicsList from "components/TopicBrowseComponents/TopicsList";
import {API_ENDPOINT_ALL_TOPICS_100_PER_PAGE} from "constants/topicBrowse";
import {TITLE} from "constants/topicBrowse";
import {washObject} from "lib/washObject";

const TopicBrowse = ({topics}) =>
    <div>
        <MainLayout pageTitle={TITLE}>
            <div id="main" role="main" data-cy={'topics-home'}>
                <TopicsList topics={topics}/>
            </div>
        </MainLayout>
    </div>;

export const getServerSideProps = async () => {
    const res = await fetch(API_ENDPOINT_ALL_TOPICS_100_PER_PAGE);
    const json = await res.json();
    const topics = washObject(json.filter(
        topic => !topic.parent && topic.name !== "Uncategorized"
    ));

    return {
        props: {
            topics
        }
    };
};

export default TopicBrowse;
