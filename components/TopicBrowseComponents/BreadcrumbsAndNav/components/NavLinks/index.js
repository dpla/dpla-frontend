import React from "react";
import Link from "next/link";

import css from "./NavArrows.module.scss";

import Chevron from "components/svg/ChevronThickOrange";
import * as PropTypes from "prop-types";

function NavArrows(props) {
  const { previousSubtopic, nextSubtopic, topic, route } = props;
  return nextSubtopic || previousSubtopic ? (
    <div className={css.navLinks}>
      {previousSubtopic && (
        <Link
          as={`/browse-by-topic/${topic.slug}/${previousSubtopic.slug}`}
          href={`/${route.pathname}?topic=${topic.slug}&subtopic=${previousSubtopic.slug}`}
          className={css.prevLink}
        >
          <Chevron className={css.prevArrow} />
          <span>Previous Section</span>
        </Link>
      )}
      {nextSubtopic && (
        <Link
          as={`/browse-by-topic/${topic.slug}/${nextSubtopic.slug}`}
          href={`/${route.pathname}?topic=${topic.slug}&subtopic=${nextSubtopic.slug}`}
        >
          <span>Next Section</span>
          <Chevron className={css.nextArrow} />
        </Link>
      )}
    </div>
  ) : (
    <></>
  );
}

NavArrows.propTypes = {
  previousSubtopic: PropTypes.any,
  nextSubtopic: PropTypes.any,
  topic: PropTypes.any,
  route: PropTypes.any,
};

export default NavArrows;
