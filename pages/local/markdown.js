import React from "react";
import fetch from "isomorphic-fetch";
import { withRouter } from "next/router";
import ReactMarkdown from "react-markdown";

import MainLayout from "components/MainLayout";
import FeatureHeader from "shared/FeatureHeader";

import { getCurrentUrl } from "lib";

import { LOCAL_ID } from "constants/env";
import { LOCALS } from "constants/local";

import utils from "stylesheets/utils.scss";
import contentCss from "stylesheets/content-pages.scss";

class MarkdownPage extends React.Component {
  render() {
    const { router, pageData, content } = this.props;
    return (
      <MainLayout
        route={router}
        pageTitle={`${pageData.title}`}
        pageDescription={`${pageData.description}`}
      >
        <FeatureHeader
          title={`${pageData.title}`}
          description={`${pageData.description}`}
        />
        <div
          className={`${utils.container}
      ${contentCss.sidebarAndContentWrapper}`}
        >
          <div className="row">
            <div className={` col-xs-12 col-md-4`} />
            <div className="col-xs-12 col-md-7">
              <div id="main" role="main" className={contentCss.content}>
                <ReactMarkdown escapeHtml={false} source={content} />
              </div>
            </div>
          </div>
        </div>
      </MainLayout>
    );
  }
}

MarkdownPage.getInitialProps = async context => {
  const fullUrl = getCurrentUrl(context.req);
  const asPath = context.asPath;
  const routes = LOCALS[LOCAL_ID]["routes"];
  const pageData = routes[asPath];
  const markdownUrl = `${fullUrl}/static/local/${LOCAL_ID}/${pageData.path}`;
  const markdownResponse = await fetch(markdownUrl);
  const pageMarkdown = await markdownResponse.text();
  return {
    pageData: pageData,
    content: pageMarkdown
  };
};

export default withRouter(MarkdownPage);
