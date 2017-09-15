import React from "react";
import Link from "next/link";

import { classNames, stylesheet } from "./Suggestions.css";
import { classNames as utilClassNames } from "css/utils.css";
const { module } = utilClassNames;

const mapTypeToClass = type => {
  if (type === "Exhibition") {
    return classNames.exhibition;
  } else if (type === "Topic") {
    return classNames.topic;
  }
};

const Suggestions = ({ suggestions }) =>
  <div className={classNames.suggestionsWrapper}>
    <div className={[classNames.suggestions, module].join(" ")}>
      <h3 className={classNames.header}>You might also enjoy</h3>
      <ul className={classNames.suggestedResources}>
        {suggestions.map(suggestion =>
          <li
            className={[
              classNames.suggestedItem,
              mapTypeToClass(suggestion.type)
            ].join(" ")}
          >
            <Link prefetch href={`browse-by-topic/${suggestion.slug}`}>
              <a
                className={classNames.imageWrapper}
                style={{ backgroundImage: `url(${suggestion.image})` }}
              >
                <div className={classNames.gradientBackground}>
                  <div className={classNames.typeAndTitle}>
                    <p className={classNames.resourceType}>
                      {suggestion.type}
                    </p>
                    <h3 className={classNames.suggestionTitle}>
                      {suggestion.title}
                    </h3>
                  </div>
                </div>
              </a>
            </Link>
          </li>
        )}
      </ul>
    </div>
    <style dangerouslySetInnerHTML={{ __html: stylesheet }} />
  </div>;

export default Suggestions;
