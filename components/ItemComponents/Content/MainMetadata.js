import React from "react";
import ItemImage from "./ItemImage";
import Row from "./Row";

import { joinIfArray, readMyRights } from "utilFunctions";
import { rightsURLs } from "constants/site.js";

import { classNames, stylesheet } from "./Content.css";

const externalLinkIcon = "/static/images/external-link-white.svg";

/**
  * @param url, url to check for rights info
  * @return HTML with rights badge or null
  */
const RightsBadge = ({ url }) => {
  const myRights = readMyRights(url);
  return myRights ? (
    <div className={classNames.rightsStatement}>
      <a
        href={myRights.url}
        title="Learn more about the copyright status of this item"
      >
        <img src={myRights.image} alt={myRights.description} />
      </a>
    </div>
  ) : null;
};

const MainMetadata = ({ item }) => (
  <div className={classNames.mainMetadata}>
    <table className={classNames.contentTable}>
      <tbody>
        <tr className={classNames.tableRow}>
          <td className={classNames.tableHeading}>Item</td>
          <td className={classNames.tableItem}>
            <ItemImage
              title={item.title}
              type={item.type}
              url={item.thumbnailUrl}
              defaultImageClass={classNames.defaultItemImage}
              useDefaultImage={item.useDefaultImage}
            />
            <a
              href={item.sourceUrl}
              rel="noopener noreferrer"
              target="_blank"
              className={classNames.sourceLink}
            >
              <span className={classNames.sourceLinkText}>
                {item.type === "image" ? (
                  "View Full Image"
                ) : item.type === "text" ? (
                  "View Full Text"
                ) : (
                  "View Full Item"
                )}
              </span>
              <img
                src={externalLinkIcon}
                alt=""
                className={classNames.externalLinkIcon}
              />
            </a>
            {item.edmRights && <RightsBadge url={item.edmRights} />}
            {/* 
        for situations where the rights are in sourceResource
        see: https://dp.la/item/7f2973c3c4429087b4874725f3bc67ad
        items should not have multiple rights but showing them in case a proper uri is present
         */}
            {item.rights && Array.isArray(item.rights) ? (
              item.rights.map(theRight => {
                return <RightsBadge url={theRight} />;
              })
            ) : item.rights ? (
              <RightsBadge url={item.rights} />
            ) : null}
          </td>
        </tr>
        <tr className={classNames.tableRow}>
          <td className={classNames.tableHeading}>Title</td>
          <td className={[classNames.tableItem, classNames.title].join(" ")}>
            {joinIfArray(item.title)}
          </td>
        </tr>
        {item.date && (
          <tr className={classNames.tableRow}>
            <td className={classNames.tableHeading}>Created Date</td>
            <td
              className={[
                classNames.tableItem,
                classNames.mainMetadataText
              ].join(" ")}
            >
              {item.date.displayDate}
            </td>
          </tr>
        )}
        {item.description && (
          <tr className={classNames.tableRow}>
            <td className={classNames.tableHeading}>Description</td>
            <td
              className={[
                classNames.tableItem,
                classNames.mainMetadataText
              ].join(" ")}
            >
              {joinIfArray(item.description)}
            </td>
          </tr>
        )}
        <Row heading="Creator">{joinIfArray(item.creator, ", ")}</Row>
      </tbody>
    </table>
  </div>
);

export default MainMetadata;
