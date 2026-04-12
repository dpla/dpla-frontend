import React from "react";
import MainLayout from "components/MainLayout";
import Button from "components/shared/Button";
import utils from "stylesheets/utils.module.scss";
import contentCss from "stylesheets/content-pages.module.scss";

/**
 * Generic "temporarily unavailable" page rendered when an upstream API call
 * fails at the network level (connection timeout, DNS failure, etc.).
 *
 * The HTTP response is set to 503 + Retry-After in getServerSideProps before
 * returning { props: { temporarilyUnavailable: true } }, so crawlers know to
 * retry rather than treating the page as gone.
 */
export default function ServiceUnavailable() {
  return (
    <MainLayout>
      <main
        id="main"
        role="main"
        className={`${utils.container} ${contentCss.content}`}
      >
        <h1>This page is temporarily unavailable.</h1>
        <p>
          We&rsquo;re having a brief issue loading this page. Please try again
          in a moment.
        </p>
        <Button type="primary" onClick={() => window.location.reload()}>
          Try again now
        </Button>
      </main>
    </MainLayout>
  );
}
