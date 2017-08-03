import React from "react";
import Link from "next/link";

import { classNames, stylesheet } from "./Sets.css";
import { classNames as utilClassNames } from "css/utils.css";

const { module } = utilClassNames;

const Sets = ({ sets }) =>
  <div className={[module, classNames.setsWrapper].join(" ")}>
    <ul className={classNames.sets}>
      {sets.map(set =>
        <li className={classNames.set}>
          <Link to={`primary-source-sets/${set.slug}`}>
            <a>
              <img
                alt={set.title}
                src={set.image}
                className={classNames.image}
              />
            </a>
          </Link>
          <p className={classNames.itemCount}>65 Items</p>
          <Link to={`primary-source-sets/${set.slug}`}>
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
                <Link to="">
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
