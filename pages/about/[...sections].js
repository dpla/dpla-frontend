import React from "react";
import { withRouter } from "next/router";
import striptags from "striptags";

import MainLayout from "components/MainLayout";
import ContentPagesSidebar from "components/shared/ContentPagesSidebar";
import FeatureHeader from "shared/FeatureHeader";
import BreadcrumbsModule from "shared/BreadcrumbsModule";

import { API_SETTINGS_ENDPOINT } from "constants/site";
import {
  ABOUT_MENU_ENDPOINT,
  PAGES_ENDPOINT,
  SEO_TYPE,
} from "constants/content-pages";

import {
  getBreadcrumbs,
  getItemWithId,
  wordpressLinks,
  getMenuItemUrl,
  decodeHTMLEntities,
} from "lib";

import contentCss from "stylesheets/content-pages.module.scss";
import utils from "stylesheets/utils.module.scss";
import { washObject } from "lib/washObject";

class AboutMenuPage extends React.Component {
  refreshExternalLinks() {
    const links = document.getElementById("main").getElementsByTagName("a");
    wordpressLinks(links);
  }

  componentDidMount() {
    this.refreshExternalLinks();
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    this.refreshExternalLinks();
  }

  render() {
    const { router, content, items, breadcrumbs, pageTitle, pageDescription } =
      this.props;

    return (
      <MainLayout
        pageTitle={pageTitle}
        seoType={SEO_TYPE}
        pageDescription={pageDescription}
      >
        {breadcrumbs.length > 0 && (
          <BreadcrumbsModule breadcrumbs={breadcrumbs} route={router} />
        )}
        {breadcrumbs.length === 0 && (
          <FeatureHeader title={pageTitle} description={""} />
        )}
        <div
          className={`${utils.container} ${contentCss.sidebarAndContentWrapper}`}
          data-testid={"content"}
        >
          <div className={utils.row}>
            <ContentPagesSidebar
              items={items}
              activeItemId={content.id}
              className={contentCss.sidebar}
            />
            <div className={`${utils.colXs12} ${utils.colMd7}`}>
              <div id="main" role="main" className={contentCss.content}>
                {breadcrumbs.length > 0 && (
                  <h1
                    dangerouslySetInnerHTML={{ __html: content.title.rendered }}
                  />
                )}
                <div
                  dangerouslySetInnerHTML={{ __html: content.content.rendered }}
                />
              </div>
            </div>
          </div>
        </div>
      </MainLayout>
    );
  }
}

export const getServerSideProps = async (context) => {
  // fetch settings info
  // 1. fetch the settings from WP
  const settingsRes = await fetch(API_SETTINGS_ENDPOINT);
  const settingsJson = await settingsRes.json();
  // 2. get the corresponding value
  const endpoint = `${PAGES_ENDPOINT}/${settingsJson.acf.guides_endpoint}`;
  const sections = context.params.sections;
  const section = sections?.[0];
  const subsection = sections?.[1];
  const pageSlug = subsection || section || "about-us";
  const response = await fetch(ABOUT_MENU_ENDPOINT);
  const json = await response.json();
  const pageItem = json.items.find((item) => item.post_name === pageSlug);
  const guidesPageItem = json.items.find((item) => item.url === endpoint);
  if (
    !pageItem ||
    pageItem === guidesPageItem ||
    pageItem?.menu_item_parent === guidesPageItem.object_id
  ) {
    return { notFound: true };
  }

  // for the breadcrumbs
  const breadcrumbObject = getBreadcrumbs({
    items: json.items,
    leafId: pageItem.object_id,
  });

  const breadcrumbs = [];

  if (JSON.stringify(breadcrumbObject) !== "{}") {
    Object.values(breadcrumbObject).forEach((crumb) => {
      let slug = "/";
      let url = "/about?section=" + crumb.post_name;
      // if this is a child item the url is /:topsection/:thisitem
      if (crumb.menu_item_parent !== "0") {
        const parent = getItemWithId({
          items: json.items,
          id: crumb.menu_item_parent,
        });
        slug = slug + parent.post_name + "/";
      }
      breadcrumbs.push({
        title: crumb.title,
        url: slug + crumb.post_name,
      });
    });
    breadcrumbs.push({ title: pageItem.title });
  }

  // to support hand-made links we check to see if it is pointed to a wp page id
  const url = getMenuItemUrl(pageItem);

  const pageRes = await fetch(url);
  const pageJson = await pageRes.json();
  let pageDescription = "";
  if (pageJson.excerpt && pageJson.excerpt.rendered) {
    pageDescription = decodeHTMLEntities(
      striptags(pageJson.excerpt.rendered.replace("[&hellip;]", "…")),
    );
  }

  const props = washObject({
    content: pageJson,
    items: json.items,
    breadcrumbs: breadcrumbs,
    pageTitle: pageItem.title,
    pageDescription: pageDescription,
  });

  return { props };
};

export default withRouter(AboutMenuPage);
