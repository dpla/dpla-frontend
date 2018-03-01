import React from "react";
import Link from "next/link";

import { stylesheet, classNames } from "./Topics.css";
import { classNames as utilClassNames } from "css/utils.css";

const Topics = ({ topics }) =>
  <div className={`${classNames.topicsWrapper} ${utilClassNames.container}`}>
    <h2>This is the text that explains what topic browse is</h2>
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
            <a className={classNames.topic}>
              {topic.isFeatured &&
                <div className={classNames.ribbon}>Featured</div>}
              {topic.isNew &&
                !topic.isFeatured &&
                <div className={classNames.ribbon}>New</div>}
              <img
                alt=""
                src={topic.acf.category_image}
                className={classNames.image}
              />
              <div className={classNames.title}>
                {topic.name}
              </div>
            </a>
          </Link>
        </li>
      )}
    </ul>
    <style dangerouslySetInnerHTML={{ __html: stylesheet }} />
  </div>;

export default Topics;
