import React from "react";
import Link from "next/link";

import { classNames, stylesheet } from "./ContentAndMetadata.css";
import { classNames as utilClassNames } from "css/utils.css";
const { module } = utilClassNames;

const link = "/static/images/link.svg";
const external = "/static/images/external-link-black.svg";

const getSourceLink = source =>
  source.mainEntity[0]["dct:references"].filter(
    ref => ref["@type"] === "WebPage"
  )[0]["@id"];

const ContentAndMetadata = ({ source }) =>
  console.log(source.mainEntity[0]["dct:references"]) ||
  <div className={classNames.wrapper}>
    <div className={[classNames.contentAndMetadata, module].join(" ")}>
      <div className={classNames.content}>
        <h2 className={classNames.contentHeader}>
          {source.name}
        </h2>
        <div className={classNames.imageWrapper}>
          <img
            src={source.thumbnailUrl}
            alt={source.name}
            className={classNames.image}
          />
        </div>
        {source.text && <p className={classNames.description}>{source.text}</p>}
      </div>
      <div className={classNames.metadata}>
        <div className={classNames.sourceInfo}>
          <button className={classNames.button}>Cite this item</button>
          <button className={classNames.button}>Download</button>
          <p className={classNames.courtesyOf}>
            {source.mainEntity[0]["dct:provenance"].name}
          </p>
          <div className={classNames.copyrightInfo}>
            <img src="" alt="" className={classNames.copyrightIcon} />
            <p className={classNames.copyrightText}>
              {source.copyright}
            </p>
          </div>
          <div className={classNames.divider} />
          <div className={classNames.linkWrapper}>
            <a href={getSourceLink(source)} className={classNames.sourceLink}>
              <img alt="" src={link} className={classNames.linkIcon} />
              <span className={classNames.linkText}>Item source</span>
            </a>
          </div>
          <div className={classNames.linkWrapper}>
            <Link to={source.dplaRecord}>
              <a className={classNames.sourceLink}>
                <img
                  alt=""
                  src={external}
                  className={classNames.externalIcon}
                />
                <span className={classNames.linkText}>DPLA record</span>
              </a>
            </Link>
          </div>
        </div>
        <div className={classNames.tipsForStudents}>
          <h3 className={classNames.tipsForStudentsHeader}>
            Tips for Students
          </h3>
          <p className={classNames.tipDirections}>For this source, consider:</p>
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
  </div>;

export default ContentAndMetadata;
