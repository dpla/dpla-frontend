import React from "react";

import MainLayout from "components/MainLayout";
import IconComponent from "shared/IconComponent";
import NewsLane from "shared/NewsLane";
import FullPageWidthBlock from "shared/FullPageWidthBlock";
import WebsiteFeature from "shared/WebsiteFeature";

import {wordpressLinks} from "lib";

import {
    NEWS_PRO_ENDPOINT,
    PAGES_ENDPOINT,
    SEO_TYPE
} from "constants/content-pages";

import css from "stylesheets/hubs.module.scss";
import utils from "stylesheets/utils.module.scss"
import {washObject} from "lib/washObject";

class HubsPage extends React.Component {
    refreshExternalLinks() {
        const links = document.getElementById("main").getElementsByTagName("a");
        wordpressLinks(links);
    }

    componentDidMount() {
        this.refreshExternalLinks();
    }

    componentDidUpdate() {
        this.refreshExternalLinks();
    }

    render() {
        const {page, pageTitle, news} = this.props;
        return (
            <MainLayout pageTitle={pageTitle} seoType={SEO_TYPE}>
                <div id="main" role="main">
                    <div
                        className={`${css.pageHero} ${page.acf.feature
                            ? css.withFeature
                            : ""}`}
                    >
                        <IconComponent className={css.icon} name="network"/>
                        <h1>{page.title.rendered}</h1>
                    </div>
                    {page.acf.feature &&
                    page.acf.feature.title !== "" &&
                    <WebsiteFeature
                        title={page.acf.feature.title}
                        text={page.acf.feature.text}
                        buttonText={page.acf.feature.button_text}
                        buttonUrl={page.acf.feature.button_url}
                        imageSrc={page.acf.feature.image}
                    />}
                    <div>
                        <section className={`${css.tileSectionWrapper} ${utils.siteMaxWidth}`}>
                            <ul className={css.sectionList}>
                                {page.acf.sections.map((section, index) => {
                                    return (
                                        <li key={index} className={css.section}>
                                            <h2 className={css.sectionTitle}>
                                                <a href={`${section.url}`}>{section.title}</a>
                                            </h2>
                                            <p className={css.sectionText}>
                                                {section.text}
                                            </p>
                                            {section.quicklinks &&
                                            <ul className={css.sectionQuicklinks}>
                                                {section.quicklinks.map((link, idx) => {
                                                    return (
                                                        <li
                                                            className={css.sectionQuicklink}
                                                            key={`link-${idx}`}
                                                        >
                                                            <a href={`${link.url}`}>
                                                                {link.text}
                                                            </a>
                                                        </li>
                                                    );
                                                })}
                                            </ul>}
                                        </li>
                                    );
                                })}
                            </ul>
                        </section>
                    </div>
                    <FullPageWidthBlock
                        className={css.sectionWrapper}
                        title={page.acf.call_to_action.title}
                        text={page.acf.call_to_action.text}
                        buttonText={page.acf.call_to_action.button_text}
                        buttonUrl={page.acf.call_to_action.button_url}
                        imageSrc={page.acf.call_to_action.image}
                        imageCaption={page.acf.call_to_action.image_credit}
                    />
                    <NewsLane title="Member News" items={news}/>
                </div>
            </MainLayout>
        );
    }
}

export const getServerSideProps = async ({req, query, res}) => {
    const hubRes = await fetch(PAGES_ENDPOINT + "?slug=hubs");
    const hubJson = await hubRes.json();
    const hubItem = hubJson[0];

    // fetch news posts
    const newsRes = await fetch(NEWS_PRO_ENDPOINT);
    const newsItems = await newsRes.json();

    const props = washObject({
        page: hubItem,
        pageTitle: hubItem.title.rendered,
        news: newsItems
    });

    return {
        props:  props
    };
};

export default HubsPage;
