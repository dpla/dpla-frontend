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
        <tr className={`row ${classNames.firstRow}`}>
          <td className={`col-xs-12 col-sm-5 ${classNames.tableHeading}`}>
            Telephone
          </td>
          <td className={`col-xs-12 col-sm-7 ${classNames.tableItem}`}>
            617-859-2116
          </td>
        </tr>
        <tr className={`row ${classNames.firstRow}`}>
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
        <tr className={`row ${classNames.firstRow}`}>
          <td className={`col-xs-12 col-sm-5 ${classNames.tableHeading}`}>
            Social Media
          </td>
          <td className={`col-xs-12 col-sm-7 ${classNames.tableItem}`}>
            <ul>
              <li><a href="//twitter.com/dpla">Twitter</a></li>
              <li>
                <a href="//www.facebook.com/digitalpubliclibraryofamerica">
                  Facebook
                </a>
              </li>
              <li><a href="//www.instagram.com/digpublib/">Instagram</a></li>
              <li>
                <a href="//digitalpubliclibraryofamerica.tumblr.com/">Tumblr</a>
              </li>
              <li><a href="//www.flickr.com/photos/dpla/albums">Flickr</a></li>
              <li>
                <a href="//www.youtube.com/user/digpublib/videos">YouTube</a>
              </li>
            </ul>
          </td>
        </tr>
        <tr className={`row ${classNames.firstRow}`}>
          <td className={`col-xs-12 col-sm-5 ${classNames.tableHeading}`}>
            Mailing Lists
          </td>
          <td className={`col-xs-12 col-sm-7 ${classNames.tableItem}`}>
            <ul>
              <li>
                <a href="https://us4.list-manage.com/subscribe?u=e1490d1305c4b651f3ad0ace4&id=1ee988aadc">
                  General List
                </a>
              </li>
              <li>
                <a href="http://dp.us4.list-manage.com/subscribe?u=e1490d1305c4b651f3ad0ace4&id=de870d2705">
                  Education List
                </a>
              </li>
              <li>
                <a href="http://dp.us4.list-manage2.com/subscribe?u=e1490d1305c4b651f3ad0ace4&id=f36418b975">
                  Genealogy List
                </a>
              </li>
            </ul>
          </td>
        </tr>
      </tbody>
    </table>
    <style dangerouslySetInnerHTML={{ __html: stylesheet }} />
  </div>;

export default ContactForm;
