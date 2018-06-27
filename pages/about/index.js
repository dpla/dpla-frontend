import React from "react";
import fetch from "isomorphic-fetch";
import Router from "next/router";
import striptags from "striptags";

import MainLayout from "components/MainLayout";
import ContentPagesSidebar from "components/shared/ContentPagesSidebar";
import FeatureHeader from "shared/FeatureHeader";
import BreadcrumbsModule from "shared/BreadcrumbsModule";
import WPEdit from "shared/WPEdit";

import { API_SETTINGS_ENDPOINT } from "constants/site";
import {
  ABOUT_MENU_ENDPOINT,
  PAGES_ENDPOINT,
  SEO_TYPE
} from "constants/content-pages";
import {
  getBreadcrumbs,
  getItemWithId,
  getItemWithName,
  getMenuItemUrl,
  decodeHTMLEntities
} from "lib";
import { wordpressLinks } from "lib/externalLinks";

import utils from "stylesheets/utils.scss";
import contentCss from "stylesheets/content-pages.scss";

class AboutMenuPage extends React.Component {
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
    const {
      url,
      content,
      items,
      breadcrumbs,
      pageTitle,
      pageDescription
    } = this.props;
    return (
      <MainLayout
        route={url}
        pageTitle={pageTitle}
        seoType={SEO_TYPE}
        pageDescription={pageDescription}
      >
        {breadcrumbs.length > 0 &&
          <BreadcrumbsModule breadcrumbs={breadcrumbs} route={url} />}
        {breadcrumbs.length === 0 &&
          <FeatureHeader title={pageTitle} description={""} />}
        <div
          className={`${utils.container}
      ${contentCss.sidebarAndContentWrapper}`}
        >
          <div className="row">
            <ContentPagesSidebar
              route={url}
              items={items}
              activeItemId={content.id}
              className={contentCss.sidebar}
            />
            <div className="col-xs-12 col-md-7">
              <div id="main" role="main" className={contentCss.content}>
                <WPEdit page={content} url={url} />
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

AboutMenuPage.getInitialProps = async ({ req, query, res }) => {
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
    if (res) {
      res.redirect("/guides");
    } else {
      Router.push("/guides");
    }
    return {};
  } else if (pageItem.menu_item_parent === guidesPageItem.object_id) {
    if (res) {
      res.redirect(`/guides/guide?guide=${pageItem.post_name}`);
    } else {
      Router.push(
        `/guides/guide?guide=${pageItem.post_name}`,
        `/guides/${pageItem.post_name}`
      );
    }
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

  return {
    content: pageJson,
    items: json.items,
    breadcrumbs: breadcrumbs,
    pageTitle: pageItem.title,
    pageDescription: pageDescription
  };
};

export default AboutMenuPage;
