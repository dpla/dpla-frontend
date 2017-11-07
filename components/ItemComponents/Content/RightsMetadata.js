import React from "react";
import { classNames, stylesheet } from "./Content.css";
import { makeURLsClickable, joinIfArray, readMyRights } from "utilFunctions";
import { rightsURLs } from "../../../constants/site.js";

const RightsMetadata = ({ item }) =>
  <div className={classNames.rightsMetadata}>
    <table className={classNames.contentTable}>
      <tbody>
        {item.edmRights &&
          readMyRights(item.edmRights) &&
          <tr className={classNames.tableRow}>
            <td className={classNames.tableHeading}>
              Standardized Rights Statement
            </td>
            <td
              className={[classNames.tableItem, classNames.rightsText].join(
                " "
              )}
            >
              {readMyRights(item.edmRights).description}
              {readMyRights(item.edmRights).description !== "" && <br />}
              <a
                href={item.edmRights}
                className="link"
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
