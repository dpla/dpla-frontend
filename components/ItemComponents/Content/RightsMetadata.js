import React from "react";
import { classNames, stylesheet } from "./Content.css";
import { makeURLsClickable } from "utilFunctions";
import { rightsURLs } from "../../../constants/site.js";
import { joinIfArray } from "utilFunctions";

const RightsMetadata = ({ item }) =>
  <div className={classNames.rightsMetadata}>
    <table className={classNames.contentTable}>
      <tbody>
        {item.edmRights &&
          <tr className={classNames.tableRow}>
            <td className={classNames.tableHeading}>
              Standardized Rights Statement
            </td>
            <td
              className={[classNames.tableItem, classNames.rightsText].join(
                " "
              )}
            >
              {
                rightsURLs[joinIfArray(item.edmRights).toLowerCase()]
                  .description
              }{" "}
              <br />
              <a
                href={item.edmRights}
                className="link"
                target="_blank"
                rel="noopener noreferrer"
              >
                {item.edmRights}
              </a>
            </td>
          </tr>}
        {item.rights &&
          <tr className={classNames.tableRow}>
            <td className={classNames.tableHeading}>Rights</td>
            <td
              className={[classNames.tableItem, classNames.rightsText].join(
                " "
              )}
              dangerouslySetInnerHTML={{
                __html: makeURLsClickable(
                  joinIfArray(item.rights, "<br/> "),
                  "link"
                )
              }}
            />
          </tr>}
      </tbody>
    </table>
    <style dangerouslySetInnerHTML={{ __html: stylesheet }} />
  </div>;

export default RightsMetadata;
