import React from "react";
import Link from "next/link";

import HeadingRule from "components/shared/HeadingRule";
import { classNames, stylesheet } from "./MainContent.css";
import { classNames as utilClassNames } from "css/utils.css";

const MainContent = ({ topic }) =>
  <div className={classNames.wrapper}>
    <div className={`${classNames.container} site-max-width`}>
      <h1 className={classNames.header}>{topic.name}</h1>
      {topic.description &&
        <p className={classNames.topicDescription}>{topic.description}</p>}
      <HeadingRule color="#F9BA3F" />
      <ul className="row">
        {topic.subtopics.map((subtopic, index) =>
          <li
            className={`${classNames.subtopic} col-xs-12 col-sm-6 col-md-4`}
            key={`${subtopic.name}-${index}`}
          >
            <Link
              prefetch
              as={`/browse-by-topic/${topic.slug}/${subtopic.slug}`}
              href={`/browse-by-topic/topic/subtopic?subtopic=${subtopic.slug}&topic=${topic.slug}`}
            >
              <a className={classNames.subtopicAnchor}>
                <img
                  className={classNames.image}
                  aria-hidden="true"
                  src={subtopic.thumbnailUrl}
                />
                <div className={classNames.textWrapper}>
                  <h2 className={classNames.subtopicTitle}>{subtopic.name}</h2>
                  <p className={classNames.subtopicDescription}>
                    {subtopic.description}
                  </p>
                </div>
              </a>
            </Link>
          </li>
        )}
      </ul>
    </div>
    <style dangerouslySetInnerHTML={{ __html: stylesheet }} />
  </div>;

export default MainContent;
