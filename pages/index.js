import React from "react";

import MainLayout from "components/MainLayout";
import HomeUser from "components/HomePageComponents/HomeUser";

import {
    addCommasToNumber, exhibitHomePage,
    getMenuItemUrl, loadExhibition
} from "lib";

import {NUMBER_OF_USER_GUIDES_TO_SHOW, HEADER_DESCRIPTION_TOKEN} from "constants/home";

import {
    PAGES_ENDPOINT,
    ABOUT_MENU_ENDPOINT,
    NEWS_USER_ENDPOINT
} from "constants/content-pages";

import {API_SETTINGS_ENDPOINT} from "constants/site";
import {SITE_ENV} from "constants/env";
import {washObject} from "lib/washObject";

const Home = ({
                  sourceSets,
                  guides,
                  exhibitions,
                  headerDescription,
                  news,
                  content
              }) =>
    <MainLayout
        hidePageHeader={SITE_ENV === "user"}
        hideSearchBar={SITE_ENV === "pro"}
    >
        <div id="main" role="main">
            <HomeUser
                sourceSets={sourceSets}
                exhibitions={exhibitions}
                guides={guides}
                headerDescription={headerDescription}
                news={news}
                content={content}
            />
        </div>
    </MainLayout>;

export const getServerSideProps = async () => {

    // fetch home info
    // 1. fetch the settings from WP
    const settingsRes = await fetch(API_SETTINGS_ENDPOINT);
    const settingsJson = await settingsRes.json();
    // 2. get the corresponding value
    const endpoint = `${PAGES_ENDPOINT}/${settingsJson.acf.homepage_endpoint}`;
    const guides_endpoint =
        `${PAGES_ENDPOINT}/${settingsJson.acf.guides_endpoint}`;
    // 3. fetch it
    const homeRes = await fetch(endpoint);
    const homepageJson = await homeRes.json();

    // fetch featured exhibits data
    const featuredExhibitSlugs = homepageJson.acf.featured_exhibits;

    const featuredExhibits = await Promise.all(
        featuredExhibitSlugs.map(async exhibit => {
            const exhibitJson = await loadExhibition(exhibit.exhibit_id);
            const homePage = exhibitHomePage(exhibitJson);
            const thumbnailUrl = homePage.page_blocks[0].attachments[0].files[0].file_urls.fullsize;

            return {
                name: exhibitJson.title,
                repImageUrl: thumbnailUrl,
                thumbnailUrl,
                featured: false,
                href: `/exhibitions/${exhibitJson.slug}`,
                as: `/exhibitions/${exhibitJson.slug}`
            }
        })
    );

    // fetch featured primary source sets data
    const featuredPrimarySourceSets =
        homepageJson.acf.featured_primary_source_sets;

    const sourceSets = [];
    featuredPrimarySourceSets.forEach(featuredSet => {
        if (featuredSet) {
            const setWithLinkInfo = Object.assign({}, featuredSet, {
                href: `/primary-source-sets/set?set=${featuredSet.primary_source_set_id}`,
                as: `/primary-source-sets/${featuredSet.primary_source_set_id}`,
                repImageUrl: featuredSet.image_url
            });
            sourceSets.push(setWithLinkInfo);
        }
    });

    // fetch item count

    const apiUrl = `${process.env.API_URL}/items?page_size=0&api_key=${process.env.API_KEY}`;
    const itemsRes = await fetch(apiUrl);
    const itemsJson = await itemsRes.json();
    let itemCount = 0 // default handles unexpected error
    if ("count" in itemsJson) {
        if (itemsJson.count.value !== undefined) {
            itemCount = itemsJson.count.value // ElasticSearch 7
        } else {
            itemCount = itemsJson.count // ElasticSearch 6
        }
    }
    const headerDescription = homepageJson.acf.header_description.replace(
        HEADER_DESCRIPTION_TOKEN,
        addCommasToNumber(itemCount)
    );

    // fetch user guides data
    const aboutMenuRes = await fetch(ABOUT_MENU_ENDPOINT);
    const aboutMenuJson = await aboutMenuRes.json();
    const indexPageItem = aboutMenuJson.items.find(
        item => item.url === guides_endpoint
    );
    const guides = await Promise.all(
        aboutMenuJson.items
            .filter(item => item.menu_item_parent === indexPageItem.object_id)
            .slice(0, NUMBER_OF_USER_GUIDES_TO_SHOW)
            .map(async guide => {
                const guideRes = await fetch(getMenuItemUrl(guide));
                const guideJson = await guideRes.json();
                return Object.assign({}, guide, {
                    slug: guide.post_name,
                    summary: guideJson.acf.summary,
                    title: guideJson.title.rendered,
                    displayTitle: guideJson.acf.display_title,
                    color: guideJson.acf.color,
                    illustration: guideJson.acf.illustration
                });
            })
    );

    // fetch news posts
    const newsRes = await fetch(NEWS_USER_ENDPOINT);
    const newsItems = await newsRes.json();

    const props = washObject({
        sourceSets,
        guides,
        exhibitions: featuredExhibits,
        headerDescription,
        news: newsItems,
        content: homepageJson
    });

    return {
        props: props
    };
};

export default Home;
