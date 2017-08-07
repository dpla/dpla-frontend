import React from "react";
import Link from "next/link";

import { classNames, stylesheet } from "./Sets.css";
import { classNames as utilClassNames } from "css/utils.css";

const { module } = utilClassNames;

const Sets = ({ sets, route }) =>
  <div className={[module, classNames.setsWrapper].join(" ")}>
    <ul className={classNames.sets}>
      {sets.map(set =>
        <li className={classNames.set}>
          <Link
            href={{
              pathname: "/primary-source-sets/set",
              query: Object.assign({}, route.query, { set: set.slug })
            }}
            as={{
              pathname: `/primary-source-sets/${set.slug}`,
              query: route.query
            }}
          >
            <a>
              <img
                alt={set.title}
                src={set.image}
                className={classNames.image}
              />
            </a>
          </Link>
          <p className={classNames.itemCount}>65 Items</p>
          <Link
            href={`/primary-source-sets/set?set=${set.slug}`}
            as={`/primary-source-sets/${set.slug}`}
          >
            <a className={classNames.title}>
              {set.title}
            </a>
          </Link>
          <p className={classNames.subtitle}>
            {set.subtitle}
          </p>
          <ul className={classNames.tags}>
            {set.tags.map((tag, i) =>
              <li className={classNames.tag}>
                <Link href="">
                  {tag}
                </Link>
                {i < set.tags.length - 1 && <span>,&nbsp;</span>}
              </li>
            )}
          </ul>
        </li>
      )}
    </ul>
    <style dangerouslySetInnerHTML={{ __html: stylesheet }} />
  </div>;

export default Sets;
