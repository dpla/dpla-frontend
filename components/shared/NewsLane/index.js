import React from "react";
import Link from "next/link";

import { formatDate } from "lib";
import { USER_BASE_URL } from "constants/env";

import css from "./NewsLane.module.scss";

const smallChevron = "/static/images/chevron-thick-orange.svg";

const NewsLane = ({ title, items }) =>
  <div className={css.wrapper} data-cy="news">
    <div className={`${css.content} site-max-width`}>
      <div className="row">
        <div className="col-xs-12 col-md-3">
          <div className={css.header}>
            <h2 className={css.headerText}>{title}</h2>
            <Link href={`${USER_BASE_URL}/news`}>
              <a className={`hover-underline ${css.headerLink}`}>
                <span>Browse the archives</span>
                <img
                  alt="browse the blog"
                  src={smallChevron}
                  className={css.chevron}
                />
              </a>
            </Link>
          </div>
        </div>
        <ul className="col-xs-12 col-md-9">
          {items.map((post, index) => {
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
                    as={`/news/${post.slug}`}
                    href={`/news/post?slug=${post.slug}`}
                  >
                    <a
                      dangerouslySetInnerHTML={{ __html: post.title.rendered }}
                    />
                  </Link>
                </div>
                <div className={css.date}>
                  {dateText}
                </div>
                {summary &&
                  <p className={css.bodyText}>
                    {summary}
                  </p>}
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  </div>;

export default NewsLane;
