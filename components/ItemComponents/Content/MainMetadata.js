import React from "react";
import Link from "next/link";
import { classNames, stylesheet } from "./Content.css";

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
            <Link>
              <a className={classNames.sourceLink}>
                <span className={classNames.sourceLinkText}>Source</span>
                <img
                  src={externalLinkIcon}
                  alt=""
                  className={classNames.externalLinkIcon}
                />
              </a>
            </Link>
          </td>
        </tr>
        <tr className={classNames.tableRow}>
          <td className={classNames.tableHeading}>
            Title
          </td>
          <td className={[classNames.tableItem, classNames.title].join(" ")}>
            {item.title.join(" ")}
          </td>
        </tr>
        <tr className={classNames.tableRow}>
          <td className={classNames.tableHeading}>
            Created Date
          </td>
          <td
            className={[classNames.tableItem, classNames.mainMetadataText].join(
              " "
            )}
          >
            {item.date.displayDate}
          </td>
        </tr>
        <tr className={classNames.tableRow}>
          <td className={classNames.tableHeading}>
            Description
          </td>
          <td
            className={[classNames.tableItem, classNames.mainMetadataText].join(
              " "
            )}
          >
            {item.description.join(" ")}
          </td>
        </tr>
      </tbody>
    </table>
    <style dangerouslySetInnerHTML={{ __html: stylesheet }} />
  </div>;

export default MainMetadata;
