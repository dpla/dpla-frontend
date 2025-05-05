import React from "react";
import Link from "next/link";

import ListImage from "shared/ListView/ListImage";

import { joinIfArray, removeQueryParams, truncateString } from "lib";

import { LOCALS } from "constants/local";

import css from "./AboutLocal.module.scss";
import utils from "stylesheets/utils.module.scss";
import { UNTITLED_TEXT } from "constants/site";

const dplaLink = (query) => {
  const localId = process.env.NEXT_PUBLIC_LOCAL_ID;
  const subject = query.subject
    ? [
        `${query.subject}`,
        `${decodeURIComponent(LOCALS[localId].subjectFacet)}`,
      ].join("|")
    : `${decodeURIComponent(LOCALS[localId].subjectFacet)}`;
  let newQuery = {
    q: query.q,
    subject,
  };
  newQuery = removeQueryParams(newQuery, ["page"]);
  return `https://dp.la/search?${Object.keys(newQuery)
    .map((key) => `${key}=${newQuery[key]}`)
    .join("&")}`;
};

function AboutLocal({ items, query }) {
  const itemChildren = items.map((item) => {
    item.linkHref = `https://dp.la/item/${item.id}`;
    const titleText = item.title
      ? truncateString(item.title, 150)
      : UNTITLED_TEXT;
    return (
      <li key={`ab_${item.id}`} className={css.item}>
        <ListImage
          className={css.itemImage}
          item={item}
          title={item.title}
          type={item.type}
          url={item.thumbnailUrl}
          useDefaultImage={item.useDefaultImage}
        />
        <div className={css.itemInfo}>
          <p className={`${utils.hoverUnderline} ${css.itemTitle}`}>
            <Link href={item.linkHref} className={"external"}>
              {titleText}
            </Link>
          </p>
          {(item.date || item.creator) && (
            <p className={css.itemAuthorAndDate}>
              {item.date && <span>{item.date.displayDate}</span>}
              {item.date && item.date.displayDate && item.creator && (
                <span> · </span>
              )}
              <span>{joinIfArray(item.creator, ", ")}</span>
            </p>
          )}
        </div>
      </li>
    );
  });

  return (
    <section className={`${css.wrapper}`}>
      <div className={utils.container}>
        <h1 className={css.header}>
          <a className="external" href={dplaLink(query)}>
            Explore related items in DPLA
          </a>{" "}
          including:
        </h1>
        <ul className={css.itemList}>{itemChildren}</ul>
      </div>
    </section>
  );
}

export default AboutLocal;
