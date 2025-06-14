import React from "react";
import Link from "next/link";

import css from "shared/ContentPagesSidebar/Sidebar.module.scss";
import utils from "stylesheets/utils.module.scss";

function SidebarLink({ route, isActive, title }) {
  return (
    <Link
      href={route}
      className={`${css.link} ${isActive ? css.selected : ""}`}
    >
      {title}
    </Link>
  );
}

// Helps render a parent sidebar link along with a list of child links
function NestedSidebarLinks({ topLevelItem, items }) {
  return (
    <div>
      {topLevelItem !== undefined && (
        <SidebarLink
          route={topLevelItem.route}
          isActive={topLevelItem.isActive}
          title={topLevelItem.title}
        />
      )}
      <ul>
        {items.map((item) => {
          return (
            <li key={item.route}>
              <SidebarLink
                route={item.route}
                isActive={item.isActive}
                title={item.title}
              />
            </li>
          );
        })}
      </ul>
    </div>
  );
}

/*
  component for the sidebar which also instantiates the NestedSidebarLinks class
  for building lists of links
*/
function Sidebar({ className, items, activePage, render }) {
  /*
    adds in an object for the About page. Needed because 'About' is
    not rendered with data from the routes object in Locals.js, which is where
    all the other pages' data ultimately comes from
  */
  if (items[0].category === "About") {
    items.unshift({
      route: "/about",
      title: "About",
      category: "About",
      isTopLevel: true,
      isActive: false,
    });
  }

  if (items.length > 1) {
    // determine which page is active and flag them via the isActive key
    items[
      items
        .map((item) => {
          return item.route;
        })
        .indexOf(`${activePage}`)
    ].isActive = true;

    /*
      identify top level page so that its link can be
      rendered a bit differently. Also, remove it from the items object
      so that the link does not get rendered twice
    */
    const topLevelPage = items.filter((item) => item.isTopLevel)[0];
    items = items.filter((item) => !item.isTopLevel);

    return (
      <div className={`${className} ${utils.colXs12} ${utils.colMd4}`}>
        <div className={css.sidebar}>
          {render && (
            <ul className={css.links}>
              <li>
                <NestedSidebarLinks
                  activePage={activePage}
                  topLevelItem={topLevelPage}
                  items={items}
                />
              </li>
            </ul>
          )}
        </div>
      </div>
    );
  } else return <div className={`${utils.colXs12} ${utils.colMd4}`} />;
}

export default Sidebar;
