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
  { title: "Wikimedia Page Views" },
];

export default function WikimetricsPage({ items, isFilterView }) {
  const wrapperClass = `wikimedia-metrics-wrapper${isFilterView ? " filter-view" : ""}`;

  return (
    <MainLayout
      pageTitle="Wikimedia Page Views — DPLA + Wikimedia"
      pageDescription="Explore Wikimedia category page view metrics for DPLA hubs and contributing institutions."
    >
      <Head>
        <link
          rel="stylesheet"
          href="/static/wikimedia-metrics/wikimedia-metrics.css"
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
              <div className={wrapperClass}>
                <h1>Wikimedia Page Views</h1>

                {/* ── DPLA shortcut (first) ── */}
                <form id="showDpla">
                  <button type="submit" id="showDplaButton">
                    Show metrics for DPLA contributing institutions
                  </button>
                </form>

                {/* ── Select an item ── */}
                <form id="showForm">
                  <label htmlFor="showInput">Wikimedia category</label>
                  <input
                    type="text"
                    id="showInput"
                    list="showOptions"
                    placeholder="e.g. Media_contributed_by_Indiana_Memory"
                  />
                  <datalist id="showOptions" />
                  <span id="errorMessage">
                    Please enter a valid Wikimedia category name.
                  </span>
                  <button type="submit" id="showButton">
                    Show metrics
                  </button>
                </form>

                {/* ── Show all ── */}
                <form id="show">
                  <button type="submit" id="showAll">
                    Show metrics for all Wikimedia categories
                  </button>
                </form>

                {/* ── Dashboard ── */}
                <div id="sections-container" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/*
        * Google Charts must be loaded before metrics.js runs.
        * onReady fires on initial load AND on every client-side remount (e.g.
        * navigating away and back), unlike onLoad which fires only once.
        * On the first visit, metrics.js is injected and calls initMetrics()
        * automatically. On remounts, window.initMetrics is already defined so
        * we call it directly instead of re-injecting the script.
        */}
      <Script
        src="https://www.gstatic.com/charts/loader.js"
        strategy="afterInteractive"
        onReady={() => {
          if (typeof window.initMetrics === "function") {
            window.initMetrics();
          } else {
            const s = document.createElement("script");
            s.src = "/static/wikimedia-metrics/metrics.js";
            document.body.appendChild(s);
          }
        }}
      />
    </MainLayout>
  );
}

export async function getServerSideProps(context) {
  const { show, hub } = context.query;
  const isFilterView = !!(show || hub);

  const menuResponse = await fetch(PRO_MENU_ENDPOINT);
  if (!menuResponse.ok) {
    if (menuResponse.status >= 500) {
      // Sidebar nav is non-critical — render page without it and signal 503
      context.res.statusCode = 503;
      context.res.setHeader("Retry-After", "10");
      return { props: washObject({ items: [], isFilterView }) };
    }
    return { notFound: true };
  }
  const menuJson = await menuResponse.json();

  return {
    props: washObject({
      items: menuJson.items,
      isFilterView,
    }),
  };
}
