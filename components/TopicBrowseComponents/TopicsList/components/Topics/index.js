import React from "react";
import Link from "next/link";

import { stylesheet, classNames } from "./Topics.css";
import { classNames as utilClassNames } from "css/utils.css";

const Topics = ({ topics }) =>
  <div className={`${classNames.topicsWrapper} ${utilClassNames.container}`}>
    <ul className="row">
      {topics.map(topic =>
        <li className="col-xs-12 col-sm-6 col-md-4 col-lg-3">
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
                alt={topic.title}
                src={topic.acf.category_image}
                className={classNames.image}
              />
              <h3 className={classNames.title}>
                {topic.name}
              </h3>
            </a>
          </Link>
        </li>
      )}
    </ul>
    <style dangerouslySetInnerHTML={{ __html: stylesheet }} />
  </div>;

export default Topics;
