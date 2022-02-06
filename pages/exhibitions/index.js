import React from "react";
import fetch from "isomorphic-fetch";

import MainLayout from "components/MainLayout";
import AllExhibitions from "components/ExhibitionsComponents/AllExhibitions";
import Footer from "components/ExhibitionsComponents/Footer";
import {
    TITLE,
    EXHIBITS_ENDPOINT,
    EXHIBIT_PAGES_ENDPOINT,
    FILES_ENDPOINT
} from "constants/exhibitions";
import {washObject} from "lib/washObject";
import {exhibitFilesHelper} from "lib/exhibitions/exhibitFilesHelper";

const Exhibitions = ({exhibitions}) =>
    <MainLayout pageTitle={TITLE}>
        <div id="main" role="main">
            <AllExhibitions exhibitions={exhibitions}/>
        </div>
        <Footer/>
    </MainLayout>;

export const getServerSideProps = async ({req}) => {
    const currentUrl = `${req.protocol}://${req.get("host")}`;
    const exhibitsRes = await fetch(`${process.env.OMEKA_URL}/api/exhibits`);
    const exhibitsJson = await exhibitsRes.json();
    console.log(exhibitsJson);
    let exhibitions = [];
    if (exhibitsJson.length > 0) {
        exhibitions = await Promise.all(
            exhibitsJson
                .map(async exhibit => {
                    const exhibitPageRes = await fetch(
                        `${process.env.OMEKA_URL}/api/exhibit_pages?exhibit=${exhibit.id}`
                    );
                    const exhibitJson = await exhibitPageRes.json();

                    const pageBlock = exhibitJson.find(
                        exhibit =>
                            exhibit.slug === "home-page" ||
                            exhibit.slug === "homepage" ||
                            exhibit.order === 0
                    ).page_blocks[0];

                    const itemId = pageBlock.attachments[0].item.id;
                    const filesRes = await fetch(
                        `${process.env.OMEKA_URL}/api/files?item=${itemId}`
                    );
                    const filesJson = await filesRes.json();

                    const thumbnailUrl = exhibitFilesHelper(filesJson[0].file_urls.square_thumbnail, currentUrl);

                    return Object.assign({}, exhibit, {
                        thumbnailUrl
                    });
                })
                .reverse()
        );
    }

    const props = washObject({exhibitions});

    return {
        props: props
    };
};

export default Exhibitions;
