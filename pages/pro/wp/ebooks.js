import React from "react";
import fetch from "isomorphic-fetch";
import { withRouter } from "next/router";

import MainLayout from "components/MainLayout";
import IconComponent from "shared/IconComponent";
import FullPageWidthBlock from "shared/FullPageWidthBlock";
import NewsLane from "shared/NewsLane";
import WebsiteFeature from "shared/WebsiteFeature";
import WPEdit from "shared/WPEdit";

import { wordpressLinks } from "lib";

import {
  NEWS_PRO_ENDPOINT,
  PAGES_ENDPOINT,
  NEWS_EBOOKS_ENDPOINT,
  SEO_TYPE
} from "constants/content-pages";

import { beginningPageBlockContent, midPageBlockContent } from "constants/ebooks-landing-page";

import css from "stylesheets/hubs.scss";
import ebooks from "stylesheets/ebooks.scss";

class EbooksPage extends React.Component {
  refreshExternalLinks() {
    var links = document.getElementById("main").getElementsByTagName("a");
    wordpressLinks(links);
  }
  componentDidMount() {
    this.refreshExternalLinks();
  }

  componentDidUpdate() {
    this.refreshExternalLinks();
  }

  render() {
    const { router, page, pageTitle, news } = this.props;
    return (
      <MainLayout route={router} pageTitle={pageTitle} seoType={SEO_TYPE}>
        <div id="main" role="main" className={css.pageWrapper}>
          <div
            className={`${css.pageHero} ${page.acf.feature
              ? css.withFeature
              : ""}`}
          >
            <IconComponent className={css.icon} name="ebooks" />
            <WPEdit page={page} url={router} />
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

          <FullPageWidthBlock
            className={css.sectionWrapper}
            title={beginningPageBlockContent.title}
            text={beginningPageBlockContent.text}
            buttonText={beginningPageBlockContent.button_text}
            buttonUrl={beginningPageBlockContent.button_url}
            imageSrc={beginningPageBlockContent.image}
            imageCaption={beginningPageBlockContent.image_credit}
          /> 

          <div className={`${css.pageWrapper}`}>
            <section className={`${css.sectionWrapper} site-max-width`}>
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
            imageAlt={page.acf.call_to_action.image_credit}
          />    
          
          {midPageBlockContent.map((content, index) => {
            return (
              <FullPageWidthBlock
                key={`mid-page-block-${index + 1}`}
                className={css.sectionWrapper}
                title={content.title}
                text={content.text}
                buttonText={content.button_text}
                buttonUrl={content.button_url}
                imageSrc={content.image}
                imageCaption={content.image_credit}
                imageAlt={content.imageAlt}
                links={content.links}
            /> 
            ) 
          })}
          
          <NewsLane title="Ebook News" items={news} />
        </div>
      </MainLayout>
    );
  }
}

EbooksPage.getInitialProps = async ({ req, query, res }) => {
  const ebooksRes = await fetch(PAGES_ENDPOINT + "?slug=ebooks");
  const ebooksJson = await ebooksRes.json();
  const ebooksItem = ebooksJson[0];

  // fetch news posts
  const newsRes = await fetch(NEWS_EBOOKS_ENDPOINT);
  const newsItems = await newsRes.json();

  return {
    page: ebooksItem,
    pageTitle: ebooksItem.title.rendered,
    news: newsItems
  };
};

export default withRouter(EbooksPage);
