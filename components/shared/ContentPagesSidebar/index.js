import React from "react";
import Link from "next/link";

import { GUIDES_PARENT_ID } from "constants/content-pages";
import { SITE_ENV } from "constants/env";
import { decodeHTMLEntities } from "utilFunctions";

import { classNames, stylesheet } from "./Sidebar.css";

const getItemWithId = ({ items, id }) =>
  items.filter(item => item.object_id === id)[0];

const getBreadCrumbs = ({ items, leafId, breadcrumbs }) => {
  breadcrumbs = breadcrumbs ? breadcrumbs : {};
  // go upwards from the activeItemId
  items.forEach(element => {
    if (element.object_id === leafId) {
      if (element.menu_item_parent !== "0") {
        const post_name = getItemWithId({
          items: items,
          id: element.menu_item_parent
        }).post_name;
        breadcrumbs[element.menu_item_parent] = post_name;
        getBreadCrumbs({
          items: items,
          leafId: element.menu_item_parent,
          breadcrumbs: breadcrumbs
        });
      }
    }
  });
  return breadcrumbs;
};

const SidebarLink = ({ isCurrentLink, isGuide, linkObject, title }) => {
  return (
    <Link as={linkObject.as} href={linkObject.href}>
      <a
        className={`${classNames.link} ${isCurrentLink && classNames.selected}`}
      >
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
  const isNews = route.pathname.indexOf("/news") === 0;
  const children = items.filter(
    child => child.menu_item_parent === item.object_id
  );
  // link treatment varies per template (eg: guides/news/pro/hubs...)
  let linkObject = { as: "/", href: "/" };
  if (isGuide) {
    linkObject = { as: "/guides", href: "/about?section=" + item.post_name };
  } else if (SITE_ENV === "user") {
    linkObject = {
      as: "/about/" + item.post_name,
      href: "/about?section=" + item.post_name
    };
  } else if (SITE_ENV === "pro") {
    let slug = "/";
    // if this is a child item the url is /:topsection/:thisitem
    if (item.menu_item_parent !== "0") {
      // get route to the top of this item
      const crumbs = getBreadCrumbs({
        items: items,
        leafId: item.object_id
      });
      // get the item's top parent info
      const parent = getItemWithId({
        items: items,
        id: Object.keys(crumbs)[0]
      });
      slug = slug + parent.post_name + "/";
    }
    linkObject = {
      as: slug + item.post_name,
      href: "/pro/wp?section=" + item.post_name
    };
  }
  const isCurrentLink = item.url.match(new RegExp(activeItemId + "$"));
  const isOpen = Object.keys(breadcrumbs).indexOf(item.object_id) !== -1;
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
    item => item.url.match(new RegExp(activeItemId + "$")) !== null
  )[0];
  // _now_ we can find it in the menu tree
  let breadcrumb = {};
  breadcrumb[menuItem.object_id] = menuItem.post_name;
  const breadcrumbs = getBreadCrumbs({
    items: items,
    leafId: menuItem.object_id,
    breadcrumbs: breadcrumb
  });

  return (
    <div className={`${className} col-xs-12 col-md-4`}>
      <div className={classNames.sidebar}>
        <ul className={classNames.links}>
          {items.filter(item => item.menu_item_parent === "0").map(item => {
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
        <div className={classNames.divider} />
        <ul>
          <SidebarLink
            title="Contact Us"
            section="contact-us"
            isCurrentLink={activeItemId === "contact-us"}
            linkObject={{ as: "/contact", href: "/contact-us" }}
          />
        </ul>
      </div>
      <style dangerouslySetInnerHTML={{ __html: stylesheet }} />
    </div>
  );
};

export default Sidebar;
