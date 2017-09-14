import React from "react";
import Link from "next/link";
import { markdown } from "markdown";

import {
  ZoomableImageViewer,
  AudioPlayer,
  VideoPlayer,
  PDFViewer
} from "components/shared/mediaViewers";

import { extractItemId } from "utilFunctions";

import { classNames, stylesheet } from "./ContentAndMetadata.css";
import { classNames as utilClassNames } from "css/utils.css";
const { module } = utilClassNames;

const link = "/static/images/link.svg";
const external = "/static/images/external-link-black.svg";

const getSourceLink = source =>
  source.mainEntity[0]["dct:references"].filter(
    ref => ref["@type"] === "WebPage"
  )[0]["@id"];

const getItemId = source =>
  extractItemId(
    source.mainEntity[0]["dct:references"].filter(
      ref => ref["@type"] === "ore:Aggregation"
    )[0]["@id"]
  );

const getViewerComponent = (fileFormat, type, pathToFile) => {
  if (type === "MediaObject") {
    return <PDFViewer pathToFile={pathToFile} />;
  } else if (type === "ImageObject") {
    return <ZoomableImageViewer pathToFile={pathToFile} />;
  } else if (type === "AudioObject") {
    return <AudioPlayer pathToFile={pathToFile} fileFormat={fileFormat} />;
  } else if (type === "VideoObject") {
    return <VideoPlayer pathToFile={pathToFile} fileFormat={fileFormat} />;
  } else {
    return <div />;
  }
};

const getDomainFromThumbnail = thumbnailUrl =>
  /^(\/\/[\w.]+\/)/.exec(thumbnailUrl)[1];

const ContentAndMetadata = ({ source }) => {
  const type = source.mainEntity[0]["@type"];
  const { fileFormat, contentUrl } = source.mainEntity[0].associatedMedia[0];
  // some file types aren't stored with full domain
  // so we determine what the full domain is here
  const fullContentUrl = source.thumbnailUrl && !/^\/\//.test(contentUrl)
    ? `https:${getDomainFromThumbnail(source.thumbnailUrl)}${contentUrl}`
    : `https:${contentUrl}`;
  const viewerComponent = getViewerComponent(fileFormat, type, fullContentUrl);

  return (
    <div className={classNames.wrapper}>
      <div className={[classNames.contentAndMetadata, module].join(" ")}>
        <h2
          dangerouslySetInnerHTML={{ __html: markdown.toHTML(source.name) }}
          className={classNames.contentHeader}
        />
        <div className={classNames.flexWrapper}>
          <div className={classNames.contentWrapper}>
            <div className={classNames.content}>
              {viewerComponent}
            </div>
            {source.text &&
              <div
                dangerouslySetInnerHTML={{
                  __html: markdown
                    .toHTML(source.text)
                    .replace(/&lt;br&gt;/g, "<br>")
                }}
                className={classNames.description}
              />}
          </div>
          <div className={classNames.metadata}>
            <div className={classNames.sourceInfo}>
              {/* TODO: hook these up */}
              <button className={classNames.button}>Cite this item</button>
              <a href={fullContentUrl} download className={classNames.button}>
                Download
              </a>
              {source.mainEntity[0]["dct:provenance"] &&
                <div
                  className={classNames.courtesyOf}
                  dangerouslySetInnerHTML={{
                    __html: markdown.toHTML(
                      source.mainEntity[0]["dct:provenance"].name
                    )
                  }}
                />}
              {source.copyright &&
                <div className={classNames.copyrightInfo}>
                  <img src="" alt="" className={classNames.copyrightIcon} />
                  <p
                    className={classNames.copyrightText}
                    dangerouslySetInnerHTML={{
                      __html: markdown.toHTML(source.copyright)
                    }}
                  />
                </div>}
              <div className={classNames.divider} />
              {source.mainEntity[0]["dct:references"] &&
                <div className={classNames.linkWrapper}>
                  <a
                    href={getSourceLink(source)}
                    className={classNames.sourceLink}
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    <img alt="" src={link} className={classNames.linkIcon} />
                    <span className={classNames.linkText}>Item source</span>
                  </a>
                </div>}
              {source.mainEntity[0]["dct:references"] &&
                <div className={classNames.linkWrapper}>
                  <Link href={`/item?itemId=${getItemId(source)}`}>
                    <a
                      target="_blank"
                      rel="noopener noreferrer"
                      className={classNames.sourceLink}
                    >
                      <img
                        alt=""
                        src={external}
                        className={classNames.externalIcon}
                      />
                      <span className={classNames.linkText}>DPLA record</span>
                    </a>
                  </Link>
                </div>}
            </div>
            <div className={classNames.tipsForStudents}>
              <h3 className={classNames.tipsForStudentsHeader}>
                Tips for Students
              </h3>
              <p className={classNames.tipDirections}>
                For this source, consider:
              </p>
              <ul className={classNames.tips}>
                <li className={classNames.tip}>the author's point of view</li>
                <li className={classNames.tip}>the author's purpose</li>
                <li className={classNames.tip}>historical context</li>
                <li className={classNames.tip}>audience</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <style dangerouslySetInnerHTML={{ __html: stylesheet }} />
    </div>
  );
};

export default ContentAndMetadata;
