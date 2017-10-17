import React from "react";
import Link from "next/link";

import { CONTENT_PAGE_NAMES } from "constants/content-pages";
import { classNames, stylesheet } from "./Sidebar.css";
import { decodeHTMLEntities } from "utilFunctions";

const SidebarLink = ({ isCurrentLink, title, href, as }) =>
  <li className={`${classNames.link} ${isCurrentLink && classNames.selected}`}>
    <Link href={href} as={as}>
      <a>
        {title}
      </a>
    </Link>
  </li>;

const Sidebar = ({ activeItemId, items, route }) =>
  <div className="col-xs-12 col-md-4">
    <div className={classNames.sidebar}>
      <ul className={classNames.links}>
        {items.filter(item => !item.post_parent).map(item => {
          const children = items.filter(
            child => child.post_parent === Number(item.object_id)
          );
          return children.length
            ? <div>
                <SidebarLink
                  key={item.ID}
                  title={decodeHTMLEntities(item.title)}
                  as={`/guides/`}
                  href={`/guides/guide`}
                  isCurrentLink={activeItemId === item.object_id}
                />
                <ul>
                  {children.map(child =>
                    <SidebarLink
                      key={child.ID}
                      title={decodeHTMLEntities(child.title)}
                      as={`/guides/`}
                      href={`/guides/guide`}
                      isCurrentLink={activeItemId === Number(child.object_id)}
                    />
                  )}
                </ul>
              </div>
            : <SidebarLink
                key={item.ID}
                title={decodeHTMLEntities(item.title)}
                as={`/guides/`}
                href={`/guides/guide`}
                isCurrentLink={activeItemId === item.object_id}
              />;
        })}
      </ul>
    </div>
    <style dangerouslySetInnerHTML={{ __html: stylesheet }} />
  </div>;

export default Sidebar;
