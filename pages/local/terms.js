import React from "react";
import fetch from "isomorphic-fetch";
import { withRouter } from "next/router";
import ReactMarkdown from "react-markdown";

import MainLayout from "components/MainLayout";
import FeatureHeader from "shared/FeatureHeader";

import { getCurrentUrl, wordpressLinks } from "lib";

import { LOCAL_ID } from "constants/env";
import { LOCALS } from "constants/local";

import utils from "stylesheets/utils.scss";
import contentCss from "stylesheets/content-pages.scss";

const PAGE_TITLE = `Terms and Conditions`;
const PAGE_DESCRIPTION = `${LOCALS[LOCAL_ID].description}`;

class TermsPage extends React.Component {
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
    const { router, content } = this.props;
    return (
      <MainLayout
        route={router}
        pageTitle={PAGE_TITLE}
        pageDescription={PAGE_DESCRIPTION}
      >
        <FeatureHeader title={PAGE_TITLE} description={""} />
        <div
          className={`${utils.container}
      ${contentCss.sidebarAndContentWrapper}`}
        >
          <div className="row">
            <div className={` col-xs-12 col-md-4`} />
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

TermsPage.getInitialProps = async ({ req, query, res }) => {
  const fullUrl = getCurrentUrl(req);
  const markdownUrl = `${fullUrl}/static/local/${LOCALS[LOCAL_ID]
    .theme}/terms.md`;
  const markdownResponse = await fetch(markdownUrl);
  const pageMarkdown = await markdownResponse.text();

  return {
    content: pageMarkdown
  };
};

export default withRouter(TermsPage);
