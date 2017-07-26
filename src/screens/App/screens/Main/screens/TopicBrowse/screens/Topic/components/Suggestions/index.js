import React from "react";
import { Link } from "react-router-dom";

import styles from "./Suggestions.css";
import { module } from "../../../../../../../../css/utils.css";

const mapTypeToClass = type => {
  if (type === "Exhibition") {
    return styles.exhibition;
  } else if (type === "Topic") {
    return styles.topic;
  }
};

const Suggestions = ({ suggestions }) =>
  <div className={styles.suggestionsWrapper}>
    <div className={[styles.suggestions, module].join(" ")}>
      <h3 className={styles.header}>You might also enjoy</h3>
      <ul className={styles.suggestedResources}>
        {suggestions.map(suggestion =>
          <li
            className={[
              styles.suggestedItem,
              mapTypeToClass(suggestion.type)
            ].join(" ")}
          >
            <Link to={`browse-by-topic/${suggestion.slug}`}>
              <div
                className={styles.imageWrapper}
                style={{ backgroundImage: `url(${suggestion.image})` }}
              >
                <div className={styles.gradientBackground}>
                  <div className={styles.typeAndTitle}>
                    <p className={styles.resourceType}>{suggestion.type}</p>
                    <h3 className={styles.suggestionTitle}>
                      {suggestion.title}
                    </h3>
                  </div>
                </div>
              </div>
            </Link>
          </li>
        )}
      </ul>
    </div>
  </div>;

export default Suggestions;
