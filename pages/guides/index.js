import React from "react";
import Link from "next/link";
import fetch from "isomorphic-fetch";

import MainLayout from "components/MainLayout";
import ContentPagesSidebar from "components/shared/ContentPagesSidebar";
import GuideLink from "components/shared/GuideLink";
import { classNames, stylesheet } from "css/pages/guides.css";
import { GUIDES_ENDPOINT, CONTENT_PAGE_NAMES } from "constants/content-pages";
import { classNames as utilClassNames } from "css/utils.css";

const mockGuides = [
  {
    title: "Education",
    summary: "Education education education",
    color: "blue",
    thumbnailUrl: "/static/placeholderImages/education.png"
  },
  {
    title: "Education",
    summary: "Education education education",
    color: "#F8f8f8",
    thumbnailUrl: "/static/placeholderImages/education.png"
  },
  {
    title: "Education",
    summary: "Education education education",
    color: "blue",
    thumbnailUrl: "/static/placeholderImages/education.png"
  },
  {
    title: "Education",
    summary: "Education education education",
    color: "blue",
    thumbnailUrl: "/static/placeholderImages/education.png"
  },
  {
    title: "Education",
    summary: "Education education education",
    color: "blue",
    thumbnailUrl: "/static/placeholderImages/education.png"
  }
];

const Guides = ({ url, guides = mockGuides }) =>
  <MainLayout route={url}>
    <div>
      <div
        className={[
          utilClassNames.module,
          classNames.sidebarAndContentWrapper
        ].join(" ")}
      >
        <ContentPagesSidebar page={CONTENT_PAGE_NAMES.GUIDES} />
        <div className={classNames.content}>
          <h1 className={classNames.header}>
            How can I use DPLA?
          </h1>
          <ul className={`${classNames.links} row`}>
            {guides.map((guide, i) =>
              <li
                key={i}
                className={`col-xs-12 col-md-6 col-lg-4 ${classNames.itemColumn}`}
              >
                <GuideLink guide={guide} route={url} />
              </li>
            )}
          </ul>
        </div>
      </div>
    </div>
    <style dangerouslySetInnerHTML={{ __html: stylesheet }} />
  </MainLayout>;

// Guides.getInitialProps = async () => {
//   const res = await fetch(GUIDES_ENDPOINT);
//   const json = await res.json();
//
//   return { guides: json };
// };

export default Guides;
