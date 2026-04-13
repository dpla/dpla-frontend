import React from "react";
import Head from "next/head";
import Script from "next/script";

import MainLayout from "components/MainLayout";
import ContentPagesSidebar from "shared/ContentPagesSidebar";
import BreadcrumbsModule from "shared/BreadcrumbsModule";

import { PRO_MENU_ENDPOINT } from "constants/content-pages";

import utils from "stylesheets/utils.module.scss";
import contentCss from "stylesheets/content-pages.module.scss";
import { washObject } from "lib/washObject";

const BREADCRUMBS = [
  { title: "Projects", url: "/projects" },
  { title: "DPLA + Wikimedia", url: "/projects/dpla-wikimedia" },
  { title: "DepictAssist" },
];

export default function DepictAssistPage({ items }) {
  return (
    <MainLayout
      pageTitle="DepictAssist — DPLA + Wikimedia"
      pageDescription="Add structured data depicts claims to Wikimedia Commons images contributed by DPLA institutions."
    >
      <Head>
        <link
          rel="stylesheet"
          href="/static/depictassist/depictassist.css"
        />
      </Head>

      <BreadcrumbsModule breadcrumbs={BREADCRUMBS} />

      <div
        className={`${utils.container} ${contentCss.sidebarAndContentWrapper}`}
      >
        <div className={utils.row}>
          <ContentPagesSidebar
            className={contentCss.sidebar}
            items={items}
            activeItemId="dpla-wikimedia"
            rootPath="wp"
          />

          <div className={`${utils.colXs12} ${utils.colMd7}`}>
            <div id="main" role="main" className={contentCss.content}>
              <div className="depictassist-wrapper">
                <h1>DepictAssist</h1>

                <div id="da-auth" className="da-auth-bar">
                  <button type="button" id="da-login-btn" className="da-btn da-btn-login">
                    Log in with Wikimedia
                  </button>
                  <span id="da-user-info" style={{ display: "none" }}>
                    Logged in as <strong id="da-username" />{" "}
                    <button type="button" id="da-logout-btn" className="da-btn da-btn-sm">
                      Log out
                    </button>
                  </span>
                </div>

                <div id="da-institution-form" className="da-card">
                  <label htmlFor="da-institution-select">
                    Contributing institution
                  </label>
                  <select id="da-institution-select" disabled>
                    <option value="">Loading institutions...</option>
                  </select>
                  <button
                    type="button"
                    id="da-find-btn"
                    className="da-btn da-btn-primary"
                    disabled
                  >
                    Find images
                  </button>
                </div>

                <div id="da-image-area" style={{ display: "none" }}>
                  <div id="da-loading" className="da-loading" style={{ display: "none" }}>
                    <p>Searching for images...</p>
                  </div>
                  <div id="da-image-display" style={{ display: "none" }}>
                    <div className="da-image-header">
                      <h2 id="da-image-title" />
                      <p id="da-image-description" className="da-description" />
                    </div>
                    <div className="da-image-content">
                      <div className="da-image-col">
                        <a
                          id="da-image-link"
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label="Open full-size image in a new tab"
                        >
                          <img id="da-image-img" alt="" />
                        </a>
                        <p className="da-image-meta">
                          <a id="da-image-commons-link" target="_blank" rel="noopener noreferrer">
                            View on Commons
                          </a>
                        </p>
                      </div>
                      <div className="da-tags-col">
                        <h3 id="da-subject-heading" />
                        <p className="da-tags-label">Suggested depicts tags:</p>
                        <div id="da-tag-suggestions" />
                      </div>
                    </div>
                    <div className="da-skip-row">
                      <button type="button" id="da-skip-btn" className="da-btn da-btn-secondary">
                        Skip
                      </button>
                    </div>
                  </div>
                  <div id="da-no-images" style={{ display: "none" }}>
                    <p>No untagged images found for this institution. Try another.</p>
                  </div>
                  <div id="da-fetch-error" className="da-error" style={{ display: "none" }}>
                    <p>Something went wrong loading images. Please try again.</p>
                  </div>
                </div>

                <div id="da-batch" style={{ display: "none" }} className="da-card">
                  <h3>Queued edits</h3>
                  <ul id="da-queue-list" />
                  <button
                    type="button"
                    id="da-batch-btn"
                    className="da-btn da-btn-primary"
                    disabled
                  >
                    Submit batch
                  </button>
                  <p id="da-batch-login-msg" className="da-hint">
                    Log in with Wikimedia to submit edits.
                  </p>
                </div>

                <div id="da-results" style={{ display: "none" }} className="da-results-bar">
                  <p>
                    <strong>Edits saved.</strong> See your changes:{" "}
                    <span id="da-diff-links" />
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Script
        src="/static/depictassist/depictassist.js"
        strategy="afterInteractive"
        onReady={() => {
          if (typeof window.initDepictAssist === "function") {
            window.initDepictAssist();
          }
        }}
      />
    </MainLayout>
  );
}

export async function getServerSideProps(context) {
  try {
    const menuResponse = await fetch(PRO_MENU_ENDPOINT, {
      signal: AbortSignal.timeout(5000),
    });
    if (!menuResponse.ok) {
      if (menuResponse.status === 404) {
        return { notFound: true };
      }
      throw new Error(`PRO menu fetch failed with ${menuResponse.status}`);
    }
    const menuJson = await menuResponse.json();

    return {
      props: washObject({
        items: menuJson.items,
      }),
    };
  } catch {
    context.res.statusCode = 503;
    context.res.setHeader("Retry-After", "10");
    return { props: { items: [] } };
  }
}
