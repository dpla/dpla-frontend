import React from "react";
import Link from "next/link";
import { useRouter, withRouter } from "next/router";

import ItemImage from "components/ItemComponents/Content/ItemImage";

import {
  ZoomableImageViewer,
  VideoPlayer,
  AudioPlayer,
  PDFViewer,
} from "components/shared/mediaViewers";

import {
  getDefaultThumbnail,
  getFullPath,
  joinIfArray,
  parseDplaItemRecord,
  gtag,
} from "lib";

import { ITEM_TYPES } from "constants/exhibitions";
import { resourceTypes } from "constants/site";

import css from "./ExhibitionSection.module.scss";

import ChevronThickBlack from "components/svg/ChevronThickBlack";
import { DPLA_ITEM_ID_REGEX } from "constants/items";

function getFileType(fileType, originalUrl) {
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
}

function getViewerComponent(fileType, originalUrl, pathToFile) {
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
}

function ItemLink({ thumbnailUrl, itemId, className, fileType, originalUrl }) {
  const router = useRouter();
  const itemUrl = [
    "/exhibitions/",
    router.query.exhibitionSlug,
    "/",
    router.query.sectionSlug,
    router.query.subsectionSlug ? "/" + router.query.subsectionSlug : "",
    "?item=",
    itemId,
  ].join("");
  return (
    <Link href={itemUrl} className={[css.itemLink, className].join(" ")}>
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
    </Link>
  );
}

class Viewer extends React.Component {
  componentDidMount() {
    this.trackItemView();
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    this.trackItemView();
  }

  trackItemView() {
    const fullPath = getFullPath();

    if (fullPath !== this.lastTrackedPath) {
      // track exhibit item view event.
      const subsection = this.props.subsection;
      const pageBlocks = subsection.page_blocks;
      const activeBlockIndex = pageBlocks.findIndex((block) => block.isActive);
      const activeBlock = pageBlocks[activeBlockIndex];

      const dplaItemJson = activeBlock.dplaItemJson;
      const dplaItem = parseDplaItemRecord(dplaItemJson);

      const gaEvent = {
        type: "View Exhibition Item",
        itemId: activeBlock.dplaItemId,
        title: joinIfArray(dplaItem.title, ", "),
        partner: joinIfArray(dplaItem.partner, ", "),
        contributor: joinIfArray(dplaItem.dataProvider, ", "),
      };

      gtag.event(gaEvent);
      this.lastTrackedPath = fullPath;
    }
  }

  render() {
    const { subsection, router } = this.props;
    const pageBlocks = subsection.page_blocks;
    const pageWithText = pageBlocks.find((block) => block.text);
    const text = pageWithText ? pageWithText.text : "";
    const activeBlockIndex = pageBlocks.findIndex((block) => block.isActive);
    const activeBlock = pageBlocks[activeBlockIndex];
    const previousBlock =
      activeBlockIndex - 1 >= 0 ? pageBlocks[activeBlockIndex - 1] : null;
    const nextBlock =
      activeBlockIndex + 1 < pageBlocks.length
        ? pageBlocks[activeBlockIndex + 1]
        : null;
    const itemId = activeBlock?.dplaItemId;
    return (
      <div className={css.viewer}>
        <h2 className={css.titleSubsection}>{subsection.title}</h2>
        <div className={css.viewerContent}>
          <div className={css.mediaAndCaption}>
            <div className={css.mainMedia}>
              {previousBlock && (
                <Link
                  href={[
                    "/exhibitions/",
                    router.query.exhibitionSlug,
                    "/",
                    router.query.sectionSlug,
                    "/",
                    router.query.subsectionSlug,
                    "?item=",
                    previousBlock.id,
                  ].join("")}
                  className={css.previousItemButton}
                >
                  <ChevronThickBlack className={css.previousItemChevron} />
                </Link>
              )}
              {getViewerComponent(
                activeBlock.fileType,
                activeBlock.originalUrl,
                activeBlock.fullsizeImgUrl
                  ? activeBlock.fullsizeImgUrl
                  : activeBlock.originalUrl,
              )}
              {nextBlock && (
                <Link
                  href={[
                    "/exhibitions/",
                    router.query.exhibitionSlug,
                    "/",
                    router.query.sectionSlug,
                    "/",
                    router.query.subsectionSlug,
                    "?item=",
                    nextBlock.id,
                  ].join("")}
                  className={css.nextItemButton}
                >
                  <ChevronThickBlack className={css.nextItemChevron} />
                </Link>
              )}
            </div>
            <ul className={css.itemLinks}>
              {subsection.page_blocks.map((block) => (
                <li key={block.id}>
                  <ItemLink
                    fileType={block.type}
                    className={block.isActive ? css.activeItemLink : ""}
                    itemId={block.id}
                    thumbnailUrl={block.thumbnailUrl}
                    originalUrl={block.originalUrl}
                  />
                </li>
              ))}
            </ul>
            {itemId && DPLA_ITEM_ID_REGEX.test(itemId) && (
              <Link href={`/item/${itemId}`} className={css.viewItemLink}>
                View item information
              </Link>
            )}
            <div
              className={css.caption}
              dangerouslySetInnerHTML={{
                __html: activeBlock.attachments[0].caption,
              }}
            />
          </div>
          {text && (
            <div
              className={css.text}
              dangerouslySetInnerHTML={{ __html: text }}
            />
          )}
        </div>
      </div>
    );
  }
}

export default withRouter(Viewer);
