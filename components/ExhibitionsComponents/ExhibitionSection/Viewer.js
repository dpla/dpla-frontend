import React from "react";
import Link from "next/link";

import ItemImage from "components/ItemComponents/Content/ItemImage";
import {
  ZoomableImageViewer,
  VideoPlayer,
  AudioPlayer,
  PDFViewer
} from "components/shared/mediaViewers";

import { ITEM_TYPES } from "constants/exhibitions";
import { resourceTypes } from "constants/site";
import { getDefaultThumbnail, getDplaItemIdFromExhibit } from "lib";

import css from "./ExhibitionSection.scss";

const chevron = "/static/images/chevron-thick-black.svg";

const getFileType = (fileType, originalUrl) => {
  if (
    fileType === ITEM_TYPES.MOVING_IMAGE ||
    /\.(mp4|webm|ogg)/i.test(originalUrl)
  ) {
    return resourceTypes.VIDEO;
  } else if (
    fileType === ITEM_TYPES.SOUND ||
    /\.(mp3|wav)/i.test(originalUrl)
  ) {
    return resourceTypes.SOUND;
  } else {
    return resourceTypes.IMAGE;
  }
};

const getViewerComponent = (fileType, originalUrl, pathToFile) => {
  if (
    fileType === ITEM_TYPES.MOVING_IMAGE ||
    /\.(mp4|webm|ogg)/i.test(originalUrl)
  ) {
    return <VideoPlayer pathToFile={pathToFile} />;
  } else if (
    fileType === ITEM_TYPES.STILL_IMAGE ||
    /\.(jpg|jpeg|png|tif|tiff|gif)$/i.test(originalUrl)
  ) {
    return <ZoomableImageViewer pathToFile={pathToFile} />;
  } else if (
    fileType === ITEM_TYPES.SOUND ||
    /\.(mp3|wav)/i.test(originalUrl)
  ) {
    return <AudioPlayer pathToFile={pathToFile} />;
  } else if (/\.pdf/i.test(originalUrl)) {
    // fullsizeImgUrl will also exist for PDFs, but we want the path to the PDF,
    // not to a thumbnail image
    return <PDFViewer height="24rem" pathToFile={originalUrl} />;
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
      .query.subsection
      ? route.query.subsection
      : ""}?item=${itemId}`}
  >
    <a className={[css.itemLink, className].join(" ")}>
      <ItemImage
        type={getFileType(fileType, originalUrl)}
        title="Show item in viewer"
        url={
          thumbnailUrl ||
          getDefaultThumbnail(getFileType(fileType, originalUrl))
        }
        defaultImageClass={css.defaultItemImage}
        useDefaultImage={!thumbnailUrl}
      />
    </a>
  </Link>;

const Viewer = ({ exhibition, section, subsection, route }) => {
  const pageBlocks = subsection.page_blocks;
  const pageWithText = pageBlocks.find(block => block.text);
  const text = pageWithText ? pageWithText.text : "";
  const activePageIdx = pageBlocks.findIndex(block => block.isActive);
  const activePage = pageBlocks[activePageIdx];
  const previousPage = activePageIdx - 1 >= 0
    ? pageBlocks[activePageIdx - 1]
    : null;
  const nextPage = activePageIdx + 1 < pageBlocks.length
    ? pageBlocks[activePageIdx + 1]
    : null;
  const itemId = getDplaItemIdFromExhibit(activePage.itemJson);

  return (
    <div className={css.viewer}>
      <h2 className={css.titleSubsection}>
        {subsection.title}
      </h2>
      <div className={css.viewerContent}>
        <div className={css.mediaAndCaption}>
          <div className={css.mainMedia}>
            {previousPage &&
              <Link
                prefetch
                href={{
                  pathname: route.pathname,
                  query: Object.assign({}, route.query, {
                    item: previousPage.id
                  })
                }}
                as={`/exhibitions/${route.query.exhibition}/${route.query
                  .section}/${route.query.subsection}?item=${previousPage.id}`}
              >
                <a className={css.previousItemButton}>
                  <img
                    src={chevron}
                    alt=""
                    className={css.previousItemChevron}
                  />
                </a>
              </Link>}
            {getViewerComponent(
              activePage.fileType,
              activePage.originalUrl,
              activePage.fullsizeImgUrl
                ? activePage.fullsizeImgUrl
                : activePage.originalUrl
            )}
            {nextPage &&
              <Link
                prefetch
                href={{
                  pathname: route.pathname,
                  query: Object.assign({}, route.query, { item: nextPage.id })
                }}
                as={`/exhibitions/${route.query.exhibition}/${route.query
                  .section}/${route.query.subsection}?item=${nextPage.id}`}
              >
                <a className={css.nextItemButton}>
                  <img src={chevron} alt="" className={css.nextItemChevron} />
                </a>
              </Link>}
          </div>
          <ul className={css.itemLinks}>
            {subsection.page_blocks.map(block =>
              <li key={block.id}>
                <ItemLink
                  fileType={block.type}
                  route={route}
                  className={block.isActive ? css.activeItemLink : ""}
                  itemId={block.id}
                  thumbnailUrl={block.thumbnailUrl}
                  originalUrl={block.originalUrl}
                />
              </li>
            )}
          </ul>
          {itemId &&
            <Link
              prefetch
              as={`/item/${itemId}`}
              href={`/item?itemId=${itemId}`}
            >
              <a className={css.viewItemLink}>View item information</a>
            </Link>}
          <div
            className={css.caption}
            dangerouslySetInnerHTML={{
              __html: activePage.attachments[0].caption
            }}
          />
        </div>
        {text &&
          <div
            className={css.text}
            dangerouslySetInnerHTML={{ __html: text }}
          />}
      </div>
    </div>
  );
};

export default Viewer;
