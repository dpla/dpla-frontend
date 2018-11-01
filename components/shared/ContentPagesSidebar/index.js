import React from "react";
import Link from "next/link";

import { GUIDES_PARENT_ID } from "constants/content-pages";
import { SITE_ENV } from "constants/env";
import {
  decodeHTMLEntities,
  getBreadcrumbs,
  getItemWithId,
  getItemWithName,
  endsWith
} from "lib";

import css from "./Sidebar.scss";

const SidebarLink = ({ isCurrentLink, isGuide, linkObject, title }) => {
  return (
    <Link as={linkObject.as} href={linkObject.href}>
      <a className={`${css.link} ${isCurrentLink ? css.selected : ""}`}>
        {title}
      </a>
    </Link>
  );
};

const NestedSidebarLinks = ({
  item,
  items,
  route,
  activeItemId,
  breadcrumbs
}) => {
  // recursive function
  const title = decodeHTMLEntities(item.title);
  const isGuide =
    item.menu_item_parent === GUIDES_PARENT_ID || item.ID === GUIDES_PARENT_ID;
  const children = items.filter(
    child =>
      child.menu_item_parent === item.object_id ||
      endsWith(item.guid, "?p=" + child.menu_item_parent)
  );
  // get route to the top of this item
  const crumbs = getBreadcrumbs({
    items: items,
    leafId: item.object_id
  });
  // get the item's top parent info
  const parent = getItemWithId({
    items: items,
    id: Object.keys(crumbs)[0]
  });
  // link treatment varies per template (eg: guides/news/pro/hubs...)
  let linkObject = { as: "/", href: "/" };
  if (isGuide) {
    linkObject = { as: "/guides", href: "/about?section=" + item.post_name };
  } else if (item.post_name === "hubs") {
    linkObject = {
      as: "/hubs",
      href: "/pro/wp/hubs?section=" + item.post_name
    };
  } else if (item.post_name === "ebooks") {
    linkObject = {
      as: "/ebooks",
      href: "/pro/wp/ebooks?section=" + item.post_name
    };
  } else if (SITE_ENV === "user") {
    linkObject = {
      as: "/about/" + item.post_name,
      href: "/about?section=" + item.post_name
    };
  } else if (SITE_ENV === "pro") {
    let slug = "/";
    // if this is a child item the url is /:topsection/:thisitem
    if (item.menu_item_parent !== "0") {
      slug = slug + parent.post_name + "/";
    }
    linkObject = {
      as: slug + item.post_name,
      href: "/pro/wp?section=" + item.post_name
    };
  }
  const isCurrentLink =
    item.url.match(new RegExp(activeItemId + "$")) ||
    Number(item.object_id) === activeItemId ||
    endsWith(item.guid, "?p=" + activeItemId);
  const isOpen =
    Object.keys(breadcrumbs).indexOf(item.object_id) !== -1 ||
    Object.keys(breadcrumbs).indexOf(item.guid.split("?p=")[1]) !== -1;
  return (
    <div>
      <SidebarLink
        linkObject={linkObject}
        title={title}
        isGuide={isGuide}
        isCurrentLink={isCurrentLink}
      />
      {children.length && isOpen
        ? <ul>
            {children.map(child => {
              return (
                <li key={child.ID}>
                  <NestedSidebarLinks
                    route={route}
                    activeItemId={activeItemId}
                    item={child}
                    breadcrumbs={breadcrumbs}
                    items={items}
                  />
                </li>
              );
            })}
          </ul>
        : null}
    </div>
  );
};

const Sidebar = ({ className, activeItemId, items, route }) => {
  // figure out if the current branch is open
  // but since the WP _post_ id does not match the _menu_ id
  // we need to find that first
  const menuItem = items.filter(
    item =>
      item.url.match(new RegExp(activeItemId + "$")) !== null ||
      Number(item.object_id) === activeItemId
  )[0];

  let breadcrumbs = {};

  // if not a news item (those dont show up in sidebar)
  if (menuItem) {
    // find the menu tree
    let breadcrumb = {};
    breadcrumb[menuItem.object_id] = menuItem.post_name;
    breadcrumbs = getBreadcrumbs({
      items: items,
      leafId: menuItem.object_id,
      breadcrumbs: breadcrumb
    });
  }

  // about item
  const aboutItem = getItemWithName({
    items: items,
    name: SITE_ENV === "pro" ? "about-dpla-pro" : "about-us"
  });
  const aboutId = aboutItem.url.substr(aboutItem.url.lastIndexOf("/"));

  // events item
  let eventsId = null;
  let eventsItem = null;
  if (SITE_ENV === "pro") {
    eventsItem = getItemWithName({
      items: items,
      name: "events"
    });
    eventsId = eventsItem.url.substr(eventsItem.url.lastIndexOf("/"));
  }

  // exclude these items from main sidebar
  // because we're adding them manually to the bottom sidebar
  const excludeNames = [
    "about-dpla-pro",
    "about-us",
    "events",
    "news",
    "news-2"
  ];

  return (
    <div className={`${className} col-xs-12 col-md-4`}>
      <div className={css.sidebar}>
        <ul className={css.links}>
          {items
            .filter(
              item =>
                item.menu_item_parent === "0" &&
                excludeNames.indexOf(item.post_name) === -1
            )
            .map(item => {
              return (
                <li key={item.ID}>
                  <NestedSidebarLinks
                    route={route}
                    activeItemId={activeItemId}
                    item={item}
                    items={items}
                    breadcrumbs={breadcrumbs}
                  />
                </li>
              );
            })}
        </ul>
        <div className={css.divider} />
        <ul>
          <li>
            <NestedSidebarLinks
              route={route}
              activeItemId={activeItemId}
              item={aboutItem}
              items={items}
              breadcrumbs={breadcrumbs}
            />
          </li>
          {eventsId &&
            <li>
              <NestedSidebarLinks
                route={route}
                activeItemId={activeItemId}
                item={eventsItem}
                items={items}
                breadcrumbs={breadcrumbs}
              />
            </li>}
          {SITE_ENV === "user" &&
            <li>
              <SidebarLink
                title="News"
                section="news"
                isCurrentLink={route.pathname.indexOf("/news") === 0}
                linkObject={{ as: "/news", href: "/news" }}
              />
            </li>}
          <li>
            <SidebarLink
              title="Contact Us"
              section="contact-us"
              isCurrentLink={activeItemId === "contact-us"}
              linkObject={{ as: "/contact", href: "/contact-us" }}
            />
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
