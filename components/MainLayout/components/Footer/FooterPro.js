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
              <a>About DPLA Pro</a>
            </Link>
          </li>
          <li>
            <Link href="/contact-us" as="/contact">
              <a>Contact Us</a>
            </Link>
          </li>
          <li>
            <FeedbackForm/>
          </li>
          <li>
            <Link as="/projects" href="/pro/wp?section=projects">
              <a>Projects</a>
            </Link>
          </li>
          <li>
            <Link as="/events" href="/pro/wp?section=events">
              <a>Events</a>
            </Link>
          </li>
        </ul>
      </div>
      <div className={`${css.linkGroup} ${utils.colXs12} ${utils.colSm} ${utils.colMd3}`}>
        <h2 className={css.linkHeader}>Communities</h2>
        <ul>
          <li>
            <Link as="/hubs" href="/pro/wp/hubs?section=hubs">
              <a>Hub Network</a>
            </Link>
          </li>
          <li>
            <Link
              as="/prospective-hubs"
              href="/pro/wp?section=prospective-hubs"
            >
              <a>Prospective Hubs</a>
            </Link>
          </li>
          <li>
            <Link as="/community-reps" href="/pro/wp?section=community-reps">
              <a>Community Reps</a>
            </Link>
          </li>
          <li>
            <Link as="/developers" href="/pro/wp?section=developers">
              <a>Developers</a>
            </Link>
          </li>
          <li>
            <Link as="/education" href="/pro/wp?section=education">
              <a>Education</a>
            </Link>
          </li>
          <li>
            <Link as="/ebooks" href="/pro/wp/ebooks?section=ebooks">
              <a>Ebooks</a>
            </Link>
          </li>
        </ul>
      </div>
      <div className={`${css.linkGroup} ${utils.colXs6} ${utils.colSm6} ${utils.colMd3}`}>
        <h2 className={css.linkHeader}>DPLA</h2>
        <ul>
          <li>
            <Link href={USER_BASE_URL}>
              <a>DPLA Home</a>
            </Link>
          </li>
          <li>
            <Link href={USER_BASE_URL + "/primary-source-sets"}>
              <a>Primary Source Sets</a>
            </Link>
          </li>
          <li>
            <Link href={USER_BASE_URL + "/browse-by-partner"}>
              <a>Browse by Partner</a>
            </Link>
          </li>
          <li>
            <Link href={USER_BASE_URL + "/browse-by-topic"}>
              <a>Browse by Topic</a>
            </Link>
          </li>
          <li>
            <Link href={USER_BASE_URL + "/exhibitions"}>
              <a>Exhibitions</a>
            </Link>
          </li>
          <li>
            <Link href={USER_BASE_URL + "/search"}>
              <a>Search</a>
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
