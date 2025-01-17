import React from "react";
import fetch from "isomorphic-fetch";

import MainLayout from "components/MainLayout";
import IconComponent from "shared/IconComponent";
import FullPageWidthBlock from "shared/FullPageWidthBlock";
import NewsLane from "shared/NewsLane";
import WebsiteFeature from "shared/WebsiteFeature";

import {wordpressLinks} from "lib";

import {
    PAGES_ENDPOINT,
    NEWS_EBOOKS_ENDPOINT,
    SEO_TYPE
} from "constants/content-pages";

import {midPageBlockContent} from "constants/ebooks-landing-page";

import css from "stylesheets/hubs.module.scss";
import {washObject} from "lib/washObject";

class EbooksPage extends React.Component {
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
        const {page, pageTitle, news, showWPFeature} = this.props;
        return (
            <MainLayout pageTitle={pageTitle} seoType={SEO_TYPE}>
                <div id="main" role="main">
                    <div
                        className={`${css.pageHero} ${page.acf.feature
                            ? css.withFeature
                            : ""}`}
                    >
                        <IconComponent className={css.icon} name="ebooks"/>
                        <h1>{page.title.rendered}</h1>
                    </div>

                    <WebsiteFeature
                        title="Take Control of your Digital Collections"
                        text="Driven by our mission to maximize access to knowledge, DPLA gives libraries greater control over the acquisition and delivery of ebooks and audiobooks and makes more diverse ebooks easily available to libraries and their patrons while advocating for the needs of libraries in the marketplace. DPLA’s ebook work is supported by the Alfred P. Sloan Foundation."
                        buttonText=""
                        buttonUrl=""
                        imageSrc="static/images/ebooks/ebooks-feature.png"
                    />

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

                    {showWPFeature &&
                    <FullPageWidthBlock
                        className={css.sectionWrapper}
                        title={page.acf.call_to_action.title}
                        text={page.acf.call_to_action.text}
                        buttonText={page.acf.call_to_action.button_text}
                        buttonUrl={page.acf.call_to_action.button_url}
                        imageSrc={page.acf.call_to_action.image}
                        imageCaption={page.acf.call_to_action.image_credit}
                        imageAlt={
                        page.acf.call_to_action.image_credit +
                            " " + page.acf.call_to_action.image_href}
                    />
                    }

                    <div>
                        {midPageBlockContent.map((content, index) => {
                            return (
                                <FullPageWidthBlock
                                    key={`mid-page-block-${index + 1}`}
                                    className={css.sectionWrapper}
                                    title={content.title}
                                    text={content.text}
                                    buttonText={content.buttonText}
                                    buttonUrl={content.buttonUrl}
                                    imageSrc={content.image}
                                    imageCaption={content.imageCredit}
                                    imageAlt={content.imageAlt}
                                    imageHref={content.imageHref}
                                    links={content.links}
                                />
                            )
                        })}
                    </div>

                    <NewsLane title="Ebook News" items={news}/>
                </div>
            </MainLayout>
        );
    }
}

export const getServerSideProps = async ({}) => {
    const ebooksRes = await fetch(PAGES_ENDPOINT + "?slug=ebooks");
    const ebooksJson = await ebooksRes.json();
    const ebooksItem = ebooksJson[0];

    // fetch news posts
    const newsRes = await fetch(NEWS_EBOOKS_ENDPOINT);
    const newsItems = await newsRes.json();

    const props = washObject({
        page: ebooksItem,
        pageTitle: ebooksItem.title.rendered,
        news: newsItems,
        showWPFeature: false
    });

    return {
        props: props
    };
};

export default EbooksPage;
