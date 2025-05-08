import React from "react";
import Link from "next/link";

import { formatDate } from "lib";

import css from "./NewsLane.module.scss";
import utils from "stylesheets/utils.module.scss";

import ChevronThickOrange from "components/svg/ChevronThickOrange";

function NewsLane({ title, items }) {
  return (
    <div className={css.wrapper} data-cy="news">
      <div className={`${css.content} ${utils.siteMaxWidth}`}>
        <div className={utils.row}>
          <div className={`${utils.colXs12} ${utils.colMd3}`}>
            <div className={css.header}>
              <h2 className={css.headerText}>{title}</h2>
              <Link
                href={"/news"}
                className={`hover-underline ${css.headerLink}`}
              >
                <span>Browse the archives</span>
                <ChevronThickOrange className={css.chevron} />
              </Link>
            </div>
          </div>
          <ul className={`${utils.colXs12} ${utils.colMd9}`}>
            {items.map((post) => {
              const dateText = formatDate(post.date);
              let summary = post.acf.summary
                ? post.acf.summary
                : post.excerpt.rendered.replace(/(<([^>]+)>)/gi, "") || "";
              let words = summary.split(" ");
              if (words.length > 30) {
                words.splice(30);
                summary = words.join(" ") + "…";
              }
              return (
                <li key={post.id} className={`${css.post}`}>
                  <div className={css.postLink}>
                    <Link
                      href={`/news/${post.slug}`}
                      dangerouslySetInnerHTML={{
                        __html: post.title.rendered,
                      }}
                    ></Link>
                  </div>
                  <div className={css.date}>{dateText}</div>
                  {summary && <p className={css.bodyText}>{summary}</p>}
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default NewsLane;
