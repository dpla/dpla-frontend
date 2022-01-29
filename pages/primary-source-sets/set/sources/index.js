import React from "react";
import {withRouter} from "next/router";
import fetch from "isomorphic-fetch";

import MainLayout from "components/MainLayout";
import PSSFooter from "components/PrimarySourceSetsComponents/PSSFooter";
import BreadcrumbsModule from "components/PrimarySourceSetsComponents/BreadcrumbsModule";
import ContentAndMetadata from "components/PrimarySourceSetsComponents/Source/components/ContentAndMetadata";
import SourceCarousel from "components/PrimarySourceSetsComponents/Source/components/SourceCarousel";

import {PSS_BASE_URL} from "constants/env";

import {removeQueryParams} from "lib";

const videoIcon = "/static/placeholderImages/Video.svg";
const audioIcon = "/static/placeholderImages/Sound.svg";

const Source = ({router, source, set, currentSourceIdx}) =>
    <MainLayout
        pageTitle={source.name}
        pageImage={source.thumbnailUrl}
    >
        <BreadcrumbsModule
            breadcrumbs={[
                {
                    title: "Primary Source Sets",
                    url: {
                        pathname: "/primary-source-sets",
                        query: removeQueryParams(router.query, ["source", "set"])
                    }
                },
                {
                    title: set.name,
                    as: {
                        pathname: `/primary-source-sets/${router.query.set}`,
                        query: removeQueryParams(router.query, ["source", "set"])
                    },
                    url: {
                        pathname: "/primary-source-sets/set",
                        query: Object.assign({}, removeQueryParams(router.query, ["source"]))
                    }
                },
                {title: source.name, url: ""}
            ]}
        />
        <div id="main" role="main">
            <ContentAndMetadata source={source}/>
        </div>
        <SourceCarousel
            sources={set.hasPart.filter(
                item => item.disambiguatingDescription === "source"
            )}
            currentSourceIdx={currentSourceIdx}
            set={set}
        />
        <PSSFooter/>
    </MainLayout>;

export const getServerSideProps = async ({query}) => {
    const sourceRes = await fetch(`${PSS_BASE_URL}/sources/${query.source}.json`);
    const sourceJson = await sourceRes.text();
    const sanitizedSourceJson = JSON.parse(sourceJson.replace(/\r\n/gi, ""));
    const setRes = await fetch(`${PSS_BASE_URL}/sets/${query.set}.json`);
    const setJson = await setRes.json();
    const parts = setJson.hasPart.map(part => {
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

    const sourceId = sanitizedSourceJson["@id"];
    const currentSourceIdx = setJson.hasPart
        .slice(1)
        .findIndex(source => source["@id"] === sourceId);

    return {
        props: {
            source: sanitizedSourceJson,
            set: Object.assign({}, setJson, {hasPart: parts}),
            currentSourceIdx
        }
    };
};

export default withRouter(Source);
