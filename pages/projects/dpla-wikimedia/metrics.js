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
  { title: "Category Page Views" },
];

export default function WikimetricsPage({ items, isFilterView }) {
  const wrapperClass =
    "wikimedia-metrics-wrapper" + (isFilterView ? " filter-view" : "");

  return (
    <MainLayout
      pageTitle="Category Page Views — DPLA + Wikimedia"
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
                <h1>Category Page Views</h1>

                {/* ── Select an item ── */}
                <form id="showForm">
                  <label htmlFor="showInput">Wikimedia category</label>
                  <input
                    type="text"
                    id="showInput"
                    list="showOptions"
                    placeholder="e.g. Images_from_the_DPLA"
                  />
                  <datalist id="showOptions" />
                  <span id="errorMessage">
                    Please enter a valid Wikimedia category name.
                  </span>
                  <button type="submit" id="showButton">
                    Show metrics
                  </button>
                </form>

                {/* ── Show all / DPLA shortcuts ── */}
                <form id="show">
                  <button type="submit" id="showAll">
                    Show metrics for all hubs
                  </button>
                </form>

                <form id="showDpla">
                  <button type="submit" id="showDplaButton">
                    Show metrics for DPLA contributing institutions
                  </button>
                </form>

                {/* ── Dashboard ── */}
                <div id="sections-container" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Google Charts must load first; metrics.js is injected in onLoad */}
      <Script
        src="https://www.gstatic.com/charts/loader.js"
        strategy="afterInteractive"
        onLoad={() => {
          const s = document.createElement("script");
          s.src = "/static/wikimedia-metrics/metrics.js";
          document.body.appendChild(s);
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
    if (menuResponse.status === 404) {
      return { notFound: true };
    }
    throw new Error("Couldn't load menu.");
  }
  const menuJson = await menuResponse.json();

  return {
    props: washObject({
      items: menuJson.items,
      isFilterView,
    }),
  };
}
