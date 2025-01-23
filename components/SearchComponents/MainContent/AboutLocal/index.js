import React from "react";
import Link from "next/link";

import ListImage from "shared/ListView/ListImage";

import {joinIfArray, removeQueryParams, truncateString} from "lib";

import {LOCALS} from "constants/local";
import {LOCAL_ID} from "constants/env";

import css from "./AboutLocal.module.scss";
import utils from "stylesheets/utils.module.scss"
import {UNTITLED_TEXT} from "constants/site";

const dplaLink = query => {
    let newQuery = Object.assign(
        {},
        {
            q: query.q,
            subject: query.subject
                ? [
                    `${query.subject}`,
                    `${decodeURIComponent(LOCALS[LOCAL_ID].subjectFacet)}`
                ].join("|")
                : `${decodeURIComponent(LOCALS[LOCAL_ID].subjectFacet)}` //,
        }
    );
    newQuery = removeQueryParams(newQuery, ["page"]);
    return `https://dp.la/search?${Object.keys(newQuery)
        .map(key => `${key}=${newQuery[key]}`)
        .join("&")}`;
};

const AboutLocal = ({items, query}) =>
    <section className={`${css.wrapper}`}>
        <div className={utils.container}>
            <h1 className={css.header}>
                <a className="external" href={dplaLink(query)}>
                    Explore related items in DPLA
                </a>{" "}
                including:
            </h1>
            <ul className={css.itemList}>
                {items.map((item, index) => {
                    item.linkHref = `https://dp.la/item/${item.id}`;
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
                                            {item.title
                                                ? truncateString(item.title, 150)
                                                : item.title ? item.title : UNTITLED_TEXT}
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
