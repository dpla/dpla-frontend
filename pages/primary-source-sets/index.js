import React from "react";

import MainLayout from "components/MainLayout";
import AllSets from "components/PrimarySourceSetsComponents/AllSets";
import PSSFooter from "components/PrimarySourceSetsComponents/PSSFooter";
import {washObject} from "lib/washObject";

import {
    subjectOptions,
    timePeriodOptions,
    TITLE
} from "constants/primarySourceSets";

const PrimarySourceSets = ({sets}) =>
    <div>
        <MainLayout pageTitle={TITLE}>
            <div id="main" role="main" data-cy={"pss-home"}>
                <AllSets sets={sets}/>
            </div>
            <PSSFooter/>
        </MainLayout>
    </div>;

export const getServerSideProps = async ({query}) => {

    const findTimePeriod = timePeriodOptions.find(option => option.value === query.timePeriod);
    const timePeriod = findTimePeriod?.label;

    const findSubject = subjectOptions.find(subject => subject.value === query.subject);
    const subject = findSubject?.label;

    let filter = "";
    if (timePeriod && subject) {
        filter = `&filter=about.name:${encodeURIComponent(timePeriod)}+AND+${encodeURIComponent(subject)}`;
    } else if (timePeriod) {
        filter = `&filter=about.name:${encodeURIComponent(timePeriod)}`;
    } else if (subject) {
        filter = `&filter=about.name:${encodeURIComponent(subject)}`;
    }
    const url = `${process.env.API_URL}/pss/sets?api_key=${process.env.API_KEY}${filter}`;
    const res = await fetch(url);
    const json = await res.json();
    const props = washObject({
        sets: json
    });
    return {
        props: props
    };
};

export default PrimarySourceSets;
