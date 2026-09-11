import React from "react";
import MainLayout from "components/MainLayout";
import Button from "components/shared/Button";
import AutoRetryNotice from "components/shared/AutoRetryNotice";
import utils from "stylesheets/utils.module.css";
import contentCss from "stylesheets/content-pages.module.css";

/**
 * Branded 503 page.
 * Pair with upstreamUnavailable() in getServerSideProps.
 * Pass "retryAfter" to make the page reload itself.
 */
export default function ServiceUnavailable({
  heading = "This page is temporarily unavailable.",
  message = "We’re having a brief issue loading this page. Please try again in a moment.",
  retryAfter,
}) {
  return (
    <MainLayout>
      <main
        id="main"
        role="main"
        className={`${utils.container} ${contentCss.content}`}
      >
        <h1>{heading}</h1>
        <p>{message}</p>
        {retryAfter != null && <AutoRetryNotice retryAfter={retryAfter} />}
        <Button type="primary" onClick={() => window.location.reload()}>
          Try again now
        </Button>
      </main>
    </MainLayout>
  );
}
