import React from "react";
import Link from "next/link";

import css from "./Topics.module.scss";
import utils from "stylesheets/utils.module.scss"

const Topics = ({ topics }) =>
  <div className={`${css.topicsWrapper} ${utils.container}`}>
    <p className={css.topicsIntro}>
      This is a new feature designed to showcase content strengths in our
      collection. Look for new topics in the future!
    </p>
    <ul className={utils.row}>
      {topics.map((topic, index) =>
        <li
          key={`${topic.name}-${index}`}
          className={`${utils.colXs12} ${utils.colSm6} ${utils.colMd4} ${utils.colLg3}`}
        >
          <Link
            as={`/browse-by-topic/${topic.slug}`}
            href={`/browse-by-topic/topic?topic=${topic.slug}`}
          >
            <a className={css.topic}>
              {topic.isFeatured && <div className={css.ribbon}>Featured</div>}
              {topic.isNew &&
                !topic.isFeatured &&
                <div className={css.ribbon}>New</div>}
              <img
                alt=""
                src={topic.acf.category_image}
                className={css.image}
              />
              <div className={css.title}>
                {topic.name}
              </div>
            </a>
          </Link>
        </li>
      )}
    </ul>
  </div>;

export default Topics;
