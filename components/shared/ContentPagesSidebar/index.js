import React from "react";
import Link from "next/link";

import { GUIDES_PARENT_ID } from "constants/content-pages";
import { SITE_ENV } from "constants/env";
import { decodeHTMLEntities } from "utilFunctions";

import { classNames, stylesheet } from "./Sidebar.css";

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

const NestedSidebarLinks = ({ item, items, route, activeItemId, isOpen }) => {
  // recursive function
  const title = decodeHTMLEntities(item.title);
  const isGuide =
    item.menu_item_parent === GUIDES_PARENT_ID || item.ID === GUIDES_PARENT_ID;
  const isNews = route.pathname.indexOf("/news") === 0;
  // link treatment varies per template (eg: guides/news/pro/hubs...)
  let linkObject = { as: "/", href: "/" };
  if (isGuide) {
    linkObject = { as: "/guides", href: "/about?section=" + item.post_name };
  } else if (isNews) {
    linkObject = { as: "/news", href: "/news" };
  } else if (SITE_ENV === "user") {
    linkObject = {
      as: "/about/" + item.post_name,
      href: "/about?section=" + item.post_name
    };
  } else if (SITE_ENV === "pro") {
    linkObject = {
      as: "/" + item.post_name,
      href: "/pro/wp?section=" + item.post_name
    };
  }
  const isCurrentLink =
    item.url.match(new RegExp(activeItemId + "$")) ||
    (isNews && item.post_name === "news");
  const children = items.filter(
    child => child.menu_item_parent === item.object_id
  );
  return (
    <div>
      <SidebarLink
        linkObject={linkObject}
        title={title}
        isGuide={isGuide}
        isCurrentLink={isCurrentLink}
      />
      {JSON.stringify(children.length)}
      {JSON.stringify(isOpen)}
      {children.length && isOpen
        ? <ul>
            {children.map(child => {
              return (
                <li key={child.ID}>
                  {/* <SidebarLink title={decodeHTMLEntities(child.title)} isGuide={isGuide} linkObject={childLinkObject} isCurrentLink={child.url.match(new RegExp(activeItemId + "$"))} /> */}
                  <NestedSidebarLinks
                    route={route}
                    activeItemId={activeItemId}
                    item={child}
                    isOpen={isOpen}
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

const findTopParent = ({ items, leafId }) => {
  let topId = "";
  // go upwards from the activeItemId
  items.forEach(element => {
    if (element.object_id === leafId) {
      if (element.menu_item_parent !== "0") {
        topId = findTopParent({
          items: items,
          leafId: element.menu_item_parent
        });
      } else {
        topId = element.object_id;
      }
    }
  });
  return topId;
};

const Sidebar = ({ className, activeItemId, items, route }) =>
  <div className={`${className} col-xs-12 col-md-4`}>
    <div className={classNames.sidebar}>
      <ul className={classNames.links}>
        {items.filter(item => item.menu_item_parent === "0").map(item => {
          // figure out if the current branch is open
          // but since the WP _post_ id does not match the _menu_ id
          // we need to find that first
          const menuItemId = items.filter(
            i => i.url.match(new RegExp(activeItemId + "$")) !== null
          )[0].object_id;
          // _now_ we can find it in the menu tree
          const topParentId = findTopParent({
            items: items,
            leafId: menuItemId
          });
          let isOpen = topParentId === item.object_id;
          return (
            <li key={item.ID}>
              [{JSON.stringify(topParentId)},{JSON.stringify(menuItemId)}]
              <NestedSidebarLinks
                route={route}
                activeItemId={activeItemId}
                item={item}
                items={items}
                isOpen={isOpen}
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
          linkObject={{
            as: "/contact",
            href: "/contact-us"
          }}
        />
      </ul>
    </div>
    <style dangerouslySetInnerHTML={{ __html: stylesheet }} />
  </div>;

export default Sidebar;
