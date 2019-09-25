import React from "react";
import fetch from "isomorphic-fetch";
import { withRouter } from "next/router";
import ReactMarkdown from "react-markdown";

import MainLayout from "components/MainLayout";
import Sidebar from "components/MainLayout/components/shared/LocalSidebar.js"
import FeatureHeader from "shared/FeatureHeader";

import { getCurrentUrl, wordpressLinks } from "lib";

import { LOCAL_ID } from "constants/env";
import { LOCALS } from "constants/local";

import utils from "stylesheets/utils.scss";
import contentCss from "stylesheets/content-pages.scss";

import Link from "next/link";


class AboutPage extends React.Component {
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
    const { router, content, description } = this.props;

    var pages = null;

    if (LOCALS[LOCAL_ID].routes) {
      const routesObj = LOCALS[LOCAL_ID].routes;

      const allRoutes = Object.keys(routesObj);

      pages = allRoutes.map(function(page, i) {
        const objects = Object.assign({}, i);
        objects.route = allRoutes[i];
        objects.title = routesObj[allRoutes[i]].title;
        objects.category = routesObj[allRoutes[i]].category;
        objects.isTopLevel = routesObj[allRoutes[i]].isTopLevel;
        objects.isActive = false;
        return objects;
      }).filter(page =>
        page.category == "About"
      );
    }

    return (
      <MainLayout
        route={router}
        pageTitle={"About"}
        pageDescription={description}
      >
        <FeatureHeader title={"About"} description={""} />
        <div
          className={`${utils.container}
      ${contentCss.sidebarAndContentWrapper}`}
        >
        <div className="row">
          {((pages != null) && (pages.length > 0)) &&
            <Sidebar
              className={contentCss.sidebar}
              items={pages}
              activePage={router.asPath}
            />}
            {((pages == null) || (pages.length == 0)) &&
              <div className={`col-xs-12 col-md-4`}/>
            }
            <div className="col-xs-12 col-md-7">
              <div id="main" role="main" className={contentCss.content}>
                <ReactMarkdown source={content} />
              </div>
            </div>
          </div>
        </div>
      </MainLayout>
    );
  }
}

AboutPage.getInitialProps = async ({ req, query, res }) => {
  const fullUrl = getCurrentUrl(req);
  const markdownUrl = `${fullUrl}/static/local/${LOCALS[LOCAL_ID]
    .theme}/about.md`;
  const markdownResponse = await fetch(markdownUrl);
  const pageMarkdown = await markdownResponse.text();
  const pageDescription = LOCALS[LOCAL_ID].description;

  return {
    content: pageMarkdown,
    description: pageDescription
  };
};

export default withRouter(AboutPage);
