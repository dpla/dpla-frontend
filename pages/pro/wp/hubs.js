import React from "react";
import fetch from "isomorphic-fetch";

import MainLayout from "components/MainLayout";
import ContentPagesSidebar from "shared/ContentPagesSidebar";
import IconComponent from "shared/IconComponent";
import NewsLane from "shared/NewsLane";

import {
  NEWS_HUB_ENDPOINT,
  PRO_MENU_ENDPOINT,
  PAGES_ENDPOINT,
  SEO_TYPE
} from "constants/content-pages";
import { getBreadcrumbs, getItemWithId, getItemWithName } from "utilFunctions";

import {
  classNames as contentClasses,
  stylesheet as contentStyles
} from "css/pages/content-pages-wysiwyg.css";
import { classNames as utilClassNames } from "css/utils.css";
import { stylesheet, classNames } from "css/pages/hubs.css";

const HubsPage = ({ url, page, items, pageTitle, news }) =>
  <MainLayout route={url} pageTitle={pageTitle} seoType={SEO_TYPE}>
    <div id="main">
      <div className={classNames.pageHero}>
        <IconComponent className={classNames.icon} name="network" />
        <h1>{page.title.rendered}</h1>
      </div>
      <div
        className={`${contentClasses.sidebarAndContentWrapper} ${classNames.pageWrapper}`}
      >
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
        <section
          className={`${classNames.callToAction} ${classNames.sectionWrapper} site-max-width`}
        >
          <h2>{page.acf.call_to_action.title}</h2>
          <p>{page.acf.call_to_action.text}</p>
          <p>{page.acf.call_to_action.button_text}</p>
          {page.acf.call_to_action.image &&
            <div>
              <img src={page.acf.call_to_action.image} />
              <div>
                <strong>Image:</strong> {page.acf.call_to_action.image_credit}
              </div>
            </div>}
        </section>
        <NewsLane items={news} />
      </div>
    </div>
    <style dangerouslySetInnerHTML={{ __html: contentStyles }} />
    <style dangerouslySetInnerHTML={{ __html: stylesheet }} />
  </MainLayout>;

HubsPage.getInitialProps = async ({ req, query, res }) => {
  const menuResponse = await fetch(PRO_MENU_ENDPOINT);
  const menuJson = await menuResponse.json();
  const menuItems = menuJson.items;
  const hubItem = menuItems.find(item => item.post_name === "hubs");
  const hubRes = await fetch(hubItem.url);
  const hubJson = await hubRes.json();

  // fetch news posts
  const newsRes = await fetch(NEWS_HUB_ENDPOINT);
  const newsItems = await newsRes.json();

  return {
    page: hubJson,
    items: menuItems,
    pageTitle: hubItem.title,
    news: newsItems
  };
};

export default HubsPage;
