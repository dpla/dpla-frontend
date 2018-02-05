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

import {
  NEWS_PRO_ENDPOINT,
  PAGES_ENDPOINT,
  SEO_TYPE
} from "constants/content-pages";

import { stylesheet, classNames } from "css/pages/hubs.css";

const HubsPage = ({ url, page, pageTitle, news }) =>
  <MainLayout route={url} pageTitle={pageTitle} seoType={SEO_TYPE}>
    <div id="main" role="main" className={classNames.pageWrapper}>
      <div
        className={`${classNames.pageHero} ${page.acf.feature
          ? classNames.withFeature
          : ""}`}
      >
        <IconComponent className={classNames.icon} name="network" />
        <WPEdit page={page} url={url} />
        <h1>{page.title.rendered}</h1>
      </div>
      {page.acf.feature &&
        <WebsiteFeature
          title={page.acf.feature.title}
          text={page.acf.feature.text}
          buttonText={page.acf.feature.button_text}
          buttonUrl={page.acf.feature.button_url}
          imageSrc={page.acf.feature.image}
        />}
      <div className={`${classNames.pageWrapper}`}>
        <section className={`${classNames.sectionWrapper} site-max-width`}>
          <ul className={classNames.sectionList}>
            {page.acf.sections.map((section, index) => {
              return (
                <li key={index} className={classNames.section}>
                  <h2 className={classNames.sectionTitle}>
                    <a href={`${section.url}`}>{section.title}</a>
                  </h2>
                  <p className={classNames.sectionText}>
                    {section.text}
                  </p>
                  {section.quicklinks &&
                    <ul className={classNames.sectionQuicklinks}>
                      {section.quicklinks.map((link, idx) => {
                        return (
                          <li
                            className={classNames.sectionQuicklink}
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
        classNames={classNames.sectionWrapper}
        title={page.acf.call_to_action.title}
        text={page.acf.call_to_action.text}
        buttonText={page.acf.call_to_action.button_text}
        buttonUrl={page.acf.call_to_action.button_url}
        imageSrc={page.acf.call_to_action.image}
        imageCaption={page.acf.call_to_action.image_credit}
      />
      <NewsLane title="Member News" items={news} />
    </div>
    <style dangerouslySetInnerHTML={{ __html: stylesheet }} />
  </MainLayout>;

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
