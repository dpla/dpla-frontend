import React from "react";
import Link from "next/link";

import css from "./Topics.module.scss";
import utils from "stylesheets/utils.module.scss";

function Topics({ topics }) {
  if (!Array.isArray(topics)) return null;
  return (
    <div className={`${css.topicsWrapper} ${utils.container}`}>
      <p className={css.topicsIntro}>
        This is a feature designed to showcase content strengths in our
        collection.
      </p>
      <ul className={utils.row}>
        {topics.map((topic) => (
          <li
            key={`${topic.name}`}
            className={`${utils.colXs12} ${utils.colSm6} ${utils.colMd4} ${utils.colLg3}`}
          >
            <Link href={`/browse-by-topic/${topic.slug}`} className={css.topic}>
              <img
                alt=""
                src={topic.acf.category_image}
                className={css.image}
              />
              <div className={css.title}>{topic.name}</div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Topics;
