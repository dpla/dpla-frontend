import React from "react";
import fetch from "isomorphic-fetch";

import Error from "pages/_error";
import MainLayout from "components/MainLayout";
import BreadcrumbsModule from "components/ItemComponents/BreadcrumbsModule";
import HarmfulContent from "components/shared/HarmfulContent";
import Content from "components/ItemComponents/Content";

import {
    joinIfArray,
    getItemThumbnail,
} from "lib";

import css from "components/ItemComponents/itemComponent.module.scss";
import utils from "stylesheets/utils.module.scss"
import {washObject} from "lib/washObject";
import {EBOOK_API} from "constants/api";

const ItemDetail = ({
                        error,
                        item
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
                                pathname: "/search?vertical=ebooks"
                            }
                        },
                        {title: joinIfArray(item.title), search: ""}
                    ]}
                />
            <HarmfulContent/>
            <div
                id="main"
                role="main"
                className={`${utils.container} ${css.contentWrapper}`}
            >
                <Content item={item}/>
            </div>

        </MainLayout>
    );
};

export const getServerSideProps = async context => {
    const query = context.query;
    const res = context.res;
    // check if item is found
    try {
        const res = await fetch(`${EBOOK_API}/${query.itemId}?api_key=${process.env.API_KEY}`);
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

        const props = washObject({
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
            })
        });

        return {
            props: props
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
