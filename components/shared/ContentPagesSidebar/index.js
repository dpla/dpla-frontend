import React from "react";
import Link from "next/link";

import { classNames, stylesheet } from "./Sidebar.css";
import { decodeHTMLEntities } from "utilFunctions";
import HeadingRule from "components/shared/HeadingRule";

const SidebarLink = ({
  isCurrentLink,
  linkObject,
  title,
  section,
  subsection
}) => {
  return (
    <Link
      as={
        linkObject && linkObject.as
          ? linkObject.as
          : `/${section}/${subsection ? subsection : ""}`
      }
      href={
        linkObject && linkObject.href
          ? linkObject.href
          : `/about?section=${section}${subsection
              ? `&subsection=${subsection}`
              : ""}`
      }
    >
      <a
        className={`${classNames.link} ${isCurrentLink && classNames.selected}`}
      >
        {title}
      </a>
    </Link>
  );
};

const NestedSidebarLinks = ({
  key,
  isCurrentLink,
  linkObject,
  title,
  section,
  subsection,
  activeItemId,
  children
}) => {
  return (
    <li>
      <SidebarLink
        linkObject={linkObject}
        title={title}
        section={section}
        subsection={subsection}
        isCurrentLink={isCurrentLink}
      />
      {children.length
        ? <ul>
            {children.map(child =>
              <li key={child.id}>
                <SidebarLink
                  title={decodeHTMLEntities(child.title)}
                  section={section}
                  subsection={child.post_name}
                  isCurrentLink={child.url.match(
                    new RegExp(activeItemId + "$")
                  )}
                />
              </li>
            )}
          </ul>
        : null}
    </li>
  );
};

const Sidebar = ({ activeItemId, items, route }) =>
  <div className="col-xs-12 col-md-4">
    <div className={classNames.sidebar}>
      <ul className={classNames.links}>
        {items.filter(item => item.menu_item_parent === "0").map(item => {
          const children = items.filter(
            child => child.menu_item_parent === item.object_id
          );
          return (
            <NestedSidebarLinks
              key={item.ID}
              title={decodeHTMLEntities(item.title)}
              url={item.url}
              section={item.post_name}
              isCurrentLink={item.url.match(new RegExp(activeItemId + "$"))}
              children={children}
              activeItemId={activeItemId}
            />
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
            as: "/contact-us",
            href: "/contact-us"
          }}
        />
      </ul>
    </div>
    <style dangerouslySetInnerHTML={{ __html: stylesheet }} />
  </div>;

export default Sidebar;
