import React from "react";
import Link from "next/link";

import { CONTENT_PAGE_NAMES } from "constants/content-pages";
import { classNames, stylesheet } from "./Sidebar.css";

const SidebarLink = ({ isCurrentLink, title, url }) =>
  <li className={[classNames.link, isCurrentLink ? classNames.selected : ""].join(" ")}>
    <Link href={url}>
      <a>
        {title}
      </a>
    </Link>
  </li>;

const Sidebar = ({ page }) =>
  <div className={classNames.sidebar}>
    <ul className={classNames.links}>
      <SidebarLink
        isCurrentLink={page === CONTENT_PAGE_NAMES.ABOUT_US}
        title="About Us"
        url="/about-us"
      />
      <SidebarLink
        isCurrentLink={page === CONTENT_PAGE_NAMES.FAQ}
        title="FAQ"
        url="/faq"
      />
      <SidebarLink
        isCurrentLink={page === CONTENT_PAGE_NAMES.WHO_USES_DPLA}
        title="Who Uses DPLA?"
        url="/who-uses-dpla"
      />
      <SidebarLink
        isCurrentLink={page === CONTENT_PAGE_NAMES.TERMS_AND_CONDITIONS}
        title="Terms & Conditions"
        url="/terms-and-conditions"
      />
      <SidebarLink
        isCurrentLink={page === CONTENT_PAGE_NAMES.DONATE}
        title="Donate"
        url="/donate"
      />
      <div className={classNames.divider} />
      <SidebarLink
        isCurrentLink={page === CONTENT_PAGE_NAMES.CONTACT_US}
        title="Contact Us"
        url="/contact-us"
      />
    </ul>
    <style dangerouslySetInnerHTML={{ __html: stylesheet }} />
  </div>;

export default Sidebar;
