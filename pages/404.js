import utils from "stylesheets/utils.module.scss";
import contentCss from "stylesheets/content-pages.module.scss";
import donateCss from "stylesheets/donate.module.scss";
import ErrorLinks from "components/ErrorComponents/ErrorLinks";
import MainLayout from "components/MainLayout";
import React from "react";

export default function Custom404() {
  return (
    <MainLayout>
      <div
        className={`${utils.container} ${contentCss.sidebarAndContentWrapper}`}
      >
        <div className="row">
          <div className={`${utils.colMd2} ${utils.colXs12}`} />
          <div
            id="main"
            role="main"
            className={`${contentCss.content} ${donateCss.thankYou} ${utils.colMd8} ${utils.colXs12}`}
          >
            <div>
              <h1>Page not found.</h1>
              <p>
                We are sorry that the page you requested cannot be found.
                Instead, try one of these:
              </p>
            </div>
            <ErrorLinks />
          </div>
        </div>
      </div>
    </MainLayout>
  );
}

export function getStaticProps({ res }) {
  if (res) {
    res.setHeader("Cache-Control", "max-age=60, must-revalidate");
  }
  return { props: {} };
}
