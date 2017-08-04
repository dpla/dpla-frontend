import React from "react";
import Link from "next/link";

import { stylesheet, classNames } from "./Topics.css";
import { classNames as utilClassNames } from "css/utils.css";
const { module } = utilClassNames;

const Topics = ({ topics }) =>
  <div className={[module, classNames.topicsWrapper].join(" ")}>
    <ul className={classNames.topics}>
      {topics.map(topic =>
        <li className={classNames.topic}>
          <Link to={`browse-by-topic/${topic.slug}`}>
            <a>
              <img
                alt={topic.title}
                src={topic.image}
                className={classNames.image}
              />
              <h3 className={classNames.title}>
                {topic.title}
              </h3>
            </a>
          </Link>
          {topic.isFeatured &&
            <div className={classNames.ribbon}>Featured</div>}
          {topic.isNew &&
            !topic.isFeatured &&
            <div className={classNames.ribbon}>New</div>}
        </li>
      )}
    </ul>
    <style dangerouslySetInnerHTML={{ __html: stylesheet }} />
  </div>;

export default Topics;
