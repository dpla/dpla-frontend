import React from "react";
import Link from "next/link";

import { NEWS_TAGS } from "constants/news";

import css from "stylesheets/content-pages.module.scss"
import {withRouter} from "next/router";

const TagList = ({ router, currentTag, keywords, author }) =>
  <ul className={css.collapsed}>
    {(currentTag || author !== "" || keywords !== "") &&
      <li>
        <Link href="/news"><a>All News</a></Link>
      </li>}
    {!(currentTag || author !== "" || keywords !== "") && <li>All News</li>}
    {NEWS_TAGS.map(tag => {
      const id = tag.id;
      const markup = tag.name.toLowerCase().replace(" ", "-") !== currentTag
        ? <Link
            href={{
              pathname: router.pathname,
              query: Object.assign({}, router.query, {
                tag: tag.name.toLowerCase().replace(" ", "-"),
                k: keywords,
                page: 1,
                author: author
              })
            }}
          >
            <a title={`View only posts under ${tag.name}`}>{tag.name}</a>
          </Link>
        : <span>{tag.name}</span>;
      return <li key={id}>{markup}</li>;
    })}
  </ul>;

export default withRouter(TagList);
