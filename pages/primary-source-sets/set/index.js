import React from "react";
import {withRouter} from "next/router";
import Error from "../../_error"

import MainLayout from "components/MainLayout";
import PSSFooter from "components/PrimarySourceSetsComponents/PSSFooter";
import BreadcrumbsModule from "components/PrimarySourceSetsComponents/BreadcrumbsModule";
import SourceSetInfo from "components/PrimarySourceSetsComponents/SingleSet/SourceSetInfo";
import RelatedSets from "components/PrimarySourceSetsComponents/SingleSet/RelatedSets";
import ResourcesTabs from "components/PrimarySourceSetsComponents/SingleSet/ResourcesTabs";
import SourceSetSources from "components/PrimarySourceSetsComponents/SingleSet/SourceSetSources";

import {removeQueryParams} from "lib";
import {washObject} from "lib/washObject";

const videoIcon = "/static/placeholderImages/Video.svg";
const audioIcon = "/static/placeholderImages/Sound.svg";

const SingleSet = ({router, error, set, currentFullUrl}) => {

    if (error) {
        return <Error statusCode={error.status}/>;
    }

    return (<MainLayout
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
        <SourceSetInfo
            set={set}
            currentFullUrl={currentFullUrl}
            openDescription={false}
        />
        <ResourcesTabs currentTab="sourceSet" set={set}>
            <SourceSetSources
                sources={set.hasPart.filter(
                    item => item.disambiguatingDescription === "source"
                )}
            />
        </ResourcesTabs>
        <RelatedSets sets={set.isRelatedTo}/>
        <PSSFooter/>
    </MainLayout>);
}


export const getServerSideProps = async ({res, query}) => {
    const currentFullUrl = `${process.env.BASE_URL}/primary-source-sets/${query.set}`;
    const api = await fetch(`${process.env.API_URL}/pss/sets/${encodeURIComponent(query.set)}?api_key=${process.env.API_KEY}`);

    // setting the http error code is not working for some reason
    // leaving this as a todo for nextjs 10 where they give you a
    // real way to handle this

    if (api.status > 399) {
        if (res) {
            res.status = 404
        }
        return {error: {statusCode: api.status}}
    }
    const json = await api.json();

    if (!json) {
        if (res) {
            res.status = 500;
        }
        return {error: {statusCode: 500}}
    }

    const parts = json.hasPart.map(part => {
        let thumbnailUrl = part.thumbnailUrl;
        let useDefaultImage = false;
        const type =
            part.mainEntity && part.mainEntity[0] && part.mainEntity[0]["@type"];
        if (type === "AudioObject") {
            thumbnailUrl = audioIcon;
            useDefaultImage = true;
        } else if (type === "VideoObject") {
            thumbnailUrl = videoIcon;
            useDefaultImage = true;
        }
        return Object.assign({}, part, {thumbnailUrl, useDefaultImage});
    });

    const props = washObject({
        set: Object.assign({}, json, {hasPart: parts}),
        currentFullUrl
    });

    return {
        props: props
    };
};

export default withRouter(SingleSet);
