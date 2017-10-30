import React from "react";
import { classNames, stylesheet } from "./Content.css";
import { joinIfArray } from "utilFunctions";
import ItemImage from "./ItemImage";
const externalLinkIcon = "/static/images/external-link-white.svg";

const MainMetadata = ({ item }) =>
  <div className={classNames.mainMetadata}>
    <table className={classNames.contentTable}>
      <tbody>
        <tr className={classNames.tableRow}>
          <td className={classNames.tableHeading}>
            Item
          </td>
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
                {item.type === "image"
                  ? "View Full Image"
                  : item.type === "text" ? "View Full Text" : "View Full Item"}
              </span>
              <img
                src={externalLinkIcon}
                alt=""
                className={classNames.externalLinkIcon}
              />
            </a>
          </td>
        </tr>
        <tr className={classNames.tableRow}>
          <td className={classNames.tableHeading}>
            Title
          </td>
          <td className={[classNames.tableItem, classNames.title].join(" ")}>
            {joinIfArray(item.title)}
          </td>
        </tr>
        {item.date &&
          <tr className={classNames.tableRow}>
            <td className={classNames.tableHeading}>
              Created Date
            </td>
            <td
              className={[
                classNames.tableItem,
                classNames.mainMetadataText
              ].join(" ")}
            >
              {item.date.displayDate}
            </td>
          </tr>}
        {item.description &&
          <tr className={classNames.tableRow}>
            <td className={classNames.tableHeading}>
              Description
            </td>
            <td
              className={[
                classNames.tableItem,
                classNames.mainMetadataText
              ].join(" ")}
            >
              {joinIfArray(item.description)}
            </td>
          </tr>}
      </tbody>
    </table>
    <style dangerouslySetInnerHTML={{ __html: stylesheet }} />
  </div>;

export default MainMetadata;
