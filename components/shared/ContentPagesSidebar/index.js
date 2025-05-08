import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";

import { GUIDES_PARENT_ID } from "constants/content-pages";
import {
  decodeHTMLEntities,
  getBreadcrumbs,
  getItemWithId,
  getItemWithName,
  endsWith,
} from "lib";

import css from "./Sidebar.module.scss";
import utils from "stylesheets/utils.module.scss";

function SidebarLink({ isCurrentLink, linkObject, title }) {
  return (
    <Link
      href={linkObject.href}
      className={`${css.link} ${isCurrentLink && css.selected}`}
    >
      {title}
    </Link>
  );
}

function NestedSidebarLinks({ item, items, activeItemId, breadcrumbs }) {
  const siteEnv = process.env.NEXT_PUBLIC_SITE_ENV;
  // recursive function
  const title = decodeHTMLEntities(item.title);
  const itemId = String(item.ID);
  const parentId = String(item.menu_item_parent);
  const guidesParent = String(GUIDES_PARENT_ID);
  const isGuide = parentId === guidesParent || itemId === guidesParent;

  const children = items.filter(
    (child) =>
      child.menu_item_parent === item.object_id ||
      endsWith(item.guid, "?p=" + child.menu_item_parent),
  );

  // get route to the top of this item
  const crumbs = getBreadcrumbs({
    items: items,
    leafId: item.object_id,
  });

  // get the item's top parent info
  const parent = getItemWithId({
    items: items,
    id: Object.keys(crumbs)[0],
  });

  // link treatment varies per template (eg: guides/news/pro/hubs...)
  let linkObject = { href: "/" };

  if (itemId === guidesParent) {
    linkObject = {
      href: "/guides",
    };
  } else if (isGuide) {
    linkObject = {
      href: "/guides/" + item.post_name,
    };
  } else if (item.post_name === "hubs") {
    linkObject = {
      href: "/hubs",
    };
  } else if (item.post_name === "ebooks") {
    linkObject = {
      href: "/ebooks",
    };
  } else if (siteEnv === "user") {
    linkObject = {
      href: "/about/" + item.post_name,
    };
  } else if (siteEnv === "pro") {
    let slug = "/";
    // if this is a child item the url is /:topsection/:thisitem
    if (item.menu_item_parent !== "0") {
      slug = slug + parent.post_name + "/";
    }

    linkObject = {
      href: slug + item.post_name,
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
      {children.length && isOpen ? (
        <ul>
          {children.map((child) => {
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
      ) : (
        <></>
      )}
    </div>
  );
}

function Sidebar({ className, activeItemId, items }) {
  const siteEnv = process.env.NEXT_PUBLIC_SITE_ENV;
  const router = useRouter();
  // figure out if the current branch is open
  // but since the WP _post_ id does not match the _menu_ id
  // we need to find that first
  const menuItem = items.filter(
    (item) =>
      item.url.toString().endsWith(activeItemId) ||
      Number(item.object_id) === activeItemId,
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
      breadcrumbs: breadcrumb,
    });
  }

  // about item
  const aboutItem = getItemWithName({
    items: items,
    name: siteEnv === "pro" ? "about-dpla-pro" : "about-us",
  });

  // events item
  let eventsId = null;
  let eventsItem = null;
  if (siteEnv === "pro") {
    eventsItem = getItemWithName({
      items: items,
      name: "events",
    });
    eventsId = eventsItem.url.substring(eventsItem.url.lastIndexOf("/"));
  }

  // exclude these items from main sidebar
  // because we're adding them manually to the bottom sidebar
  const excludeNames = [
    "about-dpla-pro",
    "about-us",
    "events",
    "news",
    "news-2",
  ];

  return (
    <div className={`${className} ${utils.colXs12} ${utils.colMd4}`}>
      <div className={css.sidebar}>
        <ul className={css.links}>
          {items
            .filter(
              (item) =>
                item.menu_item_parent === "0" &&
                excludeNames.indexOf(item.post_name) === -1,
            )
            .map((item) => {
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
          <li key={"about"}>
            <NestedSidebarLinks
              activeItemId={activeItemId}
              item={aboutItem}
              items={items}
              breadcrumbs={breadcrumbs}
            />
          </li>
          {eventsId && (
            <li key={"events"}>
              <NestedSidebarLinks
                activeItemId={activeItemId}
                item={eventsItem}
                items={items}
                breadcrumbs={breadcrumbs}
              />
            </li>
          )}
          {siteEnv === "user" && (
            <li key={"news"}>
              <SidebarLink
                title="News"
                section="news"
                isCurrentLink={router.pathname.indexOf("/news") === 0}
                linkObject={{ href: "/news" }}
              />
            </li>
          )}
          <li key={"contact-us"}>
            <SidebarLink
              title="Contact Us"
              section="contact-us"
              isCurrentLink={activeItemId === "contact-us"}
              linkObject={{ href: "/contact" }}
            />
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Sidebar;
