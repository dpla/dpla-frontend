import React from "react";
import Link from "next/link";

import { NEWS_TAGS } from "constants/news";

import css from "stylesheets/content-pages.module.scss";
import { useRouter } from "next/router";

function TagList({ currentTag, keywords, author }) {
  const router = useRouter();
  const isAllNews = !currentTag && author === "" && !keywords;
  const currentSlug = currentTag ? currentTag.slug : "";
  return (
    <ul className={css.collapsed}>
      {isAllNews ? (
        <li>All News</li>
      ) : (
        <li>
          <Link href="/news">All News</Link>
        </li>
      )}
      {NEWS_TAGS.map((tag) => {
        const id = tag.id;
        const markup =
          tag.slug === currentSlug ? (
            <span>{tag.name}</span>
          ) : (
            <Link
              href={{
                pathname: router.pathname,
                query: {
                  ...router.query,
                  tag: tag.slug,
                  k: keywords,
                  page: 1,
                  author: author,
                },
              }}
              title={`View only posts under ${tag.name}`}
            >
              {tag.name}
            </Link>
          );
        return <li key={id}>{markup}</li>;
      })}
    </ul>
  );
}

export default TagList;
