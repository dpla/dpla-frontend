import utils from "stylesheets/utils.module.scss";
import contentCss from "stylesheets/content-pages.module.scss";
import donateCss from "stylesheets/donate.module.scss";
import ErrorLinks from "components/ErrorComponents/ErrorLinks";
import MainLayout from "components/MainLayout";
import React from "react";

export default function Custom500() {
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
              <h1>An error occurred.</h1>
              <p>
                Thanks for your patience while we work to fix this issue. In the
                meantime, try one of these:
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
    res.setHeader(
      "Cache-Control",
      "max-age=0, private, no-cache, no-store, must-revalidate",
    );
  }
  return { props: {} };
}
