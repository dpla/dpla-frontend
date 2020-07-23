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
    const { router, page, pageTitle, news, showWPFeature } = this.props;
    return (
      <MainLayout route={router} pageTitle={pageTitle} seoType={SEO_TYPE}>
        <div id="main" role="main">
          <div
            className={`${css.pageHero} ${page.acf.feature
              ? css.withFeature
              : ""}`}
          >
            <IconComponent className={css.icon} name="ebooks" />
            <WPEdit page={page} url={router} />
            <h1>{page.title.rendered}</h1>
          </div>
       
          <WebsiteFeature
            title="Take Control of your Digital Collections"
            text="Driven by our mission to maximize access to knowledge, DPLA provides libraries greater control over the acquisition and delivery of ebooks and audiobooks and makes more diverse ebooks easily available to libraries and their patrons, while advocating for the needs of libraries in the marketplace. DPLA’s ebook work is supported by Alfred P. Sloan Foundation."
            buttonText=""
            buttonUrl=""
            imageSrc="static/images/ebooks/ebooks-feature.png"
          />

          <section className={`${css.tileSectionWrapper} site-max-width`}>
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
              imageAlt={page.acf.call_to_action.image_credit}
              imageAlt={page.acf.call_to_action.image_href}
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
    news: newsItems,
    showWPFeature: false
  };
};

export default withRouter(EbooksPage);
