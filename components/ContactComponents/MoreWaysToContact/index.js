import React from "react";
import { classNames, stylesheet } from "./MoreWaysToContact.css";

const ContactForm = () =>
  <div className={classNames.contactForm}>
    <h2 className={classNames.header}>More Ways To Contact Us</h2>
    <table className={classNames.contentTable}>
      <tbody>
        <tr className={`row ${classNames.firstRow}`}>
          <td className={`col-xs-12 col-sm-5 ${classNames.tableHeading}`}>
            General Email
          </td>
          <td className={`col-xs-12 col-sm-7 ${classNames.tableItem}`}>
            <a className={classNames.mailToLink} href="mailto:info@dp.la">
              info@dp.la
            </a>
          </td>
        </tr>
        <tr className="row">
          <td className={`col-xs-12 col-sm-5 ${classNames.tableHeading}`}>
            Mailing Address
          </td>
          <td className={`col-xs-12 col-sm-7 ${classNames.tableItem}`}>
            Digital Public Library of America<br />
            c/o Boston Public Library<br />
            700 Boylston Street<br />
            Boston, MA 02116<br />
          </td>
        </tr>
      </tbody>
    </table>
    <style dangerouslySetInnerHTML={{ __html: stylesheet }} />
  </div>;

export default ContactForm;
