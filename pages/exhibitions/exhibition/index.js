import React from "react";
import fetch from "isomorphic-fetch";

import MainLayout from "components/MainLayout";
import BreadcrumbsModule from "components/PrimarySourceSetsComponents/BreadcrumbsModule";
import ImageAndCaption from "components/ExhibitionsComponents/Exhibition/ImageAndCaption";
import Details from "components/ExhibitionsComponents/Exhibition/Details";

import {
    EXHIBITS_ENDPOINT,
    EXHIBIT_PAGES_ENDPOINT,
    FILES_ENDPOINT,
    ITEMS_ENDPOINT
} from "constants/exhibitions";
import {SEO_TYPE} from "constants/exhibition";
import {API_ENDPOINT} from "constants/items";

import {
    getDplaItemIdFromExhibit,
} from "lib";
import {washObject} from "lib/washObject";

class Exhibition extends React.Component {
    componentDidMount() {
        window.scrollTo(0, 0);
        document.body.focus();
    }

    render() {
        const {exhibition, currentFullUrl} = this.props;
        return (
            <MainLayout
                pageImage={exhibition.thumbnailUrl}
                pageTitle={exhibition.title.replace(/\*/g, "")}
                seoType={SEO_TYPE}
            >
                <BreadcrumbsModule
                    breadcrumbs={[
                        {
                            title: "Exhibitions",
                            url: "/exhibitions",
                            as: "/exhibitions"
                        },
                        {title: exhibition.title, search: ""}
                    ]}
                />
                <div id="main" role="main" data-cy="exhibition-home">
                    <ImageAndCaption exhibition={exhibition}/>
                    <Details
                        exhibition={exhibition}
                        currentFullUrl={currentFullUrl}
                    />
                </div>
            </MainLayout>
        );
    }
}

export const getServerSideProps = async ({query, req}) => {
    const currentFullUrl = `${req.protocol}://${req.get("host")}${req.url}`;
    const currentUrl = `${req.protocol}://${req.get("host")}`;
    const {exhibition: exhibitionSlug} = query;
    const exhibitionsRes = await fetch(`${currentUrl}${EXHIBITS_ENDPOINT}`);
    const exhibitionsJson = await exhibitionsRes.json();
    const exhibition = exhibitionsJson.find(
        exhibition => exhibition.slug === exhibitionSlug
    );

    const exhibitPageRes = await fetch(
        `${currentUrl}${EXHIBIT_PAGES_ENDPOINT}?exhibit=${exhibition.id}`
    );
    const exhibitPageJson = await exhibitPageRes.json();
    const sortedExhibitPages = exhibitPageJson
        .filter(exhibition => !exhibition.parent)
        .sort((a, b) => a.order - b.order);

    // just in case order isn't consistent, try checking the slug first
    const homePage =
        sortedExhibitPages.find(
            exhibit => exhibit.slug === "home-page" || exhibit.slug === "homepage"
        ) || sortedExhibitPages[0];

    const {text} = homePage.page_blocks[0];
    const {item, caption} = homePage.page_blocks[0].attachments[0];

    // Get homepage item file
    const filesRes = await fetch(
        `${currentUrl}${FILES_ENDPOINT}?item=${item.id}`
    );
    const filesJson = await filesRes.json();

    // Get homepage item (full metadata)
    const itemRes = await fetch(`${currentUrl}${ITEMS_ENDPOINT}/${item.id}`);
    const itemJson = await itemRes.json();

    // Get DPLA item ID
    const dplaItemId = getDplaItemIdFromExhibit(itemJson);

    // Call DPLA API
    const dplaApiRes = await fetch(`${currentUrl}${API_ENDPOINT}/${dplaItemId}`);
    const dplaItemJson = await dplaApiRes.json();

    const thumbnailUrl = filesJson[0].file_urls.fullsize;

    const props = washObject({
        currentFullUrl,
        exhibition: Object.assign({}, exhibition, {
            thumbnailUrl,
            caption,
            text,
            dplaItemId,
            dplaItemJson,
            sections: sortedExhibitPages.slice(1)
        })
    });

    return {
        props: props
    };
};

export default Exhibition;
