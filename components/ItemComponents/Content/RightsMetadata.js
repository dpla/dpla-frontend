import React from "react";
import { classNames, stylesheet } from "./Content.css";
import { makeURLsClickable } from "utilFunctions";

const RightsMetadata = ({ item }) =>
  <div className={classNames.rightsMetadata}>
    <table className={classNames.contentTable}>
      <tbody>
        <tr className={classNames.tableRow}>
          <td className={classNames.tableHeading}>
            Standardized Rights Statement
          </td>
          <td
            className={[classNames.tableItem, classNames.rightsText].join(" ")}
          >
            The organization that has made the Item available believes that the
            Item is in the Public Domain under the laws of the United States,
            but a determination was not made as to its copyright status under
            the copyright laws of other countries. The Item may not be in the
            Public Domain under the laws of other countries. Please refer to the
            organization that has made the Item available for more information.
            <a
              className={classNames.link}
              target="_blank"
              rel="noopener noreferrer"
              href="http://rightsstatements.org/vocab/NoC-US/1.0/"
            >
              {" "}http://rightsstatements.org/vocab/NoC-US/1.0/
            </a>
          </td>
        </tr>
        {item.rights && <tr className={classNames.tableRow}>
          <td className={classNames.tableHeading}>
            Rights
          </td>
          <td
            className={[classNames.tableItem, classNames.rightsText].join(" ")}
            dangerouslySetInnerHTML={{
              __html: Array.isArray(item.rights) 
              ? makeURLsClickable(item.rights.join(" ")) 
              : makeURLsClickable(item.rights)
            }}
          />
        </tr>}
      </tbody>
    </table>
    <style dangerouslySetInnerHTML={{ __html: stylesheet }} />
  </div>;

export default RightsMetadata;
