import React from "react";

import MinimalLayout from "components/MainLayout/components/MinimalLayout";
import ErrorLinksUser from "components/ErrorComponents/ErrorLinksUser";
import ErrorLinksPro from "components/ErrorComponents/ErrorLinksPro";

import { SITE_ENV } from "constants/env";

import utils from "stylesheets/utils.scss";
import contentCss from "stylesheets/content-pages.scss";
import donateCss from "stylesheets/donate.scss";

export default class Error extends React.Component {
  static getInitialProps({ res, err }) {
    const statusCode = res ? res.statusCode : err ? err.statusCode : null;
    if (res) {
      res.setHeader(
        "Cache-Control",
        "max-age=0, private, no-cache, no-store, must-revalidate"
      );
    }
    return { statusCode };
  }

  render() {
    return (
      <MinimalLayout route={this.props.url}>
        <div
          className={`${utils.container}
      ${contentCss.sidebarAndContentWrapper}`}
        >
          <div className="row">
            <div className={`col-md-2 col-xs-12`} />
            <div
              id="main"
              role="main"
              className={`${contentCss.content} ${donateCss.thankYou} col-md-8 col-xs-12`}
            >
              {this.props.statusCode !== 404 &&
                <div>
                  <h1>
                    An error occurred.
                  </h1>
                  <p>
                    Thanks for your patience while we work to fix this issue. In
                    the meantime, try one of these:
                  </p>
                </div>}
              {this.props.statusCode === 404 &&
                <div>
                  <h1>
                    Page not found.
                  </h1>
                  <p>
                    We are sorry that the page you requested cannot be found.
                    Instead, try one of these:
                  </p>
                </div>}
              <div>
                {SITE_ENV === "user" && <ErrorLinksUser />}
                {SITE_ENV === "pro" && <ErrorLinksPro />}
              </div>
            </div>
          </div>
        </div>
      </MinimalLayout>
    );
  }
}
