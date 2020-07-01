import React from "react";
import fetch from "isomorphic-fetch";
import { withRouter } from "next/router";

import MainLayout from "components/MainLayout";
import IconComponent from "shared/IconComponent";
import MidPageBlock from "shared/MidPageBlock";
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

import { midPageBlockContent } from "constants/ebooks-landing-page";

import css from "stylesheets/hubs.scss";

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
    const { router, page, pageTitle, news, midPageBlockContent } = this.props;
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

          <MidPageBlock
            className={css.sectionWrapper}
            title={page.acf.call_to_action.title}
            text={page.acf.call_to_action.text}
            buttonText={page.acf.call_to_action.button_text}
            buttonUrl={page.acf.call_to_action.button_url}
            imageSrc={page.acf.call_to_action.image}
            imageCaption={page.acf.call_to_action.image_credit}
          />    
          
          {midPageBlockContent.map((content, index) => {
            return (
              <MidPageBlock
                className={css.sectionWrapper}
                title={content.title}
                text={content.text}
                buttonText={content.button_text}
                buttonUrl={content.button_url}
                imageSrc={content.image}
                imageCaption={content.image_credit}
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

  console.log(midPageBlockContent)
  return {
    page: ebooksItem,
    pageTitle: ebooksItem.title.rendered,
    news: newsItems,
    midPageBlockContent: midPageBlockContent
  };
};

export default withRouter(EbooksPage);
