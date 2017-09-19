import React from "react";
import Link from "next/link";

import { CONTENT_PAGE_NAMES } from "constants/content-pages";
import { classNames, stylesheet } from "./Sidebar.css";

const SidebarLink = ({ isCurrentLink, title, url }) =>
  <li
    className={[classNames.link, isCurrentLink ? classNames.selected : ""].join(
      " "
    )}
  >
    <Link href={url}>
      <a>
        {title}
      </a>
    </Link>
  </li>;

const Sidebar = ({ page, guides, route }) =>
  <div className={classNames.sidebar}>
    <ul className={classNames.links}>
      <SidebarLink
        isCurrentLink={page === CONTENT_PAGE_NAMES.ABOUT}
        title="About Us"
        url="/about"
      />
      <SidebarLink
        isCurrentLink={page === CONTENT_PAGE_NAMES.FAQ}
        title="FAQ"
        url="/faq"
      />
      <ul>
        <SidebarLink
          isCurrentLink={page === CONTENT_PAGE_NAMES.GLOSSARY}
          title="Glossary"
          url="/faq/glossary"
        />
        <SidebarLink
          isCurrentLink={page === CONTENT_PAGE_NAMES.SEARCH_TIPS}
          title="Search Tips"
          url="/faq/search-tips"
        />
      </ul>
      <SidebarLink
        isCurrentLink={page === CONTENT_PAGE_NAMES.GUIDES}
        title="How can I use DPLA?"
        url="/guides"
      />
      {guides &&
        <ul>
          {guides.map(guide =>
            <SidebarLink
              key={guide.title}
              title={guide.title}
              url={`/guides/${guide.slug}`}
              isCurrentLink={route.query.guide === guide.slug}
            />
          )}
        </ul>}
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
        isCurrentLink={page === CONTENT_PAGE_NAMES.CONTACT}
        title="Contact Us"
        url="/contact"
      />
    </ul>
    <style dangerouslySetInnerHTML={{ __html: stylesheet }} />
  </div>;

export default Sidebar;
