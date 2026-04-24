import React from "react";

import Breadcrumbs from "shared/Breadcrumbs";
import NavArrows from "./components/NavLinks";
import css from "./BreadcrumbsAndNav.module.scss";
import utils from "stylesheets/utils.module.scss";

function BreadcrumbsAndNav({ breadcrumbs, previousSubtopic, nextSubtopic, topic }) {
  return (
    <div className={utils.breadcrumbsWrapper}>
      <div className={`${css.breadcrumbsAndNav} ${utils.container}`}>
        <Breadcrumbs breadcrumbs={breadcrumbs} />
        {topic && (previousSubtopic || nextSubtopic) && (
          <NavArrows
            previousSubtopic={previousSubtopic}
            nextSubtopic={nextSubtopic}
            topic={topic}
          />
        )}
      </div>
    </div>
  );
}

export default BreadcrumbsAndNav;
