import React from "react";
import fetch from "isomorphic-fetch";

import MainLayout from "components/MainLayout";
import ContentPagesSidebar from "shared/ContentPagesSidebar";
import IconComponent from "shared/IconComponent";
import NewsLane from "shared/NewsLane";
import Button from "components/shared/Button";

import {
  NEWS_HUB_ENDPOINT,
  PAGES_ENDPOINT,
  SEO_TYPE
} from "constants/content-pages";

import {
  classNames as contentClasses,
  stylesheet as contentStyles
} from "css/pages/content-pages-wysiwyg.css";
import { classNames as utilClassNames } from "css/utils.css";
import { stylesheet, classNames } from "css/pages/hubs.css";

const HubsPage = ({ url, page, pageTitle, news }) =>
  <MainLayout route={url} pageTitle={pageTitle} seoType={SEO_TYPE}>
    <div id="main" role="main">
      <div className={classNames.pageHero}>
        <IconComponent className={classNames.icon} name="network" />
        <h1>{page.title.rendered}</h1>
      </div>
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
      <section className={`${classNames.callToAction}`}>
        <div
          className={`${classNames.callToActionWrapper} ${classNames.sectionWrapper} site-max-width`}
        >
          <div className={classNames.callToActionText}>
            <h2>{page.acf.call_to_action.title}</h2>
            <p>{page.acf.call_to_action.text}</p>
            <div className={classNames.callToActionButton}>
              <Button type="secondary" url={page.acf.call_to_action.button_url}>
                {page.acf.call_to_action.button_text}
              </Button>
            </div>
          </div>
          {page.acf.call_to_action.image &&
            <div className={classNames.callToActionImage}>
              <img src={page.acf.call_to_action.image} alt="" />
              <span>
                <strong>Image:</strong> {page.acf.call_to_action.image_credit}
              </span>
            </div>}
        </div>
      </section>
      <NewsLane title="Member News" items={news} />
    </div>
    <style dangerouslySetInnerHTML={{ __html: contentStyles }} />
    <style dangerouslySetInnerHTML={{ __html: stylesheet }} />
  </MainLayout>;

HubsPage.getInitialProps = async ({ req, query, res }) => {
  const hubRes = await fetch(PAGES_ENDPOINT + "?slug=hubs");
  const hubJson = await hubRes.json();
  const hubItem = hubJson[0];

  // fetch news posts
  const newsRes = await fetch(NEWS_HUB_ENDPOINT);
  const newsItems = await newsRes.json();

  return { page: hubItem, pageTitle: hubItem.title.rendered, news: newsItems };
};

export default HubsPage;
