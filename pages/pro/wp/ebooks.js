import React from "react";
import fetch from "isomorphic-fetch";
import { withRouter } from "next/router";

import MainLayout from "components/MainLayout";
import IconComponent from "shared/IconComponent";
import NewsLane from "shared/NewsLane";
import CallToAction from "shared/CallToAction";
import WebsiteFeature from "shared/WebsiteFeature";
import WPEdit from "shared/WPEdit";

import { wordpressLinks } from "lib";

import {
  NEWS_PRO_ENDPOINT,
  PAGES_ENDPOINT,
  NEWS_EBOOKS_ENDPOINT,
  SEO_TYPE
} from "constants/content-pages";

import css from "stylesheets/hubs.scss";
import MidPageBlock from "shared/MidPageBlock";

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

  const midPageBlockContent = [
    {
      title: "The only econtent marketplace built by and for libraries",
      text: "DPLA Exchange gives you a public option for econtent acquisitions that works seamlessly with the SimplyE national library-driven platform. DPLA can help you customize collections for your community beyond the bestsellers, including a large selection of diverse and non-English titles. Member libraries also benefit from DPLA’s ongoing publisher negotiations for new, more favorable licensing terms.",
      listLinks: [
        "Browse & buy content from DPLA Exchange",
        "Browse simultaneous multi-use collections", 
        "Learn more: DPLA Exchange & patron privacy"
      ]
    },
    {
      title: "Build an instant collection of free ebooks",
      text: "DPLA jumpstarts your eshelves with the free Open Bookshelf collection. Select from thousands of freely available titles including classics, contemporary fiction and nonfiction, children’s books, and textbooks, all reviewed by our Curation Corps of librarians.",
      listLinks: [
        "Browse the Open Bookshelf collection",
        "Learn about the Curation Corps",
      ]
    },
    {
      title: "Simultaneous multi-user content",
      text: "DPLA has partnered with BiblioLabs to provide libraries access to a growing collection of thousands of titles, including the  independent author collections and titles from a number of major publishers, using a simultaneous multi-use model that allows an unlimited number of patrons to borrow books at the same time.",
      listLinks: [
        "Browse the BiblioLabs collection",
        "Learn about the Indie Author Project",
      ]
    },
    {
      title: "Simultaneous multi-user content",
      text: "DPLA is a publisher too! We’ve introduced instant, original, easy-to-read ebook versions of important government documents for the Open Bookshelf collection, including the award-winning ebook version of the Mueller Report and the Impeachment Papers. DPLA’s ebooks work is supported by the Alfred P. Sloan Foundation.",
    },
  ]

  return {
    page: ebooksItem,
    pageTitle: ebooksItem.title.rendered,
    news: newsItems,
    midPageBlockContent: midPageBlockContent
  };
};

export default withRouter(EbooksPage);
