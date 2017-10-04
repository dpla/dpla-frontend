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
import { resourceTypes } from "constants/site";
import { getDefaultThumbnail } from "utilFunctions";
import ItemImage from "components/ItemComponents/Content/ItemImage";
const chevron = "/static/images/chevron-thick-black.svg";
const menuButtonIcon = "/static/images/menu-black.svg";

const getFileType = (fileType, originalUrl) => {
  if (
    fileType === ITEM_TYPES.MOVING_IMAGE ||
    /\.(mp4|webm|ogg)/.test(originalUrl)
  ) {
    return resourceTypes.VIDEO;
  } else if (fileType === ITEM_TYPES.SOUND || /\.(mp3|wav)/.test(originalUrl)) {
    return resourceTypes.SOUND;
  } else {
    return resourceTypes.IMAGE;
  }
};

const getViewerComponent = (fileType, originalUrl, pathToFile) => {
  if (
    fileType === ITEM_TYPES.MOVING_IMAGE ||
    /\.(mp4|webm|ogg)/.test(originalUrl)
  ) {
    return <VideoPlayer pathToFile={pathToFile} />;
  } else if (
    fileType === ITEM_TYPES.STILL_IMAGE ||
    /\.(jpg|png|tif|gif)$/.test(originalUrl)
  ) {
    return <ZoomableImageViewer pathToFile={pathToFile} />;
  } else if (fileType === ITEM_TYPES.SOUND || /\.(mp3|wav)/.test(originalUrl)) {
    return <AudioPlayer pathToFile={pathToFile} />;
  } else if (/\.pdf/.test(originalUrl)) {
    // fullsizeImgUrl will also exist for PDFs, but we want the path to the PDF,
    // not to a thumbnail image
    return <PDFViewer height="600" pathToFile={originalUrl} />;
  }
};

const ItemLink = ({
  thumbnailUrl,
  itemId,
  className,
  route,
  fileType,
  originalUrl
}) =>
  <Link
    prefetch
    href={{
      pathname: route.pathname,
      query: Object.assign({}, route.query, { item: itemId })
    }}
    as={`/exhibitions/${route.query.exhibition}/${route.query.section}/${route
      .query.subsection}?item=${itemId}`}
  >
    <a className={[classNames.itemLink, className].join(" ")}>
      <ItemImage
        // title={item.title}
        type={getFileType(fileType, originalUrl)}
        url={
          thumbnailUrl ||
          getDefaultThumbnail(getFileType(fileType, originalUrl))
        }
        defaultImageClass={classNames.defaultItemImage}
        useDefaultImage={!thumbnailUrl}
      />
    </a>
  </Link>;

const Viewer = ({ exhibition, section, subsection, route }) => {
  const pageWithText = subsection.page_blocks.find(block => block.text);
  const text = pageWithText ? pageWithText.text : "";
  const activePage = subsection.page_blocks.find(block => block.isActive);

  return (
    <div className={classNames.viewer}>
      <div className={classNames.menuButtonAndBreadcrumbs}>
        <button className={classNames.menuButton}>
          <img
            alt=""
            src={menuButtonIcon}
            className={classNames.menuButtonIcon}
          />
        </button>
        <div className={classNames.breadcrumbs}>
          <span className={classNames.sectionBreadcrumb}>{section.title}</span>
          <img src={chevron} alt="" className={classNames.breadcrumbChevron} />
          <span>{subsection.title}</span>
        </div>
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
                  fileType={block.type}
                  route={route}
                  className={block.isActive && classNames.activeItemLink}
                  itemId={block.id}
                  thumbnailUrl={block.thumbnailUrl}
                  originalUrl={block.originalUrl}
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
