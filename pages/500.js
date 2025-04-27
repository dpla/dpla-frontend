import utils from "stylesheets/utils.module.scss";
import contentCss from "stylesheets/content-pages.module.scss";
import donateCss from "stylesheets/donate.module.scss";
import ErrorLinksUser from "components/ErrorComponents/ErrorLinksUser";
import ErrorLinksPro from "components/ErrorComponents/ErrorLinksPro";
import MinimalLayout from "components/MainLayout/components/MinimalLayout";
import React from "react";

export default function Custom500() {
  const siteEnv = process.env.NEXT_PUBLIC_SITE_ENV;
  return (
    <MinimalLayout>
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
            <div>
              {siteEnv === "user" && <ErrorLinksUser />}
              {siteEnv === "pro" && <ErrorLinksPro />}
            </div>
          </div>
        </div>
      </div>
    </MinimalLayout>
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
