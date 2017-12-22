import React from "react";
import Link from "next/link";
import MinimalLayout from "../components/MainLayout/components/MinimalLayout";

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
    let message_title = "Uh oh.";
    let message_content =
      "Something has gone wrong and we cannot show you the page you requested. While we fix it, try searching for something in our collections.";
    if (this.props.statusCode === 404) {
      message_title = "Page not found";
      message_content = "We are sorry, the page you requested cannot be found.";
    }
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
              <h1>
                {message_title}
              </h1>
              <p>
                {message_content}
              </p>
              <div>
                <p>Try one of these:</p>
                <ul>
                  <li>
                    <Link prefetch href="/search">
                      <a>searching</a>
                    </Link>{" "}
                    for an item in our collections
                  </li>
                  <li>
                    finding items from one of our{" "}
                    <Link prefetch href="/browse-by-partner">
                      <a>partners</a>
                    </Link>
                  </li>
                  <li>
                    check out our{" "}
                    <Link prefetch href="/primary-source-sets">
                      <a>primary source sets</a>
                    </Link>
                  </li>
                  <li>
                    browse {" "}
                    <Link prefetch href="/browse-by-topic">
                      <a>items by topic</a>
                    </Link>
                  </li>
                  <li>
                    view one of our {" "}
                    <Link prefetch href="/exhibitions">
                      <a>exhibitions</a>
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
