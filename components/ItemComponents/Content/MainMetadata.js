import React from "react";
import { classNames, stylesheet } from "./Content.css";
import { joinIfArray } from "utilFunctions";
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
            <img
              className={classNames.thumbnail}
              src={item.thumbnailUrl}
              alt={item.description.join(" ")}
            />
            <a href={item.sourceUrl} className={classNames.sourceLink}>
              <span className={classNames.sourceLinkText}>Source</span>
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
        <tr className={classNames.tableRow}>
          <td className={classNames.tableHeading}>
            Description
          </td>
          <td
            className={[classNames.tableItem, classNames.mainMetadataText].join(
              " "
            )}
          >
            {joinIfArray(item.description)}
          </td>
        </tr>
      </tbody>
    </table>
    <style dangerouslySetInnerHTML={{ __html: stylesheet }} />
  </div>;

export default MainMetadata;
