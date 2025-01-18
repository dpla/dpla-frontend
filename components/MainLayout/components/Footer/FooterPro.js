import React from "react";
import Link from "next/link";

import Button from "components/shared/Button";
import FeedbackForm from "components/FeedbackForm";

import { USER_BASE_URL } from "constants/env";

import css from "./Footer.module.scss";
import utils from "stylesheets/utils.module.scss"

const FooterPro = () =>
  <div className={`${css.footer} ${utils.siteMaxWidth}`}>
    <div className={utils.row}>
      <div className={`${css.linkGroup} ${utils.colXs12} ${utils.colSm6} ${utils.colMd3}`}>
        <h2 className={css.linkHeader}>About Us</h2>
        <ul>
          <li>
            <Link as="/about" href="/pro/wp?section=about-dpla-pro">
              About DPLA Pro
            </Link>
          </li>
          <li>
            <Link href="/contact-us" as="/contact">
              Contact Us
            </Link>
          </li>
          <li>
            <FeedbackForm/>
          </li>
          <li>
            <Link as="/projects" href="/pro/wp?section=projects">
              Projects
            </Link>
          </li>
          <li>
            <Link as="/events" href="/pro/wp?section=events">
              Events
            </Link>
          </li>
        </ul>
      </div>
      <div className={`${css.linkGroup} ${utils.colXs12} ${utils.colSm} ${utils.colMd3}`}>
        <h2 className={css.linkHeader}>Communities</h2>
        <ul>
          <li>
            <Link as="/hubs" href="/pro/wp/hubs?section=hubs">
              Hub Network
            </Link>
          </li>
          <li>
            <Link
              as="/prospective-hubs"
              href="/pro/wp?section=prospective-hubs"
            >
              Prospective Hubs
            </Link>
          </li>
          <li>
            <Link as="/developers" href="/pro/wp?section=developers">
              Developers
            </Link>
          </li>
          <li>
            <Link as="/education" href="/pro/wp?section=education">
              Education
            </Link>
          </li>
          <li>
            <Link as="/ebooks" href="/pro/wp/ebooks?section=ebooks">
              Ebooks
            </Link>
          </li>
        </ul>
      </div>
      <div className={`${css.linkGroup} ${utils.colXs6} ${utils.colSm6} ${utils.colMd3}`}>
        <h2 className={css.linkHeader}>DPLA</h2>
        <ul>
          <li>
            <Link href={USER_BASE_URL}>
              DPLA Home
            </Link>
          </li>
          <li>
            <Link href={USER_BASE_URL + "/primary-source-sets"}>
              Primary Source Sets
            </Link>
          </li>
          <li>
            <Link href={USER_BASE_URL + "/browse-by-partner"}>
              Browse by Partner
            </Link>
          </li>
          <li>
            <Link href={USER_BASE_URL + "/browse-by-topic"}>
              Browse by Topic
            </Link>
          </li>
          <li>
            <Link href={USER_BASE_URL + "/exhibitions"}>
              Exhibitions
            </Link>
          </li>
          <li>
            <Link href={USER_BASE_URL + "/search"}>
              Search
            </Link>
          </li>
        </ul>
      </div>
      <div className={`${utils.colXs12} ${utils.colMd3}`}>
        <Button
          type="primary"
          size="large"
          className={css.donateButton}
          url="/donate"
        >
          Donate
        </Button>
      </div>
    </div>
  </div>;

export default FooterPro;
