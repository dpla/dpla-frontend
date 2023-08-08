import React from "react";
import Link from "next/link";

import Button from "components/shared/Button";
import FeedbackForm from "components/FeedbackForm";

import { PRO_BASE_URL } from "constants/env";

import css from "./Footer.module.scss";
import utils from "stylesheets/utils.module.scss"

class FooterUser extends React.Component {
  render() {
    return (
      <div className={`${css.footer} ${utils.siteMaxWidth}`} data-cy="footer">
        <div className={utils.row}>
          <div className={`${css.linkGroup} ${utils.colXs6} ${utils.colSm4} ${utils.colMd3}`}>
            <h2 className={css.linkHeader}>DPLA</h2>
            <ul>
              <li>
                <Link
                  href="/about?section=frequently-asked-questions"
                  as="/about/frequently-asked-questions"
                >
                  <a data-cy="footer-link-frequently-asked-questions">Frequently Asked Questions</a>
                </Link>
              </li>
              <li>
                <Link href="/guides">
                  <a data-cy="footer-link-guides">How Can I Use DPLA?</a>
                </Link>
              </li>
              <li>
                <Link
                  href="/about?section=terms-conditions"
                  as="/about/terms-conditions"
                >
                  <a data-cy="footer-link-terms-conditions">Terms &amp; Conditions</a>
                </Link>
              </li>
              <li>
                <Link
                    href="/about?section=harmful-language-statement"
                    as="/about/harmful-language-statement"
                >
                  <a>Harmful Content</a>
                </Link>
              </li>
              <li>
                <Link href="/about?section=about-us" as="/about">
                  <a data-cy="footer-link-about">About DPLA</a>
                </Link>
              </li>
              <li>
                <Link href="/contact-us" as="/contact">
                  <a data-cy="footer-link-contact">Contact Us</a>
                </Link>
              </li>
              <li>
                <FeedbackForm />
              </li>
              <li>
                <Link href="/news">
                  <a data-cy="footer-link-news">News</a>
                </Link>
              </li>
            </ul>
          </div>
          <div className={`${css.linkGroup} ${utils.colXs6} ${utils.colSm4} ${utils.colMd3}`}>
            <h2 className={css.linkHeader}>Tools</h2>
            <ul>
              <li>
                <Link href="/primary-source-sets">
                  <a data-cy="footer-link-primary-source-sets">Primary Source Sets</a>
                </Link>
              </li>
              <li>
                <Link href="/browse-by-partner">
                  <a data-cy="footer-link-browse-by-partner">Browse by Partner</a>
                </Link>
              </li>
              <li>
                <Link href="/browse-by-topic">
                  <a data-cy="footer-link-browse-by-topic">Browse by Topic</a>
                </Link>
              </li>
              <li>
                <Link href="/exhibitions">
                  <a data-cy="footer-link-exhibitions">Exhibitions</a>
                </Link>
              </li>
              <li>
                <Link href="/lists">
                  <a data-cy="footer-link-lists">
                    My Lists
                  </a>
                </Link>
              </li>
              <li>
                <Link href="/search">
                  <a data-cy="footer-link-search">Search</a>
                </Link>
              </li>
            </ul>
          </div>
          <div className={`${css.linkGroup} ${utils.colXs6} ${utils.colSm4} ${utils.colMd3}`}>
            <h2 className={css.linkHeader}>DPLA Pro</h2>
            <ul>
              <li>
                <Link href={PRO_BASE_URL}>
                  <a data-cy="footer-link-pro">DPLA Pro Home</a>
                </Link>
              </li>
              <li>
                <Link href={PRO_BASE_URL + "/prospective-hubs"}>
                  <a data-cy="footer-link-prospective-hubs">Prospective Hubs</a>
                </Link>
              </li>
              <li>
                <Link href={PRO_BASE_URL + "/hubs"}>
                  <a data-cy="footer-link-hub-network">Hub Network</a>
                </Link>
              </li>
              <li>
                <Link href={PRO_BASE_URL + "/developers"}>
                  <a data-cy="footer-link-developers">Developers</a>
                </Link>
              </li>
              <li>
                <Link href={PRO_BASE_URL + "/education"}>
                  <a data-cy="footer-link-education">Education</a>
                </Link>
              </li>
              <li>
                <Link href={PRO_BASE_URL + "/projects"}>
                  <a data-cy="footer-link-projects">Projects</a>
                </Link>
              </li>
              <li>
                <Link href={"https://ebooks.dp.la"}>
                  <a data-cy="footer-link-ebooks">Ebooks</a>
                </Link>
              </li>
              <li>
                <Link href={PRO_BASE_URL + "/events"}>
                  <a data-cy="footer-link-events">Events</a>
                </Link>
              </li>
            </ul>
          </div>
          <div className={`${utils.colXs12} ${utils.colMd3}`}>
            <Button
              data-cy="footer-donate"
              type="primary"
              size="large"
              className={css.donateButton}
              url="/donate"
            >
              Donate
            </Button>
          </div>
        </div>
      </div>
    );
  }
}
export default FooterUser;
