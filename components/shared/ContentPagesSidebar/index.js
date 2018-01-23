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
  const isOpen = breadcrumbs.indexOf(item.object_id) !== -1;
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
                  {/* <SidebarLink title={decodeHTMLEntities(child.title)} isGuide={isGuide} linkObject={childLinkObject} isCurrentLink={child.url.match(new RegExp(activeItemId + "$"))} /> */}
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

const getBreadCrumbs = ({ items, leafId, breadcrumbs }) => {
  breadcrumbs = breadcrumbs ? breadcrumbs : [];
  // go upwards from the activeItemId
  items.forEach(element => {
    if (element.object_id === leafId) {
      if (element.menu_item_parent !== "0") {
        breadcrumbs.push(element.menu_item_parent);
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
          const breadcrumbs = getBreadCrumbs({
            items: items,
            leafId: menuItemId,
            breadcrumbs: [menuItemId]
          });
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
