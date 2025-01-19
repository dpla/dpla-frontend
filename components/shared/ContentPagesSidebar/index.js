import React from "react";
import Link from "next/link";
import { withRouter } from "next/router"

import { GUIDES_PARENT_ID } from "constants/content-pages";
import { SITE_ENV } from "constants/env";
import {
  decodeHTMLEntities,
  getBreadcrumbs,
  getItemWithId,
  getItemWithName,
  endsWith
} from "lib";

import css from "./Sidebar.module.scss";
import utils from "stylesheets/utils.module.scss"

const SidebarLink = ({ isCurrentLink, linkObject, title }) => {
  return (
    <Link as={linkObject.as} href={linkObject.href}
          className={`${css.link} ${isCurrentLink ? css.selected : ""}`}
    >
      {title}
    </Link>
  );
};

const NestedSidebarLinks = withRouter(({
  item,
  items,
  router,
  activeItemId,
  breadcrumbs
}) => {
  // recursive function
  const title = decodeHTMLEntities(item.title);
  const itemId = String(item.ID);
  const parentId = String(item.menu_item_parent);
  const guidesParent = String(GUIDES_PARENT_ID);
  const isGuide =
    parentId === guidesParent || itemId === guidesParent;

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

  if (itemId === guidesParent) {
    linkObject = {
      as: "/guides",
      href: "/guides"
    };

  } else if (isGuide) {
    linkObject = {
      as: "/guides/" + item.post_name,
      href: "/guides/guide?guide=" + item.post_name
    };

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
});

const Sidebar = ({ className, activeItemId, items, router }) => {
  // figure out if the current branch is open
  // but since the WP _post_ id does not match the _menu_ id
  // we need to find that first
  const menuItem = items.filter(
    item =>
      item.url.match(new RegExp(activeItemId + "$")) !== null ||
      Number(item.object_id) === activeItemId
  )[0];

  let breadcrumbs = {};

  // if not a news item (those don't show up in sidebar)
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
    <div className={`${className} ${utils.colXs12} ${utils.colMd4}`}>
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
              activeItemId={activeItemId}
              item={aboutItem}
              items={items}
              breadcrumbs={breadcrumbs}
            />
          </li>
          {eventsId &&
            <li>
              <NestedSidebarLinks
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
                isCurrentLink={router.pathname.indexOf("/news") === 0}
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

export default withRouter(Sidebar);
