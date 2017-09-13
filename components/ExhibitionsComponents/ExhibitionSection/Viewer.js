import React from "react";
import Link from "next/link";

import { classNames } from "./ExhibitionSection.css";
import {
  ZoomableImageViewer,
  VideoPlayer,
  AudioPlayer,
  PDFViewer
} from "components/shared/mediaViewers";
import { ITEM_TYPES } from "constants/exhibitions";
const chevron = "/static/images/chevron-thick-black.svg";

// originalUrl will always exist for an item, so we have to test against that
const getViewerComponent = (fileType, originalUrl, pathToFile) => {
  if (fileType === ITEM_TYPES.MOVING_IMAGE || /\.mp4/.test(originalUrl)) {
    return <VideoPlayer pathToFile={pathToFile} />;
  } else if (
    fileType === ITEM_TYPES.STILL_IMAGE ||
    /\.jpg$/.test(originalUrl)
  ) {
    return <ZoomableImageViewer pathToFile={pathToFile} />;
  } else if (fileType === ITEM_TYPES.SOUND || /\.mp3/.test(originalUrl)) {
    return <AudioPlayer pathToFile={pathToFile} />;
  } else if (/\.pdf/.test(originalUrl)) {
    // fullsizeImgUrl will also exist for PDFs, but we want the path to the PDF,
    // not to a thumbnail image
    return <PDFViewer height="600" pathToFile={originalUrl} />;
  }
};

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
  debugger;
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
          <div className={classNames.mainMedia}>
            {getViewerComponent(
              activePage.fileType,
              activePage.originalUrl,
              activePage.fullsizeImgUrl
                ? activePage.fullsizeImgUrl
                : activePage.originalUrl
            )}
          </div>
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
        {text &&
          <div
            className={classNames.text}
            dangerouslySetInnerHTML={{ __html: text }}
          />}
      </div>
    </div>
  );
};

export default Viewer;
