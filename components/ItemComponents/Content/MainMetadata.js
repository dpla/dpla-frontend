import React from "react";
import { classNames, stylesheet } from "./Content.css";

const MainMetadata = ({ item }) =>
  <div className={classNames.content}>
    <table className={classNames.contentTable}>
      <tbody>
        <tr className={classNames.tableRow}>
          <td className={classNames.tableHeading}>
            Item
          </td>
          <td className={[classNames.tableItem]}>
            <a className={classNames.mailToLink} href="mailto:info@dp.la">
              info@dp.la
            </a>
          </td>
        </tr>
        <tr className={classNames.tableRow}>
          <td className={classNames.tableHeading}>
            Created Date
          </td>
          <td className={[classNames.tableItem]} />
        </tr>
        <tr className={classNames.tableRow}>
          <td className={classNames.tableHeading}>
            Description
          </td>
          <td className={[classNames.tableItem]} />
        </tr>
      </tbody>
    </table>
    <style dangerouslySetInnerHTML={{ __html: stylesheet }} />
  </div>;

export default MainMetadata;
