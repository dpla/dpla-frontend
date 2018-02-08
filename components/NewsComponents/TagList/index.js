import React from "react";
import Link from "next/link";

import { TITLE, DESCRIPTION, NEWS_TAGS } from "constants/news";
import { SITE_ENV } from "constants/env";

import { classNames, stylesheet } from "./TagList.css";

const TagList = ({ url, currentTag, keywords }) =>
  <ul className={classNames.list}>
    {currentTag &&
      <li>
        <Link prefetch as="/news" href="/news">
          <a>All News</a>
        </Link>
      </li>}
    {!currentTag && <li>All News</li>}
    {NEWS_TAGS.map(tag => {
      const id = tag.id;
      const markup = tag.name.toLowerCase().replace(" ", "-") !== currentTag
        ? <Link
            prefetch
            href={{
              pathname: url.pathname,
              query: Object.assign({}, url.query, {
                tag: tag.name.toLowerCase().replace(" ", "-"),
                page: 1,
                q: keywords
              })
            }}
          >
            <a>{tag.name}</a>
          </Link>
        : <span>{tag.name}</span>;
      return <li key={id}>{markup}</li>;
    })}
    <style dangerouslySetInnerHTML={{ __html: stylesheet }} />
  </ul>;

export default TagList;
