import React from "react";
import fetch from "isomorphic-fetch";
import {withRouter} from "next/router";

import MainLayout from "components/MainLayout";
import PSSFooter from "components/PrimarySourceSetsComponents/PSSFooter";
import BreadcrumbsModule from "components/PrimarySourceSetsComponents/BreadcrumbsModule";
import SourceSetInfo from "components/PrimarySourceSetsComponents/SingleSet/SourceSetInfo";
import ResourcesTabs from "components/PrimarySourceSetsComponents/SingleSet/ResourcesTabs";
import TeachersGuide from "components/PrimarySourceSetsComponents/SingleSet/TeachersGuide";

import {PSS_BASE_URL} from "constants/env";

import {removeQueryParams, getCurrentFullUrl} from "lib";

const SingleSet = ({router, set, teachingGuide, currentPath, currentFullUrl}) =>
    <MainLayout
        pageTitle={set.name.replace(/\*/g, "")}
        pageImage={set.repImageUrl || set.thumbnailUrl}
    >
        <BreadcrumbsModule
            breadcrumbs={[
                {
                    title: "Primary Source Sets",
                    url: {
                        pathname: "/primary-source-sets",
                        query: removeQueryParams(router.query, ["set"])
                    }
                },
                {title: set.name, search: ""}
            ]}
        />
        <SourceSetInfo set={set} currentFullUrl={currentFullUrl}/>
        <ResourcesTabs currentTab="teachingGuide" set={set}>
            <TeachersGuide
                teachingGuide={teachingGuide}
                setName={set.name}
                currentPath={currentPath}
            />
        </ResourcesTabs>
        <PSSFooter/>
    </MainLayout>;

export const getServerSideProps = async ({query, req}) => {
    const currentFullUrl = getCurrentFullUrl(req);
    const setRes = await fetch(`${PSS_BASE_URL}/sets/${query.set}.json`);

    const currentPath = req
        ? `${req.get("Host")}/primary-source-sets/${query.set}`
        : "";

    const set = await setRes.json();
    const guidePage = set.hasPart.find(
        item => item.disambiguatingDescription === "guide"
    )["@id"];
    const guideEndpoint =
        guidePage.replace(/^.*primary-source-sets(.*)/, `${PSS_BASE_URL}$1`) +
        ".json";
    const teachingGuideRes = await fetch(guideEndpoint);
    const teachingGuide = await teachingGuideRes.json();

    return {
        props: {
            set,
            teachingGuide,
            currentPath,
            currentFullUrl
        }
    };
};

export default withRouter(SingleSet);
