import React from "react";
import Link from "next/link";

import { classNames, stylesheet } from "./Sidebar.css";
import { decodeHTMLEntities } from "utilFunctions";

const SidebarLink = ({ isCurrentLink, title, url }) => {
  const pathname = url.match(/\/\/[\w.]+(\/[-\w/]+)/)[1];
  const pathSegments = pathname.split("/").slice(1);
  const section = pathSegments[0];
  const subsection = pathSegments[1];
  return (
    <li
      className={`${classNames.link} ${isCurrentLink && classNames.selected}`}
    >
      <Link
        as={`/${section}/${subsection ? subsection : ""}`}
        href={`/?section=${section}${subsection
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
                  isCurrentLink={item.url.match(new RegExp(activeItemId + "$"))}
                />
                <ul>
                  {children.map(child =>
                    <SidebarLink
                      key={child.ID}
                      title={decodeHTMLEntities(child.title)}
                      url={child.url}
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
                url={item.url}
                isCurrentLink={item.url.match(new RegExp(activeItemId + "$"))}
              />;
        })}
      </ul>
    </div>
    <style dangerouslySetInnerHTML={{ __html: stylesheet }} />
  </div>;

export default Sidebar;
