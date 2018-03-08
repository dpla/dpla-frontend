import React from "react";

import {
  ZoomableImageViewer,
  AudioPlayer,
  VideoPlayer,
  PDFViewer
} from "components/shared/mediaViewers";
import Button from "components/shared/Button";
import CiteButton from "components/shared/CiteButton";
import GaPssWrapper from "./GaPssWrapper";

import {
  joinIfArray,
  getItemId,
  getPartner,
  showMoreDescription,
  getTitle,
  getContributor,
  trackGaEvent
} from "utilFunctions";

import { classNames, stylesheet } from "./ContentAndMetadata.css";

import { classNames as utilClassNames } from "css/utils.css";

const markdownit = require("markdown-it")({ html: true });
const { container } = utilClassNames;

const link = "/static/images/link.svg";
const external = "/static/images/external-link-black.svg";

const getSourceLink = source =>
  source.mainEntity[0]["dct:references"].filter(
    ref => ref["@type"] === "WebPage"
  )[0]["@id"];

const getSourceCitation = (source, type = "citation") =>
  source.mainEntity[0]["citation"]
    ? source.mainEntity[0]["citation"].filter(
        ref => ref["disabmiguationDescription"] === type
      )[0]["text"]
    : source.mainEntity[0]["citation"];

const getViewerComponent = (fileFormat, type, pathToFile) => {
  if (type === "MediaObject") {
    return <PDFViewer pathToFile={pathToFile} height={"100%"} />;
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
  /^(?:https?:)?(\/\/[\w.]+\/)/.exec(thumbnailUrl)[1];

// TODO: Make this a utilFunction and use in all Click Through events.
const trackClickThrough = (e, source, target = "_blank") => {
  const href = getSourceLink(source);

  const gaEvent = {
    type: "Click Through",
    itemId: getItemId(source),
    title: joinIfArray(getTitle(source)),
    partner: joinIfArray(getPartner(source)),
    contributor: joinIfArray(getContributor(source))
  };

  // e is a React synthetic event
  e.preventDefault();

  try {
    // Try tracking a Google Analytics event.
    trackGaEvent(gaEvent);
  } catch (error) {
    // TODO: What is the best way to log an error?
  } finally {
    // Open the link, even if the Google Analytics event tracking failed.
    window.open(href, target);
  }
};

const ContentAndMetadata = ({ source }) => {
  const type = source.mainEntity[0]["@type"];
  const { fileFormat, contentUrl } = source.mainEntity[0].associatedMedia[0];
  // some file types aren't stored with full domain
  // so we determine what the full domain is here

  const fullContentUrl = source.thumbnailUrl &&
    !/^(?:https?:)?\/\//.test(contentUrl)
    ? `https:${getDomainFromThumbnail(source.thumbnailUrl)}${contentUrl}`
    : contentUrl;

  const viewerComponent = getViewerComponent(fileFormat, type, fullContentUrl);

  const maxDescriptionLength = 600; //characters
  const descriptionIsLong = source.text
    ? source.text.length > maxDescriptionLength
    : false;

  return (
    <div className={classNames.wrapper}>
      <div className={[classNames.contentAndMetadata, container].join(" ")}>
        <h1
          dangerouslySetInnerHTML={{
            __html: markdownit.renderInline(source.name)
          }}
          className={classNames.contentHeader}
        />
        <div className={classNames.flexWrapper}>
          <div className={classNames.contentWrapper}>
            <div
              className={`${classNames.content} ${viewerComponent.type.name ===
                "AudioPlayer"
                ? classNames.compact
                : ""}`}
            >
              {viewerComponent}
            </div>
            {source.text &&
              <div
                id="dpla-description"
                className={`${classNames.description} ${descriptionIsLong
                  ? classNames.longDescription
                  : ""}`}
                dangerouslySetInnerHTML={{
                  __html: markdownit
                    .render(source.text)
                    .replace(/&lt;br&gt;/g, "<br>")
                }}
              />}
            {descriptionIsLong &&
              <div id="dpla-showmore" aria-hidden="true">
                <span
                  className={`${classNames.showMore} link`}
                  onClick={() =>
                    showMoreDescription({ className: classNames.open })}
                >
                  Show full description
                </span>
              </div>}

          </div>
          <div className={classNames.metadata}>
            <div className={classNames.sourceInfo}>
              <div className={classNames.buttons}>
                {getSourceCitation(source) &&
                  <div
                    className={`${classNames.citeButton} ${classNames.faveAndCiteButtons}`}
                  >
                    <CiteButton
                      toCiteText="item"
                      freeText={getSourceCitation(source)}
                      className={""}
                      title={source.name}
                    />
                  </div>}
              </div>
              {/* <a href={fullContentUrl} download className={classNames.button}>
                Download
              </a> */}
              {getSourceCitation(source, "credits") &&
                <div
                  className={classNames.courtesyOf}
                  dangerouslySetInnerHTML={{
                    __html: markdownit.renderInline(
                      joinIfArray(getSourceCitation(source, "credits"))
                    )
                  }}
                />}
              {source.mainEntity[0]["dct:provenance"] &&
                <div
                  className={classNames.courtesyOf}
                  dangerouslySetInnerHTML={{
                    __html: markdownit.renderInline(
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
                      __html: markdownit.renderInline(source.copyright)
                    }}
                  />
                </div>}
              <div className={classNames.divider} />
              {source.mainEntity[0]["dct:references"] &&
                <div className={classNames.linkWrapper}>
                  <a
                    className={classNames.sourceLink}
                    href={`/item/${getItemId(source)}`}
                  >
                    <img
                      alt="Link icon"
                      src={link}
                      className={classNames.linkIcon}
                    />
                    <span className={classNames.linkText}>
                      View item information
                    </span>
                  </a>
                </div>}
              {source.mainEntity[0]["dct:references"] &&
                <div className={classNames.linkWrapper}>
                  <a
                    href={getSourceLink(source)}
                    className={`${classNames.sourceLink}`}
                    onClick={e => trackClickThrough(e, source)}
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    <img
                      alt="External link icon"
                      src={external}
                      className={classNames.externalIcon}
                    />
                    <span className={classNames.linkText}>
                      View in {getPartner(source)}
                    </span>
                  </a>
                </div>}
            </div>
            <div className={classNames.tipsForStudents}>
              <h2 className={classNames.tipsForStudentsHeader}>
                Tips for Students
              </h2>
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

export default GaPssWrapper(ContentAndMetadata);
