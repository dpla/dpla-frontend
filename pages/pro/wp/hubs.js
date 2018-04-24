import React from "react";
import fetch from "isomorphic-fetch";

import MainLayout from "components/MainLayout";
import ContentPagesSidebar from "shared/ContentPagesSidebar";
import IconComponent from "shared/IconComponent";
import NewsLane from "shared/NewsLane";
import Button from "shared/Button";
import CallToAction from "shared/CallToAction";
import WebsiteFeature from "shared/WebsiteFeature";
import WPEdit from "shared/WPEdit";

import { wordpressLinks } from "lib/externalLinks";

import {
  NEWS_PRO_ENDPOINT,
  PAGES_ENDPOINT,
  SEO_TYPE
} from "constants/content-pages";

import css from "stylesheets/hubs.scss";

class HubsPage extends React.Component {
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
    const { url, page, pageTitle, news } = this.props;
    return (
      <MainLayout route={url} pageTitle={pageTitle} seoType={SEO_TYPE}>
        <div id="main" role="main" className={css.pageWrapper}>
          <div
            className={`${css.pageHero} ${page.acf.feature
              ? css.withFeature
              : ""}`}
          >
            <IconComponent className={css.icon} name="network" />
            <WPEdit page={page} url={url} />
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
          <CallToAction
            className={css.sectionWrapper}
            title={page.acf.call_to_action.title}
            text={page.acf.call_to_action.text}
            buttonText={page.acf.call_to_action.button_text}
            buttonUrl={page.acf.call_to_action.button_url}
            imageSrc={page.acf.call_to_action.image}
            imageCaption={page.acf.call_to_action.image_credit}
          />
          <NewsLane title="Member News" items={news} />
        </div>
      </MainLayout>
    );
  }
}

HubsPage.getInitialProps = async ({ req, query, res }) => {
  const hubRes = await fetch(PAGES_ENDPOINT + "?slug=hubs");
  const hubJson = await hubRes.json();
  const hubItem = hubJson[0];

  // fetch news posts
  const newsRes = await fetch(NEWS_PRO_ENDPOINT);
  const newsItems = await newsRes.json();

  return { page: hubItem, pageTitle: hubItem.title.rendered, news: newsItems };
};

export default HubsPage;
