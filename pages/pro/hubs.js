import React from "react";

import MainLayout from "components/MainLayout";
import IconComponent from "shared/IconComponent";
import NewsLane from "shared/NewsLane";
import FullPageWidthBlock from "shared/FullPageWidthBlock";
import WebsiteFeature from "shared/WebsiteFeature";

import { wordpressLinks } from "lib/index";
import { safeFetch, wpAuthFetchOptions, isUpstreamUnavailable, upstreamUnavailable, safeJson } from "lib/safeFetch";
import ServiceUnavailable from "components/shared/ServiceUnavailable";

import {
  NEWS_PRO_ENDPOINT,
  PAGES_ENDPOINT,
  SEO_TYPE,
} from "constants/content-pages";

import css from "stylesheets/hubs.module.scss";
import utils from "stylesheets/utils.module.scss";
import { washObject } from "lib/washObject";

class HubsPage extends React.Component {
  refreshExternalLinks() {
    const main = document.getElementById("main");
    if (!main) return;
    const links = main.getElementsByTagName("a");
    wordpressLinks(links);
  }

  componentDidMount() {
    this.refreshExternalLinks();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.page !== this.props.page) {
      this.refreshExternalLinks();
    }
  }

  render() {
    const { page, pageTitle, news, temporarilyUnavailable } = this.props;
    if (temporarilyUnavailable) return <ServiceUnavailable />;
    if (!page?.acf) return null;
    return (
      <MainLayout pageTitle={pageTitle} seoType={SEO_TYPE}>
        <div id="main" role="main">
          <div
            className={`${css.pageHero} ${
              page.acf.feature ? css.withFeature : ""
            }`}
          >
            <IconComponent className={css.icon} name="network" />
            <h1>{page.title.rendered}</h1>
          </div>
          {page.acf.feature && page.acf.feature.title !== "" && (
            <WebsiteFeature
              title={page.acf.feature.title}
              text={page.acf.feature.text}
              buttonText={page.acf.feature.button_text}
              buttonUrl={page.acf.feature.button_url}
              imageSrc={page.acf.feature.image}
            />
          )}
          <div>
            <section
              className={`${css.tileSectionWrapper} ${utils.siteMaxWidth}`}
            >
              <ul className={css.sectionList}>
                {Array.isArray(page.acf.sections) && page.acf.sections.map((section, index) => {
                  return (
                    <li key={index} className={css.section}>
                      <h2 className={css.sectionTitle}>
                        <a href={`${section.url}`}>{section.title}</a>
                      </h2>
                      <p className={css.sectionText}>{section.text}</p>
                      {Array.isArray(section.quicklinks) && section.quicklinks.length > 0 && (
                        <ul className={css.sectionQuicklinks}>
                          {section.quicklinks.map((link, idx) => {
                            return (
                              <li
                                className={css.sectionQuicklink}
                                key={`link-${idx}`}
                              >
                                <a href={`${link.url}`}>{link.text}</a>
                              </li>
                            );
                          })}
                        </ul>
                      )}
                    </li>
                  );
                })}
              </ul>
            </section>
          </div>
          {page.acf.call_to_action && (
            <FullPageWidthBlock
              className={css.sectionWrapper}
              title={page.acf.call_to_action.title}
              text={page.acf.call_to_action.text}
              buttonText={page.acf.call_to_action.button_text}
              buttonUrl={page.acf.call_to_action.button_url}
              imageSrc={page.acf.call_to_action.image}
              imageCaption={page.acf.call_to_action.image_credit}
            />
          )}
          {news && <NewsLane title="Member News" items={news} />}
        </div>
      </MainLayout>
    );
  }
}

export async function getServerSideProps(context) {
  const { draftMode } = context;
  const authOptions = wpAuthFetchOptions(draftMode);
  const hubParams = draftMode ? "?slug=hubs&status=any&context=edit" : "?slug=hubs";
  const hubRes = await safeFetch(PAGES_ENDPOINT + hubParams, authOptions);
  if (isUpstreamUnavailable(hubRes)) return upstreamUnavailable(context.res, hubRes);
  if (!hubRes?.ok) {
    return { notFound: true };
  }
  const hubJson = await safeJson(hubRes);
  if (hubJson === null) return upstreamUnavailable(context.res, hubRes);
  const hubItem = hubJson[0];
  if (!hubItem) {
    return { notFound: true };
  }

  // fetch news posts
  const newsRes = await safeFetch(NEWS_PRO_ENDPOINT);

  const newsItems = newsRes?.ok ? (await safeJson(newsRes) ?? []) : [];

  const props = washObject({
    page: hubItem,
    pageTitle: hubItem.title.rendered,
    news: newsItems,
  });

  return {
    props: props,
  };
}

export default HubsPage;
