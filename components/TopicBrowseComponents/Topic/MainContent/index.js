import React from "react";
import Link from "next/link";

import { classNames, stylesheet } from "./MainContent.css";
import { classNames as utilClassNames } from "css/utils.css";
const { module } = utilClassNames;

const MainContent = ({ topic }) =>
  <div className={classNames.wrapper}>
    <div className={module}>
      <h1 className={classNames.header}>
        {topic.name}
      </h1>
      <p className={classNames.topicDescription}>
        {topic.description}
      </p>
      <div className={classNames.divider} />
      <ul className={classNames.subtopics}>
        {topic.subtopics.map(subtopic =>
          <li className={classNames.subtopic}>
            <Link
              prefetch
              as={`/browse-by-topic/${topic.slug}/${subtopic.slug}`}
              href={`/browse-by-topic/topic/subtopic?subtopic=${subtopic.slug}&topic=${topic.slug}`}
            >
              <a className={classNames.subtopicAnchor}>
                <div
                  className={classNames.imageWrapper}
                >
                  <div
                    className={classNames.image}
                    style={{ backgroundImage: `url(${subtopic.thumbnailUrl})` }}
                    >
                    <div className={classNames.gradientBackground} />
                  </div>
                  <h3 className={classNames.subtopicTitle}>
                    {subtopic.name}
                  </h3>
                </div>
                <p className={classNames.subtopicDescription}>
                  {subtopic.description}
                </p>
              </a>
            </Link>
          </li>
        )}
      </ul>
    </div>
    <style dangerouslySetInnerHTML={{ __html: stylesheet }} />
  </div>;

export default MainContent;
