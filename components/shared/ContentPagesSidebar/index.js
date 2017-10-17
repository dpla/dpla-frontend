import React from "react";
import Link from "next/link";

import { classNames, stylesheet } from "./Sidebar.css";
import { decodeHTMLEntities } from "utilFunctions";

const SidebarLink = ({ isCurrentLink, title, url, urlBase }) => {
  const pathname = url.match(/\/\/[\w.]+(\/[-\w/]+)/)[1];
  const pathSegments = pathname.split("/").slice(1);
  const section = pathSegments[0];
  const subsection = pathSegments[1];
  return (
    <li
      className={`${classNames.link} ${isCurrentLink && classNames.selected}`}
    >
      <Link
        as={`/${urlBase}/${section}/${subsection ? subsection : ""}`}
        href={`/${urlBase}?section=${section}${subsection
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

const Sidebar = ({ activeItemId, items, route, urlBase }) =>
  <div className="col-xs-12 col-md-4">
    <div className={classNames.sidebar}>
      <ul className={classNames.links}>
        {items.filter(item => !item.post_parent).map(item => {
          const children = items.filter(
            child => child.post_parent === Number(item.object_id)
          );
          return children.length
            ? <div key={item.ID}>
                <SidebarLink
                  key={item.ID}
                  urlBase={urlBase}
                  title={decodeHTMLEntities(item.title)}
                  url={item.url}
                  isCurrentLink={activeItemId === item.object_id}
                />
                <ul>
                  {children.map(child =>
                    <SidebarLink
                      key={child.ID}
                      urlBase={urlBase}
                      title={decodeHTMLEntities(child.title)}
                      url={child.url}
                      isCurrentLink={activeItemId === Number(child.object_id)}
                    />
                  )}
                </ul>
              </div>
            : <SidebarLink
                key={item.ID}
                urlBase={urlBase}
                title={decodeHTMLEntities(item.title)}
                url={item.url}
                isCurrentLink={activeItemId === item.object_id}
              />;
        })}
      </ul>
    </div>
    <style dangerouslySetInnerHTML={{ __html: stylesheet }} />
  </div>;

export default Sidebar;
