import React from "react";
import Link from "next/link";

import { CONTENT_PAGE_NAMES } from "constants/content-pages";
import { classNames, stylesheet } from "./Sidebar.css";

const SidebarLink = ({ isCurrentLink, title, href, as }) =>
  <li
    className={[classNames.link, isCurrentLink ? classNames.selected : ""].join(
      " "
    )}
  >
    <Link href={href} as={as}>
      <a>
        {title}
      </a>
    </Link>
  </li>;

const Sidebar = ({ page, guides, route }) =>
  <div className={classNames.sidebar}>
    <ul className={classNames.links}>
      <SidebarLink
        isCurrentLink={page === CONTENT_PAGE_NAMES.ABOUT_US}
        title="About Us"
        href="/about-us"
      />
      <SidebarLink
        isCurrentLink={page === CONTENT_PAGE_NAMES.FAQ}
        title="FAQ"
        href="/faq"
      />
      <ul>
        <SidebarLink
          isCurrentLink={page === CONTENT_PAGE_NAMES.SEARCH_TIPS}
          title="Search Tips"
          href="/faq/search-tips"
        />
        <SidebarLink
          isCurrentLink={page === CONTENT_PAGE_NAMES.GLOSSARY}
          title="Glossary"
          href="/faq/glossary"
        />
      </ul>
      <SidebarLink
        isCurrentLink={page === CONTENT_PAGE_NAMES.GUIDES}
        title="How can I use DPLA?"
        href="/guides"
      />
      {guides &&
        <ul>
          {guides.map(guide =>
            <SidebarLink
              key={guide.slug}
              title={guide.displayTitle}
              as={`/guides/${guide.slug}`}
              href={`/guides/guide?guide=${guide.slug}`}
              isCurrentLink={route.query.guide === guide.slug}
            />
          )}
        </ul>}
      <SidebarLink
        isCurrentLink={page === CONTENT_PAGE_NAMES.TERMS_AND_CONDITIONS}
        title="Terms & Conditions"
        href="/terms-and-conditions"
      />
      <SidebarLink
        isCurrentLink={page === CONTENT_PAGE_NAMES.DONATE}
        title="Donate"
        href="/donate"
      />
      <div className={classNames.divider} />
      <SidebarLink
        isCurrentLink={page === CONTENT_PAGE_NAMES.CONTACT}
        title="Contact Us"
        href="/contact-us"
      />
    </ul>
    <style dangerouslySetInnerHTML={{ __html: stylesheet }} />
  </div>;

export default Sidebar;
