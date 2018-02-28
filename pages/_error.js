import React from "react";
import Link from "next/link";
import MinimalLayout from "components/MainLayout/components/MinimalLayout";

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
              className={`${contentClasses.content} ${classNames.thankYou} col-md-8 col-xs-12`}
            >
              {this.props.statusCode === 500 &&
                <div>
                  <h1>
                    An error occurred.
                  </h1>
                  <p>
                    Thanks for your patience while we work to fix this issue.
                  </p>
                  <p>In the meantime, try one of these:</p>
                </div>}
              {this.props.statusCode !== 500 &&
                <div>
                  <h1>
                    Page not found.
                  </h1>
                  <p>
                    We are sorry that the page you requested cannot be found.
                  </p>
                  <p>Instead, try one of these:</p>
                </div>}
              <div>
                <ul>
                  <li>
                    <Link prefetch href="/search">
                      <a>search</a>
                    </Link>{" "}
                    our collections
                  </li>
                  <li>
                    browse {" "}
                    <Link prefetch href="/browse-by-topic">
                      <a>items by topic</a>
                    </Link>
                  </li>
                  <li>
                    discover items from specific{" "}
                    <Link prefetch href="/browse-by-partner">
                      <a>partners</a>
                    </Link>
                  </li>
                  <li>
                    view our {" "}
                    <Link prefetch href="/exhibitions">
                      <a>exhibitions</a>
                    </Link>
                  </li>
                  <li>
                    explore our{" "}
                    <Link prefetch href="/primary-source-sets">
                      <a>primary source sets</a>
                    </Link>
                  </li>
                </ul>
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
