import React from "react";
import Link from "next/link";

import MinimalLayout from "components/MainLayout/components/MinimalLayout";
import ErrorLinksUser from "components/ErrorComponents/ErrorLinksUser";
import ErrorLinksPro from "components/ErrorComponents/ErrorLinksPro";

import { SITE_ENV } from "constants/env";

import {
  classNames as contentClasses,
  stylesheet as contentStyles
} from "css/pages/content-pages-wysiwyg.css";
import { stylesheet, classNames } from "css/pages/donate.css";
import {
  classNames as utilClassNames,
  stylesheet as utilStyles
} from "css/utils.css";

export default class Error extends React.Component {
  static getInitialProps({ res, err }) {
    const statusCode = res ? res.statusCode : err ? err.statusCode : null;
    return { statusCode };
  }

  render() {
    return (
      <MinimalLayout route={this.props.url}>
        <div
          className={`${utilClassNames.container}
      ${contentClasses.sidebarAndContentWrapper}`}
        >
          <div className="row">
            <div className={`col-md-2 col-xs-12`} />
            <div
              id="main"
              role="main"
              className={`${contentClasses.content} ${classNames.thankYou} col-md-8 col-xs-12`}
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
        <style dangerouslySetInnerHTML={{ __html: utilStyles }} />
        <style dangerouslySetInnerHTML={{ __html: stylesheet }} />
        <style dangerouslySetInnerHTML={{ __html: contentStyles }} />
      </MinimalLayout>
    );
  }
}
