import React from "react";
import Link from "next/link";

import HeadingRule from "shared/HeadingRule";

import css from "./MainContent.module.scss";
import utils from "stylesheets/utils.module.scss";

function MainContent({ topic }) {
  return (
    <div className={css.wrapper}>
      <div className={`${utils.container} ${css.container}`}>
        <h1 className={css.header}>{topic.name}</h1>
        <HeadingRule color="#F9BA3F" />
        <ul className={utils.row}>
          {topic.subtopics.map((subtopic, index) => (
            <li
              className={`${css.subtopic} ${utils.colXs12} ${utils.colSm6} ${utils.colMd4}`}
              key={`${subtopic.name}-${index}`}
            >
              <Link
                href={`/browse-by-topic/${topic.slug}/${subtopic.slug}`}
                className={css.subtopicAnchor}
              >
                <div
                  className={css.image}
                  aria-hidden="true"
                  style={{ backgroundImage: `url(${subtopic.thumbnailUrl})` }}
                />
                <div className={css.textWrapper}>
                  <h2 className={css.subtopicTitle}>{subtopic.name}</h2>
                  <p className={css.subtopicDescription}>
                    {subtopic.description}
                  </p>
                </div>
              </Link>
            </li>
          ))}
        </ul>
        {topic.description && (
          <section className={css.topicDescription}>
            <p>{topic.description}</p>
          </section>
        )}
      </div>
    </div>
  );
}

export default MainContent;
