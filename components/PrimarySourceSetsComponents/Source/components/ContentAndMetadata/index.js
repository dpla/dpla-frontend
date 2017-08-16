import React from "react";
import Link from "next/link";
import { markdown } from "markdown";

import PDFViewer from "./PDFViewer";

import { classNames, stylesheet } from "./ContentAndMetadata.css";
import { classNames as utilClassNames } from "css/utils.css";
const { module } = utilClassNames;

const link = "/static/images/link.svg";
const external = "/static/images/external-link-black.svg";

const getSourceLink = source =>
  source.mainEntity[0]["dct:references"].filter(
    ref => ref["@type"] === "WebPage"
  )[0]["@id"];

const getDomain = thumbnailUrl => /^(\/\/[\w.]+\/)/.exec(thumbnailUrl)[1];

const ContentAndMetadata = ({ source }) => {
  const { fileFormat, contentUrl } = source.mainEntity[0].associatedMedia[0];
  const fullContentUrl = `https:${getDomain(source.thumbnailUrl)}${contentUrl}`;
  return (
    <div className={classNames.wrapper}>
      <div className={[classNames.contentAndMetadata, module].join(" ")}>
        <div className={classNames.contentWrapper}>
          <h2
            dangerouslySetInnerHTML={{ __html: markdown.toHTML(source.name) }}
            className={classNames.contentHeader}
          />
          <div className={classNames.content}>
            <PDFViewer pathToFile={fullContentUrl} />
          </div>
          {source.text &&
            <p
              dangerouslySetInnerHTML={{ __html: markdown.toHTML(source.text) }}
              className={classNames.description}
            />}
        </div>
        <div className={classNames.metadata}>
          <div className={classNames.sourceInfo}>
            {/* TODO: hook these up */}
            <button className={classNames.button}>Cite this item</button>
            <button className={classNames.button}>Download</button>
            <p
              className={classNames.courtesyOf}
              dangerouslySetInnerHTML={{
                __html: markdown.toHTML(
                  source.mainEntity[0]["dct:provenance"].name
                )
              }}
            />
            <div className={classNames.copyrightInfo}>
              <img src="" alt="" className={classNames.copyrightIcon} />
              {source.copyright &&
                <p
                  className={classNames.copyrightText}
                  dangerouslySetInnerHTML={{
                    __html: markdown.toHTML(source.copyright)
                  }}
                />}
            </div>
            <div className={classNames.divider} />
            {source.mainEntity[0]["dct:references"] &&
              <div className={classNames.linkWrapper}>
                <a
                  href={getSourceLink(source)}
                  className={classNames.sourceLink}
                >
                  <img alt="" src={link} className={classNames.linkIcon} />
                  <span className={classNames.linkText}>Item source</span>
                </a>
              </div>}
            <div className={classNames.linkWrapper}>
              <Link to={source.dplaRecord}>
                <a className={classNames.sourceLink}>
                  <img
                    alt=""
                    src={external}
                    className={classNames.externalIcon}
                  />
                  {/* TODO: hook this up */}
                  <span className={classNames.linkText}>DPLA record</span>
                </a>
              </Link>
            </div>
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
      <style dangerouslySetInnerHTML={{ __html: stylesheet }} />
    </div>
  );
};

export default ContentAndMetadata;
