import React from "react";
import fetch from "isomorphic-fetch";

import {parseCookies} from "nookies";

import Error from "pages/_error";
import MainLayout from "components/MainLayout";
import CiteButton from "components/shared/CiteButton";
import BreadcrumbsModule from "components/ItemComponents/BreadcrumbsModule";
import HarmfulContent from "components/shared/HarmfulContent";
import Content from "components/ItemComponents/Content";
import QA from "components/ItemComponents/Content/QA";
import {CheckableLists} from "components/ListComponents/CheckableLists";

import {API_ENDPOINT} from "constants/items";

import {
    getCurrentUrl,
    getCurrentFullUrl,
    joinIfArray,
    getItemThumbnail,
    getRandomItemIdAsync
} from "lib";

import css from "components/ItemComponents/itemComponent.module.scss";
import utils from "stylesheets/utils.module.scss"

const ItemDetail = ({
                        error,
                        item,
                        randomItemId,
                        isQA
                    }) => {
    if (error) {
        return <Error statusCode={error.statusCode}/>;
    }
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
    const query = context.query;
    const req = context.req;
    const res = context.res;
    const isQA = parseCookies(context).hasOwnProperty("qa");
    const currentFullUrl = getCurrentFullUrl(req);
    const currentUrl = getCurrentUrl(req);
    const randomItemId = isQA ? await getRandomItemIdAsync(currentUrl) : null;
    // check if item is found
    try {
        const res = await fetch(`${currentUrl}${API_ENDPOINT}/${query.itemId}`);
        const json = await res.json();
        const doc = json.docs[0];
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
        const strippedDoc = Object.assign({}, doc, {originalRecord: ""});
        delete strippedDoc.originalRecord;
        return {
            props: {
                currentFullUrl,
                item: Object.assign({}, doc.sourceResource, {
                    id: doc.id,
                    thumbnailUrl,
                    contributor: doc.dataProvider,
                    intermediateProvider: doc.intermediateProvider,
                    date: date,
                    language: language,
                    partner: doc.provider.name,
                    sourceUrl: doc.isShownAt,
                    useDefaultImage: !doc.object,
                    edmRights: doc.rights,
                    doc: strippedDoc,
                    originalRecord: doc.originalRecord
                }),
                randomItemId,
                isQA
            }
        };
    } catch (error) {
        console.log(error);

        if (res) {
            res.statusCode = 404;
        }

        return {
            props: {
                error: {
                    statusCode: 404
                }
            }
        };
    }
};
export default ItemDetail;
