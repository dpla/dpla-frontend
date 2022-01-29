import React from "react";
import fetch from "isomorphic-fetch";
import Router, { withRouter } from "next/router";
import striptags from "striptags";

import MainLayout from "components/MainLayout";
import ContentPagesSidebar from "components/shared/ContentPagesSidebar";
import FeatureHeader from "shared/FeatureHeader";
import BreadcrumbsModule from "shared/BreadcrumbsModule";

import { API_SETTINGS_ENDPOINT } from "constants/site";
import {
  ABOUT_MENU_ENDPOINT,
  PAGES_ENDPOINT,
  SEO_TYPE
} from "constants/content-pages";

import {
  getBreadcrumbs,
  getItemWithId,
  wordpressLinks,
  getMenuItemUrl,
  decodeHTMLEntities
} from "lib";

import contentCss from "stylesheets/content-pages.module.scss";
import utils from "stylesheets/utils.module.scss"

class AboutMenuPage extends React.Component {
  refreshExternalLinks() {
    const links = document
        .getElementById("main")
        .getElementsByTagName("a");
    wordpressLinks(links);
  }
  componentDidMount() {
    this.refreshExternalLinks();
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    this.refreshExternalLinks();
  }

  render() {
    const {
      router,
      content,
      items,
      breadcrumbs,
      pageTitle,
      pageDescription
    } = this.props;

    return (
      <MainLayout
        pageTitle={pageTitle}
        seoType={SEO_TYPE}
        pageDescription={pageDescription}
      >
        {breadcrumbs.length > 0 &&
          <BreadcrumbsModule breadcrumbs={breadcrumbs} route={router} />}
        {breadcrumbs.length === 0 &&
          <FeatureHeader title={pageTitle} description={""} />}
        <div
          className={`${utils.container} ${contentCss.sidebarAndContentWrapper}`}
          data-cy={'content'}
        >
          <div className={utils.row}>
            <ContentPagesSidebar
              items={items}
              activeItemId={content.id}
              className={contentCss.sidebar}
            />
            <div className={`${utils.colXs12} ${utils.colMd7}`}>
              <div id="main" role="main" className={contentCss.content}>
                {breadcrumbs.length > 0 &&
                  <h1
                    dangerouslySetInnerHTML={{ __html: content.title.rendered }}
                  />}
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

export const getServerSideProps = async ({ req, query, res }) => {
  // fetch settings info
  // 1. fetch the settings from WP
  const settingsRes = await fetch(API_SETTINGS_ENDPOINT);
  const settingsJson = await settingsRes.json();
  // 2. get the corresponding value
  const endpoint = `${PAGES_ENDPOINT}/${settingsJson.acf.guides_endpoint}`;

  const pageName = query.subsection || query.section;
  const response = await fetch(ABOUT_MENU_ENDPOINT);
  const json = await response.json();
  const pageItem = json.items.find(item => item.post_name === pageName);
  const guidesPageItem = json.items.find(item => item.url === endpoint);
  if (pageItem === guidesPageItem) {
    //res.redirect("/guides");
    return {};

  } else if (pageItem.menu_item_parent === guidesPageItem.object_id) {
    //res.redirect(`/guides/guide?guide=${pageItem.post_name}`);
    return {};
  }

  // for the breadcrumbs
  const breadcrumbObject = getBreadcrumbs({
    items: json.items,
    leafId: pageItem.object_id
  });

  let breadcrumbs = [];

  if (JSON.stringify(breadcrumbObject) !== "{}") {
    Object.values(breadcrumbObject).map(crumb => {
      let slug = "/";
      let url = "/about?section=" + crumb.post_name;
      // if this is a child item the url is /:topsection/:thisitem
      if (crumb.menu_item_parent !== "0") {
        const parent = getItemWithId({
          items: json.items,
          id: crumb.menu_item_parent
        });
        slug = slug + parent.post_name + "/";
      }
      breadcrumbs.push({
        title: crumb.title,
        url: url,
        as: slug + crumb.post_name
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
      striptags(pageJson.excerpt.rendered.replace("[&hellip;]", "…"))
    );
  }

  const props = {
    content: pageJson,
    items: json.items,
    breadcrumbs: breadcrumbs,
    pageTitle: pageItem.title,
    pageDescription: pageDescription
  };

  return {
    props: props
  };
};

export default withRouter(AboutMenuPage);
