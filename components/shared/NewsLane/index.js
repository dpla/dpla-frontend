import React from "react";
import Link from "next/link";

import { formatDate } from "utilFunctions";

import { stylesheet, classNames } from "./NewsLane.css";

const smallChevron = "static/images/chevron-thick-orange.svg";

const NewsLane = ({ title, items }) =>
  <div className={classNames.wrapper}>
    <div className={`${classNames.content} site-max-width`}>
      <div className="row">
        <div className="col-xs-12 col-md-3">
          <div className={classNames.header}>
            <h2 className={classNames.headerText}>{title}</h2>
            <Link prefetch href="/news">
              <a className={`hover-underline ${classNames.headerLink}`}>
                <span>Browse the archives</span>
                <img
                  alt="browse the blog"
                  src={smallChevron}
                  className={classNames.chevron}
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
              <li key={post.id} className={`${classNames.post}`}>
                <div className={classNames.postLink}>
                  <Link
                    prefetch
                    as={`/news/${post.slug}`}
                    href={`/news/post?slug=${post.slug}`}
                  >
                    <a
                      dangerouslySetInnerHTML={{ __html: post.title.rendered }}
                    />
                  </Link>
                </div>
                <div className={classNames.date}>
                  {dateText}
                </div>
                {summary &&
                  <p className={classNames.bodyText}>
                    {summary}
                  </p>}
              </li>
            );
          })}
        </ul>
      </div>
    </div>
    <style dangerouslySetInnerHTML={{ __html: stylesheet }} />
  </div>;

export default NewsLane;
