import React from "react";
import Link from "next/link";

import { TITLE, DESCRIPTION, NEWS_TAGS } from "constants/news";
import { SITE_ENV } from "constants/env";

import { classNames, stylesheet } from "./TagList.css";

const TagList = ({ url, currentTag, keywords, author }) =>
  <ul className={classNames.list}>
    {(currentTag || author !== "" || keywords !== "") &&
      <li>
        <a href="/news">All News</a>
      </li>}
    {!(currentTag || author !== "" || keywords !== "") && <li>All News</li>}
    {NEWS_TAGS.map(tag => {
      const id = tag.id;
      const markup = tag.name.toLowerCase().replace(" ", "-") !== currentTag
        ? <Link
            prefetch
            href={{
              pathname: url.pathname,
              query: Object.assign({}, url.query, {
                tag: tag.name.toLowerCase().replace(" ", "-"),
                k: keywords,
                page: 1,
                author: author
              })
            }}
          >
            <a title={`View more posts under ${tag.name}`}>{tag.name}</a>
          </Link>
        : <span>{tag.name}</span>;
      return <li key={id}>{markup}</li>;
    })}
    <style dangerouslySetInnerHTML={{ __html: stylesheet }} />
  </ul>;

export default TagList;
