import React from "react";
import fetch from "isomorphic-fetch";

import MainLayout from "components/MainLayout";
import BreadcrumbsModule from "components/PrimarySourceSetsComponents/BreadcrumbsModule";
import ImageAndCaption from "components/ExhibitionsComponents/Exhibition/ImageAndCaption";
import Details from "components/ExhibitionsComponents/Exhibition/Details";

import {SEO_TYPE} from "constants/exhibition";

import {
    getDplaItemIdFromExhibit,
    loadExhibitions,
    loadExhibition
} from "lib";

import {washObject} from "lib/washObject";
import {exhibitFilesHelper} from "lib/exhibitions/exhibitFilesHelper";

class Exhibition extends React.Component {

    componentDidMount() {
        window.scrollTo(0, 0);
        document.body.focus();
    }

    render() {
        const {exhibition} = this.props;
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
                    <Details exhibition={exhibition}/>
                </div>
            </MainLayout>
        );
    }
}

export async function getStaticPaths() {
    const exhibitions = await loadExhibitions();
    const slugs = exhibitions.exhibitions.map(exhibition => {exhibition.slug});
    const paths = slugs.map(slug => { params: { slug }});

    return {
      paths,
      fallback: false
    }
  }

export const getStaticProps = async (context) => {
    const currentUrl = process.env.BASE_URL;

    // load exhibition
    const exhibition = await loadExhibition(context.slug)

    // load page

    const sortedExhibitPages = exhibition.pages
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
        `${process.env.OMEKA_URL}/api/files?item=${item.id}`
    );
    const filesJson = await filesRes.json();

    // Get homepage item (full metadata)
    const itemRes = await fetch(`${process.env.OMEKA_URL}/api/items/${item.id}`);
    const itemJson = await itemRes.json();

    // Get DPLA item ID
    const dplaItemId = getDplaItemIdFromExhibit(itemJson);

    // Call DPLA API
    const dplaApiRes = await fetch(`https://api.dp.la/v2/items/${dplaItemId}?api_key=${process.env.API_KEY}`);
    const dplaItemJson = dplaApiRes.status === 200 ? await dplaApiRes.json() : null;
    const thumbnailUrl = exhibitFilesHelper(filesJson[0].file_urls.fullsize, currentUrl);

    const props = washObject({
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
