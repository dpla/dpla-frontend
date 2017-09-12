import React from "react";
import Link from "next/link";

import { classNames } from "./ExhibitionSection.css";

const chevron = "/static/images/chevron-thick-black.svg";

const ItemLink = ({ thumbnailUrl, itemId, className, route }) =>
  <Link
    href={{
      pathname: route.pathname,
      query: Object.assign({}, route.query, { item: itemId })
    }}
    as={`/exhibitions/${route.query.exhibition}/${route.query.section}/${route
      .query.subsection}?item=${itemId}`}
  >
    <a className={[classNames.itemLink, className].join(" ")}>
      <img className={classNames.itemLinkImage} src={thumbnailUrl} alt="" />
    </a>
  </Link>;

const Viewer = ({ exhibition, section, subsection, route }) => {
  const pageWithText = subsection.page_blocks.find(block => block.text);
  const text = pageWithText ? pageWithText.text : "";
  const activePage = subsection.page_blocks.find(block => block.isActive);

  return (
    <div className={classNames.viewer}>
      <div className={classNames.breadcrumbs}>
        <span className={classNames.sectionBreadcrumb}>{section.title}</span>
        <img src={chevron} alt="" className={classNames.breadcrumbChevron} />
        <span>{subsection.title}</span>
      </div>
      <div className={classNames.viewerContent}>
        <div className={classNames.mediaAndCaption}>
          <img
            className={classNames.mainImage}
            src={activePage.fullsizeImgUrl}
            alt=""
          />
          <ul className={classNames.itemLinks}>

            {subsection.page_blocks.map(block =>
              <li key={block.id}>
                <ItemLink
                  route={route}
                  className={block.isActive && classNames.activeItemLink}
                  itemId={block.id}
                  thumbnailUrl={block.thumbnailUrl}
                />
              </li>
            )}
          </ul>
          <div
            className={classNames.caption}
            dangerouslySetInnerHTML={{
              __html: activePage.attachments[0].caption
            }}
          />
        </div>
        <div
          className={classNames.text}
          dangerouslySetInnerHTML={{ __html: text }}
        />
      </div>
    </div>
  );
};

export default Viewer;
