import React from "react";
import Link from "next/link";

import utils from "stylesheets/utils.scss";
import css from "./Topics.scss";

const Topics = ({ topics }) =>
  <div className={`${css.topicsWrapper} ${utils.container}`}>
    <p className={css.topicsIntro}>
      This is a new feature designed to showcase content strengths in our
      collection. Look for new topics in the future!
    </p>
    <ul className="row">
      {topics.map((topic, index) =>
        <li
          key={`${topic.name}-${index}`}
          className="col-xs-12 col-sm-6 col-md-4 col-lg-3"
        >
          <Link
            prefetch
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
