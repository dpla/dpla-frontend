import React from "react";
import striptags from "striptags";

import MainLayout from "components/MainLayout";
import ContentPagesSidebar from "shared/ContentPagesSidebar";
import HeadingRule from "shared/HeadingRule";
import FeatureHeader from "shared/FeatureHeader";
import BreadcrumbsModule from "shared/BreadcrumbsModule";

import {
  getBreadcrumbs,
  getItemWithId,
  getMenuItemUrl,
  decodeHTMLEntities,
  wordpressLinks,
} from "lib";

import { PRO_MENU_ENDPOINT, SEO_TYPE } from "constants/content-pages";

import utils from "stylesheets/utils.module.scss";
import contentCss from "stylesheets/content-pages.module.scss";
import { washObject } from "lib/washObject";

class ProMenuPage extends React.Component {
  refreshExternalLinks() {
    const links = document.getElementById("main").getElementsByTagName("a");
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
      page,
      items,
      breadcrumbs,
      pageTitle,
      pageDescription,
      illustration,
    } = this.props;
    return (
      <MainLayout
        pageTitle={pageTitle}
        seoType={SEO_TYPE}
        pageDescription={pageDescription}
      >
        {breadcrumbs.length > 0 && (
          <BreadcrumbsModule breadcrumbs={breadcrumbs} />
        )}
        {breadcrumbs.length === 0 && !illustration && (
          <FeatureHeader title={pageTitle} description={""} />
        )}
        <div
          className={`${utils.container}
            ${contentCss.sidebarAndContentWrapper}`}
        >
          <div className={utils.row}>
            <ContentPagesSidebar
              className={contentCss.sidebar}
              items={items}
              activeItemId={page.id}
              rootPath="wp"
            />
            <div className={`${utils.colXs12} ${utils.colMd7}`}>
              <div id="main" role="main" className={contentCss.content}>
                {/* fancy pages (with illustrations) get special heading */}
                {illustration && (
                  <div>
                    <img
                      src={illustration.url}
                      alt=""
                      className={contentCss.bannerImage}
                    />
                    <HeadingRule />
                    <h1
                      className={contentCss.title}
                      dangerouslySetInnerHTML={{ __html: page.title.rendered }}
                    />
                  </div>
                )}
                {/* for non-fancy pages, a normal heading */}
                {!illustration && breadcrumbs.length !== 0 && (
                  <h1
                    dangerouslySetInnerHTML={{ __html: page.title.rendered }}
                  />
                )}
                <div
                  dangerouslySetInnerHTML={{ __html: page.content.rendered }}
                />
              </div>
            </div>
          </div>
        </div>
      </MainLayout>
    );
  }
}

export async function getServerSideProps({ query }) {
  const pageName = query.subsection || query.section;
  const menuResponse = await fetch(PRO_MENU_ENDPOINT);
  if (!menuResponse.ok) {
    if (menuResponse.status === 404) {
      return {
        notFound: true,
      };
    }
    throw new Error("Couldn't load menu.");
  }
  const menuJson = await menuResponse.json();
  const menuItems = menuJson.items;
  const pageItem = menuItems.find((item) => item.post_name === pageName);
  const pageRes = await fetch(getMenuItemUrl(pageItem));
  if (!pageRes.ok) {
    if (pageRes.status === 404) {
      return {
        notFound: true,
      };
    }
    throw new Error("Couldn't load page.");
  }
  const pageJson = await pageRes.json();

  // for the breadcrumbs
  const breadcrumbObject = getBreadcrumbs({
    items: menuItems,
    leafId: pageItem.object_id,
  });

  let breadcrumbs = [];

  if (JSON.stringify(breadcrumbObject) !== "{}") {
    Object.values(breadcrumbObject).forEach((crumb) => {
      let slug = "/";
      let url = "/pro/wp?section=" + crumb.post_name;
      // if this is a child item the url is /:topsection/:thisitem
      if (crumb.menu_item_parent !== "0") {
        const parent = getItemWithId({
          items: menuItems,
          id: crumb.menu_item_parent,
        });
        slug = slug + parent.post_name + "/";
      }
      // hubs homepage has different template
      if (crumb.post_name === "hubs") {
        url = "/pro/wp/hubs";
      }
      breadcrumbs.push({
        title: crumb.title,
        url: url,
        as: slug + crumb.post_name,
      });
    });
    breadcrumbs.push({ title: pageItem.title });
  }

  let pageDescription = "";
  if (pageJson?.excerpt?.rendered) {
    pageDescription = decodeHTMLEntities(
      striptags(pageJson.excerpt.rendered.replace("[&hellip;]", "…")),
    );
  }

  const props = washObject({
    page: pageJson,
    items: menuItems,
    pageTitle: pageItem.title,
    pageDescription: pageDescription,
    breadcrumbs: breadcrumbs,
    illustration: pageJson.acf.illustration,
  });

  return {
    props: props,
  };
}

export default ProMenuPage;
