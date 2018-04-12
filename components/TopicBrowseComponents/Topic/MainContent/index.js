import React from "react";
import Link from "next/link";

import HeadingRule from "shared/HeadingRule";

import utils from "stylesheets/utils.scss";
import css from "./MainContent.scss";

const MainContent = ({ topic }) =>
  <div className={css.wrapper}>
    <div className={`${utils.container} ${css.container} site-max-width`}>
      <h1 className={css.header}>{topic.name}</h1>
      {topic.description &&
        <p className={css.topicDescription}>{topic.description}</p>}
      <HeadingRule color="#F9BA3F" />
      <ul className="row">
        {topic.subtopics.map((subtopic, index) =>
          <li
            className={`${css.subtopic} col-xs-12 col-sm-6 col-md-4`}
            key={`${subtopic.name}-${index}`}
          >
            <Link
              prefetch
              as={`/browse-by-topic/${topic.slug}/${subtopic.slug}`}
              href={`/browse-by-topic/topic/subtopic?subtopic=${subtopic.slug}&topic=${topic.slug}`}
            >
              <a className={css.subtopicAnchor}>
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
              </a>
            </Link>
          </li>
        )}
      </ul>
    </div>
  </div>;

export default MainContent;
