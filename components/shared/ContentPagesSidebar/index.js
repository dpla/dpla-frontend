import React from "react";
import Link from "next/link";

import { GUIDES_PARENT_ID } from "constants/content-pages";
import { SITE_ENV } from "constants/env";
import { decodeHTMLEntities } from "utilFunctions";

import { classNames, stylesheet } from "./Sidebar.css";

const SidebarLink = ({
  isCurrentLink,
  isGuide,
  linkObject,
  title,
  rootPath
}) => {
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
  isOpen,
  isGuide,
  linkObject,
  title,
  section,
  subsection,
  activeItemId,
  children
}) => {
  return (
    <div>
      <SidebarLink
        linkObject={linkObject}
        title={title}
        section={section}
        subsection={subsection}
        isGuide={isGuide}
        isCurrentLink={item.url.match(new RegExp(activeItemId + "$"))}
      />
      {children.length && isOpen
        ? <ul>
            {children.map(child => {
              let childLinkObject = { as: linkObject.as, href: "/" };
              if (isGuide) {
                childLinkObject = {
                  as: "/guides",
                  href: "/about?section=" + child.post_name
                };
              } else if (SITE_ENV === "user") {
                childLinkObject = {
                  as: "/about/" + child.post_name,
                  href: "/about?section=" + child.post_name
                };
              } else if (SITE_ENV === "pro") {
                childLinkObject = {
                  as: linkObject.as + "/" + child.post_name,
                  href: "/pro/wp?section=" + child.post_name
                };
              }
              return (
                <li key={child.ID}>
                  <SidebarLink
                    title={decodeHTMLEntities(child.title)}
                    section={section}
                    subsection={child.post_name}
                    isGuide={isGuide}
                    linkObject={childLinkObject}
                    isCurrentLink={child.url.match(
                      new RegExp(activeItemId + "$")
                    )}
                  />
                </li>
              );
            })}
          </ul>
        : null}
    </div>
  );
};

const Sidebar = ({
  className,
  activeItemId,
  items,
  route,
  rootPath = "about"
}) =>
  <div className={`${className} col-xs-12 col-md-4`}>
    <div className={classNames.sidebar}>
      <ul className={classNames.links}>
        {items.filter(item => item.menu_item_parent === "0").map(item => {
          const isGuide =
            item.menu_item_parent === GUIDES_PARENT_ID ||
            item.ID === GUIDES_PARENT_ID;
          const isNews = item.post_name.indexOf("news") === 0;
          let linkObject = { as: "/", href: "/" };
          if (isGuide) {
            linkObject = {
              as: "/guides",
              href: "/about?section=" + item.post_name
            };
          } else if (isNews) {
            linkObject = {
              as: "/news",
              href: "/news"
            };
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
          let isOpen = false;
          if (item.url.match(new RegExp(activeItemId + "$"))) isOpen = true;
          const children = items.filter(child => {
            if (child.menu_item_parent === item.object_id) {
              if (child.url.match(new RegExp(activeItemId + "$"))) {
                isOpen = true;
              }
              return child;
            }
          });
          return (
            <li key={item.ID}>
              <NestedSidebarLinks
                title={decodeHTMLEntities(item.title)}
                section={item.post_name}
                isOpen={isOpen}
                isGuide={isGuide}
                linkObject={linkObject}
                children={children}
                activeItemId={activeItemId}
                item={item}
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
