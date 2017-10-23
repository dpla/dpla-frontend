import React from "react";
import Link from "next/link";

import { classNames, stylesheet } from "./Sidebar.css";
import { decodeHTMLEntities } from "utilFunctions";
import HeadingRule from "components/shared/HeadingRule";

const SidebarLink = ({ isCurrentLink, title, section, subsection }) => {
  return (
    <li
      className={`${classNames.link} ${isCurrentLink && classNames.selected}`}
    >
      <Link
        as={`/${section}/${subsection ? subsection : ""}`}
        href={`/about?section=${section}${subsection
          ? `&subsection=${subsection}`
          : ""}`}
      >
        <a>
          {title}
        </a>
      </Link>
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
          return children.length
            ? <div key={item.ID}>
                <SidebarLink
                  key={item.ID}
                  title={decodeHTMLEntities(item.title)}
                  url={item.url}
                  section={item.post_name}
                  isCurrentLink={item.url.match(new RegExp(activeItemId + "$"))}
                />
                <ul>
                  {children.map(child =>
                    <SidebarLink
                      key={child.ID}
                      title={decodeHTMLEntities(child.title)}
                      section={item.post_name}
                      subsection={child.post_name}
                      isCurrentLink={child.url.match(
                        new RegExp(activeItemId + "$")
                      )}
                    />
                  )}
                </ul>
              </div>
            : <SidebarLink
                key={item.ID}
                title={decodeHTMLEntities(item.title)}
                section={item.post_name}
                isCurrentLink={item.url.match(new RegExp(activeItemId + "$"))}
              />;
        })}
        <div className={classNames.divider} />
        <SidebarLink
          title="Contact Us"
          section="contact-us"
          isCurrentLink={activeItemId === "contact-us"}
        />
      </ul>
    </div>
    <style dangerouslySetInnerHTML={{ __html: stylesheet }} />
  </div>;

export default Sidebar;
