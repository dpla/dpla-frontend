import React from "react";
import Link from "next/link";

import ListImage from "shared/ListView/ListImage";

import {
  addCommasToNumber,
  joinIfArray,
  truncateString,
  removeQueryParams
} from "lib";

import { LOCALS } from "constants/local";
import { localFacets, mapFacetsToURLPrettified } from "constants/search";
import { SITE_ENV, LOCAL_ID } from "constants/env";

import utils from "stylesheets/utils.scss";
import css from "./AboutLocal.scss";

const dplaLink = query => {
  const newQuery = Object.assign(
    {},
    {
      subject: LOCALS[LOCAL_ID].subjectFacet,
      location: LOCALS[LOCAL_ID].locationFacet
    },
    removeQueryParams(query, ["page"])
  );
  const url = `//dp.la/search?${Object.keys(newQuery)
    .map(key => `${key}=${newQuery[key]}`)
    .join("&")}`;
  return url;
};

const AboutLocal = ({ items, count, query }) =>
  <section className={`${css.wrapper}`}>
    <div className={`${utils.container}`}>
      <h1 className={css.header}>
        <Link href={dplaLink(query)}>
          <a>Explore {addCommasToNumber(count)} related items in DPLA</a>
        </Link>{" "}
        including:
      </h1>
      <ul className={css.itemList}>
        {items.map((item, index) => {
          item.linkHref = `//dp.la/item/${item.id}`;
          return (
            <li key={`ab_${index}`} className={css.item}>
              <ListImage
                className={css.itemImage}
                item={item}
                title={item.title}
                type={item.type}
                url={item.thumbnailUrl}
                useDefaultImage={item.useDefaultImage}
              />
              <div className={css.itemInfo}>
                <p className={`hover-underline ${css.itemTitle}`}>
                  <Link href={item.linkHref}>
                    <a className={`external`}>
                      {item.title
                        ? truncateString(item.title, 150)
                        : item.title ? item.title : UNTITLED_TEXT}
                    </a>
                  </Link>
                </p>
                {(item.date || item.creator) &&
                  <p className={css.itemAuthorAndDate}>
                    {item.date && <span>{item.date.displayDate}</span>}
                    {item.date &&
                      item.date.displayDate &&
                      item.creator &&
                      <span> · </span>}
                    <span>{joinIfArray(item.creator, ", ")}</span>
                  </p>}
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  </section>;

export default AboutLocal;
