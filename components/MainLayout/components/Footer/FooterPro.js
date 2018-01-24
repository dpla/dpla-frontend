import React from "react";
import Link from "next/link";

import Button from "components/shared/Button";

import { classNames, stylesheet } from "./Footer.css";

const FooterPro = () =>
  <div className={`${classNames.footer} site-max-width`}>
    <div className="row">
      <div className={`${classNames.linkGroup} col-xs-12 col-sm-6 col-md-3`}>
        <h2 className={classNames.linkHeader}>About Us</h2>
        <ul>
          <li>
            <Link as="/about" href="/pro/wp?section=about-dpla-pro">
              <a>About DPLA Pro</a>
            </Link>
          </li>
          <li>
            <Link href="/news">
              <a>News</a>
            </Link>
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
      <div className={`${classNames.linkGroup} col-xs-12 col-sm-6 col-md-3`}>
        <h2 className={classNames.linkHeader}>Communities</h2>
        <ul>
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
            <Link as="/ebooks" href="/pro/wp?section=ebooks">
              <a>Ebooks</a>
            </Link>
          </li>
          <li>
            <Link as="/education" href="/pro/wp?section=education">
              <a>Education</a>
            </Link>
          </li>
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
        </ul>
      </div>
      <div className={`${classNames.linkGroup} col-xs-6 col-sm-6 col-md-3`}>
        <h2 className={classNames.linkHeader}>DPLA</h2>
        <ul>
          <li>
            <Link href="//beta.dp.la">
              <a>DPLA Main Site</a>
            </Link>
          </li>
        </ul>
      </div>
      <div className="col-xs-12 col-md-3">
        <Button
          type="primary"
          size="large"
          className={classNames.donateButton}
          url="/donate"
        >
          Donate
        </Button>
      </div>
    </div>
  </div>;

export default FooterPro;
