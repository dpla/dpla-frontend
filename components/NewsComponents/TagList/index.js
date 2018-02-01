import React from "react";
import Link from "next/link";

import {
  TITLE,
  DESCRIPTION,
  ANNOUNCEMENTS_TAG_ID,
  CONTENT_SHOWCASE_TAG_ID,
  NEWS_TAGS
} from "constants/news.js";
import { SITE_ENV } from "constants/env";

import { classNames, stylesheet } from "./TagList.css";

const TagList = ({ url, currentTag }) =>
  <ul className={classNames.list}>
    {currentTag &&
      <li>
        <Link prefetch as="/news" href="/news">
          <a>All News</a>
        </Link>
      </li>}
    {!currentTag && <li>All News</li>}
    {Object.keys(NEWS_TAGS).map(key => {
      if (
        (SITE_ENV === "user" &&
          (ANNOUNCEMENTS_TAG_ID === Number(key) ||
            CONTENT_SHOWCASE_TAG_ID === Number(key))) ||
        SITE_ENV === "pro"
      ) {
        const item = Number(key) !== Number(currentTag)
          ? <Link
              prefetch
              href={{
                pathname: url.pathname,
                query: Object.assign({}, url.query, {
                  tag: key,
                  page: 1
                })
              }}
            >
              <a>{NEWS_TAGS[key]}</a>
            </Link>
          : <span>{NEWS_TAGS[key]}</span>;
        return <li key={key}>{item}</li>;
      } else {
        return null;
      }
    })}
    <style dangerouslySetInnerHTML={{ __html: stylesheet }} />
  </ul>;

export default TagList;
