import React from "react";
import Markdown from "react-markdown";

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
  getContributor,
  markdownLinks
} from "lib";

import * as gtag from "lib/gtag";

import utils from "stylesheets/utils.module.scss";
import css from "./ContentAndMetadata.module.scss";

import LinkIcon from "components/svg/link-icon";
import ExternalLink from "components/svg/external-link";
import Link from "next/link";

const getSourceLink = source =>
  source.mainEntity[0]["dct:references"].filter(
    ref => ref["@type"] === "WebPage"
  )[0]["@id"];

const getSourceCitation = (source, type = "citation") =>
  source.mainEntity[0]["citation"]
      ? source.mainEntity[0]["citation"].filter(
          ref => ref["disabmiguationDescription"] === type
      )[0]?.["text"]
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
    this.setState({ isOpen: false });
    this.trackSourceView();
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    this.trackSourceView();
    if (prevProps.openDescription !== this.props.openDescription) {
      this.setState({isOpen: prevProps.openDescription || false});
    }
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
        <div className={`${css.contentAndMetadata} ${utils.container}`}>
          <h1 className={css.contentHeader}>
            <Markdown
              allowedElements={["emphasis", "text"]}
              unwrapDisallowed
            >{source.name}</Markdown>
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
                <Markdown
                  id="dpla-description"
                  className={`${css.description} ${descriptionIsLong
                    ? css.longDescription
                    : ""} ${this.state.isOpen ? css.open : ""}`}
                  components={{
                    a(props) { return markdownLinks(props)}
                  }}
                >{source.text.replace(/<br\/?>/g, "\n\n")}</Markdown>}
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
                {getSourceCitation(source, "credits") &&
                  <Markdown
                    className={css.courtesyOf}
                    allowedElements={["emphasis", "text"]}
                    unwrapDisallowed
                  >{joinIfArray(getSourceCitation(source, "credits"))}</Markdown>}
                {source.mainEntity[0]["dct:provenance"] &&
                  <Markdown
                    className={css.courtesyOf}
                    allowedElements={["emphasis", "text"]}
                    unwrapDisallowed
                  >{source.mainEntity[0]["dct:provenance"].name}</Markdown>}
                {source.copyright &&
                  <div className={css.copyrightInfo}>
                    <Markdown
                      className={css.copyrightText}
                      allowedElements={["emphasis", "text"]}
                      unwrapDisallowed>{source.copyright}</Markdown>
                  </div>}
                <div className={css.divider} />
                {source.mainEntity[0]["dct:references"] &&
                  <div className={css.linkWrapper}>
                    <Link
                      className={css.sourceLink}
                      href={`/item/${getItemId(source)}`}
                    >
                      <LinkIcon className={css.linkIcon}/>
                      <span className={css.linkText}>
                        View item information
                      </span>
                    </Link>
                  </div>}
                {source.mainEntity[0]["dct:references"] &&
                  <div className={css.linkWrapper}>
                    <a
                      href={getSourceLink(source)}
                      className={css.sourceLink}
                      onClick={e => trackClickThrough(e, source)}
                      rel="noopener"
                    >
                      <ExternalLink className={css.externalIcon}/>
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
                    the author&apos;s point of view
                  </li>
                  <li className={css.tip}>the author&apos;s purpose</li>
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
