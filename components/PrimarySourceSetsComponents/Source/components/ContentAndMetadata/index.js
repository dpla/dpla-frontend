import React from "react";
import ReactMarkdown from "react-markdown";
import Router from "next/router";

import {
  ZoomableImageViewer,
  AudioPlayer,
  VideoPlayer,
  PDFViewer
} from "components/shared/mediaViewers";
import CiteButton from "components/shared/CiteButton";

import {
  getFullPath,
  joinIfArray,
  getItemId,
  getPartner,
  getTitle,
  getContributor
} from "lib";
import { markdownLinks } from "lib/externalLinks";
import * as gtag from "lib/gtag";

import utils from "stylesheets/utils.scss";
import css from "./ContentAndMetadata.scss";

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
    gtag.event(gaEvent);
  } catch (error) {
    // TODO: What is the best way to log an error?
  } finally {
    // Open the link, even if the Google Analytics event tracking failed.
    window.open(href, target);
  }
};

class ContentAndMetadata extends React.Component {
  state = { isOpen: true }; // show it if js is disabled

  componentDidMount() {
    // now collapse it
    this.setState({ isOpen: false });
    this.trackSourceView();
    Router.onRouteChangeComplete = url => this.trackSourceView();
  }

  componentWillReceiveProps() {
    this.setState({ isOpen: this.props.openDescription || false });
  }

  showMoreDescription() {
    this.setState({ isOpen: true });
  }

  trackSourceView() {
    const fullPath = getFullPath();
    const source = this.props.source;

    if (fullPath !== this.lastTrackedPath) {
      const gaEvent = {
        type: "View Primary Source",
        itemId: getItemId(source),
        title: joinIfArray(getTitle(source)),
        partner: joinIfArray(getPartner(source)),
        contributor: joinIfArray(getContributor(source))
      };

      gtag.event(gaEvent);
      this.lastTrackedPath = fullPath;
    }
  }

  render() {
    const { source } = this.props;
    const type = source.mainEntity[0]["@type"];
    const { fileFormat, contentUrl } = source.mainEntity[0].associatedMedia[0];
    // some file types aren't stored with full domain
    // so we determine what the full domain is here

    const fullContentUrl = source.thumbnailUrl &&
      !/^(?:https?:)?\/\//.test(contentUrl)
      ? `https:${getDomainFromThumbnail(source.thumbnailUrl)}${contentUrl}`
      : contentUrl;

    const viewerComponent = getViewerComponent(
      fileFormat,
      type,
      fullContentUrl
    );

    const maxDescriptionLength = 600; //characters
    const descriptionIsLong = source.text
      ? source.text.length > maxDescriptionLength
      : false;

    return (
      <div className={css.wrapper}>
        <div className={[css.contentAndMetadata, utils.container].join(" ")}>
          <h1 className={css.contentHeader}>
            <ReactMarkdown
              source={source.name}
              allowedTypes={["emphasis"]}
              unwrapDisallowed
            />
          </h1>
          <div className={css.flexWrapper}>
            <div className={css.contentWrapper}>
              <div
                className={`${css.content} ${viewerComponent.type.name ===
                  "AudioPlayer"
                  ? css.compact
                  : ""}`}
              >
                {viewerComponent}
              </div>
              {source.text &&
                <ReactMarkdown
                  id="dpla-description"
                  className={`${css.description} ${descriptionIsLong
                    ? css.longDescription
                    : ""} ${this.state.isOpen ? css.open : ""}`}
                  source={source.text.replace(/<br\/?>/g, "\n\n")}
                  renderers={{
                    linkReference: reference => markdownLinks(reference),
                    link: reference => markdownLinks(reference)
                  }}
                />}
              {descriptionIsLong &&
                <div
                  id="dpla-showmore"
                  aria-hidden="true"
                  className={`${css.showMore} ${this.state.isOpen
                    ? css.open
                    : ""}`}
                >
                  <span
                    className={`link`}
                    onClick={() => this.showMoreDescription()}
                  >
                    Show full description
                  </span>
                </div>}

            </div>
            <div className={css.metadata}>
              <div className={css.sourceInfo}>
                <div className={css.buttons}>
                  {getSourceCitation(source) &&
                    <div
                      className={`${css.citeButton} ${css.faveAndCiteButtons}`}
                    >
                      <CiteButton
                        toCiteText="item"
                        freeText={getSourceCitation(source)}
                        className={""}
                        title={source.name}
                      />
                    </div>}
                </div>
                {/* <a href={fullContentUrl} download className={css.button}>
                Download
              </a> */}
                {getSourceCitation(source, "credits") &&
                  <ReactMarkdown
                    className={css.courtesyOf}
                    source={joinIfArray(getSourceCitation(source, "credits"))}
                    allowedTypes={["emphasis"]}
                    unwrapDisallowed
                  />}
                {source.mainEntity[0]["dct:provenance"] &&
                  <ReactMarkdown
                    className={css.courtesyOf}
                    source={source.mainEntity[0]["dct:provenance"].name}
                    allowedTypes={["emphasis"]}
                    unwrapDisallowed
                  />}
                {source.copyright &&
                  <div className={css.copyrightInfo}>
                    <ReactMarkdown
                      className={css.copyrightText}
                      source={source.copyright}
                      allowedTypes={["emphasis"]}
                      unwrapDisallowed
                    />
                  </div>}
                <div className={css.divider} />
                {source.mainEntity[0]["dct:references"] &&
                  <div className={css.linkWrapper}>
                    <a
                      className={css.sourceLink}
                      href={`/item/${getItemId(source)}`}
                    >
                      <img
                        alt="Link icon"
                        src={link}
                        className={css.linkIcon}
                      />
                      <span className={css.linkText}>
                        View item information
                      </span>
                    </a>
                  </div>}
                {source.mainEntity[0]["dct:references"] &&
                  <div className={css.linkWrapper}>
                    <a
                      href={getSourceLink(source)}
                      className={`${css.sourceLink}`}
                      onClick={e => trackClickThrough(e, source)}
                      rel="noopener noreferrer"
                      target="_blank"
                    >
                      <img
                        alt="External link icon"
                        src={external}
                        className={css.externalIcon}
                      />
                      <span className={css.linkText}>
                        View in {getPartner(source)}
                      </span>
                    </a>
                  </div>}
              </div>
              <div className={css.tipsForStudents}>
                <h2 className={css.tipsForStudentsHeader}>
                  Tips for Students
                </h2>
                <p className={css.tipDirections}>
                  For this source, consider:
                </p>
                <ul className={css.tips}>
                  <li className={css.tip}>
                    the author's point of view
                  </li>
                  <li className={css.tip}>the author's purpose</li>
                  <li className={css.tip}>historical context</li>
                  <li className={css.tip}>audience</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ContentAndMetadata;
