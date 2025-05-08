import React from "react";
import Markdown from "react-markdown";
import MainLayout from "components/MainLayout";

import Sidebar from "components/MainLayout/components/shared/LocalSidebar.js";
import FeatureHeader from "shared/FeatureHeader";
import BreadcrumbsModule from "shared/BreadcrumbsModule";
import fs from "fs";
import { join } from "path";

import { LOCALS } from "constants/local";

import utils from "stylesheets/utils.module.scss";
import contentCss from "stylesheets/content-pages.module.scss";
import { washObject } from "lib/washObject";
import rehypeRaw from "rehype-raw";

function MarkdownPage(props) {
  const localId = process.env.NEXT_PUBLIC_LOCAL_ID;
  const { path, pageData, content } = props;

  const local = LOCALS[localId];
  const routesObj = local.routes;
  const hasSidebar = local.hasSidebar;
  const bodyColumnsStyle = local.expandBody
    ? `${utils.colXs12} ${utils.colMd12}`
    : `${utils.colXs12} ${utils.colMd7}`;

  const allRoutes = Object.keys(routesObj);

  const pages = allRoutes
    .map((page, i) => ({
      ...i,
      route: allRoutes[i],
      title: routesObj[allRoutes[i]].title,
      category: routesObj[allRoutes[i]].category,
      isTopLevel: routesObj[allRoutes[i]].isTopLevel,
      isActive: false,
    }))
    .filter((page) => page.category === pageData.category);

  const breadcrumbs = [];

  if (hasSidebar && !pageData.isTopLevel) {
    breadcrumbs.push(
      {
        title: pageData.category,
        url: pageData.parentDir,
      },
      {
        title: pageData.title,
      },
    );
  }

  return (
    <MainLayout
      pageTitle={`${pageData.title}`}
      pageDescription={`${pageData.description}`}
    >
      {breadcrumbs.length > 0 && (
        <BreadcrumbsModule
          breadcrumbs={breadcrumbs}
          route={pageData.parentDir}
        />
      )}
      {breadcrumbs.length === 0 && (
        <FeatureHeader
          title={pageData.category}
          description={pageData.description}
        />
      )}
      <div
        className={`${utils.container} ${contentCss.sidebarAndContentWrapper}`}
      >
        <div className={utils.row}>
          <Sidebar
            className={contentCss.sidebar}
            items={pages}
            activePage={path}
            render={hasSidebar}
          />
          <div className={bodyColumnsStyle}>
            <div id="main" role="main" className={contentCss.content}>
              <Markdown rehypePlugins={[rehypeRaw]} skipHtml={false}>
                {content}
              </Markdown>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}

export async function getServerSideProps(context) {
  const localId = process.env.NEXT_PUBLIC_LOCAL_ID;
  const local = LOCALS[localId];
  const section = context.query.section;
  const subsection = context.query.subsection;
  const asPath = subsection ? `/${section}/${subsection}` : `/${section}`;
  const routes = local["routes"];
  const pageData = routes[asPath];
  console.log("PAGE DATA", pageData);
  const markdownPath = join(
    process.cwd(),
    "public",
    "static",
    "local",
    localId,
    pageData.path,
  );
  const pageMarkdown = await fs.promises.readFile(markdownPath, {
    encoding: "utf8",
  });
  const props = washObject({
    path: asPath,
    pageData: pageData,
    content: pageMarkdown,
  });
  return {
    props: props,
  };
}

export default MarkdownPage;
