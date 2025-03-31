import React from "react";
import axios from "axios";


import {parseCookies} from "nookies";

import MainLayout from "components/MainLayout";
import CiteButton from "components/shared/CiteButton";
import BreadcrumbsModule from "components/ItemComponents/BreadcrumbsModule";
import HarmfulContent from "components/shared/HarmfulContent";
import Content from "components/ItemComponents/Content";
import QA from "components/ItemComponents/Content/QA";
import {CheckableLists} from "components/ListComponents/CheckableLists";

import {
    joinIfArray,
    getItemThumbnail,
    getRandomItemIdAsync
} from "lib";

import css from "components/ItemComponents/itemComponent.module.scss";
import utils from "stylesheets/utils.module.scss"
import {washObject} from "lib/washObject";

const ItemDetail = ({

                        item,
                        randomItemId,
                        isQA
                    }) => {
    return (
        <MainLayout
            pageTitle={item.title}
            pageImage={item.thumbnailUrl}
        >
            <BreadcrumbsModule
                breadcrumbs={[
                    {
                        title: "All items",
                        url: {
                            pathname: "/search"
                        }
                    },
                    {title: joinIfArray(item.title), search: ""}
                ]}
            />
            <HarmfulContent/>
            {isQA && <QA item={item} randomItemId={randomItemId}/>}
            <div
                id="main"
                role="main"
                className={`${utils.container} ${css.contentWrapper}`}
            >

                <Content item={item}/>

                <div className={css.faveAndCiteButtons}>
                    <CiteButton
                        creator={item.creator}
                        displayDate={item.date ? item.date.displayDate : item.date}
                        spatialName={item.spatial ? item.spatial.name : item.spatial}
                        sourceUrl={item.sourceUrl}
                        className={css.citeButton}
                        toCiteText="item"
                        title={item.title}
                    />
                    <CheckableLists itemId={item.id}/>
                </div>
            </div>

        </MainLayout>
    );
};

export const getServerSideProps = async context => {

    const notFound = {
        notFound: true
    }
    const query = context.query;
    if (!query || query === "" || !("itemId" in query)) {
        return notFound;
    }

    const isQA = parseCookies(context).hasOwnProperty("qa");
    const randomItemId = isQA ? await getRandomItemIdAsync() : null;
    // check if item is found
    const itemUrl =
        `${process.env.API_URL}/items/${query.itemId}` +
        `?api_key=${process.env.API_KEY}`

    let data = {};
    try {
        const axiosRes = await axios.get(itemUrl);

        if (!("docs" in axiosRes.data) || axiosRes.data.docs.length < 1) {
            return notFound;
        }

        data = axiosRes.data;

    } catch (error) {
        if (error != null && typeof error.response ===  'object' && "status" in error.response) {
            console.log(`Got status ${error.response.status} from API for item id ${query.itemId}`)
            if (error.response.status !== 404 && error.response.status !== 400) {
                throw new Error(`Bad status from API`);
            } else {
                return notFound;
            }
        } else {
            throw new Error("API not responding.");
        }
    }

    const doc = data.docs[0];
    const thumbnailUrl = getItemThumbnail(doc);
    const date = doc.sourceResource.date &&
    Array.isArray(doc.sourceResource.date)
        ? doc.sourceResource.date[0]
        : doc.sourceResource.date;
    const language = doc.sourceResource.language &&
    Array.isArray(doc.sourceResource.language)
        ? doc.sourceResource.language.map(lang => {
            return lang.name;
        })
        : doc.sourceResource.language;
    const dataProvider = doc.dataProvider && doc.dataProvider.name
        ? doc.dataProvider.name
        : doc.dataProvider;
    const strippedDoc = Object.assign({}, doc, {originalRecord: ""});
    delete strippedDoc.originalRecord;

    const props = washObject({
        item: Object.assign({}, doc.sourceResource, {
            id: doc.id,
            thumbnailUrl,
            contributor: dataProvider,
            intermediateProvider: doc.intermediateProvider,
            date: date,
            language: language,
            partner: doc.provider.name,
            sourceUrl: doc.isShownAt,
            useDefaultImage: !doc.object,
            edmRights: doc.rights,
            doc: strippedDoc,
            originalRecord: doc.originalRecord,
            ipfs: doc.ipfs
        }),
        randomItemId,
        isQA
    });

    return {
        props: props
    };


};

export default ItemDetail;
