import * as Sentry from "@sentry/nextjs";

import React from "react";
import { withRouter } from "next/router";

import MinimalLayout from "components/MainLayout/components/MinimalLayout";
import ErrorLinksUser from "components/ErrorComponents/ErrorLinksUser";
import ErrorLinksPro from "components/ErrorComponents/ErrorLinksPro";

import contentCss from "stylesheets/content-pages.module.scss";
import donateCss from "stylesheets/donate.module.scss";
import utils from "stylesheets/utils.module.scss";

class Error extends React.Component {
  static async getInitialProps(context) {
    await Sentry.captureUnderscoreErrorException(context);

    let statusCode;

    if (context?.res) {
      statusCode = context.res.statusCode;
      context.res.setHeader(
        "Cache-Control",
        "max-age=0, private, no-cache, no-store, must-revalidate",
      );
    } else if (context?.err) {
      statusCode = context.err.statusCode;
    } else {
      statusCode = 500;
    }

    return { statusCode: statusCode };
  }

  render() {
    const siteEnv = process.env.NEXT_PUBLIC_SITE_ENV;
    return (
      <MinimalLayout>
        <div
          className={`${utils.container} ${contentCss.sidebarAndContentWrapper}`}
        >
          <div className="row">
            <div className={`col-md-2 col-xs-12`} />
            <main
              id="main"
              className={`${contentCss.content} ${donateCss.thankYou} col-md-8 col-xs-12`}
            >
              {this.props.statusCode && this.props.statusCode !== 404 && (
                <div>
                  <h1>An error occurred.</h1>
                  <p>
                    Thanks for your patience while we work to fix this issue. In
                    the meantime, try one of these:
                  </p>
                </div>
              )}
              {this.props.statusCode === 404 && (
                <div>
                  <h1>Page not found.</h1>
                  <p>
                    We are sorry that the page you requested cannot be found.
                    Instead, try one of these:
                  </p>
                </div>
              )}
              <div>
                {siteEnv === "user" && <ErrorLinksUser />}
                {siteEnv === "pro" && <ErrorLinksPro />}
              </div>
            </main>
          </div>
        </div>
      </MinimalLayout>
    );
  }
}

export default withRouter(Error);
